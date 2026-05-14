"use client";

import { useState } from "react";
import Image from "next/image";
import { Award } from "lucide-react";

interface AwardItem {
  id: string;
  title: string;
  org: string;
  description: string | null;
  awarded_at: string;
  image_url: string | null;
}

const YEAR_FILTERS = ["전체", "2026", "2025", "2024 이전"] as const;
type Filter = (typeof YEAR_FILTERS)[number];

function matchesFilter(award: AwardItem, filter: Filter) {
  if (filter === "전체") return true;
  const year = new Date(award.awarded_at).getFullYear();
  if (filter === "2024 이전") return year <= 2024;
  return year === Number(filter);
}

export default function AwardsList({ awards }: { awards: AwardItem[] }) {
  const [active, setActive] = useState<Filter>("전체");

  const filtered = awards.filter((a) => matchesFilter(a, active));

  return (
    <>
      {/* 연도 필터 칩 */}
      <div className="mb-10 flex flex-wrap gap-2">
        {YEAR_FILTERS.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => setActive(y)}
            className="rounded-full border px-4 py-1.5 text-sm font-medium transition-colors"
            style={
              active === y
                ? { background: "var(--pop)", borderColor: "var(--pop)", color: "white" }
                : { background: "white", borderColor: "var(--line)", color: "var(--ink-2)" }
            }
          >
            {y}
          </button>
        ))}
      </div>

      {/* 수상 목록 */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm" style={{ color: "var(--muted)" }}>
          해당 연도에 등록된 수상 내역이 없습니다.
        </p>
      ) : (
        <div className="space-y-5">
          {filtered.map((award) => (
            <div
              key={award.id}
              className="flex gap-6 rounded-2xl border p-7"
              style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}
            >
              <div
                className="flex h-28 w-28 flex-shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl border"
                style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}
              >
                {award.image_url ? (
                  <Image
                    src={award.image_url}
                    alt={award.title}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <Award size={24} style={{ color: "var(--pop)" }} className="mb-1" />
                    <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                      사진 없음
                    </span>
                  </>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-1 text-sm font-bold" style={{ color: "var(--pop)" }}>
                  {new Date(award.awarded_at).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="mb-1 text-lg font-bold" style={{ color: "var(--ink-2)" }}>
                  {award.title}
                </h3>
                <p className="mb-2 text-sm font-medium" style={{ color: "var(--pop)" }}>
                  수여: {award.org}
                </p>
                {award.description && (
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {award.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
