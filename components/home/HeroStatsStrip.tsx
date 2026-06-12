import Reveal from "@/components/common/Reveal";

const STRIP_ITEMS = [
  { b: `${new Date().getFullYear() - 2015}년`, t: "지역과 함께한 걸음" },
  { b: "4개 시군", t: "경주·안강·영천·포항" },
  { b: "목욕차 2대", t: "타 센터 대비 2배 보유" },
  { b: "월 1회", t: "요양사 정기 역량 강화" },
];

export default function HeroStatsStrip() {
  return (
    <div className="border-t border-white/18 pt-[22px] grid grid-cols-2 sm:grid-cols-4 gap-6 items-end">
      {STRIP_ITEMS.map((x, i) => (
        <Reveal key={i} variant="up-soft" stagger={4 + i}>
          <div className="text-white/85 text-[13px] md:block">
            <b className="block font-bold text-white mb-1 tracking-tight" style={{ fontSize: 22 }}>
              {x.b}
            </b>
            {x.t}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
