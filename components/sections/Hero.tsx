import Image from "next/image";
import { ArrowRight, Baby, Heart, Plus, Sparkles, Star } from "lucide-react";
import type { HeroData } from "@/types/category";

// Entrance animations are plain CSS (see globals.css) so they start on first paint,
// instead of waiting for JS to hydrate and leaving the hero blank.
export default function Hero({ data }: { data: HeroData }) {
  return (
    <section id={data.id} className="relative isolate overflow-hidden bg-[#fffaf8] pt-20">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-32 h-80 w-80 animate-blob rounded-full bg-[#f9e3e5]/70 blur-3xl" />
        <div className="absolute top-10 -right-32 h-96 w-96 animate-blob rounded-full bg-[#f6e5db]/70 blur-3xl [animation-delay:-5s]" />
        <div className="absolute bottom-0 left-[35%] h-56 w-56 rounded-full bg-[#fff0ed]/70 blur-3xl" />
        <svg
          viewBox="0 0 200 200"
          fill="none"
          className="absolute -bottom-10 -left-12 h-44 w-44 origin-bottom-left animate-sway text-[#e9b5bd]/60 sm:h-56 sm:w-56"
          aria-hidden="true"
        >
          <path d="M12 188C50 145 55 111 91 90C124 70 149 56 172 12" stroke="currentColor" strokeWidth="1.2" />
          <path d="M48 146C20 137 15 113 22 95C46 106 57 123 48 146Z" stroke="currentColor" />
          <path d="M91 90C64 76 63 51 78 35C101 51 108 73 91 90Z" stroke="currentColor" />
          <path d="M123 65C117 39 135 20 153 20C162 43 146 60 123 65Z" stroke="currentColor" />
        </svg>
      </div>

      <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-10 px-5 py-12 lg:min-h-[600px] lg:grid-cols-[0.95fr_1.05fr]">
        {/* LEFT CONTENT */}
        <div className="relative z-20 mx-auto w-full max-w-[570px] px-4 py-8 text-center lg:mx-0 lg:text-left">
          <div className="mb-6 inline-flex max-w-full animate-hero-up items-center gap-2 rounded-full border border-[#f0d4d8] bg-white/85 px-3.5 py-2 shadow-sm [animation-delay:100ms] sm:px-4">
            <Heart size={14} className="shrink-0 animate-pulse fill-[#d98b9a] text-[#d98b9a]" />
            <span className="text-[9px] font-semibold tracking-[0.16em] text-[#95666f] uppercase sm:text-[11px] sm:tracking-[0.19em]">
              {data.badge}
            </span>
          </div>

          <h1 className="text-[clamp(2.8rem,6.1vw,5.8rem)] leading-[1.02] font-medium tracking-[-0.065em] text-[#483534]">
            <span className="block animate-hero-up whitespace-nowrap [animation-delay:200ms]">{data.title}</span>
            <span className="mt-1 block animate-hero-left pr-2 font-serif font-normal tracking-[-0.06em] text-[#cc7c90] italic [animation-delay:380ms]">
              {data.highlightTitle}
            </span>
          </h1>

          <div className="mt-9 flex animate-hero-up flex-wrap items-center justify-center gap-4 [animation-delay:650ms] lg:justify-start">
            <a
              href={data.ctaHref}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#cc7c90] px-7 py-4 font-semibold text-white shadow-[0_14px_30px_rgba(204,124,144,0.35)] transition-all hover:-translate-y-1 hover:bg-[#b8667b]"
            >
              <span className="shimmer-btn absolute inset-0" />
              <span className="relative">{data.ctaLabel}</span>
              <ArrowRight size={18} className="relative transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-10 flex animate-hero-up items-center justify-center gap-6 [animation-delay:800ms] lg:justify-start">
            <div className="flex items-center gap-1 text-[#e0a54f]">
              {Array.from({ length: data.rating.stars }).map((_, i) => (
                <Star key={i} size={16} className="fill-current" />
              ))}
              <span className="ml-2 text-sm font-semibold text-[#483534]">{data.rating.value}</span>
            </div>
            <span className="h-5 w-px bg-[#f0d4d8]" />
            <span className="text-sm font-semibold text-[#483534]">
              {data.families.count} <span className="font-normal text-[#95666f]">{data.families.label}</span>
            </span>
          </div>

          <Sparkles size={20} strokeWidth={1.2} className="absolute top-[8%] right-[3%] hidden animate-twinkle text-[#dc9ba8] lg:block" />
        </div>

        {/* RIGHT IMAGE COMPOSITION */}
        <div className="relative mx-auto w-full max-w-[610px] animate-hero-right px-1 pt-2 pb-10 [animation-delay:150ms] sm:px-4 sm:pb-14 lg:ml-auto lg:px-0 lg:pt-0 lg:pb-8">
          <div className="absolute inset-x-[12%] top-[7%] h-[78%] animate-pulse rounded-full bg-[#f2d0d3]/60 blur-3xl [animation-duration:4s]" />
          <div className="pointer-events-none absolute top-[2%] right-[5%] hidden h-[85%] w-[78%] animate-sway rounded-[48%] border border-[#df9ba6]/60 sm:block" />

          {/* MAIN IMAGE */}
          <div className="relative ml-auto h-[330px] w-[88%] animate-bob sm:h-[440px] sm:w-[84%] md:h-[490px] lg:h-[530px] lg:w-[85%]">
            <div className="group relative h-full w-full overflow-hidden rounded-t-[48%] rounded-b-[43%] border-[6px] border-white bg-[#f5e4df] shadow-[0_20px_60px_rgba(159,100,111,0.17)] sm:border-[8px]">
              <Image
                src={data.mainImage.src}
                alt={data.mainImage.alt}
                fill
                preload
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 65vw, 500px"
                className="animate-kenburns object-cover object-center [animation-duration:12s]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#69454b]/15 via-transparent to-white/10" />
            </div>
          </div>

          {/* SECOND IMAGE — OVERLAPPING */}
          <div className="absolute bottom-0 left-0 z-10 h-[155px] w-[48%] animate-hero-pop [animation-delay:550ms] sm:left-[2%] sm:h-[205px] sm:w-[45%] md:h-[225px] lg:h-[235px]">
            <div className="relative h-full w-full animate-bob overflow-hidden rounded-t-[48%] rounded-b-[24px] border-[6px] border-white bg-[#f5e4df] shadow-[0_16px_40px_rgba(159,100,111,0.2)] [animation-delay:-2.5s] sm:border-[8px]">
              <Image
                src={data.secondaryImage.src}
                alt={data.secondaryImage.alt}
                fill
                sizes="(max-width: 640px) 45vw, 270px"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* FLOATING BADGE */}
          <div className="absolute top-[14%] left-[2%] z-20 animate-hero-pop [animation-delay:800ms] sm:left-[4%]">
            <div className="flex animate-bob items-center gap-3 rounded-2xl border border-[#f0d4d8] bg-white/90 px-4 py-3 shadow-[0_12px_30px_rgba(159,100,111,0.15)] backdrop-blur [animation-duration:4s]">
              <span className="grid size-10 place-items-center rounded-full bg-[#f9e3e5] text-[#cc7c90]">
                <Baby size={20} strokeWidth={1.6} />
              </span>
              <span className="text-left leading-tight">
                <span className="block text-sm font-semibold text-[#483534]">{data.successBadge.title}</span>
                <span className="text-xs text-[#95666f]">{data.successBadge.subtitle}</span>
              </span>
            </div>
          </div>

          {/* PLUS DECORATION */}
          <div className="absolute right-0 bottom-[24%] z-20 flex h-9 w-9 animate-quarter-turn items-center justify-center rounded-full bg-[#f4dfe0] text-[#c77e8d] sm:right-[1%] sm:h-11 sm:w-11">
            <Plus size={21} strokeWidth={1.3} />
          </div>

          {/* DOT PATTERN */}
          <div className="absolute top-[9%] right-[1%] z-10 grid grid-cols-4 gap-1.5 sm:gap-2">
            {Array.from({ length: 16 }).map((_, index) => (
              <span
                key={index}
                style={{ animationDelay: `${index * 0.12}s` }}
                className="h-1 w-1 animate-twinkle rounded-full bg-[#dfa5ae] sm:h-1.5 sm:w-1.5"
              />
            ))}
          </div>

          <Sparkles size={19} strokeWidth={1.2} className="absolute right-[13%] bottom-[10%] hidden animate-twinkle text-[#d79ba5] [animation-delay:-1.2s] sm:block" />
        </div>
      </div>

      {/* Marquee of specialities */}
      <div className="relative overflow-hidden border-y border-[#f8e2e3] bg-white/60 py-5">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {[...data.specialities, ...data.specialities].map((s, k) => (
            <span key={`${k}-${s}`} className="flex items-center gap-12 font-serif text-2xl text-[#b89f9b] italic">
              {s} <Sparkles size={16} strokeWidth={1.2} className="text-[#dc9ba8]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
