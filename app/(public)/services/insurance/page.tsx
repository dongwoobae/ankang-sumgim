import { type Metadata } from "next";
import PageHero from "@/components/board/PageHero";
import PageToc from "@/components/common/PageToc";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import SiblingNav from "@/components/common/SiblingNav";
import CtaBanner from "@/components/common/CtaBanner";

export const metadata: Metadata = {
  title: "노인장기요양보험이란",
  description: "노인장기요양보험 제도 안내. 신청 자격, 등급 기준, 급여 종류를 쉽게 설명해드립니다.",
  openGraph: { url: "/services/insurance" },
};

const steps = [
  { n: "01", title: "신청", desc: "국민건강보험공단 지사에 장기요양인정 신청서를 제출합니다." },
  { n: "02", title: "방문조사", desc: "공단 직원이 가정을 방문하여 심신 기능 상태를 조사합니다." },
  {
    n: "03",
    title: "의사소견서",
    desc: "의사에게 소견서를 발급받아 제출합니다. (65세 미만은 필수)",
  },
  {
    n: "04",
    title: "등급판정",
    desc: "등급판정위원회에서 1~5등급 또는 인지지원등급을 결정합니다.",
  },
  {
    n: "05",
    title: "서비스 이용",
    desc: "장기요양인정서를 받고 기관과 계약 후 서비스를 시작합니다.",
  },
];

const grades = [
  {
    grade: "1등급",
    score: "95점 이상",
    desc: "일상생활에서 전적으로 다른 사람의 도움이 필요한 상태",
  },
  {
    grade: "2등급",
    score: "75점 이상",
    desc: "일상생활에서 상당 부분 다른 사람의 도움이 필요한 상태",
  },
  {
    grade: "3등급",
    score: "60점 이상",
    desc: "일상생활에서 부분적으로 다른 사람의 도움이 필요한 상태",
  },
  {
    grade: "4등급",
    score: "51점 이상",
    desc: "일상생활에서 일정 부분 다른 사람의 도움이 필요한 상태",
  },
  { grade: "5등급", score: "45점 이상", desc: "치매 환자로서 치료·보호가 필요한 상태" },
  { grade: "인지지원등급", score: "45점 미만", desc: "치매 환자로서 경증 인지기능 저하 상태" },
];

const tocItems = [
  { id: "ins-overview", label: "제도 개요" },
  { id: "ins-process", label: "신청 절차" },
  { id: "ins-grades", label: "등급 기준" },
];

export default function InsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="SERVICES"
        title="노인장기요양보험이란"
        lead="제도 안내 및 이용 방법"
        crumbs={[
          { label: "홈", href: "/" },
          { label: "서비스 안내" },
          { label: "노인장기요양보험이란" },
        ]}
      />

      <section className="py-20">
        <div className="hidden min-[1440px]:block sticky z-10" style={{ top: "180px", height: 0 }}>
          <div className="absolute w-[200px]" style={{ left: "40px", top: 0 }}>
            <PageToc
              title="노인장기요양보험"
              items={tocItems}
              bottomCta={{ text: "등급 신청 도움 필요하세요?", phone: "054-763-5988" }}
            />
          </div>
        </div>
        <div className="px-6">
          <div className="mx-auto max-w-[860px] space-y-20">
            {/* 제도 개요 */}
            <div id="ins-overview">
              <div
                className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
                style={{ color: "var(--pop)" }}
              >
                OVERVIEW
              </div>
              <h2 className="mb-6 text-[26px] font-extrabold" style={{ color: "var(--ink-2)" }}>
                노인장기요양보험 제도란?
              </h2>
              <div
                className="mb-8 space-y-4 text-[15px] leading-[1.9]"
                style={{ color: "var(--ink-2)" }}
              >
                <p>
                  고령이나 노인성 질병 등으로 일상생활을 혼자 수행하기 어려운 노인들에게
                  신체활동·가사활동 지원 등의 서비스를 제공하는 사회보험 제도입니다.
                </p>
                <p>
                  2008년 7월부터 시행된 이 제도는 노인의 심신 기능 회복과 안정적인 노후 생활을
                  지원하고, 가족의 돌봄 부담을 사회적으로 분담하는 것을 목적으로 합니다.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "신청 대상", value: "65세 이상 또는\n노인성 질환자" },
                  { label: "보험료", value: "건강보험료의\n12.81%" },
                  { label: "본인 부담금", value: "재가서비스\n15%" },
                  { label: "시행일", value: "2008년\n7월 1일" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-5 text-center"
                    style={{
                      background: "var(--paper-2)",
                      borderColor: "var(--line)",
                    }}
                  >
                    <p className="mb-2 text-xs" style={{ color: "var(--muted)" }}>
                      {item.label}
                    </p>
                    <p
                      className="whitespace-pre-line text-base font-bold leading-snug"
                      style={{ color: "var(--ink-2)" }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 신청 절차 */}
            <div id="ins-process">
              <div
                className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
                style={{ color: "var(--pop)" }}
              >
                PROCESS
              </div>
              <h2 className="mb-2 text-[26px] font-extrabold" style={{ color: "var(--ink-2)" }}>
                신청 절차
              </h2>
              <ProcessTimeline cols={5} steps={steps} />
            </div>

            {/* 등급 기준 */}
            <div id="ins-grades">
              <div
                className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
                style={{ color: "var(--pop)" }}
              >
                GRADES
              </div>
              <h2 className="mb-6 text-[26px] font-extrabold" style={{ color: "var(--ink-2)" }}>
                장기요양 등급 기준
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grades.map((g, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-5"
                    style={{
                      background: "var(--paper-2)",
                      borderColor: "var(--line)",
                    }}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-bold" style={{ color: "var(--ink-2)" }}>
                        {g.grade}
                      </span>
                      <span className="text-sm font-bold" style={{ color: "var(--pop)" }}>
                        {g.score}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {g.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-[860px]">
          <SiblingNav
            next={{
              label: "방문요양",
              desc: "재가 방문요양 서비스 안내",
              href: "/services/visit-care",
            }}
          />
        </div>
      </section>

      <CtaBanner
        eyebrow="NEED HELP?"
        title="등급 신청이 처음이신가요?"
        desc="안강 섬김 노인복지센터에서 등급 신청부터 서비스 이용까지 안내해 드립니다."
        primary={{ text: "등급신청 안내 보기", href: "/services/grade-apply" }}
        secondary={{ text: "☎ 054-763-5988", href: "tel:054-763-5988" }}
      />
    </>
  );
}
