import { adminSupabase } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Award } from "lucide-react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "수상·기관선정",
  description:
    "안강 섬김 노인복지센터 수상 및 기관 선정 내역. 공신력 있는 기관이 인정한 서비스 품질.",
  openGraph: { url: "/about/awards" },
};

async function getAwards() {
  const { data } = await adminSupabase
    .from("awards")
    .select("id, title, org, description, awarded_at, image_url")
    .order("awarded_at", { ascending: false });
  return data ?? [];
}

export const revalidate = 60;

export default async function AwardsPage() {
  const awards = await getAwards();

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
            ABOUT US
          </p>
          <h1
            className="text-[#1A2E4A] text-4xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            수상·기관선정
          </h1>
          <p className="text-[#5A7A99] mt-3">
            신뢰로 쌓아온 수상 및 기관선정 내역
          </p>
        </div>
      </section>

      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[#1A56A0] text-sm font-semibold tracking-widest mb-2">
              AWARDS & RECOGNITION
            </p>
            <h2
              className="text-[#1A2E4A] text-2xl font-bold"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              전체 수상 내역
            </h2>
          </div>

          {awards.length === 0 ? (
            <p className="text-center text-[#5A7A99] py-16">
              등록된 수상 내역이 없습니다.
            </p>
          ) : (
            <div className="space-y-6">
              {awards.map((award) => (
                <div
                  key={award.id}
                  className="bg-[#EEF4FB] border border-[#A8C4E0]/50 rounded-2xl p-7 flex gap-6"
                >
                  {/* 사진 */}
                  <div className="w-28 h-28 rounded-xl overflow-hidden border border-[#A8C4E0]/50 flex-shrink-0 bg-[#E8A02022] flex flex-col items-center justify-center">
                    {award.image_url ? (
                      <Image
                        src={award.image_url}
                        alt={award.title}
                        width={112}
                        height={112}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <>
                        <Award size={24} className="text-[#1A56A0] mb-1" />
                        <span className="text-[#5A7A99] text-[10px]">
                          사진 없음
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[#1A56A0] text-sm font-bold mb-1">
                      {new Date(award.awarded_at).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h3
                      className="text-[#1A2E4A] font-bold text-lg mb-1"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {award.title}
                    </h3>
                    <p className="text-[#1A56A0] text-sm font-medium mb-2">
                      수여: {award.org}
                    </p>
                    {award.description && (
                      <p className="text-[#5A7A99] text-sm leading-relaxed">
                        {award.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
