// app/admin/photos/[id]/upload/PhotoUploader.tsx
// 변경점: supabase.storage 직접 호출 → uploadPhoto 서버 액션 호출
// (압축 + R2 업로드가 서버 액션 내에서 처리됨)

"use client";

import { useState, useRef, useTransition } from "react";
import { uploadPhoto } from "@/app/actions/admin/uploadPhoto";
import {
  savePhotoMetadata,
  deletePhoto,
  updatePhotoCaption,
} from "@/app/actions/admin/photos";
import { Upload, X, ImageIcon, Loader2, Check, Pencil } from "lucide-react";
import Image from "next/image";

type Photo = {
  id: number;
  url: string;
  caption: string | null;
  created_at: string;
};

type Props = {
  categoryId: string;
  initialPhotos: Photo[];
};

export function PhotoUploader({ categoryId, initialPhotos }: Props) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState("");
  const [deletePending, startDeleteTransition] = useTransition();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError("");
    setUploading(true);

    const fileArray = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );
    setProgress({ current: 0, total: fileArray.length });

    const uploaded: Photo[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      setProgress({ current: i + 1, total: fileArray.length });

      // ── 서버 액션으로 압축 + R2 업로드 ──
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadPhoto(
        formData,
        `photos/categories/${categoryId}`,
      );

      if (result.error || !result.url) {
        setError(`${file.name}: ${result.error ?? "업로드 실패"}`);
        continue;
      }

      // ── DB에 URL 저장 ──
      const meta = await savePhotoMetadata(categoryId, result.url);
      if (meta?.error) {
        setError(meta.error);
        continue;
      }

      uploaded.push({
        id: meta.id ?? Date.now(),
        url: result.url,
        caption: null,
        created_at: new Date().toISOString(),
      });
    }

    setPhotos((prev) => [...uploaded, ...prev]);
    setUploading(false);
    setProgress({ current: 0, total: 0 });
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleDelete(photo: Photo) {
    if (!confirm("이 사진을 삭제하시겠습니까?")) return;
    startDeleteTransition(async () => {
      await deletePhoto(String(photo.id), photo.url);
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    });
  }

  function startEdit(photo: Photo) {
    setEditingId(photo.id);
    setEditCaption(photo.caption ?? "");
  }

  async function saveCaption(photoId: number) {
    await updatePhotoCaption(String(photoId), editCaption);
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === photoId ? { ...p, caption: editCaption.trim() || null } : p,
      ),
    );
    setEditingId(null);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div className="space-y-6">
      {/* 업로드 영역 */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${
          uploading
            ? "border-[#1A56A0] bg-[#EEF4FB] cursor-wait"
            : "border-[#A8C4E0] bg-[#FFFFFF] hover:border-[#1A56A0] hover:bg-[#EEF4FB]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={36} className="text-[#1A56A0] animate-spin" />
            <p className="text-[#1A2E4A] text-sm font-medium">
              압축 및 업로드 중... ({progress.current}/{progress.total})
            </p>
            <p className="text-[#5A7A99] text-xs">
              이미지를 최적화하고 있습니다. 잠시 기다려 주세요.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload size={36} className="text-[#1A56A0]" />
            <div>
              <p className="text-[#1A2E4A] font-medium text-sm">
                클릭하거나 사진을 여기에 드래그하세요
              </p>
              <p className="text-[#5A7A99] text-xs mt-1">
                JPG, PNG, WEBP · 여러 장 동시 업로드 가능 · 자동 WebP 압축 적용
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {/* 사진 그리드 */}
      {photos.length > 0 && (
        <div>
          <p className="text-[#5A7A99] text-xs mb-3">
            등록된 사진 ({photos.length}장)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="group flex flex-col gap-1.5">
                {/* 이미지 */}
                <div className="relative rounded-xl overflow-hidden aspect-square bg-[#EEF4FB]">
                  <Image
                    src={photo.url}
                    alt={photo.caption ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => handleDelete(photo)}
                    disabled={deletePending}
                    className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X size={14} color="#fff" />
                  </button>
                </div>

                {/* 캡션 */}
                {editingId === photo.id ? (
                  <div className="flex gap-1">
                    <input
                      value={editCaption}
                      onChange={(e) => setEditCaption(e.target.value)}
                      className="flex-1 text-xs px-2 py-1 rounded-lg border border-[#A8C4E0] bg-[#EEF4FB] text-[#1A2E4A] focus:outline-none focus:border-[#1A56A0]"
                      placeholder="캡션 입력"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveCaption(photo.id);
                        if (e.key === "Escape") setEditingId(null);
                      }}
                      autoFocus
                    />
                    <button
                      onClick={() => saveCaption(photo.id)}
                      className="w-6 h-6 rounded-lg bg-[#1A56A0] flex items-center justify-center flex-shrink-0"
                    >
                      <Check size={12} color="#fff" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit(photo)}
                    className="flex items-center gap-1 text-left group/caption"
                  >
                    <span className="text-[#5A7A99] text-xs truncate group-hover/caption:text-[#1A56A0] transition-colors">
                      {photo.caption || "캡션 추가..."}
                    </span>
                    <Pencil
                      size={10}
                      className="text-[#A8C4E0] group-hover/caption:text-[#1A56A0] flex-shrink-0 transition-colors"
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
