"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { sendJobApplicationNotificationEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rateLimit";

export type JobApplicationState = {
  success: boolean;
  message: string;
};

const PHONE_RE = /^(01[016789]|0[2-9]\d?)-\d{3,4}-\d{4}$/;

export async function submitJobApplication(
  _prev: JobApplicationState,
  formData: FormData,
): Promise<JobApplicationState> {
  // Honeypot
  const honeypot = (formData.get("website") as string) ?? "";
  if (honeypot.length > 0) {
    return { success: true, message: "지원서가 접수되었습니다. 확인 후 연락드리겠습니다." };
  }

  // Rate Limit
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  const rateLimit = await checkRateLimit(ip, "recruit");
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

  const name = ((formData.get("name") as string) ?? "").trim();
  const phone = ((formData.get("phone") as string) ?? "").trim();
  const certificates = formData.getAll("certificates") as string[];
  const preferredRegion = ((formData.get("preferred_region") as string) ?? "").trim();
  const workType = (formData.get("work_type") as string) ?? "";
  const introduction = ((formData.get("introduction") as string) ?? "").trim();

  if (!name || !phone || !preferredRegion || !workType) {
    return { success: false, message: "필수 항목을 모두 입력해 주세요." };
  }

  if (!PHONE_RE.test(phone)) {
    return { success: false, message: "올바른 전화번호를 입력해 주세요. (예: 010-1234-5678)" };
  }

  if (introduction.length > 500) {
    return { success: false, message: "자기소개는 500자 이내로 입력해 주세요." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("job_applications").insert({
    name,
    phone,
    certificates,
    preferred_region: preferredRegion,
    work_type: workType,
    introduction: introduction || null,
  });

  if (error) {
    return {
      success: false,
      message: "접수 중 오류가 발생했습니다. 전화로 문의해 주세요. (054-763-5988)",
    };
  }

  await sendJobApplicationNotificationEmail({
    name,
    phone,
    certificates,
    preferredRegion,
    workType,
    introduction: introduction || undefined,
  });

  return { success: true, message: "지원서가 접수되었습니다. 확인 후 연락드리겠습니다." };
}
