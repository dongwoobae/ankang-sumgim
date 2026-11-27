import { describe, expect, it } from "vitest";
import { checkVisitCare, estimateCopay } from "@/lib/calculator";

describe("checkVisitCare", () => {
  it.each([
    // 인지지원등급은 시간·횟수를 고르기 전부터 막는다
    ["cognitive_support", null, NaN, { status: "blocked", reason: "cognitive-support" }],
    ["cognitive_support", 60, 10, { status: "blocked", reason: "cognitive-support" }],

    // 3·4등급 210분 이상은 월 4회까지만 계산한다
    ["3", 210, NaN, { status: "conditional", reason: "long-visit-request" }],
    ["3", 240, 4, { status: "conditional", reason: "long-visit-request" }],
    ["4", 210, 4, { status: "conditional", reason: "long-visit-request" }],
    ["3", 240, 5, { status: "blocked", reason: "long-visit-over-limit" }],
    ["3", 240, 31, { status: "blocked", reason: "long-visit-over-limit" }],
    ["4", 210, 5, { status: "blocked", reason: "long-visit-over-limit" }],
    ["3", 180, 31, { status: "ok" }],
    ["4", 180, 31, { status: "ok" }],

    // 1·2등급은 240분도 매일 계산한다
    ["1", 240, 31, { status: "ok" }],
    ["2", 210, 31, { status: "ok" }],

    // 5등급은 인지활동형(120~180분)만 계산한다
    ["5", null, NaN, { status: "ok" }],
    ["5", 120, 20, { status: "conditional", reason: "grade5-cognitive-activity" }],
    ["5", 180, 20, { status: "conditional", reason: "grade5-cognitive-activity" }],
    ["5", 90, 20, { status: "blocked", reason: "grade5-general" }],
    ["5", 210, 4, { status: "blocked", reason: "grade5-general" }],
  ])("%s등급 %s분 %s회", (grade, duration, visits, want) => {
    expect(checkVisitCare(grade, duration, visits)).toEqual(want);
  });
});

describe("estimateCopay", () => {
  it("한도 안은 15%만, 한도 초과분은 전액을 본인부담에 더한다", () => {
    // 70,080원 × 31회 = 2,172,480원, 3등급 한도 1,528,200원
    expect(estimateCopay(70080, 31, 1528200)).toEqual({
      totalCost: 2172480,
      covered: 1528200,
      excess: 644280,
      oop15: 229230,
      totalOop: 873510,
    });
  });

  it("한도 안이면 초과분이 없다", () => {
    expect(estimateCopay(43430, 20, 1208900)).toEqual({
      totalCost: 868600,
      covered: 868600,
      excess: 0,
      oop15: 130290,
      totalOop: 130290,
    });
  });
});
