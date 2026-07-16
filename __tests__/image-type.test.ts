import { describe, expect, it } from "vitest";

import { detectImageType } from "@/lib/image-type";

function bytes(...parts: (number[] | string)[]): Buffer {
  return Buffer.concat(
    parts.map((p) => (typeof p === "string" ? Buffer.from(p, "ascii") : Buffer.from(p))),
  );
}

describe("detectImageType", () => {
  it("JPEG 시그니처(FF D8 FF)를 감지한다", () => {
    expect(detectImageType(bytes([0xff, 0xd8, 0xff, 0xe0], "JFIF"))).toBe("image/jpeg");
  });

  it("PNG 시그니처를 감지한다", () => {
    expect(detectImageType(bytes([0x89], "PNG", [0x0d, 0x0a, 0x1a, 0x0a], "IHDR..."))).toBe(
      "image/png",
    );
  });

  it("WebP(RIFF....WEBP)를 감지한다", () => {
    expect(detectImageType(bytes("RIFF", [0x24, 0x00, 0x00, 0x00], "WEBPVP8 "))).toBe("image/webp");
  });

  it("RIFF지만 WEBP가 아니면(WAVE 등) null", () => {
    expect(detectImageType(bytes("RIFF", [0x24, 0x00, 0x00, 0x00], "WAVEfmt "))).toBeNull();
  });

  it("HEIC(ftyp + heic 계열 브랜드)를 감지한다", () => {
    expect(detectImageType(bytes([0x00, 0x00, 0x00, 0x18], "ftypheic", "..."))).toBe("image/heic");
    expect(detectImageType(bytes([0x00, 0x00, 0x00, 0x18], "ftypmif1", "..."))).toBe("image/heic");
  });

  it("ftyp지만 허용 브랜드가 아니면(mp4, avif 등) null", () => {
    expect(detectImageType(bytes([0x00, 0x00, 0x00, 0x18], "ftypmp42", "..."))).toBeNull();
    expect(detectImageType(bytes([0x00, 0x00, 0x00, 0x18], "ftypavif", "..."))).toBeNull();
  });

  it("임의 바이트·텍스트는 null", () => {
    expect(detectImageType(Buffer.from("hello world, not an image"))).toBeNull();
    expect(detectImageType(bytes([0x00, 0x01, 0x02, 0x03, 0x04, 0x05]))).toBeNull();
  });

  it("SVG(XML 텍스트)는 null — 재인코딩 불가 포맷 차단", () => {
    expect(detectImageType(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg">'))).toBeNull();
  });

  it("시그니처보다 짧은 버퍼는 null", () => {
    expect(detectImageType(Buffer.from([0xff, 0xd8]))).toBeNull();
    expect(detectImageType(Buffer.alloc(0))).toBeNull();
  });
});
