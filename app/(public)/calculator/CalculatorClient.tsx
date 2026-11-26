"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, Info } from "lucide-react";
import { checkVisitCare, estimateCopay, type VisitCareCheck } from "@/lib/calculator";

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

const BLOCKED_NOTICE: Record<
  Extract<VisitCareCheck, { status: "blocked" }>["reason"],
  { title: string; body: string }
> = {
  "cognitive-support": {
    title: "인지지원등급은 방문요양 비용을 계산하지 않습니다",
    body: "인지지원등급은 일반 방문요양을 이용할 수 없습니다. 주·야간보호, 복지용구, 장기요양 가족휴가제(연 12일 이내 단기보호 또는 종일 방문요양)를 이용하실 수 있습니다. 이용 가능한 서비스와 비용은 상담으로 안내해 드립니다.",
  },
  "grade5-general": {
    title: "5등급은 이 이용 시간으로 계산할 수 없습니다",
    body: "5등급은 일반 방문요양 대신 인지활동형 방문요양(1일 1회, 2~3시간)을 이용하실 수 있습니다. 1회 이용 시간을 2시간·2시간 30분·3시간 중에서 선택해 주세요. 주·야간보호를 하루 8시간 이상 이용하시는 경우의 방문요양 등 다른 이용 방법은 상담으로 안내해 드립니다.",
  },
  "long-visit-over-limit": {
    title: "3·4등급은 3시간 30분 이상 이용을 월 4회까지만 계산합니다",
    body: "3·4등급은 수급자의 특별한 요청이 있을 때 월 4일까지만 3시간 30분 이상 연속으로 이용할 수 있습니다. 월 이용 횟수를 4회 이하로 입력하시거나, 다른 이용 계획은 상담으로 안내받으세요.",
  },
};

const CONDITIONAL_NOTE: Record<
  Extract<VisitCareCheck, { status: "conditional" }>["reason"],
  string
> = {
  "long-visit-request":
    "3·4등급의 3시간 30분 이상 연속 이용은 수급자의 특별한 요청이 있을 때 월 4일까지 가능합니다.",
  "grade5-cognitive-activity":
    "5등급은 인지활동형 방문요양(1일 1회)으로 이용하실 수 있으며, 아래 금액은 그 기준입니다.",
};

function formatKRW(n: number) {
  return n.toLocaleString("ko-KR") + "원";
}

