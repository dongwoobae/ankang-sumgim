"use server";

import { adminSupabase } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function saveHeroPhoto(
  url: string,
  display_order: number,
): Promise<{ error: string; id?: string }> {
  const { data, error } = await adminSupabase
    .from("hero_photos")
    .insert({ url, display_order })
    .select("id")
    .single();

  if (error) return { error: "저장 중 오류가 발생했습니다: " + error.message };

  revalidatePath("/");
  revalidatePath("/admin/hero");
  return { error: "", id: data.id };
}

export async function deleteHeroPhoto(id: string, url: string) {
  const marker = "/storage/v1/object/public/hero/";
  const idx = url.indexOf(marker);
  if (idx !== -1) {
    const path = url.slice(idx + marker.length);
    await adminSupabase.storage.from("hero").remove([path]);
  }

  await adminSupabase.from("hero_photos").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/hero");
}

export async function getHeroPhotos() {
  const { data } = await adminSupabase
    .from("hero_photos")
    .select("id, url, display_order")
    .order("display_order", { ascending: true });
  return data ?? [];
}
