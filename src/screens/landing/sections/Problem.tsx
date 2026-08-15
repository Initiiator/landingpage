"use client";

import { motion } from "motion/react";
import { ScrollWordReveal, EASE } from "@/components/animations";
import imgPhoneMockup from "@/assets/landing/mocks.webp";

const SPRING = { type: "spring" as const, stiffness: 220, damping: 26, mass: 0.9 };

function PhoneMockup() {
  return (
    <motion.div
      className="relative order-1 lg:order-none w-full lg:w-[calc(820*var(--u))] shrink-0"
      initial={{ opacity: 0, x: -48, rotateY: 10 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ ...SPRING, delay: 0.05 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      {/* idle float loop */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
      >
        <img
          alt="initiiator app shown on a phone with wave notifications"
          className="w-full h-auto object-contain pointer-events-none select-none"
          src={imgPhoneMockup.src}
        />
      </motion.div>
    </motion.div>
  );
}

function ProblemHeading() {
  return (
    <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] not-italic relative shrink-0 text-h1 leading-heading text-black tracking-[-0.047em] w-full">
      {/* Each phrase blurs in and drifts up */}
      <motion.span
        className="inline"
        initial={{ opacity: 0, filter: "blur(12px)", y: 12 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
        style={{ display: "inline-block" }}
      >
        {`You're not bad at making friends. `}
      </motion.span>
      <motion.span
        className="text-[#ff6000] inline"
        initial={{ opacity: 0, filter: "blur(12px)", y: 12 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.32 }}
        style={{ display: "inline-block" }}
      >
        The city just never introduces you.
      </motion.span>
    </p>
  );
}

function ProblemCopy() {
  return (
    <div className="content-stretch flex flex-col gap-[max(28px,calc(47*var(--u)))] items-start text-left relative shrink-0 w-full lg:w-[calc(434*var(--u))] max-w-[440px] lg:max-w-none mx-auto order-2 lg:order-none">
      <ProblemHeading />

      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-subhead not-italic relative shrink-0 text-[#1a1a1a] text-sm w-full">
        <ScrollWordReveal
          text="The person who'd actually get your humour could be right in your neighbourhood, ordering the same coffee, taking the same route home, living a life that keeps almost crossing yours. initiiator exists to make sure you finally meet them."
          delay={0.38}
        />
      </p>

      {/* CTA springs up with a bounce */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.5 }}
      >
        <motion.div
          whileHover={{ y: -3, filter: "brightness(1.08)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="bg-gradient-brand content-stretch drop-shadow-[0px_17px_15px_rgba(255,90,0,0.32)] flex h-[clamp(46px,5.5vw,55px)] items-center justify-center px-[clamp(22px,3vw,27px)] relative rounded-full shrink-0 w-auto min-w-[170px] cursor-pointer"
        >
          <p className="[word-break:break-word] font-['Poppins:Medium',sans-serif] leading-[27.6px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">See how it works</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Problem() {
  return (
    <div id="why" className="bg-white relative shrink-0 w-full overflow-hidden py-[var(--ds-space-section-y)] scroll-mt-[90px]" data-name="problem">
      <div className="mx-auto w-full max-w-[1680px] pr-[var(--ds-space-gutter)] pl-[var(--ds-space-gutter)] lg:pl-0 flex flex-col lg:flex-row gap-[max(40px,calc(53*var(--u)))] items-center">
        <PhoneMockup />
        <ProblemCopy />
      </div>
    </div>
  );
}
