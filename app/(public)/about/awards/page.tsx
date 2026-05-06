import { Award } from "lucide-react";

const awards = [
  {
    year: "2023",
    title: "우수 재가요양기관 선정",
    org: "경상북도",
    desc: "경상북도 내 재가요양 서비스 질 향상에 기여한 우수 기관으로 선정되었습니다.",
    category: "기관선정",
  },
  {
    year: "2022",
    title: "장기요양 기관 평가 최우수",
    org: "국민건강보험공단",
    desc: "2022년도 장기요양기관 정기 평가에서 최우수 등급을 획득하였습니다.",
    category: "평가수상",
  },
  {
    year: "2021",
    title: "지역사회 공헌 우수기관 선정",
    org: "경주시",
    desc: "지역 어르신 돌봄 서비스와 지역사회 공헌 활동을 인정받아 선정되었습니다.",
    category: "기관선정",
  },
  {
    year: "2020",
    title: "노인복지 서비스 혁신 사례 발표",
    org: "경상북도 노인복지협회",
    desc: "방문요양 서비스 개선 사례가 우수 사례로 선정되어 도내 발표 기회를 얻었습니다.",
    category: "우수사례",
  },
  {
    year: "2019",
    title: "요양보호사 교육 우수 기관 선정",
    org: "경주시",
    desc: "체계적인 요양보호사 교육 및 역량 강화 프로그램 운영으로 선정되었습니다.",
    category: "기관선정",
  },
];

const categoryColors: Record<string, string> = {
  기관선정: "#1A56A0",
  평가수상: "#1A2E4A",
  우수사례: "#5A7A99",
};

export default function AwardsPage() {
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
            ABOUT US
          </p>
          <h1
            className="text-[#1A2E4A] text-4xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            수상·기관선정
          </h1>
          <p className="text-[#5A7A99] mt-3">
            신뢰로 쌓아온 수상 및 기관선정 내역
          </p>
        </div>
      </section>

      {/* 수상 목록 */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
              AWARDS & RECOGNITION
            </p>
            <h2
              className="text-[#1A2E4A] text-2xl font-bold"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              전체 수상 내역
            </h2>
          </div>

          <div className="space-y-6">
            {awards.map((award, i) => (
              <div
                key={i}
                className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-2xl p-7 flex gap-6"
              >
                {/* 사진 플레이스홀더 */}
                <div
                  className="w-28 h-28 rounded-xl border-2 border-dashed border-[#A8C4E0] flex flex-col items-center justify-center flex-shrink-0"
                  style={{ background: "#E8A02022" }}
                >
                  <Award size={24} className="text-[#1A56A0] mb-1" />
                  <span className="text-[#5A7A99] text-[10px] text-center px-1">
                    사진 교체
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[#1A56A0] text-sm font-bold">
                      {award.year}년
                    </span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full text-[#FFFFFF]"
                      style={{
                        background: categoryColors[award.category] ?? "#5A7A99",
                      }}
                    >
                      {award.category}
                    </span>
                  </div>
                  <h3
                    className="text-[#1A2E4A] font-bold text-lg mb-1"
                    style={{ fontFamily: "'Noto Serif KR', serif" }}
                  >
                    {award.title}
                  </h3>
                  <p className="text-[#1A56A0] text-sm font-medium mb-2">
                    수여: {award.org}
                  </p>
                  <p className="text-[#5A7A99] text-sm leading-relaxed">
                    {award.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
