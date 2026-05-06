"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "등급이 없어도 상담 받을 수 있나요?",
    a: "네, 가능합니다. 등급 신청 전이라도 먼저 상담해 주시면 등급 신청 방법부터 서비스 이용까지 전 과정을 도와드립니다.",
  },
  {
    q: "장기요양 등급 신청은 어떻게 하나요?",
    a: "국민건강보험공단 지사를 방문하거나 복지로(www.bokjiro.go.kr)에서 온라인으로 신청할 수 있습니다. 신청 후 공단 직원이 가정을 방문하여 조사를 진행하며, 등급 판정까지 통상 2~4주가 소요됩니다. 저희 센터에서도 신청 대행을 도와드립니다.",
  },
  {
    q: "서비스 비용은 어떻게 되나요?",
    a: "장기요양급여를 수급하시면 본인 부담금은 급여비용의 15%(기초생활수급자는 면제~7.5%)입니다. 실제 이용 시간과 등급에 따라 다를 수 있으며, 자세한 금액은 전화 상담을 통해 안내해 드립니다.",
  },
  {
    q: "서비스 지역이 어디까지인가요?",
    a: "경주시·안강읍·영천시·포항시 4개 시군 전역에서 서비스를 제공합니다. 방문목욕차 2대를 보유하고 있어 신속한 배차가 가능합니다.",
  },
  {
    q: "방문요양과 가족요양의 차이는 무엇인가요?",
    a: "방문요양은 센터 소속 요양보호사가 가정을 방문하여 돌봄을 제공하는 서비스입니다. 가족요양은 요양보호사 자격증을 취득한 가족이 직접 어르신을 돌보고 급여를 수령하는 제도입니다. 두 서비스를 병행할 수도 있습니다.",
  },
  {
    q: "요양보호사 자격증이 없는 가족도 가족요양을 받을 수 있나요?",
    a: "가족요양보호사로 활동하려면 요양보호사 자격증이 필수입니다. 자격증 취득 방법과 교육기관 안내도 도와드리니 편하게 문의해 주세요.",
  },
  {
    q: "인지활동서비스는 어떤 분이 이용하나요?",
    a: "장기요양 1~5등급 또는 인지지원등급 수급자 중 치매 진단을 받으셨거나 경도 인지장애가 있는 어르신이 대상입니다. 전문 교육을 받은 요양보호사가 1:1 맞춤 인지 자극 프로그램을 제공합니다.",
  },
  {
    q: "상담은 무료인가요?",
    a: "네, 전화 및 온라인 상담은 모두 무료입니다. 부담 없이 먼저 연락주세요.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section className="bg-[#EEF4FB] py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* 헤더 */}
        <div className="mb-10">
          <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
            FAQ
          </p>
          <h2
            className="text-[#1A2E4A] text-2xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            자주 묻는 질문
          </h2>
          <p className="text-[#5A7A99] text-sm mt-2">
            궁금한 내용이 없으면 아래 온라인 폼이나 카카오톡 채널, 전화로 문의해
            주세요.
          </p>
        </div>

        {/* 아코디언 목록 */}
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-[#FFFFFF] border rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  borderColor: isOpen ? "#1A56A0" : "rgba(168,196,224,0.5)",
                }}
              >
                {/* 질문 헤더 */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 transition-colors"
                      style={{
                        background: isOpen ? "#1A56A0" : "#EEF4FB",
                        color: isOpen ? "#FFFFFF" : "#1A56A0",
                      }}
                    >
                      Q
                    </span>
                    <span className="text-[#1A2E4A] font-semibold text-[15px] leading-snug group-hover:text-[#1A56A0] transition-colors">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className="flex-shrink-0 ml-4 text-[#5A7A99] transition-transform duration-300"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {/* 답변 */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? "300px" : "0px" }}
                >
                  <div className="flex gap-3 px-6 pb-5">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#EEF4FB] border border-[#A8C4E0] flex items-center justify-center text-xs font-bold text-[#1A56A0] mt-0.5">
                      A
                    </span>
                    <p className="text-[#5A7A99] text-sm leading-[1.9]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
