import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/common/Reveal";

interface Props {
  id: number;
  title: string;
  description?: string;
  coverUrl?: string | null;
  photoCount: number;
  date: string;
  stagger?: number;
}

export default function AlbumCard({
  id,
  title,
  description,
  coverUrl,
  photoCount,
  date,
  stagger = 0,
}: Props) {
  return (
    <Reveal stagger={stagger}>
      <Link
        href={`/board/photos/${id}`}
        className="group block overflow-hidden rounded-[20px] border bg-white transition-all duration-[350ms] hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(14,26,46,0.08)]"
        style={{ borderColor: "var(--line)" }}
      >
        {/* 커버 이미지 */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-[400ms] group-hover:scale-105"
              sizes="(min-width: 900px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "repeating-linear-gradient(45deg, var(--paper-3) 0 10px, #dde7f2 10px 20px)",
              }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, transparent 50%, rgba(14,26,46,0.7) 100%)",
            }}
          />
          <span
            className="absolute right-4 top-4 rounded-full px-3 py-1.5 text-[12px] font-semibold text-white backdrop-blur-md"
            style={{ background: "rgba(14,26,46,0.65)" }}
          >
            📷 {photoCount}장
          </span>
          <span className="absolute bottom-3.5 left-4 text-[12px] font-medium tracking-wide text-white opacity-90">
            {date}
          </span>
        </div>

        {/* 정보 */}
        <div className="p-6">
          <h3 className="mb-1.5 text-[19px] font-bold tracking-tight text-ink-2 transition-colors group-hover:text-pop">
            {title}
          </h3>
          {description && (
            <p className="m-0 line-clamp-2 text-[14px] leading-[1.55] text-muted">{description}</p>
          )}
          <span className="mt-3.5 inline-flex items-center gap-1 text-[13px] font-semibold text-pop">
            앨범 열기{" "}
            <span className="transition-transform duration-[250ms] group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
