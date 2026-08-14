"use client";

import { deleteCategory } from "@/app/actions/admin/photos";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

export function DeleteCategoryButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleDelete() {
    if (!confirm("카테고리와 모든 사진을 삭제하시겠습니까?")) return;
    setError("");
    startTransition(async () => {
      const result = await deleteCategory(id);
      if (result.error) setError(result.error);
    });
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleDelete}
        disabled={pending}
        className="flex items-center justify-center gap-1.5 text-xs text-red-400 border border-red-200 py-2 px-3 rounded-lg hover:border-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
      >
        <Trash2 size={12} /> 삭제
      </button>
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
}
