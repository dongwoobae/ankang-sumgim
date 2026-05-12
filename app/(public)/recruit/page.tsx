import { notFound } from "next/navigation";

// 재오픈 시: notFound() 제거 후 아래 두 줄 활성화
// import RecruitForm from "./RecruitForm";
// export default function RecruitPage() { return <RecruitForm />; }

export default function RecruitPage() {
  notFound();
}
