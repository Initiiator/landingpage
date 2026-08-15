"use client";

import { motion, useReducedMotion } from "motion/react";
import { ScrollBlurIn, EASE } from "@/components/animations";

/* ════════════════════════════════════════════════════════════════════════
   SAFETY BAND
   WhatsApp-style trust band: each feature's real controls framed as a feature,
   grouped into Protection → Control → Support. Dark surface to match the
   StatCallout / 120m radar card. Pure markup — no asset dependency.
   ════════════════════════════════════════════════════════════════════════ */

export type SafetyKind = "protection" | "control" | "support";
export type SafetyPillar = { kind: SafetyKind; label: string; desc: string };

/* Filled (solid) glyphs — matches the house icon style (fill, not outline). */
const KIND_META: Record<SafetyKind, { tag: string; icon: React.ReactNode }> = {
  protection: {
    tag: "Protection",
    // solid shield with a knockout check
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2l8 3.2v5.3c0 5-3.4 9.2-8 10.5-4.6-1.3-8-5.5-8-10.5V5.2L12 2zm4.2 6.3a1 1 0 00-1.4-1.4l-4.2 4.2-1.6-1.6a1 1 0 10-1.4 1.4l2.3 2.3a1 1 0 001.4 0l4.9-4.9z"
      />
    ),
  },
  control: {
    tag: "Control",
    // solid sliders
    icon: (
      <path d="M3 6.5a1 1 0 011-1h3.1a2.5 2.5 0 014.8 0H20a1 1 0 110 2h-8.1a2.5 2.5 0 01-4.8 0H4a1 1 0 01-1-1zm0 11a1 1 0 011-1h8.1a2.5 2.5 0 014.8 0H20a1 1 0 110 2h-3.1a2.5 2.5 0 01-4.8 0H4a1 1 0 01-1-1zm5-5.5a2.5 2.5 0 014.8-1H20a1 1 0 110 2h-7.2a2.5 2.5 0 01-4.8-1z" />
    ),
  },
  support: {
    tag: "Support",
    // solid lifebuoy / support ring
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 6a4 4 0 100 8 4 4 0 000-8zm6.3-1.9l-2.5 2.5a6 6 0 010 6.8l2.5 2.5a9.5 9.5 0 000-11.8zM5.7 17.9l2.5-2.5a6 6 0 010-6.8L5.7 6.1a9.5 9.5 0 000 11.8z"
      />
    ),
  },
};

export function SafetyBand({ items, title = "Safe by design", subtitle }: { items: SafetyPillar[]; title?: string; subtitle?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto w-full max-w-[1234px] rounded-[20px] bg-[#1a1a1a] text-white overflow-hidden px-[max(28px,calc(72*var(--u)))] py-[max(40px,calc(72*var(--u)))]">
      {/* faint radar rings echoing the 120m card */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.10]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="absolute rounded-full border border-[#ff5a00]" style={{ width: `${36 + i * 26}%`, aspectRatio: "1" }} />
        ))}
      </div>

      <div className="relative text-center mb-[max(28px,calc(56*var(--u)))]">
        <p className="font-['Poppins:SemiBold',sans-serif] text-h2 leading-[1.04] tracking-[-0.041em]">
          <ScrollBlurIn>{title}</ScrollBlurIn>
        </p>
        {subtitle && (
          <p className="font-['Poppins:Regular',sans-serif] leading-[1.625] text-body text-[rgba(255,255,255,0.7)] max-w-[560px] mx-auto mt-[14px]">{subtitle}</p>
        )}
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[max(16px,calc(24*var(--u)))] items-stretch">
        {items.map((p, i) => {
          const meta = KIND_META[p.kind];
          return (
            <motion.div
              key={p.label}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="bg-[rgba(255,255,255,0.04)] rounded-[20px] border border-[rgba(255,255,255,0.08)] flex flex-col gap-[14px] p-[max(20px,calc(36*var(--u)))]"
            >
              <span className="flex items-center gap-[10px] text-[#ff6000]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">{meta.icon}</svg>
                <span className="font-['Poppins:Medium',sans-serif] text-sm uppercase tracking-[0.08em]">{meta.tag}</span>
              </span>
              <p className="font-['Poppins:SemiBold',sans-serif] leading-[1.2] text-h4 tracking-[-0.017em]">{p.label}</p>
              <p className="font-['Poppins:Regular',sans-serif] leading-[1.625] text-body text-[rgba(255,255,255,0.7)]">{p.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
