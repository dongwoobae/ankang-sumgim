"use server";

import { requireSession } from "@/lib/auth/requireSession";
import { revalidatePath } from "next/cache";
import { adminSupabase } from "@/lib/supabase/admin";

export async function updateApplicationStatus(id: string, status: string) {
  await requireSession();
  await adminSupabase.from("job_applications").update({ status }).eq("id", id);

  revalidatePath("/admin/recruits");
}

export async function updateApplicationMemo(formData: FormData) {
  await requireSession();
  const id = formData.get("id") as string;
  const memo = ((formData.get("memo") as string) ?? "").trim();

  await adminSupabase
    .from("job_applications")
    .update({ memo: memo || null })
    .eq("id", id);

  revalidatePath("/admin/recruits");
}
