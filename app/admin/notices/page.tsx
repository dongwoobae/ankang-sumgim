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
            className="text-[#5C4A1E] text-2xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            공지사항 관리
          </h1>
          <p className="text-[#8C8070] text-sm mt-1">총 {notices.length}건</p>
        </div>
        <Link
          href="/admin/notices/new"
          className="flex items-center gap-2 bg-[#C4A84F] text-[#FFFDF0] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#5C4A1E] transition-colors"
        >
          <PlusCircle size={16} />
          새 공지 작성
        </Link>
      </div>

      {notices.length === 0 ? (
        <div className="bg-[#FFFDF0] border border-[#D9C97A]/50 rounded-xl p-12 text-center">
          <p className="text-[#8C8070] text-sm">등록된 공지사항이 없습니다.</p>
          <Link
            href="/admin/notices/new"
            className="inline-flex items-center gap-2 mt-4 text-[#C4A84F] text-sm font-medium hover:underline"
          >
            <PlusCircle size={14} /> 첫 공지 작성하기
          </Link>
        </div>
      ) : (
        <div className="bg-[#FFFDF0] border border-[#D9C97A]/50 rounded-xl overflow-hidden">
          {/* 테이블 헤더 */}
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center px-5 py-3 bg-[#FAF3D6] border-b border-[#D9C97A]/40 text-[#8C8070] text-xs font-semibold">
            <span>고정</span>
            <span>제목</span>
            <span>작성일</span>
            <span>관리</span>
          </div>

          {notices.map((notice) => (
            <div
              key={notice.id}
              className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center px-5 py-4 border-b border-[#D9C97A]/20 last:border-0 hover:bg-[#FAF3D6] transition-colors"
            >
              {/* 고정 여부 */}
              <span>
                {notice.is_pinned ? (
                  <Pin size={14} className="text-[#C4A84F]" />
                ) : (
                  <span className="w-[14px] block" />
                )}
              </span>

              {/* 제목 */}
              <Link
                href={`/admin/notices/${notice.id}/edit`}
                className="text-[#5C4A1E] text-sm font-medium hover:text-[#C4A84F] transition-colors truncate"
              >
                {notice.title}
              </Link>

              {/* 날짜 */}
              <span className="text-[#8C8070] text-xs flex-shrink-0">
                {new Date(notice.created_at).toLocaleDateString("ko-KR")}
              </span>

              {/* 관리 버튼 */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/admin/notices/${notice.id}/edit`}
                  className="inline-flex items-center gap-1 text-xs text-[#8C8070] hover:text-[#C4A84F] transition-colors px-2 py-1 rounded border border-[#D9C97A]/50 hover:border-[#C4A84F]"
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
