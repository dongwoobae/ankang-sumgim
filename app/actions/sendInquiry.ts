"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { sendInquiryNotificationEmail } from "@/lib/email";
import { sendSMS, buildReceiptSMS } from "@/lib/sms";
import { checkInquiryRateLimit } from "@/lib/rateLimit";

export type InquiryState = {
  success: boolean;
  message: string;
};

const PHONE_RE = /^(01[016789]|0[2-9]\d?)-\d{3,4}-\d{4}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // ── 스팸 방지 ──────────────────────────────────────────────
  // 1. Honeypot: 사람에겐 숨겨진 필드 — 봇만 채움
  const honeypot = (formData.get("website") as string) ?? "";
  if (honeypot.length > 0) {
    return {
      success: true,
      message: "상담 신청이 완료되었습니다. 곧 연락드리겠습니다.",
    };
  }

  // 2. 제출 시간 체크: 폼 로드 후 3초 미만이면 봇 의심
  const loadedAt = parseInt((formData.get("_t") as string) ?? "0", 10);
  if (loadedAt > 0 && Date.now() - loadedAt < 3000) {
    return {
      success: true,
      message: "상담 신청이 완료되었습니다. 곧 연락드리겠습니다.",
    };
  }

  // 3. Rate Limiting: 동일 IP 1시간 내 5회 초과 차단
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  const rateLimit = await checkInquiryRateLimit(ip);
  if (!rateLimit.allowed) {
    const retryAt = rateLimit.retryAfter.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Seoul",
    });
    return {
      success: false,
      message: `잠시 후 다시 시도해 주세요. ${retryAt} 이후 이용 가능합니다.`,
    };
  }
  // ──────────────────────────────────────────────────────────

  const name = (formData.get("name") as string).trim();
  const phone = (formData.get("phone") as string).trim();
  const email = ((formData.get("email") as string) ?? "").trim();
  const serviceType = formData.get("serviceType") as string;
  const content = (formData.get("content") as string).trim();

  if (!name || !phone || !serviceType || !content) {
    return { success: false, message: "필수 항목을 모두 입력해 주세요." };
  }

  if (!PHONE_RE.test(phone)) {
    return {
      success: false,
      message: "올바른 전화번호를 입력해 주세요. (예: 010-1234-5678)",
    };
  }

  if (email && !EMAIL_RE.test(email)) {
    return { success: false, message: "올바른 이메일 주소를 입력해 주세요." };
  }

  if (content.length > 1000) {
    return { success: false, message: "내용은 1000자 이내로 입력해 주세요." };
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
      message:
        "접수 중 오류가 발생했습니다. 전화로 문의해 주세요. (054-763-5988)",
    };
  }

  // 2. 알림 발송 (병렬, 실패해도 무시)
  await Promise.allSettled([
    sendInquiryNotificationEmail({ name, phone, email, serviceType, content }),
    sendSMS(phone, buildReceiptSMS(name, serviceType)),
  ]);

  return {
    success: true,
    message: "상담 신청이 완료되었습니다. 곧 연락드리겠습니다.",
  };
}
