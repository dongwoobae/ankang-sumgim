import { adminSupabase } from "@/lib/supabase/admin";
import { type Metadata } from "next";
import PageHero from "@/components/board/PageHero";
import AlbumGrid from "@/components/board/AlbumGrid";

export const metadata: Metadata = {
  title: "사진 게시판",
  description: "안강 섬김 노인복지센터의 활동 사진 모음입니다.",
  openGraph: { url: "/board/photos" },
};

async function getAlbums() {
  const { data } = await adminSupabase
    .from("photo_categories")
    .select("id, name, created_at, photos(id, url, created_at)")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export const revalidate = 60;

export default async function PhotosPage() {
  const albums = await getAlbums();

  const albumList = albums.map((album) => {
    const photos =
      (album.photos as { id: string; url: string; created_at: string }[]) ?? [];
    const sorted = [...photos].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    return {
      id: album.id,
      title: album.name,
      coverUrl: sorted[0]?.url ?? null,
      photoCount: photos.length,
      date: new Date(album.created_at).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
      }),
    };
  });

  return (
    <div>
      <PageHero
        eyebrow="PHOTO ALBUMS"
        title="활동 앨범"
        lead="어르신과 함께한 소중한 시간들을 행사·활동별 앨범으로 모았습니다."
        crumbs={[
          { label: "홈", href: "/" },
          { label: "게시판" },
          { label: "사진 게시판" },
        ]}
      />

      <section className="px-6 pb-24 pt-12">
        <div className="mx-auto max-w-[1200px]">
          <AlbumGrid albums={albumList} />
        </div>
      </section>
    </div>
  );
}
