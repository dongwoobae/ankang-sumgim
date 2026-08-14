import { defineConfig, devices } from "@playwright/test";

const APP_PORT = 3210;
const STUB_PORT = 54399;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false, // Supabase 대역 서버가 프로세스 하나에 상태를 들고 있다.
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://127.0.0.1:${APP_PORT}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: `node e2e/support/supabase-stub.mjs`,
      url: `http://127.0.0.1:${STUB_PORT}/__health`,
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
      env: { SUPABASE_STUB_PORT: String(STUB_PORT) },
    },
    {
      command: `npm run dev -- --hostname 127.0.0.1 --port ${APP_PORT}`,
      url: `http://127.0.0.1:${APP_PORT}/admin/login`,
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
      env: {
        NEXT_PUBLIC_SUPABASE_URL: `http://127.0.0.1:${STUB_PORT}`,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "e2e-anon-key",
        SUPABASE_SERVICE_ROLE_KEY: "e2e-service-role-key",
        // R2는 e2e에서 호출되지 않는다 — 업로드 API는 테스트가 가로챈다.
        R2_PUBLIC_URL: "http://127.0.0.1:54398",
      },
    },
  ],
});
