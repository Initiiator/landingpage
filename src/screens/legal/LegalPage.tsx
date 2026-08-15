"use client";

import { motion } from "motion/react";
import { BlurIn, ScrollFadeUp, EASE } from "@/components/animations";
import { Navbar } from "@/screens/landing/sections/Navbar";
import { FinalCta } from "@/screens/landing/sections/FinalCta";

/* A run of inline text where parts can be bold (e.g. "Safety is your responsibility:"). */
export type RichText = (string | { bold: string })[];

export type LegalBlock =
  | { type: "paragraph"; text: RichText }
  /* labelled sub-items: bold lead-in + description, like "No background checks: We do not …" */
  | { type: "definitions"; items: { term: string; desc: RichText }[] }
  /* plain bulleted list */
  | { type: "list"; items: string[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalPageData = {
  title: string;
  dateLabel: string; // e.g. "Effective Date: May 20, 2026"
  sections: LegalSection[];
};

function Rich({ parts }: { parts: RichText }) {
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <span key={i}>{p}</span>
        ) : (
          <span key={i} className="font-['Poppins:SemiBold',sans-serif] text-[#1a1a1a]">{p.bold}</span>
        )
      )}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="font-['Poppins:Regular',sans-serif] leading-body text-body text-[rgba(26,26,26,0.7)]">
        <Rich parts={block.text} />
      </p>
    );
  }
  if (block.type === "definitions") {
    return (
      <div className="flex flex-col gap-[14px]">
        {block.items.map((it, i) => (
          <p key={i} className="font-['Poppins:Regular',sans-serif] leading-body text-body text-[rgba(26,26,26,0.7)] pl-[clamp(0px,2vw,16px)]">
            <span className="font-['Poppins:SemiBold',sans-serif] text-[#1a1a1a]">{it.term} </span>
            <Rich parts={it.desc} />
          </p>
        ))}
      </div>
    );
  }
  // list
  return (
    <ul className="flex flex-col gap-[10px] pl-[clamp(8px,2vw,20px)]">
      {block.items.map((it, i) => (
        <li key={i} className="flex gap-[12px] font-['Poppins:Regular',sans-serif] leading-body text-body text-[rgba(26,26,26,0.7)]">
          <span className="mt-[10px] size-[5px] rounded-full bg-[rgba(255,90,0,0.55)] shrink-0" />
          {it}
        </li>
      ))}
    </ul>
  );
}

function Section({ section, index }: { section: LegalSection; index: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col gap-[16px]"
    >
      <h2 className="font-['Poppins:SemiBold',sans-serif] text-[#1a1a1a] text-h4 leading-[1.2] tracking-[-0.017em]">
        {index}. {section.heading}
      </h2>
      {section.blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </motion.section>
  );
}

export function LegalPage({ data }: { data: LegalPageData }) {
  return (
    <div className="bg-[#f9f6f2] flex flex-col w-full">
      <Navbar />

      <div className="px-[var(--ds-space-gutter)] pt-[max(72px,calc(120*var(--u)))] pb-[var(--ds-space-section-y)]">
        <div className="w-full max-w-[820px] mx-auto">
          {/* Title */}
          <div className="mb-[max(40px,calc(72*var(--u)))]">
            <h1 className="font-['Poppins:Bold',sans-serif] text-[#1a1a1a] text-h2 leading-heading tracking-heading">
              <BlurIn>{data.title}</BlurIn>
            </h1>
            <p className="font-['Poppins:Regular',sans-serif] text-sm text-[rgba(26,26,26,0.55)] mt-[8px]">
              {data.dateLabel}
            </p>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-[max(36px,calc(56*var(--u)))]">
            {data.sections.map((s, i) => (
              <Section key={s.heading} section={s} index={i + 1} />
            ))}
          </div>
        </div>
      </div>

      <FinalCta />
    </div>
  );
}
