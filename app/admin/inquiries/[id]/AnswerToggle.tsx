"use client";

import { markAnswered } from "@/app/actions/admin/inquiries";
import { useTransition } from "react";

export function AnswerToggle({ id, isAnswered }: { id: string; isAnswered: boolean }) {
  const [pending, startTransition] = useTransition();

  function toggle() {
    startTransition(() => markAnswered(id, !isAnswered));
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${
        isAnswered
          ? "bg-[#EEF4FB] text-[#5A7A99] hover:text-[#1A2E4A] border border-[#A8C4E0]/60"
          : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
      }`}
    >
      {pending ? "처리 중..." : isAnswered ? "미답변으로 변경" : "답변완료 처리"}
    </button>
  );
}
