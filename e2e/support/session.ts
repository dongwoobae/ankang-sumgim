import type { Page } from "@playwright/test";

export const ADMIN_EMAIL = "admin@example.com";
export const ADMIN_PASSWORD = "e2e-password";
export const STUB_ORIGIN = "http://127.0.0.1:54399";

/** 대역 서버의 in-memory 사진 목록을 비운다. 테스트 간 격리용. */
export async function resetBackend(page: Page) {
  await page.request.get(`${STUB_ORIGIN}/__reset`);
}

export async function loginAsAdmin(page: Page) {
  await page.goto("/admin/login");
  await page.locator('input[name="email"]').fill(ADMIN_EMAIL);
  await page.locator('input[name="password"]').fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: "로그인" }).click();
  await page.waitForURL((url) => !url.pathname.startsWith("/admin/login"));
}
