import Link from "next/link";
import { adminSupabase } from "@/lib/supabase/admin";
import { MessageSquare, CheckCircle, Clock } from "lucide-react";

async function getInquiries() {
  const { data } = await adminSupabase
    .from("inquiries")
    .select("id, name, phone, title, is_answered, created_at")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();
  const unanswered = inquiries.filter((i) => !i.is_answered).length;

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-[#5C4A1E] text-2xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            문의 관리
          </h1>
          <p className="text-[#8C8070] text-sm mt-1">
            전체 {inquiries.length}건
            {unanswered > 0 && (
              <span className="ml-2 text-[#C4A84F] font-medium">
                · 미답변 {unanswered}건
              </span>
            )}
          </p>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-[#FFFDF0] border border-[#D9C97A]/50 rounded-xl p-12 text-center">
          <MessageSquare size={40} className="text-[#D9C97A] mx-auto mb-3" />
          <p className="text-[#8C8070] text-sm">접수된 문의가 없습니다.</p>
        </div>
      ) : (
        <div className="bg-[#FFFDF0] border border-[#D9C97A]/50 rounded-xl overflow-hidden">
          <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center px-5 py-3 bg-[#FAF3D6] border-b border-[#D9C97A]/40 text-[#8C8070] text-xs font-semibold">
            <span>상태</span>
            <span>제목</span>
            <span>이름</span>
            <span>연락처</span>
            <span>날짜</span>
          </div>

          {inquiries.map((inq) => (
            <Link
              key={inq.id}
              href={`/admin/inquiries/${inq.id}`}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center px-5 py-4 border-b border-[#D9C97A]/20 last:border-0 hover:bg-[#FAF3D6] transition-colors"
            >
              <span className="flex-shrink-0">
                {inq.is_answered ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : (
                  <Clock size={16} className="text-[#C4A84F]" />
                )}
              </span>

              <div className="min-w-0">
                <p className="text-[#5C4A1E] text-sm font-medium truncate">
                  {inq.title}
                </p>
                {/* 모바일에서만 표시 */}
                <p className="text-[#8C8070] text-xs md:hidden mt-0.5">
                  {inq.name} · {inq.phone} ·{" "}
                  {new Date(inq.created_at).toLocaleDateString("ko-KR")}
                </p>
              </div>

              <span className="hidden md:block text-[#5C4A1E] text-sm flex-shrink-0">
                {inq.name}
              </span>
              <span className="hidden md:block text-[#8C8070] text-sm flex-shrink-0">
                {inq.phone}
              </span>
              <span className="hidden md:block text-[#8C8070] text-xs flex-shrink-0">
                {new Date(inq.created_at).toLocaleDateString("ko-KR")}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
