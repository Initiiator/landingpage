"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BlurIn, WordReveal, EASE } from "@/components/animations";
import { Navbar } from "@/screens/landing/sections/Navbar";
import { FinalCta } from "@/screens/landing/sections/FinalCta";
import { useEndpointForm } from "@/lib/useEndpointForm";
import imgWaitlistBg from "@/assets/waitlist/waitlist.webp";

/* ════════════════════════════════════════════════════════════════════════
   WAITLIST PAGE
   Pre-launch signup. The form POSTs to a form-service endpoint (Formspree,
   Tally, etc.) set via NEXT_PUBLIC_WAITLIST_ENDPOINT — no backend code needed.
   Until that env var is set the form shows a friendly "coming soon" notice
   instead of silently failing.
   ════════════════════════════════════════════════════════════════════════ */

const ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT;

const FIELD_LABEL = "font-['Poppins:Medium',sans-serif] text-sm text-[#1a1a1a]";
const FIELD =
  "w-full rounded-[12px] bg-[#f9f6f2] border border-[rgba(0,0,0,0.06)] font-['Poppins:Regular',sans-serif] text-body text-[#1a1a1a] placeholder:text-[rgba(26,26,26,0.4)] px-[18px] h-[clamp(46px,5vw,52px)] outline-none focus:border-[rgba(255,90,0,0.4)] transition-colors";

