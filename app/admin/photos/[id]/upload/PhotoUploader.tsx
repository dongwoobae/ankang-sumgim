"use client";

import { useState, useRef, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { savePhotoMetadata, deletePhoto, updatePhotoCaption } from "@/app/actions/admin/photos";
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
  const [error, setError] = useState("");
  const [deletePending, startDeleteTransition] = useTransition();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError("");
    setUploading(true);

    const supabase = createClient();
    const uploaded: Photo[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 10 * 1024 * 1024) {
        setError(`${file.name}: 파일 크기가 10MB를 초과합니다.`);
        continue;
      }

      const ext = file.name.split(".").pop();
      const storagePath = `categories/${categoryId}/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(storagePath, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError(`${file.name}: 업로드 실패 — ${uploadError.message}`);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("photos").getPublicUrl(storagePath);

      const result = await savePhotoMetadata(categoryId, publicUrl);
      if (result?.error) {
        setError(result.error);
        continue;
      }

      uploaded.push({
        id: result.id ?? Date.now(),
        url: publicUrl,
        caption: null,
        created_at: new Date().toISOString(),
      });
    }

    setPhotos((prev) => [...uploaded, ...prev]);
    setUploading(false);
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
        p.id === photoId ? { ...p, caption: editCaption.trim() || null } : p
      )
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
            ? "border-[#C4A84F] bg-[#FAF3D6] cursor-wait"
            : "border-[#D9C97A] bg-[#FFFDF0] hover:border-[#C4A84F] hover:bg-[#FAF3D6]"
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
            <Loader2 size={36} className="text-[#C4A84F] animate-spin" />
            <p className="text-[#5C4A1E] text-sm font-medium">업로드 중...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload size={36} className="text-[#C4A84F]" />
            <div>
              <p className="text-[#5C4A1E] font-medium text-sm">
                클릭하거나 사진을 여기에 드래그하세요
              </p>
              <p className="text-[#8C8070] text-xs mt-1">
                JPG, PNG, WEBP · 최대 10MB · 여러 장 동시 업로드 가능
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
      {photos.length > 0 ? (
        <div>
          <p className="text-[#8C8070] text-xs mb-3">등록된 사진 ({photos.length}장)</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="group flex flex-col gap-1.5">
                {/* 이미지 */}
                <div className="relative rounded-xl overflow-hidden aspect-square bg-[#FAF3D6]">
                  <Image
                    src={photo.url}
                    alt={photo.caption ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                  <button
                    onClick={() => handleDelete(photo)}
                    disabled={deletePending}
                    className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
                    aria-label="사진 삭제"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* 캡션 편집 */}
                {editingId === photo.id ? (
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={editCaption}
                      onChange={(e) => setEditCaption(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveCaption(photo.id)}
                      placeholder="캡션 입력"
                      autoFocus
                      className="flex-1 min-w-0 text-xs px-2 py-1 border border-[#C4A84F] rounded-lg bg-[#FAF3D6] text-[#5C4A1E] focus:outline-none"
                    />
                    <button
                      onClick={() => saveCaption(photo.id)}
                      className="w-6 h-6 rounded-lg bg-[#C4A84F] text-white flex items-center justify-center flex-shrink-0"
                    >
                      <Check size={11} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit(photo)}
                    className="flex items-center gap-1 text-[10px] text-[#8C8070] hover:text-[#C4A84F] transition-colors text-left truncate"
                  >
                    <Pencil size={9} className="flex-shrink-0" />
                    <span className="truncate">
                      {photo.caption || "캡션 추가"}
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        !uploading && (
          <div className="text-center py-8">
            <ImageIcon size={32} className="text-[#D9C97A] mx-auto mb-2" />
            <p className="text-[#8C8070] text-sm">업로드된 사진이 없습니다.</p>
          </div>
        )
      )}
    </div>
  );
}
