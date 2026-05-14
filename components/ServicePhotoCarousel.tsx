"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface ServiceGroup {
  label: string;
  items: string[];
  photos: string[]; // 3장 URL (없으면 placeholder)
}

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    label: "신체활동 지원",
    items: [
      "세면 도움",
      "구강 관리",
      "머리 감기기",
      "몸 청결 유지",
      "목욕 보조",
      "식사 도움",
      "체위 변경",
      "이동 보조",
    ],
    photos: [
      "https://pub-b7ac63154d17462da44c76addda6b6be.r2.dev/photos/categories/4/blurred/1778059706052-h7cowg848xg.webp",
      "https://pub-b7ac63154d17462da44c76addda6b6be.r2.dev/photos/categories/4/manual/1778059792549-z5mzwkqmkn.webp",
      "",
    ], // TODO: Supabase Storage URL로 교체
  },
  {
    label: "가사활동 지원",
    items: ["취사", "청소·주변 정돈", "세탁", "장보기", "외출 동행"],
    photos: [
      "https://pub-b7ac63154d17462da44c76addda6b6be.r2.dev/photos/categories/4/manual/1778059779198-0ac5rf1qymne.webp",
      "",
      "",
    ], // TODO: Supabase Storage URL로 교체
  },
  {
    label: "정서 지원",
    items: ["말벗·상담", "생활 상담", "의사소통 보조"],
    photos: [
      "https://pub-b7ac63154d17462da44c76addda6b6be.r2.dev/photos/categories/4/1778059735407-rmgwi9k1r3.webp",
      "",
      "",
    ], // TODO: Supabase Storage URL로 교체
  },
];

// 전체 9장을 평탄화한 인덱스 기준으로 관리
// 0~2: 신체활동, 3~5: 가사활동, 6~8: 정서지원
const TOTAL = 9;
const INTERVAL_MS = 3000;

function groupIndexFromPhoto(photoIndex: number) {
  return Math.floor(photoIndex / 3);
}

export default function ServicePhotoCarousel() {
  const [photoIndex, setPhotoIndex] = useState(0); // 0~8
  const [visible, setVisible] = useState(true); // opacity 제어
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFading = useRef(false);

  const activeGroup = groupIndexFromPhoto(photoIndex);
  const photoInGroup = photoIndex % 3;
  const currentPhoto = SERVICE_GROUPS[activeGroup].photos[photoInGroup];

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isFading.current) fadeToNext();
    }, INTERVAL_MS);
  }

  function fadeToNext(targetIndex?: number) {
    if (isFading.current) return;
    isFading.current = true;
    setVisible(false);
    setTimeout(() => {
      setPhotoIndex((prev) => {
        if (targetIndex !== undefined) return targetIndex;
        return (prev + 1) % TOTAL;
      });
      setVisible(true);
      isFading.current = false;
    }, 400); // fade out 400ms 후 사진 교체 + fade in
  }

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTabClick(groupIdx: number) {
    if (groupIdx === activeGroup) return;
    if (timerRef.current) clearInterval(timerRef.current);
    const targetIndex = groupIdx * 3;
    setVisible(false);
    setTimeout(() => {
      setPhotoIndex(targetIndex);
      setVisible(true);
      startTimer();
    }, 400);
  }

  return (
    <div className="w-full">
      {/* 탭 */}
      <div className="flex gap-8 mb-6">
        {SERVICE_GROUPS.map((group, i) => (
          <button
            key={i}
            onClick={() => handleTabClick(i)}
            className="text-sm font-medium pb-1 transition-all duration-200"
            style={{
              color: activeGroup === i ? "#1A56A0" : "#5A7A99",
              borderBottom:
                activeGroup === i
                  ? "2px solid #1A56A0"
                  : "2px solid transparent",
            }}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* 캐러셀 */}
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-[#EEF4FB]"
        style={{ aspectRatio: "16/9" }}
      >
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{ opacity: visible ? 1 : 0, transitionDuration: "400ms" }}
        >
          {currentPhoto ? (
            <Image
              src={currentPhoto}
              alt={`${SERVICE_GROUPS[activeGroup].label} 사진 ${photoInGroup + 1}`}
              fill
              className="object-cover"
              priority={photoIndex === 0}
            />
          ) : (
            // Placeholder
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#A8C4E0] rounded-2xl">
              <ImageIcon size={36} color="#A8C4E0" />
              <p className="text-[#5A7A99] text-sm font-medium">
                {SERVICE_GROUPS[activeGroup].label}
              </p>
              <p className="text-[#A8C4E0] text-xs">
                사진 {photoInGroup + 1} / 3
              </p>
            </div>
          )}
        </div>

        {/* 하단 인디케이터 — 그룹 내 3개 점 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === photoInGroup ? "20px" : "7px",
                height: "7px",
                background:
                  i === photoInGroup ? "#1A56A0" : "rgba(255,255,255,0.55)",
              }}
            />
          ))}
        </div>
      </div>

      {/* 서비스 항목 태그 */}
      <div className="mt-5 flex flex-wrap gap-2">
        {SERVICE_GROUPS[activeGroup].items.map((item, i) => (
          <span
            key={i}
            className="text-xs bg-[#FFFFFF] text-[#1A2E4A] px-3 py-1.5 rounded-full border border-[#A8C4E0]/60"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
