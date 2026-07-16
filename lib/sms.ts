import { SolapiMessageService } from "solapi";

const messageService = new SolapiMessageService(
  process.env.SOLAPI_API_KEY!,
  process.env.SOLAPI_API_SECRET!,
);

/** 한국 전화번호 정규화: 010-1234-5678 → 01012345678 */
function normalizePhone(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}

/**
 * SMS 발송
 * 실패해도 throw하지 않고 false 반환 (메인 플로우 영향 없음)
 */
export async function sendSMS(to: string, text: string): Promise<boolean> {
  if (!process.env.SOLAPI_API_KEY || !process.env.SOLAPI_API_SECRET) {
    return false;
  }

  try {
    await messageService.send({
      to: normalizePhone(to),
      from: normalizePhone(process.env.SOLAPI_SENDER_PHONE ?? ""),
      text,
    });
    return true;
  } catch (e) {
    console.error("[SMS 발송 실패]", e);
    return false;
  }
}

/** 답변 완료 SMS (문의자에게 - 답변 내용 포함) */
export function buildReplySMS(name: string, replyContent: string) {
  const body = replyContent.length > 200 ? replyContent.slice(0, 200) + "..." : replyContent;
  return `[안강섬김노인복지센터]
${name}님, 상담 문의에 답변이 등록되었습니다.

${body}

추가 문의: 054-763-5988`;
}
