import { CheckCircle, Users, FileText } from "lucide-react";
import ServiceProcess from "@/components/ServiceProcess";
import { type Metadata } from "next";
import PageHero from "@/components/board/PageHero";
import PageToc from "@/components/common/PageToc";
import SiblingNav from "@/components/common/SiblingNav";
import CtaBanner from "@/components/common/CtaBanner";

export const metadata: Metadata = {
  title: "등급신청 안내",
  description:
    "장기요양 1~5등급 신청 방법과 절차 안내. 신청서 제출부터 등급 판정까지 안강 섬김이 도와드립니다.",
  openGraph: { url: "/services/grade-apply" },
};

const documents = [
  "장기요양인정 신청서 (공단 양식)",
  "신분증 (본인 또는 대리인)",
  "의사소견서 (해당자)",
  "대리신청 시 위임장 및 대리인 신분증",
];

const methods = [
  { method: "방문 신청", desc: "국민건강보험공단 지사 직접 방문" },
  { method: "우편 신청", desc: "서류 작성 후 공단 지사 우편 발송" },
  { method: "온라인 신청", desc: "복지로(bokjiro.go.kr) 또는 공단 홈페이지" },
  { method: "팩스 신청", desc: "관할 공단 지사 팩스 전송" },
];

const tocItems = [
  { id: "apply-what", label: "등급신청이란?" },
  { id: "apply-process", label: "신청 절차" },
  { id: "apply-docs", label: "필요 서류" },
  { id: "apply-how", label: "신청 방법" },
];

