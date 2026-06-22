import type { Metadata } from "next";
import RecruitForm from "./RecruitForm";

export const metadata: Metadata = {
  title: "요양보호사 구인 | 안강 섬김 노인복지센터",
  description:
    "안강 섬김 노인복지센터는 따뜻한 돌봄을 함께할 요양보호사를 상시 모집합니다. 전화 또는 카카오톡으로 편하게 문의해 주세요.",
};

export default function RecruitPage() {
  return <RecruitForm />;
}
