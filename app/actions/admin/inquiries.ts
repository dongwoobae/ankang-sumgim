"use server";

import { requireSession } from "@/lib/auth/requireSession";
import { adminSupabase } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function markAnswered(id: string, isAnswered: boolean) {
  await requireSession();
  await adminSupabase.from("inquiries").update({ is_answered: isAnswered }).eq("id", id);
  revalidatePath("/admin/inquiries");
}

export async function createReply(
  _prev: { error: string },
  formData: FormData,
): Promise<{ error: string }> {
  await requireSession();
  const inquiryId = formData.get("inquiry_id") as string;
  const content = (formData.get("content") as string).trim();

  if (!content) return { error: "답변 내용을 입력해 주세요." };

  const { error } = await adminSupabase
    .from("inquiry_replies")
    .insert({ inquiry_id: parseInt(inquiryId), content });

  if (error) return { error: "저장 중 오류가 발생했습니다." };

  await adminSupabase.from("inquiries").update({ is_answered: true }).eq("id", inquiryId);

  revalidatePath(`/admin/inquiries/${inquiryId}`);
  revalidatePath("/admin/inquiries");
  return { error: "" };
}

export async function deleteReply(id: string, inquiryId: string) {
  await requireSession();
  await adminSupabase.from("inquiry_replies").delete().eq("id", id);
  revalidatePath(`/admin/inquiries/${inquiryId}`);
}
