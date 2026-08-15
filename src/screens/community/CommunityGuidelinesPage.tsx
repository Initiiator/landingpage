"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MotionLink } from "@/components/SmartLink";
import { BlurIn, WordReveal, ScrollBlurIn, ScrollWordReveal, ScrollFadeUp, AmbientGlow, EASE } from "@/components/animations";
import { Navbar } from "@/screens/landing/sections/Navbar";
import { FinalCta } from "@/screens/landing/sections/FinalCta";
import imgHero from "@/assets/commuguide/hero.webp";

/* ── Icons (match the design's orange badges) ─────────────────────────────── */
function HeartIcon() {
  return (
    <svg className="block size-[44%]" viewBox="0 0 24 24" fill="none">
      <path d="M12 20.5C7 17 3.5 13.8 3.5 9.6 3.5 7 5.5 5 8 5c1.6 0 3.1.9 4 2.3C12.9 5.9 14.4 5 16 5c2.5 0 4.5 2 4.5 4.6 0 4.2-3.5 7.4-8.5 10.9Z" fill="#FF5A00" />
    </svg>
  );
}
function PeopleIcon() {
  return (
    <svg className="block size-[44%]" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7.5" r="3.4" fill="#FF5A00" />
      <path d="M3 19c0-3.3 2.7-5.6 6-5.6s6 2.3 6 5.6Z" fill="#FF5A00" />
      <circle cx="17" cy="8.5" r="2.6" fill="#FF5A00" />
      <path d="M16 13.6c2.9.1 5 2.3 5 5.4h-4.2c0-2-.3-3.8-.8-5.4Z" fill="#FF5A00" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg className="block size-[44%]" viewBox="0 0 24 24" fill="none">
      <path d="M12 2.5 4.5 5.5v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V5.5L12 2.5Z" fill="#FF5A00" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg className="block size-[44%]" viewBox="0 0 24 24" fill="none">
      <path d="M5 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-4.2 3.6A.6.6 0 0 1 5 19.1V16a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" fill="#FF5A00" />
    </svg>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function GuidelinesHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden h-[max(560px,calc(968*var(--u)))]">
      <motion.img
        src={imgHero.src}
        alt=""
        style={{ y: bgY }}
        className="absolute inset-x-0 top-0 w-full h-[128%] object-cover object-center pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />
      <div className="relative h-full flex flex-col items-center justify-start text-center px-[var(--ds-space-gutter)] pt-[max(320px,calc(640*var(--u)))]">
        <h1 className="font-['Poppins:Bold',sans-serif] not-italic text-h1 leading-heading text-[#1a1a1a] tracking-[-0.041em] w-full max-w-[1120px]">
          <BlurIn delay={0.05} className="lg:whitespace-nowrap lg:inline-block">Building a community rooted in respect</BlurIn>
          <br aria-hidden />
          <BlurIn delay={0.28}>and trust.</BlurIn>
        </h1>
        <p className="font-['Poppins:Regular',sans-serif] leading-subhead text-[rgba(26,26,26,0.7)] text-sm mt-[18px] w-full max-w-[680px]">
          <WordReveal
            text="These guidelines help create a safe, welcoming environment where meaningful connections can grow and everyone feels they belong."
            delay={0.55}
          />
        </p>
      </div>
    </div>
  );
}

