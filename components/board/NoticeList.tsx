"use client";

import { useState } from "react";
import Link from "next/link";
import Toolbar from "./Toolbar";

interface Notice {
  id: number;
  title: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
}

const MONTH_ABBR = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

export default function NoticeList({ notices }: { notices: Notice[] }) {
  const [chip, setChip] = useState("all");
  const [query, setQuery] = useState("");

  const pinned = notices.filter((n) => n.is_pinned);
  const regular = notices.filter((n) => !n.is_pinned);
  const firstPinned = pinned[0] ?? null;

  const q = query.trim().toLowerCase();

  const matchesQuery = (n: Notice) =>
    !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);

  const showPinnedCard =
    firstPinned &&
    chip !== "general" &&
    matchesQuery(firstPinned);

  const listItems = (() => {
    let base: Notice[];
    if (chip === "important") base = pinned;
    else if (chip === "general") base = regular;
    else base = firstPinned ? [...pinned.slice(1), ...regular] : regular;
    return base.filter(matchesQuery);
  })();

  const isEmpty = !showPinnedCard && listItems.length === 0;

  return (
    <>
      <Toolbar
        chips={[
          { label: "전체", value: "all", count: notices.length },
          { label: "중요", value: "important", count: pinned.length },
          { label: "일반", value: "general", count: regular.length },
        ]}
        defaultChip="all"
        searchPlaceholder="제목·내용으로 검색"
        onChipChange={setChip}
        onSearch={setQuery}
      />

      {notices.length === 0 ? (
        <p className="py-16 text-center" style={{ color: "var(--muted)" }}>
          등록된 공지사항이 없습니다.
        </p>
      ) : isEmpty ? (
        <p className="py-16 text-center" style={{ color: "var(--muted)" }}>
          {q ? `"${query}"에 해당하는 공지사항이 없습니다.` : "해당하는 공지사항이 없습니다."}
        </p>
      ) : (
        <>
          {/* 고정 공지 카드 */}
          {showPinnedCard && (
            <article
              className="relative mb-7 overflow-hidden rounded-[20px] p-10 text-white transition-all duration-[350ms] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(14,26,46,0.08)]"
              style={{
                background: "linear-gradient(135deg, var(--pop) 0%, var(--pop-3) 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute -bottom-20 -right-20 h-[280px] w-[280px] rounded-full"
                style={{ background: "rgba(255,255,255,0.08)" }}
              />
              <div
                className="pointer-events-none absolute -bottom-40 -right-40 h-[380px] w-[380px] rounded-full border"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              />
              <div className="relative">
                <span
                  className="mb-[18px] inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold tracking-wider"
                  style={{ background: "rgba(255,255,255,0.18)" }}
                >
                  📌 고정 공지
                </span>
                <h3
                  className="mb-3 max-w-[28ch] font-bold leading-[1.3]"
                  style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}
                >
                  {firstPinned.title}
                </h3>
                {firstPinned.content && (
                  <p
                    className="mb-[22px] max-w-[60ch] text-[15px] leading-[1.7]"
                    style={{ color: "rgba(255,255,255,0.82)" }}
                  >
                    {firstPinned.content.slice(0, 140)}
                    {firstPinned.content.length > 140 ? "…" : ""}
                  </p>
                )}
                <div
                  className="flex gap-[18px] text-[13px]"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  <span>
                    📅 {new Date(firstPinned.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                <Link
                  href={`/board/notice/${firstPinned.id}`}
                  className="mt-[22px] inline-flex items-center gap-2 rounded-full bg-white px-[22px] py-3 text-[14px] font-semibold transition-transform duration-[250ms] hover:translate-x-1"
                  style={{ color: "var(--pop)" }}
                >
                  자세히 보기 →
                </Link>
              </div>
            </article>
          )}

          {/* 목록 */}
          <ul className="m-0 list-none p-0">
            {listItems.map((notice) => {
              const d = new Date(notice.created_at);
              const month = MONTH_ABBR[d.getMonth()];
              const day = String(d.getDate()).padStart(2, "0");
              const year = d.getFullYear();

              return (
                <li key={notice.id}>
                  <Link
                    href={`/board/notice/${notice.id}`}
                    className="group -mx-6 grid cursor-pointer items-center gap-7 border-b px-6 py-7 transition-all duration-[250ms] first:border-t hover:bg-paper-2 hover:px-8"
                    style={{
                      gridTemplateColumns: "72px 1fr auto",
                      borderColor: "var(--line)",
                    }}
                  >
                    {/* 날짜 블록 */}
                    <div
                      className="text-center font-bold leading-tight"
                      style={{ color: "var(--pop)" }}
                    >
                      <span className="block text-[13px] tracking-wider">{month}</span>
                      <span
                        className="my-0.5 block font-extrabold"
                        style={{ fontSize: "28px", letterSpacing: "-0.03em", color: "var(--ink-2)" }}
                      >
                        {day}
                      </span>
                      <span className="block text-[11px] font-medium" style={{ color: "var(--muted)" }}>
                        {year}
                      </span>
                    </div>

                    {/* 본문 */}
                    <div className="min-w-0">
                      {notice.is_pinned && (
                        <span
                          className="mb-2 inline-block rounded px-2.5 py-[3px] text-[11px] font-semibold tracking-wider"
                          style={{ color: "var(--pop)", background: "var(--paper-3)" }}
                        >
                          중요
                        </span>
                      )}
                      <h4
                        className="mb-1.5 text-[18px] leading-[1.4] transition-colors group-hover:text-pop"
                        style={{ color: "var(--ink-2)" }}
                      >
                        {notice.title}
                      </h4>
                      {notice.content && (
                        <p
                          className="m-0 line-clamp-1 text-[14px] leading-[1.6]"
                          style={{ color: "var(--muted)" }}
                        >
                          {notice.content}
                        </p>
                      )}
                    </div>

                    {/* 화살표 */}
                    <span
                      className="text-lg transition-all duration-[250ms] group-hover:translate-x-1.5 group-hover:text-pop"
                      style={{ color: "var(--muted)" }}
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
