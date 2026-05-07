"use client";
import { useEffect, useRef, useState } from "react";

type RevealVariant = "up-soft" | "up-strong" | "fade";

interface Props {
  children: React.ReactNode;
  variant?: RevealVariant;
  stagger?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function Reveal({
  children,
  variant = "up-soft",
  stagger = 0,
  className = "",
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base =
    "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";
  const off =
    variant === "up-strong"
      ? "opacity-0 translate-y-12"
      : variant === "fade"
        ? "opacity-0"
        : "opacity-0 translate-y-6";
  const on = "opacity-100 translate-y-0";

  const TagEl = Tag as React.ElementType;

  return (
    <TagEl
      ref={ref}
      className={`${base} ${shown ? on : off} ${className}`}
      style={{ transitionDelay: `${stagger * 90}ms` }}
    >
      {children}
    </TagEl>
  );
}
