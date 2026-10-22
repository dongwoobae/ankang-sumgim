// 지역 안내 페이지(/area/*)와 그 링크를 싣는 헤더·푸터·사이트맵이 같은 목록을 본다.
// 지역마다 실제로 다른 내용이 있을 때만 여기에 넣는다 — docs/specs/area-pages.md

export type NhisBranch = {
  name: string;
  center: string;
  jurisdiction: string;
  address: string;
  url: string;
};

export type ServiceArea = {
  slug: string;
  name: string;
  city: string;
  branches: NhisBranch[];
};

export const NHIS_CHECKED_AT = "2026년 10월";

export const SERVICE_AREAS = [
  {
    slug: "gyeongju",
    name: "경주",
    city: "경주시",
    branches: [
      {
        name: "국민건강보험공단 경주지사",
        center: "노인장기요양보험 경주운영센터",
        jurisdiction: "경주시",
        address: "경상북도 경주시 태종로 426",
        url: "https://www.nhis.or.kr/nhis/about/wbhaff67200m01.do",
      },
    ],
  },
  {
    slug: "pohang",
    name: "포항",
    city: "포항시",
    branches: [
      {
        name: "국민건강보험공단 포항남부지사",
        center: "노인장기요양보험 포항남부운영센터",
        jurisdiction: "포항시 남구",
        address: "경상북도 포항시 남구 희망대로 833",
        url: "https://www.nhis.or.kr/nhis/about/wbhaff70800m01.do",
      },
      {
        name: "국민건강보험공단 포항북부지사",
        center: "노인장기요양보험 포항북부운영센터",
        jurisdiction: "포항시 북구",
        address: "경상북도 포항시 북구 삼호로8번길 4",
        url: "https://www.nhis.or.kr/nhis/about/wbhaff71000m01.do",
      },
    ],
  },
] as const satisfies readonly ServiceArea[];

export type ServiceAreaSlug = (typeof SERVICE_AREAS)[number]["slug"];

export function getServiceArea(slug: ServiceAreaSlug): ServiceArea {
  return SERVICE_AREAS.find((a) => a.slug === slug)!;
}

// 영천이 빠진 이유는 docs/specs/visit-bath.md
export const BATH_CAR_AREAS = "경주·포항·안강";
