"use client";

import { motion } from "motion/react";
import { SmartMotionLink } from "@/components/SmartLink";
import {
  BlurIn,
  WordReveal,
  ScrollBlurIn,
  ScrollWordReveal,
  ScrollFadeUp,
  AmbientGlow,
  EASE,
} from "@/components/animations";
import { Navbar } from "@/screens/landing/sections/Navbar";
import { Faq } from "@/screens/landing/sections/Faq";
import { FinalCta } from "@/screens/landing/sections/FinalCta";
import { PRIMARY_CTA_HREF } from "@/lib/launch";
import imgHero from "@/assets/privacy/hero.webp";
import imgDiscover from "@/assets/privacy/discover.webp";
import imgConnect from "@/assets/privacy/connect.webp";
import imgChat from "@/assets/privacy/chat.webp";
import imgMeet from "@/assets/privacy/meet.webp";

/* ── Pin icon used in the privacy cards (matches the design) ──────────────── */
/* Location pin → "Location Stays Private" */
function LocationIcon() {
  return (
    <svg className="block size-[44%]" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11Z"
        fill="#FF5A00"
        stroke="#FF5A00"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" fill="white" />
    </svg>
  );
}

/* Shield with tick → "You Stay In Control" */
function ControlIcon() {
  return (
    <svg className="block size-[44%]" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2.5 4.5 5.5v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V5.5L12 2.5Z"
        fill="#FF5A00"
        stroke="#FF5A00"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 11.8 11.2 14 15 9.8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Heart / handshake of trust → "Trust Comes First" */
function TrustIcon() {
  return (
    <svg className="block size-[44%]" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 20.5C7 17 3.5 13.8 3.5 9.6 3.5 7 5.5 5 8 5c1.6 0 3.1.9 4 2.3C12.9 5.9 14.4 5 16 5c2.5 0 4.5 2 4.5 4.6 0 4.2-3.5 7.4-8.5 10.9Z"
        fill="#FF5A00"
        stroke="#FF5A00"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
function PrivacyHero() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-white to-[#f9f6f2]">
      <div className="relative flex flex-col lg:flex-row items-center gap-[clamp(24px,5vw,64px)] px-[var(--ds-space-gutter)] pt-[max(96px,calc(180*var(--u)))] pb-[max(40px,calc(64*var(--u)))] max-w-[1680px] mx-auto">
        {/* Copy */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <h1 className="[word-break:break-word] font-['Poppins:Bold',sans-serif] not-italic text-display leading-heading text-black tracking-[-0.047em] w-full max-w-[560px]">
            <BlurIn delay={0.05}>{`Meet people nearby, `}</BlurIn>
            <BlurIn delay={0.22} className="text-[#ff6000]">not your data.</BlurIn>
          </h1>

          <p className="font-['Poppins:Regular',sans-serif] leading-subhead text-[#1a1a1a]/70 text-sm mt-[20px] w-full max-w-[440px]">
            <WordReveal
              text="initiiator uses proximity-based discovery to help you find meaningful connections while keeping you in control of your privacy and safety."
              delay={0.5}
            />
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1 }}
            className="mt-[32px]"
          >
            <motion.a
              href="#how-we-protect"
              whileHover={{ y: -3, filter: "brightness(1.08)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-brand drop-shadow-[0px_17px_15px_rgba(255,90,0,0.32)] inline-flex h-[clamp(46px,5.5vw,55px)] items-center justify-center px-[clamp(28px,3.5vw,36px)] rounded-full min-w-[170px]"
            >
              <span className="font-['Poppins:Medium',sans-serif] text-[16px] text-white whitespace-nowrap">How We Protect You</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Hero phone (floating callout tags are baked into the image) */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <motion.img
            src={imgHero.src}
            alt="initiiator radar with privacy callouts: exact location hidden, block and report anytime, trust-based interaction"
            className="w-[clamp(280px,80vw,560px)] h-auto object-contain pointer-events-none select-none"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ── "Built Around Privacy" 3-card grid (mirrors landing Safety cards) ─────── */
const PRIVACY_CARDS = [
  {
    icon: <LocationIcon />,
    title: "Location Stays Private",
    body: "We use proximity to help people discover each other, not to expose exact locations. Your precise coordinates, address, and movement history are never shared with other users.",
  },
  {
    icon: <ControlIcon />,
    title: "You Stay In Control",
    body: "Manage who can interact with you, block unwanted contacts, and leave conversations whenever you choose. Your experience remains yours to control.",
  },
  {
    icon: <TrustIcon />,
    title: "Trust Comes First",
    body: "Trust indicators, moderation systems, and safety tools help create meaningful interactions and safer meetups.",
  },
];

function PrivacyCard({ icon, title, body, delay = 0 }: { icon: React.ReactNode; title: string; body: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
      className="bg-white rounded-[20px] w-full flex flex-col items-center justify-start text-center gap-[16px] p-[max(20px,calc(36*var(--u)))]"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 16 }}
        className="relative flex items-center justify-center bg-[rgba(255,90,0,0.08)] border-2 border-[rgba(255,90,0,0.19)] rounded-[clamp(12px,1.2vw,16px)] size-[clamp(52px,5.5vw,72px)] shrink-0"
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

function BuiltAroundPrivacy() {
  return (
    <div id="how-we-protect" className="bg-[#f9f6f2] scroll-mt-[90px]">
      <div className="flex flex-col items-center px-[max(20px,calc(104*var(--u)))] py-[var(--ds-space-section-y)]">
        <div className="flex flex-col gap-[max(40px,calc(80*var(--u)))] items-center w-full max-w-[1234px] mx-auto">
          <div className="flex flex-col gap-[14px] items-center text-center">
            <p className="font-['Poppins:SemiBold',sans-serif] text-[#1a1a1a] text-h2 leading-[1.04] tracking-[-0.041em]">
              <ScrollBlurIn>Built Around Privacy</ScrollBlurIn>
            </p>
            <p className="font-['Poppins:Regular',sans-serif] leading-[1.5] text-body text-[rgba(26,26,26,0.6)] max-w-[560px]">
              <ScrollWordReveal text="Every feature is designed to help people connect without compromising their safety." delay={0.15} />
            </p>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-[max(16px,calc(24*var(--u)))] items-stretch">
            {PRIVACY_CARDS.map((c, i) => (
              <PrivacyCard key={c.title} icon={c.icon} title={c.title} body={c.body} delay={i * 0.08} />
            ))}
          </div>

          <ScrollFadeUp delay={0.1}>
            <SmartMotionLink
              href={PRIMARY_CTA_HREF}
              whileHover={{ y: -3, filter: "brightness(1.08)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-brand drop-shadow-[0px_17px_15px_rgba(255,90,0,0.32)] flex h-[clamp(46px,5.5vw,55px)] items-center justify-center px-[clamp(28px,3.5vw,36px)] rounded-full min-w-[170px]"
            >
              <span className="font-['Poppins:Medium',sans-serif] text-[16px] text-white whitespace-nowrap">Get Started</span>
            </SmartMotionLink>
          </ScrollFadeUp>
        </div>
      </div>
    </div>
  );
}

/* ── "Before You…" alternating rows (converge-in, same as feature rows) ────── */
const PROTECT_ROWS = [
  {
    image: imgDiscover,
    alt: "Discover screen finding compatible people nearby",
    title: "Before You Discover",
    body: "initiiator uses proximity-based discovery to find compatible people nearby while keeping personal information protected.",
    reverse: true,
  },
  {
    image: imgConnect,
    alt: "Profile showing interests and context before connecting",
    title: "Before You Connect",
    body: "Profiles provide interests, context, and proximity information so users can make informed decisions before interacting.",
    reverse: false,
  },
  {
    image: imgChat,
    alt: "Wave system controlling who can start a conversation",
    title: "Before You Chat",
    body: "Users choose who they want to interact with through the Wave system, helping reduce unwanted messages and creating more meaningful introductions.",
    reverse: true,
  },
  {
    image: imgMeet,
    alt: "Meetup coordination with safety tools and trust signals",
    title: "Before You Meet",
    body: "Meetups happen only when both parties choose to continue the interaction, supported by safety tools and trust signals throughout the experience.",
    reverse: false,
  },
];

function ProtectRow({ image, alt, title, body, reverse }: typeof PROTECT_ROWS[number]) {
  const tilt = reverse ? -6 : 6;
  const reveal = { once: true, amount: 0.3 } as const;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-[clamp(20px,5vw,80px)] w-full max-w-[1286px] mx-auto [perspective:1200px]">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={reveal}
        transition={{ duration: 0.8, ease: EASE }}
        className={`w-full lg:w-1/2 flex flex-col items-start text-left gap-[clamp(14px,2vw,24px)] order-1 ${reverse ? "lg:order-1" : "lg:order-2"}`}
      >
        <h3 className="font-['Poppins:Bold',sans-serif] leading-[1.15] text-[#1a1a1a] text-h3 tracking-[-0.025em]">
          <ScrollBlurIn>{title}</ScrollBlurIn>
        </h3>
        <p className="font-['Poppins:Regular',sans-serif] leading-[1.6] text-[#1a1a1a] text-body w-full max-w-[460px]">
          <ScrollWordReveal text={body} delay={0.1} />
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94, rotateY: tilt }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
        viewport={reveal}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className={`w-full lg:w-1/2 shrink-0 flex justify-center order-2 [transform-style:preserve-3d] ${reverse ? "lg:order-2" : "lg:order-1"}`}
      >
        <motion.img
          src={image.src}
          alt={alt}
          className="w-[clamp(240px,64vw,440px)] h-auto object-contain pointer-events-none select-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

function HowWeProtect() {
  return (
    <div className="relative bg-white px-[var(--ds-space-gutter)] py-[var(--ds-space-section-y)] overflow-hidden">
      <AmbientGlow />
      <div className="relative z-10 flex flex-col gap-[14px] items-center text-center mb-[var(--ds-space-stack)]">
        <p className="font-['Poppins:SemiBold',sans-serif] text-[#1a1a1a] text-h2 leading-[1.04] tracking-[-0.041em] max-w-[640px]">
          <ScrollBlurIn>How initiiator Protects Every Interaction</ScrollBlurIn>
        </p>
        <p className="font-['Poppins:Regular',sans-serif] leading-[1.5] text-body text-[rgba(26,26,26,0.6)] max-w-[560px]">
          <ScrollWordReveal text="Meaningful connections start with trust, transparency, and control." delay={0.15} />
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-[var(--ds-space-stack)]">
        {PROTECT_ROWS.map((row) => (
          <ProtectRow key={row.title} {...row} />
        ))}
      </div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────────── */
export function PrivacySecurityPage() {
  return (
    <div className="bg-[#f9f6f2] flex flex-col w-full">
      <Navbar />
      <PrivacyHero />
      <BuiltAroundPrivacy />
      <HowWeProtect />
      <Faq />
      <FinalCta />
    </div>
  );
}
