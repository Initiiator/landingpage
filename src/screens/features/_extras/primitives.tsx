"use client";

import { motion } from "motion/react";
import { ScrollBlurIn, EASE } from "@/components/animations";

/* ════════════════════════════════════════════════════════════════════════
   FEATURE-PAGE EXTRA-SECTION PRIMITIVES
   Reusable building blocks so every feature page's custom sections share the
   exact visual language of the landing page + RadarExtras: cream/dark surfaces,
   numbered cards, pill chips, gradient accents. Each feature supplies its own
   data; these render it consistently. Pure markup — no image dependencies.
   ════════════════════════════════════════════════════════════════════════ */

/** Wraps a block in the standard scroll fade-up used across extra sections. */
export function ScrollFade({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Outer container: stacks extra sections with consistent rhythm. */
export function ExtrasShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[var(--ds-space-section-y)] pt-[var(--ds-space-section-y)]">
      {children}
    </div>
  );
}

/** Centered section heading + optional subtitle, matching landing section heads. */
export function SectionHead({ title, subtitle }: { title: string; subtitle?: React.ReactNode }) {
  return (
    <div className="text-center mb-[max(28px,calc(56*var(--u)))]">
      <p className="font-['Poppins:SemiBold',sans-serif] text-h2 leading-[1.04] tracking-[-0.041em] text-[#1a1a1a]">
        <ScrollBlurIn>{title}</ScrollBlurIn>
      </p>
      {subtitle && (
        <p className="font-['Poppins:Regular',sans-serif] leading-[1.625] text-body text-[rgba(26,26,26,0.7)] max-w-[600px] mx-auto mt-[14px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** The big dark stat/callout card (like the 120m radar card). */
export function StatCallout({
  stat,
  title,
  body,
  rings = true,
}: {
  stat: string;
  title: string;
  body: string;
  rings?: boolean;
}) {
  return (
    <ScrollFade>
      <div className="relative mx-auto w-full max-w-[1234px] rounded-[20px] bg-[#1a1a1a] text-white overflow-hidden px-[max(28px,calc(80*var(--u)))] py-[max(40px,calc(80*var(--u)))] text-center">
        {rings && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.12]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="absolute rounded-full border border-[#ff5a00]" style={{ width: `${40 + i * 28}%`, aspectRatio: "1" }} />
            ))}
          </div>
        )}
        <p className="relative font-['Poppins:Bold',sans-serif] text-display leading-none tracking-[-0.047em] text-[#ff6000]">{stat}</p>
        <p className="relative mt-[16px] font-['Poppins:SemiBold',sans-serif] text-h3 tracking-[-0.025em]">
          <ScrollBlurIn>{title}</ScrollBlurIn>
        </p>
        <p className="relative mt-[14px] mx-auto max-w-[520px] font-['Poppins:Regular',sans-serif] leading-[1.625] text-body text-[rgba(255,255,255,0.7)]">
          {body}
        </p>
      </div>
    </ScrollFade>
  );
}

export type NumberedItem = { n: string; label: string; desc: string };

/** Responsive grid of numbered cards (like the radar ranking grid). */
export function NumberedGrid({ items, cols = 4 }: { items: NumberedItem[]; cols?: 2 | 3 | 4 }) {
  const colClass =
    cols === 2 ? "sm:grid-cols-2" : cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <div className={`grid grid-cols-1 ${colClass} gap-[max(16px,calc(24*var(--u)))] items-stretch`}>
      {items.map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
          className="bg-[#f9f6f2] rounded-[20px] w-full flex flex-col gap-[16px] p-[max(20px,calc(40*var(--u)))]"
        >
          <span className="bg-[rgba(255,90,0,0.08)] border-2 border-[rgba(255,90,0,0.19)] rounded-[clamp(12px,1.2vw,16px)] size-[clamp(48px,5vw,64px)] flex items-center justify-center shrink-0 font-['Poppins:Bold',sans-serif] text-[#ff5a00] text-h4 leading-none">{r.n}</span>
          <p className="font-['Poppins:SemiBold',sans-serif] leading-[1.2] text-[#1a1a1a] text-h4 tracking-[-0.017em]">{r.label}</p>
          <p className="font-['Poppins:Regular',sans-serif] leading-[1.625] text-body text-[rgba(26,26,26,0.7)]">{r.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

export type ChipItem = { label: string; desc?: string; on?: boolean };

/** Row of pill chips with a status dot (like the radar intent states). */
export function ChipRow({ items }: { items: ChipItem[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-[max(12px,calc(20*var(--u)))]">
      {items.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 280, damping: 20, delay: i * 0.1 }}
          className={`flex items-center gap-[10px] rounded-full px-[clamp(18px,2vw,24px)] py-[clamp(12px,1.5vw,16px)] border-2 ${
            s.on
              ? "bg-[rgba(255,90,0,0.08)] border-[rgba(255,90,0,0.19)]"
              : "bg-white border-[rgba(0,0,0,0.08)]"
          }`}
        >
          <span className={`size-[10px] rounded-full ${s.on ? "bg-[#ff5a00]" : "bg-[rgba(26,26,26,0.2)]"}`} />
          <span className="text-left">
            <span className={`block font-['Poppins:SemiBold',sans-serif] text-body ${s.on ? "text-[#ff5a00]" : "text-[#1a1a1a]"}`}>{s.label}</span>
            {s.desc && <span className="block font-['Poppins:Regular',sans-serif] text-sm text-[rgba(26,26,26,0.7)]">{s.desc}</span>}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export type StepItem = { label: string; desc: string };

/** Horizontal connected step flow (e.g. Sent → Received → Accepted). */
export function StepFlow({ steps }: { steps: StepItem[] }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch justify-center gap-[max(12px,calc(16*var(--u)))] max-w-[1100px] mx-auto">
      {steps.map((s, i) => (
        <div key={s.label} className="flex flex-col sm:flex-row items-center gap-[max(12px,calc(16*var(--u)))] flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.12 }}
            className="bg-white rounded-[20px] border border-[rgba(0,0,0,0.06)] w-full flex flex-col gap-[8px] p-[max(20px,calc(28*var(--u)))] text-center sm:text-left flex-1"
          >
            <span className="font-['Poppins:Bold',sans-serif] text-[#ff5a00] text-h4 leading-none mx-auto sm:mx-0">{String(i + 1).padStart(2, "0")}</span>
            <p className="font-['Poppins:SemiBold',sans-serif] leading-[1.2] text-[#1a1a1a] text-body-lg tracking-[-0.017em]">{s.label}</p>
            <p className="font-['Poppins:Regular',sans-serif] leading-[1.5] text-sm text-[rgba(26,26,26,0.7)]">{s.desc}</p>
          </motion.div>
          {i < steps.length - 1 && (
            <span className="text-[#ff5a00] shrink-0 rotate-90 sm:rotate-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export type CategoryItem = { label: string };

/** Wrapping set of category pills (e.g. space/event categories). */
export function CategoryCloud({ items }: { items: CategoryItem[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-[max(10px,calc(16*var(--u)))] max-w-[860px] mx-auto">
      {items.map((c, i) => (
        <motion.span
          key={c.label}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.06 }}
          className="bg-gradient-brand text-white font-['Poppins:Medium',sans-serif] text-body rounded-full px-[clamp(20px,2.4vw,28px)] py-[clamp(10px,1.4vw,14px)] drop-shadow-[0px_8px_14px_rgba(255,90,0,0.22)]"
        >
          {c.label}
        </motion.span>
      ))}
    </div>
  );
}
