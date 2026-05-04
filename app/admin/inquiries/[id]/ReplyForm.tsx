"use client";

import { useActionState, useEffect, useRef } from "react";
import { createReply } from "@/app/actions/admin/inquiries";
import { Send } from "lucide-react";

const initialState = { error: "" };

export function ReplyForm({ inquiryId }: { inquiryId: string }) {
  const [state, action, pending] = useActionState(createReply, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.error && !pending) {
      formRef.current?.reset();
    }
  }, [state, pending]);

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <input type="hidden" name="inquiry_id" value={inquiryId} />
      <textarea
        name="content"
        required
        rows={5}
        placeholder="답변 내용을 입력하세요"
        className="w-full px-4 py-3 rounded-xl border border-[#D9C97A]/70 bg-[#FAF3D6] text-[#5C4A1E] placeholder-[#8C8070] text-sm focus:outline-none focus:border-[#C4A84F] transition-colors resize-none leading-relaxed"
      />
      {state.error && (
        <p className="text-red-600 text-sm">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="flex items-center gap-2 bg-[#C4A84F] text-[#FFFDF0] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#5C4A1E] transition-colors disabled:opacity-60"
      >
        <Send size={14} />
        {pending ? "저장 중..." : "답변 등록"}
      </button>
    </form>
  );
}
