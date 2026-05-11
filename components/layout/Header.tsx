"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Clock, Shield, Home, Users, ClipboardList, Lightbulb, User, MapPin, Award, Bell, Camera, type LucideIcon } from "lucide-react";

type NavChild = {
  label: string;
  href: string;
  desc: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
};

type NavItem = {
  label: string;
  href?: string;
  children: NavChild[];
};

const navItems: NavItem[] = [
  {
    label: "센터소개",
    children: [
      {
        label: "인사말",
        href: "/about/greeting",
        desc: "센터장 인사말",
        icon: User,
        iconColor: "#795548",
        iconBg: "#EFEBE9",
      },
      {
        label: "오시는길",
        href: "/about/location",
        desc: "찾아오시는 방법",
        icon: MapPin,
        iconColor: "#00796B",
        iconBg: "#E0F2F1",
      },
      {
        label: "수상·기관선정",
        href: "/about/awards",
        desc: "수상 및 선정 내역",
        icon: Award,
        iconColor: "#F57F17",
        iconBg: "#FFF8E1",
      },
    ],
  },
  {
    label: "노인장기요양보험",
    children: [
      {
        label: "노인장기요양보험이란",
        href: "/services/insurance",
        desc: "제도 안내",
        icon: Shield,
        iconColor: "#1A56A0",
        iconBg: "#E3F0FF",
      },
      {
        label: "방문요양서비스",
        href: "/services/visit-care",
        desc: "가정 방문 돌봄",
        icon: Home,
        iconColor: "#2E7D32",
        iconBg: "#E8F5E9",
      },
      {
        label: "가족요양",
        href: "/services/family-care",
        desc: "가족 요양 급여",
        icon: Users,
        iconColor: "#C2185B",
        iconBg: "#FCE4EC",
      },
      {
        label: "등급신청",
        href: "/services/grade-apply",
        desc: "요양 등급 신청 안내",
        icon: ClipboardList,
        iconColor: "#E65100",
        iconBg: "#FFF3E0",
      },
      {
        label: "인지활동서비스",
        href: "/services/cognitive",
        desc: "치매 예방 프로그램",
        icon: Lightbulb,
        iconColor: "#6A1B9A",
        iconBg: "#F3E5F5",
      },
    ],
  },
  {
    label: "상담문의",
    href: "/inquiry",
    children: [],
  },
  {
    label: "게시판",
    children: [
      {
        label: "공지사항",
        href: "/board/notice",
        desc: "센터 공지 및 소식",
        icon: Bell,
        iconColor: "#1565C0",
        iconBg: "#E3F2FD",
      },
      {
        label: "사진 게시판",
        href: "/board/photos",
        desc: "활동 사진 모음",
        icon: Camera,
        iconColor: "#AD1457",
        iconBg: "#FCE4EC",
      },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      style={{
        boxShadow: scrolled ? "0 2px 20px rgba(92,74,30,0.12)" : "none",
      }}
    >
      {/* 상단 정보 바 */}
      <div className="bg-[#1A2E4A] text-[#A8C4E0] text-xs">
        <div className="max-w-6xl mx-auto px-6 h-9 flex items-center justify-between">
          <span className="tracking-wide font-medium">
            {/* 안강 섬김 노인복지센터 */}
          </span>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              평일 09:00–18:00 &nbsp;·&nbsp; 토 09:00–14:00
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={11} />
              054-763-5988
            </span>
          </div>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="bg-[#FFFFFF] border-b border-[#A8C4E0]/60">
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* 로고 */}
          <Link
            href="/"
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <Image
              src="/logo.png"
              alt="안강 섬김 노인복지센터 로고"
              width={40}
              height={40}
              priority
              className="rounded-sm"
            />
            <div className="leading-snug">
              <p
                className="text-[#1A2E4A] font-bold text-[17px] tracking-tight"
              >
                안강 섬김
              </p>
              <p className="text-[#5A7A99] text-[11px] tracking-[0.15em]">
                노인복지센터
              </p>
            </div>
          </Link>

          {/* 데스크탑 GNB */}
          <nav
            className="hidden md:flex items-center h-full"
            onMouseLeave={() => setActiveMenu(null)}
          >
            {navItems.map((item) => {
              const isActive =
                item.href != null && pathname.startsWith(item.href);
              const labelKey = item.label;

              const labelClass = `relative px-5 h-full flex items-center text-[15px] font-medium tracking-tight transition-colors duration-200
                ${isActive ? "text-[#1A56A0]" : "text-[#1A2E4A] hover:text-[#1A56A0]"}`;

              const underline = (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1A56A0] transition-transform duration-200 origin-bottom"
                  style={{
                    transform:
                      isActive || activeMenu === labelKey
                        ? "scaleY(1)"
                        : "scaleY(0)",
                  }}
                />
              );

              return (
                <div
                  key={labelKey}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMenu(labelKey)}
                >
                  {item.href != null ? (
                    <Link href={item.href} className={labelClass}>
                      {item.label}
                      {underline}
                    </Link>
                  ) : (
                    <button type="button" className={labelClass}>
                      {item.label}
                      {underline}
                    </button>
                  )}
                </div>
              );
            })}
          </nav>

          {/* 모바일 햄버거 */}
          <button
            className="md:hidden p-2 text-[#1A2E4A]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* 드롭다운 메가메뉴 */}
        {activeMenu &&
          (navItems.find((i) => i.label === activeMenu)?.children.length ?? 0) >
            0 && (
            <div
              className="hidden md:block absolute left-0 right-0 bg-[#FFFFFF] border-b border-[#A8C4E0]/60"
              style={{ boxShadow: "0 8px 24px rgba(92,74,30,0.10)" }}
              onMouseEnter={() => setActiveMenu(activeMenu)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="max-w-6xl mx-auto px-6 py-5">
                <div className="flex gap-3">
                  {navItems
                    .find((i) => i.label === activeMenu)
                    ?.children.map((child) => {
                      const Icon = child.icon;
                      const hasIcon = !!Icon;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setActiveMenu(null)}
                          className={`flex-1 group rounded-xl border transition-all duration-200
                          ${hasIcon ? "flex flex-col items-center gap-2 px-3 py-4" : "px-4 py-3"}
                          ${
                            pathname === child.href
                              ? "bg-[#EEF4FB] border-[#1A56A0]"
                              : "bg-transparent border-[#E8EFF8] hover:bg-[#EEF4FB] hover:border-[#A8C4E0]"
                          }`}
                        >
                          {Icon && (
                            <div
                              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                              style={{ background: child.iconBg }}
                            >
                              <Icon size={26} color={child.iconColor} strokeWidth={1.8} />
                            </div>
                          )}
                          <p
                            className={`font-medium transition-colors text-center
                            ${hasIcon ? "text-sm mt-0.5" : "text-sm mb-0.5"}
                            ${pathname === child.href ? "text-[#1A56A0]" : "text-[#1A2E4A] group-hover:text-[#1A56A0]"}`}
                          >
                            {child.label}
                          </p>
                          <p className={`text-xs text-[#5A7A99] ${hasIcon ? "text-center" : ""}`}>{child.desc}</p>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-t border-[#A8C4E0]/60 overflow-y-auto max-h-[80vh]">
          {navItems.map((item) => (
            <div key={item.label} className="border-b border-[#EEF4FB]">
              {item.href != null ? (
                <Link
                  href={item.href}
                  className="flex items-center px-6 py-4 text-[#1A2E4A] font-medium text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="flex items-center px-6 py-4 text-[#1A2E4A] font-medium text-sm">
                  {item.label}
                </span>
              )}
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="flex items-center gap-2 pl-10 pr-6 py-3 text-[#5A7A99] text-sm hover:text-[#1A56A0] hover:bg-[#EEF4FB]"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="w-1 h-1 rounded-full bg-[#A8C4E0] flex-shrink-0" />
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
