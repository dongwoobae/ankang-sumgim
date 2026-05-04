"use server";

import { createClient } from "@/lib/supabase/server";
import { sendInquiryNotificationEmail } from "@/lib/email";
import { sendSMS, buildReceiptSMS } from "@/lib/sms";

export type InquiryState = {
  success: boolean;
  message: string;
};

export async function sendInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const name = (formData.get("name") as string).trim();
  const phone = (formData.get("phone") as string).trim();
  const email = ((formData.get("email") as string) ?? "").trim();
  const serviceType = formData.get("serviceType") as string;
  const content = (formData.get("content") as string).trim();

  if (!name || !phone || !serviceType || !content) {
    return { success: false, message: "필수 항목을 모두 입력해 주세요." };
  }

  // 1. Supabase 저장 (실패 시 즉시 return)
  const supabase = await createClient();
  const { error: dbError } = await supabase.from("inquiries").insert({
    name,
    phone,
    email: email || null,
    title: serviceType,
    content,
  });

  if (dbError) {
    return {
      success: false,
      message: "접수 중 오류가 발생했습니다. 전화로 문의해 주세요. (054-763-5988)",
    };
  }

  // 2. 알림 발송 (병렬, 실패해도 무시)
  await Promise.allSettled([
    // 관리자에게 이메일 알림
    sendInquiryNotificationEmail({ name, phone, email, serviceType, content }),
    // 문의자에게 SMS 접수 확인
    sendSMS(phone, buildReceiptSMS(name, serviceType)),
  ]);

  return {
    success: true,
    message: "상담 신청이 완료되었습니다. 곧 연락드리겠습니다.",
  };
}
