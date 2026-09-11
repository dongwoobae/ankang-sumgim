import { describe, expect, it, vi } from "vitest";

// 운영 값과 같은 모양 — 끝에 "/"가 붙어 있다.
vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.sumgim-welfare.com/");

vi.mock("@/lib/supabase/admin", () => ({
  adminSupabase: {
    from: (table: string) => ({
      select: () => ({
        order: () => ({
          limit: async () => ({
            data: [{ id: table === "notices" ? 8 : 12, created_at: "2026-08-01T00:00:00Z" }],
          }),
        }),
      }),
    }),
  },
}));

const { default: sitemap } = await import("@/app/sitemap");
const { default: robots } = await import("@/app/robots");
const { pageMetadata, SITE_URL } = await import("@/lib/seo");

/** 스킴 뒤에 "//"가 다시 나오면 경로가 깨진 URL이다. */
function hasDoubleSlash(url: string): boolean {
  return url.replace(/^https?:\/\//, "").includes("//");
}

describe("SITE_URL", () => {
  it("환경변수 끝의 /를 떼어낸다", () => {
    expect(SITE_URL).toBe("https://www.sumgim-welfare.com");
  });
});

describe("sitemap", () => {
  it("어떤 URL도 경로에 //를 갖지 않는다", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls.filter(hasDoubleSlash)).toEqual([]);
  });

  it("계산기와 구인 페이지를 싣는다", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls).toContain(`${SITE_URL}/calculator`);
    expect(urls).toContain(`${SITE_URL}/recruit`);
  });

  it("DB 상세 페이지도 같은 규칙으로 만든다", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls).toContain(`${SITE_URL}/board/notice/8`);
    expect(urls).toContain(`${SITE_URL}/board/photos/12`);
  });
});

describe("robots", () => {
  it("sitemap 주소에 //가 없다", () => {
    const { sitemap: url } = robots();
    expect(hasDoubleSlash(String(url))).toBe(false);
  });
});

describe("pageMetadata", () => {
  const meta = pageMetadata("/services/visit-care", {
    title: "방문요양서비스",
    description: "설명",
  });

  it("canonical과 og:url을 같은 경로로 둔다", () => {
    expect(meta.alternates?.canonical).toBe("/services/visit-care");
    expect(meta.openGraph?.url).toBe("/services/visit-care");
  });

  it("페이지 openGraph가 루트를 대체해도 공유 이미지가 남는다", () => {
    expect(meta.openGraph?.images).toEqual([
      expect.objectContaining({ url: "/og-image.jpg", width: 1200, height: 630 }),
    ]);
    expect(meta.openGraph?.siteName).toBe("안강 섬김 노인복지센터");
  });
});
