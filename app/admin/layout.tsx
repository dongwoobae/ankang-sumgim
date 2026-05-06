import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#F5F0E8]">
      <AdminSidebar />
      {/* 모바일에서 사이드바가 overlay라 ml 불필요, 데스크탑은 사이드바가 레이아웃 차지 */}
      <main className="flex-1 overflow-auto pt-16 md:pt-0">{children}</main>
    </div>
  );
}
