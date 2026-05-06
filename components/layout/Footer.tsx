import Link from "next/link";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A2E4A] text-[#A8C4E0]">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* 브랜드 */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E8A020] flex items-center justify-center flex-shrink-0">
                <span
                  className="text-[#FFFFFF] text-base font-bold"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  섬
                </span>
              </div>
              <div className="leading-snug">
                <p
                  className="text-[#FFFFFF] font-bold text-base"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  안강 섬김 노인복지센터
                </p>
              </div>
            </div>
            <p
              className="text-[#E8A020] text-sm font-medium leading-relaxed"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              &quot;사랑으로, 정성으로, 내 몸같이 섬김&quot;
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <a
                href="tel:054-763-5988"
                className="inline-flex items-center gap-2 bg-[#E8A020] text-[#FFFFFF] px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-[#1A56A0] transition-colors duration-200 w-fit"
              >
                <Phone size={15} />
                054-763-5988
              </a>
              <a
                href="mailto:miyeong0695@daum.net"
                className="flex items-center gap-2 text-[#A8C4E0] text-sm hover:text-[#FFFFFF] transition-colors"
              >
                <Mail size={13} />
                miyeong0695@daum.net
              </a>
            </div>
          </div>

          {/* 구분선 */}
          <div className="hidden md:block md:col-span-1">
            <div className="h-full w-px bg-[#E8A020]/40 mx-auto" />
          </div>

          {/* 오시는길 */}
          <div className="md:col-span-3">
            <h4 className="text-[#E8A020] font-semibold text-sm mb-4 flex items-center gap-2">
              <MapPin size={14} />
              오시는길
            </h4>
            <address className="not-italic text-sm text-[#A8C4E0] leading-relaxed">
              경상북도 경주시 안강읍
              <br />
              화전중앙길 53
            </address>
          </div>

          {/* 운영시간 */}
          <div className="md:col-span-4">
            <h4 className="text-[#E8A020] font-semibold text-sm mb-4 flex items-center gap-2">
              <Clock size={14} />
              운영시간
            </h4>
            <table className="text-sm text-[#A8C4E0] w-full">
              <tbody>
                <tr>
                  <td className="pr-4 pb-2 text-[#E8A020] font-medium">
                    월 – 금
                  </td>
                  <td className="pb-2">09:00 – 18:00</td>
                </tr>
                <tr>
                  <td className="pr-4 pb-2 text-[#E8A020] font-medium">토</td>
                  <td className="pb-2">09:00 – 14:00</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-[#5A7A99] mt-1">
              ※ 운영시간은 변경될 수 있습니다.
            </p>
          </div>
        </div>

        {/* 하단 바 */}
        <div className="border-t border-[#E8A020]/30 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#5A7A99]">
            © 2024 안강 섬김 노인복지센터. All rights reserved.
          </p>
          <Link
            href="/admin"
            className="text-xs text-[#5A7A99] hover:text-[#A8C4E0] transition-colors"
          >
            관리자 로그인
          </Link>
        </div>
      </div>
    </footer>
  );
}
