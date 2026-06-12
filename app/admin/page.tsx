import { adminSupabase } from "@/lib/supabase/admin";
import { Megaphone, Images, MessageSquare } from "lucide-react";
import {
  QuickActionsPanel,
  RecentInquiriesPanel,
  RecentNoticesPanel,
  StatCard,
} from "./DashboardPanels";

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
  const [{ noticeCount, categoryCount, unansweredCount }, recentNotices, recentInquiries] =
    await Promise.all([getStats(), getRecentNotices(), getRecentInquiries()]);

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

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1
          className="text-[#1A2E4A] text-2xl font-bold"
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
          <StatCard
            key={stat.href}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            href={stat.href}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 빠른 작업 */}
        <QuickActionsPanel />

        {/* 최근 공지 */}
        <RecentNoticesPanel notices={recentNotices} />

        {/* 최근 문의 */}
        <RecentInquiriesPanel inquiries={recentInquiries} />
      </div>
    </div>
  );
}
