import { expect, test } from "@playwright/test";

// 사이트맵 말고는 크롤러가 하위 페이지를 찾을 길이 헤더 링크뿐이다.
const SUB_PAGES = [
  "/about/greeting",
  "/about/location",
  "/about/awards",
  "/recruit",
  "/services/insurance",
  "/services/visit-care",
  "/services/visit-bath",
  "/services/family-care",
  "/services/grade-apply",
  "/services/cognitive",
  "/calculator",
  "/inquiry",
  "/board/notice",
  "/board/photos",
  "/area/gyeongju",
  "/area/pohang",
];

test("홈 서버 HTML에 헤더의 모든 하위 페이지 링크가 실린다", async ({ request }) => {
  const res = await request.get("/");
  expect(res.ok()).toBe(true);
  const html = await res.text();
  const missing = SUB_PAGES.filter((href) => !html.includes(`href="${href}"`));
  expect(missing).toEqual([]);
});

test.describe("태블릿", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  // 헤더는 fixed라 넘쳐도 가로 스크롤이 생기지 않는다. 메뉴 끝을 컨테이너 안쪽 여백(px-6)과 비교한다.
  test("헤더 메뉴가 화면 폭 안에 들어간다", async ({ page }) => {
    await page.goto("/");
    const box = await page.locator("header nav").first().boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x + box!.width).toBeLessThanOrEqual(768 - 24);
  });
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
