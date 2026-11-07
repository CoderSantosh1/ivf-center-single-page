"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Lock } from "lucide-react";
import type { ContactData } from "@/types/category";
import { Icon } from "@/components/ui/Icon";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

const inputCls =
  "peer w-full rounded-xl border border-ink-200 bg-white px-4 pt-6 pb-2 text-ink-900 outline-none transition-all placeholder-transparent focus:border-brand-400 focus:ring-4 focus:ring-brand-100";
const labelCls =
  "pointer-events-none absolute top-2 left-4 text-xs font-medium text-ink-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-600";

export default function Contact({ data }: { data: ContactData }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const { form, emergency } = data;
  const inputs = form.fields.filter((f) => f.type !== "textarea");
  const textareas = form.fields.filter((f) => f.type === "textarea");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // No backend yet — simulate a request so the UI feedback can be seen.
    setTimeout(() => {
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    }, 1200);
  };

  return (
    <section id={data.id} className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute -right-40 top-20 size-[30rem] animate-blob rounded-full bg-sea-100/70 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} highlight={data.highlightTitle} subtitle={data.description} />

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-2">
            {data.info.map((c, i) => (
              <Reveal key={c.title} variant="left" delay={i * 120}>
                <div className="group flex gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-100 transition-all duration-500 hover:translate-x-2 hover:shadow-xl hover:shadow-brand-500/10">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                    <Icon name={c.icon} size={24} strokeWidth={1.5} className="text-brand-500" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink-900">{c.title}</h3>
                    {c.lines.map((l) => (
                      <p key={l} className="mt-1 text-sm text-ink-500">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal variant="left" delay={400}>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sea-500 to-sea-700 p-6 text-white shadow-xl shadow-sea-500/20">
                <div className="absolute -top-10 -right-10 size-32 animate-pulse rounded-full bg-white/10" />
                <h3 className="relative font-display text-2xl font-semibold">{emergency.title}</h3>
                <p className="relative mt-1 text-sea-100">{emergency.subtitle}</p>
                <a href={emergency.phoneHref} className="relative mt-4 inline-block text-2xl font-bold">
                  {emergency.phone}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal variant="right" className="lg:col-span-3">
            <form
              onSubmit={onSubmit}
              className="relative rounded-[2rem] bg-white p-8 shadow-2xl shadow-brand-500/10 ring-1 ring-ink-100 sm:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {inputs.map((f) => (
                  <div key={f.id} className="relative">
                    <input
                      id={f.id}
                      name={f.name}
                      type={f.type}
                      required={f.required}
                      placeholder={f.label}
                      className={inputCls}
                    />
                    <label htmlFor={f.id} className={labelCls}>
                      {f.label}
                    </label>
                  </div>
                ))}
                <div className="relative">
                  <select id={form.select.id} name={form.select.name} defaultValue="" className={`${inputCls} appearance-none`}>
                    <option value="" disabled>
                      {form.select.placeholder}
                    </option>
                    {form.select.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <label htmlFor={form.select.id} className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-ink-500">
                    {form.select.label}
                  </label>
                </div>
                {textareas.map((f) => (
                  <div key={f.id} className="relative sm:col-span-2">
                    <textarea
                      id={f.id}
                      name={f.name}
                      rows={4}
                      required={f.required}
                      placeholder={f.label}
                      className={`${inputCls} resize-none`}
                    />
                    <label htmlFor={f.id} className={labelCls}>
                      {f.label}
                    </label>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative mt-7 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-8 py-4 font-semibold text-white shadow-xl shadow-brand-500/30 transition-all hover:-translate-y-0.5 hover:shadow-2xl disabled:opacity-80"
              >
                <span className="shimmer-btn absolute inset-0" />
                {status === "sending" ? (
                  <span className="relative size-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  <span className="relative">{form.submitLabel}</span>
                )}
                {status !== "sending" && <span className="relative transition-transform group-hover:translate-x-1">→</span>}
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink-400">
                <Lock size={12} /> {form.privacyNote}
              </p>

              <AnimatePresence>
                {status === "sent" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 grid place-items-center rounded-[2rem] bg-white/95 p-8 text-center backdrop-blur"
                  >
                    <div>
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                        className="mx-auto grid size-20 place-items-center rounded-full bg-brand-100 text-brand-500"
                      >
                        <CheckCircle2 size={40} strokeWidth={1.5} />
                      </motion.div>
                      <h3 className="mt-5 font-display text-3xl font-semibold text-ink-900">{form.success.title}</h3>
                      <p className="mt-2 text-ink-500">{form.success.description}</p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-6 rounded-full bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white"
                      >
                        {form.success.resetLabel}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
