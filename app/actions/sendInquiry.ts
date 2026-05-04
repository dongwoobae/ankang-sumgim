"use server";

import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

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
  const serviceType = formData.get("serviceType") as string; // → title로 사용
  const content = (formData.get("content") as string).trim();

  if (!name || !phone || !serviceType || !content) {
    return { success: false, message: "필수 항목을 모두 입력해 주세요." };
  }

  // Supabase에 저장 (RLS: public insert 허용)
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

  // 이메일 알림 (선택 — API 키 없어도 DB 저장은 완료됨)
  if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith("re_여기에")) {
    try {
      await resend.emails.send({
        from: "상담문의 <onboarding@resend.dev>",
        to: process.env.INQUIRY_EMAIL ?? "ankang.sumgim@naver.com",
        subject: `[상담문의] ${serviceType} - ${name}님`,
        html: `
          <h2>안강 섬김 노인복지센터 상담 문의</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">성함</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">연락처</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">이메일</td><td style="padding:8px;border:1px solid #ddd">${email || "미입력"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">문의 유형</td><td style="padding:8px;border:1px solid #ddd">${serviceType}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">문의 내용</td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">${content}</td></tr>
          </table>
        `,
      });
    } catch {
      // 이메일 실패는 무시 (DB 저장 성공이 우선)
    }
  }

  return { success: true, message: "상담 신청이 완료되었습니다. 곧 연락드리겠습니다." };
}
