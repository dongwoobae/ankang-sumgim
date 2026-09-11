// app/robots.ts

import type { MetadataRoute } from "next";
import { SITE_URL as BASE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
