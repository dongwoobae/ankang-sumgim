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
          className="text-[#8C8070] hover:text-[#C4A84F] transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1
            className="text-[#5C4A1E] text-2xl font-bold"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            새 공지 작성
          </h1>
        </div>
      </div>

      <NoticeForm action={action} state={state} pending={pending} />
    </div>
  );
}
