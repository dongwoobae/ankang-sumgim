"use client";

import { type NoticeFormState } from "@/app/actions/admin/notices";

type Props = {
  action: (formData: FormData) => void;
  state: NoticeFormState;
  pending: boolean;
  defaultValues?: {
    title: string;
    content: string;
    is_pinned: boolean;
  };
};

export function NoticeForm({ action, state, pending, defaultValues }: Props) {
  return (
    <form action={action} className="space-y-6">
      {/* 제목 */}
      <div>
        <label className="block text-[#1A2E4A] text-sm font-medium mb-1.5">
          제목 <span className="text-[#1A56A0]">*</span>
        </label>
        <input
          name="title"
          type="text"
          required
          defaultValue={defaultValues?.title}
          placeholder="공지 제목을 입력하세요"
          className="w-full px-4 py-3 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] placeholder-[#5A7A99] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors"
        />
      </div>

      {/* 내용 */}
      <div>
        <label className="block text-[#1A2E4A] text-sm font-medium mb-1.5">
          내용 <span className="text-[#1A56A0]">*</span>
        </label>
        <textarea
          name="content"
          required
          rows={14}
          defaultValue={defaultValues?.content}
          placeholder="공지 내용을 입력하세요"
          className="w-full px-4 py-3 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] placeholder-[#5A7A99] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors resize-none leading-relaxed"
        />
      </div>

      {/* 상단 고정 */}
      <div className="flex items-center gap-3 p-4 bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl">
        <input
          id="is_pinned"
          name="is_pinned"
          type="checkbox"
          defaultChecked={defaultValues?.is_pinned}
          className="w-4 h-4 accent-[#1A56A0]"
        />
        <label htmlFor="is_pinned" className="text-[#1A2E4A] text-sm font-medium cursor-pointer">
          공지 목록 상단에 고정
        </label>
      </div>

      {state.error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {state.error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="flex-1 bg-[#1A56A0] text-[#FFFFFF] py-3 rounded-xl font-bold text-sm hover:bg-[#1A2E4A] transition-colors disabled:opacity-60"
        >
          {pending ? "저장 중..." : "저장하기"}
        </button>
        <a
          href="/admin/notices"
          className="px-6 py-3 rounded-xl border border-[#A8C4E0]/70 text-[#5A7A99] text-sm font-medium hover:border-[#1A56A0] hover:text-[#1A2E4A] transition-colors text-center"
        >
          취소
        </a>
      </div>
    </form>
  );
}
