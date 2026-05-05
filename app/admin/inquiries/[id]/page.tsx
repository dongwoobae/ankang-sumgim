import { adminSupabase } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock } from "lucide-react";
import { ReplyForm } from "./ReplyForm";
import { DeleteReplyButton } from "./DeleteReplyButton";
import { AnswerToggle } from "./AnswerToggle";

async function getInquiry(id: string) {
  const { data } = await adminSupabase
    .from("inquiries")
    .select("*, inquiry_replies(id, content, created_at)")
    .eq("id", id)
    .single();
  return data;
}

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inquiry = await getInquiry(id);
  if (!inquiry) notFound();

  const replies = (
    inquiry.inquiry_replies as {
      id: number;
      content: string;
      created_at: string;
    }[]
  ) ?? [];

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/inquiries"
          className="text-[#5A7A99] hover:text-[#1A56A0] transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1
          className="text-[#1A2E4A] text-2xl font-bold"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          문의 상세
        </h1>
      </div>

      {/* 문의 내용 */}
      <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {inquiry.is_answered ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                <CheckCircle size={12} /> 답변완료
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1A56A0] bg-[#EEF4FB] border border-[#A8C4E0] px-2.5 py-1 rounded-full">
                <Clock size={12} /> 미답변
              </span>
            )}
          </div>
          <AnswerToggle id={String(inquiry.id)} isAnswered={inquiry.is_answered} />
        </div>

        <h2
          className="text-[#1A2E4A] text-lg font-bold mb-4"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          {inquiry.title}
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: "이름", value: inquiry.name },
            { label: "연락처", value: inquiry.phone },
            { label: "이메일", value: inquiry.email || "미입력" },
            {
              label: "접수일",
              value: new Date(inquiry.created_at).toLocaleString("ko-KR"),
            },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[#5A7A99] text-xs mb-0.5">{item.label}</p>
              <p className="text-[#1A2E4A] text-sm font-medium">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#EEF4FB] rounded-xl p-4">
          <p className="text-[#1A2E4A] text-sm leading-[1.8] whitespace-pre-wrap">
            {inquiry.content}
          </p>
        </div>
      </div>

      {/* 답변 목록 */}
      {replies.length > 0 && (
        <div className="space-y-3 mb-6">
          <p className="text-[#5A7A99] text-xs font-semibold tracking-wider">
            답변 {replies.length}건
          </p>
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="bg-[#2E6DB4]/20 border border-[#A8C4E0]/60 rounded-xl p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-[#1A56A0] text-xs font-bold">관리자 답변</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#5A7A99] text-xs">
                    {new Date(reply.created_at).toLocaleString("ko-KR")}
                  </span>
                  <DeleteReplyButton
                    id={String(reply.id)}
                    inquiryId={String(inquiry.id)}
                  />
                </div>
              </div>
              <p className="text-[#1A2E4A] text-sm leading-[1.8] whitespace-pre-wrap">
                {reply.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 답변 작성 폼 */}
      <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-6">
        <p
          className="text-[#1A2E4A] font-bold text-sm mb-4"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          답변 작성
        </p>
        <ReplyForm inquiryId={String(inquiry.id)} />
      </div>
    </div>
  );
}
