// app/sitemap.ts

import type { MetadataRoute } from "next";
import { adminSupabase } from "@/lib/supabase/admin";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/about/greeting`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/about/location`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/about/awards`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/services/insurance`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/visit-care`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/services/family-care`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/grade-apply`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/cognitive`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/inquiry`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/board/notice`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE}/board/photos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 동적 라우트 병렬 조회
  const [{ data: notices }, { data: categories }] = await Promise.all([
    adminSupabase
      .from("notices")
      .select("id, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
    adminSupabase
      .from("photo_categories")
      .select("id, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  const noticeRoutes: MetadataRoute.Sitemap = (notices ?? []).map((n) => ({
    url: `${BASE}/board/notice/${n.id}`,
    lastModified: new Date(n.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const photoRoutes: MetadataRoute.Sitemap = (categories ?? []).map((c) => ({
    url: `${BASE}/board/photos/${c.id}`,
    lastModified: new Date(c.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...noticeRoutes, ...photoRoutes];
}
