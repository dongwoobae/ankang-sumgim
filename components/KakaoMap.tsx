"use client";

import { useEffect, useRef, useState } from "react";

const ADDRESS = "경상북도 경주시 안강읍 화전중앙길 53";
const GOOGLE_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;

export default function KakaoMap() {
  const [failed, setFailed] = useState(false);
  const okRef = useRef(false);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data === "kakaomap-ok") okRef.current = true;
      else if (e.data === "kakaomap-fail") setFailed(true);
    }
    window.addEventListener("message", onMessage);
    // 4초 내 성공 신호 없으면 구글맵으로 폴백
    const timer = setTimeout(() => {
      if (!okRef.current) setFailed(true);
    }, 4000);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
    };
  }, []);

  return (
    <iframe
      src={failed ? GOOGLE_SRC : "/map.html"}
      width="100%"
      className="aspect-video w-full sm:aspect-auto sm:h-[420px]"
      style={{ border: 0, display: "block" }}
      title="안강 섬김 노인복지센터 위치 지도"
      loading="lazy"
    />
  );
}
