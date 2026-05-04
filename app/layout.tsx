import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButton from "@/components/layout/FloatingButton";

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

export const metadata: Metadata = {
  title: "안강 섬김 노인복지센터",
  description:
    "어르신 한 분 한 분을 소중히 섬기는 안강 섬김 노인복지센터입니다. 경주·안강·영천·포항 전역 방문요양서비스.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKR.variable} ${notoSerifKR.variable} ${notoSansKR.className} bg-[#FFFDF0] text-[#5C4A1E]`}
      >
        <Header />
        <main className="pt-[108px] min-h-screen">{children}</main>
        <Footer />
        <FloatingButton />
      </body>
    </html>
  );
}
