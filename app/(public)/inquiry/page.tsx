"use client";

import { useActionState, useEffect, useRef } from "react";
import { Phone, MapPin, Clock, Send } from "lucide-react";
import { sendInquiry, type InquiryState } from "@/app/actions/sendInquiry";

const serviceTypes = [
  "방문요양서비스",
  "가족요양",
  "인지활동서비스",
  "등급신청 상담",
  "기타 문의",
];

const initialState: InquiryState = { success: false, message: "" };

export default function InquiryPage() {
  const [state, action, pending] = useActionState(sendInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

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
            CONTACT
          </p>
          <h1
            className="text-[#5C4A1E] text-4xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            상담문의
          </h1>
          <p className="text-[#8C8070] mt-3">
            어르신과 가족분들의 소중한 문의를 기다립니다
          </p>
        </div>
      </section>

      {/* 본문 */}
      <section className="bg-[#FFFDF0] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* 연락처 사이드바 */}
            <div className="space-y-5">
              <h2
                className="text-[#5C4A1E] text-xl font-bold"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                연락처 안내
              </h2>

              {[
                {
                  icon: <Phone size={18} />,
                  label: "전화 상담",
                  value: "054-763-5988",
                  link: "tel:054-763-5988",
                },
                {
                  icon: <MapPin size={18} />,
                  label: "주소",
                  value: "경상북도 경주시 안강읍 화전중앙길 53",
                  link: null,
                },
                {
                  icon: <Clock size={18} />,
                  label: "운영시간",
                  value: "평일 09:00–18:00\n주말 09:00–14:00",
                  link: null,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 bg-[#FAF3D6] border border-[#D9C97A]/50 rounded-xl"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E8D48B]/40 text-[#C4A84F] flex-shrink-0">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-[#8C8070] text-xs mb-0.5">
                      {item.label}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-[#5C4A1E] font-medium text-sm hover:text-[#C4A84F] transition-colors whitespace-pre-line"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[#5C4A1E] font-medium text-sm whitespace-pre-line">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 상담 폼 */}
            <div className="md:col-span-2">
              <h2
                className="text-[#5C4A1E] text-xl font-bold mb-6"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                온라인 상담 신청
              </h2>

              <form ref={formRef} action={action} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#5C4A1E] text-sm font-medium mb-1.5">
                      성함 <span className="text-[#C4A84F]">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="홍길동"
                      className="w-full px-4 py-3 rounded-xl border border-[#D9C97A]/70 bg-[#FAF3D6] text-[#5C4A1E] placeholder-[#8C8070] text-sm focus:outline-none focus:border-[#C4A84F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5C4A1E] text-sm font-medium mb-1.5">
                      연락처 <span className="text-[#C4A84F]">*</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-[#D9C97A]/70 bg-[#FAF3D6] text-[#5C4A1E] placeholder-[#8C8070] text-sm focus:outline-none focus:border-[#C4A84F] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#5C4A1E] text-sm font-medium mb-1.5">
                    이메일{" "}
                    <span className="text-[#8C8070] text-xs font-normal">
                      (선택)
                    </span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#D9C97A]/70 bg-[#FAF3D6] text-[#5C4A1E] placeholder-[#8C8070] text-sm focus:outline-none focus:border-[#C4A84F] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#5C4A1E] text-sm font-medium mb-1.5">
                    문의 유형 <span className="text-[#C4A84F]">*</span>
                  </label>
                  <select
                    name="serviceType"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#D9C97A]/70 bg-[#FAF3D6] text-[#5C4A1E] text-sm focus:outline-none focus:border-[#C4A84F] transition-colors appearance-none"
                  >
                    <option value="">선택해 주세요</option>
                    {serviceTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#5C4A1E] text-sm font-medium mb-1.5">
                    문의 내용 <span className="text-[#C4A84F]">*</span>
                  </label>
                  <textarea
                    name="content"
                    required
                    rows={5}
                    placeholder="문의하실 내용을 자유롭게 적어주세요."
                    className="w-full px-4 py-3 rounded-xl border border-[#D9C97A]/70 bg-[#FAF3D6] text-[#5C4A1E] placeholder-[#8C8070] text-sm focus:outline-none focus:border-[#C4A84F] transition-colors resize-none"
                  />
                </div>

                {state.message && (
                  <div
                    className={`p-4 rounded-xl text-sm font-medium ${
                      state.success
                        ? "bg-[#E8D48B]/30 border border-[#C4A84F]/50 text-[#5C4A1E]"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    {state.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="w-full flex items-center justify-center gap-2 bg-[#C4A84F] text-[#FFFDF0] px-7 py-4 rounded-xl font-bold text-sm hover:bg-[#5C4A1E] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  {pending ? "전송 중..." : "상담 신청하기"}
                </button>

                <p className="text-[#8C8070] text-xs text-center">
                  상담 신청 후 영업일 기준 1~2일 내에 연락드립니다.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
