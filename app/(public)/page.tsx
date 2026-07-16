import Link from "next/link";
import { Phone, ChevronRight, Award } from "lucide-react";
import { adminSupabase } from "@/lib/supabase/admin";
import Image from "next/image";
import { type Metadata } from "next";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Reveal from "@/components/common/Reveal";

export const metadata: Metadata = {
  title: {
    absolute: "안강 섬김 노인복지센터", // template 무시하고 단독 표기
  },
  description: "어르신의 일상을 함께 섬기는 방문요양센터",
};

const services = [
  {
    title: "방문요양서비스",
    desc: "요양보호사가 직접 가정을 방문하여 신체활동 및 가사활동을 지원합니다.",
    href: "/services/visit-care",
    tag: "대표 서비스",
  },
  {
    title: "가족요양",
    desc: "가족이 직접 요양보호사 자격을 취득하여 어르신을 돌보고 급여를 받을 수 있습니다.",
    href: "/services/family-care",
    tag: null,
  },
  {
    title: "인지활동서비스",
    desc: "치매 예방과 인지 기능 유지를 위한 전문 프로그램을 제공합니다.",
    href: "/services/cognitive",
    tag: null,
  },
  {
    title: "등급신청 안내",
    desc: "장기요양 등급 신청부터 판정까지 전 과정을 단계별로 안내해 드립니다.",
    href: "/services/grade-apply",
    tag: null,
  },
];

