import type { Metadata } from "next";
import { adminSupabase } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/board/PageHero";
import Reveal from "@/components/common/Reveal";

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

async function getNotice(id: string) {
  const { data } = await adminSupabase
    .from("notices")
    .select("id, title, content, is_pinned, created_at")
    .eq("id", id)
    .single();
  return data;
}

async function getPrevNext(id: number) {
  const [{ data: prevData }, { data: nextData }] = await Promise.all([
    adminSupabase
      .from("notices")
      .select("id, title, created_at")
      .lt("id", id)
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle(),
    adminSupabase
      .from("notices")
      .select("id, title, created_at")
      .gt("id", id)
      .order("id", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);
  return { prev: prevData, next: nextData };
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

  const { prev, next } = await getPrevNext(notice.id);

  const dateStr = new Date(notice.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <PageHero
        title="공지사항"
        crumbs={[
          { label: "홈", href: "/" },
          { label: "게시판" },
          { label: "공지사항", href: "/board/notice" },
          { label: "글 보기" },
        ]}
      />

      <section className="px-6 pb-24 pt-0">
        <div className="mx-auto max-w-[1200px]">

          {/* 포스트 헤더 */}
          <Reveal>
            <div
              className="mb-10 border-b pb-9"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="mb-4 flex gap-2">
                {notice.is_pinned && (
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-semibold text-white"
                    style={{ background: "var(--pop)" }}
                  >
                    📌 고정
                  </span>
                )}
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-semibold"
                  style={{
                    background: "var(--paper-3)",
                    color: "var(--pop)",
                  }}
                >
                  공지사항
                </span>
              </div>

              <h1
                className="mb-5 font-extrabold leading-[1.2]"
                style={{
                  fontSize: "clamp(28px, 3.6vw, 42px)",
                  letterSpacing: "-0.03em",
                  color: "var(--ink-2)",
                }}
              >
                {notice.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-[13px]" style={{ color: "var(--muted)" }}>
                <span className="inline-flex items-center gap-1.5">📅 {dateStr}</span>
                <span className="inline-flex items-center gap-1.5">✏️ 관리자</span>
              </div>
            </div>
          </Reveal>

          {/* 본문 */}
          <Reveal stagger={1}>
            <div
              className="prose-board min-h-[400px] max-w-[760px] text-[16px] whitespace-pre-wrap"
              style={{ color: "var(--ink-2)" }}
            >
              {notice.content}
            </div>
          </Reveal>

          {/* 하단 버튼 */}
          <Reveal stagger={2}>
            <div
              className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t pt-7"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="flex gap-2">
                <Link href="/board/notice" className="btn-outline">
                  ← 목록으로
                </Link>
              </div>
              <Link href="/inquiry" className="btn-primary-pill">
                상담 문의 →
              </Link>
            </div>
          </Reveal>

          {/* 이전/다음 */}
          {(prev || next) && (
            <Reveal stagger={3}>
              <div
                className="mt-10 overflow-hidden rounded-2xl border"
                style={{ borderColor: "var(--line)" }}
              >
                {next && (
                  <Link
                    href={`/board/notice/${next.id}`}
                    className="group grid items-center gap-5 px-6 py-5 transition-colors hover:bg-paper-2"
                    style={{
                      gridTemplateColumns: "80px 1fr auto",
                      borderBottom: prev ? `1px solid var(--line)` : undefined,
                    }}
                  >
                    <span
                      className="text-[11px] font-bold uppercase tracking-widest"
                      style={{ color: "var(--muted)" }}
                    >
                      ▲ 이전
                    </span>
                    <span
                      className="text-[15px] font-medium transition-colors group-hover:text-pop"
                      style={{ color: "var(--ink-2)" }}
                    >
                      {next.title}
                    </span>
                    <span
                      className="font-mono text-[12px]"
                      style={{ color: "var(--muted)" }}
                    >
                      {new Date(next.created_at).toLocaleDateString("ko-KR")}
                    </span>
                  </Link>
                )}
                {prev && (
                  <Link
                    href={`/board/notice/${prev.id}`}
                    className="group grid items-center gap-5 px-6 py-5 transition-colors hover:bg-paper-2"
                    style={{ gridTemplateColumns: "80px 1fr auto" }}
                  >
                    <span
                      className="text-[11px] font-bold uppercase tracking-widest"
                      style={{ color: "var(--muted)" }}
                    >
                      ▼ 다음
                    </span>
                    <span
                      className="text-[15px] font-medium transition-colors group-hover:text-pop"
                      style={{ color: "var(--ink-2)" }}
                    >
                      {prev.title}
                    </span>
                    <span
                      className="font-mono text-[12px]"
                      style={{ color: "var(--muted)" }}
                    >
                      {new Date(prev.created_at).toLocaleDateString("ko-KR")}
                    </span>
                  </Link>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}
