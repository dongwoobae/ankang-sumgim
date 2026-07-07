import { describe, expect, it } from "vitest";

import { isFaceRegion, scaleFaceRegions } from "@/lib/blur-regions";

describe("scaleFaceRegions", () => {
  it("리사이즈가 없으면 좌표를 그대로 반환한다", () => {
    const result = scaleFaceRegions(
      [{ x: 100, y: 50, width: 80, height: 60 }],
      1000,
      800,
      1000,
      800,
    );
    expect(result).toEqual([{ left: 100, top: 50, width: 80, height: 60 }]);
  });

  it("절반 축소 시 좌표와 크기를 비례 변환한다", () => {
    const result = scaleFaceRegions(
      [{ x: 400, y: 200, width: 100, height: 100 }],
      3840,
      2160,
      1920,
      1080,
    );
    expect(result).toEqual([{ left: 200, top: 100, width: 50, height: 50 }]);
  });

  it("세로 긴 사진(fit-inside)에서 각 축을 독립 비율로 변환한다", () => {
    // 1000x3000 → 640x1920
    const result = scaleFaceRegions(
      [{ x: 500, y: 1500, width: 100, height: 300 }],
      1000,
      3000,
      640,
      1920,
    );
    expect(result).toEqual([{ left: 320, top: 960, width: 64, height: 192 }]);
  });

  it("오른쪽 가장자리 얼굴이 라운딩으로 폭을 넘으면 이미지 안쪽으로 클램프한다", () => {
    // 1000→640 축소에서 left=round(633.5)=634, width=round(6.5)=7 → 합 641 > 640
    const [region] = scaleFaceRegions(
      [{ x: 989.84375, y: 0, width: 10.15625, height: 100 }],
      1000,
      3000,
      640,
      1920,
    );
    expect(region.left + region.width).toBeLessThanOrEqual(640);
    expect(region).toMatchObject({ left: 634, width: 6 });
  });

  it("아래 가장자리 얼굴도 높이를 이미지 안쪽으로 클램프한다", () => {
    const [region] = scaleFaceRegions(
      [{ x: 0, y: 989.84375, width: 300, height: 10.15625 }],
      3000,
      1000,
      1920,
      640,
    );
    expect(region.top + region.height).toBeLessThanOrEqual(640);
    expect(region).toMatchObject({ top: 634, height: 6 });
  });

  it("변환 후 4px 이하인 영역은 제외한다", () => {
    const result = scaleFaceRegions(
      [{ x: 0, y: 0, width: 8, height: 8 }],
      3840,
      2160,
      1920,
      1080,
    );
    expect(result).toEqual([]);
  });

  it("이미지 밖으로 완전히 벗어난 영역은 제외한다", () => {
    const result = scaleFaceRegions(
      [{ x: 1200, y: 0, width: 100, height: 100 }],
      1000,
      1000,
      500,
      500,
    );
    expect(result).toEqual([]);
  });

  it("원본 크기가 0 이하면 빈 배열을 반환한다", () => {
    const result = scaleFaceRegions(
      [{ x: 10, y: 10, width: 50, height: 50 }],
      0,
      0,
      1920,
      1080,
    );
    expect(result).toEqual([]);
  });

  it("여러 얼굴의 순서를 유지한다", () => {
    const result = scaleFaceRegions(
      [
        { x: 0, y: 0, width: 100, height: 100 },
        { x: 500, y: 500, width: 100, height: 100 },
      ],
      1000,
      1000,
      500,
      500,
    );
    expect(result).toEqual([
      { left: 0, top: 0, width: 50, height: 50 },
      { left: 250, top: 250, width: 50, height: 50 },
    ]);
  });
});

describe("isFaceRegion", () => {
  it("x/y/width/height가 모두 0 이상 유한 숫자면 true", () => {
    expect(isFaceRegion({ x: 0, y: 10.5, width: 80, height: 60 })).toBe(true);
  });

  it.each([
    ["null", null],
    ["배열", [1, 2, 3, 4]],
    ["키 누락", { x: 1, y: 2, width: 3 }],
    ["음수", { x: -1, y: 2, width: 3, height: 4 }],
    ["NaN", { x: NaN, y: 2, width: 3, height: 4 }],
    ["Infinity", { x: Infinity, y: 2, width: 3, height: 4 }],
    ["문자열 숫자", { x: "1", y: 2, width: 3, height: 4 }],
  ])("%s 이면 false", (_label, value) => {
    expect(isFaceRegion(value)).toBe(false);
  });
});