export default function GradeApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="SERVICES"
        title="등급신청 안내"
        lead="장기요양 등급 신청부터 서비스 이용까지 안내해 드립니다"
        crumbs={[
          { label: "홈", href: "/" },
          { label: "서비스 안내" },
          { label: "등급신청 안내" },
        ]}
      />

      <section className="py-20">
        <div
          className="hidden min-[1440px]:block sticky z-10"
          style={{ top: "180px", height: 0 }}
        >
          <div
            className="absolute w-[200px]"
            style={{ left: "40px", top: 0 }}
          >
            <PageToc
              title="등급신청 안내"
              items={tocItems}
              bottomCta={{ text: "신청 도움이 필요하세요?", phone: "054-763-5988" }}
            />
          </div>
        </div>
        <div className="px-6">
          <div className="mx-auto max-w-[860px] space-y-20">
              {/* 등급신청이란? */}
              <div id="apply-what">
                <div
                  className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
                  style={{ color: "var(--pop)" }}
                >
                  WHAT WE DO
                </div>
                <h2
                  className="mb-5 text-[26px] font-extrabold"
                  style={{ color: "var(--ink-2)" }}
                >
                  등급신청이란?
                </h2>
                <div
                  className="mb-8 space-y-4 text-[15px] leading-[1.9]"
                  style={{ color: "var(--ink-2)" }}
                >
                  <p>
                    노인장기요양보험 등급신청은 거동이 불편하거나 치매 등 노인성
                    질환으로 일상생활에 도움이 필요한 어르신이 국민건강보험공단에
                    요양 등급을 신청하는 절차입니다.
                  </p>
                  <p>
                    등급을 받으시면 방문요양·가족요양·인지활동서비스 등 다양한
                    장기요양급여를 본인 부담금(15% 내외)만으로 이용하실 수 있습니다.
                    저희 센터에서 신청 대행부터 서비스 연결까지 함께 도와드립니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* 신청 대상 */}
                  <div
                    className="rounded-2xl border p-6"
                    style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <Users size={18} style={{ color: "var(--pop)" }} />
                      <h3 className="font-bold" style={{ color: "var(--ink-2)" }}>
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
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "var(--ink-2)" }}
                        >
                          <CheckCircle
                            size={13}
                            className="mt-0.5 flex-shrink-0"
                            style={{ color: "var(--pop)" }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 핵심 수치 */}
                  <div className="grid grid-cols-2 gap-3 self-start">
                    <div
                      className="rounded-2xl p-5 text-center"
                      style={{ background: "var(--pop)" }}
                    >
                      <p className="mb-1 text-xs text-white/70">판정 소요 기간</p>
                      <p className="text-2xl font-bold text-white">2~4주</p>
                      <p className="mt-1 text-xs text-white/70">신청 후 통상 기간</p>
                    </div>
                    <div
                      className="rounded-2xl p-5 text-center"
                      style={{ background: "var(--ink)" }}
                    >
                      <p className="mb-1 text-xs text-white/70">본인 부담금</p>
                      <p className="text-2xl font-bold text-white">15%</p>
                      <p className="mt-1 text-xs text-white/70">기초수급자 면제~7.5%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 신청 절차 */}
              <div id="apply-process">
                <div
                  className="mb-2 text-[12px] font-semibold uppercase tracking-[0.3em]"
                  style={{ color: "var(--pop)" }}
                >
                  PROCESS
                </div>
                <h2
                  className="mb-6 text-[26px] font-extrabold"
                  style={{ color: "var(--ink-2)" }}
                >
                  신청 절차
                </h2>
              </div>

              {/* 필요 서류 + 신청 방법 */}
              <div id="apply-docs" className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div
                  className="rounded-xl border p-7"
                  style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}
                >
                  <div className="mb-5 flex items-center gap-2">
                    <FileText size={18} style={{ color: "var(--pop)" }} />
                    <h3 className="font-bold" style={{ color: "var(--ink-2)" }}>
                      필요 서류
                    </h3>
                  </div>
                  <ul className="space-y-2.5">
                    {documents.map((doc, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: "var(--ink-2)" }}
                      >
                        <CheckCircle
                          size={13}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: "var(--pop)" }}
                        />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  id="apply-how"
                  className="rounded-xl border p-7"
                  style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}
                >
                  <h3 className="mb-5 font-bold" style={{ color: "var(--ink-2)" }}>
                    신청 방법
                  </h3>
                  <ul className="space-y-4">
                    {methods.map((m, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                          style={{ background: "var(--pop)" }}
                        >
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-bold" style={{ color: "var(--ink-2)" }}>
                            {m.method}
                          </p>
                          <p className="text-xs" style={{ color: "var(--muted)" }}>
                            {m.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
          </div>
        </div>
      </section>

      <ServiceProcess
        title=""
        steps={[
          { iconKey: "gradeApply", title: "신청서 제출", desc: "공단 지사 방문 또는 복지로 온라인 신청" },
          { iconKey: "doctorNote", title: "의사소견서 제출", desc: "지정 의료기관 발급 소견서 공단에 제출" },
          { iconKey: "visitCheck", title: "공단 방문조사", desc: "공단 직원이 가정 방문, 52개 항목 심신 조사" },
          { iconKey: "gradeJudgment", title: "등급판정", desc: "판정위원회 심사 후 1~5등급 또는 인지지원등급 결정" },
          { iconKey: "contract", title: "인정서 수령", desc: "우편·모바일로 장기요양인정서 통보" },
          { iconKey: "serviceStart", title: "서비스 이용", desc: "안강 섬김에 연락하여 서비스 계약 및 시작" },
        ]}
      />

      <section className="px-6 py-14">
        <div className="mx-auto max-w-[860px]">
          <SiblingNav
            prev={{ label: "가족요양", desc: "가족이 직접 돌보는 요양서비스", href: "/services/family-care" }}
            next={{ label: "인지활동서비스", desc: "치매 어르신 인지활동 프로그램", href: "/services/cognitive" }}
          />
        </div>
      </section>

      <CtaBanner
        eyebrow="NEED HELP?"
        title="등급 신청이 어려우신가요?"
        desc="안강 섬김 노인복지센터에서 등급 신청 상담 및 서류 작성을 도와드립니다."
        primary={{ text: "상담 신청", href: "/inquiry" }}
        secondary={{ text: "☎ 054-763-5988", href: "tel:054-763-5988" }}
        variant="pop"
      />
    </>
  );
}
