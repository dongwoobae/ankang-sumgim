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
  const now = new Date();

  const { data } = await adminSupabase
    .from("inquiry_rate_limits")
    .select("attempts, window_start, blocked_until")
    .eq("ip", key)
    .single();

  if (!data) {
    await adminSupabase
      .from("inquiry_rate_limits")
      .insert({ ip: key, attempts: 1, window_start: now.toISOString() });
    return { allowed: true };
  }

  if (data.blocked_until && new Date(data.blocked_until) > now) {
    return { allowed: false, retryAfter: new Date(data.blocked_until) };
  }

  const windowStart = new Date(data.window_start);
  if (now.getTime() - windowStart.getTime() >= WINDOW_MS) {
    await adminSupabase
      .from("inquiry_rate_limits")
      .update({ attempts: 1, window_start: now.toISOString(), blocked_until: null })
      .eq("ip", key);
    return { allowed: true };
  }

  const newAttempts = data.attempts + 1;

  if (newAttempts > MAX_ATTEMPTS) {
    const blockedUntil = new Date(now.getTime() + WINDOW_MS);
    await adminSupabase
      .from("inquiry_rate_limits")
      .update({ attempts: newAttempts, blocked_until: blockedUntil.toISOString() })
      .eq("ip", key);
    return { allowed: false, retryAfter: blockedUntil };
  }

  await adminSupabase
    .from("inquiry_rate_limits")
    .update({ attempts: newAttempts })
    .eq("ip", key);

  return { allowed: true };
}

/** 하위 호환 래퍼 */
export function checkInquiryRateLimit(ip: string): Promise<RateLimitResult> {
  return checkRateLimit(ip, "inquiry");
}
