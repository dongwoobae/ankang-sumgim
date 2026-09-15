import type { Metadata } from "next";

// 네이버 플레이스 등록명과 글자·띄어쓰기까지 같아야 검색엔진이 같은 기관으로 잇는다.
export const SITE_NAME = "섬김노인복지센터";

// 띄어 쓴 표기와 2026-09-15 이전 사이트명. 동명 기관이 전국에 있어 지역이 붙은 옛 이름으로 쌓인 검색어를 잃지 않으려고 남긴다.
const SITE_ALTERNATE_NAMES = ["섬김 노인복지센터", "안강 섬김 노인복지센터"];

// 운영의 NEXT_PUBLIC_SITE_URL은 끝에 "/"가 붙어 있어, 경로를 그대로 이어 붙이면 "//"가 된다.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sumgim-welfare.com"
).replace(/\/+$/, "");

export const OPEN_GRAPH_DEFAULTS = {
  type: "website",
  locale: "ko_KR",
  siteName: SITE_NAME,
  images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: SITE_NAME }],
} satisfies Metadata["openGraph"];

// 사이트명·주소·전화·운영시간은 여러 화면과 알림 이메일·문자에도 하드코딩돼 있다.
// 바꿀 때 rg -n "섬김노인복지센터|054-763-5988|화전중앙길|09:00" 로 함께 찾는다.
export const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      url: `${SITE_URL}/`,
    },
    {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/og-image.jpg`,
      telephone: "+82-54-763-5988",
      email: "miyeong0695@daum.net",
      address: {
        "@type": "PostalAddress",
        streetAddress: "안강읍 화전중앙길 53",
        addressLocality: "경주시",
        addressRegion: "경상북도",
        addressCountry: "KR",
      },
      areaServed: ["경주시", "영천시", "포항시"],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "14:00",
        },
      ],
    },
  ],
};

// Next는 openGraph를 세그먼트 사이에서 병합하지 않고 통째로 대체한다.
// 페이지가 og:url 하나만 지정해도 루트의 og:image가 사라지므로 공통 필드를 매번 다시 싣는다.
export function pageMetadata(
  path: string,
  { title, description }: { title: NonNullable<Metadata["title"]>; description: string },
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...OPEN_GRAPH_DEFAULTS, url: path },
  };
}
