"use client";

import { useActionState } from "react";
import { updateNotice } from "@/app/actions/admin/notices";
import { NoticeForm } from "../../NoticeForm";

type Notice = {
  id: string;
  title: string;
  content: string;
  is_pinned: boolean;
};

const initialState = { error: "" };

export function EditNoticeClient({ notice }: { notice: Notice }) {
  const updateWithId = updateNotice.bind(null, notice.id);
  const [state, action, pending] = useActionState(updateWithId, initialState);

  return (
    <NoticeForm
      action={action}
      state={state}
      pending={pending}
      defaultValues={{
        title: notice.title,
        content: notice.content,
        is_pinned: notice.is_pinned,
      }}
    />
  );
}
