import { expect, test } from "@playwright/test";

// 사이트맵 말고는 크롤러가 하위 페이지를 찾을 길이 헤더 링크뿐이다.
const SUB_PAGES = [
  "/about/greeting",
  "/about/location",
  "/about/awards",
  "/recruit",
  "/services/insurance",
  "/services/visit-care",
  "/services/family-care",
  "/services/grade-apply",
  "/services/cognitive",
  "/calculator",
  "/inquiry",
  "/board/notice",
  "/board/photos",
];

test("홈 서버 HTML에 헤더의 모든 하위 페이지 링크가 실린다", async ({ request }) => {
  const res = await request.get("/");
  expect(res.ok()).toBe(true);
  const html = await res.text();
  const missing = SUB_PAGES.filter((href) => !html.includes(`href="${href}"`));
  expect(missing).toEqual([]);
});

test.describe("모바일", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("DOM에 남긴 메뉴는 닫혀 있다가 햄버거로 열린다", async ({ page }) => {
    await page.goto("/");
    const greeting = page.getByRole("link", { name: "인사말" });
    await expect(greeting).toBeHidden();
    await page.getByRole("button", { name: "메뉴" }).click();
    await expect(greeting).toBeVisible();
  });
});
