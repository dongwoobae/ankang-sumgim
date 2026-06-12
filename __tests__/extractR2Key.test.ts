import { beforeEach, describe, expect, it } from "vitest";

import { extractR2Key } from "@/lib/r2";

describe("extractR2Key", () => {
  beforeEach(() => {
    process.env.R2_PUBLIC_URL = "https://pub.example.com/root";
  });

  it("base path(prefix)를 제거한 key를 반환한다", () => {
    expect(extractR2Key("https://pub.example.com/root/photos/1.webp")).toBe(
      "photos/1.webp",
    );
  });

  it("base에 path가 없으면 전체 path를 key로 반환한다", () => {
    process.env.R2_PUBLIC_URL = "https://pub.example.com";
    expect(extractR2Key("https://pub.example.com/photos/1.webp")).toBe(
      "photos/1.webp",
    );
  });

  it("origin 같아도 base path 밖이면 null을 반환한다", () => {
    expect(extractR2Key("https://pub.example.com/other/photos/1.webp")).toBeNull();
  });

  it("다른 origin URL이면 null을 반환한다", () => {
    expect(extractR2Key("https://pub.example.com.evil.test/root/photos/1.webp")).toBeNull();
  });

  it("깨진 URL이면 null을 반환한다", () => {
    expect(extractR2Key("not a url")).toBeNull();
  });
});
