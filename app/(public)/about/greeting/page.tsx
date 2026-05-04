import { Heart, Leaf, Users } from "lucide-react";

const values = [
  {
    icon: <Heart size={28} />,
    title: "사랑의 돌봄",
    desc: "어르신 한 분 한 분을 가족처럼 섬기는 마음으로, 따뜻한 돌봄을 실천합니다.",
  },
  {
    icon: <Leaf size={28} />,
    title: "전문적 서비스",
    desc: "지속적인 교육과 역량 강화를 통해 수준 높은 요양 서비스를 제공합니다.",
  },
  {
    icon: <Users size={28} />,
    title: "지역사회 연대",
    desc: "경주·안강·영천·포항 지역사회와 함께 어르신의 행복한 노후를 만들어 갑니다.",
  },
];

export default function GreetingPage() {
  return (
    <div>
      {/* 페이지 배너 */}
      <section
        style={{
          background: "linear-gradient(135deg, #FAF3D6 0%, #F0E4A8 100%)",
        }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#C4A84F] text-sm font-semibold tracking-widest mb-2">
            ABOUT US
          </p>
          <h1
            className="text-[#5C4A1E] text-4xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            인사말
          </h1>
          <p className="text-[#8C8070] mt-3">센터장 인사말씀</p>
        </div>
      </section>

      {/* 인사말 본문 */}
      <section className="bg-[#FFFDF0] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            {/* 사진 플레이스홀더 */}
            <div
              className="w-full aspect-[4/5] rounded-2xl border-2 border-dashed border-[#D9C97A] flex flex-col items-center justify-center"
              style={{ background: "#FAF3D6" }}
            >
              <Users size={48} className="text-[#C4A84F] mb-3" />
              <p className="text-[#8C8070] text-sm">센터장 사진</p>
            </div>

            {/* 인사말 텍스트 */}
            <div>
              <p
                className="text-[#C4A84F] text-sm font-semibold tracking-widest mb-3"
              >
                CENTER DIRECTOR
              </p>
              <h2
                className="text-[#5C4A1E] text-2xl font-bold mb-6 leading-snug"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                어르신의 일상을<br />
                <span className="text-[#C4A84F]">함께 섬깁니다</span>
              </h2>

              <div className="space-y-4 text-[#5C4A1E] text-[15px] leading-[1.9]">
                <p>
                  안강 섬김 노인복지센터를 찾아주셔서 진심으로 감사드립니다.
                </p>
                <p>
                  저희 센터는 경주·안강·영천·포항 지역에서 신체적·경제적·정신적으로
                  어려움을 겪고 계신 어르신들이 존엄하고 행복한 노후를 보내실 수
                  있도록 최선을 다하고 있습니다.
                </p>
                <p>
                  요양보호사 한 분 한 분이 어르신의 가정을 직접 방문하여 신체활동
                  지원부터 정서적 교류까지 정성 어린 돌봄을 실천하고 있으며,
                  매월 정기 교육을 통해 서비스의 질을 꾸준히 높여 나가고 있습니다.
                </p>
                <p>
                  어르신과 가족 여러분의 신뢰에 보답하기 위해, 앞으로도 더 나은
                  섬김의 자세로 함께하겠습니다. 감사합니다.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#D9C97A]/50">
                <p
                  className="text-[#5C4A1E] font-bold"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  안강 섬김 노인복지센터장
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="bg-[#FAF3D6] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#C4A84F] text-sm font-semibold tracking-widest mb-2">
              OUR VALUES
            </p>
            <h2
              className="text-[#5C4A1E] text-3xl font-bold"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              섬김의 가치
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-[#FFFDF0] border border-[#D9C97A]/50 rounded-2xl p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#E8D48B]/40 text-[#C4A84F] mb-5">
                  {v.icon}
                </div>
                <h3
                  className="text-[#5C4A1E] font-bold text-lg mb-3"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {v.title}
                </h3>
                <p className="text-[#8C8070] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
