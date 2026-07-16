"use client";

import { useActionState } from "react";
import { createNotice } from "@/app/actions/admin/notices";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NoticeForm } from "../NoticeForm";

const initialState = { error: "" };

export default function NewNoticePage() {
  const [state, action, pending] = useActionState(createNotice, initialState);

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/notices"
          className="text-[#5A7A99] hover:text-[#1A56A0] transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-[#1A2E4A] text-2xl font-bold">새 공지 작성</h1>
        </div>
      </div>

      <NoticeForm action={action} state={state} pending={pending} />
    </div>
  );
}
