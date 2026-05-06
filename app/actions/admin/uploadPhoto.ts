// app/actions/admin/uploadPhoto.ts
// sharp로 WebP 압축 후 Cloudflare R2에 업로드하는 Server Action
// 클라이언트(PhotoUploader, hero page 등)에서 FormData로 호출

"use server";

import sharp from "sharp";
import { uploadToR2 } from "@/lib/r2";

type UploadResult =
  | { url: string; error?: never }
  | { url?: never; error: string };

/**
 * @param formData  "file" 키로 File 객체 포함
 * @param folder    R2 내 저장 경로 prefix
 *                  예) "photos/categories/42" | "hero" | "awards"
 */
export async function uploadPhoto(
  formData: FormData,
  folder: string,
): Promise<UploadResult> {
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

    const compressed = await sharp(buffer)
      .rotate() // EXIF orientation 자동 보정
      .resize(1920, 1920, {
        fit: "inside",
        withoutEnlargement: true, // 원본보다 크게 늘리지 않음
      })
      .webp({ quality: 75 }) // WebP 75% — 화질/용량 균형
      .toBuffer();

    const key = `${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.webp`;

    const url = await uploadToR2(key, compressed, "image/webp");
    return { url };
  } catch (err) {
    console.error("[uploadPhoto] 오류:", err);
    return { error: "업로드 중 서버 오류가 발생했습니다." };
  }
}
