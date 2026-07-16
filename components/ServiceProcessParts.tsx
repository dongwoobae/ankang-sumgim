import type { ReactNode } from "react";

export function Arrow() {
  return (
    <div className="hidden md:flex items-center justify-center flex-shrink-0 mt-[-12px]">
      <svg viewBox="0 0 32 20" width="32" height="20" fill="none">
        <path d="M2 10 H26" stroke="#A8C4E0" strokeWidth="2" strokeDasharray="4 2" />
        <path
          d="M22 5 L28 10 L22 15"
          stroke="#A8C4E0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function VerticalArrow() {
  return (
    <div className="flex md:hidden items-center justify-center h-8">
      <svg viewBox="0 0 20 32" width="20" height="32" fill="none">
        <path d="M10 2 V24" stroke="#A8C4E0" strokeWidth="2" strokeDasharray="4 2" />
        <path
          d="M5 20 L10 26 L15 20"
          stroke="#A8C4E0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

type StepCardProps = {
  icon: ReactNode;
  index: number;
  title: string;
  desc: string;
};

export function StepCard({ icon, index, title, desc }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center w-full md:w-36 lg:w-40">
      {/* 일러스트 */}
      <div className="relative mb-3">
        {icon}
        {/* 번호 배지 */}
        <span
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full text-[#FFFFFF] text-xs font-bold flex items-center justify-center"
          style={{ background: "#1A56A0", fontSize: "11px" }}
        >
          {index + 1}
        </span>
      </div>

      {/* 제목 */}
      <p className="text-[#1A2E4A] font-bold text-sm mb-1.5 leading-tight">{title}</p>

      {/* 설명 */}
      <p className="text-[#5A7A99] text-xs leading-relaxed px-1">{desc}</p>
    </div>
  );
}
