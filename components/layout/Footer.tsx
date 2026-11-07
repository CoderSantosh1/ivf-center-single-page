"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import type { Brand, FooterData } from "@/types/category";
import { Logo } from "./Navbar";

export default function Footer({ data, brand }: { data: FooterData; brand: Brand }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative overflow-hidden bg-ink-950 pt-20 pb-8 text-ink-400">
      <div className="pointer-events-none absolute -top-40 left-1/2 size-96 -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo brand={brand} light />
            <p className="mt-5 text-sm leading-relaxed">{data.description}</p>
            <div className="mt-6 flex gap-3">
              {data.socialLinks.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full bg-white/5 text-sm font-semibold text-white ring-1 ring-white/10 transition-all hover:-translate-y-1 hover:bg-brand-500"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>
          {data.columns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-semibold text-white">{col.heading}</h4>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} className="group inline-flex items-center gap-2 transition-colors hover:text-brand-300">
                      <span className="h-px w-0 bg-brand-300 transition-all group-hover:w-4" />
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-semibold text-white">{data.newsletter.heading}</h4>
            <p className="mt-5 text-sm">{data.newsletter.description}</p>
            <form
              className="mt-4 flex overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10 focus-within:ring-brand-400"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={data.newsletter.placeholder}
                className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none"
              />
              <button className="bg-brand-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-600">
                {data.newsletter.buttonLabel}
              </button>
            </form>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row">
          <p>{data.copyright}</p>
          <p>
            {data.madeWith.before} <span className="inline-block animate-pulse text-brand-400">♥</span> {data.madeWith.after}
          </p>
        </div>
      </div>

      <a
        href={data.backToTop.href}
        aria-label={data.backToTop.label}
        className={`fixed right-6 bottom-6 z-40 grid size-12 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-xl shadow-brand-500/30 transition-all duration-500 hover:-translate-y-1 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"
        }`}
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
}
