import { adminSupabase } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EditNoticeClient } from "./EditNoticeClient";

async function getNotice(id: string) {
  const { data } = await adminSupabase
    .from("notices")
    .select("id, title, content, is_pinned")
    .eq("id", id)
    .single();
  return data;
}

export default async function EditNoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = await getNotice(id);
  if (!notice) notFound();

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/notices"
          className="text-[#8C8070] hover:text-[#C4A84F] transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1
          className="text-[#5C4A1E] text-2xl font-bold"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          공지 수정
        </h1>
      </div>

      <EditNoticeClient notice={notice} />
    </div>
  );
}
