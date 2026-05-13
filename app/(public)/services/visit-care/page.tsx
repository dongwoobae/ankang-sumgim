import { CheckCircle } from "lucide-react";
import ServiceProcess from "@/components/ServiceProcess";
import { type Metadata } from "next";
import PageHero from "@/components/board/PageHero";
import SiblingNav from "@/components/common/SiblingNav";
import CtaBanner from "@/components/common/CtaBanner";

export const metadata: Metadata = {
  title: "방문요양서비스",
  description:
    "요양보호사가 가정을 직접 방문하여 신체활동·가사활동·정서지원 서비스를 제공합니다. 목욕차 2대 보유.",
  openGraph: { url: "/services/visit-care" },
};

const highlights = [
  { title: "목욕차 보유", value: "2대", desc: "지역 최다 보유 — 빠른 배차 가능" },
  { title: "서비스 지역", value: "4개 시군", desc: "경주·안강·영천·포항 전역" },
  { title: "요양사 교육", value: "월 1회", desc: "정기 역량 강화 교육 실시" },
];

export default function VisitCarePage() {
  return (
    <>
      <PageHero
        eyebrow="SERVICES"
        title="방문요양서비스"
        lead="가정을 직접 방문하여 정성껏 돌봄을 제공합니다"
        crumbs={[
          { label: "홈", href: "/" },
          { label: "서비스 안내" },
          { label: "방문요양서비스" },
        ]}
      />

      {/* 핵심 수치 */}
      <section style={{ background: "var(--ink)" }}>
        <div className="mx-auto max-w-[1200px] px-6 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            {highlights.map((h, i) => (
              <div key={i} className="text-center">
                <p
                  className="mb-1 text-xs tracking-widest"
                  style={{ color: "var(--muted)" }}
                >
                  {h.title}
                </p>
                <p className="mb-1 text-3xl font-bold text-white">{h.value}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 소개 */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 grid grid-cols-1 items-start gap-14 md:grid-cols-2">
            <div>
              <div
                className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
                style={{ color: "var(--pop)" }}
              >
                WHAT WE DO
              </div>
              <h2
                className="mb-5 text-[26px] font-extrabold"
                style={{ color: "var(--ink-2)" }}
              >
                방문요양서비스란?
              </h2>
              <div
                className="space-y-4 text-[15px] leading-[1.9]"
                style={{ color: "var(--ink-2)" }}
              >
                <p>
                  장기요양 1~5등급 판정을 받은 어르신의 가정에 요양보호사가 직접
                  방문하여 신체활동 및 가사활동을 지원하는 재가급여 서비스입니다.
                </p>
                <p>
                  안강 섬김 노인복지센터는 어르신의 상태에 맞게 1회 방문 시 다양한
                  시간으로 돌봄을 제공하며, 경주·안강·영천·포항 전역에서 서비스를
                  운영하고 있습니다.
                </p>
              </div>
            </div>

            <div
              className="rounded-xl border p-5"
              style={{
                background: "var(--paper-2)",
                borderColor: "var(--line)",
              }}
            >
              <p
                className="mb-3 text-sm font-bold"
                style={{ color: "var(--ink-2)" }}
              >
                이용 자격
              </p>
              <ul className="space-y-2">
                {[
                  "장기요양인정서를 받은 1~5등급 수급자",
                  "인지지원등급 수급자 (일부 서비스 제한)",
                  "의사소견서 제출 완료자",
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
        </div>
      </section>

      <ServiceProcess
        title="방문요양 서비스 이용 절차"
        steps={[
          { iconKey: "inquiry", title: "상담 문의", desc: "전화·온라인으로 서비스 내용 및 비용 상담" },
          { iconKey: "gradeApply", title: "등급신청", desc: "건강보험공단에 장기요양인정 신청서 제출" },
          { iconKey: "visitCheck", title: "공단 방문조사", desc: "공단 직원이 가정을 방문하여 심신 상태 조사" },
          { iconKey: "gradeJudgment", title: "등급판정", desc: "판정위원회 심사 후 1~5등급 결정 (2~4주)" },
          { iconKey: "contract", title: "계약 체결", desc: "센터 방문 상담 후 서비스 계획서 작성 및 계약" },
          { iconKey: "serviceStart", title: "서비스 시작", desc: "담당 요양보호사 배정 후 가정 방문 돌봄 시작" },
        ]}
      />

      <section className="px-6 py-14">
        <div className="mx-auto max-w-[1200px]">
          <SiblingNav
            prev={{ label: "노인장기요양보험이란", desc: "제도 안내 및 이용 방법", href: "/services/insurance" }}
            next={{ label: "가족요양서비스", desc: "가족이 직접 돌보는 요양서비스", href: "/services/family-care" }}
          />
        </div>
      </section>

      <CtaBanner
        eyebrow="CONTACT US"
        title="방문요양 서비스가 필요하신가요?"
        desc="경주·안강·영천·포항 지역 어르신께 정성껏 서비스를 제공합니다."
        primary={{ text: "상담 신청", href: "/inquiry" }}
        secondary={{ text: "☎ 054-763-5988", href: "tel:054-763-5988" }}
      />
    </>
  );
}
