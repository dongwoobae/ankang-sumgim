// app/actions/admin/uploadPhoto.ts
// 변경점: faceRegions 파라미터 추가 → 얼굴 영역 Sharp blur 처리
//         원본(original/)과 블러(blurred/) 두 버전을 R2에 업로드

"use server";

import { requireSession } from "@/lib/auth/requireSession";
import sharp from "sharp";
import { uploadToR2 } from "@/lib/r2";

const FOLDER_PATTERN = /^(photos|awards|hero)(\/[A-Za-z0-9_-]+)*$/;

export type FaceRegion = {
  x: number;
  y: number;
  width: number;
  height: number;
};

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

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
  if (!allowedTypes.includes(file.type)) {
    return { error: `지원하지 않는 형식입니다: ${file.type}` };
  }

  if (file.size > 30 * 1024 * 1024) {
    return { error: "파일 크기가 30MB를 초과합니다." };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
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

    // 3. 블러 처리: 각 얼굴 영역을 추출 → blur → 원래 위치에 합성
    // 리사이즈 전 원본 기준 좌표이므로 스케일 계산 필요
    const scaleX = imgW / Math.min(imgW, 1920);
    const scaleY = imgH / Math.min(imgH, 1920);

    // 리사이즈된 이미지에서 작업
    const resizedW = Math.round(imgW / Math.max(scaleX, scaleY));
    const resizedH = Math.round(imgH / Math.max(scaleX, scaleY));

    let blurPipeline = sharp(originalCompressed);

    for (const face of faceRegions) {
      // 좌표를 리사이즈된 이미지 기준으로 변환
      const scale = Math.max(imgW / resizedW, imgH / resizedH);
      const fx = Math.max(0, Math.round(face.x / scale));
      const fy = Math.max(0, Math.round(face.y / scale));
      const fw = Math.min(
        Math.round(face.width / scale),
        resizedW - fx,
      );
      const fh = Math.min(
        Math.round(face.height / scale),
        resizedH - fy,
      );

      if (fw <= 4 || fh <= 4) continue;

      // 얼굴 영역 추출 → 강하게 blur → 합성
      const faceBlurred = await sharp(originalCompressed)
        .extract({ left: fx, top: fy, width: fw, height: fh })
        .blur(28)
        .toBuffer();

      blurPipeline = blurPipeline.composite([
        { input: faceBlurred, left: fx, top: fy },
      ]);
    }

    const blurredBuffer = await blurPipeline.webp({ quality: 75 }).toBuffer();

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
