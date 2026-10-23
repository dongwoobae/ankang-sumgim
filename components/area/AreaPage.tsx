import Link from "next/link";
import { type Metadata } from "next";
import { Bath, Bus, CheckCircle, ExternalLink, MapPin } from "lucide-react";
import PageHero from "@/components/board/PageHero";
import CtaBanner from "@/components/common/CtaBanner";
import { pageMetadata } from "@/lib/seo";
import {
  BATH_CAR_AREAS,
  CAREGIVER_COUNT,
  CENTER_TOWN,
  CLIENT_COUNT,
  NHIS_CHECKED_AT,
  type ServiceArea,
} from "@/lib/service-areas";

const services = [
  {
    label: "방문요양",
    desc: "요양보호사가 댁을 방문해 신체활동·가사활동을 돕습니다.",
    href: "/services/visit-care",
  },
  {
    label: "방문목욕",
    desc: `목욕차가 댁 앞까지 찾아갑니다. 운행 지역: ${BATH_CAR_AREAS}`,
    href: "/services/visit-bath",
  },
  {
    label: "등급신청 도움",
    desc: "장기요양 등급 신청 서류 준비부터 함께합니다.",
    href: "/services/grade-apply",
  },
];

// 지역별 요양보호사 수는 싣지 않는다 — docs/specs/area-pages.md "센터 회신"
const centerTownLinks = [
  {
    icon: Bus,
    text: "안강버스터미널에서 걸어서 10분쯤입니다.",
    label: "오시는길",
    href: "/about/location",
  },
  {
    icon: Bath,
    text: `센터 목욕차가 ${CENTER_TOWN.name} 어르신 댁 앞까지 찾아갑니다.`,
    label: "방문목욕",
    href: "/services/visit-bath",
  },
];

