"use client";

import { deleteNotice } from "@/app/actions/admin/notices";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

export function DeleteNoticeButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("이 공지를 삭제하시겠습니까?")) return;
    startTransition(() => deleteNotice(id));
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors px-2 py-1 rounded border border-red-200 hover:border-red-400 disabled:opacity-50"
    >
      <Trash2 size={11} /> 삭제
    </button>
  );
}
