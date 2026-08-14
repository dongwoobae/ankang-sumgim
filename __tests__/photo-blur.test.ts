import { describe, expect, it } from "vitest";
import sharp from "sharp";

import { composePhotoUpload } from "@/lib/photo-blur";

/** 균일한 색이면 블러 전후 픽셀이 같아 "블러가 걸렸다"를 단언할 수 없다. */
async function noiseImage(width: number, height: number): Promise<Buffer> {
  return sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 0, g: 0, b: 0 },
      noise: { type: "gaussian", mean: 128, sigma: 70 },
    },
  })
    .jpeg()
    .toBuffer();
}

/**
 * 해당 영역의 표준편차 — 블러가 걸리면 떨어진다.
 * sharp의 stats()는 파이프라인 앞 연산을 무시하고 입력 이미지를 읽으므로
 * extract 결과를 버퍼로 굽고 나서 재측정해야 한다.
 */
async function regionStdev(
  image: Buffer,
  region: { left: number; top: number; width: number; height: number },
): Promise<number> {
  const cropped = await sharp(image).extract(region).toBuffer();
  const { channels } = await sharp(cropped).stats();
  return channels[0].stdev;
}

describe("composePhotoUpload — 얼굴 좌표가 없는 경우", () => {
  it("단일 압축본만 반환한다", async () => {
    const result = await composePhotoUpload(await noiseImage(2400, 1800), []);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.kind).toBe("plain");
    if (result.kind !== "plain") return;

    const meta = await sharp(result.image).metadata();
    expect(meta.format).toBe("webp");
    expect(meta.width).toBe(1920);
  });
});

describe("composePhotoUpload — 얼굴 좌표가 있는 경우", () => {
  it("블러본과 원본을 모두 반환하고, 지정 영역의 픽셀이 실제로 뭉개진다", async () => {
    const input = await noiseImage(2400, 1800);
    const result = await composePhotoUpload(input, [{ x: 400, y: 300, width: 500, height: 500 }]);

    expect(result.ok).toBe(true);
    if (!result.ok || result.kind !== "blurred") throw new Error("blurred 결과가 아니다");

    // 2400→1920 축소이므로 원본 좌표 (400,300,500,500) → (320,240,400,400)
    const region = { left: 320, top: 240, width: 400, height: 400 };
    const before = await regionStdev(result.original, region);
    const after = await regionStdev(result.blurred, region);

    expect(after).toBeLessThan(before / 2);
  });

  it("지정하지 않은 영역은 건드리지 않는다", async () => {
    const input = await noiseImage(2400, 1800);
    const result = await composePhotoUpload(input, [{ x: 0, y: 0, width: 400, height: 400 }]);
    if (!result.ok || result.kind !== "blurred") throw new Error("blurred 결과가 아니다");

    const far = { left: 1400, top: 1000, width: 300, height: 300 };
    const before = await regionStdev(result.original, far);
    const after = await regionStdev(result.blurred, far);

    expect(after).toBeGreaterThan(before * 0.9);
  });
});

// 이 레포에서 가장 중요한 불변식이다. 블러가 걸렸는지가 아니라,
// 걸리지 않은 이미지가 공개 경로로 나가지 않는지를 지킨다.
describe("composePhotoUpload — 미처리 원본이 공개 경로로 나가지 않는다", () => {
  it("감지된 얼굴이 축소 후 4px 이하로 전부 걸러지면 실패한다", async () => {
    // 2400→1920 (×0.8). 5px 얼굴 → 4px → scaleFaceRegions가 제외한다.
    const result = await composePhotoUpload(await noiseImage(2400, 1800), [
      { x: 100, y: 100, width: 5, height: 5 },
    ]);

    expect(result.ok).toBe(false);
    expect(result).not.toHaveProperty("blurred");
    expect(result).not.toHaveProperty("image");
  });

  it("감지된 얼굴이 전부 이미지 밖이면 실패한다", async () => {
    const result = await composePhotoUpload(await noiseImage(2400, 1800), [
      { x: 9000, y: 9000, width: 200, height: 200 },
    ]);

    expect(result.ok).toBe(false);
  });

  it("유효한 얼굴 하나라도 남으면 성공한다 — 걸러진 얼굴이 섞여도 마찬가지", async () => {
    const result = await composePhotoUpload(await noiseImage(2400, 1800), [
      { x: 100, y: 100, width: 5, height: 5 },
      { x: 400, y: 300, width: 500, height: 500 },
    ]);

    expect(result.ok).toBe(true);
  });

  it("이미지로 디코딩되지 않는 버퍼는 실패로 보고한다 — 예외를 삼키지 않는다", async () => {
    const result = await composePhotoUpload(Buffer.from("not an image"), [
      { x: 0, y: 0, width: 100, height: 100 },
    ]);

    expect(result.ok).toBe(false);
  });
});
