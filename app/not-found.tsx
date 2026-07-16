import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-[#E8A020] text-8xl font-bold mb-4">404</p>
        <h1 className="text-[#1A2E4A] text-2xl font-bold mb-3">페이지를 찾을 수 없습니다</h1>
        <p className="text-[#5A7A99] text-base leading-relaxed mb-8">
          요청하신 페이지가 존재하지 않거나
          <br />
          이동되었을 수 있습니다.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 bg-[#1A56A0] text-[#FFFFFF] px-6 py-3 rounded-xl font-bold text-base hover:bg-[#1A2E4A] transition-colors"
          >
            <Home size={18} />
            홈으로 돌아가기
          </Link>
          <Link
            href="/inquiry"
            className="flex items-center gap-2 border-2 border-[#1A56A0] text-[#1A56A0] px-6 py-3 rounded-xl font-bold text-base hover:bg-[#1A56A0] hover:text-white transition-colors"
          >
            상담 문의하기
          </Link>
        </div>
        <p className="text-[#5A7A99] text-sm mt-8">
          문의사항은{" "}
          <a href="tel:054-763-5988" className="text-[#1A56A0] font-medium hover:underline">
            054-763-5988
          </a>
          으로 연락주세요.
        </p>
      </div>
    </div>
  );
}
