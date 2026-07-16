// app/actions/admin/uploadPhoto.ts
// 변경점: faceRegions 파라미터 추가 → 얼굴 영역 Sharp blur 처리
//         원본(original/)과 블러(blurred/) 두 버전을 R2에 업로드

"use server";

import { requireSession } from "@/lib/auth/requireSession";
import sharp from "sharp";
import { uploadToR2 } from "@/lib/r2";
import { scaleFaceRegions, type FaceRegion } from "@/lib/blur-regions";
import { detectImageType } from "@/lib/image-type";

const FOLDER_PATTERN = /^(photos|awards|hero)(\/[A-Za-z0-9_-]+)*$/;

type UploadResult =
  | { url: string; originalUrl: string | null; error?: never }
  | { url?: never; originalUrl?: never; error: string };

/**
 * @param formData    "file" 키로 File 객체 포함
 * @param folder      R2 내 저장 경로 prefix (예: "photos/categories/42")
 * @param faceRegions 브라우저에서 감지한 얼굴 좌표 배열 (없으면 blur 없이 업로드)
 */
export async function uploadPhoto(
  formData: FormData,
  folder: string,
  faceRegions?: FaceRegion[],
): Promise<UploadResult> {
  await requireSession();
  if (!FOLDER_PATTERN.test(folder)) return { error: "잘못된 folder" };

  const file = formData.get("file") as File | null;
  if (!file) return { error: "파일이 없습니다." };

  // HEIC 제외: Vercel의 sharp 프리빌드에 HEVC 디코더가 없어 처리 불가
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return {
      error: `지원하지 않는 형식입니다: ${file.type} (HEIC는 JPG로 변환 후 업로드)`,
    };
  }

  if (file.size > 30 * 1024 * 1024) {
    return { error: "파일 크기가 30MB를 초과합니다." };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    // file.type은 클라이언트 선언값이라 위조 가능 → 매직바이트로 실제 포맷 확인
    const detected = detectImageType(buffer);
    if (!detected || !allowedTypes.includes(detected)) {
      return { error: "이미지 파일이 아니거나 지원하지 않는 형식입니다." };
    }

    const timestamp = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    // ── 얼굴 없는 경우: 기존 방식대로 단순 업로드 ─────────────
    if (!faceRegions || faceRegions.length === 0) {
      const compressed = await sharp(buffer)
        .rotate()
        .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 75 })
        .toBuffer();

      const key = `${folder}/${timestamp}.webp`;
      const url = await uploadToR2(key, compressed, "image/webp");
      return { url, originalUrl: null };
    }

    // ── 얼굴 있는 경우: 원본 + 블러 버전 각각 업로드 ──────────

    // 1. EXIF 회전 적용한 버퍼 생성 (브라우저 표시 기준과 동일하게)
    const rotatedBuffer = await sharp(buffer).rotate().toBuffer();
    const meta = await sharp(rotatedBuffer).metadata();
    const imgW = meta.width ?? 1920;
    const imgH = meta.height ?? 1920;

    // 2. 원본 압축 버전 생성
    const originalCompressed = await sharp(rotatedBuffer)
      .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();

    // 3. 블러 처리: 얼굴 좌표를 리사이즈본 기준으로 변환해 추출 → blur → 합성
    const resizedMeta = await sharp(originalCompressed).metadata();
    const composites = await Promise.all(
      scaleFaceRegions(
        faceRegions,
        imgW,
        imgH,
        resizedMeta.width ?? imgW,
        resizedMeta.height ?? imgH,
      ).map(async (region) => {
        const faceBlurred = await sharp(originalCompressed).extract(region).blur(28).toBuffer();
        return { input: faceBlurred, left: region.left, top: region.top };
      }),
    );

    const blurredBuffer =
      composites.length > 0
        ? await sharp(originalCompressed).composite(composites).webp({ quality: 75 }).toBuffer()
        : originalCompressed;

    // 4. R2에 두 버전 병렬 업로드
    const blurredKey = `${folder}/blurred/${timestamp}.webp`;
    const originalKey = `${folder}/original/${timestamp}.webp`;

    const [url, originalUrl] = await Promise.all([
      uploadToR2(blurredKey, blurredBuffer, "image/webp"),
      uploadToR2(originalKey, originalCompressed, "image/webp"),
    ]);

    return { url, originalUrl };
  } catch (err) {
    console.error("[uploadPhoto] 오류:", err);
    return { error: "업로드 중 서버 오류가 발생했습니다." };
  }
}
