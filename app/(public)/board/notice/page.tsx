import Link from "next/link";
import { adminSupabase } from "@/lib/supabase/admin";
import { ChevronRight, Pin } from "lucide-react";

async function getNotices() {
  const { data } = await adminSupabase
    .from("notices")
    .select("id, title, is_pinned, created_at")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });
  return data ?? [];
}

export const revalidate = 60;

export default async function NoticePage() {
  const notices = await getNotices();
  const pinned = notices.filter((n) => n.is_pinned);
  const regular = notices.filter((n) => !n.is_pinned);

  return (
    <div>
      {/* 페이지 배너 */}
      <section
        style={{ background: "linear-gradient(135deg, #FAF3D6 0%, #F0E4A8 100%)" }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#C4A84F] text-sm font-semibold tracking-widest mb-2">BOARD</p>
          <h1
            className="text-[#5C4A1E] text-4xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            공지사항
          </h1>
          <p className="text-[#8C8070] mt-3">센터의 새로운 소식과 공지를 전합니다</p>
        </div>
      </section>

      <section className="bg-[#FFFDF0] py-20">
        <div className="max-w-5xl mx-auto px-6">
          {notices.length === 0 ? (
            <p className="text-center text-[#8C8070] py-16">등록된 공지사항이 없습니다.</p>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-[1fr_auto] border-b-2 border-[#5C4A1E] pb-3 mb-0 text-[#5C4A1E] text-sm font-bold px-4">
                <span>제목</span>
                <span>날짜</span>
              </div>

              {pinned.map((notice) => (
                <Link
                  key={notice.id}
                  href={`/board/notice/${notice.id}`}
                  className="flex items-center justify-between py-4 px-4 border-b border-[#D9C97A]/40 hover:bg-[#FAF3D6] rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="flex-shrink-0 inline-flex items-center gap-1 text-[10px] font-bold bg-[#C4A84F] text-[#FFFDF0] px-2 py-0.5 rounded-full">
                      <Pin size={9} />
                      공지
                    </span>
                    <span className="text-[#5C4A1E] text-sm font-medium group-hover:text-[#C4A84F] transition-colors truncate">
                      {notice.title}
                    </span>
                  </div>
                  <span className="text-[#8C8070] text-xs flex-shrink-0 ml-4">
                    {new Date(notice.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </Link>
              ))}

              {regular.map((notice) => (
                <Link
                  key={notice.id}
                  href={`/board/notice/${notice.id}`}
                  className="flex items-center justify-between py-4 px-4 border-b border-[#D9C97A]/30 hover:bg-[#FAF3D6] rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <ChevronRight
                      size={14}
                      className="text-[#D9C97A] flex-shrink-0 group-hover:text-[#C4A84F] transition-colors"
                    />
                    <span className="text-[#5C4A1E] text-sm group-hover:text-[#C4A84F] transition-colors truncate">
                      {notice.title}
                    </span>
                  </div>
                  <span className="text-[#8C8070] text-xs flex-shrink-0 ml-4">
                    {new Date(notice.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </Link>
              ))}

              <p className="text-[#8C8070] text-xs text-right mt-4">총 {notices.length}건</p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
