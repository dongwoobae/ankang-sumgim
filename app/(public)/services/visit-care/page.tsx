import Link from "next/link";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import ServiceProcess from "@/components/ServiceProcess";
import ServicePhotoCarousel from "@/components/ServicePhotoCarousel";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "방문요양서비스",
  description:
    "요양보호사가 가정을 직접 방문하여 신체활동·가사활동·정서지원 서비스를 제공합니다. 목욕차 2대 보유.",
  openGraph: { url: "/services/visit-care" },
};

const highlights = [
  {
    title: "목욕차 보유",
    value: "2대",
    desc: "지역 최다 보유 — 빠른 배차 가능",
  },
  { title: "서비스 지역", value: "4개 시군", desc: "경주·안강·영천·포항 전역" },
  { title: "요양사 교육", value: "월 1회", desc: "정기 역량 강화 교육 실시" },
];

const visitCareProcess = (
  <ServiceProcess
    title="방문요양 서비스 이용 절차"
    steps={[
      {
        iconKey: "inquiry",
        title: "상담 문의",
        desc: "전화·온라인으로 서비스 내용 및 비용 상담",
      },
      {
        iconKey: "gradeApply",
        title: "등급신청",
        desc: "건강보험공단에 장기요양인정 신청서 제출",
      },
      {
        iconKey: "visitCheck",
        title: "공단 방문조사",
        desc: "공단 직원이 가정을 방문하여 심신 상태 조사",
      },
      {
        iconKey: "gradeJudgment",
        title: "등급판정",
        desc: "판정위원회 심사 후 1~5등급 결정 (2~4주)",
      },
      {
        iconKey: "contract",
        title: "계약 체결",
        desc: "센터 방문 상담 후 서비스 계획서 작성 및 계약",
      },
      {
        iconKey: "serviceStart",
        title: "서비스 시작",
        desc: "담당 요양보호사 배정 후 가정 방문 돌봄 시작",
      },
    ]}
  />
);

export default function VisitCarePage() {
  return (
    <div>
      {/* 페이지 배너 */}
      <section
        style={{
          background: "linear-gradient(135deg, #EEF4FB 0%, #F0E4A8 100%)",
        }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
            SERVICES
          </p>
          <h1
            className="text-[#1A2E4A] text-4xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            방문요양서비스
          </h1>
          <p className="text-[#5A7A99] mt-3">
            가정을 직접 방문하여 정성껏 돌봄을 제공합니다
          </p>
        </div>
      </section>

      {/* 핵심 수치 */}
      <section className="bg-[#1A2E4A]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {highlights.map((h, i) => (
              <div key={i} className="text-center">
                <p className="text-[#5A7A99] text-xs tracking-widest mb-1">
                  {h.title}
                </p>
                <p
                  className="text-[#E8A020] text-3xl font-bold mb-1"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {h.value}
                </p>
                <p className="text-[#5A7A99] text-xs">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 소개 */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* 상단: 설명 텍스트 + 이용 자격 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start mb-14">
            <div>
              <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
                WHAT WE DO
              </p>
              <h2
                className="text-[#1A2E4A] text-2xl font-bold mb-5"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                방문요양서비스란?
              </h2>
              <p className="text-[#1A2E4A] text-[15px] leading-[1.9] mb-4">
                장기요양 1~5등급 판정을 받은 어르신의 가정에 요양보호사가 직접
                방문하여 신체활동 및 가사활동을 지원하는 재가급여 서비스입니다.
              </p>
              <p className="text-[#1A2E4A] text-[15px] leading-[1.9]">
                안강 섬김 노인복지센터는 어르신의 상태에 맞게 1회 방문 시 다양한
                시간으로 돌봄을 제공하며, 경주·안강·영천·포항 전역에서 서비스를
                운영하고 있습니다.
              </p>
            </div>

            <div className="p-5 bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl">
              <p className="text-[#1A2E4A] font-bold text-sm mb-3">
                이용 자격
              </p>
              <ul className="space-y-2">
                {[
                  "장기요양인정서를 받은 1~5등급 수급자",
                  "인지지원등급 수급자 (일부 서비스 제한)",
                  "의사소견서 제출 완료자",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-[#1A2E4A] text-sm"
                  >
                    <CheckCircle
                      size={13}
                      className="text-[#1A56A0] flex-shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 하단: 캐러셀 (탭 + 사진 + 서비스 태그) */}
          <ServicePhotoCarousel />
        </div>
      </section>

      {visitCareProcess}
    </div>
  );
}
