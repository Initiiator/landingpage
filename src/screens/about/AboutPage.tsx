"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SmartMotionLink } from "@/components/SmartLink";
import { BlurIn, WordReveal, ScrollBlurIn, ScrollWordReveal, ScrollFadeUp, AmbientGlow, EASE } from "@/components/animations";
import { Navbar } from "@/screens/landing/sections/Navbar";
import { FinalCta } from "@/screens/landing/sections/FinalCta";
import { LAUNCHED, PRIMARY_CTA_HREF } from "@/lib/launch";
import imgHero from "@/assets/about/hero.webp";

/* ── Value icons ──────────────────────────────────────────────────────────── */
function ShieldIcon() {
  return (
    <svg className="block size-[44%]" viewBox="0 0 24 24" fill="none">
      <path d="M12 2.5 4.5 5.5v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V5.5L12 2.5Z" fill="#FF5A00" />
    </svg>
  );
}
function SparkIcon() {
  return (
    <svg className="block size-[44%]" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" fill="#FF5A00" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg className="block size-[44%]" viewBox="0 0 24 24" fill="none">
      <path d="M12 20.5C7 17 3.5 13.8 3.5 9.6 3.5 7 5.5 5 8 5c1.6 0 3.1.9 4 2.3C12.9 5.9 14.4 5 16 5c2.5 0 4.5 2 4.5 4.6 0 4.2-3.5 7.4-8.5 10.9Z" fill="#FF5A00" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg className="block size-[44%]" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="#FF5A00" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden h-[max(520px,calc(760*var(--u)))]">
      {/* Image bleeds up (matches Figma Y offset) and parallaxes on scroll */}
      <motion.img
        src={imgHero.src}
        alt=""
        style={{ y: bgY }}
        className="absolute inset-x-0 top-0 w-full h-[130%] object-cover object-top pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#f9f6f2] via-[#f9f6f2]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#f9f6f2] to-transparent pointer-events-none" />

      <div className="relative h-full flex flex-col justify-start max-w-[1680px] mx-auto px-[var(--ds-space-gutter)] pt-[max(120px,calc(398*var(--u)))]">
        <h1 className="font-['Poppins:SemiBold',sans-serif] not-italic text-h1 leading-heading text-[#1a1a1a] tracking-heading max-w-[740px]">
          <BlurIn delay={0.05} className="lg:whitespace-nowrap lg:inline-block">Creating the path to meaningful</BlurIn>
          <br aria-hidden />
          <BlurIn delay={0.28} className="text-[#ff6000]">connections</BlurIn>
          <BlurIn delay={0.42}>.</BlurIn>
        </h1>
        <p className="font-['Poppins:Regular',sans-serif] leading-subhead text-[rgba(26,26,26,0.7)] text-sm mt-[18px] max-w-[707px]">
          <WordReveal
            text="initiiator helps people discover communities, build authentic relationships, and turn shared interests into lasting connections."
            delay={0.5}
          />
        </p>
      </div>
    </div>
  );
}

/* ── Story + stats + mission ──────────────────────────────────────────────── */
const STATS = [
  { value: "2026", label: "Founded" },
  { value: "London", label: "Headquarters" },
  { value: "100%", label: "Real connections" },
];

