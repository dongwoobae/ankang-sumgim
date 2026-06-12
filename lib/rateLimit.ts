import { adminSupabase } from "@/lib/supabase/admin";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1시간

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfter: Date };

export async function checkRateLimit(
  ip: string,
  action: string,
): Promise<RateLimitResult> {
  const key = `${ip}:${action}`;
  const { data, error } = await adminSupabase.rpc("check_rate_limit", {
    p_ip: key,
    p_max_attempts: MAX_ATTEMPTS,
    p_window_ms: WINDOW_MS,
  });

  // RPC 실패 시 fail-open (정상 사용자 차단 방지)
  if (error || !data || data.length === 0) return { allowed: true };

  const row = data[0] as { allowed: boolean; retry_after: string | null };
  return row.allowed
    ? { allowed: true }
    : { allowed: false, retryAfter: new Date(row.retry_after!) };
}

/** 하위 호환 래퍼 */
export function checkInquiryRateLimit(ip: string): Promise<RateLimitResult> {
  return checkRateLimit(ip, "inquiry");
}
