import { describe, expect, it } from "vitest";

import { escapeHtml, stripNewlines } from "@/lib/escapeHtml";

describe("escapeHtml", () => {
  it("script 태그를 이스케이프한다", () => {
    expect(escapeHtml("<script>")).toBe("&lt;script&gt;");
  });

  it("HTML 특수문자를 이스케이프한다", () => {
    expect(escapeHtml("&\"'")).toBe("&amp;&quot;&#39;");
  });
});

describe("stripNewlines", () => {
  it("CRLF를 공백으로 제거하고 trim한다", () => {
    expect(stripNewlines(" test\r\nBcc: attacker@example.com\n ")).toBe(
      "test Bcc: attacker@example.com",
    );
  });
});
