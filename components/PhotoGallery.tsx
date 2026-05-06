"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Photo = {
  id: number;
  url: string;
  caption: string | null;
  created_at: string;
};

type Props = {
  photos: Photo[];
  albumName: string;
};

export default function PhotoGallery({ photos, albumName }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isOpen = lightboxIndex !== null;
  const current = isOpen ? photos[lightboxIndex] : null;

  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + photos.length) % photos.length : null,
    );
  }, [photos.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));
  }, [photos.length]);

  const close = useCallback(() => setLightboxIndex(null), []);

  // 키보드 단축키
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, prev, next]);

  // 모달 열릴 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* 사진 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setLightboxIndex(i)}
            className="group rounded-2xl overflow-hidden border border-[#A8C4E0]/50 hover:border-[#1A56A0] hover:shadow-lg transition-all duration-300 text-left w-full"
          >
            <div className="w-full aspect-[4/3] relative bg-[#EEF4FB]">
              <Image
                src={photo.url}
                alt={photo.caption ?? albumName}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* hover 시 하단에서 올라오는 오버레이 */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3
                      translate-y-full group-hover:translate-y-0
                      transition-transform duration-300
                      bg-gradient-to-t from-black/60 to-transparent"
              >
                {photo.caption && (
                  <p className="text-white text-sm truncate">{photo.caption}</p>
                )}
                <p className="text-white/70 text-xs">
                  {new Date(photo.created_at).toLocaleDateString("ko-KR")}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 라이트박스 */}
      {isOpen && current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(10,20,40,0.92)" }}
          onClick={close}
        >
          {/* 닫기 */}
          <button
            onClick={close}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="닫기"
          >
            <X size={20} color="#fff" />
          </button>

          {/* 사진 카운터 */}
          <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIndex! + 1} / {photos.length}
          </p>

          {/* 이전 */}
          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
              aria-label="이전"
            >
              <ChevronLeft size={24} color="#fff" />
            </button>
          )}

          {/* 이미지 */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={current.url}
              src={current.url}
              alt={current.caption ?? albumName}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* 다음 */}
          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
              aria-label="다음"
            >
              <ChevronRight size={24} color="#fff" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
