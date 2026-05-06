// app/layout.tsx
// 기존 파일에서 metadata export 부분만 아래로 교체

import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans-kr",
});

const notoSerifKR = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif-kr",
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "안강 섬김 노인복지센터",
    template: "%s | 안강 섬김 노인복지센터",
  },
  description:
    "어르신 한 분 한 분을 소중히 섬기는 안강 섬김 노인복지센터입니다. 경주·안강·영천·포항 전역 방문요양서비스 제공.",
  keywords: [
    "방문요양",
    "노인복지",
    "노인장기요양보험",
    "요양보호사",
    "안강",
    "경주",
    "영천",
    "포항",
    "인지활동서비스",
    "가족요양",
    "재가요양",
    "등급신청",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "안강 섬김 노인복지센터",
    title: "안강 섬김 노인복지센터",
    description:
      "어르신 한 분 한 분을 소중히 섬기는 안강 섬김 노인복지센터입니다. 경주·안강·영천·포항 전역 방문요양서비스 제공.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "안강 섬김 노인복지센터",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "안강 섬김 노인복지센터",
    description:
      "어르신 한 분 한 분을 소중히 섬기는 안강 섬김 노인복지센터입니다.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKR.variable} ${notoSerifKR.variable} ${notoSansKR.className}`}
      >
        {children}
      </body>
    </html>
  );
}
