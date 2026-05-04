import Link from "next/link";
import { ArrowRight, CheckCircle, Info } from "lucide-react";

const steps = [
  { step: "01", title: "신청", desc: "국민건강보험공단 지사에 장기요양인정 신청서를 제출합니다." },
  { step: "02", title: "방문조사", desc: "공단 직원이 가정을 방문하여 심신 기능 상태를 조사합니다." },
  { step: "03", title: "의사소견서", desc: "의사에게 소견서를 발급받아 제출합니다. (65세 미만은 필수)" },
  { step: "04", title: "등급판정", desc: "등급판정위원회에서 1~5등급 또는 인지지원등급을 결정합니다." },
  { step: "05", title: "서비스 이용", desc: "장기요양인정서를 받고 기관과 계약 후 서비스를 시작합니다." },
];

const grades = [
  { grade: "1등급", score: "95점 이상", desc: "일상생활에서 전적으로 다른 사람의 도움이 필요한 상태" },
  { grade: "2등급", score: "75점 이상", desc: "일상생활에서 상당 부분 다른 사람의 도움이 필요한 상태" },
  { grade: "3등급", score: "60점 이상", desc: "일상생활에서 부분적으로 다른 사람의 도움이 필요한 상태" },
  { grade: "4등급", score: "51점 이상", desc: "일상생활에서 일정 부분 다른 사람의 도움이 필요한 상태" },
  { grade: "5등급", score: "45점 이상", desc: "치매 환자로서 치료·보호가 필요한 상태" },
  { grade: "인지지원등급", score: "45점 미만", desc: "치매 환자로서 경증 인지기능 저하 상태" },
];

export default function InsurancePage() {
  return (
    <div>
      {/* 페이지 배너 */}
      <section
        style={{ background: "linear-gradient(135deg, #FAF3D6 0%, #F0E4A8 100%)" }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#C4A84F] text-sm font-semibold tracking-widest mb-2">SERVICES</p>
          <h1
            className="text-[#5C4A1E] text-4xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            노인장기요양보험이란
          </h1>
          <p className="text-[#8C8070] mt-3">제도 안내 및 이용 방법</p>
        </div>
      </section>

      {/* 제도 개요 */}
      <section className="bg-[#FFFDF0] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-[#C4A84F] text-sm font-semibold tracking-widest mb-2">OVERVIEW</p>
              <h2
                className="text-[#5C4A1E] text-2xl font-bold mb-5"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                노인장기요양보험 제도란?
              </h2>
              <p className="text-[#5C4A1E] text-[15px] leading-[1.9] mb-4">
                고령이나 노인성 질병 등으로 일상생활을 혼자 수행하기 어려운 노인들에게
                신체활동·가사활동 지원 등의 서비스를 제공하는 사회보험 제도입니다.
              </p>
              <p className="text-[#5C4A1E] text-[15px] leading-[1.9]">
                2008년 7월부터 시행된 이 제도는 노인의 심신 기능 회복과 안정적인 노후 생활을
                지원하고, 가족의 돌봄 부담을 사회적으로 분담하는 것을 목적으로 합니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "신청 대상", value: "65세 이상 또는\n노인성 질환자" },
                { label: "보험료", value: "건강보험료의\n12.81%" },
                { label: "본인 부담금", value: "재가서비스\n15%" },
                { label: "시행일", value: "2008년\n7월 1일" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#FAF3D6] border border-[#D9C97A]/50 rounded-xl p-5 text-center"
                >
                  <p className="text-[#8C8070] text-xs mb-2">{item.label}</p>
                  <p
                    className="text-[#5C4A1E] font-bold text-base whitespace-pre-line leading-snug"
                    style={{ fontFamily: "'Noto Serif KR', serif" }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 신청 절차 */}
          <div className="mb-16">
            <p className="text-[#C4A84F] text-sm font-semibold tracking-widest mb-2">PROCESS</p>
            <h2
              className="text-[#5C4A1E] text-2xl font-bold mb-8"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              신청 절차
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {steps.map((s, i) => (
                <div key={i} className="relative">
                  <div className="bg-[#FAF3D6] border border-[#D9C97A]/50 rounded-xl p-5">
                    <p className="text-[#C4A84F] text-2xl font-bold mb-2">{s.step}</p>
                    <p
                      className="text-[#5C4A1E] font-bold mb-2 text-sm"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {s.title}
                    </p>
                    <p className="text-[#8C8070] text-xs leading-relaxed">{s.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                      <ArrowRight size={16} className="text-[#C4A84F]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 등급 안내 */}
          <div>
            <p className="text-[#C4A84F] text-sm font-semibold tracking-widest mb-2">GRADES</p>
            <h2
              className="text-[#5C4A1E] text-2xl font-bold mb-8"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              장기요양 등급 기준
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {grades.map((g, i) => (
                <div
                  key={i}
                  className="bg-[#FAF3D6] border border-[#D9C97A]/50 rounded-xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[#5C4A1E] font-bold"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {g.grade}
                    </span>
                    <span className="text-[#C4A84F] text-sm font-bold">{g.score}</span>
                  </div>
                  <p className="text-[#8C8070] text-sm leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 안내 배너 */}
      <section className="bg-[#5C4A1E] py-14">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Info size={22} className="text-[#E8D48B] flex-shrink-0 mt-0.5" />
            <div>
              <p
                className="text-[#E8D48B] font-bold mb-1"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                등급 신청이 처음이신가요?
              </p>
              <p className="text-[#8C8070] text-sm">
                안강 섬김 노인복지센터에서 등급 신청부터 서비스 이용까지 안내해 드립니다.
              </p>
            </div>
          </div>
          <Link
            href="/services/grade-apply"
            className="flex-shrink-0 flex items-center gap-2 bg-[#C4A84F] text-[#FFFDF0] px-7 py-4 rounded-xl font-bold text-sm hover:bg-[#E8D48B] hover:text-[#5C4A1E] transition-colors duration-300"
          >
            등급신청 안내 보기 <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
