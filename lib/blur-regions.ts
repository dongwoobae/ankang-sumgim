// lib/blur-regions.ts
// 얼굴 블러 좌표 변환 — 원본 기준 얼굴 좌표를 리사이즈본 기준으로 스케일한다.
// sharp.extract는 영역이 이미지 경계를 1px라도 벗어나면 throw하므로
// 라운딩 결과를 반드시 이미지 안쪽으로 클램프해야 한다.

export type FaceRegion = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/** sharp.extract / composite에 바로 넣을 수 있는 리사이즈본 기준 영역 */
export type BlurRegion = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/** 신뢰할 수 없는 입력(JSON 파싱 결과)이 FaceRegion인지 검증 */
export function isFaceRegion(value: unknown): value is FaceRegion {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const region = value as Record<string, unknown>;
  return ["x", "y", "width", "height"].every((key) => {
    const n = region[key];
    return typeof n === "number" && Number.isFinite(n) && n >= 0;
  });
}

/**
 * 원본(imgW×imgH) 기준 얼굴 좌표를 리사이즈본(resizedW×resizedH) 기준으로 변환.
 * 블러가 무의미한 4px 이하 영역과 이미지 밖 영역은 제외한다.
 */
export function scaleFaceRegions(
  faceRegions: FaceRegion[],
  imgW: number,
  imgH: number,
  resizedW: number,
  resizedH: number,
): BlurRegion[] {
  if (imgW <= 0 || imgH <= 0 || resizedW <= 0 || resizedH <= 0) return [];

  return faceRegions
    .map((face) => {
      const left = Math.min(Math.max(0, Math.round((face.x / imgW) * resizedW)), resizedW);
      const top = Math.min(Math.max(0, Math.round((face.y / imgH) * resizedH)), resizedH);
      const width = Math.min(Math.round((face.width / imgW) * resizedW), resizedW - left);
      const height = Math.min(Math.round((face.height / imgH) * resizedH), resizedH - top);
      return { left, top, width, height };
    })
    .filter((region) => region.width > 4 && region.height > 4);
}
