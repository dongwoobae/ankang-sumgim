import { User } from "lucide-react";

const staff = [
  {
    name: "센터장",
    position: "센터장",
    duty: "기관 대·내외 업무 총괄",
    color: "#C4A84F",
  },
  {
    name: "사회복지사",
    position: "사회복지사",
    duty: "사례관리 및 서비스 기획",
    color: "#8C8070",
  },
  {
    name: "사회복지사",
    position: "사회복지사",
    duty: "이용자 상담 및 연계",
    color: "#8C8070",
  },
  {
    name: "사회복지사",
    position: "사회복지사",
    duty: "방문요양 서비스 관리",
    color: "#8C8070",
  },
  {
    name: "요양보호사",
    position: "요양보호사 (대표)",
    duty: "가정 방문 신체활동 지원",
    color: "#5C4A1E",
  },
];

const teams = [
  {
    name: "센터 운영팀",
    members: ["센터장", "행정 담당"],
    desc: "센터 전반 운영 및 대외 업무를 담당합니다.",
  },
  {
    name: "요양 서비스팀",
    members: ["사회복지사 3명", "요양보호사 다수"],
    desc: "방문요양·가족요양·인지활동 서비스를 직접 제공합니다.",
  },
  {
    name: "상담·연계팀",
    members: ["사회복지사 2명"],
    desc: "이용자 상담, 등급 신청 안내, 지역사회 자원 연계를 담당합니다.",
  },
];

export default function StaffPage() {
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
            직원소개
          </h1>
          <p className="text-[#8C8070] mt-3">섬김의 사람들을 소개합니다</p>
        </div>
      </section>

      {/* 직원 카드 */}
      <section className="bg-[#FFFDF0] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="text-[#C4A84F] text-sm font-semibold tracking-widest mb-2">
              OUR TEAM
            </p>
            <h2
              className="text-[#5C4A1E] text-3xl font-bold"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              함께하는 사람들
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {staff.map((s, i) => (
              <div
                key={i}
                className="bg-[#FAF3D6] border border-[#D9C97A]/50 rounded-2xl p-5 flex flex-col items-center text-center"
              >
                <div
                  className="w-20 h-20 rounded-full border-2 border-dashed border-[#D9C97A] flex flex-col items-center justify-center mb-4"
                  style={{ background: "#E8D48B22" }}
                >
                  <User size={28} className="text-[#C4A84F]" />
                </div>
                <p
                  className="text-[#5C4A1E] font-bold text-sm mb-1"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {s.position}
                </p>
                <p className="text-[#8C8070] text-xs leading-relaxed">{s.duty}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-[#8C8070] text-sm mt-6">
            * 실제 직원 사진 및 정보는 순차적으로 업데이트됩니다.
          </p>
        </div>
      </section>

      {/* 팀 구성 */}
      <section className="bg-[#FAF3D6] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="text-[#C4A84F] text-sm font-semibold tracking-widest mb-2">
              ORGANIZATION
            </p>
            <h2
              className="text-[#5C4A1E] text-3xl font-bold"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              팀 구성
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teams.map((team, i) => (
              <div
                key={i}
                className="bg-[#FFFDF0] border border-[#D9C97A]/50 rounded-2xl p-7"
              >
                <h3
                  className="text-[#5C4A1E] font-bold text-lg mb-3"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {team.name}
                </h3>
                <p className="text-[#8C8070] text-sm leading-relaxed mb-4">
                  {team.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {team.members.map((m, j) => (
                    <span
                      key={j}
                      className="text-xs bg-[#E8D48B]/40 text-[#5C4A1E] px-3 py-1 rounded-full border border-[#D9C97A]/60"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
