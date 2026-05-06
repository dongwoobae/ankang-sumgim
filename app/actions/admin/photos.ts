// app/actions/admin/photos.ts
// 변경점: extractStoragePath + supabase.storage.remove → extractR2Key + deleteFromR2

"use server";

import { adminSupabase } from "@/lib/supabase/admin";
import { deleteFromR2, extractR2Key } from "@/lib/r2";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CategoryFormState = { error: string };

// ── 카테고리 생성 ─────────────────────────────────────────────
export async function createCategory(
  _prev: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const name = (formData.get("name") as string).trim();
  if (!name) return { error: "카테고리 이름을 입력해 주세요." };

  const { data: category, error } = await adminSupabase
    .from("photo_categories")
    .insert({ name })
    .select("id")
    .single();

  if (error || !category)
    return { error: "카테고리 생성 중 오류가 발생했습니다." };

  revalidatePath("/board/photos");
  revalidatePath("/admin/photos");
  redirect(`/admin/photos/${category.id}/upload`);
}

// ── 카테고리 삭제 (하위 사진 R2에서도 삭제) ──────────────────
export async function deleteCategory(id: string) {
  const { data: photos } = await adminSupabase
    .from("photos")
    .select("url")
    .eq("category_id", id);

  if (photos && photos.length > 0) {
    await Promise.allSettled(
      photos.map((p) => {
        const key = extractR2Key(p.url);
        return key ? deleteFromR2(key) : Promise.resolve();
      })
    );
  }

  await adminSupabase.from("photo_categories").delete().eq("id", id);
  revalidatePath("/board/photos");
  revalidatePath("/admin/photos");
}

// ── 사진 단건 삭제 ────────────────────────────────────────────
export async function deletePhoto(id: string, url: string) {
  const key = extractR2Key(url);
  if (key) {
    await deleteFromR2(key).catch((e) =>
      console.error("[deletePhoto] R2 삭제 오류:", e)
    );
  }
  await adminSupabase.from("photos").delete().eq("id", id);
  revalidatePath("/board/photos");
}

// ── 사진 메타데이터 저장 (URL → DB) ──────────────────────────
export async function savePhotoMetadata(
  categoryId: string,
  url: string,
  caption?: string
): Promise<{ error: string; id?: number }> {
  const { data, error } = await adminSupabase
    .from("photos")
    .insert({
      category_id: parseInt(categoryId),
      url,
      caption: caption ?? null,
    })
    .select("id")
    .single();

  if (error) return { error: "사진 저장 중 오류가 발생했습니다." };

  revalidatePath("/board/photos");
  return { error: "", id: data.id };
}

// ── 캡션 수정 ─────────────────────────────────────────────────
export async function updatePhotoCaption(id: string, caption: string) {
  await adminSupabase
    .from("photos")
    .update({ caption: caption.trim() || null })
    .eq("id", id);
  revalidatePath("/board/photos");
}