function WaitlistForm() {
  const { status, error, handleSubmit } = useEndpointForm(ENDPOINT);

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="bg-white rounded-[20px] shadow-[0_24px_60px_rgba(0,0,0,0.10)] p-[max(28px,calc(44*var(--u)))] flex flex-col items-center text-center gap-[14px] w-full"
      >
        <span className="grid size-[52px] place-items-center rounded-full bg-gradient-brand">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path fillRule="evenodd" clipRule="evenodd" d="M20.3 5.7a1 1 0 010 1.4l-9.5 9.5a1 1 0 01-1.4 0l-4.7-4.7a1 1 0 011.4-1.4l4 4 8.8-8.8a1 1 0 011.4 0z" />
          </svg>
        </span>
        <h2 className="font-['Poppins:SemiBold',sans-serif] text-h4 text-[#1a1a1a]">You&apos;re on the list.</h2>
        <p className="font-['Poppins:Regular',sans-serif] text-body text-[rgba(26,26,26,0.65)] max-w-[340px]">
          Thanks for joining. We&apos;ll email you the moment initiiator opens in your area.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-[20px] shadow-[0_24px_60px_rgba(0,0,0,0.10)] p-[max(24px,calc(40*var(--u)))] flex flex-col gap-[18px] w-full"
    >
      <label className="flex flex-col gap-[8px]">
        <span className={FIELD_LABEL}>Email</span>
        <input type="email" name="email" required placeholder="you@example.com" className={FIELD} />
      </label>

      <label className="flex flex-col gap-[8px]">
        <span className={FIELD_LABEL}>
          City <span className="text-[rgba(26,26,26,0.4)]"></span>
        </span>
        <input type="text" name="city" placeholder="Where should we launch first?" className={FIELD} />
      </label>

      {status === "error" && (
        <p role="alert" className="font-['Poppins:Regular',sans-serif] text-sm text-[#d23a00]">{error}</p>
      )}

      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={{ y: -2, filter: "brightness(1.06)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="bg-gradient-brand drop-shadow-[0px_17px_15px_rgba(255,90,0,0.32)] h-[clamp(48px,5.5vw,56px)] rounded-full flex items-center justify-center mt-[2px] disabled:opacity-70"
      >
        <span className="font-['Poppins:SemiBold',sans-serif] text-[16px] text-white">
          {status === "loading" ? "Joining…" : "Join the waitlist"}
        </span>
      </motion.button>

      {/* Consent notice at the point of collection — we're collecting email from
          a UK-registered business, so the purpose and the policy link belong on
          the form itself, not buried in the footer. */}
      <p className="font-['Poppins:Regular',sans-serif] text-[12px] leading-[1.5] text-[rgba(26,26,26,0.45)] text-center">
        No spam, just one email when we launch. Unsubscribe anytime. By joining you
        agree to our{" "}
        <Link
          href="/privacy-policy"
          className="underline underline-offset-2 hover:text-[#ff5a00] transition-colors"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}

/* ── Trust signals: reuse the product's safety promises ───────────────────── */
const PROMISES = [
  { label: "Private by default", desc: "A chat only opens when interest is mutual." },
  { label: "Real people, nearby", desc: "Meaningful connections start with people sharing your everyday spaces." },
  { label: "Yours to control", desc: "Block, report, or leave anytime. You're always in control." },
];

function Promises() {
  return (
    <div className="flex flex-col gap-[16px]">
      {PROMISES.map((p, i) => (
        <motion.div
          key={p.label}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.6 + i * 0.12 }}
          className="flex items-start gap-[12px]"
        >
          <span className="mt-[2px] grid size-[22px] shrink-0 place-items-center rounded-full bg-[rgba(255,90,0,0.10)]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#ff5a00">
              <path fillRule="evenodd" clipRule="evenodd" d="M20.3 5.7a1 1 0 010 1.4l-9.5 9.5a1 1 0 01-1.4 0l-4.7-4.7a1 1 0 011.4-1.4l4 4 8.8-8.8a1 1 0 011.4 0z" />
            </svg>
          </span>
          <span>
            <span className="block font-['Poppins:SemiBold',sans-serif] text-body text-[#1a1a1a]">{p.label}</span>
            <span className="block font-['Poppins:Regular',sans-serif] text-sm text-[rgba(26,26,26,0.6)]">{p.desc}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function WaitlistHero() {
  return (
    <div className="relative w-full overflow-hidden bg-[#f9f6f2]">
      <img
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover"
        src={imgWaitlistBg.src}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/55 to-[#f9f6f2]" />
      <div className="relative mx-auto w-full max-w-[1286px] px-[var(--ds-space-gutter)] pt-[max(40px,calc(80*var(--u)))] pb-[var(--ds-space-section-y)] flex flex-col lg:flex-row items-center gap-[clamp(32px,6vw,90px)]">
        {/* Left: pitch */}
        <div className="w-full lg:flex-1 flex flex-col items-start text-left">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-[8px] rounded-full bg-[rgba(255,90,0,0.10)] px-[14px] py-[7px] mb-[20px]"
          >
            <span className="size-[8px] rounded-full bg-[#ff5a00]" />
            <span className="font-['Poppins:Medium',sans-serif] text-sm text-[#ff5a00]">Launching soon</span>
          </motion.span>

          <h1 className="[word-break:break-word] font-['Poppins:Bold',sans-serif] text-h1 leading-[1.1] tracking-[-0.047em] text-black max-w-[640px]">
            <BlurIn delay={0.05}>You&apos;ve already</BlurIn>
            <br aria-hidden />
            <BlurIn delay={0.2}>taken the first step.</BlurIn>
          </h1>

          <p className="font-['Poppins:Regular',sans-serif] leading-subhead text-[#1a1a1a]/70 text-body mt-[20px] max-w-[480px]">
            <WordReveal
              text="Now you're one step closer to experiencing a new way to connect. Join the waitlist and be among the first to experience initiiator when it launches in your city."
              delay={0.5}
            />
          </p>

          <div className="mt-[16px] w-full">
            <Promises />
          </div>
        </div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          className="w-full lg:w-[380px] shrink-0"
        >
          <WaitlistForm />
        </motion.div>
      </div>
    </div>
  );
}

export function WaitlistPage() {
  return (
    <div className="bg-[#f9f6f2] flex flex-col w-full min-h-screen">
      <Navbar />
      <WaitlistHero />
      <FinalCta />
    </div>
  );
}