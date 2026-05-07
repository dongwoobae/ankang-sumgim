import { MapPin, Phone, Mail, Bus, Car, Clock } from "lucide-react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "오시는길",
  description:
    "안강 섬김 노인복지센터 위치 안내. 경상북도 경주시 안강읍 화전중앙길 53.",
  openGraph: { url: "/about/location" },
};

const transportInfo = [
  {
    icon: <Bus size={20} />,
    title: "버스 이용",
    items: [
      "안강버스터미널 하차 후 도보 약 10분",
      "경주·포항·영천 방면 시외버스 이용 가능",
    ],
  },
  {
    icon: <Car size={20} />,
    title: "자동차 이용",
    items: [
      "네비게이션: 경상북도 경주시 안강읍 화전중앙길 53",
      "경주IC → 안강 방면 20분",
      "포항IC → 안강 방면 25분",
    ],
  },
];

export default function LocationPage() {
  return (
    <div>
      {/* 페이지 배너 */}
      <section
        style={{
          background: "linear-gradient(135deg, #EEF4FB 0%, #F0E4A8 100%)",
        }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
            ABOUT US
          </p>
          <h1
            className="text-[#1A2E4A] text-4xl font-bold"
          >
            오시는길
          </h1>
          <p className="text-[#5A7A99] mt-3">
            찾아오시는 방법을 안내해 드립니다
          </p>
        </div>
      </section>

      {/* 지도 */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-2xl overflow-hidden border border-[#A8C4E0]/50 shadow-sm mb-12">
            <iframe
              src="https://maps.google.com/maps?q=경상북도+경주시+안강읍+화전중앙길+53&output=embed&hl=ko"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="안강 섬김 노인복지센터 지도"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* 연락처 정보 */}
            <div>
              <h2
                className="text-[#1A2E4A] text-xl font-bold mb-6"
              >
                연락처 정보
              </h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E8A020]/40 text-[#1A56A0] flex-shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <p className="text-[#5A7A99] text-xs mb-0.5">주소</p>
                    <p className="text-[#1A2E4A] font-medium">
                      경상북도 경주시 안강읍 화전중앙길 53
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E8A020]/40 text-[#1A56A0] flex-shrink-0 mt-0.5">
                    <Phone size={18} />
                  </span>
                  <div>
                    <p className="text-[#5A7A99] text-xs mb-0.5">전화</p>
                    <a
                      href="tel:054-763-5988"
                      className="text-[#1A2E4A] font-medium hover:text-[#1A56A0] transition-colors"
                    >
                      054-763-5988
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E8A020]/40 text-[#1A56A0] flex-shrink-0 mt-0.5">
                    <Mail size={18} />
                  </span>
                  <div>
                    <p className="text-[#5A7A99] text-xs mb-0.5">이메일</p>
                    <a
                      href="mailto:miyeong0695@daum.net"
                      className="text-[#1A2E4A] font-medium hover:text-[#1A56A0] transition-colors"
                    >
                      miyeong0695@daum.net
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E8A020]/40 text-[#1A56A0] flex-shrink-0 mt-0.5">
                    <Clock size={18} />
                  </span>
                  <div>
                    <p className="text-[#5A7A99] text-xs mb-0.5">운영시간</p>
                    <p className="text-[#1A2E4A] font-medium">
                      평일 09:00 – 18:00
                    </p>
                    <p className="text-[#1A2E4A] font-medium">
                      주말 09:00 – 14:00
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* 교통 안내 */}
            <div>
              <h2
                className="text-[#1A2E4A] text-xl font-bold mb-6"
              >
                교통 안내
              </h2>
              <div className="space-y-5">
                {transportInfo.map((t, i) => (
                  <div
                    key={i}
                    className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl p-5"
                  >
                    <div className="flex items-center gap-2 text-[#1A56A0] font-bold mb-3">
                      {t.icon}
                      {t.title}
                    </div>
                    <ul className="space-y-1.5">
                      {t.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-[#1A2E4A] text-sm"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#1A56A0] flex-shrink-0 mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
