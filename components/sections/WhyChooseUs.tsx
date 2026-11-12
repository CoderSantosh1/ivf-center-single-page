
import Image from "next/image";
import type { WhyChooseUsData } from "@/types/category";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export default function WhyChooseUs({
  data,
}: {
  data: WhyChooseUsData;
}) {
  return (
    <section
      id={data.id}
      className="relative isolate overflow-hidden bg-[#fcf7f6] py-15 md:py-15"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#f3dce1]/40 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#f5e7df]/60 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <Reveal delay={100}>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e9cbd1] bg-white/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b66e80]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c77e90]" />
              Why Choose Us
            </span>

            <h2 className="font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[1.05] tracking-[-0.045em] text-[#493536]">
              {data.highlightTitle}
            </h2>
          </Reveal>

       
        </div>

        {/* Feature Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {data.items.map((item, index) => (
            <Reveal
              key={item.title}
              variant="up"
              delay={index * 100}
            >
              <article className="group relative h-full overflow-hidden rounded-[10px] border border-[#eddbdc] bg-white p-2  transition-all duration-500 hover:-translate-y-2 hover:border-[#dba9b5] hover:shadow-[0_20px_45px_rgba(91,58,62,0.10)]">

                {/* Image */}
              <div className="relative h-[320px] w-full overflow-hidden rounded-[10px] bg-[#f8eeee]">
                  {item.image ? (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center">
                      <Icon
                        name={item.icon}
                        size={34}
                        strokeWidth={1.5}
                        className="text-[#c77e90]"
                      />
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#382426]/80 via-[#382426]/15 to-transparent" />

                  {/* Title on Image */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-[20px] font-semibold leading-snug tracking-[-0.03em] text-white transition-transform duration-500 group-hover:translate-y-[-3px]">
                      {item.title}
                    </h3>
                  </div>
                </div>

              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
