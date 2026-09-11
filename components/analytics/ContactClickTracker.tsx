"use client";

import { useEffect } from "react";
import { contactMethodOf, trackEvent } from "@/lib/analytics";

// 전화·카카오톡 링크가 헤더·히어로·푸터·플로팅 버튼 등에 흩어져 있어, 링크마다 달지 않고 문서 한 곳에서 잡는다.
export default function ContactClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!(e.target instanceof Element)) return;
      const href = e.target.closest("a[href]")?.getAttribute("href");
      const method = href ? contactMethodOf(href) : null;
      if (method) trackEvent("contact_click", { method });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
