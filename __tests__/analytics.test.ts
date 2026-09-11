import { describe, expect, it } from "vitest";
import { contactMethodOf } from "@/lib/analytics";

describe("contactMethodOf", () => {
  it("tel: 링크는 phone", () => {
    expect(contactMethodOf("tel:054-763-5988")).toBe("phone");
  });

  it("카카오 채널 링크는 http·https 모두 kakao", () => {
    expect(contactMethodOf("http://pf.kakao.com/_zqvxbX")).toBe("kakao");
    expect(contactMethodOf("https://pf.kakao.com/_zqvxbX/chat")).toBe("kakao");
  });

  it("그 밖의 링크는 null", () => {
    expect(contactMethodOf("/inquiry")).toBeNull();
    expect(contactMethodOf("mailto:miyeong0695@daum.net")).toBeNull();
    expect(contactMethodOf("https://pf.kakao.com.evil.example/")).toBeNull();
  });
});
