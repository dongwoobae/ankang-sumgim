// app/actions/admin/applyManualBlur.ts

"use server";

import { requireSession } from "@/lib/auth/requireSession";
import sharp from "sharp";
import { uploadToR2, deleteFromR2, extractR2Key } from "@/lib/r2";
import { adminSupabase } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export type BlurRegion = {
  x: number; // 0~1 비율
  y: number;
  w: number;
  h: number;
};

type Result = { url: string; error?: never } | { url?: never; error: string };

function isValidRegion(region: BlurRegion): boolean {
  return [region.x, region.y, region.w, region.h].every(
    (n) => Number.isFinite(n) && n >= 0 && n <= 1,
  );
}

export async function applyManualBlur(
  photoId: number,
  regions: BlurRegion[],
): Promise<Result> {
  await requireSession();
  if (regions.length === 0) return { error: "블러 영역을 선택해 주세요." };
  if (regions.length > 50 || !regions.every(isValidRegion)) {
    return { error: "잘못된 블러 영역입니다." };
  }

  try {
    // 1. 현재 사진 정보 조회
    const { data: photo } = await adminSupabase
      .from("photos")
      .select("url, original_url, category_id")
      .eq("id", photoId)
      .single();

    if (!photo) return { error: "사진을 찾을 수 없습니다." };

    // 2. 편집 기준: original_url 있으면 원본, 없으면 현재 url
    const baseUrl = photo.original_url ?? photo.url;
    const publicUrl = process.env.R2_PUBLIC_URL;
    if (!publicUrl || !baseUrl.startsWith(publicUrl)) {
      return { error: "잘못된 이미지 경로" };
    }

    // 3. 원본 이미지 다운로드
    const res = await fetch(baseUrl);
    if (!res.ok) return { error: "이미지를 불러올 수 없습니다." };
    const buffer = Buffer.from(await res.arrayBuffer());

    // 4. 이미지 크기 조회
    const meta = await sharp(buffer).metadata();
    const imgW = meta.width ?? 1920;
    const imgH = meta.height ?? 1920;

    // 5. 모든 영역의 블러 버퍼를 먼저 병렬로 생성
    //    ※ composite()를 루프에서 체이닝하면 마지막 것만 적용되므로
    //       배열로 모아서 한 번에 composite()에 전달
    const composites = await Promise.all(
      regions
        .map((r) => ({
          fx: Math.max(0, Math.round(r.x * imgW)),
          fy: Math.max(0, Math.round(r.y * imgH)),
          fw: Math.min(Math.round(r.w * imgW), imgW - Math.max(0, Math.round(r.x * imgW))),
          fh: Math.min(Math.round(r.h * imgH), imgH - Math.max(0, Math.round(r.y * imgH))),
        }))
        .filter(({ fw, fh }) => fw > 4 && fh > 4)
        .map(async ({ fx, fy, fw, fh }) => {
          const blurredRegion = await sharp(buffer)
            .extract({ left: fx, top: fy, width: fw, height: fh })
            .blur(28)
            .toBuffer();
          return { input: blurredRegion, left: fx, top: fy };
        }),
    );

    if (composites.length === 0) return { error: "유효한 블러 영역이 없습니다." };

    // 6. 전체 composites를 한 번에 적용
    const blurredBuffer = await sharp(buffer)
      .composite(composites)
      .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();

    // 7. 새 블러 버전 R2 업로드
    const folder = `photos/categories/${photo.category_id}/manual`;
    const newKey = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;
    const newUrl = await uploadToR2(newKey, blurredBuffer, "image/webp");

    // 8. 기존 블러 버전 삭제
    //    ※ original_url이 이미 존재했던 경우(이전에 블러된 사진)만 삭제
    //      original_url이 없었다면 현재 url = 원본이므로 삭제하면 안 됨
    if (photo.original_url && photo.url !== photo.original_url) {
      const oldKey = extractR2Key(photo.url);
      if (oldKey) await deleteFromR2(oldKey).catch(console.error);
    }

    // 9. DB 업데이트
    //    original_url이 없던 사진이면 현재 url을 원본으로 승격
    await adminSupabase
      .from("photos")
      .update({
        url: newUrl,
        original_url: photo.original_url ?? photo.url,
        is_face_blurred: true,
      })
      .eq("id", photoId);

    revalidatePath("/board/photos");
    revalidatePath("/board/photos/[id]", "page");
    return { url: newUrl };
  } catch (err) {
    console.error("[applyManualBlur] 오류:", err);
    return { error: "블러 처리 중 오류가 발생했습니다." };
  }
}
