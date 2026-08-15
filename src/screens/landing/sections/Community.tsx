"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ScrollBlurIn, ScrollWordReveal, ScrollFadeUp, ParallaxImage } from "@/components/animations";
import svgPaths from "@/assets/landing/svgPaths";
import imgSunnyDayGathering1 from "@/assets/landing/16c4ae71a6d80ccb09c57a6df9982a891b0f3ba3.webp";
import { CommunityCarousel } from "@/components/CommunityCarousel";
import { COMMUNITY_IMAGES } from "../data";

function Banner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <ParallaxImage
        src={imgSunnyDayGathering1.src}
        alt=""
        strength={90}
        className="w-full aspect-[16/9] sm:aspect-[21/9] max-h-[320px] md:max-h-[450px] lg:max-h-[650px]"
        imgClassName="object-center pointer-events-none"
      />
    </motion.div>
  );
}

function PeopleHuggingIcon({ className }: { className?: string }) {
  return (
    <div className={className || "relative shrink-0 size-5 sm:size-6 md:size-7 lg:size-8"} data-name="twemoji:people-hugging">
      <div className="absolute flex inset-[-3.41%_13.15%_52.14%_40.93%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-78 flex-none h-[hypot(79.8774cqw,15.2071cqh)] w-[hypot(20.1226cqw,-84.7929cqh)]">
          <div className="relative size-full">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.2222 12">
              <path d={svgPaths.p256f00} fill="var(--fill-0, white)" fillOpacity="0.8" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-[40.8%_40.01%_0_7.84%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6881 18.9449">
          <path d={svgPaths.p2a4b0000} fill="var(--fill-0, white)" />
        </svg>
      </div>
      <div className="absolute inset-[36.95%_7.84%_0_40.01%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6879 20.1751">
          <path d={svgPaths.p34ea06c0} fill="var(--fill-0, white)" fillOpacity="0.8" />
        </svg>
      </div>
      <div className="absolute flex inset-[-3.41%_40.95%_52.14%_13.13%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-12 flex-none h-[hypot(20.1226cqw,84.7929cqh)] w-[hypot(79.8774cqw,-15.2071cqh)]">
          <div className="relative size-full">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14.2222">
              <path d={svgPaths.p959fc00} fill="var(--fill-0, white)" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-[37.01%_45.32%_17.84%_9.42%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.4844 14.4497">
          <path d={svgPaths.p28168080} fill="var(--fill-0, white)" fillOpacity="0.8" />
        </svg>
      </div>
      <div className="absolute inset-[36.97%_9.37%_13%_25.84%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.7313 16.0094">
          <path d={svgPaths.p1be1ea00} fill="var(--fill-0, white)" />
        </svg>
      </div>
    </div>
  );
}

function CommunityHeader() {
  return (
    <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 items-center relative shrink-0 w-full max-w-[750px] px-4">
      <h2 className="font-['Poppins:SemiBold',sans-serif] leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black text-center tracking-[-0.03em] flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <ScrollBlurIn delay={0}>Where meaningful</ScrollBlurIn>
        <span className="inline-flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
          <ScrollFadeUp delay={0.18} className="inline-flex items-center">
            <span className="bg-gradient-brand drop-shadow-[0px_4px_8px_rgba(255,90,0,0.28)] inline-flex items-center justify-center rounded-lg sm:rounded-xl p-1.5 sm:p-2 md:p-2.5">
              <PeopleHuggingIcon />
            </span>
          </ScrollFadeUp>
          <ScrollBlurIn delay={0.12}>connections</ScrollBlurIn>
        </span>
        <ScrollBlurIn delay={0.22}>begin</ScrollBlurIn>
      </h2>
      <p className="font-['Poppins:Regular',sans-serif] leading-relaxed text-[#1a1a1a] text-xs sm:text-sm md:text-base text-center max-w-[540px]">
        <ScrollWordReveal text="Join a community of people discovering friendships, opportunities, and experiences." delay={0.15} />
      </p>
    </div>
  );
}

/** Quotes cycle in step with the carousel's front image (by index, wrapping).
    One per COMMUNITY_IMAGES photo — same aphoristic, real-time-serendipity voice
    as the rest of the landing page copy. */
const QUOTES: [string, string][] = [
  [`"We weren't meant to stare at screens.`, `We were meant to look each other in the eye."`],
  [`"Life keeps introducing you to people in real time.`, `The only thing missing is an introduction."`],
  [`"The good ones don't happen online.`, `They happen down the street, the moment you say hi."`],
  [`"The city is full of near-misses.`, `initiiator makes sure you actually meet them."`],
  [`"No algorithm decides who you connect with.`, `You do, the second you show up."`],
];

function Carousel({ onIndexChange }: { onIndexChange: (index: number) => void }) {
  return (
    <ScrollFadeUp
      delay={0.1}
      className="mx-auto w-[90vw] max-w-[380px] sm:max-w-[520px] md:w-[82%] md:max-w-none lg:w-full lg:max-w-[1050px]" style={{ ["--u" as string]: "min(0.8px, calc(100vw / 1512))" }}>
      <CommunityCarousel images={COMMUNITY_IMAGES} onIndexChange={onIndexChange} />
    </ScrollFadeUp>
  );
}

function Quote({ index }: { index: number }) {
  const [line1, line2] = QUOTES[index % QUOTES.length];
  return (
    <div className="flex flex-col gap-3 md:gap-4 items-center justify-between relative z-10 shrink-0 w-full max-w-[650px] px-4 mt-2 sm:mt-4 md:mt-6">
      <div className="font-['Poppins:Italic',sans-serif] italic text-[#1a1a1a] text-sm sm:text-base md:text-lg lg:text-xl text-center tracking-[-0.2px]">
        <p className="leading-snug mb-0.5">
          <ScrollWordReveal key={`${index}-1`} text={line1} delay={0} />
        </p>
        <p className="leading-snug">
          <ScrollWordReveal key={`${index}-2`} text={line2} delay={0.1} />
        </p>
      </div>
      <ScrollFadeUp delay={0.2}>
        <div className="bg-gradient-brand h-[3px] md:h-[4px] relative rounded-full shrink-0 w-12 md:w-16" />
      </ScrollFadeUp>
    </div>
  );
}

export function Community() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  return (
    <div className="bg-[#f9f6f2] relative shrink-0 w-full overflow-hidden flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-14 pb-10 sm:pb-14 md:pb-16" id="community" data-name="community">
      <Banner />
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 items-center justify-center w-full max-w-[1249px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-5 sm:gap-6 md:gap-8 items-center relative shrink-0 w-full">
          <CommunityHeader />
          <Carousel onIndexChange={setCarouselIndex} />
        </div>
        <Quote index={carouselIndex} />
      </div>
    </div>
  );
}