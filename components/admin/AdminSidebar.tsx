"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebarContent from "./AdminSidebarContent";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false); // 데스크탑 접힘
  const [mobileOpen, setMobileOpen] = useState(false); // 모바일 열림

  const sidebarContent = (
    <AdminSidebarContent
      collapsed={collapsed}
      pathname={pathname}
      onToggleCollapsed={() => setCollapsed(!collapsed)}
      onCloseMobile={() => setMobileOpen(false)}
    />
  );

  return (
    <>
      {/* 모바일 햄버거 버튼 */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 flex items-center justify-center w-10 h-10 bg-[#1A2E4A] rounded-xl text-[#A8C4E0] hover:text-[#E8A020] transition-colors shadow-lg"
      >
        <Menu size={18} />
      </button>

      {/* 모바일 오버레이 배경 */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 모바일 사이드바 — fixed overlay */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full z-50 flex flex-col bg-[#0F1E30] transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          w-56`}
      >
        {sidebarContent}
      </aside>

      {/* 데스크탑 사이드바 — 레이아웃 일부 */}
      <aside
        className={`hidden md:flex flex-col bg-[#0F1E30] min-h-screen flex-shrink-0 transition-all duration-300
          ${collapsed ? "w-14" : "w-56"}`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
