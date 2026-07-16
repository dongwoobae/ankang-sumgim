import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, MessageSquare, PlusCircle } from "lucide-react";

type StatCardProps = {
  label: string;
  value: number;
  icon: ReactNode;
  href: string;
};

type RecentNotice = {
  id: number;
  title: string;
  created_at: string;
};

type RecentInquiry = {
  id: number;
  name: string;
  title: string;
  is_answered: boolean;
};

export function StatCard({ label, value, icon, href }: StatCardProps) {
  return (
    <Link
      href={href}
      className="group bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-6 hover:border-[#1A56A0] hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[#1A56A0]">{icon}</span>
        <span className="text-[#5A7A99] text-sm">{label}</span>
      </div>
      <p className="text-[#1A2E4A] text-3xl font-bold">
        {value}
        <span className="text-sm font-normal text-[#5A7A99] ml-1">건</span>
      </p>
    </Link>
  );
}

export function QuickActionsPanel() {
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
    <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-6">
      <h2 className="text-[#1A2E4A] font-bold mb-4 text-sm">빠른 작업</h2>
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
  );
}

export function RecentNoticesPanel({ notices }: { notices: RecentNotice[] }) {
  return (
    <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#1A2E4A] font-bold text-sm">최근 공지사항</h2>
        <Link href="/admin/notices" className="text-[#1A56A0] text-xs hover:underline">
          전체 보기
        </Link>
      </div>
      {notices.length === 0 ? (
        <p className="text-[#5A7A99] text-sm">등록된 공지가 없습니다.</p>
      ) : (
        <ul className="space-y-2.5">
          {notices.map((n) => (
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
  );
}

export function RecentInquiriesPanel({ inquiries }: { inquiries: RecentInquiry[] }) {
  return (
    <div className="bg-[#FFFFFF] border border-[#A8C4E0]/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#1A2E4A] font-bold text-sm">최근 문의</h2>
        <Link href="/admin/inquiries" className="text-[#1A56A0] text-xs hover:underline">
          전체 보기
        </Link>
      </div>
      {inquiries.length === 0 ? (
        <p className="text-[#5A7A99] text-sm">접수된 문의가 없습니다.</p>
      ) : (
        <ul className="space-y-2.5">
          {inquiries.map((inq) => (
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
  );
}
