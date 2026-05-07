"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Clock } from "lucide-react";

const navItems = [
  {
    label: "센터소개",
    children: [
      { label: "인사말", href: "/about/greeting", desc: "센터장 인사말" },
      { label: "오시는길", href: "/about/location", desc: "찾아오시는 방법" },
      {
        label: "수상·기관선정",
        href: "/about/awards",
        desc: "수상 및 선정 내역",
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
      },
      {
        label: "방문요양서비스",
        href: "/services/visit-care",
        desc: "가정 방문 돌봄",
      },
      {
        label: "가족요양",
        href: "/services/family-care",
        desc: "가족 요양 급여",
      },
      {
        label: "등급신청",
        href: "/services/grade-apply",
        desc: "요양 등급 신청 안내",
      },
      {
        label: "인지활동서비스",
        href: "/services/cognitive",
        desc: "치매 예방 프로그램",
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
      { label: "공지사항", href: "/board/notice", desc: "센터 공지 및 소식" },
      { label: "사진 게시판", href: "/board/photos", desc: "활동 사진 모음" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/92 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_6px_24px_rgba(14,26,46,0.06)]" : ""
      }`}
    >
      {/* 상단 정보 바 */}
      <div className="bg-[var(--ink-2)] text-white/78 text-xs">
        <div className="max-w-[1200px] mx-auto px-6 h-9 flex items-center justify-end gap-[22px]">
          <span className="inline-flex items-center gap-1.5 tracking-wide">
            <Clock size={11} />
            평일 09:00–18:00 · 토 09:00–14:00
          </span>
          <span className="inline-flex items-center gap-1.5 tracking-wide">
            <Phone size={11} />
            054-763-5988
          </span>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="border-b border-[var(--line)]">
        <div className="max-w-[1200px] mx-auto px-6 h-[76px] flex items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div
              className="w-10 h-10 rounded-full bg-[var(--pop)] text-white grid place-items-center font-extrabold text-[17px] transition-all duration-300 group-hover:rotate-[-8deg] group-hover:bg-[var(--ink-2)]"
            >
              섬
            </div>
            <div className="leading-tight">
              <p className="text-[var(--ink-2)] font-bold text-[17px] tracking-tight">
                안강 섬김
              </p>
              <p className="text-[var(--muted)] text-[11px] tracking-[0.18em]">
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

              const labelClass = `relative px-[18px] h-full flex items-center text-[15px] font-medium tracking-tight transition-colors duration-200 ${
                isActive
                  ? "text-[var(--pop)]"
                  : "text-[var(--ink-2)] hover:text-[var(--pop)]"
              }`;

              const underline = (
                <span
                  className="absolute bottom-0 left-[18px] right-[18px] h-[2px] bg-[var(--pop)] transition-transform duration-200 origin-center"
                  style={{
                    transform:
                      isActive || activeMenu === labelKey
                        ? "scaleX(1)"
                        : "scaleX(0)",
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

          {/* CTA 버튼 (데스크탑) */}
          <Link
            href="/inquiry"
            className="hidden md:inline-flex items-center gap-2 bg-[var(--pop)] text-white px-[18px] py-[10px] rounded-full text-[14px] font-semibold transition-all hover:bg-[var(--ink-2)] hover:-translate-y-px"
          >
            상담 문의 <span>→</span>
          </Link>

          {/* 모바일 햄버거 */}
          <button
            className="md:hidden p-2 text-[var(--ink-2)]"
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
              className="hidden md:block absolute left-0 right-0 bg-white border-b border-[var(--line)]"
              style={{ boxShadow: "0 8px 24px rgba(14,26,46,0.08)" }}
              onMouseEnter={() => setActiveMenu(activeMenu)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="max-w-[1200px] mx-auto px-6 py-5">
                <div className="flex gap-2">
                  {navItems
                    .find((i) => i.label === activeMenu)
                    ?.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setActiveMenu(null)}
                        className={`flex-1 group px-4 py-3 rounded-lg border transition-all duration-200 ${
                          pathname === child.href
                            ? "bg-[var(--paper-3)] border-[var(--pop)]"
                            : "bg-transparent border-transparent hover:bg-[var(--paper-2)] hover:border-[var(--line)]"
                        }`}
                      >
                        <p
                          className={`text-sm font-medium mb-0.5 transition-colors ${
                            pathname === child.href
                              ? "text-[var(--pop)]"
                              : "text-[var(--ink-2)] group-hover:text-[var(--pop)]"
                          }`}
                        >
                          {child.label}
                        </p>
                        <p className="text-xs text-[var(--muted)]">
                          {child.desc}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          )}
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[var(--line)] overflow-y-auto max-h-[80vh]">
          {navItems.map((item) => (
            <div key={item.label} className="border-b border-[var(--paper-2)]">
              {item.href != null ? (
                <Link
                  href={item.href}
                  className="flex items-center px-6 py-4 text-[var(--ink-2)] font-medium text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="flex items-center px-6 py-4 text-[var(--ink-2)] font-medium text-sm">
                  {item.label}
                </span>
              )}
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="flex items-center gap-2 pl-10 pr-6 py-3 text-[var(--muted)] text-sm hover:text-[var(--pop)] hover:bg-[var(--paper-2)]"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--line-2)] flex-shrink-0" />
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          {/* 모바일 CTA */}
          <div className="p-4">
            <Link
              href="/inquiry"
              className="flex items-center justify-center gap-2 bg-[var(--pop)] text-white px-5 py-3 rounded-full text-[14px] font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              상담 문의 →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
