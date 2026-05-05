import { adminSupabase } from "@/lib/supabase/admin";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

async function getAlbums() {
  const { data } = await adminSupabase
    .from("photo_albums")
    .select("id, title, created_at, photos(id, url)")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export const revalidate = 60;

export default async function PhotosPage() {
  const albums = await getAlbums();

  return (
    <div>
      {/* 페이지 배너 */}
      <section
        style={{ background: "linear-gradient(135deg, #EEF4FB 0%, #F0E4A8 100%)" }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">BOARD</p>
          <h1
            className="text-[#1A2E4A] text-4xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            사진 게시판
          </h1>
          <p className="text-[#5A7A99] mt-3">안강 섬김의 따뜻한 활동 사진을 모았습니다</p>
        </div>
      </section>

      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          {albums.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon size={40} className="text-[#A8C4E0] mx-auto mb-3" />
              <p className="text-[#5A7A99] text-sm">등록된 사진이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {albums.map((album) => {
                const photos = (album.photos as { id: string; url: string }[]) ?? [];
                const thumb = photos[0]?.url ?? null;

                return (
                  <div
                    key={album.id}
                    className="group bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-2xl overflow-hidden hover:border-[#1A56A0] hover:shadow-lg transition-all duration-300"
                  >
                    {/* 썸네일 */}
                    <div className="w-full aspect-[4/3] relative bg-[#2E6DB422] border-b border-[#A8C4E0]/30">
                      {thumb ? (
                        <Image
                          src={thumb}
                          alt={album.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <ImageIcon
                            size={32}
                            className="text-[#1A56A0] mb-2"
                          />
                          <span className="text-[#5A7A99] text-xs">사진 없음</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3
                        className="text-[#1A2E4A] font-bold text-sm mb-1 leading-snug group-hover:text-[#1A56A0] transition-colors line-clamp-2"
                        style={{ fontFamily: "'Noto Serif KR', serif" }}
                      >
                        {album.title}
                      </h3>
                      <p className="text-[#5A7A99] text-xs">
                        사진 {photos.length}장 ·{" "}
                        {new Date(album.created_at).toLocaleDateString("ko-KR")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
