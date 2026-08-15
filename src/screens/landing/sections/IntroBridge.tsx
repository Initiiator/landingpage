"use client";

import { ScrollWordReveal } from "@/components/animations";

export function IntroBridge() {
  return (
    <div
      className="bg-white content-stretch flex flex-col items-center py-[clamp(48px,6vw,72px)] px-[var(--ds-space-gutter)] relative shrink-0 w-full"
      id="intro-bridge"
      data-name="IntroBridge"
    >
      <div className="w-full max-w-[680px]">
        <p className="[word-break:break-word] font-['Poppins:Medium',sans-serif] leading-[1.5] not-italic text-[rgba(26,26,26,0.65)] text-body-lg text-center tracking-[-0.3px]">
          <ScrollWordReveal
            text="Life keeps introducing you to people in real time. The only thing missing is an introduction."
            delay={0}
          />
        </p>
      </div>
    </div>
  );
}