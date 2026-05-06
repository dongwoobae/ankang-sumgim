import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = `상담문의신청 <${process.env.INQUIRY_EMAIL ?? "onboarding@resend.dev"}>`;

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
    to: process.env.INQUIRY_EMAIL ?? "miyeong0695@daum.net",
    subject: `[상담문의] ${serviceType} - ${name}님`,
    html: `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background-color:#f0ebe0;font-family:'Apple SD Gothic Neo','Malgun Gothic','맑은 고딕',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0ebe0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

          <!-- 헤더 -->
          <tr>
            <td style="background-color:#1A56A0;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:13px;color:#FFFFFF;letter-spacing:3px;opacity:0.85;">ANGANG SUMGIM</p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#FFFFFF;letter-spacing:1px;">안강 섬김 노인복지센터</h1>
            </td>
          </tr>

          <!-- 본문 -->
          <tr>
            <td style="background-color:#FFFFFF;padding:36px 40px;">

              <!-- 타이틀 -->
              <p style="margin:0 0 6px 0;font-size:12px;font-weight:600;color:#1A56A0;letter-spacing:2px;">NEW INQUIRY</p>
              <h2 style="margin:0 0 24px 0;font-size:20px;font-weight:700;color:#1A2E4A;">새 상담 문의가 접수되었습니다</h2>
              <p style="margin:0 0 28px 0;font-size:14px;color:#5A7A99;line-height:1.7;">
                아래 내용을 확인하시고 빠른 시일 내에 답변 부탁드립니다.
              </p>

              <!-- 구분선 -->
              <div style="border-top:1px solid #A8C4E0;margin-bottom:28px;"></div>

              <!-- 정보 항목들 -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #EEF4FB;vertical-align:top;">
                    <span style="display:inline-block;width:80px;font-size:12px;font-weight:600;color:#5A7A99;letter-spacing:1px;">성함</span>
                    <span style="font-size:15px;font-weight:600;color:#1A2E4A;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #EEF4FB;vertical-align:top;">
                    <span style="display:inline-block;width:80px;font-size:12px;font-weight:600;color:#5A7A99;letter-spacing:1px;">연락처</span>
                    <span style="font-size:15px;color:#1A2E4A;">${phone}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #EEF4FB;vertical-align:top;">
                    <span style="display:inline-block;width:80px;font-size:12px;font-weight:600;color:#5A7A99;letter-spacing:1px;">이메일</span>
                    <span style="font-size:15px;color:#1A2E4A;">${email || "미입력"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #EEF4FB;vertical-align:top;">
                    <span style="display:inline-block;width:80px;font-size:12px;font-weight:600;color:#5A7A99;letter-spacing:1px;">문의 유형</span>
                    <span style="display:inline-block;font-size:13px;font-weight:600;color:#1A56A0;background-color:#EEF4FB;border:1px solid #A8C4E0;border-radius:20px;padding:3px 12px;">${serviceType}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;vertical-align:top;">
                    <span style="display:block;font-size:12px;font-weight:600;color:#5A7A99;letter-spacing:1px;margin-bottom:10px;">문의 내용</span>
                    <div style="background-color:#EEF4FB;border-left:3px solid #1A56A0;border-radius:0 8px 8px 0;padding:16px 18px;font-size:14px;color:#1A2E4A;line-height:1.8;white-space:pre-wrap;">${content}</div>
                  </td>
                </tr>
              </table>

              <!-- 구분선 -->
              <div style="border-top:1px solid #A8C4E0;margin:28px 0 24px;"></div>

              <!-- 접수 시간 -->
              <p style="margin:0;font-size:12px;color:#5A7A99;text-align:right;">
                접수일시: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
              </p>
            </td>
          </tr>

          <!-- 푸터 -->
          <tr>
            <td style="background-color:#EEF4FB;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;border-top:1px solid #A8C4E0;">
              <p style="margin:0 0 4px 0;font-size:13px;font-weight:600;color:#1A2E4A;">안강 섬김 노인복지센터</p>
              <p style="margin:0;font-size:12px;color:#5A7A99;">📞 054-763-5988</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
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
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background-color:#f0ebe0;font-family:'Apple SD Gothic Neo','Malgun Gothic','맑은 고딕',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0ebe0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

          <!-- 헤더 -->
          <tr>
            <td style="background-color:#1A56A0;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:13px;color:#FFFFFF;letter-spacing:3px;opacity:0.85;">ANGANG SUMGIM</p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#FFFFFF;letter-spacing:1px;">안강 섬김 노인복지센터</h1>
            </td>
          </tr>

          <!-- 본문 -->
          <tr>
            <td style="background-color:#FFFFFF;padding:36px 40px;">

              <!-- 타이틀 -->
              <p style="margin:0 0 6px 0;font-size:12px;font-weight:600;color:#1A56A0;letter-spacing:2px;">INQUIRY REPLY</p>
              <h2 style="margin:0 0 12px 0;font-size:20px;font-weight:700;color:#1A2E4A;">답변이 등록되었습니다</h2>
              <p style="margin:0 0 28px 0;font-size:14px;color:#5A7A99;line-height:1.7;">
                안녕하세요, <strong style="color:#1A2E4A;">${name}</strong>님.<br/>
                문의하신 내용에 대한 답변이 등록되었습니다.
              </p>

              <!-- 구분선 -->
              <div style="border-top:1px solid #A8C4E0;margin-bottom:28px;"></div>

              <!-- 답변 내용 -->
              <p style="margin:0 0 10px 0;font-size:12px;font-weight:600;color:#5A7A99;letter-spacing:1px;">답변 내용</p>
              <div style="background-color:#EEF4FB;border-left:3px solid #1A56A0;border-radius:0 8px 8px 0;padding:20px 22px;font-size:14px;color:#1A2E4A;line-height:1.9;white-space:pre-wrap;margin-bottom:28px;">${replyContent}</div>

              <!-- 원본 문의 -->
              <p style="margin:0 0 10px 0;font-size:12px;font-weight:600;color:#5A7A99;letter-spacing:1px;">원본 문의</p>
              <div style="background-color:#f5f0e8;border-radius:8px;padding:16px 18px;font-size:13px;color:#5A7A99;line-height:1.8;white-space:pre-wrap;">${originalContent}</div>

              <!-- 구분선 -->
              <div style="border-top:1px solid #A8C4E0;margin:28px 0 24px;"></div>

              <!-- 추가 문의 안내 -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#EEF4FB;border:1px solid #A8C4E0;border-radius:8px;padding:16px 20px;text-align:center;">
                    <p style="margin:0 0 4px 0;font-size:13px;color:#1A2E4A;">추가 문의사항이 있으시면 전화로 연락 주세요.</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:#1A56A0;">📞 054-763-5988</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- 푸터 -->
          <tr>
            <td style="background-color:#EEF4FB;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;border-top:1px solid #A8C4E0;">
              <p style="margin:0 0 4px 0;font-size:13px;font-weight:600;color:#1A2E4A;">안강 섬김 노인복지센터</p>
              <p style="margin:0;font-size:12px;color:#5A7A99;">답변일시: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
  });
}
