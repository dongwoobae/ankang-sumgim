import Link from "next/link";
import { Phone, MapPin, Award, ChevronRight, ArrowRight } from "lucide-react";
import HeroPhotoCarousel from "@/components/layout/HeroPhotoCarousel";

// 임시 공지 데이터 (나중에 Supabase에서 fetch)
const notices = [
  {
    id: 1,
    title: "2024년 하반기 방문요양 서비스 신청 안내",
    date: "2024.11.20",
  },
  { id: 2, title: "어르신 건강검진 지원사업 참여자 모집", date: "2024.11.15" },
  { id: 3, title: "2024년 요양사 보수교육 일정 안내", date: "2024.11.08" },
  {
    id: 4,
    title: "김장 나눔 행사 사진 게시판 업로드 완료",
    date: "2024.11.01",
  },
  { id: 5, title: "센터 운영시간 변경 안내 (토·일 단축)", date: "2024.10.25" },
];

const services = [
  {
    title: "방문요양서비스",
    desc: "요양보호사가 직접 가정을 방문하여 신체활동 및 가사활동을 지원합니다.",
    icon: "🏠",
    href: "/services/visit-care",
    tag: "대표 서비스",
  },
  {
    title: "가족요양",
    desc: "가족이 직접 요양보호사 자격을 취득하여 어르신을 돌보고 급여를 받을 수 있습니다.",
    icon: "👨‍👩‍👧",
    href: "/services/family-care",
    tag: null,
  },
  {
    title: "인지활동서비스",
    desc: "치매 예방과 인지 기능 유지를 위한 전문 프로그램을 제공합니다.",
    icon: "🧩",
    href: "/services/cognitive",
    tag: null,
  },
  {
    title: "등급신청 안내",
    desc: "장기요양 등급 신청부터 판정까지 전 과정을 안내해 드립니다.",
    icon: "📋",
    href: "/services/grade-apply",
    tag: null,
  },
];

const awards = [
  {
    year: "2023",
    title: "우수 재가요양기관 선정",
    org: "경상북도",
  },
  {
    year: "2022",
    title: "장기요양 기관 평가 최우수",
    org: "국민건강보험공단",
  },
  {
    year: "2021",
    title: "지역사회 공헌 우수기관 선정",
    org: "경주시",
  },
];

const stats = [
  { value: "목욕차", highlight: "2대", sub: "타 센터 대비 2배 보유" },
  { value: "서비스 지역", highlight: "4개 시군", sub: "경주·안강·영천·포항" },
  { value: "월 교육", highlight: "1회", sub: "요양사 정기 역량 강화" },
];

