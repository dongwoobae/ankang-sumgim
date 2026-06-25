"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import HeroBackground from "./HeroBackground";
import HeroStatsStrip from "./HeroStatsStrip";

interface Props {
  photos: string[];
}

const FALLBACK_SLIDES = [
  "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=2000&q=80",
  "https://images.unsplash.com/photo-1573511860302-28c524319d2a?w=2000&q=80",
  "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=2000&q=80",
  "https://images.unsplash.com/photo-1581579438747-104c53e7a4c1?w=2000&q=80",
  "https://images.unsplash.com/photo-1559131397-f94da358f7ca?w=2000&q=80",
];

export default function Hero({ photos }: Props) {
  const slides = photos.length > 0 ? photos : FALLBACK_SLIDES;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden text-white">
      <HeroBackground slides={slides} activeIndex={idx} onSelect={setIdx} />

      {/* 콘텐츠 */}
      <div className="relative z-[2] max-w-[1200px] mx-auto px-6 h-full grid grid-rows-[1fr_auto] items-end pt-[12vh] pb-[6vh]">
        <div>
          <Reveal variant="up-soft">
            <div className="inline-flex items-center gap-3 text-xs tracking-[0.32em] uppercase text-white/78 mb-[22px]">
              <span className="w-9 h-px bg-white/50" />
              ANKANG SUMGIM CARE CENTER
            </div>
          </Reveal>

          <Reveal variant="up-strong" stagger={1}>
            <h1
              className="m-0 mb-5 max-w-[18ch] leading-[1.1] font-extrabold"
              style={{ fontSize: "clamp(40px, 6.4vw, 84px)" }}
            >
              어르신의 일상을
              <br />
              <span
                className="px-[0.15em]"
                style={{
                  background:
                    "linear-gradient(transparent 62%, rgba(46,109,180,0.55) 62%)",
                }}
              >
                함께 섬깁니다
              </span>
            </h1>
          </Reveal>

          <Reveal variant="up-soft" stagger={2}>
            <p
              className="leading-[1.7] text-white/86 max-w-[46ch] mb-8"
              style={{ fontSize: "clamp(15px, 1.5vw, 18px)" }}
            >
              경주·안강·영천·포항 네 개 시군의 가정을 직접 방문해
              한 분 한 분의 소중한 일상을 정성껏 돌봐드립니다.
            </p>
          </Reveal>

          <Reveal variant="up-soft" stagger={3}>
            <div className="flex gap-3 flex-wrap items-center">
              <Link
                href="/board/photos"
                className="inline-flex items-center gap-2.5 px-[26px] py-4 rounded-full text-[15px] font-semibold bg-white text-[var(--ink-2)] transition-all hover:bg-[var(--pop)] hover:text-white hover:-translate-y-px"
              >
                센터 둘러보기 <span>→</span>
              </Link>
              <a
                href="tel:054-763-5988"
                className="inline-flex items-center gap-2.5 px-[26px] py-4 rounded-full text-[15px] font-semibold border-[1.5px] border-white/55 text-white transition-all hover:bg-white hover:text-[var(--ink-2)]"
              >
                <Phone size={16} /> 054-763-5988
              </a>
            </div>
          </Reveal>
        </div>

        {/* 하단 스트립 */}
        <HeroStatsStrip />
      </div>

      {/* SCROLL 인디케이터 */}
      <div
        className="absolute left-1/2 bottom-6 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5 text-[11px] tracking-[0.3em] uppercase text-white/70 pointer-events-none"
        aria-hidden="true"
        style={{ animation: "heroBounce 2.4s ease-in-out infinite" }}
      >
        SCROLL
        <span className="w-px h-9 bg-white/60" />
      </div>

      <style jsx>{`
        @keyframes heroBounce {
          0%,
          100% {
            transform: translate(-50%, 0);
          }
          50% {
            transform: translate(-50%, 6px);
          }
        }
      `}</style>
    </section>
  );
}
