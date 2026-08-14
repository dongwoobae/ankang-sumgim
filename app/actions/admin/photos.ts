// app/actions/admin/photos.ts
// 사양: docs/specs/photo-blur.md

"use server";

import { requireSession } from "@/lib/auth/requireSession";
import { adminSupabase } from "@/lib/supabase/admin";
import { deleteUrlsFromR2 } from "@/lib/r2";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CategoryFormState = { error: string };

// R2 삭제가 실패하면 DB 행을 남긴다 — 행을 지우면 키를 잃어 공개 버킷의
// 무블러 원본을 다시 찾지 못한다. 사양: docs/specs/photo-blur.md
const R2_CLEANUP_FAILED = "이미지 파일을 지우지 못해 중단했습니다. 잠시 후 다시 시도해 주세요.";

// ── 카테고리 생성 ─────────────────────────────────────────────
export async function createCategory(
  _prev: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  await requireSession();
  const name = (formData.get("name") as string).trim();
  if (!name) return { error: "카테고리 이름을 입력해 주세요." };

  const { data: category, error } = await adminSupabase
    .from("photo_categories")
    .insert({ name })
    .select("id")
    .single();

  if (error || !category) return { error: "카테고리 생성 중 오류가 발생했습니다." };

  revalidatePath("/board/photos");
  revalidatePath("/board/photos", "layout");
  revalidatePath("/board/photos/[id]", "page");
  revalidatePath("/admin/photos");
  revalidatePath("/sitemap.xml");
  redirect(`/admin/photos/${category.id}/upload`);
}

// ── 카테고리 삭제 (하위 사진 R2 원본+블러 모두 삭제) ──────────
export async function deleteCategory(id: string): Promise<{ error: string }> {
  await requireSession();
  const { data: photos } = await adminSupabase
    .from("photos")
    .select("url, original_url")
    .eq("category_id", id);

  const cleaned = await deleteUrlsFromR2((photos ?? []).flatMap((p) => [p.url, p.original_url]));
  if (!cleaned) return { error: R2_CLEANUP_FAILED };

  await adminSupabase.from("photo_categories").delete().eq("id", id);
  revalidatePath("/board/photos");
  revalidatePath("/board/photos", "layout");
  revalidatePath("/board/photos/[id]", "page");
  revalidatePath("/admin/photos");
  revalidatePath("/sitemap.xml");
  return { error: "" };
}

// ── 사진 단건 삭제 (블러+원본 모두 삭제) ─────────────────────
export async function deletePhoto(id: string): Promise<{ error: string }> {
  await requireSession();
  const { data: photo } = await adminSupabase
    .from("photos")
    .select("url, original_url")
    .eq("id", id)
    .single();

  if (!photo) return { error: "사진을 찾을 수 없습니다." };

  const cleaned = await deleteUrlsFromR2([photo.url, photo.original_url]);
  if (!cleaned) return { error: R2_CLEANUP_FAILED };

  await adminSupabase.from("photos").delete().eq("id", id);
  revalidatePath("/board/photos");
  revalidatePath("/board/photos", "layout");
  revalidatePath("/board/photos/[id]", "page");
  return { error: "" };
}

// ── 업로드했으나 DB에 남기지 못한 오브젝트 회수 ───────────────
// R2 업로드 성공과 메타데이터 INSERT 사이에서 실패하면 공개 버킷에
// 무블러 원본이 행 없이 남는다. 클라이언트가 그 상황에서 호출한다.
export async function discardUploadedPhoto(
  url: string,
  originalUrl: string | null,
): Promise<{ error: string }> {
  await requireSession();
  const cleaned = await deleteUrlsFromR2([url, originalUrl]);
  return { error: cleaned ? "" : R2_CLEANUP_FAILED };
}

// ── 사진 메타데이터 저장 ──────────────────────────────────────
export async function savePhotoMetadata(
  categoryId: string,
  url: string,
  originalUrl: string | null,
  caption?: string,
): Promise<{ error: string; id?: number }> {
  await requireSession();
  const { data, error } = await adminSupabase
    .from("photos")
    .insert({
      category_id: parseInt(categoryId),
      url,
      original_url: originalUrl,
      is_face_blurred: originalUrl !== null, // 원본이 있으면 블러 적용 상태
      caption: caption ?? null,
    })
    .select("id")
    .single();

  if (error) return { error: "사진 저장 중 오류가 발생했습니다." };

  revalidatePath("/board/photos");
  revalidatePath("/board/photos", "layout");
  revalidatePath("/board/photos/[id]", "page");
  return { error: "", id: data.id };
}

// ── 얼굴 블러 토글 ────────────────────────────────────────────
export async function toggleFaceBlur(
  id: string,
  isFaceBlurred: boolean,
): Promise<{ error: string }> {
  await requireSession();
  const { error } = await adminSupabase
    .from("photos")
    .update({ is_face_blurred: isFaceBlurred })
    .eq("id", id);

  if (error) return { error: "업데이트 중 오류가 발생했습니다." };

  revalidatePath("/board/photos");
  revalidatePath("/board/photos", "layout");
  revalidatePath("/board/photos/[id]", "page");
  return { error: "" };
}

// ── 캡션 수정 ─────────────────────────────────────────────────
export async function updatePhotoCaption(id: string, caption: string) {
  await requireSession();
  await adminSupabase
    .from("photos")
    .update({ caption: caption.trim() || null })
    .eq("id", id);
  revalidatePath("/board/photos");
  revalidatePath("/board/photos", "layout");
  revalidatePath("/board/photos/[id]", "page");
}
