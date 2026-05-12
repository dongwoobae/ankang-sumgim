"use client";

import { useState } from "react";
import { Calculator, Info } from "lucide-react";

type Rate = {
  id: string;
  duration_minutes: number;
  price: number;
};

type Limit = {
  id: string;
  grade: string;
  monthly_limit: number;
};

const GRADE_ORDER = ["1", "2", "3", "4", "5", "cognitive_support"];
const GRADE_LABELS: Record<string, string> = {
  "1": "1등급",
  "2": "2등급",
  "3": "3등급",
  "4": "4등급",
  "5": "5등급",
  cognitive_support: "인지지원등급",
};

function formatKRW(n: number) {
  return n.toLocaleString("ko-KR") + "원";
}

export default function CalculatorClient({
  rates,
  limits,
}: {
  rates: Rate[];
  limits: Limit[];
}) {
  const [grade, setGrade] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [visits, setVisits] = useState<string>("");

  const sortedLimits = [...limits].sort(
    (a, b) => GRADE_ORDER.indexOf(a.grade) - GRADE_ORDER.indexOf(b.grade),
  );
  const sortedRates = [...rates].sort(
    (a, b) => a.duration_minutes - b.duration_minutes,
  );

  const selectedLimit = limits.find((l) => l.grade === grade);
  const selectedRate = rates.find((r) => r.duration_minutes === duration);
  const visitsNum = parseInt(visits, 10);

  let result: {
    totalCost: number;
    covered: number;
    excess: number;
    oop15: number;
    totalOop: number;
  } | null = null;

  if (selectedLimit && selectedRate && visitsNum > 0) {
    const totalCost = selectedRate.price * visitsNum;
    const covered = Math.min(totalCost, selectedLimit.monthly_limit);
    const excess = Math.max(0, totalCost - selectedLimit.monthly_limit);
    const oop15 = Math.round(covered * 0.15);
    const totalOop = oop15 + excess;
    result = { totalCost, covered, excess, oop15, totalOop };
  }

  return (
    <div>
      {/* 배너 */}
      <section
        style={{
          background: "linear-gradient(135deg, #EEF4FB 0%, #F0E4A8 100%)",
        }}
        className="py-16"
      >
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
            CALCULATOR
          </p>
          <h1 className="text-[#1A2E4A] text-4xl font-bold">
            본인부담금 계산기
          </h1>
          <p className="text-[#5A7A99] mt-3">
            방문요양 이용 시 예상 월 본인부담금을 미리 확인해 보세요
          </p>
        </div>
      </section>

      {/* 계산기 본체 */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-10">

          {/* Step 1 – 등급 선택 */}
          <div>
            <p className="text-[#5A7A99] text-xs font-semibold tracking-widest mb-2">
              STEP 1
            </p>
            <h2 className="text-[#1A2E4A] text-xl font-bold mb-5">
              장기요양 등급을 선택해 주세요
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {sortedLimits.map((l) => (
                <button
                  key={l.grade}
                  type="button"
                  onClick={() => setGrade(l.grade)}
                  className={`py-3 px-2 rounded-xl border text-sm font-semibold transition-all duration-200
                    ${
                      grade === l.grade
                        ? "bg-[#1A56A0] border-[#1A56A0] text-white"
                        : "bg-[#EEF4FB] border-[#A8C4E0]/50 text-[#1A2E4A] hover:border-[#1A56A0]"
                    }`}
                >
                  {GRADE_LABELS[l.grade]}
                </button>
              ))}
            </div>
            {grade && selectedLimit && (
              <p className="mt-3 text-sm text-[#5A7A99]">
                월 급여 한도액:{" "}
                <span className="font-semibold text-[#1A56A0]">
                  {formatKRW(selectedLimit.monthly_limit)}
                </span>
              </p>
            )}
          </div>

          {/* Step 2 – 1회 이용 시간 */}
          <div>
            <p className="text-[#5A7A99] text-xs font-semibold tracking-widest mb-2">
              STEP 2
            </p>
            <h2 className="text-[#1A2E4A] text-xl font-bold mb-5">
              1회 이용 시간을 선택해 주세요
            </h2>
            <div className="flex flex-wrap gap-2">
              {sortedRates.map((r) => {
                const hrs = r.duration_minutes / 60;
                const label =
                  r.duration_minutes < 60
                    ? `${r.duration_minutes}분`
                    : Number.isInteger(hrs)
                    ? `${hrs}시간`
                    : `${Math.floor(hrs)}시간 ${r.duration_minutes % 60}분`;
                return (
                  <button
                    key={r.duration_minutes}
                    type="button"
                    onClick={() => setDuration(r.duration_minutes)}
                    className={`py-2.5 px-5 rounded-xl border text-sm font-semibold transition-all duration-200
                      ${
                        duration === r.duration_minutes
                          ? "bg-[#1A56A0] border-[#1A56A0] text-white"
                          : "bg-[#EEF4FB] border-[#A8C4E0]/50 text-[#1A2E4A] hover:border-[#1A56A0]"
                      }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            {duration && selectedRate && (
              <p className="mt-3 text-sm text-[#5A7A99]">
                1회 수가:{" "}
                <span className="font-semibold text-[#1A56A0]">
                  {formatKRW(selectedRate.price)}
                </span>
              </p>
            )}
          </div>

          {/* Step 3 – 월 이용 횟수 */}
          <div>
            <p className="text-[#5A7A99] text-xs font-semibold tracking-widest mb-2">
              STEP 3
            </p>
            <h2 className="text-[#1A2E4A] text-xl font-bold mb-5">
              월 이용 횟수를 입력해 주세요
            </h2>
            <div className="flex items-center gap-3 max-w-xs">
              <input
                type="number"
                min={1}
                max={31}
                value={visits}
                onChange={(e) => setVisits(e.target.value)}
                placeholder="예: 20"
                className="flex-1 px-4 py-3 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors"
              />
              <span className="text-[#5A7A99] text-sm font-medium">회 / 월</span>
            </div>
          </div>

          {/* 결과 */}
          {result ? (
            <div className="rounded-2xl border border-[#1A56A0]/30 overflow-hidden">
              <div className="bg-[#1A56A0] px-6 py-4 flex items-center gap-2">
                <Calculator size={18} className="text-white" />
                <h3 className="text-white font-bold text-base">
                  월 예상 본인부담금
                </h3>
              </div>
              <div className="bg-[#EEF4FB] px-6 py-6 space-y-3">
                <Row
                  label="월 총 이용금액"
                  value={formatKRW(result.totalCost)}
                  sub={`${selectedRate!.price.toLocaleString()}원 × ${visitsNum}회`}
                />
                <Row
                  label="급여 한도 내 이용금액"
                  value={formatKRW(result.covered)}
                  sub="건강보험 적용 부분"
                />
                {result.excess > 0 && (
                  <Row
                    label="한도 초과 이용금액"
                    value={formatKRW(result.excess)}
                    sub="전액 본인 부담"
                    highlight="warn"
                  />
                )}

                <div className="border-t border-[#A8C4E0] my-2" />

                <Row
                  label="본인부담금 (15%)"
                  value={formatKRW(result.oop15)}
                  sub="급여 이용금액의 15%"
                />
                {result.excess > 0 && (
                  <Row
                    label="초과분 (전액 본인부담)"
                    value={formatKRW(result.excess)}
                    sub="한도 초과분 100%"
                    highlight="warn"
                  />
                )}

                <div className="border-t border-[#1A56A0]/30 my-2" />

                <div className="flex items-center justify-between">
                  <p className="text-[#1A2E4A] font-bold text-base">
                    월 예상 본인부담금 합계
                  </p>
                  <p className="text-[#1A56A0] font-bold text-2xl">
                    {formatKRW(result.totalOop)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            grade && duration && (
              <div className="rounded-xl bg-[#EEF4FB] border border-[#A8C4E0]/50 px-6 py-5 text-center text-[#5A7A99] text-sm">
                월 이용 횟수를 입력하면 계산 결과가 표시됩니다.
              </div>
            )
          )}

          {/* 안내 */}
          <div className="rounded-xl bg-[#EEF4FB] border border-[#A8C4E0]/50 p-5 flex gap-3">
            <Info size={16} className="text-[#5A7A99] flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-[#5A7A99] leading-relaxed">
              <p>
                본 계산기는 <strong className="text-[#1A2E4A]">방문요양 서비스</strong> 기준이며, 2026년 보건복지부 고시 수가를 반영합니다.
              </p>
              <p>
                일반 수급자 기준 본인부담률 <strong className="text-[#1A2E4A]">15%</strong>가 적용됩니다. 차상위계층(9%) · 의료급여 수급자(6%) 등 감경 대상자는 실제 부담금이 다를 수 있습니다.
              </p>
              <p>
                정확한 비용은 담당 복지사와 상담하시거나 전화 <strong className="text-[#1A2E4A]">054-763-5988</strong>로 문의해 주세요.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: "warn";
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p
          className={`text-sm font-medium ${highlight === "warn" ? "text-orange-600" : "text-[#1A2E4A]"}`}
        >
          {label}
        </p>
        {sub && <p className="text-xs text-[#5A7A99]">{sub}</p>}
      </div>
      <p
        className={`text-sm font-semibold flex-shrink-0 ${highlight === "warn" ? "text-orange-600" : "text-[#1A2E4A]"}`}
      >
        {value}
      </p>
    </div>
  );
}
