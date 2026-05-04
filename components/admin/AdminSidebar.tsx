"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Images,
  LogOut,
  ExternalLink,
  PlusCircle,
  List,
  MessageSquare,
  Megaphone,
} from "lucide-react";
import { logout } from "@/app/actions/admin/auth";

const navGroups = [
  {
    label: "대시보드",
    items: [
      { label: "홈", href: "/admin", icon: <LayoutDashboard size={16} />, exact: true },
    ],
  },
  {
    label: "공지사항",
    items: [
      { label: "전체 목록", href: "/admin/notices", icon: <List size={16} />, exact: true },
      { label: "새 공지 작성", href: "/admin/notices/new", icon: <PlusCircle size={16} />, exact: false },
    ],
  },
  {
    label: "사진 게시판",
    items: [
      { label: "카테고리 목록", href: "/admin/photos", icon: <Images size={16} />, exact: true },
      { label: "새 카테고리 만들기", href: "/admin/photos/new", icon: <PlusCircle size={16} />, exact: false },
    ],
  },
  {
    label: "문의 관리",
    items: [
      { label: "문의 목록", href: "/admin/inquiries", icon: <MessageSquare size={16} />, exact: false },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <aside className="w-56 flex-shrink-0 flex flex-col bg-[#3D2E0E] min-h-screen">
      {/* 로고 */}
      <div className="px-5 py-5 border-b border-[#5C4A1E]">
        <p
          className="text-[#E8D48B] font-bold text-sm"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          안강 섬김
        </p>
        <p className="text-[#8C8070] text-[11px]">관리자 페이지</p>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[#8C8070] text-[10px] font-semibold tracking-widest px-2 mb-1.5 uppercase">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        active
                          ? "bg-[#C4A84F] text-[#FFFDF0] font-medium"
                          : "text-[#D9C97A] hover:bg-[#5C4A1E] hover:text-[#E8D48B]"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* 하단 버튼 */}
      <div className="px-3 py-4 border-t border-[#5C4A1E] space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#D9C97A] text-sm hover:bg-[#5C4A1E] hover:text-[#E8D48B] transition-colors"
        >
          <ExternalLink size={16} />
          사이트 보기
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#D9C97A] text-sm hover:bg-[#5C4A1E] hover:text-[#E8D48B] transition-colors text-left"
          >
            <LogOut size={16} />
            로그아웃
          </button>
        </form>
      </div>
    </aside>
  );
}
