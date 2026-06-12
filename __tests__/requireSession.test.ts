import { describe, it, expect, vi, beforeEach } from "vitest";

// next/headers(cookies)를 타지 않도록 server 모듈 전체를 목킹
const getUser = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({ auth: { getUser } })),
}));

import { requireSession } from "@/lib/auth/requireSession";

describe("requireSession", () => {
  beforeEach(() => {
    getUser.mockReset();
  });

  it("세션 없으면 UNAUTHORIZED throw", async () => {
    getUser.mockResolvedValue({ data: { user: null } });
    await expect(requireSession()).rejects.toThrow("UNAUTHORIZED");
  });

  it("인증된 유저면 user 반환", async () => {
    const user = { id: "u1", email: "admin@example.com" };
    getUser.mockResolvedValue({ data: { user } });
    await expect(requireSession()).resolves.toEqual(user);
  });
});
