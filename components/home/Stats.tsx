"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  label: string;
  value: number;
  unit: string;
  sub: string;
}

const STATS: StatItem[] = [
  {
    label: "BATH SERVICE",
    value: 2,
    unit: "대",
    sub: "타 센터 대비 2배 보유 · 목욕차",
  },
  {
    label: "SERVICE AREA",
    value: 4,
    unit: "개 시군",
    sub: "경주·안강·영천·포항",
  },
  {
    label: "MONTHLY EDU",
    value: 1,
    unit: "회",
    sub: "요양사 정기 역량 강화",
  },
];

function StatCard({ item }: { item: StatItem }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        const t0 = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(item.value * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [item.value]);

  return (
    <div
      ref={ref}
      className="border-l-2 border-white/18 pl-6 py-1.5"
    >
      <div className="text-xs tracking-[0.28em] uppercase text-white/60 mb-2">
        {item.label}
      </div>
      <div
        className="font-bold leading-none tracking-[-0.02em] flex items-baseline gap-1.5"
        style={{ fontSize: "clamp(36px, 4.4vw, 56px)" }}
      >
        {n}
        <span className="text-[0.55em] text-white/70">{item.unit}</span>
      </div>
      <div className="mt-2.5 text-[13px] text-white/70">{item.sub}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-[var(--ink-2)] text-white py-[70px] px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {STATS.map((s) => (
          <StatCard key={s.label} item={s} />
        ))}
      </div>
    </section>
  );
}
