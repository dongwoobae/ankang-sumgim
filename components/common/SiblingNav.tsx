import Link from "next/link";

interface SibItem {
  label: string;
  desc?: string;
  href: string;
}

interface Props {
  prev?: SibItem;
  next?: SibItem;
}

export default function SiblingNav({ prev, next }: Props) {
  return (
    <div
      className="grid grid-cols-1 gap-4 border-t pt-8 md:grid-cols-2"
      style={{ borderColor: "var(--line)" }}
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group block rounded-2xl border bg-white p-5 transition-all hover:border-pop hover:bg-paper-3"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="mb-1.5 text-[11px] tracking-wider" style={{ color: "var(--muted)" }}>
            ← 이전
          </div>
          <div
            className="mb-1 text-[17px] font-bold transition-colors group-hover:text-pop"
            style={{ color: "var(--ink-2)" }}
          >
            {prev.label}
          </div>
          {prev.desc && (
            <div className="text-[13px]" style={{ color: "var(--muted)" }}>
              {prev.desc}
            </div>
          )}
        </Link>
      ) : (
        <div
          className="rounded-2xl border p-5 opacity-40"
          style={{ borderColor: "var(--line)", background: "white" }}
        >
          <div className="text-[11px]" style={{ color: "var(--muted)" }}>
            ← 이전
          </div>
          <div className="text-[17px] font-bold" style={{ color: "var(--ink-2)" }}>
            이전 페이지 없음
          </div>
        </div>
      )}

      {next ? (
        <Link
          href={next.href}
          className="group block rounded-2xl border bg-white p-5 text-right transition-all hover:border-pop hover:bg-paper-3"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="mb-1.5 text-[11px] tracking-wider" style={{ color: "var(--muted)" }}>
            다음 →
          </div>
          <div
            className="mb-1 text-[17px] font-bold transition-colors group-hover:text-pop"
            style={{ color: "var(--ink-2)" }}
          >
            {next.label}
          </div>
          {next.desc && (
            <div className="text-[13px]" style={{ color: "var(--muted)" }}>
              {next.desc}
            </div>
          )}
        </Link>
      ) : (
        <div
          className="rounded-2xl border p-5 text-right opacity-40"
          style={{ borderColor: "var(--line)", background: "white" }}
        >
          <div className="text-[11px]" style={{ color: "var(--muted)" }}>
            다음 →
          </div>
          <div className="text-[17px] font-bold" style={{ color: "var(--ink-2)" }}>
            마지막 페이지
          </div>
        </div>
      )}
    </div>
  );
}
