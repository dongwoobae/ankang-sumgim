// app/actions/admin/applyManualBlur.ts
// 수동 블러 편집기에서 선택한 영역을 Sharp로 처리
// 원본(original_url)을 기반으로 새 블러 버전 생성 → url 교체

"use server";

import sharp from "sharp";
import { uploadToR2, deleteFromR2, extractR2Key } from "@/lib/r2";
import { adminSupabase } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

// 영역 좌표는 이미지 크기 대비 0~1 비율로 전달
export type BlurRegion = {
  x: number; // 0~1
  y: number; // 0~1
  w: number; // 0~1
  h: number; // 0~1
};

type Result = { url: string; error?: never } | { url?: never; error: string };

export async function applyManualBlur(
  photoId: number,
  regions: BlurRegion[],
): Promise<Result> {
  if (regions.length === 0) return { error: "블러 영역을 선택해 주세요." };

  try {
    // 1. 현재 사진 정보 조회
    const { data: photo } = await adminSupabase
      .from("photos")
      .select("url, original_url, category_id")
      .eq("id", photoId)
      .single();

    if (!photo) return { error: "사진을 찾을 수 없습니다." };

    // 2. 편집 기준 이미지: original_url 있으면 원본, 없으면 현재 url
    const baseUrl = photo.original_url ?? photo.url;

    // 3. 원본 이미지 다운로드
    const res = await fetch(baseUrl);
    if (!res.ok) return { error: "이미지를 불러올 수 없습니다." };
    const buffer = Buffer.from(await res.arrayBuffer());

    // 4. 이미지 크기 조회 (좌표 계산용)
    const meta = await sharp(buffer).metadata();
    const imgW = meta.width ?? 1920;
    const imgH = meta.height ?? 1920;

    // 5. 각 영역 blur 합성
    let pipeline = sharp(buffer);

    for (const r of regions) {
      const fx = Math.max(0, Math.round(r.x * imgW));
      const fy = Math.max(0, Math.round(r.y * imgH));
      const fw = Math.min(Math.round(r.w * imgW), imgW - fx);
      const fh = Math.min(Math.round(r.h * imgH), imgH - fy);

      if (fw <= 4 || fh <= 4) continue;

      const blurredRegion = await sharp(buffer)
        .extract({ left: fx, top: fy, width: fw, height: fh })
        .blur(28)
        .toBuffer();

      pipeline = pipeline.composite([{ input: blurredRegion, left: fx, top: fy }]);
    }

    const blurredBuffer = await pipeline
      .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();

    // 6. 새 블러 버전 R2 업로드
    const folder = `photos/categories/${photo.category_id}/manual`;
    const newKey = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;
    const newUrl = await uploadToR2(newKey, blurredBuffer, "image/webp");

    // 7. 기존 블러 버전 R2에서 삭제 (original이 아닌 url만)
    if (photo.url !== photo.original_url) {
      const oldKey = extractR2Key(photo.url);
      if (oldKey) await deleteFromR2(oldKey).catch(console.error);
    }

    // 8. DB 업데이트
    // original_url이 없던 사진이면 현재 url을 original_url로 승격
    await adminSupabase
      .from("photos")
      .update({
        url: newUrl,
        original_url: photo.original_url ?? photo.url,
        is_face_blurred: true,
      })
      .eq("id", photoId);

    revalidatePath("/board/photos");
    return { url: newUrl };
  } catch (err) {
    console.error("[applyManualBlur] 오류:", err);
    return { error: "블러 처리 중 오류가 발생했습니다." };
  }
}
