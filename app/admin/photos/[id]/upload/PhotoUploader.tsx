// app/admin/photos/[id]/upload/PhotoUploader.tsx
// 변경점: 각 사진 카드에 "편집" 버튼 추가 → BlurEditor 모달 오픈
//         편집 완료 시 사진 url 낙관적 업데이트

"use client";

import { useState, useRef, useTransition, useEffect } from "react";
import { uploadPhoto, type FaceRegion } from "@/app/actions/admin/uploadPhoto";
import {
  savePhotoMetadata,
  deletePhoto,
  updatePhotoCaption,
  toggleFaceBlur,
} from "@/app/actions/admin/photos";
import {
  Upload,
  X,
  Loader2,
  Check,
  Pencil,
  Eye,
  EyeOff,
  ScanFace,
  PenLine,
} from "lucide-react";
import Image from "next/image";
import BlurEditor from "@/components/admin/BlurEditor";

type Photo = {
  id: number;
  url: string;
  original_url: string | null;
  is_face_blurred: boolean;
  caption: string | null;
  created_at: string;
};

type Props = {
  categoryId: string;
  initialPhotos: Photo[];
};

let faceApiModelsLoaded = false;

async function loadFaceApiModels() {
  if (faceApiModelsLoaded) return;
  const faceapi = await import("face-api.js");
  await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  faceApiModelsLoaded = true;
}

async function detectFaces(file: File): Promise<FaceRegion[]> {
  try {
    await loadFaceApiModels();
    const faceapi = await import("face-api.js");

    const objectUrl = URL.createObjectURL(file);
    const img = document.createElement("img");
    img.src = objectUrl;
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
    });

    const detections = await faceapi.detectAllFaces(
      img,
      new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.45 }),
    );

    const scaleX = img.naturalWidth / (img.width || img.naturalWidth);
    const scaleY = img.naturalHeight / (img.height || img.naturalHeight);
    URL.revokeObjectURL(objectUrl);

    return detections.map((d) => ({
      x: Math.round(d.box.x * scaleX),
      y: Math.round(d.box.y * scaleY),
      width: Math.round(d.box.width * scaleX),
      height: Math.round(d.box.height * scaleY),
    }));
  } catch (e) {
    console.error("[detectFaces] 오류:", e);
    return [];
  }
}

