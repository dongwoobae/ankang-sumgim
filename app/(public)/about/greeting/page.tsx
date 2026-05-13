import { Heart, Leaf, Users } from "lucide-react";
import { type Metadata } from "next";
import PageHero from "@/components/board/PageHero";
import SiblingNav from "@/components/common/SiblingNav";
import CtaBanner from "@/components/common/CtaBanner";

export const metadata: Metadata = {
  title: "인사말",
  description:
    "안강 섬김 노인복지센터 센터장 인사말. 어르신 한 분 한 분을 소중히 섬기겠습니다.",
  openGraph: { url: "/about/greeting" },
};

const values = [
  {
    icon: <Heart size={22} />,
    title: "사랑의 돌봄",
    desc: "어르신 한 분 한 분을 가족처럼 섬기는 마음으로, 따뜻한 돌봄을 실천합니다.",
  },
  {
    icon: <Leaf size={22} />,
    title: "전문적 서비스",
    desc: "지속적인 교육과 역량 강화를 통해 수준 높은 요양 서비스를 제공합니다.",
  },
  {
    icon: <Users size={22} />,
    title: "지역사회 연대",
    desc: "경주·안강·영천·포항 지역사회와 함께 어르신의 행복한 노후를 만들어 갑니다.",
  },
];

export default function GreetingPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT US"
        title="인사말"
        lead="센터장 인사말씀"
        crumbs={[
          { label: "홈", href: "/" },
          { label: "센터소개" },
          { label: "인사말" },
        ]}
      />

      {/* 본문 — 1컬럼 prose */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[760px] text-center">
          <div
            className="mb-4 inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--pop)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--pop)" }}
            />
            Center Director
          </div>
          <h2
            className="mb-8 font-extrabold leading-[1.3]"
            style={{
              fontSize: "clamp(28px, 3.4vw, 40px)",
              letterSpacing: "-0.025em",
              color: "var(--ink-2)",
            }}
          >
            어르신의 일상을
            <br />
            <em className="not-italic" style={{ color: "var(--pop)" }}>
              함께 섬깁니다
            </em>
            .
          </h2>
          <div
            className="mx-auto mb-9 h-0.5 w-16 rounded"
            style={{ background: "var(--pop)" }}
          />
          <div
            className="space-y-5 text-left text-base leading-[1.95]"
            style={{ color: "var(--ink-2)" }}
          >
            <p>안강 섬김 노인복지센터를 찾아주셔서 진심으로 감사드립니다.</p>
            <p>
              저희 센터는 경주·안강·영천·포항 지역에서 신체적·경제적·정신적으로
              어려움을 겪고 계신 어르신들이 존엄하고 행복한 노후를 보내실 수
              있도록 최선을 다하고 있습니다.
            </p>
            <p>
              요양보호사 한 분 한 분이 어르신의 가정을 직접 방문하여 신체활동
              지원부터 정서적 교류까지 정성 어린 돌봄을 실천하고 있으며, 매월
              정기 교육을 통해 서비스의 질을 꾸준히 높여 나가고 있습니다.
            </p>
            <p>
              어르신과 가족 여러분의 신뢰에 보답하기 위해, 앞으로도 더 나은
              섬김의 자세로 함께하겠습니다. 감사합니다.
            </p>
          </div>
          <div
            className="mt-10 border-t pt-7 text-sm font-bold"
            style={{ borderColor: "var(--line)", color: "var(--ink-2)" }}
          >
            안강 섬김 노인복지센터장
          </div>
        </div>
      </section>

      {/* 섬김의 가치 3카드 */}
      <section className="px-6 py-14" style={{ background: "var(--paper-2)" }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-9 text-center">
            <div
              className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: "var(--pop)" }}
            >
              OUR VALUES
            </div>
            <h2
              className="text-[32px] font-extrabold"
              style={{ color: "var(--ink-2)" }}
            >
              섬김의 가치
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {values.map((v, i) => (
              <div
                key={i}
                className="rounded-2xl border p-7"
                style={{ background: "var(--paper-3)", borderColor: "var(--line)" }}
              >
                <div
                  className="mb-3.5 grid h-11 w-11 place-items-center rounded-xl border"
                  style={{
                    background: "white",
                    borderColor: "var(--line)",
                    color: "var(--pop)",
                  }}
                >
                  {v.icon}
                </div>
                <h3
                  className="mb-2.5 text-[15px] font-bold"
                  style={{ color: "var(--ink-2)" }}
                >
                  {v.title}
                </h3>
                <p
                  className="m-0 text-[13px] leading-[1.65]"
                  style={{ color: "var(--muted)" }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-[1200px]">
          <SiblingNav
            next={{
              label: "수상·기관선정",
              desc: "신뢰로 쌓아온 내역",
              href: "/about/awards",
            }}
          />
        </div>
      </section>

      <CtaBanner
        eyebrow="NEED HELP?"
        title="저희 센터가 궁금하신가요?"
        desc="전화 또는 온라인으로 언제든 문의해 주세요. 정성껏 답변드립니다."
        primary={{ text: "상담 신청", href: "/inquiry" }}
        secondary={{ text: "☎ 054-763-5988", href: "tel:054-763-5988" }}
      />
    </>
  );
}
