import { Brain, CheckCircle, Puzzle, Home, Activity, MessageCircle } from "lucide-react";
import ServiceProcess from "@/components/ServiceProcess";
import { type Metadata } from "next";
import PageHero from "@/components/board/PageHero";
import SiblingNav from "@/components/common/SiblingNav";
import CtaBanner from "@/components/common/CtaBanner";

export const metadata: Metadata = {
  title: "인지활동서비스",
  description:
    "치매 예방과 인지 기능 유지를 위한 전문 프로그램. 어르신 맞춤 인지활동서비스를 제공합니다.",
  openGraph: { url: "/services/cognitive" },
};

const programs = [
  {
    title: "인지 자극 훈련",
    icon: <Puzzle size={22} />,
    items: ["기억력 강화 게임", "퍼즐·그림 맞추기", "숫자·글자 인지 활동", "회상 요법"],
  },
  {
    title: "일상생활 훈련",
    icon: <Home size={22} />,
    items: ["요리·청소 등 가사 활동 참여", "개인위생 관리 훈련", "시간·날짜 인지 연습", "외출 동행 활동"],
  },
  {
    title: "신체 활동",
    icon: <Activity size={22} />,
    items: ["스트레칭 및 체조", "균형 감각 훈련", "손·발 근력 강화 운동", "산책 동행"],
  },
  {
    title: "정서·사회 활동",
    icon: <MessageCircle size={22} />,
    items: ["말벗·대화 프로그램", "노래·음악 치료", "그림 그리기·공예", "가족 연계 소통 지원"],
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

export default function CognitivePage() {
  return (
    <>
      <PageHero
        eyebrow="SERVICES"
        title="인지활동서비스"
        lead="치매 예방과 인지 기능 유지를 위한 전문 프로그램"
        crumbs={[
          { label: "홈", href: "/" },
          { label: "서비스 안내" },
          { label: "인지활동서비스" },
        ]}
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          {/* 개요 + 기대 효과 */}
          <div className="mb-16 grid grid-cols-1 items-start gap-14 md:grid-cols-2">
            <div>
              <div
                className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
                style={{ color: "var(--pop)" }}
              >
                OVERVIEW
              </div>
              <h2
                className="mb-5 text-[26px] font-extrabold"
                style={{ color: "var(--ink-2)" }}
              >
                인지활동서비스란?
              </h2>
              <div
                className="mb-7 space-y-4 text-[15px] leading-[1.9]"
                style={{ color: "var(--ink-2)" }}
              >
                <p>
                  치매·인지저하가 있는 어르신의 인지 기능 유지 및 악화 방지를 위해
                  전문 요양보호사가 가정을 방문하여 개인 맞춤형 인지 자극
                  프로그램을 제공하는 서비스입니다.
                </p>
                <p>
                  인지활동형 프로그램 교육을 이수한 전문 요양보호사가 어르신의
                  상태에 맞는 프로그램을 1:1로 진행하여 치매 진행을 늦추고 삶의
                  질을 높입니다.
                </p>
              </div>

              <div
                className="rounded-xl border p-5"
                style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}
              >
                <p className="mb-2 text-sm font-bold" style={{ color: "var(--ink-2)" }}>
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
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "var(--ink-2)" }}
                    >
                      <CheckCircle
                        size={13}
                        className="flex-shrink-0"
                        style={{ color: "var(--pop)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 기대 효과 */}
            <div
              className="rounded-2xl border p-7"
              style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}
            >
              <div className="mb-5 flex items-center gap-2">
                <Brain size={20} style={{ color: "var(--pop)" }} />
                <h3 className="font-bold" style={{ color: "var(--ink-2)" }}>
                  기대 효과
                </h3>
              </div>
              <ul className="space-y-3">
                {effects.map((e, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "var(--ink-2)" }}
                  >
                    <CheckCircle
                      size={14}
                      className="flex-shrink-0"
                      style={{ color: "var(--pop)" }}
                    />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 프로그램 구성 */}
          <div>
            <div
              className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: "var(--pop)" }}
            >
              PROGRAMS
            </div>
            <h2
              className="mb-8 text-[26px] font-extrabold"
              style={{ color: "var(--ink-2)" }}
            >
              프로그램 구성
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {programs.map((prog, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-5"
                  style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}
                >
                  <div
                    className="mb-3 grid h-11 w-11 place-items-center rounded-xl border"
                    style={{
                      background: "white",
                      borderColor: "var(--line)",
                      color: "var(--pop)",
                    }}
                  >
                    {prog.icon}
                  </div>
                  <h3
                    className="mb-3 text-sm font-bold"
                    style={{ color: "var(--ink-2)" }}
                  >
                    {prog.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {prog.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-1.5 text-xs"
                        style={{ color: "var(--muted)" }}
                      >
                        <span
                          className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full"
                          style={{ background: "var(--pop)" }}
                        />
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

      <ServiceProcess
        title="인지활동서비스 이용 절차"
        steps={[
          { iconKey: "inquiry", title: "상담 문의", desc: "전화·온라인으로 인지활동서비스 상담" },
          { iconKey: "gradeJudgment", title: "등급·진단 확인", desc: "장기요양 1~5등급 또는 인지지원등급 보유 확인" },
          { iconKey: "caregiver", title: "전담 요양보호사 배정", desc: "인지활동형 교육 이수 전문 요양보호사 연결" },
          { iconKey: "plan", title: "맞춤 프로그램 계획", desc: "어르신 상태에 맞는 1:1 인지 자극 계획 수립" },
          { iconKey: "serviceStart", title: "서비스 시작", desc: "가정 방문 인지활동 프로그램 정기 제공" },
        ]}
      />

      <section className="px-6 py-14">
        <div className="mx-auto max-w-[1200px]">
          <SiblingNav
            prev={{ label: "등급신청 안내", desc: "장기요양등급 신청 절차", href: "/services/grade-apply" }}
            next={{ label: "요양비 계산기", desc: "예상 본인부담금 계산", href: "/calculator" }}
          />
        </div>
      </section>

      <CtaBanner
        eyebrow="CONTACT US"
        title="인지활동서비스가 궁금하신가요?"
        desc="어르신 상태에 맞는 프로그램을 안내해 드립니다."
        primary={{ text: "상담 신청", href: "/inquiry" }}
        secondary={{ text: "☎ 054-763-5988", href: "tel:054-763-5988" }}
      />
    </>
  );
}
