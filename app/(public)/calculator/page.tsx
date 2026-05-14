import { unstable_cache } from "next/cache";
import { adminSupabase } from "@/lib/supabase/admin";
import { type Metadata } from "next";
import CalculatorClient from "./CalculatorClient";
import PageHero from "@/components/board/PageHero";
import SiblingNav from "@/components/common/SiblingNav";
import CtaBanner from "@/components/common/CtaBanner";

export const metadata: Metadata = {
  title: "본인부담금 계산기",
  description: "방문요양 이용 시 예상 월 본인부담금을 등급별로 미리 확인해 보세요.",
};

export const revalidate = 86400;

const getCalculatorData = unstable_cache(
  async () => {
    const [{ data: rates }, { data: limits }] = await Promise.all([
      adminSupabase
        .from("ltc_service_rates")
        .select("id, duration_minutes, price")
        .eq("service_type", "visit_care")
        .order("duration_minutes"),
      adminSupabase
        .from("ltc_grade_limits")
        .select("id, grade, monthly_limit"),
    ]);
    return { rates: rates ?? [], limits: limits ?? [] };
  },
  ["calculator-data"],
  { revalidate: 86400, tags: ["calculator-data"] },
);

export default async function CalculatorPage() {
  const { rates, limits } = await getCalculatorData();

  return (
    <>
      <PageHero
        eyebrow="CALCULATOR"
        title="본인부담금 계산기"
        lead="방문요양 이용 시 예상 월 본인부담금을 미리 확인해 보세요"
        crumbs={[
          { label: "홈", href: "/" },
          { label: "본인부담금 계산기" },
        ]}
      />

      <CalculatorClient rates={rates} limits={limits} />

      <section className="px-6 py-14">
        <div className="mx-auto max-w-[860px]">
          <SiblingNav
            prev={{ label: "인지활동서비스", desc: "치매 어르신 인지활동 프로그램", href: "/services/cognitive" }}
          />
        </div>
      </section>

      <CtaBanner
        eyebrow="CONTACT US"
        title="정확한 비용이 궁금하신가요?"
        desc="담당 복지사와 1:1 상담을 통해 정확한 본인부담금을 안내받으세요."
        primary={{ text: "상담 신청", href: "/inquiry" }}
        secondary={{ text: "☎ 054-763-5988", href: "tel:054-763-5988" }}
      />
    </>
  );
}
