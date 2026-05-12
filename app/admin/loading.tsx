export default function AdminLoading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-4 border-[#1A2E4A] border-t-[#E8A020] animate-spin" />
        <p className="text-[#5A7A99] text-sm">불러오는 중...</p>
      </div>
    </div>
  );
}
