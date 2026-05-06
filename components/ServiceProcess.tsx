// components/ServiceProcess.tsx
// 각 서비스 페이지에서 steps props를 주입해서 사용
// iconKey는 아래 ICONS 맵에 정의된 키 중 하나를 사용

type Step = {
  iconKey: keyof typeof ICONS;
  title: string;
  desc: string;
};

type Props = {
  steps: Step[];
  title?: string;
};

// ─── 플랫 일러스트 SVG 모음 ───────────────────────────────────
const ICONS = {
  // 📞 상담문의 — 전화기 + 말풍선
  inquiry: (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
    >
      <circle cx="40" cy="40" r="40" fill="#EEF4FB" />
      {/* 말풍선 배경 */}
      <rect x="30" y="18" width="30" height="22" rx="5" fill="#A8C4E0" />
      <polygon points="38,40 44,40 41,46" fill="#A8C4E0" />
      {/* 말풍선 텍스트 선 */}
      <rect x="35" y="24" width="20" height="3" rx="1.5" fill="#1A56A0" />
      <rect x="35" y="30" width="14" height="3" rx="1.5" fill="#1A56A0" />
      {/* 전화기 몸체 */}
      <rect x="18" y="38" width="22" height="16" rx="4" fill="#1A56A0" />
      {/* 수화기 */}
      <path
        d="M22 42 Q26 38 30 42"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="22" cy="43" r="2.5" fill="#FFFFFF" />
      <circle cx="30" cy="43" r="2.5" fill="#FFFFFF" />
      {/* 다이얼 버튼 */}
      <rect x="22" y="48" width="4" height="2.5" rx="1" fill="#A8C4E0" />
      <rect x="27" y="48" width="4" height="2.5" rx="1" fill="#A8C4E0" />
      <rect x="32" y="48" width="4" height="2.5" rx="1" fill="#A8C4E0" />
    </svg>
  ),

  // 📋 등급·신청서 제출 — 서류 + 펜
  gradeApply: (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
    >
      <circle cx="40" cy="40" r="40" fill="#EEF4FB" />
      {/* 서류 */}
      <rect
        x="20"
        y="16"
        width="32"
        height="42"
        rx="4"
        fill="#FFFFFF"
        stroke="#A8C4E0"
        strokeWidth="2"
      />
      {/* 줄 */}
      <rect x="26" y="25" width="20" height="2.5" rx="1.2" fill="#A8C4E0" />
      <rect x="26" y="31" width="20" height="2.5" rx="1.2" fill="#A8C4E0" />
      <rect x="26" y="37" width="14" height="2.5" rx="1.2" fill="#A8C4E0" />
      {/* 체크박스 */}
      <rect
        x="26"
        y="43"
        width="6"
        height="6"
        rx="1.5"
        fill="#EEF4FB"
        stroke="#1A56A0"
        strokeWidth="1.5"
      />
      <path
        d="M27.5 46 L29 47.5 L32 44"
        stroke="#1A56A0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* 펜 */}
      <rect
        x="50"
        y="48"
        width="5"
        height="14"
        rx="2"
        transform="rotate(-40 50 48)"
        fill="#1A56A0"
      />
      <polygon points="50,56 54,52 57,58" fill="#2E6DB4" />
      <rect
        x="48"
        y="58"
        width="6"
        height="2"
        rx="1"
        transform="rotate(-40 48 58)"
        fill="#A8C4E0"
      />
    </svg>
  ),

  // 🚪 방문조사 — 집 + 사람
  visitCheck: (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
    >
      <circle cx="40" cy="40" r="40" fill="#EEF4FB" />
      {/* 집 */}
      <polygon points="40,16 62,34 18,34" fill="#1A56A0" />
      <rect x="22" y="34" width="36" height="24" rx="2" fill="#2E6DB4" />
      {/* 문 */}
      <rect x="33" y="44" width="14" height="14" rx="2" fill="#1A2E4A" />
      <circle cx="44" cy="51" r="1.5" fill="#A8C4E0" />
      {/* 창문 */}
      <rect x="24" y="38" width="9" height="8" rx="1.5" fill="#EEF4FB" />
      <rect x="47" y="38" width="9" height="8" rx="1.5" fill="#EEF4FB" />
      {/* 사람 실루엣 */}
      <circle cx="58" cy="28" r="4" fill="#A8C4E0" />
      <path d="M54 42 Q58 36 62 42" fill="#A8C4E0" />
    </svg>
  ),

  // ✅ 등급판정 — 클립보드 + 체크
  gradeJudgment: (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
    >
      <circle cx="40" cy="40" r="40" fill="#EEF4FB" />
      {/* 클립보드 */}
      <rect
        x="22"
        y="22"
        width="36"
        height="44"
        rx="4"
        fill="#FFFFFF"
        stroke="#A8C4E0"
        strokeWidth="2"
      />
      <rect x="33" y="18" width="14" height="9" rx="3" fill="#1A56A0" />
      <rect x="36" y="17" width="8" height="5" rx="2" fill="#2E6DB4" />
      {/* 등급 배지 */}
      <circle
        cx="40"
        cy="44"
        r="13"
        fill="#EEF4FB"
        stroke="#1A56A0"
        strokeWidth="2"
      />
      {/* 큰 체크 */}
      <path
        d="M33 44 L38 49 L48 38"
        stroke="#1A56A0"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),

  // 🤝 계약체결 — 악수
  contract: (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
    >
      <circle cx="40" cy="40" r="40" fill="#EEF4FB" />
      {/* 왼손 */}
      <rect x="14" y="36" width="26" height="10" rx="5" fill="#1A56A0" />
      {/* 손가락들 왼쪽 */}
      <rect x="16" y="28" width="6" height="12" rx="3" fill="#1A56A0" />
      <rect x="23" y="26" width="6" height="13" rx="3" fill="#1A56A0" />
      <rect x="30" y="28" width="6" height="11" rx="3" fill="#1A56A0" />
      {/* 오른손 */}
      <rect x="40" y="36" width="26" height="10" rx="5" fill="#2E6DB4" />
      {/* 손가락들 오른쪽 */}
      <rect x="58" y="28" width="6" height="12" rx="3" fill="#2E6DB4" />
      <rect x="51" y="26" width="6" height="13" rx="3" fill="#2E6DB4" />
      <rect x="44" y="28" width="6" height="11" rx="3" fill="#2E6DB4" />
      {/* 중앙 연결 */}
      <ellipse cx="40" cy="41" rx="8" ry="7" fill="#A8C4E0" />
      {/* 별 / 강조 */}
      <circle cx="40" cy="22" r="4" fill="#E8D48B" />
      <path
        d="M40 18 L41 21 L44 21 L41.5 23 L42.5 26 L40 24.5 L37.5 26 L38.5 23 L36 21 L39 21 Z"
        fill="#C4A84F"
      />
    </svg>
  ),

  // 🏠 서비스 시작 — 집 + 하트
  serviceStart: (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
    >
      <circle cx="40" cy="40" r="40" fill="#EEF4FB" />
      {/* 집 */}
      <polygon points="40,14 65,34 15,34" fill="#1A56A0" />
      <rect x="18" y="34" width="44" height="28" rx="2" fill="#2E6DB4" />
      {/* 문 */}
      <rect x="32" y="46" width="16" height="16" rx="3" fill="#1A2E4A" />
      <circle cx="45" cy="54" r="1.5" fill="#A8C4E0" />
      {/* 창문 */}
      <rect x="20" y="38" width="10" height="10" rx="2" fill="#EEF4FB" />
      <rect x="50" y="38" width="10" height="10" rx="2" fill="#EEF4FB" />
      {/* 하트 */}
      <path
        d="M40 30 C40 30 35 26 32 29 C29 32 31 36 35 38 L40 42 L45 38 C49 36 51 32 48 29 C45 26 40 30 40 30Z"
        fill="#C47A6E"
      />
    </svg>
  ),

  // 🎓 자격취득 — 졸업장/배지
  cert: (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
    >
      <circle cx="40" cy="40" r="40" fill="#EEF4FB" />
      {/* 배지 */}
      <circle cx="40" cy="36" r="18" fill="#1A56A0" />
      <circle cx="40" cy="36" r="14" fill="#2E6DB4" />
      {/* 별 */}
      <path
        d="M40 26 L42 32 L48 32 L43.5 36 L45.5 42 L40 38.5 L34.5 42 L36.5 36 L32 32 L38 32 Z"
        fill="#E8D48B"
      />
      {/* 리본 */}
      <rect x="36" y="52" width="8" height="12" rx="0" fill="#1A56A0" />
      <polygon points="36,52 44,52 48,64 40,60 32,64" fill="#1A56A0" />
      <polygon points="36,52 44,52 44,58 40,56 36,58" fill="#2E6DB4" />
    </svg>
  ),

  // 🛡️ 자격확인 — 방패 + 체크
  qualification: (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
    >
      <circle cx="40" cy="40" r="40" fill="#EEF4FB" />
      {/* 방패 */}
      <path
        d="M40 16 L60 24 L60 44 C60 54 40 64 40 64 C40 64 20 54 20 44 L20 24 Z"
        fill="#1A56A0"
      />
      <path
        d="M40 20 L56 27 L56 44 C56 52 40 61 40 61 C40 61 24 52 24 44 L24 27 Z"
        fill="#2E6DB4"
      />
      {/* 체크 */}
      <path
        d="M31 40 L37.5 47 L50 33"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),

  // 👩‍⚕️ 요양보호사 배정 — 사람 + 하트
  caregiver: (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
    >
      <circle cx="40" cy="40" r="40" fill="#EEF4FB" />
      {/* 사람 몸 */}
      <circle cx="40" cy="24" r="10" fill="#1A56A0" />
      {/* 머리 */}
      <path
        d="M24 58 C24 48 30 44 40 44 C50 44 56 48 56 58 L56 62 L24 62 Z"
        fill="#1A56A0"
      />
      {/* 간호사 모자 */}
      <rect x="32" y="16" width="16" height="6" rx="2" fill="#FFFFFF" />
      <rect x="37.5" y="14" width="5" height="10" rx="1" fill="#FFFFFF" />
      <rect x="38.5" y="14" width="3" height="10" rx="0.5" fill="#C47A6E" />
      <rect x="34" y="18" width="12" height="2" rx="1" fill="#C47A6E" />
      {/* 하트 뱃지 */}
      <circle
        cx="54"
        cy="44"
        r="8"
        fill="#FFFFFF"
        stroke="#A8C4E0"
        strokeWidth="1.5"
      />
      <path
        d="M54 48 C54 48 49.5 44 49.5 41.5 C49.5 39.5 51 38 53 39 C53.5 39.3 54 40 54 40 C54 40 54.5 39.3 55 39 C57 38 58.5 39.5 58.5 41.5 C58.5 44 54 48 54 48Z"
        fill="#C47A6E"
      />
    </svg>
  ),

  // 📝 맞춤 계획 — 노트 + 연필
  plan: (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
    >
      <circle cx="40" cy="40" r="40" fill="#EEF4FB" />
      {/* 노트 */}
      <rect
        x="18"
        y="18"
        width="34"
        height="44"
        rx="4"
        fill="#FFFFFF"
        stroke="#A8C4E0"
        strokeWidth="2"
      />
      <rect x="18" y="18" width="8" height="44" rx="4" fill="#A8C4E0" />
      {/* 나선 링 */}
      <circle
        cx="22"
        cy="28"
        r="3"
        fill="#FFFFFF"
        stroke="#1A56A0"
        strokeWidth="1.5"
      />
      <circle
        cx="22"
        cy="40"
        r="3"
        fill="#FFFFFF"
        stroke="#1A56A0"
        strokeWidth="1.5"
      />
      <circle
        cx="22"
        cy="52"
        r="3"
        fill="#FFFFFF"
        stroke="#1A56A0"
        strokeWidth="1.5"
      />
      {/* 체크 항목들 */}
      <rect x="30" y="26" width="16" height="2.5" rx="1.2" fill="#A8C4E0" />
      <circle cx="29" cy="27.2" r="2" fill="#1A56A0" />
      <path
        d="M28 27.2 L29 28.2 L30.5 26.5"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="30" y="34" width="18" height="2.5" rx="1.2" fill="#A8C4E0" />
      <circle cx="29" cy="35.2" r="2" fill="#1A56A0" />
      <path
        d="M28 35.2 L29 36.2 L30.5 34.5"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="30" y="42" width="12" height="2.5" rx="1.2" fill="#A8C4E0" />
      <circle
        cx="29"
        cy="43.2"
        r="2"
        fill="#EEF4FB"
        stroke="#A8C4E0"
        strokeWidth="1"
      />
      {/* 연필 */}
      <rect
        x="52"
        y="42"
        width="6"
        height="18"
        rx="2"
        transform="rotate(-35 52 42)"
        fill="#E8D48B"
      />
      <polygon
        points="52,56 56,52 60,60"
        transform="rotate(-35 52 56)"
        fill="#C4A84F"
      />
      <rect
        x="51"
        y="41"
        width="6"
        height="4"
        rx="1"
        transform="rotate(-35 51 41)"
        fill="#A8C4E0"
      />
    </svg>
  ),

  // 🩺 의사소견서 — 청진기 + 서류
  doctorNote: (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
    >
      <circle cx="40" cy="40" r="40" fill="#EEF4FB" />
      {/* 서류 */}
      <rect
        x="20"
        y="16"
        width="30"
        height="40"
        rx="4"
        fill="#FFFFFF"
        stroke="#A8C4E0"
        strokeWidth="2"
      />
      <rect x="27" y="24" width="16" height="2.5" rx="1.2" fill="#A8C4E0" />
      <rect x="27" y="30" width="16" height="2.5" rx="1.2" fill="#A8C4E0" />
      <rect x="27" y="36" width="10" height="2.5" rx="1.2" fill="#A8C4E0" />
      {/* 십자 표시 */}
      <rect x="28" y="43" width="14" height="4" rx="2" fill="#C47A6E" />
      <rect x="33" y="38" width="4" height="14" rx="2" fill="#C47A6E" />
      {/* 청진기 */}
      <path
        d="M50 22 Q62 22 62 34 Q62 44 54 44"
        stroke="#1A56A0"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="54" cy="47" r="5" fill="#1A56A0" />
      <circle cx="54" cy="47" r="3" fill="#2E6DB4" />
      <path
        d="M48 18 L48 26"
        stroke="#1A56A0"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M54 18 L54 26"
        stroke="#1A56A0"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="48" cy="18" r="3" fill="#1A56A0" />
      <circle cx="54" cy="18" r="3" fill="#1A56A0" />
    </svg>
  ),
} as const;

