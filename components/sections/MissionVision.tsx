import Image from "next/image";
import type { MissionVisionData } from "@/types/category";
import { Icon } from "@/components/ui/Icon";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export default function MissionVision({ data }: { data: MissionVisionData }) {
  return (
    <section id={data.id} className="relative overflow-hidden bg-[#fbf0ed] py-24 lg:py-15">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 size-96 animate-blob rounded-full bg-brand-200/60 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 size-96 animate-blob rounded-full bg-sea-100/90 blur-3xl [animation-delay:-6s]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(204,124,144,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(204,124,144,0.07)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} highlight={data.highlightTitle} subtitle={data.description} />

        <div className="grid gap-8 lg:grid-cols-2">
          {data.cards.map((c, i) => (
            <Reveal key={c.tag} variant="flip" delay={i * 150}>
              <article className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-t-[3.5rem] rounded-b-[2rem] border-[6px] border-white p-8 shadow-[0_20px_60px_rgba(159,100,111,0.18)] transition-all duration-500 hover:-translate-y-2 sm:p-10">
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#483534]/95 via-[#483534]/55 to-transparent" />
                <div
                  className={`absolute -top-20 -right-20 size-64 rounded-full bg-gradient-to-br ${c.gradient} opacity-40 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-60`}
                />
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <span
                      className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${c.gradient} text-2xl shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}
                    >
                      <Icon name={c.icon} size={26} strokeWidth={1.6} className="text-white" />
                    </span>
                    <span className="text-sm font-semibold tracking-[0.2em] text-white/85 uppercase">{c.tag}</span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl leading-snug font-semibold text-white sm:text-3xl">{c.title}</h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {data.values.map((v, i) => (
            <Reveal key={v.label} variant="zoom" delay={i * 90}>
              <div className="flex items-center gap-3 rounded-full bg-white px-6 py-3 text-ink-900 shadow-sm ring-1 ring-[#f0d4d8] transition-all duration-300 hover:scale-110 hover:ring-brand-300">
                <Icon name={v.icon} size={20} strokeWidth={1.6} className="text-brand-500" />
                <span className="font-medium">{v.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
