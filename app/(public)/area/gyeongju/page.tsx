import { type Metadata } from "next";
import AreaPage, { areaMetadata } from "@/components/area/AreaPage";
import { getServiceArea } from "@/lib/service-areas";

const area = getServiceArea("gyeongju");

export const metadata: Metadata = areaMetadata(area);

export default function GyeongjuAreaPage() {
  return <AreaPage area={area} />;
}