export function PhotoUploader({ categoryId, initialPhotos }: Props) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [progressLabel, setProgressLabel] = useState("");
  const [error, setError] = useState("");
  const [deletePending, startDeleteTransition] = useTransition();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadFaceApiModels().catch(console.error);
  }, []);

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

      setProgressLabel("얼굴 감지 중...");
      const faceRegions = await detectFaces(file);

      setProgressLabel("압축 및 업로드 중...");
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadPhoto(
        formData,
        `photos/categories/${categoryId}`,
        faceRegions,
      );

      if (result.error || !result.url) {
        setError(`${file.name}: ${result.error ?? "업로드 실패"}`);
        continue;
      }

      const meta = await savePhotoMetadata(
        categoryId,
        result.url,
        result.originalUrl ?? null,
      );
      if (meta?.error) {
        setError(meta.error);
        continue;
      }

      uploaded.push({
        id: meta.id ?? Date.now(),
        url: result.url,
        original_url: result.originalUrl ?? null,
        is_face_blurred: result.originalUrl !== null,
        caption: null,
        created_at: new Date().toISOString(),
      });
    }

    setPhotos((prev) => [...uploaded, ...prev]);
    setUploading(false);
    setProgressLabel("");
    setProgress({ current: 0, total: 0 });
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleDelete(photo: Photo) {
    if (!confirm("이 사진을 삭제하시겠습니까?")) return;
    startDeleteTransition(async () => {
      await deletePhoto(String(photo.id), photo.url, photo.original_url);
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    });
  }

  async function handleToggleBlur(photo: Photo) {
    const next = !photo.is_face_blurred;
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === photo.id ? { ...p, is_face_blurred: next } : p,
      ),
    );
    const { error } = await toggleFaceBlur(String(photo.id), next);
    if (error) {
      setPhotos((prev) =>
        prev.map((p) =>
          p.id === photo.id ? { ...p, is_face_blurred: !next } : p,
        ),
      );
      setError(error);
    }
  }

  /** BlurEditor 적용 완료 콜백 */
  function handleBlurApplied(photoId: number, newUrl: string) {
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === photoId ? { ...p, url: newUrl, is_face_blurred: true } : p,
      ),
    );
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
    <>
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
                {progressLabel || "처리 중..."} ({progress.current}/
                {progress.total})
              </p>
              <p className="text-[#5A7A99] text-xs">
                얼굴 감지 및 이미지 최적화 중입니다. 잠시 기다려 주세요.
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
                  JPG, PNG, WEBP · 여러 장 동시 업로드 가능 · 얼굴 자동 블러
                  처리
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
                      src={
                        photo.is_face_blurred
                          ? photo.url
                          : (photo.original_url ?? photo.url)
                      }
                      alt={photo.caption ?? ""}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />

                    {/* 블러 상태 배지 */}
                    {photo.original_url && (
                      <span
                        className={`absolute top-2 left-2 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          photo.is_face_blurred
                            ? "bg-[#1A56A0] text-white"
                            : "bg-[#E8A020] text-[#1A2E4A]"
                        }`}
                      >
                        <ScanFace size={10} />
                        {photo.is_face_blurred ? "블러" : "해제"}
                      </span>
                    )}

                    {/* 삭제 버튼 */}
                    <button
                      onClick={() => handleDelete(photo)}
                      disabled={deletePending}
                      className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X size={14} color="#fff" />
                    </button>
                  </div>

                  {/* 블러 토글 + 수동 편집 버튼 */}
                  <div className="flex gap-1">
                    {/* 블러 토글 (얼굴 감지된 경우만) */}
                    {photo.original_url && (
                      <button
                        onClick={() => handleToggleBlur(photo)}
                        className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          photo.is_face_blurred
                            ? "bg-[#EEF4FB] text-[#1A56A0] hover:bg-[#1A56A0] hover:text-white"
                            : "bg-[#E8A020]/20 text-[#1A2E4A] hover:bg-[#E8A020]/40"
                        }`}
                      >
                        {photo.is_face_blurred ? (
                          <>
                            <Eye size={11} /> 해제
                          </>
                        ) : (
                          <>
                            <EyeOff size={11} /> 블러
                          </>
                        )}
                      </button>
                    )}

                    {/* 수동 편집 버튼 (항상 표시) */}
                    <button
                      onClick={() => setEditingPhoto(photo)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium bg-[#EEF4FB] text-[#5A7A99] hover:bg-[#1A2E4A] hover:text-white transition-colors"
                    >
                      <PenLine size={11} /> 편집
                    </button>
                  </div>

                  {/* 캡션 */}
                  {editingId === photo.id ? (
                    <div className="flex gap-1">
                      <input
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveCaption(photo.id);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                        className="flex-1 text-xs px-2 py-1 border border-[#1A56A0] rounded-lg outline-none text-[#1A2E4A] bg-[#EEF4FB]"
                        autoFocus
                      />
                      <button
                        onClick={() => saveCaption(photo.id)}
                        className="w-6 h-6 flex items-center justify-center bg-[#1A56A0] rounded-lg flex-shrink-0"
                      >
                        <Check size={11} color="#fff" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(photo)}
                      className="flex items-center gap-1 text-[#5A7A99] text-xs hover:text-[#1A56A0] transition-colors text-left truncate"
                    >
                      <Pencil size={10} className="flex-shrink-0" />
                      <span className="truncate">
                        {photo.caption ?? "캡션 추가"}
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 블러 편집 모달 */}
      {editingPhoto && (
        <BlurEditor
          photo={editingPhoto}
          onClose={() => setEditingPhoto(null)}
          onApplied={(newUrl) => {
            handleBlurApplied(editingPhoto.id, newUrl);
            setEditingPhoto(null);
          }}
        />
      )}
    </>
  );
}
