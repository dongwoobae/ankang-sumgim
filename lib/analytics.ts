declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type ContactMethod = "phone" | "kakao";

export function contactMethodOf(href: string): ContactMethod | null {
  if (href.startsWith("tel:")) return "phone";
  if (/^https?:\/\/pf\.kakao\.com\//.test(href)) return "kakao";
  return null;
}

export function trackEvent(name: string, params?: Record<string, string>): void {
  window.gtag?.("event", name, params);
}
