"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";

// ✅ 실사진 준비되면 여기에 URL 추가
const photos: string[] = [
  // "https://your-supabase-url/storage/v1/object/public/hero/photo1.jpg",
  // "https://your-supabase-url/storage/v1/object/public/hero/photo2.jpg",
];

export default function HeroPhotoCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // 사진 없을 때 플레이스홀더
  if (photos.length === 0) {
    return (
      <div
        className="w-full h-[520px] rounded-2xl flex flex-col items-center justify-center gap-3"
        style={{
          background: "#EEF4FB",
          border: "2px dashed #A8C4E0",
        }}
      >
        <ImageIcon size={40} color="#A8C4E0" />
        <p className="text-[#5A7A99] text-sm">사진 준비 중</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden shadow-xl">
      {photos.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={src}
            alt={`센터 활동 사진 ${i + 1}`}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {photos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === current ? "#E8A020" : "rgba(255,255,255,0.6)",
              }}
              aria-label={`${i + 1}번 사진`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
