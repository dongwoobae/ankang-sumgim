import { MapPin, Phone, Mail, Bus, Car, Clock } from "lucide-react";
import { type Metadata } from "next";
import KakaoMap from "@/components/KakaoMap";
import PageHero from "@/components/board/PageHero";
import SiblingNav from "@/components/common/SiblingNav";
import CtaBanner from "@/components/common/CtaBanner";

export const metadata: Metadata = {
  title: "오시는길",
  description:
    "안강 섬김 노인복지센터 위치 안내. 경상북도 경주시 안강읍 화전중앙길 53.",
  openGraph: { url: "/about/location" },
};

const contactItems = [
  {
    icon: <MapPin size={18} />,
    label: "주소",
    content: (
      <p className="font-medium" style={{ color: "var(--ink-2)" }}>
        경상북도 경주시 안강읍 화전중앙길 53
      </p>
    ),
  },
  {
    icon: <Phone size={18} />,
    label: "전화",
    content: (
      <a
        href="tel:054-763-5988"
        className="font-medium transition-colors hover:opacity-70"
        style={{ color: "var(--ink-2)" }}
      >
        054-763-5988
      </a>
    ),
  },
  {
    icon: <Mail size={18} />,
    label: "이메일",
    content: (
      <a
        href="mailto:miyeong0695@daum.net"
        className="font-medium transition-colors hover:opacity-70"
        style={{ color: "var(--ink-2)" }}
      >
        miyeong0695@daum.net
      </a>
    ),
  },
  {
    icon: <Clock size={18} />,
    label: "운영시간",
    content: (
      <>
        <p className="font-medium" style={{ color: "var(--ink-2)" }}>
          평일 09:00 – 18:00
        </p>
        <p className="font-medium" style={{ color: "var(--ink-2)" }}>
          토요일 09:00 – 14:00
        </p>
      </>
    ),
  },
];

const transportInfo = [
  {
    icon: <Bus size={20} />,
    title: "버스 이용",
    items: [
      "안강버스터미널 하차 후 도보 약 10분",
      "경주·포항·영천 방면 시외버스 이용 가능",
    ],
  },
  {
    icon: <Car size={20} />,
    title: "자동차 이용",
    items: [
      "네비게이션: 경상북도 경주시 안강읍 화전중앙길 53",
      "경주IC → 안강 방면 20분",
      "포항IC → 안강 방면 25분",
    ],
  },
];

export default function LocationPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT US"
        title="오시는길"
        lead="찾아오시는 방법을 안내해 드립니다"
        crumbs={[
          { label: "홈", href: "/" },
          { label: "센터소개" },
          { label: "오시는길" },
        ]}
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          {/* 지도 — 16:6 비율 */}
          <div
            className="relative mb-12 w-full overflow-hidden rounded-2xl border"
            style={{ aspectRatio: "16/6", borderColor: "var(--line)" }}
          >
            <div className="absolute inset-0">
              <KakaoMap />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* 연락처 정보 */}
            <div>
              <h2
                className="mb-6 text-xl font-bold"
                style={{ color: "var(--ink-2)" }}
              >
                연락처 정보
              </h2>
              <ul className="space-y-5">
                {contactItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span
                      className="mt-0.5 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white"
                      style={{ background: "var(--pop)" }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <p
                        className="mb-0.5 text-xs"
                        style={{ color: "var(--muted)" }}
                      >
                        {item.label}
                      </p>
                      {item.content}
                    </div>
                  </li>
                ))}
              </ul>

              {/* 모바일 바로가기 버튼 */}
              <div className="mt-7 flex gap-2.5">
                <a
                  href="tel:054-763-5988"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-white transition-opacity hover:opacity-80"
                  style={{ background: "var(--pop)" }}
                >
                  <Phone size={15} />
                  전화하기
                </a>
                <a
                  href="https://map.kakao.com/link/search/경상북도 경주시 안강읍 화전중앙길 53"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border py-3 text-sm font-bold transition-colors hover:bg-paper-3"
                  style={{ borderColor: "var(--line)", color: "var(--ink-2)" }}
                >
                  <MapPin size={15} />
                  지도 보기
                </a>
              </div>
            </div>

            {/* 교통 안내 */}
            <div>
              <h2
                className="mb-6 text-xl font-bold"
                style={{ color: "var(--ink-2)" }}
              >
                교통 안내
              </h2>
              <div className="space-y-4">
                {transportInfo.map((t, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-5"
                    style={{
                      background: "var(--paper-2)",
                      borderColor: "var(--line)",
                    }}
                  >
                    <div
                      className="mb-3 flex items-center gap-2 font-bold"
                      style={{ color: "var(--pop)" }}
                    >
                      {t.icon}
                      {t.title}
                    </div>
                    <ul className="space-y-1.5">
                      {t.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "var(--ink-2)" }}
                        >
                          <span
                            className="mt-2 h-1 w-1 flex-shrink-0 rounded-full"
                            style={{ background: "var(--pop)" }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-[1200px]">
          <SiblingNav
            prev={{ label: "수상·기관선정", desc: "신뢰로 쌓아온 내역", href: "/about/awards" }}
          />
        </div>
      </section>

      <CtaBanner
        eyebrow="NEED HELP?"
        title="저희 센터가 궁금하신가요?"
        desc="전화 또는 온라인으로 언제든 문의해 주세요. 정성껏 답변드립니다."
        primary={{ text: "상담 신청", href: "/inquiry" }}
        secondary={{ text: "☎ 054-763-5988", href: "tel:054-763-5988" }}
      />
    </>
  );
}
