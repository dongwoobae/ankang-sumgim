// app/actions/admin/hero.ts
// 업로드·삭제 모두 R2 기준 (업로드는 hero/page.tsx에서 uploadPhoto 서버 액션 호출)

"use server";

import { requireSession } from "@/lib/auth/requireSession";
import { adminSupabase } from "@/lib/supabase/admin";
import { deleteFromR2, extractR2Key } from "@/lib/r2";
import { revalidatePath } from "next/cache";
import { logError } from "@/lib/errorLog";

export async function saveHeroPhoto(
  url: string,
  display_order: number
): Promise<{ error: string; id?: string }> {
  await requireSession();
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

export async function deleteHeroPhoto(id: string) {
  await requireSession();
  const { data: photo } = await adminSupabase
    .from("hero_photos")
    .select("url")
    .eq("id", id)
    .single();

  if (photo?.url) {
    const key = extractR2Key(photo.url);
    if (key) {
      await deleteFromR2(key).catch((e) =>
        console.error("[deleteHeroPhoto] R2 삭제 오류:", e)
      );
    }
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
