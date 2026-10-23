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
    "어르신 한 분 한 분을 소중히 섬기는 경주 안강의 섬김노인복지센터입니다. 경주·안강·영천·포항 전역 방문요양서비스 제공.",
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
      "어르신 한 분 한 분을 소중히 섬기는 경주 안강의 섬김노인복지센터입니다. 경주·안강·영천·포항 전역 방문요양서비스 제공.",
  },
  // title·description·image를 지정하면 모든 하위 페이지가 이 값을 물려받는다. 비워 두면 X는 og 태그를 쓴다.
  twitter: { card: "summary_large_image" },
  verification: {
    google: "uHLCbH46M0caurPjbFHsTV226bUAHaWTLL1zdj7UOoM",
    other: {
      "naver-site-verification": ["9064dba2a6f50ed563ffeb5f9b3d68f8eabc647b"],
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      // 페이지 이동 때 Next는 scrollTop을 0으로 넣고 곧바로 새 페이지가 보이는지 확인한다.
      // globals.css의 smooth 스크롤이 그 0을 애니메이션으로 바꾸면 확인 시점에는 아직 아래라,
      // 본문 첫 요소로 scrollIntoView해 고정 헤더 높이만큼 내려간 곳에 멈춘다.
      // 이 속성이 이동 중에만 smooth를 끈다 — Next 16부터 기본으로는 끄지 않는다.
      data-scroll-behavior="smooth"
    >
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
