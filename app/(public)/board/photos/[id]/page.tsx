import type { Metadata } from "next";
import { adminSupabase } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import PhotoGallery from "@/components/PhotoGallery";
import PageHero from "@/components/board/PageHero";
import Reveal from "@/components/common/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data } = await adminSupabase
    .from("photo_categories")
    .select("name")
    .eq("id", id)
    .single();
  return {
    title: data?.name ?? "사진 게시판",
    description: `안강 섬김 노인복지센터 ${data?.name ?? ""} 앨범입니다.`,
    openGraph: { url: `/board/photos/${id}` },
  };
}

async function getAlbum(id: string) {
  const { data } = await adminSupabase
    .from("photo_categories")
    .select(
      "id, name, created_at, photos(id, url, original_url, is_face_blurred, caption, created_at)",
    )
    .eq("id", id)
    .single();
  return data;
}

export const revalidate = false;

export default async function PhotoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();
  const album = await getAlbum(id);
  if (!album) notFound();

  const photos = (
    (album.photos as {
      id: number;
      url: string;
      original_url: string | null;
      is_face_blurred: boolean;
      caption: string | null;
      created_at: string;
    }[]) ?? []
  ).map((p) => ({
    ...p,
    // 블러 사진은 원본 URL을 클라이언트로 보내지 않음 (블러 우회 차단)
    original_url: p.is_face_blurred ? null : p.original_url,
  }));

  const dateStr = new Date(album.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <PageHero
        eyebrow="ALBUM"
        title={album.name}
        crumbs={[
          { label: "홈", href: "/" },
          { label: "게시판" },
          { label: "사진 게시판", href: "/board/photos" },
          { label: album.name },
        ]}
        meta={
          <>
            <span className="inline-flex items-center gap-1.5">📅 {dateStr}</span>
            <span className="inline-flex items-center gap-1.5">📷 {photos.length}장</span>
          </>
        }
      />

      <section className="px-6 pb-24 pt-10">
        <div className="mx-auto max-w-[1200px]">
          {photos.length === 0 ? (
            <div className="py-16 text-center">
              <ImageIcon size={40} className="mx-auto mb-3 text-line-2" />
              <p className="text-[15px]" style={{ color: "var(--muted)" }}>
                등록된 사진이 없습니다.
              </p>
            </div>
          ) : (
            <PhotoGallery photos={photos} albumName={album.name} />
          )}

          <Reveal stagger={1}>
            <div
              className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t pt-7"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="flex gap-2">
                <Link href="/board/photos" className="btn-outline">
                  ← 앨범 목록
                </Link>
              </div>
              <Link href="/inquiry" className="btn-primary-pill">
                상담 문의 →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
