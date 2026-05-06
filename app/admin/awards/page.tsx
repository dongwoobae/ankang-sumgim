"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { saveAward, deleteAward, getAwards } from "@/app/actions/admin/awards";
import { Trash2, ImageIcon } from "lucide-react";
import Image from "next/image";

interface Award {
  id: number;
  title: string;
  org: string;
  description: string | null;
  awarded_at: string;
  image_url: string | null;
  display_order: number;
}

export default function AdminAwardsPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    org: "",
    description: "",
    awarded_at: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let ignore = false;
    getAwards().then((data) => {
      if (!ignore) setAwards(data);
    });
    return () => {
      ignore = true;
    };
  }, []);

  async function handleSubmit() {
    if (!form.title || !form.org || !form.awarded_at) {
      setError("제목, 수여기관, 날짜는 필수입니다.");
      return;
    }

    setUploading(true);
    setError("");
    const supabase = createClient();

    let image_url: string | null = null;

    const file = fileRef.current?.files?.[0];
    if (file) {
      const ext = file.name.split(".").pop();
      const fileName = `awards_${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("awards")
        .upload(fileName, file, { upsert: false });

      if (uploadError) {
        setError("이미지 업로드 실패: " + uploadError.message);
        setUploading(false);
        return;
      }
      const {
        data: { publicUrl },
      } = supabase.storage.from("awards").getPublicUrl(fileName);
      image_url = publicUrl;
    }

    const nextOrder =
      awards.length > 0
        ? Math.max(...awards.map((a) => a.display_order)) + 1
        : 1;

    const result = await saveAward({
      title: form.title,
      org: form.org,
      description: form.description || null,
      awarded_at: form.awarded_at,
      image_url,
      display_order: nextOrder,
    });

    if (result.error) {
      setError(result.error);
      setUploading(false);
      return;
    }

    // handleSubmit 성공 후 fetchAwards() 대신
    const newAward: Award = {
      id: result.id!,
      title: form.title,
      org: form.org,
      description: form.description || null,
      awarded_at: form.awarded_at,
      image_url,
      display_order: nextOrder,
    };
    setAwards((prev) => [newAward, ...prev]);
    setForm({ title: "", org: "", description: "", awarded_at: "" });
    if (fileRef.current) fileRef.current.value = "";
    setUploading(false);
  }

  async function handleDelete(award: Award) {
    if (!confirm(`"${award.title}" 을 삭제할까요?`)) return;
    await deleteAward(award.id, award.image_url);
    setAwards((prev) => prev.filter((a) => a.id !== award.id));
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1
          className="text-[#1A2E4A] text-2xl font-bold"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          수상·기관선정 관리
        </h1>
        <p className="text-[#5A7A99] text-sm mt-1">
          수상 내역을 등록하고 관리합니다
        </p>
      </div>

      {/* 등록 폼 */}
      <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-6 mb-8 space-y-4">
        <h2
          className="text-[#1A2E4A] font-bold"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          새 수상 내역 등록
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#1A2E4A] text-sm font-medium mb-1.5">
              수상명 <span className="text-red-400">*</span>
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="예: 보건복지부장관 표창"
              className="w-full px-4 py-2.5 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[#1A2E4A] text-sm font-medium mb-1.5">
              수여기관 <span className="text-red-400">*</span>
            </label>
            <input
              value={form.org}
              onChange={(e) => setForm({ ...form, org: e.target.value })}
              placeholder="예: 보건복지부"
              className="w-full px-4 py-2.5 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[#1A2E4A] text-sm font-medium mb-1.5">
              수상일 <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={form.awarded_at}
              onChange={(e) => setForm({ ...form, awarded_at: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[#1A2E4A] text-sm font-medium mb-1.5">
              수상 사진{" "}
              <span className="text-[#5A7A99] text-xs font-normal">(선택)</span>
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="w-full px-4 py-2.5 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#1A2E4A] text-sm font-medium mb-1.5">
            설명{" "}
            <span className="text-[#5A7A99] text-xs font-normal">(선택)</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            placeholder="수상 내용을 간략히 입력하세요"
            className="w-full px-4 py-3 rounded-xl border border-[#A8C4E0]/70 bg-[#EEF4FB] text-[#1A2E4A] text-sm focus:outline-none focus:border-[#1A56A0] transition-colors resize-none"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={uploading}
          className="bg-[#1A56A0] text-[#FFFFFF] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#1A2E4A] transition-colors disabled:opacity-60"
        >
          {uploading ? "저장 중..." : "등록하기"}
        </button>
      </div>

      {/* 목록 */}
      <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-6">
        <h2
          className="text-[#1A2E4A] font-bold mb-4"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          등록된 수상 내역 ({awards.length}건)
        </h2>
        {awards.length === 0 ? (
          <p className="text-[#5A7A99] text-sm text-center py-8">
            등록된 수상 내역이 없습니다.
          </p>
        ) : (
          <div className="space-y-3">
            {awards.map((award) => (
              <div
                key={award.id}
                className="flex items-center gap-4 p-4 bg-[#EEF4FB] rounded-xl border border-[#A8C4E0]/40"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden border border-[#A8C4E0]/50 flex-shrink-0 bg-[#E8A020]/20 flex items-center justify-center">
                  {award.image_url ? (
                    <Image
                      src={award.image_url}
                      alt={award.title}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <ImageIcon size={20} className="text-[#A8C4E0]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1A2E4A] font-bold text-sm truncate">
                    {award.title}
                  </p>
                  <p className="text-[#5A7A99] text-xs">
                    {award.org} ·{" "}
                    {new Date(award.awarded_at).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(award)}
                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors flex-shrink-0 px-3 py-1.5 rounded-lg border border-red-200 hover:border-red-400"
                >
                  <Trash2 size={13} />
                  삭제
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
