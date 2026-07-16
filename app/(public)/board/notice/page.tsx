import { adminSupabase } from "@/lib/supabase/admin";
import { type Metadata } from "next";
import PageHero from "@/components/board/PageHero";
import NoticeList from "@/components/board/NoticeList";

export const metadata: Metadata = {
  title: "공지사항",
  description: "안강 섬김 노인복지센터의 최신 공지사항과 소식을 확인하세요.",
  openGraph: { url: "/board/notice" },
};

async function getNotices() {
  const { data } = await adminSupabase
    .from("notices")
    .select("id, title, content, is_pinned, created_at")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });
  // 목록은 미리보기·검색용 발췌만 필요 — 전체 본문 클라이언트 전송 방지(payload 축소)
  return (data ?? []).map((n) => ({
    ...n,
    content: n.content?.slice(0, 160) ?? "",
  }));
}

export const revalidate = false;

export default async function NoticePage() {
  const notices = await getNotices();

  return (
    <div>
      <PageHero
        eyebrow="NOTICE"
        title="공지사항"
        lead="센터의 새로운 소식과 안내사항을 전해드립니다."
        crumbs={[{ label: "홈", href: "/" }, { label: "게시판" }, { label: "공지사항" }]}
      />

      <section className="px-6 pb-24 pt-12">
        <div className="mx-auto max-w-[1200px]">
          <NoticeList notices={notices} />
        </div>
      </section>
    </div>
  );
}
