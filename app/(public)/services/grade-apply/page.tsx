import Link from "next/link";
import { ArrowRight, Phone, FileText, CheckCircle } from "lucide-react";

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

export default function GradeApplyPage() {
  return (
    <div>
      {/* 페이지 배너 */}
      <section
        style={{ background: "linear-gradient(135deg, #EEF4FB 0%, #F0E4A8 100%)" }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">SERVICES</p>
          <h1
            className="text-[#1A2E4A] text-4xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            등급신청 안내
          </h1>
          <p className="text-[#5A7A99] mt-3">장기요양 등급 신청부터 서비스 이용까지 안내해 드립니다</p>
        </div>
      </section>

      {/* 신청 절차 */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">PROCESS</p>
            <h2
              className="text-[#1A2E4A] text-2xl font-bold"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
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
                    style={{ fontFamily: "'Noto Serif KR', serif" }}
                  >
                    {s.step}
                  </span>
                </div>
                <div>
                  <h3
                    className="text-[#1A2E4A] font-bold mb-1"
                    style={{ fontFamily: "'Noto Serif KR', serif" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-[#1A2E4A] text-sm leading-relaxed mb-1">{s.desc}</p>
                  <p className="text-[#1A56A0] text-xs font-medium">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 필요 서류 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl p-7">
              <div className="flex items-center gap-2 mb-5">
                <FileText size={18} className="text-[#1A56A0]" />
                <h3
                  className="text-[#1A2E4A] font-bold"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  필요 서류
                </h3>
              </div>
              <ul className="space-y-2.5">
                {documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#1A2E4A] text-sm">
                    <CheckCircle size={13} className="text-[#1A56A0] flex-shrink-0 mt-0.5" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl p-7">
              <h3
                className="text-[#1A2E4A] font-bold mb-5"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                신청 방법
              </h3>
              <ul className="space-y-4">
                {[
                  { method: "방문 신청", desc: "국민건강보험공단 지사 직접 방문" },
                  { method: "우편 신청", desc: "서류 작성 후 공단 지사 우편 발송" },
                  { method: "온라인 신청", desc: "복지로(bokjiro.go.kr) 또는 공단 홈페이지" },
                  { method: "팩스 신청", desc: "관할 공단 지사 팩스 전송" },
                ].map((m, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#1A56A0] text-[#FFFFFF] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[#1A2E4A] font-bold text-sm">{m.method}</p>
                      <p className="text-[#5A7A99] text-xs">{m.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 안내 배너 */}
      <section className="bg-[#1A56A0] py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2
            className="text-[#FFFFFF] text-2xl font-bold mb-3"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            등급 신청이 어려우신가요?
          </h2>
          <p className="text-[#FFFFFF]/80 text-sm mb-7">
            안강 섬김 노인복지센터에서 등급 신청 상담 및 서류 작성을 도와드립니다.
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
      </section>
    </div>
  );
}
