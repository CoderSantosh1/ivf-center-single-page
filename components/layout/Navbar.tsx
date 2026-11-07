"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import type { Brand, HeaderData } from "@/types/category";

export function Logo({ brand, light = false }: { brand: Brand; light?: boolean }) {
  return (
    <a href={brand.href} className="group flex items-center gap-2.5">
      <span className="relative grid size-10 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-500/30 transition-transform duration-500 group-hover:rotate-[360deg]">
        <Heart size={20} className="fill-white text-white" />
      </span>
      <span className="leading-none">
        <span className={`block font-display text-xl font-bold ${light ? "text-white" : "text-ink-900"}`}>
          {brand.name}
          <span className="font-serif font-normal text-brand-500 italic">{brand.highlight}</span>
        </span>
        <span className={`text-[10px] tracking-[0.25em] uppercase ${light ? "text-ink-400" : "text-ink-500"}`}>
          {brand.tagline}
        </span>
      </span>
    </a>
  );
}

export default function Navbar({ data, brand }: { data: HeaderData; brand: Brand }) {
  const links = data.navLinks;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(links[0]?.id ?? "");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [links]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/80 py-3 shadow-[0_10px_40px_-15px_rgba(204,124,144,0.25)] backdrop-blur-xl" : "py-5"
      }`}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-brand-500 via-brand-400 to-sea-500"
        style={{ scaleX: progress }}
      />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo brand={brand} />

        <ul className="hidden items-center gap-1 rounded-full bg-white/60 p-1.5 ring-1 ring-ink-200/70 backdrop-blur xl:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative block rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                  active === l.id ? "text-white" : "text-ink-600 hover:text-brand-600"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-brand-500 shadow-md shadow-brand-500/30"
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href={data.ctaHref}
          className="relative hidden overflow-hidden rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 xl:inline-flex"
        >
          <span className="shimmer-btn absolute inset-0" />
          <span className="relative">{data.ctaLabel}</span>
        </a>

        <button
          aria-label={data.menuAriaLabel}
          onClick={() => setOpen(!open)}
          className="relative z-50 grid size-11 place-items-center rounded-xl bg-white shadow-md ring-1 ring-ink-200 xl:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink-800 transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute top-1.5 left-0 h-0.5 w-5 rounded bg-ink-800 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink-800 transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl xl:hidden"
          >
            <ul className="flex h-full flex-col items-center justify-center gap-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.05 + i * 0.06, type: "spring", stiffness: 260, damping: 24 } }}
                  exit={{ opacity: 0, y: 12 }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`font-serif text-3xl italic ${active === l.id ? "text-brand-600" : "text-ink-800"}`}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
