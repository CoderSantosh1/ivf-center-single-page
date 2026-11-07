"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { TestimonialsData } from "@/types/category";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 80, rotate: d * 1.5 }),
  center: { opacity: 1, x: 0, rotate: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -80, rotate: d * -1.5 }),
};

export default function Testimonials({ data }: { data: TestimonialsData }) {
  const testimonials = data.items;
  const [[i, dir], setSlide] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;

  const go = (d: number) => setSlide(([x]) => [(x + d + n) % n, d]);
  const goTo = (k: number) => setSlide(([x]) => [k, k >= x ? 1 : -1]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSlide(([x]) => [(x + 1) % n, 1]), data.autoplayMs);
    return () => clearInterval(t);
  }, [paused, n, i, data.autoplayMs]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  const t = testimonials[i];

  return (
    <section id={data.id} className="relative overflow-hidden bg-gradient-to-b from-background via-brand-50/60 to-background py-24 lg:py-0">
      <div className="pointer-events-none absolute top-20 -left-10 font-serif text-[22rem] leading-none text-brand-100 select-none">
        &ldquo;
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} highlight={data.highlightTitle} subtitle={data.description} />

        <Reveal variant="zoom">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl shadow-brand-500/10 ring-1 ring-brand-100 sm:p-12"
          >
            <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={i}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={onDragEnd}
              className="grid cursor-grab items-center gap-10 active:cursor-grabbing md:grid-cols-[auto_1fr]"
            >
            <div className="relative mx-auto">
              <div className="absolute -inset-3 animate-spin-slow rounded-full border-2 border-dashed border-brand-300" />
              <Image
                src={t.image.src}
                alt={t.image.alt}
                width={176}
                height={176}
                className="relative size-36 rounded-t-full rounded-b-[40%] border-[6px] border-white object-cover shadow-xl sm:size-44"
              />
              <span className="absolute -right-2 -bottom-2 grid size-12 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 font-display text-2xl text-white shadow-lg">
                &rdquo;
              </span>
            </div>
            <div>
              <div className="text-xl text-amber-400">★★★★★</div>
              <p className="mt-4 font-serif text-xl leading-relaxed text-ink-700 italic sm:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <div>
                  <div className="font-semibold text-ink-900">{t.name}</div>
                  <div className="text-sm text-ink-500">{t.place}</div>
                </div>
                <span className="ml-auto rounded-full bg-sea-50 px-4 py-1.5 text-xs font-semibold text-sea-700 ring-1 ring-sea-100">
                  {t.treatment}
                </span>
              </div>
            </div>
            </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-12 bottom-0 h-1 overflow-hidden rounded-full bg-brand-50">
              <div
                key={`bar-${i}-${paused}`}
                className="h-full bg-gradient-to-r from-brand-500 to-sea-500"
                style={{ animation: paused ? "none" : `progress ${data.autoplayMs}ms linear forwards`, width: paused ? "100%" : undefined }}
              />
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="grid size-12 place-items-center rounded-full bg-white text-ink-700 shadow-md ring-1 ring-ink-200 transition-all hover:-translate-x-1 hover:bg-brand-500 hover:text-white"
          >
            ←
          </button>
          <div className="flex gap-2">
            {testimonials.map((x, k) => (
              <button
                key={x.name}
                aria-label={`Show testimonial ${k + 1}`}
                onClick={() => goTo(k)}
                className={`h-2.5 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-brand-500" : "w-2.5 bg-brand-200 hover:bg-brand-300"}`}
              />
            ))}
          </div>
          <button
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="grid size-12 place-items-center rounded-full bg-white text-ink-700 shadow-md ring-1 ring-ink-200 transition-all hover:translate-x-1 hover:bg-brand-500 hover:text-white"
          >
            →
          </button>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {data.stats.map((s, k) => (
            <Reveal key={s.label} variant="up" delay={k * 100}>
              <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-ink-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                <div className="text-gradient font-display text-3xl font-bold">{s.value}</div>
                <div className="mt-1 text-sm text-ink-500">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
