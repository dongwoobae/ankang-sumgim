import { adminSupabase } from "@/lib/supabase/admin";
import { AlertTriangle } from "lucide-react";

async function getErrorLogs() {
  const { data } = await adminSupabase
    .from("error_logs")
    .select("id, created_at, source, message")
    .order("created_at", { ascending: false })
    .limit(200);
  return data ?? [];
}

export default async function AdminLogsPage() {
  const logs = await getErrorLogs();

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1
          className="text-[#1A2E4A] text-2xl font-bold"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          오류 로그
        </h1>
        <p className="text-[#5A7A99] text-sm mt-1">
          최근 200건 · 서버 액션에서 발생한 오류를 기록합니다.
        </p>
      </div>

      {logs.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-12 text-center">
          <AlertTriangle size={40} className="text-[#A8C4E0] mx-auto mb-3" />
          <p className="text-[#5A7A99] text-sm">기록된 오류가 없습니다.</p>
        </div>
      ) : (
        <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl overflow-hidden">
          <div className="hidden md:grid grid-cols-[160px_1fr_2fr] gap-4 items-center px-5 py-3 bg-[#EEF4FB] border-b border-[#A8C4E0]/40 text-[#5A7A99] text-xs font-semibold">
            <span>발생 시각</span>
            <span>출처</span>
            <span>오류 내용</span>
          </div>

          {logs.map((log) => (
            <div
              key={log.id}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr_2fr] gap-1 md:gap-4 items-start px-5 py-4 border-b border-[#A8C4E0]/20 last:border-0"
            >
              <span className="text-[#5A7A99] text-xs whitespace-nowrap">
                {new Date(log.created_at).toLocaleString("ko-KR", {
                  timeZone: "Asia/Seoul",
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
              <span className="font-mono text-[#1A56A0] text-xs break-all">
                {log.source}
              </span>
              <span className="text-[#1A2E4A] text-sm break-all">
                {log.message}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
