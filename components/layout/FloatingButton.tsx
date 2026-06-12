"use client";

import { Phone, Music, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { TRACKS } from "@/lib/music.config";

function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#3C1E1E">
      <path d="M12 3C6.477 3 2 6.82 2 11.4c0 2.94 1.76 5.52 4.42 7.07L5.3 22l4.9-3.23c.57.09 1.18.14 1.8.14 5.523 0 10-3.82 10-8.51C22 6.82 17.523 3 12 3z" />
    </svg>
  );
}

export default function FloatingButton() {
  const [phoneHovered, setPhoneHovered] = useState(false);
  const [kakaoHovered, setKakaoHovered] = useState(false);
  const [musicHovered, setMusicHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 새 트랙 로드 후 재생 (트랙 전환·자동 다음 곡용)
  const loadAndPlay = (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = TRACKS[index].src;
    audio.play().catch(() => setPlaying(false));
    setPlaying(true);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      // src가 없으면 첫 재생, 있으면 정지된 위치에서 재개
      if (!audio.currentSrc) audio.src = TRACKS[currentIndex].src;
      audio.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  };

  const prevTrack = () => {
    const newIndex = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    setCurrentIndex(newIndex);
    loadAndPlay(newIndex);
  };

  const nextTrack = () => {
    const newIndex = (currentIndex + 1) % TRACKS.length;
    setCurrentIndex(newIndex);
    loadAndPlay(newIndex);
  };

  // onEnded를 JSX에 직접 달면 매 렌더마다 최신 currentIndex를 참조 → stale closure 없음
  const handleEnded = () => {
    const newIndex = (currentIndex + 1) % TRACKS.length;
    setCurrentIndex(newIndex);
    loadAndPlay(newIndex);
  };

  return (
    <>
      <audio ref={audioRef} onEnded={handleEnded} />
      <div className="fixed bottom-7 right-7 z-50 flex flex-col gap-3 items-end">

        {/* 음악 버튼 */}
        {playing ? (
          <div
            className="flex items-center rounded-full transition-all duration-300"
            style={{
              background: "#1A56A0",
              padding: "12px 16px",
              gap: "8px",
              boxShadow: "0 4px 20px rgba(26,86,160,0.4)",
            }}
          >
            <button onClick={prevTrack} aria-label="이전 곡" className="text-white">
              <ChevronLeft size={16} color="#FFFFFF" strokeWidth={2.5} />
            </button>
            <button onClick={toggleMusic} aria-label="음악 정지">
              <Music size={17} color="#FFFFFF" strokeWidth={2.2} />
            </button>
            <span className="text-white text-sm font-semibold max-w-[80px] truncate">
              {TRACKS[currentIndex].title}
            </span>
            <button onClick={nextTrack} aria-label="다음 곡">
              <ChevronRight size={16} color="#FFFFFF" strokeWidth={2.5} />
            </button>
          </div>
        ) : (
          <button
            onClick={toggleMusic}
            aria-label="음악 재생"
            onMouseEnter={() => setMusicHovered(true)}
            onMouseLeave={() => setMusicHovered(false)}
            className="flex items-center gap-2.5 rounded-full transition-all duration-300"
            style={{
              background: musicHovered ? "#dde6f5" : "#EEF3FA",
              padding: musicHovered ? "13px 22px" : "15px",
              boxShadow: "0 4px 16px rgba(26,46,74,0.15)",
            }}
          >
            <Music size={19} color="#1A2E4A" strokeWidth={2.2} />
            <span
              className="text-[#1A2E4A] text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300"
              style={{
                maxWidth: musicHovered ? "70px" : "0px",
                opacity: musicHovered ? 1 : 0,
              }}
            >
              음악 켜기
            </span>
          </button>
        )}

        {/* 카카오톡 채널 버튼 */}
        <a
          href="http://pf.kakao.com/_zqvxbX"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="카카오톡 상담"
          onMouseEnter={() => setKakaoHovered(true)}
          onMouseLeave={() => setKakaoHovered(false)}
          className="flex items-center gap-2.5 rounded-full transition-all duration-300"
          style={{
            background: kakaoHovered ? "#E6C200" : "#FEE500",
            padding: kakaoHovered ? "13px 22px" : "15px",
            boxShadow: "0 4px 16px rgba(254,229,0,0.5)",
          }}
        >
          <KakaoIcon />
          <span
            className="text-[#3C1E1E] text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300"
            style={{
              maxWidth: kakaoHovered ? "90px" : "0px",
              opacity: kakaoHovered ? 1 : 0,
            }}
          >
            카카오 상담
          </span>
        </a>

        {/* 전화 상담 버튼 */}
        <a
          href="tel:054-763-5988"
          aria-label="전화 상담"
          onMouseEnter={() => setPhoneHovered(true)}
          onMouseLeave={() => setPhoneHovered(false)}
          className="flex items-center gap-2.5 rounded-full transition-all duration-300"
          style={{
            background: phoneHovered ? "#1A2E4A" : "#1A56A0",
            padding: phoneHovered ? "13px 22px" : "15px",
            boxShadow: "0 4px 20px rgba(26,86,160,0.4)",
          }}
        >
          <Phone size={19} color="#FFFFFF" strokeWidth={2.2} />
          <span
            className="text-[#FFFFFF] text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300"
            style={{
              maxWidth: phoneHovered ? "90px" : "0px",
              opacity: phoneHovered ? 1 : 0,
            }}
          >
            전화 상담
          </span>
        </a>
      </div>
    </>
  );
}
