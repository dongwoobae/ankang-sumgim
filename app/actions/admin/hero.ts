// app/actions/admin/hero.ts
// 변경점: supabase.storage → R2 (삭제 부분)
// 업로드는 hero/page.tsx에서 uploadPhoto 서버 액션으로 호출

"use server";

import { adminSupabase } from "@/lib/supabase/admin";
import { deleteFromR2, extractR2Key } from "@/lib/r2";
import { revalidatePath } from "next/cache";
import { logError } from "@/lib/errorLog";

export async function saveHeroPhoto(
  url: string,
  display_order: number
): Promise<{ error: string; id?: string }> {
  const { data, error } = await adminSupabase
    .from("hero_photos")
    .insert({ url, display_order })
    .select("id")
    .single();

  if (error) {
    await logError("admin/hero/save", error);
    return { error: "저장 중 오류가 발생했습니다." };
  }

  revalidatePath("/");
  revalidatePath("/admin/hero");
  return { error: "", id: data.id };
}

export async function deleteHeroPhoto(id: string, url: string) {
  const key = extractR2Key(url);
  if (key) {
    await deleteFromR2(key).catch((e) =>
      console.error("[deleteHeroPhoto] R2 삭제 오류:", e)
    );
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
