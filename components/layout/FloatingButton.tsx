"use client";

import { Phone, Music, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { TRACKS } from "@/lib/music.config";

type MusicStatus = "idle" | "playing" | "paused";

// hover 불가(터치) 기기 감지 — matchMedia는 외부 시스템이므로 store 구독으로 읽는다
function subscribeHoverNone(onChange: () => void) {
  const mql = window.matchMedia("(hover: none)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="#3C1E1E">
      <path d="M12 3C6.477 3 2 6.82 2 11.4c0 2.94 1.76 5.52 4.42 7.07L5.3 22l4.9-3.23c.57.09 1.18.14 1.8.14 5.523 0 10-3.82 10-8.51C22 6.82 17.523 3 12 3z" />
    </svg>
  );
}

export default function FloatingButton() {
  const [phoneHovered, setPhoneHovered] = useState(false);
  const [kakaoHovered, setKakaoHovered] = useState(false);
  const [musicHovered, setMusicHovered] = useState(false);
  const [musicTapped, setMusicTapped] = useState(false); // 터치: 탭하면 펼침
  const [status, setStatus] = useState<MusicStatus>("idle");
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const failCountRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // hover 불가(터치) 기기 → 펼침을 탭으로 제어 (SSR에서는 false)
  const isTouch = useSyncExternalStore(
    subscribeHoverNone,
    () => window.matchMedia("(hover: none)").matches,
    () => false,
  );

  // 데스크탑은 hover, 터치는 탭 상태로 펼침 결정
  const musicExpanded = isTouch ? musicTapped : musicHovered;

  // 터치: 일정 시간 뒤 자동 접힘 (상호작용 시 재호출로 연장)
  const scheduleCollapse = () => {
    if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    collapseTimerRef.current = setTimeout(() => setMusicTapped(false), 3500);
  };

  // 터치: 펼친 동안 바깥 탭/스크롤/터치무브 감지되면 즉시 접힘 (+ 무동작 시 자동 접힘)
  useEffect(() => {
    if (!isTouch || !musicTapped) return;
    scheduleCollapse();
    const collapse = () => setMusicTapped(false);
    const onOutside = (e: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        collapse();
      }
    };
    document.addEventListener("pointerdown", onOutside);
    // 스크롤/터치 이동은 바깥 동작으로 간주 → 즉시 접힘
    window.addEventListener("scroll", collapse, { passive: true });
    window.addEventListener("touchmove", collapse, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      window.removeEventListener("scroll", collapse);
      window.removeEventListener("touchmove", collapse);
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    };
  }, [isTouch, musicTapped]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = TRACKS[0].src;

    let cleanupListeners: (() => void) | undefined;

    audio
      .play()
      .then(() => setStatus("playing"))
      .catch(() => {
        // 브라우저 자동재생 차단 → 첫 상호작용(터치·클릭·스크롤 등) 시 재생.
        // 모바일 제스처(pointerdown/touchstart/touchend)까지 폭넓게 커버하고,
        // 한 번 발동되면 모든 리스너를 함께 제거한다.
        const events = [
          "pointerdown",
          "touchstart",
          "touchend",
          "click",
          "keydown",
          "scroll",
        ] as const;
        const handleFirstInteraction = () => {
          audio
            .play()
            .then(() => setStatus("playing"))
            .catch(() => {});
          events.forEach((e) => document.removeEventListener(e, handleFirstInteraction));
        };

        events.forEach((e) =>
          document.addEventListener(e, handleFirstInteraction, { passive: true }),
        );

        cleanupListeners = () => {
          events.forEach((e) => document.removeEventListener(e, handleFirstInteraction));
        };
      });

    return () => cleanupListeners?.();
  }, []);

  const loadAndPlay = (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentIndex(index);
    audio.src = TRACKS[index].src;
    audio
      .play()
      .then(() => {
        failCountRef.current = 0;
        setStatus("playing");
      })
      .catch((err) => {
        // 사용자 제스처로 호출되므로 자동재생 차단(NotAllowedError)은 거의 없음.
        // 그 외 실패는 깨진 트랙 → 다음 곡으로 자동 스킵.
        if (err?.name === "NotAllowedError") {
          setStatus("paused");
          return;
        }
        failCountRef.current += 1;
        if (failCountRef.current >= TRACKS.length) {
          // 모든 트랙이 로드 실패 → 무한루프 방지하고 멈춤
          failCountRef.current = 0;
          setStatus("paused");
          return;
        }
        loadAndPlay((index + 1) % TRACKS.length);
      });
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (status === "playing") {
      audio.pause();
      setStatus("paused");
    } else {
      // idle: useEffect에서 src 설정됨 / paused: 멈춘 위치에서 재개
      audio
        .play()
        .then(() => setStatus("playing"))
        .catch(() => {});
    }
  };

  const prevTrack = () => loadAndPlay((currentIndex - 1 + TRACKS.length) % TRACKS.length);
  const nextTrack = () => loadAndPlay((currentIndex + 1) % TRACKS.length);
  const handleEnded = () => loadAndPlay((currentIndex + 1) % TRACKS.length);

  return (
    <>
      <audio ref={audioRef} onEnded={handleEnded} />
      <div className="fixed bottom-[18px] right-[16px] z-50 flex flex-col gap-[10px] items-end md:bottom-7 md:right-7 md:gap-3">
        {/* 음악 버튼 — playing이든 아니든 hover 시에만 확장.
            hover 핸들러는 status가 바뀌어도 언마운트되지 않는 wrapper에 둔다
            (안쪽 요소가 remount되면 mouseleave를 놓쳐서 hover 상태가 굳음) */}
        <div
          ref={wrapperRef}
          onMouseEnter={() => {
            if (!isTouch) setMusicHovered(true);
          }}
          onMouseLeave={() => {
            if (!isTouch) setMusicHovered(false);
          }}
          onClick={() => {
            // 터치: 재생 중 접힌 상태에서 탭 → 펼침 (정지 아님)
            if (isTouch && status === "playing" && !musicTapped) setMusicTapped(true);
          }}
        >
          {status === "playing" ? (
            <div
              className="flex items-center rounded-full p-[11px] transition-all duration-300 md:px-[17px] md:py-[13px]"
              style={{
                background: "#1A56A0",
                gap: musicExpanded ? "8px" : "0px",
                boxShadow: "0 4px 20px rgba(26,86,160,0.4)",
              }}
            >
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxWidth: musicExpanded ? "26px" : "0px", opacity: musicExpanded ? 1 : 0 }}
              >
                <button
                  onClick={() => {
                    prevTrack();
                    if (isTouch) scheduleCollapse();
                  }}
                  aria-label="이전 곡"
                  className="p-1 cursor-pointer"
                >
                  <ChevronLeft size={16} color="#FFFFFF" strokeWidth={2.5} />
                </button>
              </div>

              <button
                onClick={() => {
                  // 터치: 접힌 상태의 탭은 wrapper가 펼침 처리 → 여기선 정지하지 않음
                  if (isTouch && !musicExpanded) return;
                  toggleMusic();
                  if (isTouch) setMusicTapped(false);
                }}
                aria-label="음악 정지"
                className="cursor-pointer"
              >
                {musicExpanded ? (
                  <Pause size={17} color="#FFFFFF" strokeWidth={2.2} />
                ) : (
                  <Music size={19} color="#FFFFFF" strokeWidth={2.2} />
                )}
              </button>

              <span
                className="block overflow-hidden transition-all duration-300"
                style={{ maxWidth: musicExpanded ? "80px" : "0px", opacity: musicExpanded ? 1 : 0 }}
              >
                <span className="marquee-track inline-flex flex-nowrap whitespace-nowrap text-white text-sm font-semibold">
                  <span className="px-2 whitespace-nowrap">{TRACKS[currentIndex].title}</span>
                  <span className="px-2 whitespace-nowrap" aria-hidden="true">
                    {TRACKS[currentIndex].title}
                  </span>
                </span>
              </span>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxWidth: musicExpanded ? "26px" : "0px", opacity: musicExpanded ? 1 : 0 }}
              >
                <button
                  onClick={() => {
                    nextTrack();
                    if (isTouch) scheduleCollapse();
                  }}
                  aria-label="다음 곡"
                  className="p-1 cursor-pointer"
                >
                  <ChevronRight size={16} color="#FFFFFF" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={toggleMusic}
              aria-label={status === "paused" ? "음악 이어듣기" : "음악 재생"}
              className={`flex items-center rounded-full p-[11px] transition-all duration-300 md:py-[13px] ${musicExpanded ? "md:px-[22px]" : "md:px-[17px]"}`}
              style={{
                background: musicExpanded ? "#dde6f5" : status === "paused" ? "#dde6f5" : "#EEF3FA",
                gap: musicExpanded ? "10px" : "0px",
                boxShadow: "0 4px 16px rgba(26,46,74,0.15)",
              }}
            >
              <Music size={19} color="#1A2E4A" strokeWidth={2.2} />
              <span
                className="text-[#1A2E4A] text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300"
                style={{
                  maxWidth: musicExpanded ? "70px" : "0px",
                  opacity: musicExpanded ? 1 : 0,
                }}
              >
                {status === "paused" ? "이어듣기" : "음악 켜기"}
              </span>
            </button>
          )}
        </div>

        {/* 카카오톡 채널 버튼 */}
        <a
          href="http://pf.kakao.com/_zqvxbX"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="카카오톡 상담"
          onMouseEnter={() => setKakaoHovered(true)}
          onMouseLeave={() => setKakaoHovered(false)}
          className={`flex items-center rounded-full p-[11px] transition-all duration-300 md:py-[13px] ${kakaoHovered ? "md:px-[22px]" : "md:px-[17px]"}`}
          style={{
            background: kakaoHovered ? "#E6C200" : "#FEE500",
            gap: kakaoHovered ? "10px" : "0px",
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
          className={`flex items-center rounded-full p-[11px] transition-all duration-300 md:py-[13px] ${phoneHovered ? "md:px-[22px]" : "md:px-[17px]"}`}
          style={{
            background: phoneHovered ? "#1A2E4A" : "#1A56A0",
            gap: phoneHovered ? "10px" : "0px",
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
