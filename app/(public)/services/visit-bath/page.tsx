import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { type Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BATH_CAR_AREAS, SERVICE_AREAS } from "@/lib/service-areas";
import PageHero from "@/components/board/PageHero";
import SiblingNav from "@/components/common/SiblingNav";
import CtaBanner from "@/components/common/CtaBanner";

export const metadata: Metadata = pageMetadata("/services/visit-bath", {
  title: "방문목욕",
  description: `목욕차가 어르신 댁 앞까지 찾아가 차 안 욕조에서 목욕을 도와드립니다. 요양보호사 2명, 약 1시간. ${BATH_CAR_AREAS} 운행.`,
});

const highlights = [
  { title: "목욕차", value: "2대", desc: `${BATH_CAR_AREAS} 운행` },
  { title: "목욕 인원", value: "요양보호사 2명", desc: "기사님은 차량 운행 전담" },
  { title: "소요 시간", value: "약 1시간", desc: "1회 방문 기준" },
];

const steps = [
  { title: "목욕차 도착", desc: "약속한 시간에 목욕차가 댁 앞에 도착합니다." },
  {
    title: "차량까지 이동",
    desc: "요양보호사가 부축하거나 휠체어로 어르신을 차량까지 모십니다.",
  },
  {
    title: "차 안 욕조에서 목욕",
    desc: "리모컨으로 욕조를 기울여 어르신이 욕조에 들어가시기 쉽게 하고, 요양보호사 2명이 목욕을 도와드립니다.",
  },
  { title: "댁으로 모셔다 드림", desc: "목욕을 마치면 다시 댁으로 모셔다 드립니다." },
];

// 얼굴 블러와 업로드 규칙은 docs/specs/visit-bath.md
const R2 = "https://pub-b7ac63154d17462da44c76addda6b6be.r2.dev/pages/visit-bath";
const photos = [
  {
    src: `${R2}/walk-assist.webp`,
    alt: "요양보호사 두 명이 지팡이를 짚은 어르신을 부축해 걷는 모습",
    position: "50% 50%",
  },
  {
    src: `${R2}/lift-exterior.webp`,
    alt: "'섬김' 글자가 적힌 노란 목욕차 뒤편으로 요양보호사가 어르신과 함께 오르는 모습",
    position: "50% 40%",
  },
  {
    src: `${R2}/carry-to-car.webp`,
    alt: "요양보호사가 어르신을 업어 목욕차 안 욕조로 모시는 모습",
    position: "40% 50%",
  },
  {
    src: `${R2}/after-bath.webp`,
    alt: "목욕을 마친 어르신이 수건을 두르고 요양보호사 두 명과 목욕차에서 나오는 모습",
    position: "50% 50%",
  },
];

export default function VisitBathPage() {
  return (
    <>
      <PageHero
        eyebrow="SERVICES"
        title="방문목욕"
        lead="목욕차가 댁 앞까지 찾아가 차 안에서 목욕을 도와드립니다"
        crumbs={[{ label: "홈", href: "/" }, { label: "서비스 안내" }, { label: "방문목욕" }]}
      />

      <section style={{ background: "var(--ink)" }}>
        <div className="mx-auto max-w-[1200px] px-6 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {highlights.map((h) => (
              <div key={h.title} className="text-center">
                <p className="mb-1 text-xs tracking-widest" style={{ color: "var(--muted)" }}>
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

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-14 md:grid-cols-2">
          <div>
            <div
              className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: "var(--pop)" }}
            >
              WHAT WE DO
            </div>
            <h2 className="mb-5 text-[26px] font-extrabold" style={{ color: "var(--ink-2)" }}>
              방문목욕이란?
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.9]" style={{ color: "var(--ink-2)" }}>
              <p>
                장기요양 등급을 받은 어르신 댁을 찾아가 요양보호사가 목욕을 도와드리는 재가급여
                서비스입니다.
              </p>
              <p>
                섬김노인복지센터는 목욕차 안 욕조에서 목욕을 진행합니다. 요양보호사 2명이 직접
                목욕을 돕고, 기사님은 차량 운행을 맡습니다.
              </p>
              <p>방문요양을 이용하지 않으셔도 방문목욕만 따로 신청하실 수 있습니다.</p>
            </div>
          </div>

          <div
            className="rounded-xl border p-5"
            style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}
          >
            <p className="mb-3 text-sm font-bold" style={{ color: "var(--ink-2)" }}>
              이용 대상
            </p>
            <ul className="space-y-2">
              {[
                "장기요양 1~5등급 판정을 받은 어르신",
                "부축이나 휠체어로 목욕차까지 이동하실 수 있는 어르신",
                "방문요양을 이용하지 않는 어르신도 신청 가능",
              ].map((item) => (
                <li
                  key={item}
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
            <p className="mt-5 text-sm" style={{ color: "var(--ink-2)" }}>
              운행 지역: {BATH_CAR_AREAS}
              {" — "}
              {SERVICE_AREAS.map((a, i) => (
                <span key={a.slug}>
                  {i > 0 && " · "}
                  <Link
                    href={`/area/${a.slug}`}
                    className="font-semibold underline-offset-4 hover:underline"
                    style={{ color: "var(--pop)" }}
                  >
                    {a.name} 지역 안내
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20" style={{ background: "var(--paper-2)" }}>
        <div className="mx-auto max-w-[1200px]">
          <div
            className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--pop)" }}
          >
            HOW IT WORKS
          </div>
          <h2 className="mb-8 text-[26px] font-extrabold" style={{ color: "var(--ink-2)" }}>
            목욕은 이렇게 진행됩니다
          </h2>
          <ol className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="rounded-2xl border bg-white p-5"
                style={{ borderColor: "var(--line)" }}
              >
                <p className="mb-2 text-xs font-bold" style={{ color: "var(--pop)" }}>
                  STEP {i + 1}
                </p>
                <p className="mb-2 font-bold" style={{ color: "var(--ink-2)" }}>
                  {s.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div
            className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--pop)" }}
          >
            PHOTOS
          </div>
          <h2 className="mb-8 text-[26px] font-extrabold" style={{ color: "var(--ink-2)" }}>
            방문목욕 현장
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {photos.map((p) => (
              <div
                key={p.src}
                className="relative overflow-hidden rounded-xl"
                style={{ aspectRatio: "3/4" }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: p.position }}
                  sizes="(min-width: 1200px) 290px, (min-width: 768px) 25vw, 50vw"
                />
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
            사진 속 어르신 얼굴은 가려서 게시합니다.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-[1200px]">
          <SiblingNav
            prev={{
              label: "방문요양서비스",
              desc: "가정 방문 요양 서비스",
              href: "/services/visit-care",
            }}
            next={{
              label: "가족요양서비스",
              desc: "가족이 직접 돌보는 요양서비스",
              href: "/services/family-care",
            }}
          />
        </div>
      </section>

      <CtaBanner
        eyebrow="CONTACT US"
        title="방문목욕이 필요하신가요?"
        desc={`${BATH_CAR_AREAS} 어르신 댁으로 목욕차가 찾아갑니다.`}
        primary={{ text: "상담 신청", href: "/inquiry" }}
        secondary={{ text: "☎ 054-763-5988", href: "tel:054-763-5988" }}
      />
    </>
  );
}
