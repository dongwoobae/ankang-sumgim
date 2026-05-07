import Link from "next/link";
import { CheckCircle, Users } from "lucide-react";
import ServiceProcess from "@/components/ServiceProcess";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "등급신청 안내",
  description:
    "장기요양 1~5등급 신청 방법과 절차 안내. 신청서 제출부터 등급 판정까지 안강 섬김이 도와드립니다.",
  openGraph: { url: "/services/grade-apply" },
};

const steps = [
  {
    step: "01",
    title: "신청서 제출",
    desc: "국민건강보험공단 지사 방문 또는 온라인(복지로)으로 장기요양인정 신청서 제출",
    sub: "신청인: 본인, 가족, 대리인",
  },
  {
    step: "02",
    title: "방문조사",
    desc: "공단 직원이 직접 가정을 방문하여 심신 기능 상태(52개 항목) 조사",
    sub: "신청 후 약 30일 이내",
  },
  {
    step: "03",
    title: "의사소견서 제출",
    desc: "의사에게 발급받은 소견서를 공단에 제출 (65세 미만은 필수, 65세 이상은 요청 시)",
    sub: "지정 의료기관 발급 가능",
  },
  {
    step: "04",
    title: "등급판정",
    desc: "장기요양등급판정위원회에서 심사 후 1~5등급 또는 인지지원등급 결정",
    sub: "결과 통보: 우편·모바일",
  },
  {
    step: "05",
    title: "서비스 이용",
    desc: "장기요양인정서 수령 후 기관 선택 및 계약 체결, 서비스 시작",
    sub: "안강 섬김으로 연락주세요!",
  },
];

const documents = [
  "장기요양인정 신청서 (공단 양식)",
  "신분증 (본인 또는 대리인)",
  "의사소견서 (해당자)",
  "대리신청 시 위임장 및 대리인 신분증",
];

const gradeApplyProcess = (
  <ServiceProcess
    title="등급신청 절차"
    steps={[
      {
        iconKey: "gradeApply",
        title: "신청서 제출",
        desc: "공단 지사 방문 또는 복지로 온라인 신청",
      },
      {
        iconKey: "doctorNote",
        title: "의사소견서 제출",
        desc: "지정 의료기관 발급 소견서 공단에 제출",
      },
      {
        iconKey: "visitCheck",
        title: "공단 방문조사",
        desc: "공단 직원이 가정 방문, 52개 항목 심신 조사",
      },
      {
        iconKey: "gradeJudgment",
        title: "등급판정",
        desc: "판정위원회 심사 후 1~5등급 또는 인지지원등급 결정",
      },
      {
        iconKey: "contract",
        title: "인정서 수령",
        desc: "우편·모바일로 장기요양인정서 통보",
      },
      {
        iconKey: "serviceStart",
        title: "서비스 이용",
        desc: "안강 섬김에 연락하여 서비스 계약 및 시작",
      },
    ]}
  />
);

