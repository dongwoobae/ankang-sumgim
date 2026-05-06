import Link from "next/link";
import { ArrowRight, Brain, CheckCircle, Phone } from "lucide-react";
import ServiceProcess from "@/components/ServiceProcess";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "인지활동서비스",
  description:
    "치매 예방과 인지 기능 유지를 위한 전문 프로그램. 어르신 맞춤 인지활동서비스를 제공합니다.",
  openGraph: { url: "/services/cognitive" },
};

const programs = [
  {
    title: "인지 자극 훈련",
    icon: "🧩",
    items: [
      "기억력 강화 게임",
      "퍼즐·그림 맞추기",
      "숫자·글자 인지 활동",
      "회상 요법",
    ],
  },
  {
    title: "일상생활 훈련",
    icon: "🏠",
    items: [
      "요리·청소 등 가사 활동 참여",
      "개인위생 관리 훈련",
      "시간·날짜 인지 연습",
      "외출 동행 활동",
    ],
  },
  {
    title: "신체 활동",
    icon: "🤸",
    items: [
      "스트레칭 및 체조",
      "균형 감각 훈련",
      "손·발 근력 강화 운동",
      "산책 동행",
    ],
  },
  {
    title: "정서·사회 활동",
    icon: "💬",
    items: [
      "말벗·대화 프로그램",
      "노래·음악 치료",
      "그림 그리기·공예",
      "가족 연계 소통 지원",
    ],
  },
];

const effects = [
  "치매 진행 속도 완화",
  "인지 기능 유지 및 개선",
  "우울·불안 감소",
  "일상생활 수행 능력 향상",
  "가족의 돌봄 부담 경감",
  "사회적 고립 예방",
];

const cognitiveProcess = (
  <ServiceProcess
    title="인지활동서비스 이용 절차"
    steps={[
      {
        iconKey: "inquiry",
        title: "상담 문의",
        desc: "전화·온라인으로 인지활동서비스 상담",
      },
      {
        iconKey: "gradeJudgment",
        title: "등급·진단 확인",
        desc: "장기요양 1~5등급 또는 인지지원등급 보유 확인",
      },
      {
        iconKey: "caregiver",
        title: "전담 요양보호사 배정",
        desc: "인지활동형 교육 이수 전문 요양보호사 연결",
      },
      {
        iconKey: "plan",
        title: "맞춤 프로그램 계획",
        desc: "어르신 상태에 맞는 1:1 인지 자극 계획 수립",
      },
      {
        iconKey: "serviceStart",
        title: "서비스 시작",
        desc: "가정 방문 인지활동 프로그램 정기 제공",
      },
    ]}
  />
);

export default function CognitivePage() {
  return (
    <div>
      {/* 페이지 배너 */}
      <section
        style={{
          background: "linear-gradient(135deg, #EEF4FB 0%, #F0E4A8 100%)",
        }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
            SERVICES
          </p>
          <h1
            className="text-[#1A2E4A] text-4xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            인지활동서비스
          </h1>
          <p className="text-[#5A7A99] mt-3">
            치매 예방과 인지 기능 유지를 위한 전문 프로그램
          </p>
        </div>
      </section>

      {/* 서비스 소개 */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start mb-16">
            <div>
              <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
                OVERVIEW
              </p>
              <h2
                className="text-[#1A2E4A] text-2xl font-bold mb-5"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                인지활동서비스란?
              </h2>
              <p className="text-[#1A2E4A] text-[15px] leading-[1.9] mb-4">
                치매·인지저하가 있는 어르신의 인지 기능 유지 및 악화 방지를 위해
                전문 요양보호사가 가정을 방문하여 개인 맞춤형 인지 자극
                프로그램을 제공하는 서비스입니다.
              </p>
              <p className="text-[#1A2E4A] text-[15px] leading-[1.9]">
                인지활동형 프로그램 교육을 이수한 전문 요양보호사가 어르신의
                상태에 맞는 프로그램을 1:1로 진행하여 치매 진행을 늦추고 삶의
                질을 높입니다.
              </p>

              <div className="mt-7 p-5 bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl">
                <p className="text-[#1A2E4A] font-bold text-sm mb-2">
                  이용 자격
                </p>
                <ul className="space-y-1.5">
                  {[
                    "장기요양 1~5등급 수급자 (치매 진단자 우선)",
                    "인지지원등급 수급자",
                    "경도 인지장애 또는 치매 어르신",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-[#1A2E4A] text-sm"
                    >
                      <CheckCircle
                        size={13}
                        className="text-[#1A56A0] flex-shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 기대 효과 */}
            <div className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-5">
                <Brain size={20} className="text-[#1A56A0]" />
                <h3
                  className="text-[#1A2E4A] font-bold"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  기대 효과
                </h3>
              </div>
              <ul className="space-y-3">
                {effects.map((e, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-[#1A2E4A] text-sm"
                  >
                    <CheckCircle
                      size={14}
                      className="text-[#1A56A0] flex-shrink-0"
                    />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 프로그램 구성 */}
          <div>
            <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
              PROGRAMS
            </p>
            <h2
              className="text-[#1A2E4A] text-2xl font-bold mb-8"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              프로그램 구성
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {programs.map((prog, i) => (
                <div
                  key={i}
                  className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl p-5"
                >
                  <div className="text-3xl mb-3">{prog.icon}</div>
                  <h3
                    className="text-[#1A2E4A] font-bold mb-3 text-sm"
                    style={{ fontFamily: "'Noto Serif KR', serif" }}
                  >
                    {prog.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {prog.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-1.5 text-[#5A7A99] text-xs"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#1A56A0] flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {cognitiveProcess}
      {/* CTA */}
      <section className="bg-[#1A2E4A] py-14">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p
              className="text-[#E8A020] font-bold text-lg mb-1"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              인지활동서비스가 궁금하신가요?
            </p>
            <p className="text-[#5A7A99] text-sm">
              어르신 상태에 맞는 프로그램을 안내해 드립니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/inquiry"
              className="flex items-center gap-2 bg-[#1A56A0] text-[#FFFFFF] px-7 py-4 rounded-xl font-bold text-sm hover:bg-[#E8A020] hover:text-[#1A2E4A] transition-colors duration-300"
            >
              상담 신청 <ArrowRight size={16} />
            </Link>
            <a
              href="tel:054-763-5988"
              className="flex items-center gap-2 border border-[#E8A020] text-[#E8A020] px-7 py-4 rounded-xl font-bold text-sm hover:bg-[#E8A020] hover:text-[#1A2E4A] transition-colors duration-300"
            >
              <Phone size={16} />
              054-763-5988
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
