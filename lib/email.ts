import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM =
  process.env.RESEND_FROM_EMAIL ?? "상담문의 <onboarding@resend.dev>";

/**
 * 이메일 발송
 * 실패해도 throw하지 않고 false 반환 (메인 플로우 영향 없음)
 */
async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false;

  try {
    await resend.emails.send({ from: FROM, ...options });
    return true;
  } catch (e) {
    console.error("[이메일 발송 실패]", e);
    return false;
  }
}

/** 관리자에게 새 문의 알림 이메일 */
export async function sendInquiryNotificationEmail(params: {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  content: string;
}) {
  const { name, phone, email, serviceType, content } = params;

  return sendEmail({
    to: process.env.INQUIRY_EMAIL ?? "ankang.sumgim@naver.com",
    subject: `[상담문의] ${serviceType} - ${name}님`,
    html: `
      <h2>안강 섬김 노인복지센터 상담 문의</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">성함</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">연락처</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">이메일</td><td style="padding:8px;border:1px solid #ddd">${email || "미입력"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">문의 유형</td><td style="padding:8px;border:1px solid #ddd">${serviceType}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">문의 내용</td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">${content}</td></tr>
      </table>
    `,
  });
}

/** 문의자에게 답변 완료 이메일 */
export async function sendReplyEmail(params: {
  to: string;
  name: string;
  originalContent: string;
  replyContent: string;
}) {
  const { to, name, originalContent, replyContent } = params;

  return sendEmail({
    to,
    subject: `[안강섬김노인복지센터] ${name}님의 문의에 답변이 등록되었습니다`,
    html: `
      <h2>안강 섬김 노인복지센터</h2>
      <p>${name}님, 문의해 주셔서 감사합니다.<br/>담당자가 답변을 등록하였습니다.</p>

      <h3 style="color:#5C4A1E">📝 답변 내용</h3>
      <div style="background:#FAF3D6;padding:16px;border-radius:8px;white-space:pre-wrap">${replyContent}</div>

      <h3 style="color:#8C8070;margin-top:24px">원본 문의</h3>
      <div style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap;color:#8C8070">${originalContent}</div>

      <hr style="margin:24px 0;border:none;border-top:1px solid #D9C97A"/>
      <p style="color:#8C8070;font-size:14px">
        추가 문의사항은 전화로 연락 주세요.<br/>
        📞 054-763-5988
      </p>
    `,
  });
}
