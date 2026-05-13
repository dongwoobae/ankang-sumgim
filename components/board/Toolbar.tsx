"use client";

import { useState } from "react";

interface Chip {
  label: string;
  value: string;
  count?: number;
}

interface Props {
  chips: Chip[];
  defaultChip?: string;
  searchPlaceholder?: string;
  onChipChange?: (value: string) => void;
  onSearch?: (query: string) => void;
}

export default function Toolbar({ chips, defaultChip, searchPlaceholder = "검색", onChipChange, onSearch }: Props) {
  const [active, setActive] = useState(defaultChip ?? chips[0]?.value ?? "");

  return (
    <div
      className="mb-8 flex flex-wrap items-center gap-3 border-b pb-5"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => {
          const isActive = c.value === active;
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => { setActive(c.value); onChipChange?.(c.value); }}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-[250ms] ${
                isActive
                  ? "border-ink-2 bg-ink-2 text-white"
                  : "border-line bg-white text-ink-2 hover:border-pop hover:text-pop"
              }`}
            >
              {c.label}
              {c.count !== undefined && (
                <span className="text-[12px]" style={{ opacity: isActive ? 0.85 : 0.6 }}>
                  {c.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="relative ml-auto min-w-[200px] flex-[0_1_280px]">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] opacity-50">
          🔍
        </span>
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full rounded-full border py-2.5 pl-10 pr-4 text-[13px] outline-none transition-all duration-[200ms] focus:border-pop focus:ring-4 focus:ring-pop/10"
          style={{ borderColor: "var(--line)", color: "var(--ink-2)" }}
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
    </div>
  );
}
