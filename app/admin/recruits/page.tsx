import { adminSupabase } from "@/lib/supabase/admin";
import { updateApplicationStatus, updateApplicationMemo } from "@/app/actions/admin/recruits";
import { Briefcase, PhoneCall } from "lucide-react";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "검토 대기", color: "text-[#1A56A0]" },
  reviewed: { label: "검토 완료", color: "text-yellow-600" },
  contacted: { label: "연락 완료", color: "text-green-600" },
  hired: { label: "채용 완료", color: "text-purple-600" },
  rejected: { label: "채용 불가", color: "text-red-500" },
};

const WORK_TYPE_LABELS: Record<string, string> = {
  fulltime: "정규직",
  parttime: "시간제",
  both: "모두 가능",
};

async function getApplications() {
  const { data } = await adminSupabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export default async function AdminRecruitsPage() {
  const applications = await getApplications();
  const pending = applications.filter((a) => a.status === "pending").length;

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#1A2E4A] text-2xl font-bold">구인 지원자 관리</h1>
          <p className="text-[#5A7A99] text-sm mt-1">
            전체 {applications.length}건
            {pending > 0 && (
              <span className="ml-2 text-[#1A56A0] font-medium">
                · 대기 {pending}건
              </span>
            )}
          </p>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-12 text-center">
          <Briefcase size={40} className="text-[#A8C4E0] mx-auto mb-3" />
          <p className="text-[#5A7A99] text-sm">접수된 지원서가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const statusInfo = STATUS_LABELS[app.status] ?? STATUS_LABELS.pending;
            return (
              <div
                key={app.id}
                className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl overflow-hidden"
              >
                {/* 헤더 행 */}
                <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-[#A8C4E0]/20">
                  <span className={`text-xs font-semibold ${statusInfo.color}`}>
                    ● {statusInfo.label}
                  </span>
                  <span className="text-[#1A2E4A] font-bold">{app.name}</span>
                  <a
                    href={`tel:${app.phone}`}
                    className="flex items-center gap-1 text-[#5A7A99] text-sm hover:text-[#1A56A0] transition-colors"
                  >
                    <PhoneCall size={13} />
                    {app.phone}
                  </a>
                  <span className="text-[#5A7A99] text-xs ml-auto">
                    {new Date(app.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </div>

                {/* 상세 정보 */}
                <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-[#5A7A99] text-xs mb-0.5">보유 자격증</p>
                    <p className="text-[#1A2E4A]">
                      {app.certificates?.length > 0
                        ? app.certificates.join(", ")
                        : "미입력"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#5A7A99] text-xs mb-0.5">희망 지역</p>
                    <p className="text-[#1A2E4A]">{app.preferred_region}</p>
                  </div>
                  <div>
                    <p className="text-[#5A7A99] text-xs mb-0.5">근무 형태</p>
                    <p className="text-[#1A2E4A]">
                      {WORK_TYPE_LABELS[app.work_type] ?? app.work_type}
                    </p>
                  </div>
                  {app.introduction && (
                    <div className="sm:col-span-3">
                      <p className="text-[#5A7A99] text-xs mb-0.5">자기소개</p>
                      <p className="text-[#1A2E4A] whitespace-pre-wrap leading-relaxed">
                        {app.introduction}
                      </p>
                    </div>
                  )}
                </div>

                {/* 상태 변경 + 메모 */}
                <div className="px-5 py-4 bg-[#EEF4FB] border-t border-[#A8C4E0]/20 flex flex-wrap gap-3 items-start">
                  {/* 상태 버튼들 */}
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(STATUS_LABELS).map(([value, info]) => (
                      <form key={value} action={updateApplicationStatus.bind(null, app.id, value)}>
                        <button
                          type="submit"
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors
                            ${app.status === value
                              ? "bg-[#1A56A0] border-[#1A56A0] text-white"
                              : "bg-white border-[#A8C4E0]/70 text-[#5A7A99] hover:border-[#1A56A0] hover:text-[#1A56A0]"
                            }`}
                        >
                          {info.label}
                        </button>
                      </form>
                    ))}
                  </div>

                  {/* 메모 */}
                  <form action={updateApplicationMemo} className="flex gap-2 flex-1 min-w-[200px]">
                    <input type="hidden" name="id" value={app.id} />
                    <input
                      type="text"
                      name="memo"
                      defaultValue={app.memo ?? ""}
                      placeholder="메모 입력..."
                      className="flex-1 px-3 py-1.5 rounded-lg border border-[#A8C4E0]/70 bg-white text-[#1A2E4A] text-xs focus:outline-none focus:border-[#1A56A0] transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#A8C4E0]/70 text-[#5A7A99] text-xs hover:border-[#1A56A0] hover:text-[#1A56A0] transition-colors"
                    >
                      저장
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
