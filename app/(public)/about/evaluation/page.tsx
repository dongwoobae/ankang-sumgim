import { CheckCircle, Star } from "lucide-react";

const evaluations = [
  {
    year: "2023",
    agency: "국민건강보험공단",
    category: "재가 방문요양 기관 평가",
    grade: "A등급",
    score: "91.2점",
    remark: "서비스 질·인력·안전 부문 우수",
  },
  {
    year: "2021",
    agency: "국민건강보험공단",
    category: "재가 방문요양 기관 평가",
    grade: "A등급",
    score: "88.7점",
    remark: "이용자 만족도 부문 최우수",
  },
  {
    year: "2019",
    agency: "국민건강보험공단",
    category: "재가 방문요양 기관 평가",
    grade: "B등급",
    score: "82.4점",
    remark: "서비스 개선 이후 지속 성장",
  },
];

const categories = [
  {
    title: "기관 운영",
    items: ["인력 기준 충족", "시설·장비 관리", "안전 관리 체계", "행정 투명성"],
  },
  {
    title: "서비스 제공",
    items: ["서비스 계획 수립", "급여 제공 과정", "서비스 기록 관리", "권리 보호"],
  },
  {
    title: "이용자 만족",
    items: ["만족도 조사 실시", "불만·고충 처리", "가족 연계 소통", "지속적 개선"],
  },
];

export default function EvaluationPage() {
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
            평가정보
          </h1>
          <p className="text-[#5A7A99] mt-3">기관 평가 현황 및 결과를 공개합니다</p>
        </div>
      </section>

      {/* 평가 결과 테이블 */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
              EVALUATION RESULTS
            </p>
            <h2
              className="text-[#1A2E4A] text-2xl font-bold"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              장기요양기관 평가 결과
            </h2>
            <p className="text-[#5A7A99] text-sm mt-2">
              국민건강보험공단에서 2년마다 실시하는 장기요양기관 정기 평가 결과입니다.
            </p>
          </div>

          {/* 데스크탑 테이블 */}
          <div className="hidden md:block rounded-2xl overflow-hidden border border-[#A8C4E0]/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1A2E4A] text-[#2E6DB4]">
                  <th className="py-4 px-6 text-left font-semibold">평가연도</th>
                  <th className="py-4 px-6 text-left font-semibold">평가기관</th>
                  <th className="py-4 px-6 text-left font-semibold">평가유형</th>
                  <th className="py-4 px-6 text-center font-semibold">등급</th>
                  <th className="py-4 px-6 text-center font-semibold">점수</th>
                  <th className="py-4 px-6 text-left font-semibold">비고</th>
                </tr>
              </thead>
              <tbody>
                {evaluations.map((e, i) => (
                  <tr
                    key={i}
                    className={`border-t border-[#A8C4E0]/30 ${
                      i % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#EEF4FB]"
                    }`}
                  >
                    <td className="py-4 px-6 font-bold text-[#1A2E4A]">{e.year}년</td>
                    <td className="py-4 px-6 text-[#1A2E4A]">{e.agency}</td>
                    <td className="py-4 px-6 text-[#1A2E4A]">{e.category}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 bg-[#2E6DB4]/50 text-[#1A2E4A] font-bold px-3 py-1 rounded-full text-xs border border-[#A8C4E0]">
                        <Star size={11} className="text-[#1A56A0]" />
                        {e.grade}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-[#1A56A0] font-bold">
                      {e.score}
                    </td>
                    <td className="py-4 px-6 text-[#5A7A99]">{e.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 모바일 카드 */}
          <div className="md:hidden space-y-4">
            {evaluations.map((e, i) => (
              <div
                key={i}
                className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#1A2E4A] font-bold">{e.year}년</span>
                  <span className="inline-flex items-center gap-1 bg-[#2E6DB4]/50 text-[#1A2E4A] font-bold px-3 py-1 rounded-full text-xs border border-[#A8C4E0]">
                    <Star size={11} className="text-[#1A56A0]" />
                    {e.grade}
                  </span>
                </div>
                <p className="text-[#1A2E4A] text-sm mb-1">{e.category}</p>
                <p className="text-[#1A56A0] font-bold text-sm mb-2">{e.score}</p>
                <p className="text-[#5A7A99] text-xs">{e.remark}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 평가 영역 */}
      <section className="bg-[#EEF4FB] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 text-center">
            <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
              EVALUATION AREAS
            </p>
            <h2
              className="text-[#1A2E4A] text-2xl font-bold"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              평가 주요 영역
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-2xl p-6"
              >
                <h3
                  className="text-[#1A2E4A] font-bold mb-4"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {cat.title}
                </h3>
                <ul className="space-y-2">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-[#1A2E4A] text-sm">
                      <CheckCircle size={14} className="text-[#1A56A0] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
