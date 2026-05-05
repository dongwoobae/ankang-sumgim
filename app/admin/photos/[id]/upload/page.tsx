import { adminSupabase } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PhotoUploader } from "./PhotoUploader";

type Photo = { id: number; url: string; caption: string | null; created_at: string };

async function getCategoryWithPhotos(id: string) {
  const { data } = await adminSupabase
    .from("photo_categories")
    .select("id, name, photos(id, url, caption, created_at)")
    .eq("id", id)
    .single();
  return data;
}

export default async function UploadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategoryWithPhotos(id);
  if (!category) notFound();

  const photos = (category.photos as Photo[]) ?? [];

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-2">
        <Link
          href="/admin/photos"
          className="text-[#5A7A99] hover:text-[#1A56A0] transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1
          className="text-[#1A2E4A] text-2xl font-bold"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          {category.name}
        </h1>
      </div>
      <p className="text-[#5A7A99] text-sm mb-8 pl-9">사진 {photos.length}장 등록됨</p>

      <PhotoUploader categoryId={id} initialPhotos={photos} />
    </div>
  );
}
