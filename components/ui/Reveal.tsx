"use client";

import { Heart } from "lucide-react";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Variant = "up" | "down" | "left" | "right" | "zoom" | "blur" | "flip";

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-variant={variant}
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Counts from 0 to `to` once it scrolls into view. */
export function Counter({ to, suffix = "", duration = 2000 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * to));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  light = false,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle?: string | null;
  light?: boolean;
}) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <Reveal variant="zoom">
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold tracking-[0.19em] uppercase shadow-sm ${
            light ? "border-white/20 bg-white/10 text-brand-200" : "border-[#f0d4d8] bg-white/85 text-[#95666f]"
          }`}
        >
          <Heart size={13} className="animate-pulse fill-[#d98b9a] text-[#d98b9a]" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={100}>
        <h2
          className={`mt-5 font-display text-3xl leading-[1.05] font-medium tracking-[-0.05em] sm:text-4xl ${
            light ? "text-white" : "text-ink-900"
          }`}
        >
          {title} <span className="text-gradient italic">{highlight}</span>
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={200}>
          <p className={`mt-5 text-lg leading-relaxed ${light ? "text-ink-300" : "text-ink-600"}`}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
