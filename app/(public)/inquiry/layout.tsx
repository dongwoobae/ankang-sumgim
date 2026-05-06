// app/(public)/inquiry/layout.tsx
// inquiry/page.tsx는 "use client"라 metadata를 직접 export할 수 없어
// 별도 layout.tsx에서 선언

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "상담문의",
  description:
    "방문요양, 가족요양, 인지활동서비스 등 궁금한 점을 온라인으로 문의하세요. 영업일 기준 1~2일 내 답변드립니다.",
  openGraph: { url: "/inquiry" },
};

export default function InquiryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
