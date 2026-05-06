"use server";

import { adminSupabase } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function saveAward(payload: {
  title: string;
  org: string;
  description: string | null;
  awarded_at: string;
  image_url: string | null;
  display_order: number;
}): Promise<{ error: string; id?: number }> {
  const { data, error } = await adminSupabase
    .from("awards")
    .insert(payload)
    .select("id")
    .single();

  if (error) return { error: "저장 중 오류가 발생했습니다: " + error.message };

  revalidatePath("/about/awards");
  revalidatePath("/admin/awards");
  return { error: "", id: data.id };
}

export async function deleteAward(id: number, imageUrl: string | null) {
  if (imageUrl) {
    const marker = "/storage/v1/object/public/awards/";
    const idx = imageUrl.indexOf(marker);
    if (idx !== -1) {
      const path = imageUrl.slice(idx + marker.length);
      await adminSupabase.storage.from("awards").remove([path]);
    }
  }

  await adminSupabase.from("awards").delete().eq("id", id);
  revalidatePath("/about/awards");
  revalidatePath("/admin/awards");
}

export async function getAwards() {
  const { data } = await adminSupabase
    .from("awards")
    .select("id, title, org, description, awarded_at, image_url, display_order")
    .order("awarded_at", { ascending: false });
  return data ?? [];
}
