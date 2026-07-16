import { adminSupabase } from "@/lib/supabase/admin";

export async function logError(source: string, error: unknown): Promise<void> {
  const message = error instanceof Error ? error.message : String(error);
  await adminSupabase
    .from("error_logs")
    .insert({ source, message })
    .then(({ error: dbErr }) => {
      if (dbErr) console.error("[errorLog] DB 저장 실패:", dbErr.message);
    });
}
