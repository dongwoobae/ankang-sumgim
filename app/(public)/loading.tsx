export default function PublicLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-[#A8C4E0] border-t-[#1A56A0] animate-spin" />
        <p className="text-[#5A7A99] text-sm">잠시만 기다려 주세요</p>
      </div>
    </div>
  );
}
