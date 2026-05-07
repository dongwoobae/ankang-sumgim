// components/admin/BlurEditor.tsx
// 사진 위에 드래그로 블러 영역을 지정하는 편집 모달
// 영역은 이미지 크기 대비 0~1 비율로 저장 → 서버에서 픽셀 변환

"use client";

import { useState, useRef } from "react";
import { X, Trash2, Check, Loader2 } from "lucide-react";
import {
  applyManualBlur,
  type BlurRegion,
} from "@/app/actions/admin/applyManualBlur";

type Props = {
  photo: {
    id: number;
    url: string;
    original_url: string | null;
  };
  onClose: () => void;
  onApplied: (newUrl: string) => void;
};

type DragState = { startX: number; startY: number } | null;

export default function BlurEditor({ photo, onClose, onApplied }: Props) {
  const [regions, setRegions] = useState<BlurRegion[]>([]);
  const [dragging, setDragging] = useState<DragState>(null);
  const [current, setCurrent] = useState<BlurRegion | null>(null);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // 편집 기준 이미지: 항상 원본(original_url)에서 시작
  const baseImage = photo.original_url ?? photo.url;

  /** 컨테이너 기준 0~1 상대 좌표 반환 */
  function getRelPos(e: React.MouseEvent | React.TouchEvent) {
    const rect = containerRef.current!.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (clientY - rect.top) / rect.height)),
    };
  }

  function onDragStart(e: React.MouseEvent) {
    e.preventDefault();
    const pos = getRelPos(e);
    setDragging({ startX: pos.x, startY: pos.y });
    setCurrent(null);
  }

  function onDragMove(e: React.MouseEvent) {
    if (!dragging) return;
    const pos = getRelPos(e);
    setCurrent({
      x: Math.min(dragging.startX, pos.x),
      y: Math.min(dragging.startY, pos.y),
      w: Math.abs(pos.x - dragging.startX),
      h: Math.abs(pos.y - dragging.startY),
    });
  }

  function onDragEnd() {
    if (current && current.w > 0.01 && current.h > 0.01) {
      setRegions((prev) => [...prev, current]);
    }
    setDragging(null);
    setCurrent(null);
  }

  async function handleApply() {
    if (regions.length === 0) return;
    setApplying(true);
    setError("");
    const result = await applyManualBlur(photo.id, regions);
    if (result.error) {
      setError(result.error);
      setApplying(false);
      return;
    }
    onApplied(result.url!);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#A8C4E0]/40 flex-shrink-0">
          <div>
            <p
              className="text-[#1A2E4A] font-bold text-sm"
            >
              블러 영역 편집
            </p>
            <p className="text-[#5A7A99] text-xs mt-0.5">
              드래그하여 블러 처리할 영역을 선택하세요 · 여러 영역 선택 가능
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#EEF4FB] text-[#5A7A99] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* 이미지 편집 영역 */}
        <div className="flex-1 overflow-auto p-4 bg-[#EEF4FB]">
          <div
            ref={containerRef}
            className="relative select-none cursor-crosshair mx-auto rounded-xl overflow-hidden"
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={baseImage}
              alt="편집 대상 이미지"
              className="w-full h-auto block pointer-events-none"
              draggable={false}
            />

            {/* 확정된 블러 영역 */}
            {regions.map((r, i) => (
              <div
                key={i}
                className="absolute border-2 border-[#1A56A0] bg-[#1A56A0]/30"
                style={{
                  left: `${r.x * 100}%`,
                  top: `${r.y * 100}%`,
                  width: `${r.w * 100}%`,
                  height: `${r.h * 100}%`,
                }}
              >
                {/* 영역 삭제 버튼 */}
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() =>
                    setRegions((prev) => prev.filter((_, idx) => idx !== i))
                  }
                  className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-md transition-colors"
                >
                  <X size={11} color="#fff" />
                </button>
                {/* 번호 표시 */}
                <span className="absolute top-1 left-1 w-5 h-5 bg-[#1A56A0] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                  {i + 1}
                </span>
              </div>
            ))}

            {/* 드래그 중인 영역 (점선) */}
            {current && (
              <div
                className="absolute border-2 border-dashed border-[#1A56A0] bg-[#1A56A0]/20 pointer-events-none"
                style={{
                  left: `${current.x * 100}%`,
                  top: `${current.y * 100}%`,
                  width: `${current.w * 100}%`,
                  height: `${current.h * 100}%`,
                }}
              />
            )}
          </div>
        </div>

        {/* 하단 */}
        <div className="px-5 py-4 border-t border-[#A8C4E0]/40 flex-shrink-0">
          {error && (
            <p className="text-red-600 text-xs mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setRegions([])}
              disabled={regions.length === 0}
              className="flex items-center gap-1.5 text-sm text-[#5A7A99] hover:text-red-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trash2 size={14} />
              전체 초기화
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[#A8C4E0]/70 text-[#5A7A99] text-sm hover:border-[#1A56A0] transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleApply}
                disabled={regions.length === 0 || applying}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A56A0] text-white text-sm font-bold hover:bg-[#1A2E4A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {applying ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Check size={14} />
                )}
                {applying
                  ? "처리 중..."
                  : `블러 적용 (${regions.length}개 영역)`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
