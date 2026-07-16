"use client";

import { useState } from "react";
import Toolbar from "./Toolbar";
import AlbumCard from "./AlbumCard";
import { ImageIcon } from "lucide-react";

interface Album {
  id: number;
  title: string;
  coverUrl: string | null;
  photoCount: number;
  date: string;
}

export default function AlbumGrid({ albums }: { albums: Album[] }) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? albums.filter((a) => a.title.toLowerCase().includes(query.trim().toLowerCase()))
    : albums;

  return (
    <>
      <Toolbar
        chips={[{ label: "전체", value: "all", count: albums.length }]}
        defaultChip="all"
        searchPlaceholder="앨범 검색"
        onSearch={setQuery}
      />

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <ImageIcon size={40} className="mx-auto mb-3 text-line-2" />
          <p className="text-[15px]" style={{ color: "var(--muted)" }}>
            {query ? `"${query}"에 해당하는 앨범이 없습니다.` : "등록된 앨범이 없습니다."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((album, i) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              title={album.title}
              coverUrl={album.coverUrl}
              photoCount={album.photoCount}
              date={album.date}
              stagger={i}
            />
          ))}
        </div>
      )}
    </>
  );
}
