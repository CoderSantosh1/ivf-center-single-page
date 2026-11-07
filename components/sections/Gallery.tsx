"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { GalleryData, GalleryImage } from "@/types/category";
import { SectionHeading } from "@/components/ui/Reveal";


function Row({
  images,
  reverse = false,
  openLabel,
  onOpen,
}: {
  images: GalleryImage[];
  reverse?: boolean;
  openLabel: string;
  onOpen: (img: GalleryImage) => void;
}) {
  return (
    <div className="group/row flex overflow-hidden">
      <div
        className={`flex w-max gap-5 pr-5 group-hover/row:[animation-play-state:paused] ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {[...images, ...images].map((img, k) => (
          <button
            type="button"
            key={`${img.src}-${k}`}
            onClick={() => onOpen(img)}
            aria-label={openLabel}
            className={`group relative h-56 shrink-0 cursor-zoom-in overflow-hidden rounded-t-[48%] rounded-b-[28px] border-[5px] border-white shadow-[0_16px_40px_rgba(159,100,111,0.18)] sm:h-72 ${
              k % 3 === 0 ? "w-72 sm:w-96" : "w-56 sm:w-72"
            }`}
          >
            <Image
              src={img.thumb}
              alt={img.alt}
              fill
              sizes="384px"
              className="object-cover grayscale-[20%] sepia-[15%] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute bottom-4 left-4 translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <Heart size={26} className="fill-white text-white" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Gallery({ data }: { data: GalleryData }) {
  const allImages = data.rows.flat();
  const total = allImages.length;
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + total) % total)),
    [total],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const openImage = (img: GalleryImage) => setOpen(allImages.indexOf(img));
  const current = open === null ? null : allImages[open];
  const { labels } = data;

  return (
    <section id={data.id} className="relative overflow-hidden py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} highlight={data.highlightTitle} subtitle={data.description} />
      </div>
      <div className="space-y-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        {data.rows.map((row, r) => (
          <Row key={r} images={row} reverse={r % 2 === 1} openLabel={labels.open} onOpen={openImage} />
        ))}
      </div>

      <AnimatePresence>
        {open !== null && current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={labels.dialog}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label={labels.close}
              className="absolute top-4 right-4 z-10 grid size-12 place-items-center rounded-full bg-white text-ink-900 shadow-lg transition hover:rotate-90 hover:bg-brand-500 hover:text-white sm:top-6 sm:right-6"
            >
              <X size={24} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label={labels.previous}
              className="absolute left-3 z-10 grid size-11 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white hover:text-ink-900 sm:left-6"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label={labels.next}
              className="absolute right-3 z-10 grid size-11 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white hover:text-ink-900 sm:right-6"
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              key={current.src}
              className="relative h-full max-h-[85vh] w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                priority
                className="rounded-2xl object-contain"
              />
            </motion.div>

            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-4 py-1 text-sm text-white">
              {open + 1} / {total}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
