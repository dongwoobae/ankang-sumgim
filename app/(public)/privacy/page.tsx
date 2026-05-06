import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div>
      <section
        style={{
          background: "linear-gradient(135deg, #EEF4FB 0%, #F0E4A8 100%)",
        }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
            PRIVACY
          </p>
          <h1
            className="text-[#1A2E4A] text-4xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            개인정보처리방침
          </h1>
          <p className="text-[#5A7A99] mt-3">
            안강 섬김 노인복지센터 개인정보 처리방침
          </p>
        </div>
      </section>

      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-10 text-[#1A2E4A] leading-[1.9]">
          <div>
            <h2
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              제1조 (개인정보의 수집 항목 및 수집 방법)
            </h2>
            <p className="text-base text-[#1A2E4A] mb-3">
              안강 섬김 노인복지센터(이하 &quot;센터&quot;)는 상담 문의 서비스
              제공을 위해 아래와 같이 개인정보를 수집합니다.
            </p>
            <div className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl p-6">
              <p className="font-bold text-base mb-2">수집 항목</p>
              <p className="text-base text-[#5A7A99]">
                필수: 성명, 연락처, 문의 내용
              </p>
              <p className="text-base text-[#5A7A99]">선택: 이메일 주소</p>
              <p className="font-bold text-base mt-4 mb-2">수집 방법</p>
              <p className="text-base text-[#5A7A99]">
                홈페이지 온라인 상담 신청 폼을 통한 수집
              </p>
            </div>
          </div>

          <div>
            <h2
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              제2조 (개인정보의 수집 및 이용 목적)
            </h2>
            <p className="text-base text-[#5A7A99]">
              수집한 개인정보는 다음의 목적에 한해 이용합니다.
            </p>
            <ul className="mt-3 space-y-2 text-base text-[#5A7A99]">
              <li>• 상담 문의에 대한 답변 및 결과 통보</li>
              <li>• 서비스 안내 및 관련 정보 제공</li>
              <li>• 민원 처리 등 고객 관리</li>
            </ul>
          </div>

          <div>
            <h2
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              제3조 (개인정보의 보유 및 이용 기간)
            </h2>
            <p className="text-base text-[#5A7A99]">
              수집된 개인정보는 서비스 제공 목적이 달성된 후 지체 없이
              파기합니다. 단, 관계 법령에 의해 보존할 필요가 있는 경우 해당 기간
              동안 보관합니다.
            </p>
            <div className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl p-6 mt-4">
              <p className="text-base text-[#5A7A99]">
                상담 문의 관련 기록: 접수일로부터{" "}
                <strong className="text-[#1A2E4A]">3년</strong>
              </p>
            </div>
          </div>

          <div>
            <h2
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              제4조 (개인정보의 제3자 제공)
            </h2>
            <p className="text-base text-[#5A7A99]">
              센터는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
              다만, 법령의 규정에 의거하거나 수사기관의 요구가 있는 경우에는
              예외로 합니다.
            </p>
          </div>

          <div>
            <h2
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              제5조 (개인정보의 파기 절차 및 방법)
            </h2>
            <p className="text-base text-[#5A7A99]">
              보유 기간이 경과한 개인정보는 즉시 파기합니다. 전자적 파일 형태의
              정보는 복구할 수 없는 기술적 방법을 사용하여 삭제합니다.
            </p>
          </div>

          <div>
            <h2
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              제6조 (정보주체의 권리와 행사 방법)
            </h2>
            <p className="text-base text-[#5A7A99]">
              이용자는 개인정보 조회, 수정, 삭제, 처리 정지를 요청할 권리가
              있습니다. 아래 연락처로 요청하시면 지체 없이 조치하겠습니다.
            </p>
          </div>

          <div>
            <h2
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              제7조 (개인정보 보호책임자)
            </h2>
            <div className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-xl p-6 space-y-2 text-base text-[#5A7A99]">
              <p>
                <strong className="text-[#1A2E4A]">기관명:</strong> 안강 섬김
                노인복지센터
              </p>
              <p>
                <strong className="text-[#1A2E4A]">전화:</strong> 054-763-5988
              </p>
              <p>
                <strong className="text-[#1A2E4A]">이메일:</strong>{" "}
                miyeong0695@daum.net
              </p>
              <p>
                <strong className="text-[#1A2E4A]">주소:</strong> 경상북도
                경주시 안강읍 화전중앙길 53
              </p>
            </div>
          </div>

          <p className="text-sm text-[#5A7A99] pt-4 border-t border-[#A8C4E0]/40">
            본 방침은 2025년 1월 1일부터 시행됩니다.
          </p>
        </div>
      </section>
    </div>
  );
}
