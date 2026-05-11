"use client";

import { Phone } from "lucide-react";
import { useState } from "react";

// 카카오 공식 말풍선 아이콘 SVG
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

  return (
    <div className="fixed bottom-7 right-7 z-50 flex flex-col gap-3 items-end">
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
  );
}
