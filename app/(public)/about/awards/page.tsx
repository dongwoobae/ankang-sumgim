import { adminSupabase } from "@/lib/supabase/admin";
import { type Metadata } from "next";
import PageHero from "@/components/board/PageHero";
import SiblingNav from "@/components/common/SiblingNav";
import CtaBanner from "@/components/common/CtaBanner";
import AwardsList from "./AwardsList";

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

          <AwardsList awards={awards} />
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-[860px]">
          <SiblingNav
            prev={{ label: "오시는길", desc: "찾아오시는 방법", href: "/about/location" }}
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
