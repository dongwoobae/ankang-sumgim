import { expect, test } from "@playwright/test";

import { ADMIN_EMAIL, loginAsAdmin, resetBackend } from "./support/session";

test.describe("관리자 인증", () => {
  test.beforeEach(async ({ page }) => {
    await resetBackend(page);
  });

  // proxy.ts의 matcher가 /admin/:path* 전체를 덮는지 확인한다.
  // 여기 빠진 경로 하나가 공지·사진·상담문의·지원서 전체를 여는 구멍이 된다.
  for (const path of [
    "/admin",
    "/admin/photos",
    "/admin/notices",
    "/admin/inquiries",
    "/admin/recruits",
    "/admin/logs",
  ]) {
    test(`비로그인 상태로 ${path}에 들어가면 로그인 화면으로 보낸다`, async ({ page }) => {
      await page.goto(path);

      await expect(page).toHaveURL(/\/admin\/login$/);
      await expect(page.getByRole("heading", { name: "안강 섬김 관리자" })).toBeVisible();
    });
  }

  test("로그인 화면 자체는 인증 없이 열린다", async ({ page }) => {
    await page.goto("/admin/login");

    await expect(page).toHaveURL(/\/admin\/login$/);
    await expect(page.getByRole("button", { name: "로그인" })).toBeVisible();
  });

  test("잘못된 비밀번호는 안내하고 통과시키지 않는다", async ({ page }) => {
    await page.goto("/admin/login");
    await page.locator('input[name="email"]').fill(ADMIN_EMAIL);
    await page.locator('input[name="password"]').fill("wrong-password");
    await page.getByRole("button", { name: "로그인" }).click();

    await expect(page.getByText("이메일 또는 비밀번호가 올바르지 않습니다.")).toBeVisible();
    await expect(page).toHaveURL(/\/admin\/login$/);
  });

  test("올바른 정보로 로그인하면 관리자 화면에 들어간다", async ({ page }) => {
    await loginAsAdmin(page);

    await expect(page).not.toHaveURL(/\/admin\/login/);
    await page.goto("/admin/photos/1/upload");
    await expect(page.getByRole("heading", { name: "E2E 카테고리" })).toBeVisible();
  });
});

test.describe("공개 페이지", () => {
  test("관리자 로그인 없이도 열린다", async ({ page }) => {
    await page.goto("/calculator");
    await expect(page).toHaveURL(/\/calculator$/);
  });
});
