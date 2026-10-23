import { expect, test } from "@playwright/test";

// 원인과 수정은 app/layout.tsx의 data-scroll-behavior 주석.
test("페이지 아래에서 헤더 메뉴로 이동하면 새 페이지 맨 위에서 시작한다", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
  );

  const header = page.getByRole("banner");
  const calculator = header.getByRole("link", { name: "본인부담금 계산기" });
  // 하이드레이션 전에는 hover가 메가메뉴를 열지 않는다.
  await expect(async () => {
    await header.getByRole("button", { name: "장기요양보험" }).hover();
    await expect(calculator).toBeVisible({ timeout: 1_000 });
  }).toPass();
  await calculator.click();

  await expect(page).toHaveURL(/\/calculator$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});
