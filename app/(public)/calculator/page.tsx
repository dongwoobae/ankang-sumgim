import { createClient } from "@/lib/supabase/server";
import CalculatorClient from "./CalculatorClient";

export const metadata = {
  title: "본인부담금 계산기 | 안강 섬김 노인복지센터",
  description: "방문요양 이용 시 예상 월 본인부담금을 등급별로 미리 확인해 보세요.",
};

export default async function CalculatorPage() {
  const supabase = await createClient();

  const [{ data: rates }, { data: limits }] = await Promise.all([
    supabase
      .from("ltc_service_rates")
      .select("id, duration_minutes, price")
      .eq("service_type", "visit_care")
      .order("duration_minutes"),
    supabase
      .from("ltc_grade_limits")
      .select("id, grade, monthly_limit"),
  ]);

  return <CalculatorClient rates={rates ?? []} limits={limits ?? []} />;
}
