'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, Clock } from 'lucide-react'

const navItems = [
  {
    label: '센터소개',
    href: '/about',
    children: [
      { label: '인사말', href: '/about/greeting', desc: '센터장 인사말' },
      { label: '오시는길', href: '/about/location', desc: '찾아오시는 방법' },
      { label: '직원소개', href: '/about/staff', desc: '섬김의 사람들' },
      { label: '평가정보', href: '/about/evaluation', desc: '기관 평가 현황' },
      { label: '수상·기관선정', href: '/about/awards', desc: '수상 및 선정 내역' },
    ],
  },
  {
    label: '노인장기요양보험',
    href: '/services',
    children: [
      { label: '노인장기요양보험이란', href: '/services/insurance', desc: '제도 안내' },
      { label: '방문요양서비스', href: '/services/visit-care', desc: '가정 방문 돌봄' },
      { label: '가족요양', href: '/services/family-care', desc: '가족 요양 급여' },
      { label: '등급신청', href: '/services/grade-apply', desc: '요양 등급 신청 안내' },
      { label: '인지활동서비스', href: '/services/cognitive', desc: '치매 예방 프로그램' },
    ],
  },
  {
    label: '상담문의',
    href: '/inquiry',
    children: [],
  },
  {
    label: '게시판',
    href: '/board',
    children: [
      { label: '공지사항', href: '/board/notice', desc: '센터 공지 및 소식' },
      { label: '사진 게시판', href: '/board/photos', desc: '활동 사진 모음' },
    ],
  },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      style={{ boxShadow: scrolled ? '0 2px 20px rgba(92,74,30,0.12)' : 'none' }}
    >
      {/* 상단 정보 바 */}
      <div className="bg-[#5C4A1E] text-[#D9C97A] text-xs">
        <div className="max-w-6xl mx-auto px-6 h-9 flex items-center justify-between">
          <span className="tracking-wide font-medium">안강 섬김 노인복지센터</span>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              평일 09:00–18:00 &nbsp;·&nbsp; 주말 09:00–14:00
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={11} />
              054-763-5988
            </span>
          </div>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="bg-[#FFFDF0] border-b border-[#D9C97A]/60">
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">

          {/* 로고 — 이미지 교체 시 아래 블록을 <img src="/logo.png" alt="안강 섬김 노인복지센터" className="h-12 w-auto" /> 로 대체 */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#C4A84F] flex items-center justify-center flex-shrink-0 group-hover:bg-[#5C4A1E] transition-colors duration-300">
              <span className="text-[#FFFDF0] text-base font-bold" style={{ fontFamily: "'Noto Serif KR', serif" }}>섬</span>
            </div>
            <div className="leading-snug">
              <p className="text-[#5C4A1E] font-bold text-[17px] tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                안강 섬김
              </p>
              <p className="text-[#8C8070] text-[11px] tracking-[0.15em]">노인복지센터</p>
            </div>
          </Link>

          {/* 데스크탑 GNB */}
          <nav
            className="hidden md:flex items-center h-full"
            onMouseLeave={() => setActiveMenu(null)}
          >
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <div
                  key={item.href}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMenu(item.href)}
                >
                  <Link
                    href={item.href}
                    className={`relative px-5 h-full flex items-center text-[15px] font-medium tracking-tight transition-colors duration-200
                      ${isActive ? 'text-[#C4A84F]' : 'text-[#5C4A1E] hover:text-[#C4A84F]'}`}
                  >
                    {item.label}
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C4A84F] transition-transform duration-200 origin-bottom"
                      style={{ transform: isActive || activeMenu === item.href ? 'scaleY(1)' : 'scaleY(0)' }}
                    />
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* 모바일 햄버거 */}
          <button
            className="md:hidden p-2 text-[#5C4A1E]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* 드롭다운 메가메뉴 */}
        {activeMenu && (navItems.find(i => i.href === activeMenu)?.children.length ?? 0) > 0 && (
          <div
            className="hidden md:block absolute left-0 right-0 bg-[#FFFDF0] border-b border-[#D9C97A]/60"
            style={{ boxShadow: '0 8px 24px rgba(92,74,30,0.10)' }}
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-6xl mx-auto px-6 py-5">
              <div className="flex gap-2">
                {navItems
                  .find(i => i.href === activeMenu)
                  ?.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setActiveMenu(null)}
                      className={`flex-1 group px-4 py-3 rounded-lg border transition-all duration-200
                        ${pathname === child.href
                          ? 'bg-[#E8D48B]/40 border-[#C4A84F]'
                          : 'bg-transparent border-transparent hover:bg-[#FAF3D6] hover:border-[#D9C97A]'
                        }`}
                    >
                      <p className={`text-sm font-medium mb-0.5 transition-colors
                        ${pathname === child.href ? 'text-[#C4A84F]' : 'text-[#5C4A1E] group-hover:text-[#C4A84F]'}`}>
                        {child.label}
                      </p>
                      <p className="text-xs text-[#8C8070]">{child.desc}</p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FFFDF0] border-t border-[#D9C97A]/60 overflow-y-auto max-h-[80vh]">
          {navItems.map((item) => (
            <div key={item.href} className="border-b border-[#FAF3D6]">
              <Link
                href={item.href}
                className="flex items-center px-6 py-4 text-[#5C4A1E] font-medium text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="flex items-center gap-2 pl-10 pr-6 py-3 text-[#8C8070] text-sm hover:text-[#C4A84F] hover:bg-[#FAF3D6]"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="w-1 h-1 rounded-full bg-[#D9C97A] flex-shrink-0" />
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  )
}
