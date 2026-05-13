import { adminSupabase } from "@/lib/supabase/admin";
import Image from "next/image";
import { Award } from "lucide-react";
import { type Metadata } from "next";
import PageHero from "@/components/board/PageHero";
import SiblingNav from "@/components/common/SiblingNav";
import CtaBanner from "@/components/common/CtaBanner";

export const metadata: Metadata = {
  title: "수상·기관선정",
  description:
    "안강 섬김 노인복지센터 수상 및 기관 선정 내역. 공신력 있는 기관이 인정한 서비스 품질.",
  openGraph: { url: "/about/awards" },
};

async function getAwards() {
  const { data } = await adminSupabase
    .from("awards")
    .select("id, title, org, description, awarded_at, image_url")
    .order("awarded_at", { ascending: false });
  return data ?? [];
}

export const revalidate = 60;

const YEAR_FILTERS = ["전체", "2026", "2025", "2024 이전"];

export default async function AwardsPage() {
  const awards = await getAwards();

  return (
    <>
      <PageHero
        eyebrow="ABOUT US"
        title="수상·기관선정"
        lead="신뢰로 쌓아온 수상 및 기관선정 내역"
        crumbs={[
          { label: "홈", href: "/" },
          { label: "센터소개" },
          { label: "수상·기관선정" },
        ]}
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[860px]">
          {/* 섹션 헤더 */}
          <div className="mb-8">
            <div
              className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: "var(--pop)" }}
            >
              AWARDS & RECOGNITION
            </div>
            <h2
              className="text-[28px] font-extrabold"
              style={{ color: "var(--ink-2)" }}
            >
              전체 수상 내역
            </h2>
          </div>

          {/* 연도 필터 칩 (마크업 전용) */}
          <div className="mb-10 flex flex-wrap gap-2">
            {YEAR_FILTERS.map((y, i) => (
              <button
                key={y}
                type="button"
                className="rounded-full border px-4 py-1.5 text-sm font-medium transition-colors"
                style={
                  i === 0
                    ? {
                        background: "var(--pop)",
                        borderColor: "var(--pop)",
                        color: "white",
                      }
                    : {
                        background: "white",
                        borderColor: "var(--line)",
                        color: "var(--ink-2)",
                      }
                }
              >
                {y}
              </button>
            ))}
          </div>

          {/* 수상 목록 */}
          {awards.length === 0 ? (
            <p
              className="py-16 text-center text-sm"
              style={{ color: "var(--muted)" }}
            >
              등록된 수상 내역이 없습니다.
            </p>
          ) : (
            <div className="space-y-5">
              {awards.map((award) => (
                <div
                  key={award.id}
                  className="flex gap-6 rounded-2xl border p-7"
                  style={{
                    background: "var(--paper-2)",
                    borderColor: "var(--line)",
                  }}
                >
                  {/* 사진 */}
                  <div
                    className="flex h-28 w-28 flex-shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl border"
                    style={{
                      background: "var(--paper-2)",
                      borderColor: "var(--line)",
                    }}
                  >
                    {award.image_url ? (
                      <Image
                        src={award.image_url}
                        alt={award.title}
                        width={112}
                        height={112}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <>
                        <Award size={24} style={{ color: "var(--pop)" }} className="mb-1" />
                        <span
                          className="text-[10px]"
                          style={{ color: "var(--muted)" }}
                        >
                          사진 없음
                        </span>
                      </>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className="mb-1 text-sm font-bold"
                      style={{ color: "var(--pop)" }}
                    >
                      {new Date(award.awarded_at).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h3
                      className="mb-1 text-lg font-bold"
                      style={{ color: "var(--ink-2)" }}
                    >
                      {award.title}
                    </h3>
                    <p
                      className="mb-2 text-sm font-medium"
                      style={{ color: "var(--pop)" }}
                    >
                      수여: {award.org}
                    </p>
                    {award.description && (
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--muted)" }}
                      >
                        {award.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-[860px]">
          <SiblingNav
            prev={{ label: "인사말", desc: "센터장 인사말씀", href: "/about/greeting" }}
            next={{ label: "오시는길", desc: "센터 위치 및 교통편", href: "/about/location" }}
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
