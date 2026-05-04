"use server";

import { adminSupabase } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CategoryFormState = { error: string };

function extractStoragePath(url: string): string | null {
  const marker = "/storage/v1/object/public/photos/";
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

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

  if (error || !category) return { error: "카테고리 생성 중 오류가 발생했습니다." };

  revalidatePath("/board/photos");
  revalidatePath("/admin/photos");
  redirect(`/admin/photos/${category.id}/upload`);
}

export async function deleteCategory(id: string) {
  const { data: photos } = await adminSupabase
    .from("photos")
    .select("url")
    .eq("category_id", id);

  if (photos && photos.length > 0) {
    const paths = photos
      .map((p) => extractStoragePath(p.url))
      .filter(Boolean) as string[];
    if (paths.length > 0) {
      await adminSupabase.storage.from("photos").remove(paths);
    }
  }

  await adminSupabase.from("photo_categories").delete().eq("id", id);
  revalidatePath("/board/photos");
  revalidatePath("/admin/photos");
}

export async function deletePhoto(id: string, url: string) {
  const path = extractStoragePath(url);
  if (path) {
    await adminSupabase.storage.from("photos").remove([path]);
  }
  await adminSupabase.from("photos").delete().eq("id", id);
  revalidatePath("/board/photos");
}

export async function savePhotoMetadata(
  categoryId: string,
  url: string,
  caption?: string
): Promise<{ error: string; id?: number }> {
  const { data, error } = await adminSupabase
    .from("photos")
    .insert({ category_id: parseInt(categoryId), url, caption: caption ?? null })
    .select("id")
    .single();

  if (error) return { error: "사진 저장 중 오류가 발생했습니다." };

  revalidatePath("/board/photos");
  return { error: "", id: data.id };
}

export async function updatePhotoCaption(id: string, caption: string) {
  await adminSupabase
    .from("photos")
    .update({ caption: caption.trim() || null })
    .eq("id", id);
  revalidatePath("/board/photos");
}
