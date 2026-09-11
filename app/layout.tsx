import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { OPEN_GRAPH_DEFAULTS, SITE_JSON_LD, SITE_NAME, SITE_URL } from "@/lib/seo";

const GOOGLE_ANALYTICS_ID = "G-PYKNSKMXVH";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
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
    ...OPEN_GRAPH_DEFAULTS,
    title: SITE_NAME,
    description:
      "어르신 한 분 한 분을 소중히 섬기는 안강 섬김 노인복지센터입니다. 경주·안강·영천·포항 전역 방문요양서비스 제공.",
  },
  // title·description·image를 지정하면 모든 하위 페이지가 이 값을 물려받는다. 비워 두면 X는 og 태그를 쓴다.
  twitter: { card: "summary_large_image" },
  verification: {
    google: "uHLCbH46M0caurPjbFHsTV226bUAHaWTLL1zdj7UOoM",
    other: {
      "naver-site-verification": ["18d6c98f6e34ba9a90cad4a65efd749747520b99"],
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SITE_JSON_LD).replace(/</g, "\\u003c"),
          }}
        />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
