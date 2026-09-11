import type { Metadata } from "next";

export const SITE_NAME = "안강 섬김 노인복지센터";

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

// 주소·전화·운영시간은 Footer, 오시는길, 상담문의 화면에도 하드코딩돼 있다. 바뀌면 함께 고친다.
export const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/` },
    {
      "@type": "LocalBusiness",
      name: SITE_NAME,
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
