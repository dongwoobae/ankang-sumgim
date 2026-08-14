// lib/photo-blur.ts
// 업로드 이미지의 압축·얼굴 블러 합성. 서버 액션(uploadPhoto)과 API Route(upload-photo)가
// 같은 파이프라인을 쓰던 것을 한곳으로 모았다.
//
// 불변식: 얼굴이 감지된 사진은 블러가 실제로 합성된 경우에만 성공을 반환한다.
// 좌표가 전부 걸러져 합성할 영역이 없으면 무블러 압축본으로 대체하지 않고 실패한다 —
// 대체하면 어르신 얼굴이 그대로 공개 경로에 올라간다.

import sharp from "sharp";

import { scaleFaceRegions, type FaceRegion } from "@/lib/blur-regions";

const MAX_DIMENSION = 1920;
const WEBP_QUALITY = 75;
const BLUR_SIGMA = 28;

export type PhotoUploadResult =
  | { ok: true; kind: "plain"; image: Buffer }
  | { ok: true; kind: "blurred"; blurred: Buffer; original: Buffer }
  | { ok: false; error: string };

function compress(image: sharp.Sharp): Promise<Buffer> {
  return image
    .resize(MAX_DIMENSION, MAX_DIMENSION, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();
}

/**
 * @param input       원본 이미지 바이트
 * @param faceRegions 브라우저에서 감지한 원본 기준 얼굴 좌표. 빈 배열이면 블러 없이 압축만 한다.
 */
export async function composePhotoUpload(
  input: Buffer,
  faceRegions: FaceRegion[],
): Promise<PhotoUploadResult> {
  try {
    if (faceRegions.length === 0) {
      return { ok: true, kind: "plain", image: await compress(sharp(input).rotate()) };
    }

    // 얼굴 좌표는 브라우저가 EXIF 회전을 적용해 표시한 이미지 기준이다.
    const rotated = await sharp(input).rotate().toBuffer();
    const meta = await sharp(rotated).metadata();
    if (!meta.width || !meta.height) {
      return { ok: false, error: "이미지 크기를 읽을 수 없습니다." };
    }

    const original = await compress(sharp(rotated));
    const resizedMeta = await sharp(original).metadata();

    const regions = scaleFaceRegions(
      faceRegions,
      meta.width,
      meta.height,
      resizedMeta.width ?? meta.width,
      resizedMeta.height ?? meta.height,
    );

    if (regions.length === 0) {
      return {
        ok: false,
        error: "감지된 얼굴에 블러를 적용할 수 없습니다. 사진을 다시 확인해 주세요.",
      };
    }

    // composite()를 루프에서 체이닝하면 마지막 것만 적용된다. 배열로 모아 한 번에 넘긴다.
    const composites = await Promise.all(
      regions.map(async (region) => ({
        input: await sharp(original).extract(region).blur(BLUR_SIGMA).toBuffer(),
        left: region.left,
        top: region.top,
      })),
    );

    const blurred = await sharp(original)
      .composite(composites)
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();

    return { ok: true, kind: "blurred", blurred, original };
  } catch (err) {
    console.error("[composePhotoUpload] 오류:", err);
    return { ok: false, error: "이미지 처리 중 오류가 발생했습니다." };
  }
}
