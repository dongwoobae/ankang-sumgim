import Link from "next/link";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";

const serviceItems = [
  {
    category: "신체활동 지원",
    items: ["세면 도움", "구강 관리", "머리 감기기", "몸 청결 유지", "목욕 보조", "식사 도움", "체위 변경", "이동 보조"],
  },
  {
    category: "가사활동 지원",
    items: ["취사", "청소·주변 정돈", "세탁", "장보기", "외출 동행"],
  },
  {
    category: "정서 지원",
    items: ["말벗·상담", "생활 상담", "의사소통 보조"],
  },
];

const highlights = [
  { title: "방문 시간", value: "1회 3시간", desc: "타 기관 대비 충분한 돌봄 시간" },
  { title: "목욕차 보유", value: "2대", desc: "지역 최다 보유 — 빠른 배차 가능" },
  { title: "서비스 지역", value: "4개 시군", desc: "경주·안강·영천·포항 전역" },
  { title: "요양사 교육", value: "월 1회", desc: "정기 역량 강화 교육 실시" },
];

export default function VisitCarePage() {
  return (
    <div>
      {/* 페이지 배너 */}
      <section
        style={{ background: "linear-gradient(135deg, #EEF4FB 0%, #F0E4A8 100%)" }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">SERVICES</p>
          <h1
            className="text-[#1A2E4A] text-4xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            방문요양서비스
          </h1>
          <p className="text-[#5A7A99] mt-3">가정을 직접 방문하여 정성껏 돌봄을 제공합니다</p>
        </div>
      </section>

      {/* 핵심 수치 */}
      <section className="bg-[#1A2E4A]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {highlights.map((h, i) => (
              <div key={i} className="text-center">
                <p className="text-[#5A7A99] text-xs tracking-widest mb-1">{h.title}</p>
                <p
                  className="text-[#2E6DB4] text-3xl font-bold mb-1"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {h.value}
                </p>
                <p className="text-[#5A7A99] text-xs">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 소개 */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">WHAT WE DO</p>
              <h2
                className="text-[#1A2E4A] text-2xl font-bold mb-5"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                방문요양서비스란?
              </h2>
              <p className="text-[#1A2E4A] text-[15px] leading-[1.9] mb-4">
                장기요양 1~5등급 판정을 받은 어르신의 가정에 요양보호사가 직접 방문하여
                신체활동 및 가사활동을 지원하는 재가급여 서비스입니다.
              </p>
              <p className="text-[#1A2E4A] text-[15px] leading-[1.9]">
                안강 섬김 노인복지센터는 1회 방문 시 3시간의 충분한 돌봄을 제공하며,
                경주·안강·영천·포항 전역에서 서비스를 운영하고 있습니다.
              </p>

              <div className="mt-8 p-5 bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl">
                <p className="text-[#1A2E4A] font-bold text-sm mb-2">이용 자격</p>
                <ul className="space-y-1.5">
                  {[
                    "장기요양인정서를 받은 1~5등급 수급자",
                    "인지지원등급 수급자 (일부 서비스 제한)",
                    "의사소견서 제출 완료자",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#1A2E4A] text-sm">
                      <CheckCircle size={13} className="text-[#1A56A0] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 서비스 항목 */}
            <div className="space-y-5">
              {serviceItems.map((si, i) => (
                <div
                  key={i}
                  className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl p-5"
                >
                  <h3
                    className="text-[#1A2E4A] font-bold mb-3"
                    style={{ fontFamily: "'Noto Serif KR', serif" }}
                  >
                    {si.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {si.items.map((item, j) => (
                      <span
                        key={j}
                        className="text-xs bg-[#FFFFFF] text-[#1A2E4A] px-3 py-1 rounded-full border border-[#A8C4E0]/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 이용 방법 */}
      <section className="bg-[#EEF4FB] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">HOW TO USE</p>
            <h2
              className="text-[#1A2E4A] text-2xl font-bold"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              서비스 이용 방법
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {[
              { step: "1", title: "등급 신청", desc: "국민건강보험공단에 장기요양인정 신청" },
              { step: "2", title: "등급 판정", desc: "방문조사 후 등급 결정 (보통 30일 내)" },
              { step: "3", title: "센터 상담", desc: "안강 섬김 센터에 연락하여 상담 진행" },
              { step: "4", title: "서비스 시작", desc: "계약 체결 후 방문요양 서비스 개시" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-5 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#1A56A0] text-[#FFFFFF] font-bold flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <p
                  className="text-[#1A2E4A] font-bold mb-2 text-sm"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {s.title}
                </p>
                <p className="text-[#5A7A99] text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-[#5A7A99] text-sm mb-5">
              등급 신청 방법이 궁금하시면 아래 버튼을 눌러 안내를 확인하세요.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/services/grade-apply"
                className="flex items-center gap-2 bg-[#1A56A0] text-[#FFFFFF] px-7 py-4 rounded-xl font-bold text-sm hover:bg-[#1A2E4A] transition-colors duration-300"
              >
                등급신청 안내 <ArrowRight size={16} />
              </Link>
              <a
                href="tel:054-763-5988"
                className="flex items-center gap-2 border-2 border-[#1A56A0] text-[#1A56A0] px-7 py-4 rounded-xl font-bold text-sm hover:bg-[#1A56A0] hover:text-[#FFFFFF] transition-colors duration-300"
              >
                <Phone size={16} />
                054-763-5988 전화 상담
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
