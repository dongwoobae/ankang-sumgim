import Link from 'next/link'
import { Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#EEF4FB] text-[#C8B87A]">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* 브랜드 */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#1A56A0] flex items-center justify-center flex-shrink-0">
                <span className="text-[#FFFFFF] text-base font-bold" style={{ fontFamily: "'Noto Serif KR', serif" }}>섬</span>
              </div>
              <div className="leading-snug">
                <p className="text-[#EEF4FB] font-bold text-base" style={{ fontFamily: "'Noto Serif KR', serif" }}>안강 섬김 노인복지센터</p>
              </div>
            </div>
            <p className="text-[#5A7A99] text-sm leading-relaxed">
              어르신 한 분 한 분을 소중히 섬기며<br />
              따뜻한 돌봄을 실천합니다.
            </p>
            <div className="mt-5 inline-block">
              <a
                href="tel:054-763-5988"
                className="flex items-center gap-2 bg-[#1A56A0] text-[#3D2E0E] px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-[#2E6DB4] transition-colors duration-200"
              >
                <Phone size={15} />
                054-763-5988
              </a>
            </div>
          </div>

          {/* 구분선 */}
          <div className="hidden md:block md:col-span-1">
            <div className="h-full w-px bg-[#1A2E4A] mx-auto" />
          </div>

          {/* 오시는길 */}
          <div className="md:col-span-3">
            <h4 className="text-[#2E6DB4] font-semibold text-sm mb-4 flex items-center gap-2">
              <MapPin size={14} />
              오시는길
            </h4>
            <address className="not-italic text-sm text-[#5A7A99] leading-relaxed">
              경상북도 경주시 안강읍<br />
              화전중앙길 53
            </address>
            <p className="text-sm text-[#5A7A99] mt-2">054-763-5988</p>
          </div>

          {/* 운영시간 */}
          <div className="md:col-span-4">
            <h4 className="text-[#2E6DB4] font-semibold text-sm mb-4 flex items-center gap-2">
              <Clock size={14} />
              운영시간
            </h4>
            <table className="text-sm text-[#5A7A99] w-full">
              <tbody>
                <tr>
                  <td className="pr-4 pb-2 text-[#C8B87A]">월 – 금</td>
                  <td className="pb-2">09:00 – 18:00</td>
                </tr>
                <tr>
                  <td className="pr-4 pb-2 text-[#C8B87A]">토</td>
                  <td className="pb-2">09:00 – 14:00</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-[#1A2E4A] mt-1">※ 운영시간은 변경될 수 있습니다.</p>
          </div>
        </div>

        {/* 하단 바 */}
        <div className="border-t border-[#1A2E4A] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#1A2E4A]">
            © 2024 안강 섬김 노인복지센터. All rights reserved.
          </p>
          <Link
            href="/admin"
            className="text-xs text-[#1A2E4A] hover:text-[#5A7A99] transition-colors"
          >
            관리자 로그인
          </Link>
        </div>
      </div>
    </footer>
  )
}
