"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollBlurIn, ScrollWordReveal, EASE } from "@/components/animations";
import { FAQ_DATA } from "../data";

const EXPAND_SPRING = { type: "spring" as const, stiffness: 260, damping: 30, mass: 0.9 };

function ToggleCircle({ open }: { open: boolean }) {
  return (
    <motion.span
      className="relative shrink-0 grid place-items-center size-[34px] rounded-full"
      animate={{
        backgroundColor: open ? "#ff5a00" : "rgba(255,90,0,0.08)",
        borderColor: open ? "rgba(255,90,0,0)" : "rgba(255,90,0,0.22)",
        scale: open ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      style={{ borderWidth: 1.5, borderStyle: "solid" }}
    >
      <motion.span
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="block size-[18px]"
      >
        <svg className="block size-full" fill="none" viewBox="0 0 24 24">
          <path d="M6 9L12 15L18 9" stroke={open ? "#ffffff" : "#FF5A00"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
        </svg>
      </motion.span>
    </motion.span>
  );
}

function FaqRow({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <motion.div
      className="bg-white relative rounded-[16px] shrink-0 w-full overflow-hidden border"
      animate={{
        borderColor: open ? "rgba(255,90,0,0.25)" : "rgba(0,0,0,0)",
        boxShadow: open
          ? "0 14px 40px rgba(255,90,0,0.12)"
          : "0 1px 2px rgba(0,0,0,0)",
        y: open ? -2 : 0,
      }}
      whileHover={!open ? { y: -2 } : undefined}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open ? "true" : "false"}
        className="content-stretch flex items-center justify-between gap-[16px] px-[clamp(18px,2.5vw,24px)] py-[20px] relative w-full text-left"
      >
        <motion.span
          animate={{ color: open ? "#ff5a00" : "#1a1a1a" }}
          transition={{ duration: 0.3 }}
          className="[word-break:break-word] font-['Poppins:Medium',sans-serif] leading-[1.4] not-italic text-body-lg flex-1 min-w-0"
        >
          {q}
        </motion.span>
        <ToggleCircle open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={EXPAND_SPRING}
            className="overflow-hidden"
          >
            {/* Text lifts into place after the panel opens */}
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 6, opacity: 0 }}
              transition={{ duration: 0.32, ease: EASE, delay: 0.08 }}
              className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[1.625] not-italic text-[max(14px,calc(16*var(--u)))] text-[rgba(26,26,26,0.7)] px-[clamp(18px,2.5vw,24px)] pb-[22px]"
            >
              {a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type FaqItem = { q: string; a: string };

function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      {items.map((item, i) => (
        <motion.div
          key={item.q}
          // Each row reveals as it scrolls into view: rises + unblurs + settles.
          // The comment said "as it scrolls into view" but the animation was on
          // `animate`, so all six rows fired together on page load and the whole
          // section was inert by the time you reached it. The small per-row delay
          // walks the eye down the list instead of flashing it in at once.
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
          className="w-full"
        >
          <FaqRow q={item.q} a={item.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
        </motion.div>
      ))}
    </div>
  );
}

export function Faq({ items, subtitle }: { items?: FaqItem[]; subtitle?: string } = {}) {
  return (
    <div className="bg-[#f9f6f2] content-stretch flex flex-col items-center py-[clamp(56px,7vw,80px)] px-[var(--ds-space-gutter)] relative shrink-0 w-full" id="faq" data-name="CompactFAQ">
      <div className="w-full max-w-[872px]">
        <div className="content-stretch flex flex-col gap-[clamp(32px,4vw,64px)] items-stretch px-[clamp(0px,2vw,24px)] relative size-full">
          <div className="content-stretch flex flex-col gap-[14px] items-center relative shrink-0 w-full">
            <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[1.04] not-italic text-[#1a1a1a] text-h2 text-center tracking-[-2px]">
              <ScrollBlurIn>Questions?</ScrollBlurIn>
            </p>
            <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-subhead not-italic text-subhead text-[rgba(26,26,26,0.6)] text-center">
              <ScrollWordReveal text={subtitle ?? "Everything you need to know"} delay={0.15} />
            </p>
          </div>
          <FaqList items={items ?? FAQ_DATA} />
        </div>
      </div>
    </div>
  );
}
