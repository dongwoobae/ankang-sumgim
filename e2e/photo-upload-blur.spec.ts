import path from "node:path";

import { expect, test } from "@playwright/test";

import { loginAsAdmin, resetBackend } from "./support/session";

const FIXTURE = path.join(__dirname, "fixtures", "sample.jpg");
const UPLOAD_PAGE = "/admin/photos/1/upload";

/**
 * 이 레포에서 지켜야 할 불변식은 "블러가 적용된다"가 아니라
 * "블러되지 않은 사진이 게시되지 않는다"다. 아래 테스트는 전부 그 한 문장을 본다.
 */
test.describe("사진 업로드 — 미처리 원본이 게시되지 않는다", () => {
  test.beforeEach(async ({ page }) => {
    await resetBackend(page);
    await loginAsAdmin(page);
  });

  test("얼굴 감지 모델을 못 불러오면 업로드 자체를 하지 않는다", async ({ page }) => {
    // face-api 가중치를 끊어 loadFaceApiModels()를 실패시킨다.
    await page.route("**/models/**", (route) => route.abort());

    let uploadCalls = 0;
    await page.route("**/api/upload-photo", (route) => {
      uploadCalls += 1;
      return route.fulfill({ status: 200, body: JSON.stringify({ url: "http://x/y.webp" }) });
    });

    await page.goto(UPLOAD_PAGE);
    await page.locator('input[type="file"]').setInputFiles(FIXTURE);

    await expect(page.getByText(/얼굴 감지에 실패했습니다/)).toBeVisible();
    await expect(page.getByText(/업로드하지 않았습니다/)).toBeVisible();
    expect(uploadCalls).toBe(0);
    await expect(page.getByText(/등록된 사진 \(/)).toHaveCount(0);
  });

  test("서버가 블러를 적용하지 못하면 사진이 목록에 올라가지 않는다", async ({ page }) => {
    // composePhotoUpload가 좌표를 전부 걸러냈을 때 route.ts가 내는 응답이다.
    await page.route("**/api/upload-photo", (route) =>
      route.fulfill({
        status: 422,
        contentType: "application/json",
        body: JSON.stringify({
          error: "감지된 얼굴에 블러를 적용할 수 없습니다. 사진을 다시 확인해 주세요.",
        }),
      }),
    );

    await page.goto(UPLOAD_PAGE);
    await page.locator('input[type="file"]').setInputFiles(FIXTURE);

    await expect(page.getByText(/블러를 적용할 수 없습니다/)).toBeVisible();
    await expect(page.getByText(/등록된 사진 \(/)).toHaveCount(0);

    // 새로고침해도 저장돼 있지 않다 — 클라이언트 상태만 막은 게 아니다.
    await page.reload();
    await expect(page.getByText(/등록된 사진 \(/)).toHaveCount(0);
  });

  test("업로드가 성공하면 목록에 올라간다", async ({ page }) => {
    await page.route("**/api/upload-photo", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          url: "http://127.0.0.1:54398/photos/categories/1/blurred/e2e.webp",
          originalUrl: "http://127.0.0.1:54398/photos/categories/1/original/e2e.webp",
        }),
      }),
    );

    await page.goto(UPLOAD_PAGE);
    await page.locator('input[type="file"]').setInputFiles(FIXTURE);

    await expect(page.getByText("등록된 사진 (1장)")).toBeVisible();
    await expect(page.getByText("블러 적용")).toBeVisible();

    await page.reload();
    await expect(page.getByText("등록된 사진 (1장)")).toBeVisible();
  });
});
