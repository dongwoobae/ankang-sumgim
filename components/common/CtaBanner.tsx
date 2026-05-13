import Link from "next/link";

interface Props {
  eyebrow?: string;
  title: string;
  desc?: string;
  primary: { text: string; href: string };
  secondary?: { text: string; href: string };
  variant?: "ink" | "pop";
}

export default function CtaBanner({
  eyebrow,
  title,
  desc,
  primary,
  secondary,
  variant = "ink",
}: Props) {
  const bg = variant === "pop" ? "var(--pop)" : "var(--ink)";
  const primaryColor = variant === "pop" ? "var(--pop)" : "var(--ink-2)";

  return (
    <section className="px-6 py-12 text-white" style={{ background: bg }}>
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto]">
        <div>
          {eyebrow && (
            <div className="mb-2.5 text-[11px] uppercase tracking-[0.2em] opacity-60">
              {eyebrow}
            </div>
          )}
          <h2
            className="mb-2 font-bold leading-tight tracking-tight"
            style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}
          >
            {title}
          </h2>
          {desc && (
            <p className="text-sm leading-relaxed opacity-70">{desc}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href={primary.href}
            className="inline-flex items-center gap-2 rounded-full px-[22px] py-[13px] text-sm font-bold transition-all hover:bg-paper-3"
            style={{ background: "white", color: primaryColor }}
          >
            {primary.text} →
          </Link>
          {secondary && (
            <a
              href={secondary.href}
              className="inline-flex items-center gap-2 rounded-full border px-[22px] py-[13px] text-sm font-bold transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.32)" }}
            >
              {secondary.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
