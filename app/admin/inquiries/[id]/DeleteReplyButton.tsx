"use client";

import { deleteReply } from "@/app/actions/admin/inquiries";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

export function DeleteReplyButton({ id, inquiryId }: { id: string; inquiryId: string }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("이 답변을 삭제하시겠습니까?")) return;
    startTransition(() => deleteReply(id, inquiryId));
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
      aria-label="답변 삭제"
    >
      <Trash2 size={13} />
    </button>
  );
}
