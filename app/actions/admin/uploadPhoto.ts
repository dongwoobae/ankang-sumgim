// app/actions/admin/uploadPhoto.ts
// 얼굴이 감지된 경우 원본(original/)과 블러(blurred/) 두 버전을 R2에 업로드한다.
// 합성 자체는 lib/photo-blur.ts가 담당한다 — app/api/upload-photo/route.ts와 공유.

"use server";

import { requireSession } from "@/lib/auth/requireSession";
import { uploadAllToR2, uploadToR2 } from "@/lib/r2";
import { type FaceRegion } from "@/lib/blur-regions";
import { composePhotoUpload } from "@/lib/photo-blur";
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

    const composed = await composePhotoUpload(buffer, faceRegions ?? []);
    if (!composed.ok) return { error: composed.error };

    if (composed.kind === "plain") {
      const url = await uploadToR2(`${folder}/${timestamp}.webp`, composed.image, "image/webp");
      return { url, originalUrl: null };
    }

    const [url, originalUrl] = await uploadAllToR2(
      [
        { key: `${folder}/blurred/${timestamp}.webp`, body: composed.blurred },
        { key: `${folder}/original/${timestamp}.webp`, body: composed.original },
      ],
      "image/webp",
    );

    return { url, originalUrl };
  } catch (err) {
    console.error("[uploadPhoto] 오류:", err);
    return { error: "업로드 중 서버 오류가 발생했습니다." };
  }
}
