"use client";

import { deleteCategory } from "@/app/actions/admin/photos";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

export function DeleteCategoryButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("카테고리와 모든 사진을 삭제하시겠습니까?")) return;
    startTransition(() => deleteCategory(id));
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="flex items-center justify-center gap-1.5 text-xs text-red-400 border border-red-200 py-2 px-3 rounded-lg hover:border-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
    >
      <Trash2 size={12} /> 삭제
    </button>
  );
}
