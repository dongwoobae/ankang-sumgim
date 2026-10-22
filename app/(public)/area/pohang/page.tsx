import { type Metadata } from "next";
import AreaPage, { areaMetadata } from "@/components/area/AreaPage";
import { getServiceArea } from "@/lib/service-areas";

const area = getServiceArea("pohang");

export const metadata: Metadata = areaMetadata(area);

export default function PohangAreaPage() {
  return <AreaPage area={area} />;
}