export default function GradeApplyPage() {
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
          >
            등급신청 안내
          </h1>
          <p className="text-[#5A7A99] mt-3">
            장기요양 등급 신청부터 서비스 이용까지 안내해 드립니다
          </p>
        </div>
      </section>

      {/* ── OVERVIEW: 등급신청이란? ── */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            {/* 좌측 — 설명 */}
            <div>
              <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
                WHAT WE DO
              </p>
              <h2
                className="text-[#1A2E4A] text-2xl font-bold mb-5"
              >
                등급신청이란?
              </h2>
              <p className="text-[#1A2E4A] text-[15px] leading-[1.9] mb-4">
                노인장기요양보험 등급신청은 거동이 불편하거나 치매 등 노인성
                질환으로 일상생활에 도움이 필요한 어르신이 국민건강보험공단에
                요양 등급을 신청하는 절차입니다.
              </p>
              <p className="text-[#1A2E4A] text-[15px] leading-[1.9]">
                등급을 받으시면 방문요양·가족요양·인지활동서비스 등 다양한
                장기요양급여를 본인 부담금(15% 내외)만으로 이용하실 수 있습니다.
                저희 센터에서 신청 대행부터 서비스 연결까지 함께 도와드립니다.
              </p>
            </div>

            {/* 우측 — 신청 자격 + 핵심 정보 카드 */}
            <div className="space-y-4">
              {/* 신청 자격 */}
              <div className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users size={18} className="text-[#1A56A0]" />
                  <h3
                    className="text-[#1A2E4A] font-bold"
                  >
                    신청 대상
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "만 65세 이상 노인",
                    "만 65세 미만이라도 치매·뇌혈관질환 등 노인성 질환자",
                    "건강보험 가입자 및 피부양자, 의료급여 수급자",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[#1A2E4A] text-sm"
                    >
                      <CheckCircle
                        size={13}
                        className="text-[#1A56A0] flex-shrink-0 mt-0.5"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 핵심 수치 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1A56A0] rounded-2xl p-5 text-center">
                  <p className="text-[#A8C4E0] text-xs mb-1">판정 소요 기간</p>
                  <p
                    className="text-[#FFFFFF] text-2xl font-bold"
                  >
                    2~4주
                  </p>
                  <p className="text-[#A8C4E0] text-xs mt-1">
                    신청 후 통상 기간
                  </p>
                </div>
                <div className="bg-[#1A2E4A] rounded-2xl p-5 text-center">
                  <p className="text-[#A8C4E0] text-xs mb-1">본인 부담금</p>
                  <p
                    className="text-[#FFFFFF] text-2xl font-bold"
                  >
                    15%
                  </p>
                  <p className="text-[#A8C4E0] text-xs mt-1">
                    기초수급자 면제~7.5%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 신청 절차 */}
      {gradeApplyProcess}
      {/* <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
              PROCESS
            </p>
            <h2
              className="text-[#1A2E4A] text-2xl font-bold"
            >
              등급신청 절차
            </h2>
          </div>

          <div className="space-y-4 mb-16">
            {steps.map((s, i) => (
              <div
                key={i}
                className="flex gap-6 bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl p-6"
              >
                <div className="flex-shrink-0">
                  <span
                    className="text-[#1A56A0] text-3xl font-bold"
                  >
                    {s.step}
                  </span>
                </div>
                <div>
                  <h3
                    className="text-[#1A2E4A] font-bold mb-1"
                  >
                    {s.title}
                  </h3>
                  <p className="text-[#1A2E4A] text-sm leading-relaxed mb-1">
                    {s.desc}
                  </p>
                  <p className="text-[#1A56A0] text-xs font-medium">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl p-7">
              <div className="flex items-center gap-2 mb-5">
                <FileText size={18} className="text-[#1A56A0]" />
                <h3
                  className="text-[#1A2E4A] font-bold"
                >
                  필요 서류
                </h3>
              </div>
              <ul className="space-y-2.5">
                {documents.map((doc, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[#1A2E4A] text-sm"
                  >
                    <CheckCircle
                      size={13}
                      className="text-[#1A56A0] flex-shrink-0 mt-0.5"
                    />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl p-7">
              <h3
                className="text-[#1A2E4A] font-bold mb-5"
              >
                신청 방법
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    method: "방문 신청",
                    desc: "국민건강보험공단 지사 직접 방문",
                  },
                  {
                    method: "우편 신청",
                    desc: "서류 작성 후 공단 지사 우편 발송",
                  },
                  {
                    method: "온라인 신청",
                    desc: "복지로(bokjiro.go.kr) 또는 공단 홈페이지",
                  },
                  { method: "팩스 신청", desc: "관할 공단 지사 팩스 전송" },
                ].map((m, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#1A56A0] text-[#FFFFFF] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[#1A2E4A] font-bold text-sm">
                        {m.method}
                      </p>
                      <p className="text-[#5A7A99] text-xs">{m.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section> */}

      {/* 안내 배너 */}
      {/* <section className="bg-[#1A56A0] py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2
            className="text-[#FFFFFF] text-2xl font-bold mb-3"
          >
            등급 신청이 어려우신가요?
          </h2>
          <p className="text-[#FFFFFF]/80 text-sm mb-7">
            안강 섬김 노인복지센터에서 등급 신청 상담 및 서류 작성을
            도와드립니다.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/inquiry"
              className="flex items-center gap-2 bg-[#FFFFFF] text-[#1A56A0] px-7 py-4 rounded-xl font-bold text-sm hover:bg-[#1A2E4A] hover:text-[#FFFFFF] transition-colors duration-300"
            >
              온라인 상담 신청 <ArrowRight size={16} />
            </Link>
            <a
              href="tel:054-763-5988"
              className="flex items-center gap-2 border-2 border-[#FFFFFF] text-[#FFFFFF] px-7 py-4 rounded-xl font-bold text-sm hover:bg-[#FFFFFF] hover:text-[#1A56A0] transition-colors duration-300"
            >
              <Phone size={16} />
              054-763-5988
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
}
