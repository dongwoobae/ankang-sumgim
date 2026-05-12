"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Images,
  LogOut,
  ExternalLink,
  PlusCircle,
  List,
  MessageSquare,
  ImagePlus,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  AlertTriangle,
  Calculator,
  Briefcase,
} from "lucide-react";
import { logout } from "@/app/actions/admin/auth";

const navGroups = [
  {
    label: "대시보드",
    items: [
      {
        label: "홈",
        href: "/admin",
        icon: <LayoutDashboard size={16} />,
        exact: true,
      },
    ],
  },
  {
    label: "공지사항",
    items: [
      {
        label: "전체 목록",
        href: "/admin/notices",
        icon: <List size={16} />,
        exact: true,
      },
      {
        label: "새 공지 작성",
        href: "/admin/notices/new",
        icon: <PlusCircle size={16} />,
        exact: false,
      },
    ],
  },
  {
    label: "사진 게시판",
    items: [
      {
        label: "카테고리 목록",
        href: "/admin/photos",
        icon: <Images size={16} />,
        exact: true,
      },
      {
        label: "새 카테고리 만들기",
        href: "/admin/photos/new",
        icon: <PlusCircle size={16} />,
        exact: false,
      },
    ],
  },
  {
    label: "문의 관리",
    items: [
      {
        label: "문의 목록",
        href: "/admin/inquiries",
        icon: <MessageSquare size={16} />,
        exact: false,
      },
    ],
  },
  {
    label: "구인 관리",
    items: [
      {
        label: "지원자 목록",
        href: "/admin/recruits",
        icon: <Briefcase size={16} />,
        exact: false,
      },
    ],
  },
  {
    label: "계산기 설정",
    items: [
      {
        label: "수가 · 한도액 관리",
        href: "/admin/calculator",
        icon: <Calculator size={16} />,
        exact: false,
      },
    ],
  },
  {
    label: "수상·기관선정",
    items: [
      {
        label: "수상 관리",
        href: "/admin/awards",
        icon: <Trophy size={16} />,
        exact: true,
      },
    ],
  },
  {
    label: "메인 페이지",
    items: [
      {
        label: "메인 사진 관리",
        href: "/admin/hero",
        icon: <ImagePlus size={16} />,
        exact: true,
      },
    ],
  },
  {
    label: "시스템",
    items: [
      {
        label: "오류 로그",
        href: "/admin/logs",
        icon: <AlertTriangle size={16} />,
        exact: true,
      },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false); // 데스크탑 접힘
  const [mobileOpen, setMobileOpen] = useState(false); // 모바일 열림

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  const sidebarContent = (
    <>
      {/* 로고 + 토글 */}
      <div className="px-4 py-5 border-b border-[#1A2E4A] flex items-center justify-between">
        {!collapsed && (
          <div>
            <p
              className="text-[#E8A020] font-bold text-sm"
            >
              안강 섬김
            </p>
            <p className="text-[#5A7A99] text-[11px]">관리자 페이지</p>
          </div>
        )}
        {/* 데스크탑 토글 버튼 */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-[#A8C4E0] hover:bg-[#1A2E4A] hover:text-[#E8A020] transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
        {/* 모바일 닫기 버튼 */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden flex items-center justify-center w-7 h-7 rounded-lg text-[#A8C4E0] hover:bg-[#1A2E4A] transition-colors ml-auto"
        >
          <X size={16} />
        </button>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="text-[#5A7A99] text-[10px] font-semibold tracking-widest px-2 mb-1.5 uppercase">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      title={collapsed ? item.label : undefined}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors
                        ${collapsed ? "justify-center" : ""}
                        ${
                          active
                            ? "bg-[#1A56A0] text-[#FFFFFF] font-medium"
                            : "text-[#A8C4E0] hover:bg-[#1A2E4A] hover:text-[#E8A020]"
                        }`}
                    >
                      {item.icon}
                      {!collapsed && item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

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
