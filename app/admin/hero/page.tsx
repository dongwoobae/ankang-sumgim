"use client";

import { useRef, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Trash2, Upload, ImageIcon } from "lucide-react";
import Image from "next/image";

interface HeroPhoto {
  id: string;
  url: string;
  display_order: number;
}

export default function HeroPhotoPage() {
  const [photos, setPhotos] = useState<HeroPhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  // const supabase = createClient();

  //   async function fetchPhotos() {
  //     const { data } = await supabase
  //       .from("hero_photos")
  //       .select("id, url, display_order")
  //       .order("display_order", { ascending: true });
  //     setPhotos(data ?? []);
  //   }

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("hero_photos")
        .select("id, url, display_order")
        .order("display_order", { ascending: true });
      setPhotos(data ?? []);
    }
    load();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const supabase = createClient();

    const fileName = `hero_${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("hero")
      .upload(fileName, file, { upsert: false });

    if (uploadError) {
      setError("업로드 실패: " + uploadError.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("hero").getPublicUrl(fileName);

    const nextOrder =
      photos.length > 0
        ? Math.max(...photos.map((p) => p.display_order)) + 1
        : 1;

    await supabase.from("hero_photos").insert({
      url: publicUrl,
      display_order: nextOrder,
    });

    const { data } = await supabase
      .from("hero_photos")
      .select("id, url, display_order")
      .order("display_order", { ascending: true });
    setPhotos(data ?? []);

    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleDelete(photo: HeroPhoto) {
    if (!confirm("이 사진을 삭제할까요?")) return;
    const supabase = createClient();
    const fileName = photo.url.split("/hero/")[1];
    await supabase.storage.from("hero").remove([fileName]);
    await supabase.from("hero_photos").delete().eq("id", photo.id);
    const { data } = await supabase
      .from("hero_photos")
      .select("id, url, display_order")
      .order("display_order", { ascending: true });
    setPhotos(data ?? []);
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1
          className="text-[#1A2E4A] text-2xl font-bold"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          메인 사진 관리
        </h1>
        <p className="text-[#5A7A99] text-sm mt-1">
          홈페이지 상단에 표시되는 사진을 관리합니다 (최대 5장 권장)
        </p>
      </div>

      {/* 업로드 */}
      <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-6 mb-8">
        <h2
          className="text-[#1A2E4A] font-bold mb-4"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          사진 추가
        </h2>
        <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-[#A8C4E0] rounded-xl cursor-pointer hover:border-[#1A56A0] hover:bg-[#EEF4FB] transition-colors">
          <ImageIcon size={28} className="text-[#A8C4E0] mb-2" />
          <span className="text-[#5A7A99] text-sm">
            {uploading ? "업로드 중..." : "클릭하여 사진 선택 (JPG, PNG)"}
          </span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* 사진 목록 */}
      <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-6">
        <h2
          className="text-[#1A2E4A] font-bold mb-4"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          등록된 사진 ({photos.length}장)
        </h2>
        {photos.length === 0 ? (
          <p className="text-[#5A7A99] text-sm text-center py-8">
            등록된 사진이 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                className="relative group rounded-xl overflow-hidden border border-[#A8C4E0]/50 aspect-[4/3]"
              >
                <Image
                  src={photo.url}
                  alt={`메인 사진 ${i + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(photo)}
                    className="flex items-center gap-1.5 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                    삭제
                  </button>
                </div>
                <span className="absolute top-2 left-2 bg-[#1A2E4A]/70 text-white text-xs px-2 py-0.5 rounded-full">
                  {i + 1}번
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