export default function HomePage() {
  return (
    <div>
      {/* ───── Hero ───── */}
      <section
        className="relative flex items-center"
        style={{ minHeight: "calc(100vh - 108px)" }}
      >
        {/* 배경 장식 */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: "#1A56A0" }}
          />
          <div
            className="absolute -left-20 bottom-0 w-[400px] h-[400px] rounded-full opacity-5"
            style={{ background: "#1A2E4A" }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 텍스트 */}
            <div>
              {/* 태그라인 */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-[#1A56A0]" />
                <span className="text-[#1A56A0] text-sm font-semibold tracking-widest uppercase">
                  Ankang Sumgim Care Center
                </span>
              </div>

              {/* 메인 헤드라인 */}
              <h1
                className="text-[#1A2E4A] text-5xl md:text-6xl font-bold leading-[1.2] mb-6"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                어르신의 일상을
                <br />
                <span className="text-[#1A56A0]">함께 섬깁니다</span>
              </h1>
              <p
                className="text-[#E8A020] text-lg font-semibold mb-4"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                &quot;사랑으로, 정성으로, 내 몸같이 섬김&quot;
              </p>
              <p className="text-[#5A7A99] text-lg leading-relaxed mb-10 max-w-xl">
                안강 섬김 노인복지센터는 경주·안강·영천·포항 전역에서
                <br />
                어르신 한 분 한 분의 소중한 일상을 정성껏 돌봅니다.
              </p>

              {/* CTA 버튼 */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/inquiry"
                  className="flex items-center gap-2 bg-[#1A56A0] text-[#FFFFFF] px-7 py-4 rounded-xl font-bold text-base hover:bg-[#1A2E4A] transition-colors duration-300"
                >
                  지금 상담 문의하기
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="tel:054-763-5988"
                  className="flex items-center gap-2 border-2 border-[#1A56A0] text-[#1A56A0] px-7 py-4 rounded-xl font-bold text-base hover:bg-[#1A56A0] hover:text-[#FFFFFF] transition-colors duration-300"
                >
                  <Phone size={18} />
                  054-763-5988
                </a>
              </div>

              {/* 위치 */}
              <div className="flex items-center gap-1.5 mt-8 text-[#5A7A99] text-sm">
                <MapPin size={14} />
                경상북도 경주시 안강읍 화전중앙길 53
              </div>
            </div>

            {/* 오른쪽: 사진 캐러셀 */}
            <div className="hidden md:block">
              <HeroPhotoCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* ───── 신뢰 지표 띠 ───── */}
      <section className="bg-[#1A2E4A]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-[#5A7A99] text-xs tracking-widest mb-1 uppercase">
                  {stat.value}
                </p>
                <p
                  className="text-[#E8A020] text-3xl font-bold mb-1"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {stat.highlight}
                </p>
                <p className="text-[#5A7A99] text-xs">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 서비스 ───── */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
              SERVICES
            </p>
            <h2
              className="text-[#1A2E4A] text-3xl font-bold"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              섬김의 서비스
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="group relative bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-2xl p-6 hover:border-[#1A56A0] hover:shadow-lg transition-all duration-300"
              >
                {svc.tag && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold bg-[#1A56A0] text-[#FFFFFF] px-2 py-0.5 rounded-full">
                    {svc.tag}
                  </span>
                )}
                <div className="text-3xl mb-4">{svc.icon}</div>
                <h3
                  className="text-[#1A2E4A] font-bold text-base mb-2 group-hover:text-[#1A56A0] transition-colors"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {svc.title}
                </h3>
                <p className="text-[#5A7A99] text-sm leading-relaxed mb-4">
                  {svc.desc}
                </p>
                <span className="flex items-center gap-1 text-[#1A56A0] text-sm font-medium">
                  자세히 보기 <ChevronRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 수상·기관선정 ───── */}
      <section className="bg-[#EEF4FB] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
              AWARDS
            </p>
            <h2
              className="text-[#1A2E4A] text-3xl font-bold"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              수상 및 기관선정
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards.map((award, i) => (
              <div
                key={i}
                className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-2xl p-8 flex flex-col items-center text-center"
              >
                {/* 플레이스홀더 — 나중에 실제 사진으로 교체 */}
                <div className="w-full h-40 rounded-xl bg-[#E8A020]/30 border-2 border-dashed border-[#A8C4E0] flex flex-col items-center justify-center mb-6">
                  <Award size={28} className="text-[#1A56A0] mb-1" />
                  <span className="text-[#5A7A99] text-xs">사진 교체 예정</span>
                </div>
                <span className="text-[#1A56A0] text-sm font-bold mb-1">
                  {award.year}
                </span>
                <h3
                  className="text-[#1A2E4A] font-bold text-base mb-1"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {award.title}
                </h3>
                <p className="text-[#5A7A99] text-sm">{award.org}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/about/awards"
              className="inline-flex items-center gap-1.5 text-[#1A56A0] font-medium text-sm hover:gap-3 transition-all"
            >
              전체 수상 내역 보기 <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───── 공지사항 미리보기 ───── */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
                NOTICE
              </p>
              <h2
                className="text-[#1A2E4A] text-3xl font-bold"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                공지사항
              </h2>
            </div>
            <Link
              href="/board/notice"
              className="flex items-center gap-1 text-[#5A7A99] text-sm hover:text-[#1A56A0] transition-colors"
            >
              더보기 <ChevronRight size={15} />
            </Link>
          </div>

          <div className="divide-y divide-[#A8C4E0]/40">
            {notices.map((notice) => (
              <Link
                key={notice.id}
                href={`/board/notice/${notice.id}`}
                className="flex items-center justify-between py-4 group hover:px-3 rounded-lg transition-all duration-200"
              >
                <span className="text-[#1A2E4A] text-sm group-hover:text-[#1A56A0] transition-colors truncate mr-4">
                  {notice.title}
                </span>
                <span className="text-[#5A7A99] text-xs flex-shrink-0">
                  {notice.date}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 상담 CTA 배너 ───── */}
      <section className="bg-[#1A56A0] py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2
            className="text-[#FFFFFF] text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            지금 바로 상담받아 보세요
          </h2>
          <p className="text-[#FFFFFF]/80 text-base mb-8">
            어르신과 가족분들의 소중한 문의를 기다립니다.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:054-763-5988"
              className="flex items-center gap-2 bg-[#FFFFFF] text-[#1A56A0] px-8 py-4 rounded-xl font-bold text-base hover:bg-[#1A2E4A] hover:text-[#FFFFFF] transition-colors duration-300"
            >
              <Phone size={18} />
              054-763-5988
            </a>
            <Link
              href="/inquiry"
              className="flex items-center gap-2 border-2 border-[#FFFFFF] text-[#FFFFFF] px-8 py-4 rounded-xl font-bold text-base hover:bg-[#FFFFFF] hover:text-[#1A56A0] transition-colors duration-300"
            >
              온라인 문의하기
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
