"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Photo = {
  id: number;
  url: string;
  original_url: string | null;
  is_face_blurred: boolean;
  caption: string | null;
  created_at: string;
};

type Props = {
  photos: Photo[];
  albumName: string;
};

function displayUrl(photo: Photo): string {
  if (!photo.is_face_blurred && photo.original_url) {
    return photo.original_url;
  }
  return photo.url;
}

export default function PhotoGallery({ photos, albumName }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Tab") {
        const f = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!f || f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, prev, next]);

  // 라이트박스 열림 시 포커스 이동, 닫힘 시 복원
  useEffect(() => {
    if (!isOpen) return;
    lastFocusedRef.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();
    return () => {
      lastFocusedRef.current?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4 [&>*]:break-inside-avoid">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group relative mb-4 block w-full cursor-pointer overflow-hidden rounded-xl transition-all duration-[350ms] hover:z-[2] hover:scale-[1.02] hover:shadow-[0_18px_40px_rgba(14,26,46,0.08)]"
          >
            <Image
              src={displayUrl(photo)}
              alt={photo.caption ?? albumName}
              width={800}
              height={600}
              sizes="(min-width: 1100px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="block h-auto w-full"
            />
            {photo.caption && (
              <span
                className="absolute inset-x-0 bottom-0 translate-y-2 px-4 pb-3 pt-8 text-[13px] font-medium text-white opacity-0 transition-all duration-[250ms] group-hover:translate-y-0 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(14,26,46,0.7) 100%)",
                }}
              >
                {photo.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && current && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${albumName} 사진 확대 보기`}
          tabIndex={-1}
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: "rgba(8,14,26,0.92)", backdropFilter: "blur(8px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-[18px]">
            <div className="flex items-center gap-[18px]">
              <b className="text-[16px] font-semibold text-white">{albumName}</b>
              <span className="font-mono text-[13px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                {(lightboxIndex ?? 0) + 1} / {photos.length}
              </span>
            </div>
            <button
              onClick={close}
              aria-label="닫기"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.1)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)")
              }
            >
              <X size={18} />
            </button>
          </div>

          {/* Stage */}
          <div className="relative flex flex-1 items-center justify-center px-2 md:px-20">
            {photos.length > 1 && (
              <button
                onClick={prev}
                aria-label="이전"
                className="absolute left-4 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-0 text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.1)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)")
                }
              >
                <ChevronLeft size={26} />
              </button>
            )}

            <div
              className="relative flex max-h-full max-w-full items-center justify-center"
              style={{ width: "min(900px, 85vw)", height: "calc(100vh - 200px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={displayUrl(current)}
                src={displayUrl(current)}
                alt={current.caption ?? albumName}
                fill
                className="rounded-lg object-contain"
                sizes="(min-width: 900px) 900px, 85vw"
                priority
              />
            </div>

            {photos.length > 1 && (
              <button
                onClick={next}
                aria-label="다음"
                className="absolute right-4 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-0 text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.1)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)")
                }
              >
                <ChevronRight size={26} />
              </button>
            )}
          </div>

          {/* Footer: caption + thumbnail strip */}
          <div className="px-6 pb-6 pt-[18px]">
            {current.caption && (
              <div
                className="mb-3.5 text-center text-[14px]"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {current.caption}
              </div>
            )}
            <div className="flex justify-center gap-1.5 overflow-x-auto pb-1">
              {photos.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className={`h-11 w-[60px] flex-shrink-0 cursor-pointer overflow-hidden rounded border-2 transition-all ${
                    i === lightboxIndex
                      ? "border-white opacity-100"
                      : "border-transparent opacity-50 hover:-translate-y-0.5 hover:opacity-85"
                  }`}
                >
                  <Image
                    src={displayUrl(p)}
                    alt=""
                    width={120}
                    height={88}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
