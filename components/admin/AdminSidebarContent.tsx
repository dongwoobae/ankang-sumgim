"use client";

import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LogOut,
  X,
} from "lucide-react";
import { logout } from "@/app/actions/admin/auth";
import SidebarNav from "./SidebarNav";

type AdminSidebarContentProps = {
  collapsed: boolean;
  pathname: string;
  onToggleCollapsed: () => void;
  onCloseMobile: () => void;
};

export default function AdminSidebarContent({
  collapsed,
  pathname,
  onToggleCollapsed,
  onCloseMobile,
}: AdminSidebarContentProps) {
  return (
    <>
      {/* 로고 + 토글 */}
      <div className="px-4 py-5 border-b border-[#1A2E4A] flex items-center justify-between">
        {!collapsed && (
          <div>
            <p className="text-[#E8A020] font-bold text-sm">
              안강 섬김
            </p>
            <p className="text-[#5A7A99] text-[11px]">관리자 페이지</p>
          </div>
        )}
        {/* 데스크탑 토글 버튼 */}
        <button
          onClick={onToggleCollapsed}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-[#A8C4E0] hover:bg-[#1A2E4A] hover:text-[#E8A020] transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
        {/* 모바일 닫기 버튼 */}
        <button
          onClick={onCloseMobile}
          className="md:hidden flex items-center justify-center w-7 h-7 rounded-lg text-[#A8C4E0] hover:bg-[#1A2E4A] transition-colors ml-auto"
        >
          <X size={16} />
        </button>
      </div>

      {/* 네비게이션 */}
      <SidebarNav
        collapsed={collapsed}
        pathname={pathname}
        onNavigate={onCloseMobile}
      />

      {/* 하단 버튼 */}
      <div className="px-3 py-4 border-t border-[#1A2E4A] space-y-1">
        <Link
          href="/"
          target="_blank"
          title={collapsed ? "사이트 보기" : undefined}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#A8C4E0] text-sm hover:bg-[#1A2E4A] hover:text-[#E8A020] transition-colors ${collapsed ? "justify-center" : ""}`}
        >
          <ExternalLink size={16} />
          {!collapsed && "사이트 보기"}
        </Link>
        <form action={logout}>
          <button
            type="submit"
            title={collapsed ? "로그아웃" : undefined}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#A8C4E0] text-sm hover:bg-[#1A2E4A] hover:text-[#E8A020] transition-colors text-left ${collapsed ? "justify-center" : ""}`}
          >
            <LogOut size={16} />
            {!collapsed && "로그아웃"}
          </button>
        </form>
      </div>
    </>
  );
}