export default function CalculatorClient({ rates, limits }: { rates: Rate[]; limits: Limit[] }) {
  const [grade, setGrade] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [visits, setVisits] = useState<string>("");

  const sortedLimits = [...limits].sort(
    (a, b) => GRADE_ORDER.indexOf(a.grade) - GRADE_ORDER.indexOf(b.grade),
  );
  const sortedRates = [...rates].sort((a, b) => a.duration_minutes - b.duration_minutes);

  const selectedLimit = limits.find((l) => l.grade === grade);
  const selectedRate = rates.find((r) => r.duration_minutes === duration);
  const visitsNum = parseInt(visits, 10);

  const check = grade ? checkVisitCare(grade, duration, visitsNum) : null;
  const blocked = check?.status === "blocked" ? BLOCKED_NOTICE[check.reason] : null;
  const note = check?.status === "conditional" ? CONDITIONAL_NOTE[check.reason] : null;

  const result =
    !blocked && selectedLimit && selectedRate && visitsNum > 0
      ? estimateCopay(selectedRate.price, visitsNum, selectedLimit.monthly_limit)
      : null;
  const stepsHidden = check?.status === "blocked" && check.reason === "cognitive-support";

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[860px] space-y-10">
        {/* Step 1 – 등급 선택 */}
        <div>
          <p className="mb-2 text-xs font-semibold tracking-widest text-muted">STEP 1</p>
          <h2 className="mb-5 text-xl font-bold text-ink-2">장기요양 등급을 선택해 주세요</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
            {sortedLimits.map((l) => (
              <button
                key={l.grade}
                type="button"
                onClick={() => setGrade(l.grade)}
                className={`rounded-xl border px-2 py-3 text-sm font-semibold transition-all duration-200
                  ${
                    grade === l.grade
                      ? "border-pop bg-pop text-white"
                      : "border-line bg-paper-2 text-ink-2 hover:border-pop"
                  }`}
              >
                {GRADE_LABELS[l.grade]}
              </button>
            ))}
          </div>
          {grade && selectedLimit && (
            <p className="mt-3 text-sm text-muted">
              월 급여 한도액:{" "}
              <span className="font-semibold text-pop">
                {formatKRW(selectedLimit.monthly_limit)}
              </span>
            </p>
          )}
        </div>

        {!stepsHidden && (
          <>
            {/* Step 2 – 1회 이용 시간 */}
            <div>
              <p className="mb-2 text-xs font-semibold tracking-widest text-muted">STEP 2</p>
              <h2 className="mb-5 text-xl font-bold text-ink-2">1회 이용 시간을 선택해 주세요</h2>
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
                      className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-200
                      ${
                        duration === r.duration_minutes
                          ? "border-pop bg-pop text-white"
                          : "border-line bg-paper-2 text-ink-2 hover:border-pop"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              {duration && selectedRate && (
                <p className="mt-3 text-sm text-muted">
                  1회 수가:{" "}
                  <span className="font-semibold text-pop">{formatKRW(selectedRate.price)}</span>
                </p>
              )}
            </div>

            {/* Step 3 – 월 이용 횟수 */}
            <div>
              <p className="mb-2 text-xs font-semibold tracking-widest text-muted">STEP 3</p>
              <h2 className="mb-5 text-xl font-bold text-ink-2">월 이용 횟수를 입력해 주세요</h2>
              <div className="flex max-w-xs items-center gap-3">
                <input
                  type="number"
                  min={1}
                  max={31}
                  value={visits}
                  onChange={(e) => setVisits(e.target.value)}
                  placeholder="예: 20"
                  className="flex-1 rounded-xl border border-line bg-paper-2 px-4 py-3 text-sm text-ink-2 transition-colors focus:border-pop focus:outline-none"
                />
                <span className="text-sm font-medium text-muted">회 / 월</span>
              </div>
            </div>
          </>
        )}

        {note && (
          <div className="flex gap-3 rounded-xl border border-line bg-paper-2 p-5">
            <Info size={16} className="mt-0.5 shrink-0 text-pop" />
            <p className="text-sm leading-relaxed text-ink-2">{note}</p>
          </div>
        )}

        {/* 결과 */}
        {blocked ? (
          <div className="overflow-hidden rounded-2xl border border-warn/40">
            <div
              className="flex items-center gap-2 px-6 py-4"
              style={{ background: "var(--warn)" }}
            >
              <Info size={18} className="shrink-0 text-white" />
              <h3 className="text-base font-bold text-white">{blocked.title}</h3>
            </div>
            <div className="space-y-5 bg-paper-2 px-6 py-6">
              <p className="text-sm leading-relaxed text-ink-2">{blocked.body}</p>
              <div className="flex flex-wrap gap-2.5">
                <Link
                  href="/inquiry"
                  className="inline-flex items-center rounded-full bg-pop px-5 py-2.5 text-sm font-bold text-white"
                >
                  상담 신청 →
                </Link>
                <a
                  href="tel:054-763-5988"
                  className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm font-bold text-ink-2 hover:border-pop"
                >
                  ☎ 054-763-5988
                </a>
              </div>
            </div>
          </div>
        ) : result ? (
          <div className="overflow-hidden rounded-2xl border border-pop/30">
            <div className="flex items-center gap-2 px-6 py-4" style={{ background: "var(--pop)" }}>
              <Calculator size={18} className="text-white" />
              <h3 className="text-base font-bold text-white">월 예상 본인부담금</h3>
            </div>
            <div className="space-y-3 bg-paper-2 px-6 py-6">
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

              <div className="my-2 border-t border-line" />

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

              <div className="my-2 border-t border-pop/30" />

              <div className="flex items-center justify-between">
                <p className="text-base font-bold text-ink-2">월 예상 본인부담금 합계</p>
                <p className="text-2xl font-bold text-pop">{formatKRW(result.totalOop)}</p>
              </div>
            </div>
          </div>
        ) : (
          grade &&
          duration && (
            <div className="rounded-xl border border-line bg-paper-2 px-6 py-5 text-center text-sm text-muted">
              월 이용 횟수를 입력하면 계산 결과가 표시됩니다.
            </div>
          )
        )}

        {/* 안내 */}
        <div className="flex gap-3 rounded-xl border border-line bg-paper-2 p-5">
          <Info size={16} className="mt-0.5 flex-shrink-0 text-muted" />
          <div className="space-y-1 text-xs leading-relaxed text-muted">
            <p>
              본 계산기는 <strong className="text-ink-2">방문요양 서비스</strong> 기준이며, 2026년
              보건복지부 고시 수가를 반영합니다.
            </p>
            <p>
              일반 수급자 기준 본인부담률 <strong className="text-ink-2">15%</strong>가 적용됩니다.
              차상위계층(9%) · 의료급여 수급자(6%) 등 감경 대상자는 실제 부담금이 다를 수 있습니다.
            </p>
            <p>
              정확한 비용은 담당 복지사와 상담하시거나 전화{" "}
              <strong className="text-ink-2">054-763-5988</strong>로 문의해 주세요.
            </p>
          </div>
        </div>
      </div>
    </section>
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
          className="text-sm font-medium"
          style={{ color: highlight === "warn" ? "var(--warn)" : "var(--ink-2)" }}
        >
          {label}
        </p>
        {sub && <p className="text-xs text-muted">{sub}</p>}
      </div>
      <p
        className="flex-shrink-0 text-sm font-semibold"
        style={{ color: highlight === "warn" ? "var(--warn)" : "var(--ink-2)" }}
      >
        {value}
      </p>
    </div>
  );
}
