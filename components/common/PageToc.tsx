"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  label: string;
}

interface Props {
  title: string;
  items: TocItem[];
  bottomCta?: { text: string; phone?: string };
}

export default function PageToc({ title, items, bottomCta }: Props) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  return (
    <aside
      className="self-start sticky top-[120px] rounded-2xl border bg-white p-[18px]"
      style={{ borderColor: "var(--line)" }}
    >
      <div
        className="mb-[10px] text-[11px] font-semibold tracking-[0.2em] uppercase"
        style={{ color: "var(--pop)" }}
      >
        On this page
      </div>
      <h4
        className="mb-[10px] border-b pb-[10px] text-sm font-bold"
        style={{ color: "var(--ink-2)", borderColor: "var(--line)" }}
      >
        {title}
      </h4>
      <nav className="flex flex-col">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={`flex items-center gap-[10px] rounded-lg px-[10px] py-2 text-[13px] font-medium transition-colors ${
              active === it.id ? "bg-paper-3 text-pop" : "text-ink-2 hover:text-pop"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                active === it.id ? "bg-pop" : "bg-line-2"
              }`}
            />
            {it.label}
          </a>
        ))}
      </nav>
      {bottomCta && (
        <div className="mt-3.5 rounded-xl p-3.5 text-white" style={{ background: "var(--ink)" }}>
          <b className="mb-2 block text-[13px]">{bottomCta.text}</b>
          {bottomCta.phone && (
            <a
              href={`tel:${bottomCta.phone}`}
              className="block rounded-full px-1.5 py-[7px] text-center text-xs font-bold"
              style={{ background: "white", color: "var(--ink-2)" }}
            >
              ☎ {bottomCta.phone}
            </a>
          )}
        </div>
      )}
    </aside>
  );
}
