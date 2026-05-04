"use client";

import { useActionState } from "react";
import { createCategory } from "@/app/actions/admin/photos";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const initialState = { error: "" };

export default function NewCategoryPage() {
  const [state, action, pending] = useActionState(createCategory, initialState);

  return (
    <div className="p-8 max-w-lg">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/photos"
          className="text-[#8C8070] hover:text-[#C4A84F] transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1
          className="text-[#5C4A1E] text-2xl font-bold"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          새 카테고리 만들기
        </h1>
      </div>

      <div className="bg-[#FFFDF0] border border-[#D9C97A]/50 rounded-xl p-6">
        <form action={action} className="space-y-5">
          <div>
            <label className="block text-[#5C4A1E] text-sm font-medium mb-1.5">
              카테고리 이름 <span className="text-[#C4A84F]">*</span>
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="예) 2025년 봄 나들이 행사"
              className="w-full px-4 py-3 rounded-xl border border-[#D9C97A]/70 bg-[#FAF3D6] text-[#5C4A1E] placeholder-[#8C8070] text-sm focus:outline-none focus:border-[#C4A84F] transition-colors"
            />
          </div>

          {state.error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {state.error}
            </p>
          )}

          <p className="text-[#8C8070] text-xs">
            카테고리를 만들면 바로 사진 업로드 페이지로 이동합니다.
          </p>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={pending}
              className="flex-1 bg-[#C4A84F] text-[#FFFDF0] py-3 rounded-xl font-bold text-sm hover:bg-[#5C4A1E] transition-colors disabled:opacity-60"
            >
              {pending ? "생성 중..." : "카테고리 만들기"}
            </button>
            <Link
              href="/admin/photos"
              className="px-6 py-3 rounded-xl border border-[#D9C97A]/70 text-[#8C8070] text-sm font-medium hover:border-[#C4A84F] hover:text-[#5C4A1E] transition-colors text-center"
            >
              취소
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