async function getRecentNotices() {
  const { data } = await adminSupabase
    .from("notices")
    .select("id, title, created_at, is_pinned")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

async function getHeroPhotos() {
  const { data } = await adminSupabase
    .from("hero_photos")
    .select("url")
    .order("display_order", { ascending: true });
  return (data ?? []).map((p) => p.url);
}

async function getAwards() {
  const { data } = await adminSupabase
    .from("awards")
    .select("id, title, org, awarded_at, image_url, display_order")
    .order("display_order", { ascending: true })
    .limit(3);
  return data ?? [];
}

export const revalidate = false;

export default async function HomePage() {
  const [notices, heroPhotos, awardsData] = await Promise.all([
    getRecentNotices(),
    getHeroPhotos(),
    getAwards(),
  ]);

  return (
    <div>
      {/* ───── Hero ───── */}
      <Hero photos={heroPhotos} />

      {/* ───── 신뢰 지표 ───── */}
      <Stats />

      {/* ───── 서비스 ───── */}
      <section className="py-[clamp(80px,10vw,140px)] px-6 bg-[var(--paper-2)]">
        <div className="max-w-[1200px] mx-auto">
          {/* 헤더 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-6 mb-14">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2.5 text-xs tracking-[0.3em] uppercase text-[var(--pop)] font-semibold mb-[18px]">
                  <span className="w-1.5 h-1.5 bg-[var(--pop)] rounded-full" />
                  SERVICES
                </div>
              </Reveal>
              <Reveal variant="up-strong" stagger={1}>
                <h2
                  className="m-0 max-w-[24ch] leading-[1.18]"
                  style={{ fontSize: "clamp(30px, 4vw, 48px)" }}
                >
                  섬김의 서비스
                </h2>
              </Reveal>
            </div>
            <Reveal>
              <Link
                href="/services/visit-care"
                className="text-[var(--pop)] text-[14px] font-semibold inline-flex items-center gap-1 group"
              >
                전체 서비스 보기{" "}
                <span className="transition-transform group-hover:translate-x-1.5">→</span>
              </Link>
            </Reveal>
          </div>

          {/* 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <Reveal key={svc.href} variant="up-soft" stagger={i}>
                <Link
                  href={svc.href}
                  className="group relative block bg-[var(--paper)] border border-[var(--line)] rounded-2xl p-8 transition-all duration-[350ms] hover:-translate-y-1 hover:border-[var(--pop)] hover:shadow-[var(--shadow-card)] overflow-hidden"
                >
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--pop)] scale-y-0 origin-top transition-transform duration-[450ms] group-hover:scale-y-100" />
                  {svc.tag && (
                    <span className="absolute top-6 right-6 text-[10px] font-bold tracking-[0.1em] bg-[var(--pop)] text-white px-2.5 py-1 rounded-full">
                      {svc.tag}
                    </span>
                  )}
                  <div className="text-[var(--line-2)] text-[13px] tracking-[0.2em] mb-[18px] font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl text-[var(--ink-2)] mb-3 tracking-[-0.01em]">
                    {svc.title}
                  </h3>
                  <p className="text-[14px] text-[var(--muted)] leading-[1.7] mb-[22px]">
                    {svc.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[var(--pop)] text-[13px] font-semibold">
                    자세히 보기 <ChevronRight size={14} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 수상·기관선정 ───── */}
      <section className="py-[clamp(80px,10vw,140px)] px-6 bg-[var(--paper-3)]">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="mb-14">
            <div className="inline-flex items-center gap-2.5 text-xs tracking-[0.3em] uppercase text-[var(--pop)] font-semibold mb-[18px]">
              <span className="w-1.5 h-1.5 bg-[var(--pop)] rounded-full" />
              AWARDS
            </div>
            <h2
              className="m-0 max-w-[24ch] leading-[1.18]"
              style={{ fontSize: "clamp(30px, 4vw, 48px)" }}
            >
              수상 및 기관선정
            </h2>
          </Reveal>

          {awardsData.length === 0 ? (
            <p className="text-center text-[var(--muted)] py-8">등록된 수상 내역이 없습니다.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {awardsData.map((award, i) => (
                <Reveal key={award.id} variant="up-soft" stagger={i}>
                  <div className="bg-[var(--paper)] border border-[var(--line)] rounded-2xl p-8 transition-all duration-[350ms] hover:-translate-y-[3px] hover:shadow-[var(--shadow-card)]">
                    <div
                      className="aspect-[16/9] rounded-[10px] overflow-hidden mb-[22px] grid place-items-center text-[var(--muted)] text-xs font-mono"
                      style={{
                        background:
                          "repeating-linear-gradient(45deg, #eef4fb 0 8px, #e3edf8 8px 16px)",
                      }}
                    >
                      {award.image_url ? (
                        <Image
                          src={award.image_url}
                          alt={award.title}
                          width={400}
                          height={225}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Award size={24} className="text-[var(--pop)]" />
                          <span>AWARD PHOTO</span>
                        </div>
                      )}
                    </div>
                    <span className="inline-block text-[14px] font-bold text-[var(--pop)] mb-2 tracking-[0.04em]">
                      {new Date(award.awarded_at).getFullYear()}
                    </span>
                    <h3 className="text-[17px] text-[var(--ink-2)] mb-1.5">{award.title}</h3>
                    <p className="text-[13px] text-[var(--muted)]">{award.org}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="text-center mt-12">
            <Link
              href="/about/awards"
              className="inline-flex items-center gap-1.5 text-[var(--pop)] font-semibold text-[14px] group"
            >
              전체 수상 내역 보기{" "}
              <span className="transition-transform group-hover:translate-x-1.5">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───── 공지사항 ───── */}
      <section className="py-[clamp(80px,10vw,140px)] px-6 bg-[var(--paper)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-6 mb-9">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2.5 text-xs tracking-[0.3em] uppercase text-[var(--pop)] font-semibold mb-[18px]">
                  <span className="w-1.5 h-1.5 bg-[var(--pop)] rounded-full" />
                  NOTICE
                </div>
              </Reveal>
              <Reveal variant="up-strong" stagger={1}>
                <h2 className="m-0 leading-[1.18]" style={{ fontSize: "clamp(30px, 4vw, 48px)" }}>
                  공지사항
                </h2>
              </Reveal>
            </div>
            <Reveal>
              <Link
                href="/board/notice"
                className="text-[var(--pop)] text-[14px] font-semibold inline-flex items-center gap-1 group"
              >
                더보기 <span className="transition-transform group-hover:translate-x-1.5">→</span>
              </Link>
            </Reveal>
          </div>

          <ul className="list-none m-0 p-0 border-t border-[var(--line)]">
            {notices.map((notice, i) => (
              <Reveal
                key={notice.id}
                variant="up-soft"
                stagger={i}
                as="li"
                className="border-b border-[var(--line)]"
              >
                <Link
                  href={`/board/notice/${notice.id}`}
                  className="grid grid-cols-[auto_1fr_auto] gap-6 items-center py-[22px] px-1 transition-all duration-[250ms] hover:px-4 hover:bg-[var(--paper-2)] group"
                >
                  {notice.is_pinned ? (
                    <span className="text-[11px] font-bold tracking-wide bg-[var(--pop)] text-white px-2.5 py-1 rounded">
                      공지
                    </span>
                  ) : (
                    <span className="font-mono text-[var(--muted-2)] text-[13px] min-w-[32px]">
                      {String(notices.length - i).padStart(2, "0")}
                    </span>
                  )}
                  <span className="text-[var(--ink-2)] text-base font-medium tracking-[-0.01em] group-hover:text-[var(--pop)] transition-colors truncate">
                    {notice.title}
                  </span>
                  <span className="text-[var(--muted)] font-mono text-[13px] whitespace-nowrap">
                    {notice.created_at.slice(0, 10).replace(/-/g, ".")}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── CTA 배너 ───── */}
      <section className="bg-[var(--ink-2)] py-20 px-6 relative overflow-hidden">
        <div
          className="absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "rgba(26,86,160,0.1)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-[1200px] mx-auto text-center">
          <Reveal variant="up-strong">
            <h2
              className="text-white font-bold mb-4"
              style={{ fontSize: "clamp(28px, 3.6vw, 42px)" }}
            >
              지금 바로 상담받아 보세요
            </h2>
          </Reveal>
          <Reveal variant="up-soft" stagger={1}>
            <p className="text-white/80 text-base mb-9">
              어르신과 가족분들의 소중한 문의를 기다립니다.
            </p>
          </Reveal>
          <Reveal variant="up-soft" stagger={2}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="tel:054-763-5988"
                className="inline-flex items-center gap-2.5 bg-white text-[var(--ink-2)] px-7 py-[18px] rounded-full font-semibold text-[15px] transition-all hover:bg-[var(--pop)] hover:text-white hover:-translate-y-px"
              >
                <Phone size={16} /> 054-763-5988
              </a>
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2.5 border-[1.5px] border-white/55 text-white px-7 py-[18px] rounded-full font-semibold text-[15px] transition-all hover:bg-white hover:text-[var(--ink-2)]"
              >
                온라인 문의 →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