function CenterTownSection({ area }: { area: ServiceArea }) {
  return (
    // 고정 헤더(72px, md 108px)에 제목이 가리지 않도록 그만큼 더 띄워 멈춘다.
    <section id={CENTER_TOWN.anchor} className="scroll-mt-[96px] px-6 pb-20 md:scroll-mt-[132px]">
      <div
        className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 rounded-2xl border p-8 md:grid-cols-2 md:p-12"
        style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}
      >
        <div>
          <div
            className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--pop)" }}
          >
            OUR TOWN
          </div>
          <h2 className="mb-5 text-[26px] font-extrabold" style={{ color: "var(--ink-2)" }}>
            센터가 있는 {CENTER_TOWN.town}
          </h2>
          <div className="space-y-4 text-[15px] leading-[1.9]" style={{ color: "var(--ink-2)" }}>
            <p>
              센터가 {CENTER_TOWN.town}에 있어 이용하시는 어르신도 {CENTER_TOWN.name}에 많습니다.
            </p>
            <p>
              {CENTER_TOWN.town}도 {area.city}라 장기요양 등급 신청 창구가 같습니다. 아래 안내를
              보세요.
            </p>
          </div>
        </div>

        <ul className="space-y-3">
          {centerTownLinks.map(({ icon: Icon, text, label, href }) => (
            <li
              key={href}
              className="flex items-start gap-3 rounded-xl border bg-white p-5"
              style={{ borderColor: "var(--line)" }}
            >
              <Icon size={20} className="mt-0.5 flex-shrink-0" style={{ color: "var(--pop)" }} />
              <div className="text-sm" style={{ color: "var(--ink-2)" }}>
                <p className="mb-1">{text}</p>
                <Link href={href} className="font-semibold" style={{ color: "var(--pop)" }}>
                  {label} 보기 →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function areaMetadata(area: ServiceArea): Metadata {
  return pageMetadata(`/area/${area.slug}`, {
    title: `${area.name} 노인복지센터 · 방문요양·방문목욕`,
    description: `${area.city} 어르신 댁을 찾아가는 방문요양·방문목욕. 경주시 안강읍 섬김노인복지센터가 장기요양 등급 신청부터 도와드리며, ${area.city} 관할 국민건강보험공단 지사를 안내합니다.`,
  });
}

export default function AreaPage({ area }: { area: ServiceArea }) {
  return (
    <>
      <PageHero
        eyebrow="SERVICE AREA"
        title={`${area.name} 방문요양·방문목욕`}
        lead={`${area.city} 어르신 댁을 찾아갑니다`}
        crumbs={[{ label: "홈", href: "/" }, { label: "지역 안내" }, { label: area.name }]}
      />

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-14 md:grid-cols-2">
          <div>
            <div
              className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: "var(--pop)" }}
            >
              WHERE WE GO
            </div>
            <h2 className="mb-5 text-[26px] font-extrabold" style={{ color: "var(--ink-2)" }}>
              {area.city} 전역을 방문합니다
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.9]" style={{ color: "var(--ink-2)" }}>
              <p>
                섬김노인복지센터는 경상북도 경주시 안강읍 화전중앙길 53에 있습니다. 요양보호사가{" "}
                {area.city} 어르신 댁을 직접 찾아가 돌봄을 드리고, 센터 목욕차는 {BATH_CAR_AREAS}을
                운행합니다.
              </p>
              <p>
                지금 센터 요양보호사 {CAREGIVER_COUNT}이 어르신 {CLIENT_COUNT}을 돌보고 있습니다.{" "}
                {area.city} 어디든 신청하시면 요양보호사를 구해 연결해 드립니다.
              </p>
            </div>
          </div>

          <div
            className="rounded-xl border p-5"
            style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}
          >
            <p className="mb-3 text-sm font-bold" style={{ color: "var(--ink-2)" }}>
              {area.name}에서 이용하실 수 있는 서비스
            </p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.href} className="flex items-start gap-2 text-sm">
                  <CheckCircle
                    size={13}
                    className="mt-1 flex-shrink-0"
                    style={{ color: "var(--pop)" }}
                  />
                  <span style={{ color: "var(--ink-2)" }}>
                    <Link href={s.href} className="font-bold underline-offset-4 hover:underline">
                      {s.label}
                    </Link>{" "}
                    — {s.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {area.slug === CENTER_TOWN.areaSlug && <CenterTownSection area={area} />}

      <section className="px-6 py-20" style={{ background: "var(--paper-2)" }}>
        <div className="mx-auto max-w-[1200px]">
          <div
            className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--pop)" }}
          >
            GRADE APPLICATION
          </div>
          <h2 className="mb-5 text-[26px] font-extrabold" style={{ color: "var(--ink-2)" }}>
            {area.name} 지역 장기요양 등급 신청 창구
          </h2>
          <p className="mb-8 text-[15px] leading-[1.9]" style={{ color: "var(--ink-2)" }}>
            장기요양 등급 신청은 국민건강보험공단 지사의 노인장기요양보험 운영센터에서 받습니다.{" "}
            {area.city}를 관할하는 지사는 아래와 같습니다. 서류 준비와 신청은 저희 센터가 함께
            도와드립니다.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {area.branches.map((b) => (
              <div
                key={b.name}
                className="rounded-2xl border bg-white p-6"
                style={{ borderColor: "var(--line)" }}
              >
                <p className="mb-1 text-xs" style={{ color: "var(--muted)" }}>
                  관할: {b.jurisdiction}
                </p>
                <h3 className="mb-1 text-[17px] font-bold" style={{ color: "var(--ink-2)" }}>
                  {b.name}
                </h3>
                <p className="mb-4 text-sm" style={{ color: "var(--ink-2)" }}>
                  {b.center}
                </p>
                <p
                  className="mb-4 flex items-start gap-2 text-sm"
                  style={{ color: "var(--ink-2)" }}
                >
                  <MapPin
                    size={14}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "var(--pop)" }}
                  />
                  {b.address}
                </p>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: "var(--pop)" }}
                >
                  찾아가는 길 (공단 누리집)
                  <ExternalLink size={13} />
                </a>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs" style={{ color: "var(--muted)" }}>
            공단 대표전화 1577-1000 · {NHIS_CHECKED_AT} 국민건강보험공단 누리집 기준
          </p>
          <Link
            href="/services/grade-apply"
            className="mt-4 inline-block text-sm font-semibold"
            style={{ color: "var(--pop)" }}
          >
            등급신청 절차 보기 →
          </Link>
        </div>
      </section>

      <CtaBanner
        eyebrow="CONTACT US"
        title={`${area.name} 지역 어르신 돌봄, 상담해 드립니다`}
        desc="방문요양·방문목욕·등급 신청까지 한 번에 안내해 드립니다."
        primary={{ text: "상담 신청", href: "/inquiry" }}
        secondary={{ text: "☎ 054-763-5988", href: "tel:054-763-5988" }}
      />
    </>
  );
}
