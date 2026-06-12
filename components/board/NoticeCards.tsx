import Link from "next/link";

export interface Notice {
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

export function PinnedNoticeCard({ notice }: { notice: Notice }) {
  return (
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
          {notice.title}
        </h3>
        {notice.content && (
          <p
            className="mb-[22px] max-w-[60ch] text-[15px] leading-[1.7]"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            {notice.content.slice(0, 140)}
            {notice.content.length > 140 ? "…" : ""}
          </p>
        )}
        <div
          className="flex gap-[18px] text-[13px]"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          <span>
            📅 {new Date(notice.created_at).toLocaleDateString("ko-KR")}
          </span>
        </div>
        <Link
          href={`/board/notice/${notice.id}`}
          className="mt-[22px] inline-flex items-center gap-2 rounded-full bg-white px-[22px] py-3 text-[14px] font-semibold transition-transform duration-[250ms] hover:translate-x-1"
          style={{ color: "var(--pop)" }}
        >
          자세히 보기 →
        </Link>
      </div>
    </article>
  );
}

export function NoticeRow({ notice }: { notice: Notice }) {
  const d = new Date(notice.created_at);
  const month = MONTH_ABBR[d.getMonth()];
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();

  return (
    <li>
      <Link
        href={`/board/notice/${notice.id}`}
        className="group -mx-6 grid cursor-pointer items-center gap-3 sm:gap-7 border-b px-6 py-7 transition-all duration-[250ms] first:border-t hover:bg-paper-2 hover:px-8 grid-cols-[52px_1fr_auto] sm:grid-cols-[72px_1fr_auto]"
        style={{ borderColor: "var(--line)" }}
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
}
