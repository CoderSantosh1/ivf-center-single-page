"use client";

import { motion, type PanInfo } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { ProjectsData } from "@/types/category";
import { SectionHeading } from "@/components/ui/Reveal";


// Pose for each slot relative to the centre card (FRUU-style carousel:
// big centre card, smaller side cards staggered up/down, cycling right → left).
function pose(offset: number) {
  const abs = Math.abs(offset);
  if (offset === 0) return { x: "0%", y: 0, scale: 1, opacity: 1, zIndex: 30, rotate: 0 };
  if (abs === 1)
    return {
      x: `${offset * 92}%`,
      y: offset < 0 ? 70 : -70, // left card sits lower, right card higher
      scale: 0.62,
      opacity: 0.9,
      zIndex: 20,
      rotate: 0,
    };
  return {
    x: `${Math.sign(offset) * 150}%`,
    y: offset < 0 ? 120 : -120,
    scale: 0.4,
    opacity: 0,
    zIndex: 10,
    rotate: 0,
  };
}

export default function Projects({ data }: { data: ProjectsData }) {
  const projects = data.items;
  const n = projects.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % n), data.autoplayMs);
    return () => clearInterval(id);
  }, [paused, n, data.autoplayMs]);

  const go = (dir: number) => setIndex((i) => (i + dir + n) % n);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 50 || info.velocity.x > 400) go(-1);
  };

  return (
    <section id={data.id} className="relative overflow-hidden py-24 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} highlight={data.highlightTitle} subtitle={data.description} />

        <div
          className="relative mx-auto mt-8 h-[520px] max-w-5xl sm:h-[580px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            className="absolute inset-0 flex cursor-grab items-center justify-center active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
          >
            {projects.map((p, i) => {
              // shortest signed distance from the active card
              let offset = (i - index + n) % n;
              if (offset > n / 2) offset -= n;
              const isActive = offset === 0;

              return (
                <motion.a
                  key={p.title}
                  href={isActive ? p.href : undefined}
                  onClick={(e) => {
                    if (!isActive) {
                      e.preventDefault();
                      go(offset);
                    }
                  }}
                  initial={false}
                  animate={pose(offset)}
                  transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.9 }}
                  style={{ pointerEvents: Math.abs(offset) > 1 ? "none" : "auto" }}
                  className="group absolute block aspect-[4/5] w-[68%] max-w-[340px] overflow-hidden rounded-[2rem] border-[6px] border-white bg-white shadow-2xl shadow-ink-950/20 sm:w-[340px]"
                  draggable={false}
                >
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    fill
                    draggable={false}
                    sizes="340px"
                    className="rounded-[1.6rem] object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 rounded-[1.6rem] bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-600 backdrop-blur">
                    {p.category}
                  </span>
                  <motion.div
                    className="absolute inset-x-0 bottom-0 p-6"
                    animate={{ opacity: isActive ? 1 : 0.6, y: isActive ? 0 : 10 }}
                    transition={{ duration: 0.5, delay: isActive ? 0.2 : 0 }}
                  >
                    <motion.span
                      className="inline-block rounded-full bg-sea-500 px-3 py-1 text-xs font-bold text-white"
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                      transition={{ duration: 0.45, delay: isActive ? 0.3 : 0 }}
                    >
                      {p.stat}
                    </motion.span>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-white">{p.title}</h3>
                    <motion.span
                      className="mt-3 block h-0.5 bg-brand-400"
                      animate={{ width: isActive ? 96 : 40 }}
                      transition={{ duration: 0.5, delay: isActive ? 0.35 : 0 }}
                    />
                  </motion.div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={data.previousLabel}
            className="grid size-11 place-items-center rounded-full border border-ink-900/10 bg-white text-ink-900 shadow-sm transition hover:bg-brand-500 hover:text-white"
          >
            ←
          </button>
          <div className="flex gap-2">
            {projects.map((p, i) => (
              <button
                key={p.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${p.title}`}
                className={`h-2 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-brand-500" : "w-2 bg-ink-900/20"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={data.nextLabel}
            className="grid size-11 place-items-center rounded-full border border-ink-900/10 bg-white text-ink-900 shadow-sm transition hover:bg-brand-500 hover:text-white"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
