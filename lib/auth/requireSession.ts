import { createClient } from "@/lib/supabase/server";

/**
 * 방어심층 가드: admin server action 진입 시 세션 확인.
 * Supabase Users에는 관리자 계정만 존재(공개 signup 비활성) → 세션 존재 = 관리자.
 * 미인증 호출 시 throw.
 */
export async function requireSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}
