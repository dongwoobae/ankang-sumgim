import Link from "next/link";
import { ArrowRight, CheckCircle, Phone, AlertCircle } from "lucide-react";

const eligibility = [
  "배우자",
  "직계혈족 (부모, 자녀, 손자녀 등)",
  "형제·자매",
  "직계혈족의 배우자 (며느리, 사위 등)",
];

const conditions = [
  "수급자와 동거 중인 가족만 원칙적으로 인정 (일부 예외 있음)",
  "요양보호사 자격증 취득 필수",
  "월 60시간 이상 근무 시 가족요양비 수급 가능",
  "도서·벽지 또는 천재지변 등 불가피한 사유 시 예외 적용",
];

const steps = [
  { title: "요양보호사 자격 취득", desc: "지정 교육기관에서 교육 이수 후 자격시험 응시" },
  { title: "장기요양 등급 신청", desc: "어르신이 국민건강보험공단에 등급 신청 (1~5등급)" },
  { title: "가족요양 신청", desc: "센터 방문 상담 후 가족요양보호사 등록 신청" },
  { title: "서비스 제공 및 급여 수령", desc: "월별 서비스 제공 후 장기요양급여비 청구" },
];

export default function FamilyCarePage() {
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
            가족요양
          </h1>
          <p className="text-[#5A7A99] mt-3">가족이 직접 돌보며 급여를 받을 수 있습니다</p>
        </div>
      </section>

      {/* 개요 */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">OVERVIEW</p>
              <h2
                className="text-[#1A2E4A] text-2xl font-bold mb-5"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                가족요양이란?
              </h2>
              <p className="text-[#1A2E4A] text-[15px] leading-[1.9] mb-4">
                요양보호사 자격을 취득한 가족이 직접 어르신을 돌보고, 국민건강보험공단으로부터
                장기요양급여를 수령하는 제도입니다.
              </p>
              <p className="text-[#1A2E4A] text-[15px] leading-[1.9]">
                가족과 함께 지내며 익숙한 환경에서 돌봄을 받을 수 있어 어르신의 정서적
                안정에 도움이 되며, 돌봄 가족도 정당한 급여를 받을 수 있습니다.
              </p>

              <div className="mt-8 p-5 bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl">
                <p className="text-[#1A2E4A] font-bold text-sm mb-3">대상 가족 범위</p>
                <ul className="space-y-1.5">
                  {eligibility.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#1A2E4A] text-sm">
                      <CheckCircle size={13} className="text-[#1A56A0] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-5">
              {/* 이용 조건 */}
              <div className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl p-6">
                <h3
                  className="text-[#1A2E4A] font-bold mb-4"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  이용 조건
                </h3>
                <ul className="space-y-2.5">
                  {conditions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#1A2E4A] text-sm leading-relaxed">
                      <CheckCircle size={13} className="text-[#1A56A0] flex-shrink-0 mt-1" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 주의사항 */}
              <div className="flex items-start gap-3 p-5 bg-[#2E6DB4]/20 border border-[#A8C4E0]/60 rounded-xl">
                <AlertCircle size={18} className="text-[#1A56A0] flex-shrink-0 mt-0.5" />
                <p className="text-[#1A2E4A] text-sm leading-relaxed">
                  가족요양보호사는 동일 수급자에게 하루 최대 <strong>60분 이상</strong> 서비스
                  제공이 불가능합니다. 추가 돌봄이 필요하면 일반 방문요양과 병행하실 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 신청 절차 */}
      <section className="bg-[#EEF4FB] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 text-center">
            <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">PROCESS</p>
            <h2
              className="text-[#1A2E4A] text-2xl font-bold"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              신청 절차
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12">
            {steps.map((s, i) => (
              <div
                key={i}
                className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-6"
              >
                <div className="w-10 h-10 rounded-full bg-[#1A56A0] text-[#FFFFFF] font-bold flex items-center justify-center mb-4 text-sm">
                  {i + 1}
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
              가족요양 신청에 대한 자세한 상담은 저희 센터에 문의해 주세요.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/inquiry"
                className="flex items-center gap-2 bg-[#1A56A0] text-[#FFFFFF] px-7 py-4 rounded-xl font-bold text-sm hover:bg-[#1A2E4A] transition-colors duration-300"
              >
                온라인 상담 신청 <ArrowRight size={16} />
              </Link>
              <a
                href="tel:054-763-5988"
                className="flex items-center gap-2 border-2 border-[#1A56A0] text-[#1A56A0] px-7 py-4 rounded-xl font-bold text-sm hover:bg-[#1A56A0] hover:text-[#FFFFFF] transition-colors duration-300"
              >
                <Phone size={16} />
                054-763-5988
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
