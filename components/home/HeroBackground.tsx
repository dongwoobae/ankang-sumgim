"use client";

type HeroBackgroundProps = {
  slides: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function HeroBackground({
  slides,
  activeIndex,
  onSelect,
}: HeroBackgroundProps) {
  return (
    <>
      {/* 캐러셀 */}
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center will-change-[opacity,transform]"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === activeIndex ? 1 : 0,
              transform: i === activeIndex ? "scale(1)" : "scale(1.06)",
              transition: "opacity 1.6s ease, transform 8s ease-out",
            }}
          />
        ))}
      </div>

      {/* 마스크 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(110deg, rgba(14,26,46,0.78) 0%, rgba(14,26,46,0.5) 45%, rgba(14,26,46,0.18) 100%), linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(14,26,46,0.6) 100%)",
        }}
        aria-hidden="true"
      />

      {/* 닷 인디케이터 */}
      <div className="absolute left-6 bottom-6 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            aria-label={`슬라이드 ${i + 1}`}
            className="block transition-all duration-300"
            style={{
              width: 32,
              height: i === activeIndex ? 3 : 2,
              background: i === activeIndex ? "#fff" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </>
  );
}
