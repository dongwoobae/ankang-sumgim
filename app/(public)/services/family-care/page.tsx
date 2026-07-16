import { CheckCircle, AlertTriangle } from "lucide-react";
import ServiceProcess from "@/components/ServiceProcess";
import { type Metadata } from "next";
import PageHero from "@/components/board/PageHero";
import SiblingNav from "@/components/common/SiblingNav";
import CtaBanner from "@/components/common/CtaBanner";

export const metadata: Metadata = {
  title: "가족요양",
  description:
    "가족이 직접 요양보호사 자격을 취득하여 어르신을 돌보고 급여를 받을 수 있는 가족요양 서비스 안내.",
  openGraph: { url: "/services/family-care" },
};

const eligibility = [
  "배우자",
  "직계혈족 (부모, 자녀, 손자녀 등)",
  "형제·자매",
  "직계혈족의 배우자 (며느리, 사위 등)",
];

const conditions = ["요양보호사 자격증 취득 필수", "일부 예외적 비동거 가족도 인정 가능"];

export default function FamilyCarePage() {
  return (
    <>
      <PageHero
        eyebrow="SERVICES"
        title="가족요양"
        lead="가족이 직접 돌보며 급여를 받을 수 있습니다"
        crumbs={[{ label: "홈", href: "/" }, { label: "서비스 안내" }, { label: "가족요양" }]}
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          {/* 개요 */}
          <div className="mb-10">
            <div
              className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: "var(--pop)" }}
            >
              OVERVIEW
            </div>
            <h2 className="mb-5 text-[26px] font-extrabold" style={{ color: "var(--ink-2)" }}>
              가족요양이란?
            </h2>
            <div
              className="mb-8 space-y-4 text-[15px] leading-[1.9]"
              style={{ color: "var(--ink-2)" }}
            >
              <p>
                요양보호사 자격을 취득한 가족이 직접 어르신을 돌보고, 국민건강보험공단으로부터
                장기요양급여를 수령하는 제도입니다.
              </p>
              <p>
                가족과 함께 지내며 익숙한 환경에서 돌봄을 받을 수 있어 어르신의 정서적 안정에 도움이
                되며, 돌봄 가족도 정당한 급여를 받을 수 있습니다.
              </p>
            </div>

            {/* ⚠ 동거 주의 callout */}
            <div
              className="mb-10 flex items-start gap-3 rounded-xl border p-4"
              style={{
                background: "color-mix(in srgb, var(--warn) 8%, transparent)",
                borderColor: "color-mix(in srgb, var(--warn) 40%, transparent)",
              }}
            >
              <AlertTriangle
                size={18}
                className="mt-0.5 flex-shrink-0"
                style={{ color: "var(--warn)" }}
              />
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
                <strong style={{ color: "var(--warn)" }}>동거 원칙:</strong> 수급자와 동거 중인
                가족만 원칙적으로 인정됩니다. 비동거의 경우 일부 예외가 인정될 수 있으니 센터에 사전
                확인을 부탁드립니다.
              </p>
            </div>

            {/* 이용 조건 + 대상 가족 범위 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div
                className="rounded-xl border p-6"
                style={{
                  background: "var(--paper-2)",
                  borderColor: "var(--line)",
                }}
              >
                <h3 className="mb-4 font-bold" style={{ color: "var(--ink-2)" }}>
                  이용 조건
                </h3>
                <ul className="space-y-2.5">
                  {conditions.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm leading-relaxed"
                      style={{ color: "var(--ink-2)" }}
                    >
                      <CheckCircle
                        size={13}
                        className="mt-1 flex-shrink-0"
                        style={{ color: "var(--pop)" }}
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-xl border p-6"
                style={{
                  background: "var(--paper-2)",
                  borderColor: "var(--line)",
                }}
              >
                <h3 className="mb-4 font-bold" style={{ color: "var(--ink-2)" }}>
                  대상 가족 범위
                </h3>
                <ul className="space-y-1.5">
                  {eligibility.map((item, i) => (
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
          </div>
        </div>
      </section>

      <ServiceProcess
        title="가족요양 신청 절차"
        steps={[
          {
            iconKey: "inquiry",
            title: "상담 문의",
            desc: "센터에 가족요양 가능 여부 및 자격 조건 상담",
          },
          {
            iconKey: "cert",
            title: "요양보호사 자격 취득",
            desc: "지정 교육기관에서 이수 후 국가시험 응시",
          },
          {
            iconKey: "gradeApply",
            title: "장기요양 등급 신청",
            desc: "어르신이 건강보험공단에 1~5등급 신청",
          },
          {
            iconKey: "qualification",
            title: "가족요양 신청",
            desc: "센터 방문 상담 후 가족요양보호사로 등록",
          },
          {
            iconKey: "serviceStart",
            title: "서비스 제공 및 급여 수령",
            desc: "돌봄 제공 후 매월 장기요양급여비 청구",
          },
        ]}
      />

      <section className="px-6 py-14">
        <div className="mx-auto max-w-[1200px]">
          <SiblingNav
            prev={{
              label: "방문요양서비스",
              desc: "가정 방문 요양 서비스",
              href: "/services/visit-care",
            }}
            next={{
              label: "등급신청 안내",
              desc: "장기요양등급 신청 절차",
              href: "/services/grade-apply",
            }}
          />
        </div>
      </section>

      <CtaBanner
        eyebrow="CONTACT US"
        title="가족요양 신청이 궁금하신가요?"
        desc="자격 조건부터 급여 신청까지 센터에서 안내해 드립니다."
        primary={{ text: "상담 신청", href: "/inquiry" }}
        secondary={{ text: "☎ 054-763-5988", href: "tel:054-763-5988" }}
      />
    </>
  );
}
