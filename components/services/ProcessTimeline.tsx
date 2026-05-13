interface Step {
  n: string;
  title: string;
  desc?: string;
}

interface Props {
  cols: number;
  steps: Step[];
}

export default function ProcessTimeline({ cols, steps }: Props) {
  return (
    <div className="relative py-10">
      <div
        className="absolute left-[4%] right-[4%] top-[76px] hidden h-px md:block"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--line-2) 8%, var(--line-2) 92%, transparent 100%)",
        }}
      />
      <div
        className="relative grid gap-3"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {steps.map((s, i) => (
          <div key={i} className="px-2 text-center">
            <div
              className={`relative z-10 mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border-2 text-base font-extrabold transition-all ${
                i === 0
                  ? "border-pop bg-pop text-white"
                  : "border-line bg-white text-pop"
              }`}
            >
              {s.n}
            </div>
            <div
              className="mb-1 text-sm font-bold"
              style={{ color: "var(--ink-2)" }}
            >
              {s.title}
            </div>
            {s.desc && (
              <div
                className="text-xs leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {s.desc}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
