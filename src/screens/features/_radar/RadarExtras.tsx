"use client";

import { motion } from "motion/react";
import { ScrollBlurIn, EASE } from "@/components/animations";

/* ── Hero overlay: pulsing radar sweep + profile blips over the phone ───────── */

const BLIPS = [
  { x: "32%", y: "58%", delay: 0.2 },
  { x: "68%", y: "66%", delay: 0.9 },
  { x: "44%", y: "78%", delay: 1.5 },
];

export function RadarOverlay() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[8%] top-[40%] flex items-center justify-center">
      <div className="relative w-[70%] aspect-square">
        {/* expanding rings */}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border border-[#ff5a00]/40"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: [0, 0.6, 0] }}
            transition={{ duration: 3, ease: "easeOut", repeat: Infinity, delay: i * 1 }}
          />
        ))}
        {/* center dot */}
        <span className="absolute left-1/2 top-1/2 size-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff5a00] shadow-[0_0_12px_rgba(255,90,0,0.8)]" />
        {/* profile blips fading in at different distances */}
        {BLIPS.map((b, i) => (
          <motion.span
            key={i}
            className="absolute size-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-2 ring-[#ff5a00]"
            style={{ left: b.x, top: b.y }}
            animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: b.delay }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Extra sections rendered between the rows and the FAQ ───────────────────── */

const RANKING = [
  { n: "01", label: "Distance", desc: "Closest people first." },
  { n: "02", label: "Shared interests", desc: "More in common, higher up." },
  { n: "03", label: "Availability", desc: "Open to connect right now." },
  { n: "04", label: "Activity", desc: "What they're up to nearby." },
];

const INTENTS = [
  { label: "Open to conversation", desc: "Actively discoverable", on: true },
  { label: "Maybe later", desc: "Limited discoverability", on: false },
  { label: "Do not disturb", desc: "Hidden from prompts", on: false },
];

export function RadarExtras() {
  return (
    <div className="flex flex-col gap-[var(--ds-space-section-y)] pt-[var(--ds-space-section-y)]">
      {/* 120m proximity callout */}
      <ScrollFade>
        <div className="relative mx-auto w-full max-w-[1234px] rounded-[20px] bg-[#1a1a1a] text-white overflow-hidden px-[max(28px,calc(80*var(--u)))] py-[max(40px,calc(80*var(--u)))] text-center">
          {/* faint radar rings in the bg */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.12]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="absolute rounded-full border border-[#ff5a00]" style={{ width: `${40 + i * 28}%`, aspectRatio: "1" }} />
            ))}
          </div>
          <p className="relative font-['Poppins:Bold',sans-serif] text-display leading-none tracking-[-0.047em] text-[#ff6000]">120m</p>
          <p className="relative mt-[16px] font-['Poppins:SemiBold',sans-serif] text-h3 tracking-[-0.025em]">
            <ScrollBlurIn>Only the people right around you.</ScrollBlurIn>
          </p>
          <p className="relative mt-[14px] mx-auto max-w-[520px] font-['Poppins:Regular',sans-serif] leading-[1.625] text-body text-[rgba(255,255,255,0.7)]">
            Live Radar surfaces people within 120 meters. The moment someone walks away, they leave your radar, so every connection begins where you are, when you're there.
          </p>
        </div>
      </ScrollFade>

      {/* Ranking factors explainer */}
      <ScrollFade>
        <div className="mx-auto w-full max-w-[1234px]">
          <p className="font-['Poppins:SemiBold',sans-serif] text-h2 leading-[1.04] tracking-[-0.041em] text-[#1a1a1a] text-center mb-[max(28px,calc(64*var(--u)))]">
            <ScrollBlurIn>How Live Radar ranks who you see</ScrollBlurIn>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[max(16px,calc(24*var(--u)))] items-stretch">
            {RANKING.map((r, i) => (
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
        </div>
      </ScrollFade>

      {/* Intent / availability states */}
      <ScrollFade>
        <div className="mx-auto w-full max-w-[1234px] text-center">
          <p className="font-['Poppins:SemiBold',sans-serif] text-h2 leading-[1.04] tracking-[-0.041em] text-[#1a1a1a] mb-[14px]">
            <ScrollBlurIn>You choose when you're visible</ScrollBlurIn>
          </p>
          <p className="font-['Poppins:Regular',sans-serif] leading-[1.625] text-body text-[rgba(26,26,26,0.7)] max-w-[560px] mx-auto mb-[max(28px,calc(48*var(--u)))]">
            Set your intent and Live Radar respects it. Go fully invisible anytime. Nobody discovers you unless you want them to.
          </p>
          <div className="flex flex-wrap justify-center gap-[max(12px,calc(20*var(--u)))]">
            {INTENTS.map((s, i) => (
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
                  <span className="block font-['Poppins:Regular',sans-serif] text-sm text-[rgba(26,26,26,0.7)]">{s.desc}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollFade>
    </div>
  );
}

function ScrollFade({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
