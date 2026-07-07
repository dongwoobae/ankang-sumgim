// lib/image-type.ts
// 매직바이트로 실제 이미지 포맷을 판별한다.
// 클라이언트가 선언하는 file.type은 위조 가능하므로 서버에서 버퍼를 직접 확인.
// 허용 포맷(sharp로 재인코딩 가능한 것)만 반환하고 그 외는 null.

export type DetectedImageType =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "image/heic";

// HEIF 컨테이너(ftyp) 중 HEIC 계열로 취급하는 브랜드
const HEIC_BRANDS = new Set([
  "heic",
  "heix",
  "heim",
  "heis",
  "hevc",
  "hevx",
  "hevm",
  "hevs",
  "mif1",
  "msf1",
]);

export function detectImageType(buffer: Buffer): DetectedImageType | null {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }

  const PNG_SIG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (buffer.length >= 8 && PNG_SIG.every((b, i) => buffer[i] === b)) {
    return "image/png";
  }

  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }

  if (buffer.length >= 12 && buffer.toString("ascii", 4, 8) === "ftyp") {
    const brand = buffer.toString("ascii", 8, 12).trim().toLowerCase();
    if (HEIC_BRANDS.has(brand)) return "image/heic";
  }

  return null;
}
