import { expect, test, type Page } from "@playwright/test";

// 안강은 따로 페이지를 두지 않고 경주 페이지 안 섹션으로 싣는다 — docs/specs/area-pages.md "만들지 않는 지역"

/** 고정 헤더에 가리지 않으면서, 맨 위에 그대로 있지도 않고 섹션까지 내려왔는지 본다. */
async function expectAngangSectionUnderHeader(page: Page) {
  await expect(page).toHaveURL(/\/area\/gyeongju#angang$/);
  await expect(page.getByRole("heading", { name: "센터가 있는 안강읍" })).toBeVisible();

  const headerHeight = (await page.getByRole("banner").boundingBox())!.height;
  const section = page.locator("#angang");
  await expect(async () => {
    const y = (await section.boundingBox())!.y;
    expect(y).toBeGreaterThanOrEqual(headerHeight);
    expect(y).toBeLessThan(headerHeight + 48);
  }).toPass();
}

async function clickAngangInMegaMenu(page: Page) {
  const header = page.getByRole("banner");
  const angang = header.getByRole("link", { name: "안강" });
  // 하이드레이션 전에는 hover가 메가메뉴를 열지 않는다.
  await expect(async () => {
    await header.getByRole("button", { name: "지역 안내" }).hover();
    await expect(angang).toBeVisible({ timeout: 1_000 });
  }).toPass();
  await angang.click();
}

test("헤더의 안강을 누르면 경주 페이지의 안강읍 섹션이 헤더 바로 아래에 온다", async ({ page }) => {
  await page.goto("/");
  await clickAngangInMegaMenu(page);
  await expectAngangSectionUnderHeader(page);
});

test("경주 페이지 맨 위에서 헤더의 안강을 눌러도 섹션까지 내려간다", async ({ page }) => {
  await page.goto("/area/gyeongju");
  await clickAngangInMegaMenu(page);
  await expectAngangSectionUnderHeader(page);
});

test.describe("모바일", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("햄버거 메뉴의 안강도 안강읍 섹션으로 간다", async ({ page }) => {
    await page.goto("/");

    const angang = page.getByRole("banner").getByRole("link", { name: "안강" });
    // 하이드레이션 전 클릭은 무시된다. 햄버거는 토글이라 열린 뒤에는 다시 누르지 않는다.
    await expect(async () => {
      if (!(await angang.isVisible())) await page.getByRole("button", { name: "메뉴" }).click();
      await expect(angang).toBeVisible({ timeout: 1_000 });
    }).toPass();
    await angang.click();

    await expectAngangSectionUnderHeader(page);
  });
});

test("안강읍 섹션은 경주 페이지에만 있다", async ({ request }) => {
  const gyeongju = await (await request.get("/area/gyeongju")).text();
  const pohang = await (await request.get("/area/pohang")).text();
  expect(gyeongju).toContain('id="angang"');
  expect(pohang).not.toContain('id="angang"');
});
