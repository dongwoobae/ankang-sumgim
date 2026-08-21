import Reveal from "@/components/common/Reveal";

interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  meta?: React.ReactNode;
}

export default function PageHero({ eyebrow, title, lead, crumbs, meta }: Props) {
  return (
    <section
      className="relative overflow-hidden px-6 pt-12 pb-8 md:pt-20 md:pb-14"
      style={{ background: "linear-gradient(180deg, var(--paper-3) 0%, var(--paper) 100%)" }}
    >
      <div
        className="pointer-events-none absolute -right-[120px] -top-[120px] h-[400px] w-[400px] rounded-full"
        style={{ background: "var(--pop)", opacity: 0.04 }}
      />
      <div className="relative mx-auto max-w-[1200px]">
        {crumbs && crumbs.length > 0 && (
          <Reveal>
            <nav
              className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] md:text-[14px]"
              style={{ color: "var(--muted)" }}
            >
              {crumbs.map((c, i) => (
                <span key={i} className="contents">
                  {c.href ? (
                    <a
                      href={c.href}
                      // 터치 타겟만 키우고 음수 마진으로 되돌려 시각적 간격은 그대로 둔다
                      className="-mx-1 -my-2 inline-flex items-center rounded px-1 py-2 transition-colors hover:text-pop"
                    >
                      {c.label}
                    </a>
                  ) : (
                    <span>{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <span className="opacity-50">›</span>}
                </span>
              ))}
            </nav>
          </Reveal>
        )}

        {eyebrow && (
          <Reveal stagger={1}>
            <div
              className="mb-4 inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: "var(--pop)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--pop)" }} />
              {eyebrow}
            </div>
          </Reveal>
        )}

        <Reveal variant="up-strong" stagger={2}>
          <h1
            className="mb-3 font-extrabold leading-[1.1]"
            style={{
              fontSize: "clamp(32px, 4.4vw, 52px)",
              letterSpacing: "-0.035em",
              color: "var(--ink-2)",
            }}
          >
            {title}
          </h1>
        </Reveal>

        {lead && (
          <Reveal stagger={3}>
            <p className="max-w-[60ch] text-[17px] leading-[1.7]" style={{ color: "var(--muted)" }}>
              {lead}
            </p>
          </Reveal>
        )}

        {meta && (
          <Reveal stagger={4}>
            <div
              className="mt-4 flex flex-wrap gap-5 text-[14px]"
              style={{ color: "var(--muted)" }}
            >
              {meta}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
