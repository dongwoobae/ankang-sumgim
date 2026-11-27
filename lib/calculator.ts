// 등급별 제한의 근거는 보건복지부고시 「장기요양급여 제공기준 및 급여비용 산정방법 등에 관한
// 고시」(제2026-189호, 2026-10-01 시행)다. 고시가 개정되면 아래 조항부터 다시 대조한다.

export type VisitCareCheck =
  | { status: "ok" }
  | { status: "conditional"; reason: "long-visit-request" | "grade5-cognitive-activity" }
  | { status: "blocked"; reason: "cognitive-support" | "grade5-general" | "long-visit-over-limit" };

export function checkVisitCare(
  grade: string,
  durationMinutes: number | null,
  visits: number,
): VisitCareCheck {
  // 제2조 제3항: 방문요양은 가족휴가제 종일 방문요양으로만 이용할 수 있다.
  if (grade === "cognitive_support") return { status: "blocked", reason: "cognitive-support" };
  if (durationMinutes === null) return { status: "ok" };

  // 제17조 제5항·제7항: 일반 방문요양은 받을 수 없고 인지활동형(1회 120~180분)만 받는다.
  if (grade === "5") {
    return durationMinutes >= 120 && durationMinutes <= 180
      ? { status: "conditional", reason: "grade5-cognitive-activity" }
      : { status: "blocked", reason: "grade5-general" };
  }

  // 제19조 제4항: 210분 이상 연속 이용은 특별한 요청이 있을 때 월 4일까지다.
  if ((grade === "3" || grade === "4") && durationMinutes >= 210) {
    return visits > 4
      ? { status: "blocked", reason: "long-visit-over-limit" }
      : { status: "conditional", reason: "long-visit-request" };
  }

  return { status: "ok" };
}

export function estimateCopay(price: number, visits: number, monthlyLimit: number) {
  const totalCost = price * visits;
  const covered = Math.min(totalCost, monthlyLimit);
  const excess = Math.max(0, totalCost - monthlyLimit);
  const oop15 = Math.round(covered * 0.15);
  return { totalCost, covered, excess, oop15, totalOop: oop15 + excess };
}
