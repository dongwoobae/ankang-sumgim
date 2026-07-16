"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/admin/auth";
import { Lock } from "lucide-react";

const initialState = { error: "" };

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF4FB]">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1A56A0] mb-4">
            <Lock size={22} className="text-[#FFFFFF]" />
          </div>
          <h1 className="text-[#1A2E4A] text-xl font-bold">안강 섬김 관리자</h1>
          <p className="text-[#5A7A99] text-sm mt-1">관리자 계정으로 로그인하세요</p>
        </div>

        <form
          action={action}
          className="bg-[#FFFFFF] rounded-2xl border border-[#A8C4E0]/50 p-8 space-y-5 shadow-sm"
        >
          <div>
            <label className="block text-[#1A2E4A] text-sm font-medium mb-1.5">이메일</label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] placeholder-[#5A7A99] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[#1A2E4A] text-sm font-medium mb-1.5">비밀번호</label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] placeholder-[#5A7A99] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors"
            />
          </div>

          {state.error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#1A56A0] text-[#FFFFFF] py-3 rounded-xl font-bold text-sm hover:bg-[#1A2E4A] transition-colors duration-300 disabled:opacity-60"
          >
            {pending ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
