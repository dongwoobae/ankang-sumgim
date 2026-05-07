import Link from "next/link";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--ink-2)] text-[var(--line-2)]">
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* 브랜드 */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[var(--pop)] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-base font-bold">섬</span>
              </div>
              <div className="leading-snug">
                <p className="text-white font-bold text-base">
                  안강 섬김 노인복지센터
                </p>
              </div>
            </div>
            <p className="text-[var(--line-2)] text-sm font-medium leading-relaxed">
              &quot;사랑으로, 정성으로, 내 몸같이 섬김&quot;
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <a
                href="tel:054-763-5988"
                className="inline-flex items-center gap-2 bg-[var(--pop)] text-white px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-[var(--pop-2)] transition-colors duration-200 w-fit"
              >
                <Phone size={15} />
                054-763-5988
              </a>
              <a
                href="mailto:miyeong0695@daum.net"
                className="flex items-center gap-2 text-[var(--line-2)] text-sm hover:text-white transition-colors"
              >
                <Mail size={13} />
                miyeong0695@daum.net
              </a>
            </div>
          </div>

          {/* 구분선 */}
          <div className="hidden md:block md:col-span-1">
            <div className="h-full w-px bg-[var(--pop-2)]/40 mx-auto" />
          </div>

          {/* 오시는길 */}
          <div className="md:col-span-3">
            <h4 className="text-[var(--line-2)] font-semibold text-sm mb-4 flex items-center gap-2">
              <MapPin size={14} />
              오시는길
            </h4>
            <address className="not-italic text-sm text-[var(--line-2)] leading-relaxed">
              경상북도 경주시 안강읍
              <br />
              화전중앙길 53
            </address>
          </div>

          {/* 운영시간 */}
          <div className="md:col-span-4">
            <h4 className="text-[var(--line-2)] font-semibold text-sm mb-4 flex items-center gap-2">
              <Clock size={14} />
              운영시간
            </h4>
            <table className="text-sm text-[var(--line-2)] w-full">
              <tbody>
                <tr>
                  <td className="pr-4 pb-2 text-[var(--line-2)] font-medium">
                    월 – 금
                  </td>
                  <td className="pb-2">09:00 – 18:00</td>
                </tr>
                <tr>
                  <td className="pr-4 pb-2 text-[var(--line-2)] font-medium">토</td>
                  <td className="pb-2">09:00 – 14:00</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-[var(--muted)] mt-1">
              ※ 운영시간은 변경될 수 있습니다.
            </p>
          </div>
        </div>

        {/* 하단 바 */}
        <div className="border-t border-[var(--pop-2)]/30 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[var(--muted)]">
            © 2024 안강 섬김 노인복지센터. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-[var(--muted)] hover:text-[var(--line-2)] transition-colors"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/admin"
              className="text-xs text-[var(--muted)] hover:text-[var(--line-2)] transition-colors"
            >
              관리자 로그인
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
