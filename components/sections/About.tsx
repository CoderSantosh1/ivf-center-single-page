import Image from "next/image";
import { Baby } from "lucide-react";
import type { AboutData } from "@/types/category";
import { Icon } from "@/components/ui/Icon";
import { Counter, Reveal } from "@/components/ui/Reveal";

export default function About({ data }: { data: AboutData }) {
  const [imgA, imgB] = data.images;
  const [countA, countB] = data.counters;

  return (
    <section id={data.id} className="relative overflow-hidden py-24 lg:py-15">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal variant="left" className="relative">
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-5">
              <div className="group relative aspect-[3/4] overflow-hidden rounded-t-[48%] rounded-b-[28px] border-[6px] border-white shadow-[0_20px_50px_rgba(159,100,111,0.18)]">
                <Image
                  src={imgA.src}
                  alt={imgA.alt}
                  fill
                  sizes="(min-width: 1024px) 280px, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              {countA && (
                <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-white shadow-xl shadow-brand-500/30">
                  <div className="font-display text-4xl font-bold">
                    <Counter to={countA.value} suffix={countA.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-brand-100">{countA.label}</div>
                </div>
              )}
            </div>
            <div className="space-y-5 pt-12">
              {countB && (
                <div className="rounded-3xl bg-sea-50 p-6 ring-1 ring-sea-100">
                  <div className="font-display text-4xl font-bold text-sea-700">
                    <Counter to={countB.value} suffix={countB.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-sea-800/70">{countB.label}</div>
                </div>
              )}
              <div className="group relative aspect-[3/4] overflow-hidden rounded-t-[48%] rounded-b-[28px] border-[6px] border-white shadow-[0_20px_50px_rgba(159,100,111,0.18)]">
                <Image
                  src={imgB.src}
                  alt={imgB.alt}
                  fill
                  sizes="(min-width: 1024px) 280px, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-2xl">
            <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
              <defs>
                <path id="circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
              </defs>
              <text className="fill-brand-600 text-[10.5px] font-semibold tracking-[0.2em] uppercase">
                <textPath href="#circle">{data.circleText}</textPath>
              </text>
            </svg>
            <Baby size={30} strokeWidth={1.5} className="text-brand-500" />
          </div>
        </Reveal>

        <div>
          <Reveal variant="right">
            <span className="text-sm font-semibold tracking-[0.2em] text-brand-600 uppercase">{data.eyebrow}</span>
            <h2 className="mt-4 font-display text-4xl leading-tight font-semibold text-ink-900 sm:text-5xl">
              {data.title} <span className="text-gradient italic">{data.highlightTitle}</span>
            </h2>
          </Reveal>
          {data.description && (
            <Reveal variant="right" delay={120}>
              <p className="mt-6 text-lg leading-relaxed text-ink-600">{data.description}</p>
            </Reveal>
          )}

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {data.features.map((f, i) => (
              <Reveal key={f.title} variant="zoom" delay={200 + i * 100}>
                <div className="group flex h-full flex-col items-center rounded-2xl border border-ink-100 bg-white p-5 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10">
                  <span className="grid size-14 place-items-center rounded-2xl bg-brand-50 text-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-brand-100">
                    <Icon name={f.icon} size={26} strokeWidth={1.5} className="text-brand-500" />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-ink-900">{f.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="up" delay={500}>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {data.gallery.map((img) => (
                <div key={img.src} className="group relative aspect-square overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="200px"
                    className="object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-3"
                  />
                  <div className="absolute inset-0 bg-brand-600/0 transition-colors duration-500 group-hover:bg-brand-600/20" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
