import Link from "next/link";
import { adminSupabase } from "@/lib/supabase/admin";
import {
  Megaphone,
  Images,
  PlusCircle,
  ArrowRight,
  MessageSquare,
} from "lucide-react";

async function getStats() {
  const [
    { count: noticeCount },
    { count: categoryCount },
    { count: unansweredCount },
  ] = await Promise.all([
    adminSupabase.from("notices").select("*", { count: "exact", head: true }),
    adminSupabase
      .from("photo_categories")
      .select("*", { count: "exact", head: true }),
    adminSupabase
      .from("inquiries")
      .select("*", { count: "exact", head: true })
      .eq("is_answered", false),
  ]);
  return {
    noticeCount: noticeCount ?? 0,
    categoryCount: categoryCount ?? 0,
    unansweredCount: unansweredCount ?? 0,
  };
}

async function getRecentNotices() {
  const { data } = await adminSupabase
    .from("notices")
    .select("id, title, created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

async function getRecentInquiries() {
  const { data } = await adminSupabase
    .from("inquiries")
    .select("id, name, title, is_answered, created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

export default async function AdminDashboard() {
  const { noticeCount, categoryCount, unansweredCount } = await getStats();
  const [recentNotices, recentInquiries] = await Promise.all([
    getRecentNotices(),
    getRecentInquiries(),
  ]);

  const stats = [
    {
      label: "전체 공지사항",
      value: noticeCount,
      icon: <Megaphone size={20} />,
      href: "/admin/notices",
    },
    {
      label: "사진 카테고리",
      value: categoryCount,
      icon: <Images size={20} />,
      href: "/admin/photos",
    },
    {
      label: "미답변 문의",
      value: unansweredCount,
      icon: <MessageSquare size={20} />,
      href: "/admin/inquiries",
    },
  ];

  const shortcuts = [
    {
      label: "새 공지 작성",
      href: "/admin/notices/new",
      icon: <PlusCircle size={18} />,
    },
    {
      label: "새 카테고리 만들기",
      href: "/admin/photos/new",
      icon: <PlusCircle size={18} />,
    },
    {
      label: "문의 목록 보기",
      href: "/admin/inquiries",
      icon: <MessageSquare size={18} />,
    },
  ];

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1
          className="text-[#1A2E4A] text-2xl font-bold"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          대시보드
        </h1>
        <p className="text-[#5A7A99] text-sm mt-1">
          안강 섬김 노인복지센터 관리 페이지
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="group bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-6 hover:border-[#1A56A0] hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[#1A56A0]">{stat.icon}</span>
              <span className="text-[#5A7A99] text-sm">{stat.label}</span>
            </div>
            <p
              className="text-[#1A2E4A] text-3xl font-bold"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              {stat.value}
              <span className="text-sm font-normal text-[#5A7A99] ml-1">
                건
              </span>
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 빠른 작업 */}
        <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-6">
          <h2
            className="text-[#1A2E4A] font-bold mb-4 text-sm"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            빠른 작업
          </h2>
          <div className="space-y-2">
            {shortcuts.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center gap-3 px-4 py-3 bg-[#EEF4FB] rounded-lg text-[#1A2E4A] text-sm font-medium hover:bg-[#E8A020]/50 transition-colors"
              >
                <span className="text-[#1A56A0]">{s.icon}</span>
                {s.label}
                <ArrowRight size={14} className="ml-auto text-[#5A7A99]" />
              </Link>
            ))}
          </div>
        </div>

        {/* 최근 공지 */}
        <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-[#1A2E4A] font-bold text-sm"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              최근 공지사항
            </h2>
            <Link
              href="/admin/notices"
              className="text-[#1A56A0] text-xs hover:underline"
            >
              전체 보기
            </Link>
          </div>
          {recentNotices.length === 0 ? (
            <p className="text-[#5A7A99] text-sm">등록된 공지가 없습니다.</p>
          ) : (
            <ul className="space-y-2.5">
              {recentNotices.map((n) => (
                <li key={n.id}>
                  <Link
                    href={`/admin/notices/${n.id}/edit`}
                    className="flex items-start justify-between gap-2 text-sm group"
                  >
                    <span className="text-[#1A2E4A] group-hover:text-[#1A56A0] transition-colors truncate">
                      {n.title}
                    </span>
                    <span className="text-[#5A7A99] text-xs flex-shrink-0">
                      {new Date(n.created_at).toLocaleDateString("ko-KR", {
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 최근 문의 */}
        <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-[#1A2E4A] font-bold text-sm"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              최근 문의
            </h2>
            <Link
              href="/admin/inquiries"
              className="text-[#1A56A0] text-xs hover:underline"
            >
              전체 보기
            </Link>
          </div>
          {recentInquiries.length === 0 ? (
            <p className="text-[#5A7A99] text-sm">접수된 문의가 없습니다.</p>
          ) : (
            <ul className="space-y-2.5">
              {recentInquiries.map((inq) => (
                <li key={inq.id}>
                  <Link
                    href={`/admin/inquiries/${inq.id}`}
                    className="flex items-start justify-between gap-2 text-sm group"
                  >
                    <span className="text-[#1A2E4A] group-hover:text-[#1A56A0] transition-colors truncate">
                      {inq.name} · {inq.title}
                    </span>
                    <span
                      className={`text-xs flex-shrink-0 font-medium ${
                        inq.is_answered ? "text-[#5A7A99]" : "text-green-600"
                      }`}
                    >
                      {inq.is_answered ? "답변완료" : "미답변"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
