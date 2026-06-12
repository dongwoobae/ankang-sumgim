export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// 이메일 제목용: CR/LF 제거 (헤더 인젝션 차단)
export function stripNewlines(s: string): string {
  return s.replace(/[\r\n]+/g, " ").trim();
}
