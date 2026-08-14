import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
  test: {
    environment: "node",
    // e2e/*.spec.ts는 Playwright 몫이다. 기본 include가 .spec.ts까지 잡아간다.
    include: ["__tests__/**/*.test.ts"],
  },
});
