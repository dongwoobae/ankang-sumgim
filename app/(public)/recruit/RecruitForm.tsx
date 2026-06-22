import { Award, Briefcase, CheckCircle2, Clock, HeartHandshake, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import SiblingNav from "@/components/common/SiblingNav";

const recruitInfo = [
  {
    icon: Briefcase,
    label: "모집 직종",
    value: "요양보호사",
  },
  {
    icon: MapPin,
    label: "근무 지역",
    value: "경주시 안강읍 및 인근 지역",
  },
  {
    icon: Award,
    label: "필요 자격",
    value: "요양보호사 자격증 소지자",
  },
  {
    icon: Clock,
    label: "근무 형태",
    value: "방문 일정에 따라 협의",
  },
];

const preferredPoints = [
  "어르신을 공경하는 마음으로 돌봄을 실천하실 분",
  "방문요양 업무를 성실하게 이어가실 분",
  "경력자뿐 아니라 새롭게 시작하려는 분도 환영합니다",
  "안강읍과 인근 지역 이동이 가능하신 분",
];

const contactSteps = [
  {
    title: "전화 또는 카카오톡 문의",
    desc: "성함, 거주 지역, 자격증 보유 여부를 간단히 알려주세요.",
  },
  {
    title: "근무 가능 지역·시간 상담",
    desc: "센터에서 현재 가능한 방문 일정과 어르신 상황을 함께 확인합니다.",
  },
  {
    title: "방문 면담 후 배정 협의",
    desc: "필요 서류와 근무 조건을 안내드리고, 적합한 일정이 있으면 연결합니다.",
  },
];

export default function RecruitForm() {
  return (
    <div>
      <section
        style={{
          background: "linear-gradient(135deg, #EEF4FB 0%, #FFF8E1 100%)",
        }}
        className="py-16 md:py-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-3">
            RECRUIT
          </p>
          <h1 className="text-[#1A2E4A] text-4xl md:text-5xl font-bold leading-tight">
            요양보호사 상시 구인
          </h1>
          <p className="text-[#5A7A99] mt-5 max-w-2xl leading-8">
            안강 섬김 노인복지센터는 어르신의 일상을 따뜻하게 함께할
            요양보호사 선생님을 기다리고 있습니다. 복잡한 온라인 지원서 대신,
            전화나 카카오톡으로 편하게 연락 주세요.
          </p>
        </div>
      </section>

      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF4FB] px-4 py-2 text-[#1A56A0] text-sm font-bold mb-6">
                <HeartHandshake size={18} />
                함께 섬길 분을 상시 모집합니다
              </div>

              <h2 className="text-[#1A2E4A] text-2xl md:text-3xl font-bold leading-snug mb-5">
                어르신을 향한 따뜻한 마음이 있다면,
                <br className="hidden md:block" /> 센터로 연락 주세요.
              </h2>

              <p className="text-[#5A7A99] leading-8 mb-8">
                방문요양은 어르신의 가정에서 신체활동, 가사활동, 정서지원을
                돕는 일입니다. 근무 가능 지역과 시간은 상황에 따라 달라질 수
                있어, 먼저 연락을 주시면 센터에서 자세히 안내드립니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {recruitInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-[#A8C4E0]/50 bg-[#F4F7FC] p-5"
                    >
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FFFFFF] text-[#1A56A0] shadow-sm">
                        <Icon size={20} />
                      </div>
                      <p className="text-[#5A7A99] text-xs font-semibold mb-1">
                        {item.label}
                      </p>
                      <p className="text-[#1A2E4A] text-sm font-bold leading-6">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-3xl border border-[#A8C4E0]/60 bg-[#FFFFFF] p-6 md:p-8 shadow-[0_18px_40px_rgba(14,26,46,0.08)]">
                <h3 className="text-[#1A2E4A] text-xl font-bold mb-5">
                  이런 분을 기다립니다
                </h3>
                <ul className="space-y-3">
                  {preferredPoints.map((point) => (
                    <li key={point} className="flex gap-3 text-[#1A2E4A] text-sm leading-7">
                      <CheckCircle2 className="mt-1 flex-shrink-0 text-[#1A56A0]" size={18} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="lg:sticky lg:top-32 space-y-5">
              <div className="rounded-3xl bg-[#1A2E4A] p-7 text-white shadow-[0_18px_40px_rgba(14,26,46,0.18)]">
                <p className="text-[#A8C4E0] text-sm font-semibold mb-2">
                  문의 전화
                </p>
                <a href="tel:054-763-5988" className="block text-3xl font-bold tracking-tight">
                  054-763-5988
                </a>
                <p className="mt-4 text-sm leading-7 text-[#D6DFEB]">
                  평일 09:00–18:00, 토요일 09:00–14:00 사이에 연락 주시면
                  담당자가 구인 상담을 도와드립니다.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-3">
                  <a
                    href="tel:054-763-5988"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#FFFFFF] px-5 py-3 text-sm font-bold text-[#1A2E4A] transition-colors hover:bg-[#EEF4FB]"
                  >
                    <Phone size={17} />
                    전화로 문의하기
                  </a>
                  <a
                    href="http://pf.kakao.com/_zqvxbX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#FEE500] px-5 py-3 text-sm font-bold text-[#3C1E1E] transition-colors hover:bg-[#E6C200]"
                  >
                    <MessageCircle size={17} />
                    카카오톡 상담하기
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-[#A8C4E0]/60 bg-[#EEF4FB] p-6">
                <div className="mb-4 flex items-center gap-2 text-[#1A56A0] font-bold">
                  <ShieldCheck size={20} />
                  문의 전 알려주시면 좋아요
                </div>
                <ul className="space-y-2 text-sm leading-7 text-[#1A2E4A]">
                  <li>· 성함과 연락처</li>
                  <li>· 요양보호사 자격증 보유 여부</li>
                  <li>· 희망 근무 지역</li>
                  <li>· 가능한 요일과 시간대</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[#EEF4FB] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
                PROCESS
              </p>
              <h2 className="text-[#1A2E4A] text-2xl md:text-3xl font-bold">
                문의 후 진행 과정
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contactSteps.map((step, index) => (
              <div key={step.title} className="rounded-3xl bg-[#FFFFFF] p-6 border border-[#D6DFEB]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#1A56A0] text-white text-sm font-bold">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-[#1A2E4A] text-lg font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-[#5A7A99] text-sm leading-7">
                  {step.desc}
                </p>
              </div>
            ))}
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

    </div>
  );
}
