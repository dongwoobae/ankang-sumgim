// app/(public)/board/notice/[id]/page.tsx
// 기존 파일 상단 import 아래에 generateMetadata 추가

import type { Metadata } from "next";
import { adminSupabase } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pin, Calendar } from "lucide-react";

// ── 동적 metadata ─────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data } = await adminSupabase
    .from("notices")
    .select("title, content")
    .eq("id", id)
    .single();

  if (!data) return { title: "공지사항" };

  return {
    title: data.title,
    description: data.content.slice(0, 120).replace(/\n/g, " "),
    openGraph: {
      title: data.title,
      description: data.content.slice(0, 120).replace(/\n/g, " "),
      url: `/board/notice/${id}`,
    },
  };
}

// ── 데이터 조회 ───────────────────────────────────────────────
async function getNotice(id: string) {
  const { data } = await adminSupabase
    .from("notices")
    .select("id, title, content, is_pinned, created_at")
    .eq("id", id)
    .single();
  return data;
}

export const revalidate = 60;

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = await getNotice(id);
  if (!notice) notFound();

  return (
    <div>
      {/* 페이지 배너 */}
      <section
        style={{
          background: "linear-gradient(135deg, #EEF4FB 0%, #F0E4A8 100%)",
        }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
            BOARD
          </p>
          <h1
            className="text-[#1A2E4A] text-4xl font-bold"

          >
            공지사항
          </h1>
        </div>
      </section>

      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* 공지 헤더 */}
          <div className="border-b-2 border-[#1A2E4A] pb-6 mb-8">
            {notice.is_pinned && (
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-[#1A56A0] text-[#FFFFFF] px-2.5 py-1 rounded-full mb-3">
                <Pin size={10} />
                공지
              </span>
            )}
            <h2
              className="text-[#1A2E4A] text-2xl font-bold mb-4 leading-snug"
  
            >
              {notice.title}
            </h2>
            <div className="flex items-center gap-2 text-[#5A7A99] text-sm">
              <Calendar size={14} />
              {new Date(notice.created_at).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* 본문 */}
          <div className="text-[#1A2E4A] text-base leading-[2] whitespace-pre-wrap min-h-[400px]">
            {notice.content}
          </div>

          {/* 하단 목록 버튼 */}
          <div className="mt-12 pt-6 border-t border-[#A8C4E0]/40 flex justify-end">
            <Link
              href="/board/notice"
              className="inline-flex items-center gap-1.5 text-[#5A7A99] text-sm hover:text-[#1A56A0] transition-colors"
            >
              <ArrowLeft size={14} />
              목록으로
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
