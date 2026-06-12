"use client";

import { useState } from "react";
import Toolbar from "./Toolbar";
import { NoticeRow, PinnedNoticeCard, type Notice } from "./NoticeCards";

export default function NoticeList({ notices }: { notices: Notice[] }) {
  const [chip, setChip] = useState("all");
  const [query, setQuery] = useState("");

  const pinned = notices.filter((n) => n.is_pinned);
  const regular = notices.filter((n) => !n.is_pinned);
  const firstPinned = pinned[0] ?? null;

  const q = query.trim().toLowerCase();

  const matchesQuery = (n: Notice) =>
    !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);

  const showPinnedCard =
    firstPinned &&
    chip !== "general" &&
    matchesQuery(firstPinned);

  const listItems = (() => {
    let base: Notice[];
    if (chip === "important") base = pinned;
    else if (chip === "general") base = regular;
    else base = firstPinned ? [...pinned.slice(1), ...regular] : regular;
    return base.filter(matchesQuery);
  })();

  const isEmpty = !showPinnedCard && listItems.length === 0;

  return (
    <>
      <Toolbar
        chips={[
          { label: "전체", value: "all", count: notices.length },
          { label: "중요", value: "important", count: pinned.length },
          { label: "일반", value: "general", count: regular.length },
        ]}
        defaultChip="all"
        searchPlaceholder="제목·내용으로 검색"
        onChipChange={setChip}
        onSearch={setQuery}
      />

      {notices.length === 0 ? (
        <p className="py-16 text-center" style={{ color: "var(--muted)" }}>
          등록된 공지사항이 없습니다.
        </p>
      ) : isEmpty ? (
        <p className="py-16 text-center" style={{ color: "var(--muted)" }}>
          {q ? `"${query}"에 해당하는 공지사항이 없습니다.` : "해당하는 공지사항이 없습니다."}
        </p>
      ) : (
        <>
          {/* 고정 공지 카드 */}
          {showPinnedCard && <PinnedNoticeCard notice={firstPinned} />}

          {/* 목록 */}
          <ul className="m-0 list-none p-0">
            {listItems.map((notice) => (
              <NoticeRow key={notice.id} notice={notice} />
            ))}
          </ul>
        </>
      )}
    </>
  );
}