function Story() {
  return (
    <div className="bg-[#f9f6f2] px-[var(--ds-space-gutter)] py-[var(--ds-space-section-y)]">
      <div className="w-full max-w-[872px] mx-auto flex flex-col gap-[max(32px,calc(56*var(--u)))]">
        <div className="flex flex-col gap-[20px]">
          <p className="font-['Poppins:Regular',sans-serif] leading-[1.7] text-body text-[rgba(26,26,26,0.7)]">
            <ScrollWordReveal text="We believe that technology should connect us to the real world, not isolate us from it. In a world where we spend hours endlessly swiping on screens, we realized we were missing out on the people standing right next to us." />
          </p>
          <p className="font-['Poppins:Regular',sans-serif] leading-[1.7] text-body text-[rgba(26,26,26,0.7)]">
            <ScrollWordReveal text="initiiator was born from a simple idea: what if we could use the power of modern mobile technology to facilitate immediate, real-world connections? No more digital pen-pals. No more ghosting. Just genuine, in-person interactions." delay={0.1} />
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-[clamp(16px,3vw,40px)]">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              className="flex flex-col items-start gap-[4px]"
            >
              <span className="font-['Poppins:Bold',sans-serif] text-gradient-brand text-h2 leading-none tracking-[-0.04em]">{s.value}</span>
              <span className="font-['Poppins:Regular',sans-serif] text-body text-[rgba(26,26,26,0.6)]">{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Mission */}
        <div className="flex flex-col gap-[14px]">
          <p className="font-['Poppins:SemiBold',sans-serif] text-[#1a1a1a] text-h3 leading-[1.1] tracking-[-0.025em]">
            <ScrollBlurIn>Our Mission</ScrollBlurIn>
          </p>
          <p className="font-['Poppins:Regular',sans-serif] leading-[1.7] text-body text-[rgba(26,26,26,0.7)] max-w-[640px]">
            <ScrollWordReveal text="To get people off their phones and talking to the people sharing their spaces. Whether it's a coffee shop, a conference, or a park, we want to help you break the ice naturally and safely." delay={0.1} />
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Our Values (2×2) ─────────────────────────────────────────────────────── */
const VALUES = [
  { icon: <ShieldIcon />, title: "Safety First", body: "Every interaction is designed with your safety in mind. You control who sees you and when." },
  { icon: <SparkIcon />, title: "Authenticity", body: "No filters, no personas. Just real people in real spaces having real conversations." },
  { icon: <HeartIcon />, title: "Genuine Connection", body: "We measure success by meaningful in-person meetups, not screen time or swipe counts." },
  { icon: <LockIcon />, title: "Privacy by Design", body: "Your data is yours. We never sell it, share it, or use it to manipulate your experience." },
];

function ValueCard({ icon, title, body, delay = 0 }: { icon: React.ReactNode; title: string; body: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
      className="bg-[#f9f6f2] rounded-[20px] w-full flex flex-col items-start text-left gap-[16px] p-[max(20px,calc(36*var(--u)))]"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 16 }}
        className="relative flex items-center justify-center bg-[rgba(255,90,0,0.08)] border-2 border-[rgba(255,90,0,0.19)] rounded-[clamp(12px,1.2vw,16px)] size-[clamp(48px,5vw,64px)] shrink-0"
      >
        {icon}
      </motion.div>
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[1.2] text-[#1a1a1a] text-h4 tracking-[-0.017em]">
        <ScrollBlurIn>{title}</ScrollBlurIn>
      </p>
      <p className="font-['Poppins:Regular',sans-serif] leading-[1.625] text-body text-[rgba(26,26,26,0.7)] w-full">
        <ScrollWordReveal text={body} delay={0.1} />
      </p>
    </motion.div>
  );
}

function Values() {
  return (
    <div className="relative bg-white px-[var(--ds-space-gutter)] py-[var(--ds-space-section-y)] overflow-hidden">
      <AmbientGlow />
      <div className="relative z-10 w-full max-w-[872px] mx-auto flex flex-col gap-[max(40px,calc(64*var(--u)))]">
        <p className="font-['Poppins:SemiBold',sans-serif] text-[#1a1a1a] text-h2 leading-[1.04] tracking-[-0.041em] text-center">
          <ScrollBlurIn>Our Values</ScrollBlurIn>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[max(16px,calc(24*var(--u)))] items-stretch">
          {VALUES.map((v, i) => (
            <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mini CTA band ────────────────────────────────────────────────────────── */
function CtaBand() {
  return (
    <div className="bg-[#f9f6f2] px-[var(--ds-space-gutter)] py-[var(--ds-space-section-y)]">
      <ScrollFadeUp className="flex flex-col items-center gap-[24px] text-center">
        <p className="font-['Poppins:SemiBold',sans-serif] text-[#1a1a1a] text-h3 tracking-[-0.025em]">
          Ready to make a real connection?
        </p>
        <SmartMotionLink
          href={PRIMARY_CTA_HREF}
          whileHover={{ y: -3, filter: "brightness(1.08)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="bg-gradient-brand drop-shadow-[0px_17px_15px_rgba(255,90,0,0.32)] flex h-[clamp(46px,5.5vw,55px)] items-center justify-center px-[clamp(28px,3.5vw,36px)] rounded-full min-w-[170px]"
        >
          <span className="font-['Poppins:Medium',sans-serif] text-[16px] text-white whitespace-nowrap">{LAUNCHED ? "Download initiiator" : "Join the waitlist"}</span>
        </SmartMotionLink>
      </ScrollFadeUp>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export function AboutPage() {
  return (
    <div className="bg-white flex flex-col w-full">
      <Navbar />
      <AboutHero />
      <Story />
      <Values />
      <CtaBand />
      <FinalCta />
    </div>
  );
}
