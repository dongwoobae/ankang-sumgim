"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Send, Briefcase, Phone, MapPin, FileText } from "lucide-react";
import { submitJobApplication, type JobApplicationState } from "@/app/actions/submitJobApplication";

const CERTIFICATE_OPTIONS = [
  "요양보호사",
  "사회복지사 1급",
  "사회복지사 2급",
  "간호조무사",
  "기타",
];

const WORK_TYPE_OPTIONS = [
  { value: "fulltime", label: "정규직 (풀타임)" },
  { value: "parttime", label: "시간제 (파트타임)" },
  { value: "both", label: "모두 가능" },
];

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.startsWith("02")) {
    if (digits.length <= 5) return digits.replace(/(\d{2})(\d+)/, "$1-$2");
    if (digits.length <= 9) return digits.replace(/(\d{2})(\d{3})(\d+)/, "$1-$2-$3");
    return digits.replace(/(\d{2})(\d{4})(\d+)/, "$1-$2-$3");
  }
  if (digits.length <= 6) return digits.replace(/(\d{3})(\d+)/, "$1-$2");
  if (digits.length <= 10) return digits.replace(/(\d{3})(\d{3})(\d+)/, "$1-$2-$3");
  return digits.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
}

const initialState: JobApplicationState = { success: false, message: "" };

export default function RecruitPage() {
  const [state, action, pending] = useActionState(submitJobApplication, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [phone, setPhone] = useState("");
  const [intro, setIntro] = useState("");

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setPhone("");
      setIntro("");
    }
  }, [state.success]);

  return (
    <div>
      {/* 배너 */}
      <section
        style={{
          background: "linear-gradient(135deg, #EEF4FB 0%, #F0E4A8 100%)",
        }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
            RECRUIT
          </p>
          <h1 className="text-[#1A2E4A] text-4xl font-bold">
            요양보호사 구인
          </h1>
          <p className="text-[#5A7A99] mt-3">
            어르신과 함께하는 따뜻한 돌봄, 함께할 분을 모집합니다
          </p>
        </div>
      </section>

      {/* 본문 */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* 안내 사이드바 */}
            <div className="space-y-5">
              <h2 className="text-[#1A2E4A] text-xl font-bold">모집 안내</h2>

              {[
                {
                  icon: <Briefcase size={18} />,
                  label: "모집 직종",
                  value: "요양보호사",
                },
                {
                  icon: <MapPin size={18} />,
                  label: "근무 지역",
                  value: "경상북도 경주시 안강읍 및 인근",
                },
                {
                  icon: <Phone size={18} />,
                  label: "문의 전화",
                  value: "054-763-5988",
                  link: "tel:054-763-5988",
                },
                {
                  icon: <FileText size={18} />,
                  label: "필요 자격",
                  value: "요양보호사 자격증 소지자\n(경력 무관 · 신입 환영)",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E8A020]/40 text-[#1A56A0] flex-shrink-0">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-[#5A7A99] text-xs mb-0.5">{item.label}</p>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-[#1A2E4A] font-medium text-sm hover:text-[#1A56A0] transition-colors whitespace-pre-line"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[#1A2E4A] font-medium text-sm whitespace-pre-line">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 지원 폼 */}
            <div className="md:col-span-2">
              <h2 className="text-[#1A2E4A] text-xl font-bold mb-6">
                온라인 입사 지원
              </h2>

              <form ref={formRef} action={action} className="space-y-5">
                {/* Honeypot */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="website_recruit">Website</label>
                  <input
                    id="website_recruit"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#1A2E4A] text-sm font-medium mb-1.5">
                      성함 <span className="text-[#1A56A0]">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="홍길동"
                      className="w-full px-4 py-3 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] placeholder-[#5A7A99] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1A2E4A] text-sm font-medium mb-1.5">
                      연락처 <span className="text-[#1A56A0]">*</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] placeholder-[#5A7A99] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors"
                    />
                  </div>
                </div>

                {/* 보유 자격증 */}
                <div>
                  <label className="block text-[#1A2E4A] text-sm font-medium mb-2">
                    보유 자격증{" "}
                    <span className="text-[#5A7A99] text-xs font-normal">(해당 항목 모두 선택)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CERTIFICATE_OPTIONS.map((cert) => (
                      <label
                        key={cert}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] cursor-pointer has-[:checked]:bg-[#1A56A0] has-[:checked]:border-[#1A56A0] has-[:checked]:text-white transition-colors"
                      >
                        <input
                          type="checkbox"
                          name="certificates"
                          value={cert}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#1A2E4A] text-sm font-medium mb-1.5">
                    희망 근무 지역 <span className="text-[#1A56A0]">*</span>
                  </label>
                  <input
                    name="preferred_region"
                    type="text"
                    required
                    placeholder="예: 안강읍, 강동면"
                    className="w-full px-4 py-3 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] placeholder-[#5A7A99] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors"
                  />
                </div>

                {/* 근무 형태 */}
                <div>
                  <label className="block text-[#1A2E4A] text-sm font-medium mb-2">
                    희망 근무 형태 <span className="text-[#1A56A0]">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {WORK_TYPE_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] cursor-pointer has-[:checked]:bg-[#1A56A0] has-[:checked]:border-[#1A56A0] has-[:checked]:text-white transition-colors"
                      >
                        <input
                          type="radio"
                          name="work_type"
                          value={opt.value}
                          required
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 자기소개 */}
                <div>
                  <label className="block text-[#1A2E4A] text-sm font-medium mb-1.5">
                    자기소개{" "}
                    <span className="text-[#5A7A99] text-xs font-normal">(선택)</span>
                  </label>
                  <textarea
                    name="introduction"
                    rows={4}
                    maxLength={500}
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                    placeholder="경력, 특기사항 등을 자유롭게 적어주세요."
                    className="w-full px-4 py-3 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] placeholder-[#5A7A99] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors resize-none"
                  />
                  <p
                    className="text-right text-xs mt-1"
                    style={{ color: intro.length >= 500 ? "#dc2626" : "#5A7A99" }}
                  >
                    ({intro.length}/500)
                  </p>
                </div>

                {state.message && (
                  <div
                    className={`p-4 rounded-xl text-sm font-medium ${
                      state.success
                        ? "bg-[#E8A020]/30 border border-[#1A56A0]/50 text-[#1A2E4A]"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    {state.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="w-full flex items-center justify-center gap-2 bg-[#1A56A0] text-[#FFFFFF] px-7 py-4 rounded-xl font-bold text-sm hover:bg-[#1A2E4A] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  {pending ? "제출 중..." : "지원서 제출하기"}
                </button>

                <p className="text-[#5A7A99] text-xs text-center">
                  지원서 접수 후 담당자가 확인하여 연락드립니다.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
