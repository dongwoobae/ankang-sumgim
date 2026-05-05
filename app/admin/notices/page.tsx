import Link from "next/link";
import { adminSupabase } from "@/lib/supabase/admin";
import { PlusCircle, Pin, Pencil } from "lucide-react";
import { DeleteNoticeButton } from "./DeleteNoticeButton";

async function getNotices() {
  const { data } = await adminSupabase
    .from("notices")
    .select("id, title, is_pinned, created_at")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });
  return data ?? [];
}

export default async function AdminNoticesPage() {
  const notices = await getNotices();

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-[#1A2E4A] text-2xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            공지사항 관리
          </h1>
          <p className="text-[#5A7A99] text-sm mt-1">총 {notices.length}건</p>
        </div>
        <Link
          href="/admin/notices/new"
          className="flex items-center gap-2 bg-[#1A56A0] text-[#FFFFFF] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#1A2E4A] transition-colors"
        >
          <PlusCircle size={16} />
          새 공지 작성
        </Link>
      </div>

      {notices.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-12 text-center">
          <p className="text-[#5A7A99] text-sm">등록된 공지사항이 없습니다.</p>
          <Link
            href="/admin/notices/new"
            className="inline-flex items-center gap-2 mt-4 text-[#1A56A0] text-sm font-medium hover:underline"
          >
            <PlusCircle size={14} /> 첫 공지 작성하기
          </Link>
        </div>
      ) : (
        <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl overflow-hidden">
          {/* 테이블 헤더 */}
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center px-5 py-3 bg-[#EEF4FB] border-b border-[#A8C4E0]/40 text-[#5A7A99] text-xs font-semibold">
            <span>고정</span>
            <span>제목</span>
            <span>작성일</span>
            <span>관리</span>
          </div>

          {notices.map((notice) => (
            <div
              key={notice.id}
              className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center px-5 py-4 border-b border-[#A8C4E0]/20 last:border-0 hover:bg-[#EEF4FB] transition-colors"
            >
              {/* 고정 여부 */}
              <span>
                {notice.is_pinned ? (
                  <Pin size={14} className="text-[#1A56A0]" />
                ) : (
                  <span className="w-[14px] block" />
                )}
              </span>

              {/* 제목 */}
              <Link
                href={`/admin/notices/${notice.id}/edit`}
                className="text-[#1A2E4A] text-sm font-medium hover:text-[#1A56A0] transition-colors truncate"
              >
                {notice.title}
              </Link>

              {/* 날짜 */}
              <span className="text-[#5A7A99] text-xs flex-shrink-0">
                {new Date(notice.created_at).toLocaleDateString("ko-KR")}
              </span>

              {/* 관리 버튼 */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/admin/notices/${notice.id}/edit`}
                  className="inline-flex items-center gap-1 text-xs text-[#5A7A99] hover:text-[#1A56A0] transition-colors px-2 py-1 rounded border border-[#A8C4E0]/50 hover:border-[#1A56A0]"
                >
                  <Pencil size={11} /> 수정
                </Link>
                <DeleteNoticeButton id={notice.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
