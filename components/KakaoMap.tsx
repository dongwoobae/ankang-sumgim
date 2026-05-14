export default function KakaoMap() {
  return (
    <iframe
      src="/map.html"
      width="100%"
      className="aspect-video w-full sm:aspect-auto sm:h-[420px]"
      style={{ border: 0, display: "block" }}
      title="안강 섬김 노인복지센터 위치 지도"
    />
  );
}
