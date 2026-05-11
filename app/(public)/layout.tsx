import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButton from "@/components/layout/FloatingButton";
import { Analytics } from "@vercel/analytics/next";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#FFFFFF] text-[#1A2E4A]">
      <Header />
      <main className="min-h-screen pt-[108px]">{children}</main>
      <Footer />
      <FloatingButton />
      <Analytics />
    </div>
  );
}
