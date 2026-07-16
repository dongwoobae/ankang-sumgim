"use server";

import { requireSession } from "@/lib/auth/requireSession";
import { adminSupabase } from "@/lib/supabase/admin";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export type NoticeFormState = { error: string };

export async function createNotice(
  _prev: NoticeFormState,
  formData: FormData,
): Promise<NoticeFormState> {
  await requireSession();
  const title = (formData.get("title") as string).trim();
  const content = (formData.get("content") as string).trim();
  const is_pinned = formData.get("is_pinned") === "on";

  if (!title || !content) {
    return { error: "제목과 내용을 모두 입력해 주세요." };
  }

  const { error } = await adminSupabase.from("notices").insert({ title, content, is_pinned });

  if (error) return { error: "저장 중 오류가 발생했습니다." };

  revalidatePath("/");
  revalidatePath("/board/notice");
  revalidatePath("/board/notice", "layout");
  revalidatePath("/board/notice/[id]", "page");
  revalidatePath("/admin/notices");
  revalidatePath("/sitemap.xml");
  revalidateTag("notice-detail", {});
  redirect("/admin/notices");
}

export async function updateNotice(
  id: string,
  _prev: NoticeFormState,
  formData: FormData,
): Promise<NoticeFormState> {
  await requireSession();
  const title = (formData.get("title") as string).trim();
  const content = (formData.get("content") as string).trim();
  const is_pinned = formData.get("is_pinned") === "on";

  if (!title || !content) {
    return { error: "제목과 내용을 모두 입력해 주세요." };
  }

  const { error } = await adminSupabase
    .from("notices")
    .update({ title, content, is_pinned })
    .eq("id", id);

  if (error) return { error: "수정 중 오류가 발생했습니다." };

  revalidatePath("/");
  revalidatePath("/board/notice");
  revalidatePath("/board/notice", "layout");
  revalidatePath("/board/notice/[id]", "page");
  revalidatePath("/admin/notices");
  revalidatePath("/sitemap.xml");
  revalidateTag("notice-detail", {});
  redirect("/admin/notices");
}

export async function deleteNotice(id: string) {
  await requireSession();
  await adminSupabase.from("notices").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/board/notice");
  revalidatePath("/board/notice", "layout");
  revalidatePath("/board/notice/[id]", "page");
  revalidatePath("/admin/notices");
  revalidatePath("/sitemap.xml");
  revalidateTag("notice-detail", {});
}
