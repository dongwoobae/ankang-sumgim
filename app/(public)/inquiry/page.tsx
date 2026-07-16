// app/(public)/inquiry/page.tsx

"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Phone, MapPin, Clock, Send } from "lucide-react";
import { sendInquiry, type InquiryState } from "@/app/actions/sendInquiry";
import FaqAccordion from "@/components/FaqAccordion";
import PageHero from "@/components/board/PageHero";

const serviceTypes = ["방문요양서비스", "가족요양", "인지활동서비스", "등급신청 상담", "기타 문의"];

const initialState: InquiryState = { success: false, message: "" };

/** 입력값을 한국 전화번호 형식으로 자동 포매팅 */
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.startsWith("02")) {
    // 서울 지역번호: 02-XXX-XXXX or 02-XXXX-XXXX
    if (digits.length <= 5) return digits.replace(/(\d{2})(\d+)/, "$1-$2");
    if (digits.length <= 9) return digits.replace(/(\d{2})(\d{3})(\d+)/, "$1-$2-$3");
    return digits.replace(/(\d{2})(\d{4})(\d+)/, "$1-$2-$3");
  }

  // 010, 011, 054 등 나머지
  if (digits.length <= 6) return digits.replace(/(\d{3})(\d+)/, "$1-$2");
  if (digits.length <= 10) return digits.replace(/(\d{3})(\d{3})(\d+)/, "$1-$2-$3");
  return digits.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
}

export default function InquiryPage() {
  const [state, action, pending] = useActionState(sendInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const timestampRef = useRef<HTMLInputElement>(null);
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (timestampRef.current) {
      timestampRef.current.value = String(Date.now());
    }
  }, []);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setTimeout(() => {
        setPhone("");
        setContent("");
      }, 0);
      if (timestampRef.current) {
        timestampRef.current.value = String(Date.now());
      }
    }
  }, [state.success]);

  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="상담문의"
        lead="어르신과 가족분들의 소중한 문의를 기다립니다"
        crumbs={[{ label: "홈", href: "/" }, { label: "상담문의" }]}
      />

      {/* FAQ */}
      <FaqAccordion />

      {/* 본문 */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* 연락처 사이드바 */}
            <div className="space-y-5">
              <h2 className="text-xl font-bold" style={{ color: "var(--ink-2)" }}>
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
                  value: "평일 09:00–18:00\n토 09:00–14:00",
                  link: null,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl border p-5"
                  style={{
                    background: "var(--paper-2)",
                    borderColor: "var(--line)",
                  }}
                >
                  <span
                    className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white"
                    style={{ background: "var(--pop)" }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p className="mb-0.5 text-xs" style={{ color: "var(--muted)" }}>
                      {item.label}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="whitespace-pre-line text-sm font-medium transition-colors hover:opacity-70"
                        style={{ color: "var(--ink-2)" }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p
                        className="whitespace-pre-line text-sm font-medium"
                        style={{ color: "var(--ink-2)" }}
                      >
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 상담 폼 */}
            <div className="md:col-span-2">
              <h2 className="mb-6 text-xl font-bold" style={{ color: "var(--ink-2)" }}>
                온라인 상담 신청
              </h2>

              <form ref={formRef} action={action} className="space-y-5">
                {/* ── 스팸 방지 hidden 필드 ── */}
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
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <input ref={timestampRef} name="_t" type="hidden" />
                {/* ────────────────────────── */}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium"
                      style={{ color: "var(--ink-2)" }}
                    >
                      성함 <span style={{ color: "var(--pop)" }}>*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="홍길동"
                      className="w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none"
                      style={{
                        background: "var(--paper-2)",
                        borderColor: "var(--line)",
                        color: "var(--ink-2)",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium"
                      style={{ color: "var(--ink-2)" }}
                    >
                      연락처 <span style={{ color: "var(--pop)" }}>*</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      className="w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none"
                      style={{
                        background: "var(--paper-2)",
                        borderColor: "var(--line)",
                        color: "var(--ink-2)",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--ink-2)" }}
                  >
                    이메일{" "}
                    <span className="text-xs font-normal" style={{ color: "var(--muted)" }}>
                      (선택)
                    </span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    className="w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none"
                    style={{
                      background: "var(--paper-2)",
                      borderColor: "var(--line)",
                      color: "var(--ink-2)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--ink-2)" }}
                  >
                    문의 유형 <span style={{ color: "var(--pop)" }}>*</span>
                  </label>
                  <select
                    name="serviceType"
                    required
                    className="w-full appearance-none rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none"
                    style={{
                      background: "var(--paper-2)",
                      borderColor: "var(--line)",
                      color: "var(--ink-2)",
                    }}
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
                  <label
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--ink-2)" }}
                  >
                    문의 내용 <span style={{ color: "var(--pop)" }}>*</span>
                  </label>
                  <textarea
                    name="content"
                    required
                    rows={5}
                    maxLength={1000}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="문의하실 내용을 자유롭게 적어주세요."
                    className="w-full resize-none rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none"
                    style={{
                      background: "var(--paper-2)",
                      borderColor: "var(--line)",
                      color: "var(--ink-2)",
                    }}
                  />
                  <p
                    className="mt-1 text-right text-xs"
                    style={{ color: content.length >= 1000 ? "#dc2626" : "var(--muted)" }}
                  >
                    ({content.length}/1000)
                  </p>
                </div>

                {state.message && (
                  <div
                    className="rounded-xl border p-4 text-sm font-medium"
                    style={
                      state.success
                        ? {
                            background: "var(--paper-3)",
                            borderColor: "color-mix(in srgb, var(--pop) 30%, transparent)",
                            color: "var(--ink-2)",
                          }
                        : {
                            background: "#fef2f2",
                            borderColor: "#fecaca",
                            color: "#b91c1c",
                          }
                    }
                  >
                    {state.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="flex w-full items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-bold text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ background: "var(--pop)" }}
                >
                  <Send size={16} />
                  {pending ? "전송 중..." : "상담 신청하기"}
                </button>

                <p className="text-center text-xs" style={{ color: "var(--muted)" }}>
                  상담 신청 후 영업일 기준 1~2일 내에 연락드립니다.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
