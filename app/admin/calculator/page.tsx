import { adminSupabase } from "@/lib/supabase/admin";
import { saveServiceRates, saveGradeLimits } from "@/app/actions/admin/calculator";
import { Calculator } from "lucide-react";

const GRADE_ORDER = ["1", "2", "3", "4", "5", "cognitive_support"];
const GRADE_LABELS: Record<string, string> = {
  "1": "1등급",
  "2": "2등급",
  "3": "3등급",
  "4": "4등급",
  "5": "5등급",
  cognitive_support: "인지지원등급",
};

async function getRates() {
  const { data } = await adminSupabase
    .from("ltc_service_rates")
    .select("id, duration_minutes, price, updated_at")
    .eq("service_type", "visit_care")
    .order("duration_minutes");
  return data ?? [];
}

async function getLimits() {
  const { data } = await adminSupabase
    .from("ltc_grade_limits")
    .select("id, grade, monthly_limit, updated_at");
  return data ?? [];
}

export default async function AdminCalculatorPage() {
  const [rates, limits] = await Promise.all([getRates(), getLimits()]);

  const sortedLimits = [...limits].sort(
    (a, b) => GRADE_ORDER.indexOf(a.grade) - GRADE_ORDER.indexOf(b.grade),
  );

  const lastUpdated = rates[0]?.updated_at
    ? new Date(rates[0].updated_at).toLocaleDateString("ko-KR")
    : "-";

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-2">
        <Calculator size={22} className="text-[#1A56A0]" />
        <h1 className="text-[#1A2E4A] text-2xl font-bold">본인부담금 계산기 수가 관리</h1>
      </div>
      <p className="text-[#5A7A99] text-sm mb-8">
        최종 수정: {lastUpdated} &nbsp;·&nbsp; 수정 후 반드시 저장 버튼을 눌러주세요.
      </p>

      {/* 방문요양 수가 */}
      <section className="mb-10">
        <h2 className="text-[#1A2E4A] font-bold text-base mb-4">방문요양 수가 (2026년 기준)</h2>
        <form action={saveServiceRates}>
          <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl overflow-hidden">
            <div className="grid grid-cols-[1fr_1fr_auto] gap-4 px-5 py-3 bg-[#EEF4FB] border-b border-[#A8C4E0]/40 text-[#5A7A99] text-xs font-semibold">
              <span>이용 시간</span>
              <span>수가 (원)</span>
              <span className="w-20" />
            </div>
            {rates.map((rate) => {
              const hrs = rate.duration_minutes / 60;
              const label =
                rate.duration_minutes < 60
                  ? `${rate.duration_minutes}분`
                  : Number.isInteger(hrs)
                  ? `${hrs}시간`
                  : `${Math.floor(hrs)}시간 ${rate.duration_minutes % 60}분`;
              return (
                <div
                  key={rate.id}
                  className="grid grid-cols-[1fr_1fr_auto] gap-4 items-center px-5 py-3 border-b border-[#A8C4E0]/20 last:border-0"
                >
                  <span className="text-[#1A2E4A] text-sm font-medium">{label}</span>
                  <input
                    type="number"
                    name={`rate_${rate.id}`}
                    defaultValue={rate.price}
                    min={1}
                    required
                    className="px-3 py-2 rounded-lg border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors w-full"
                  />
                  <span className="text-[#5A7A99] text-sm w-20">원/회</span>
                </div>
              );
            })}
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2.5 bg-[#1A56A0] text-white text-sm font-semibold rounded-xl hover:bg-[#1A2E4A] transition-colors"
          >
            수가 저장
          </button>
        </form>
      </section>

      {/* 등급별 월 한도액 */}
      <section>
        <h2 className="text-[#1A2E4A] font-bold text-base mb-4">등급별 월 급여 한도액 (2026년 기준)</h2>
        <form action={saveGradeLimits}>
          <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl overflow-hidden">
            <div className="grid grid-cols-[1fr_1fr_auto] gap-4 px-5 py-3 bg-[#EEF4FB] border-b border-[#A8C4E0]/40 text-[#5A7A99] text-xs font-semibold">
              <span>등급</span>
              <span>월 한도액 (원)</span>
              <span className="w-20" />
            </div>
            {sortedLimits.map((limit) => (
              <div
                key={limit.id}
                className="grid grid-cols-[1fr_1fr_auto] gap-4 items-center px-5 py-3 border-b border-[#A8C4E0]/20 last:border-0"
              >
                <span className="text-[#1A2E4A] text-sm font-medium">
                  {GRADE_LABELS[limit.grade] ?? limit.grade}
                </span>
                <input
                  type="number"
                  name={`limit_${limit.id}`}
                  defaultValue={limit.monthly_limit}
                  min={1}
                  required
                  className="px-3 py-2 rounded-lg border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors w-full"
                />
                <span className="text-[#5A7A99] text-sm w-20">원/월</span>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2.5 bg-[#1A56A0] text-white text-sm font-semibold rounded-xl hover:bg-[#1A2E4A] transition-colors"
          >
            한도액 저장
          </button>
        </form>
      </section>
    </div>
  );
}
