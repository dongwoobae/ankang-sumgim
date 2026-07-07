"use server";

import { requireSession } from "@/lib/auth/requireSession";
import { adminSupabase } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { deleteFromR2, extractR2Key } from "@/lib/r2";
import { logError } from "@/lib/errorLog";

export async function saveAward(payload: {
  title: string;
  org: string;
  description: string | null;
  awarded_at: string;
  image_url: string | null;
  display_order: number;
}): Promise<{ error: string; id?: number }> {
  await requireSession();
  const { data, error } = await adminSupabase
    .from("awards")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    await logError("admin/awards/save", error);
    return { error: "저장 중 오류가 발생했습니다." };
  }

  revalidatePath("/");
  revalidatePath("/about/awards");
  revalidatePath("/admin/awards");
  return { error: "", id: data.id };
}

export async function deleteAward(id: number) {
  await requireSession();
  const { data: award } = await adminSupabase
    .from("awards")
    .select("image_url")
    .eq("id", id)
    .single();

  if (award?.image_url) {
    const key = extractR2Key(award.image_url);
    if (key) {
      await deleteFromR2(key).catch((e) =>
        console.error("[deleteAward] R2 삭제 오류:", e),
      );
    }
  }
  await adminSupabase.from("awards").delete().eq("id", id);
  revalidatePath("/");
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
