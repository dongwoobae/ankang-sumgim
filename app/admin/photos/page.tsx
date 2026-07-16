import Link from "next/link";
import { adminSupabase } from "@/lib/supabase/admin";
import { PlusCircle, Images, Upload } from "lucide-react";
import { DeleteCategoryButton } from "./DeleteCategoryButton";

async function getCategories() {
  const { data } = await adminSupabase
    .from("photo_categories")
    .select("id, name, created_at, photos(count)")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });
  return data ?? [];
}

export default async function AdminPhotosPage() {
  const categories = await getCategories();

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#1A2E4A] text-2xl font-bold">사진 게시판 관리</h1>
          <p className="text-[#5A7A99] text-sm mt-1">총 {categories.length}개 카테고리</p>
        </div>
        <Link
          href="/admin/photos/new"
          className="flex items-center gap-2 bg-[#1A56A0] text-[#FFFFFF] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#1A2E4A] transition-colors"
        >
          <PlusCircle size={16} />새 카테고리 만들기
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-12 text-center">
          <Images size={40} className="text-[#A8C4E0] mx-auto mb-3" />
          <p className="text-[#5A7A99] text-sm">등록된 카테고리가 없습니다.</p>
          <Link
            href="/admin/photos/new"
            className="inline-flex items-center gap-2 mt-4 text-[#1A56A0] text-sm font-medium hover:underline"
          >
            <PlusCircle size={14} /> 첫 카테고리 만들기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => {
            const photoCount = (cat.photos as { count: number }[])?.[0]?.count ?? 0;
            return (
              <div
                key={cat.id}
                className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-5 hover:border-[#1A56A0] transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <Images size={16} className="text-[#1A56A0] flex-shrink-0" />
                    <p className="text-[#1A2E4A] font-bold text-sm truncate">{cat.name}</p>
                  </div>
                  <span className="text-[#5A7A99] text-xs flex-shrink-0">
                    {new Date(cat.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </div>

                <p className="text-[#5A7A99] text-xs mb-4">사진 {photoCount}장</p>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/photos/${cat.id}/upload`}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-[#EEF4FB] border border-[#A8C4E0]/60 text-[#1A2E4A] py-2 rounded-lg hover:border-[#1A56A0] hover:text-[#1A56A0] transition-colors font-medium"
                  >
                    <Upload size={12} /> 사진 관리
                  </Link>
                  <DeleteCategoryButton id={String(cat.id)} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
