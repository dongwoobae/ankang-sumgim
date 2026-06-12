"use server";

import { requireSession } from "@/lib/auth/requireSession";
import { adminSupabase } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { sendReplyEmail } from "@/lib/email";
import { sendSMS, buildReplySMS } from "@/lib/sms";

export async function markAnswered(id: string, isAnswered: boolean) {
  await requireSession();
  await adminSupabase
    .from("inquiries")
    .update({ is_answered: isAnswered })
    .eq("id", id);
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

  // 1. 답변 저장
  const { error } = await adminSupabase
    .from("inquiry_replies")
    .insert({ inquiry_id: parseInt(inquiryId), content });

  if (error) return { error: "저장 중 오류가 발생했습니다." };

  // 2. 문의 상태 업데이트 + 문의자 정보 조회 (병렬)
  const [, { data: inquiry }] = await Promise.all([
    adminSupabase
      .from("inquiries")
      .update({ is_answered: true })
      .eq("id", inquiryId),
    adminSupabase
      .from("inquiries")
      .select("name, phone, email, content")
      .eq("id", inquiryId)
      .single(),
  ]);

  // 3. 문의자 알림 발송 (실패해도 무시)
  if (inquiry) {
    const { name, phone, email, content: originalContent } = inquiry;

    await Promise.allSettled([
      // 이메일 있는 경우만 발송
      email
        ? sendReplyEmail({
            to: email,
            name,
            originalContent,
            replyContent: content,
          })
        : Promise.resolve(),
      // SMS는 항상 발송
      sendSMS(phone, buildReplySMS(name, content)),
    ]);
  }

  revalidatePath(`/admin/inquiries/${inquiryId}`);
  revalidatePath("/admin/inquiries");
  return { error: "" };
}

export async function deleteReply(id: string, inquiryId: string) {
  await requireSession();
  await adminSupabase.from("inquiry_replies").delete().eq("id", id);
  revalidatePath(`/admin/inquiries/${inquiryId}`);
}
