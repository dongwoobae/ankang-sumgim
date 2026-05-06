// app/(public)/board/photos/[id]/page.tsx
// 변경점: 사진 그리드를 PhotoGallery 클라이언트 컴포넌트로 교체

import { adminSupabase } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PhotoGallery from "@/components/PhotoGallery";

async function getAlbum(id: string) {
  const { data } = await adminSupabase
    .from("photo_categories")
    .select("id, name, created_at, photos(id, url, caption, created_at)")
    .eq("id", id)
    .single();
  return data;
}

export const revalidate = 60;

export default async function PhotoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const album = await getAlbum(id);
  if (!album) notFound();

  const photos =
    (album.photos as {
      id: number;
      url: string;
      caption: string | null;
      created_at: string;
    }[]) ?? [];

  return (
    <div>
      {/* 배너 */}
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
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            {album.name}
          </h1>
          <p className="text-[#5A7A99] mt-3">
            사진 {photos.length}장{" "}
            {/* {new Date(album.created_at).toLocaleDateString("ko-KR")} */}
          </p>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          {photos.length === 0 ? (
            <p className="text-center text-[#5A7A99] py-16">
              등록된 사진이 없습니다.
            </p>
          ) : (
            <PhotoGallery photos={photos} albumName={album.name} />
          )}

          <div className="mt-12 pt-6 border-t border-[#A8C4E0]/40 flex justify-end">
            <Link
              href="/board/photos"
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