// ─── 화살표 연결선 ──────────────────────────────────────────
function Arrow() {
  return (
    <div className="hidden md:flex items-center justify-center flex-shrink-0 mt-[-12px]">
      <svg viewBox="0 0 32 20" width="32" height="20" fill="none">
        <path
          d="M2 10 H26"
          stroke="#A8C4E0"
          strokeWidth="2"
          strokeDasharray="4 2"
        />
        <path
          d="M22 5 L28 10 L22 15"
          stroke="#A8C4E0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ─── 세로 연결선 (모바일) ─────────────────────────────────
function VerticalArrow() {
  return (
    <div className="flex md:hidden items-center justify-center h-8">
      <svg viewBox="0 0 20 32" width="20" height="32" fill="none">
        <path
          d="M10 2 V24"
          stroke="#A8C4E0"
          strokeWidth="2"
          strokeDasharray="4 2"
        />
        <path
          d="M5 20 L10 26 L15 20"
          stroke="#A8C4E0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ─── 메인 컴포넌트 ─────────────────────────────────────────
export default function ServiceProcess({
  steps,
  title = "서비스 이용 절차",
}: Props) {
  return (
    <section className="bg-[#EEF4FB] py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* 헤더 */}
        <div className="mb-12 text-center">
          <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
            PROCESS
          </p>
          <h2
            className="text-[#1A2E4A] text-2xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            {title}
          </h2>
        </div>

        {/* 스텝 — 데스크탑: 가로, 모바일: 세로 */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-start">
              {/* 스텝 카드 */}
              <div className="flex flex-col items-center text-center w-full md:w-36 lg:w-40">
                {/* 일러스트 */}
                <div className="relative mb-3">
                  {ICONS[step.iconKey]}
                  {/* 번호 배지 */}
                  <span
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full text-[#FFFFFF] text-xs font-bold flex items-center justify-center"
                    style={{ background: "#1A56A0", fontSize: "11px" }}
                  >
                    {i + 1}
                  </span>
                </div>

                {/* 제목 */}
                <p
                  className="text-[#1A2E4A] font-bold text-sm mb-1.5 leading-tight"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {step.title}
                </p>

                {/* 설명 */}
                <p className="text-[#5A7A99] text-xs leading-relaxed px-1">
                  {step.desc}
                </p>
              </div>

              {/* 화살표 연결 (마지막 스텝 제외) */}
              {i < steps.length - 1 && (
                <>
                  <Arrow />
                  <VerticalArrow />
                </>
              )}
            </div>
          ))}
        </div>

        {/* 하단 안내 */}
        <p className="text-center text-[#5A7A99] text-sm mt-10">
          등급 신청부터 서비스 시작까지, 안강 섬김이 함께합니다.{" "}
          {/* <a href="tel:054-763-5988" className="text-[#1A56A0] font-semibold hover:underline">
            054-763-5988
          </a> */}
        </p>
      </div>
    </section>
  );
}
