
import Image from "next/image";
import type { TreatmentsData } from "@/types/category";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export default function Treatments({ data }: { data: TreatmentsData }) {
  return (
    <section
      id={data.id}
      className="relative overflow-hidden bg-[#f7f0ee] py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Reveal variant="zoom">
            <span className="inline-flex items-center rounded-full border border-[#e7c7cf] bg-white/60 px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-[#b8667b] uppercase">
              {data.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05] font-medium tracking-[-0.05em] text-[#483534]">
              {data.title}{" "}
              <span className="text-gradient italic">
                {data.highlightTitle}
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Treatment Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.items.map((item, index) => (
            <Reveal key={item.title} variant="up" delay={index * 80}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-[#eecfd5] bg-white/80 shadow-[0_18px_40px_rgba(126,98,103,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(204,124,144,0.12)]">

                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#f7e6e8] via-[#fdf4f5] to-[#f8e6db]">
                  {item.image ? (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-[#cc7c90]">
                      <Icon
                        name={item.icon}
                        size={42}
                        strokeWidth={1.5}
                      />
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[clamp(1.5rem,2vw,2rem)] leading-tight font-medium tracking-[-0.05em] text-[#483534]">
                      {item.title}
                    </h3>

                    <span className="shrink-0 rounded-full border border-[#eecfd5] bg-[#fff7f8] px-3 py-1.5 text-[9px] font-semibold tracking-[0.15em] text-[#b8667b] uppercase">
                      {item.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#7a5f60] md:text-[0.96rem]">
                    {item.description}
                  </p>

                  {/* Book Now Button */}
                 <a
                  href="#contact"
                  className="mt-5 inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#b8667b] bg-transparent px-5 py-2 text-xs font-semibold text-[#b8667b] transition-all duration-300 hover:bg-[#b8667b] hover:text-white"
>
  Learn More
  <Icon
    name="sparkles"
    size={14}
    strokeWidth={1.8}
  />
</a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