/* ── Core value cards (2×2) ───────────────────────────────────────────────── */
const VALUES = [
  { icon: <HeartIcon />, title: "Be Respectful", body: "Treat everyone with kindness and respect. Harassment, hate speech, and discrimination of any kind will not be tolerated." },
  { icon: <PeopleIcon />, title: "Be Authentic", body: "Use your real name and photos. Authenticity builds trust and creates genuine connections." },
  { icon: <ShieldIcon />, title: "Prioritize Safety", body: "Always meet in public places. Trust your instincts and report any suspicious behavior immediately." },
  { icon: <ChatIcon />, title: "Communicate Clearly", body: "Be honest about your intentions and boundaries. Clear communication prevents misunderstandings." },
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

/* ── Prohibited behavior ──────────────────────────────────────────────────── */
const PROHIBITED = [
  "Harassment or bullying of any kind",
  "Hate speech or discriminatory language",
  "Explicit or inappropriate content",
  "Spam or commercial solicitation",
  "Impersonation or fake profiles",
  "Sharing personal information without consent",
];

function ProhibitedCard() {
  return (
    <ScrollFadeUp className="w-full max-w-[872px] mx-auto">
      <div className="rounded-[20px] border border-[rgba(212,24,61,0.18)] bg-[linear-gradient(180deg,rgba(212,24,61,0.05),rgba(212,24,61,0.02))] p-[max(24px,calc(44*var(--u)))]">
        <div className="flex items-center gap-[12px] mb-[24px]">
          <span className="flex items-center justify-center size-[clamp(28px,3vw,34px)] rounded-full bg-[rgba(212,24,61,0.12)] shrink-0">
            <svg className="size-[55%]" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#D4183D" strokeWidth="2" />
              <path d="M12 7.5v5.5" stroke="#D4183D" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="16.3" r="1.1" fill="#D4183D" />
            </svg>
          </span>
          <p className="font-['Poppins:SemiBold',sans-serif] text-[#1a1a1a] text-h4 tracking-[-0.017em]">Prohibited Behavior</p>
        </div>
        <ul className="flex flex-col gap-[14px]">
          {PROHIBITED.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
              className="flex items-center gap-[12px] font-['Poppins:Regular',sans-serif] text-body text-[rgba(26,26,26,0.7)]"
            >
              <span className="flex items-center justify-center size-[20px] rounded-full bg-[rgba(212,24,61,0.1)] shrink-0">
                <svg className="size-[10px]" viewBox="0 0 24 24" fill="none" stroke="#D4183D" strokeWidth="3" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </span>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </ScrollFadeUp>
  );
}

/* ── Report violations ────────────────────────────────────────────────────── */
function ReportCard() {
  return (
    <ScrollFadeUp className="w-full max-w-[872px] mx-auto">
      <div className="rounded-[20px] bg-[#f9f6f2] text-center p-[max(28px,calc(56*var(--u)))] flex flex-col items-center gap-[16px]">
        <motion.span
          whileHover={{ scale: 1.08, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 16 }}
          className="flex items-center justify-center size-[clamp(48px,5vw,64px)] rounded-full border-2 border-[#ff5a00]"
        >
          <svg className="size-[48%]" viewBox="0 0 24 24" fill="none">
            <path d="M5 12.5 10 17l9-10" stroke="#FF5A00" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
        <p className="font-['Poppins:SemiBold',sans-serif] text-[#1a1a1a] text-h4 tracking-[-0.017em]">
          <ScrollBlurIn>Report Violations</ScrollBlurIn>
        </p>
        <p className="font-['Poppins:Regular',sans-serif] leading-[1.625] text-body text-[rgba(26,26,26,0.7)] max-w-[560px]">
          If you encounter behavior that violates these guidelines, please report it immediately. Our team reviews all reports and takes appropriate action within 24 hours.
        </p>
        <MotionLink
          href="/contact"
          whileHover={{ y: -3, filter: "brightness(1.08)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="bg-gradient-brand drop-shadow-[0px_17px_15px_rgba(255,90,0,0.32)] flex h-[clamp(46px,5.5vw,55px)] items-center justify-center px-[clamp(28px,3.5vw,36px)] rounded-full min-w-[170px] mt-[8px]"
        >
          <span className="font-['Poppins:Medium',sans-serif] text-[16px] text-white whitespace-nowrap">Report an Abuse</span>
        </MotionLink>
      </div>
    </ScrollFadeUp>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export function CommunityGuidelinesPage() {
  return (
    <div className="bg-white flex flex-col w-full">
      <Navbar />
      <GuidelinesHero />

      <div className="relative bg-white px-[var(--ds-space-gutter)] pb-[var(--ds-space-section-y)] overflow-hidden">
        <AmbientGlow />
        <div className="relative z-10 flex flex-col gap-[var(--ds-space-section-y)] w-full max-w-[872px] mx-auto">
          {/* 2×2 value cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[max(16px,calc(24*var(--u)))] items-stretch">
            {VALUES.map((v, i) => (
              <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} delay={i * 0.08} />
            ))}
          </div>

          <ProhibitedCard />
          <ReportCard />
        </div>
      </div>

      <FinalCta />
    </div>
  );
}
