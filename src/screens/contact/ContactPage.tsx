"use client";

import { motion } from "motion/react";
import { BlurIn, WordReveal, ScrollFadeUp, EASE } from "@/components/animations";
import { Navbar } from "@/screens/landing/sections/Navbar";
import { FinalCta } from "@/screens/landing/sections/FinalCta";
import imgBg from "@/assets/contact/contact-bg.webp";

/* ── Small contact-detail row (icon + label) ──────────────────────────────── */
function MailIcon() {
  return (
    <svg className="size-[18px]" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2.5" fill="#FF5A00" />
      <path d="M4 7l8 5 8-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function SupportIcon() {
  return (
    <svg className="size-[18px]" viewBox="0 0 24 24" fill="none">
      {/* headset / customer support */}
      <path d="M5 13v-1a7 7 0 0 1 14 0v1" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round" />
      <rect x="3" y="12.5" width="3.5" height="6" rx="1.5" fill="#FF5A00" />
      <rect x="17.5" y="12.5" width="3.5" height="6" rx="1.5" fill="#FF5A00" />
      <path d="M19 18.5v.5a3 3 0 0 1-3 3h-2.5" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg className="size-[18px]" viewBox="0 0 24 24" fill="none">
      <path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11Z" fill="#FF5A00" />
      <circle cx="12" cy="10" r="2.3" fill="white" />
    </svg>
  );
}

function ContactDetail({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-[10px] font-['Poppins:Regular',sans-serif] text-body text-[#1a1a1a]">
      <span className="shrink-0">{icon}</span>
      {label}
    </span>
  );
}

/* ── Contact form card ────────────────────────────────────────────────────── */
const FIELD_LABEL = "font-['Poppins:Medium',sans-serif] text-sm text-[#1a1a1a]";
const FIELD =
  "w-full rounded-[12px] bg-[#f9f6f2] border border-[rgba(0,0,0,0.06)] font-['Poppins:Regular',sans-serif] text-body text-[#1a1a1a] placeholder:text-[rgba(26,26,26,0.4)] px-[18px] outline-none focus:border-[rgba(255,90,0,0.4)] transition-colors";

function ContactForm() {
  return (
    <ScrollFadeUp className="w-full lg:w-[clamp(360px,42vw,470px)] shrink-0">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white rounded-[20px] shadow-[0_24px_60px_rgba(0,0,0,0.10)] p-[max(24px,calc(40*var(--u)))] flex flex-col gap-[20px]"
      >
        <label className="flex flex-col gap-[8px]">
          <span className={FIELD_LABEL}>Name</span>
          <input type="text" placeholder="John Doe" className={`${FIELD} h-[clamp(46px,5vw,52px)]`} />
        </label>

        <label className="flex flex-col gap-[8px]">
          <span className={FIELD_LABEL}>Email</span>
          <input type="email" placeholder="john@example.com" className={`${FIELD} h-[clamp(46px,5vw,52px)]`} />
        </label>

        <label className="flex flex-col gap-[8px]">
          <span className={FIELD_LABEL}>Message</span>
          <textarea placeholder="How can we help?" rows={4} className={`${FIELD} py-[14px] resize-none`} />
        </label>

        <motion.button
          type="submit"
          whileHover={{ y: -2, filter: "brightness(1.06)" }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="bg-gradient-brand drop-shadow-[0px_17px_15px_rgba(255,90,0,0.32)] h-[clamp(48px,5.5vw,56px)] rounded-full flex items-center justify-center mt-[4px]"
        >
          <span className="font-['Poppins:SemiBold',sans-serif] text-[16px] text-white">Send Message</span>
        </motion.button>
      </form>
    </ScrollFadeUp>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function ContactHero() {
  return (
    <div className="relative w-full overflow-hidden bg-[#fdf3ec]">
      <img
        src={imgBg.src}
        alt=""
        className="absolute inset-y-0 right-0 h-full w-full lg:w-[70%] object-cover object-right pointer-events-none select-none"
      />
      {/* fade the left edge so the copy stays readable over the image */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#fdf3ec] via-[#fdf3ec]/60 to-transparent pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-[clamp(32px,5vw,80px)] w-full max-w-[1320px] mx-auto px-[var(--ds-space-gutter)] py-[max(72px,calc(140*var(--u)))]">
        {/* Left: copy + details */}
        <div className="w-full lg:flex-1 flex flex-col items-start text-left">
          <h1 className="font-['Poppins:Bold',sans-serif] not-italic text-h1 leading-heading text-[#1a1a1a] tracking-[-0.041em] max-w-[460px]">
            <BlurIn delay={0.05}>{`Get in Touch with us `}</BlurIn>
            <BlurIn delay={0.24} className="text-[#ff6000]">Today</BlurIn>
          </h1>

          <p className="font-['Poppins:Regular',sans-serif] leading-subhead text-[rgba(26,26,26,0.7)] text-sm mt-[20px] max-w-[460px]">
            <WordReveal
              text="Have questions, feedback, or need support? We'd love to hear from you. Drop us a message and our team will respond as soon as possible."
              delay={0.45}
            />
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-[clamp(24px,3vw,48px)] gap-y-[18px] mt-[32px] w-fit"
          >
            <ContactDetail icon={<MailIcon />} label="hello@initiiator.com" />
            <ContactDetail icon={<SupportIcon />} label="support@initiiator.com" />
            <ContactDetail icon={<PinIcon />} label="London, UK" />
          </motion.div>
        </div>

        {/* Right: form */}
        <ContactForm />
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export function ContactPage() {
  return (
    <div className="bg-white flex flex-col w-full">
      <Navbar />
      <ContactHero />
      <FinalCta />
    </div>
  );
}
