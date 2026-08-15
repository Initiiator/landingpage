"use client";

import { motion } from "motion/react";
import type { StaticImageData } from "next/image";
import { SmartMotionLink } from "@/components/SmartLink";
import { BlurIn, WordReveal, ScrollBlurIn, ScrollWordReveal, ScrollFadeUp, AmbientGlow, EASE } from "@/components/animations";
import { Navbar } from "@/screens/landing/sections/Navbar";
import { Faq } from "@/screens/landing/sections/Faq";
import { FinalCta } from "@/screens/landing/sections/FinalCta";
import { GetOnIPhoneButton, GetOnAndroidButton, WaitlistButton } from "@/screens/landing/sections/_shared/StoreButtons";
import { LAUNCHED, PRIMARY_CTA_HREF } from "@/lib/launch";
import { StickyScrollStory, type StickyStoryData } from "./_story/StickyScrollStory";
import { SafetyBand, type SafetyPillar } from "./_extras/SafetyBand";
import { DeviceFrame } from "./_extras/DeviceFrame";

type Img = StaticImageData | string;
const src = (i: Img) => (typeof i === "string" ? i : i.src);

export type FeatureRowData = {
  image: Img;
  imageAlt: string;
  title: React.ReactNode;
  body: string;
  cta?: string;
  /** where the cta link points (e.g. the related feature page). Defaults to "#". */
  ctaHref?: string;
  /** image on the right instead of the left */
  reverse?: boolean;
  /** wrap a bare app screen in a phone bezel (for real screenshots that have no
      device frame of their own) */
  framed?: boolean;
};

export type FeaturePageData = {
  /** hero heading — pass an array of phrases; last phrase can be highlighted */
  heading: { text: string; highlight?: boolean }[];
  subtitle: string;
  heroImage: Img;
  heroImageAlt: string;
  rows: FeatureRowData[];
  /** Optional extra sections rendered between the rows and the FAQ. */
  extraSections?: React.ReactNode;
  /** Optional custom hero overlay (e.g. animated radar) rendered over the phone. */
  heroOverlay?: React.ReactNode;
  /** When the hero image is a bare app screen (no bezel), wrap it in a phone
      frame that bleeds into the page — matching the baked-in-bezel hero PNGs. */
  heroFramed?: boolean;
  /** Optional Apple-style sticky scroll story. Rendered before the rows by default. */
  story?: StickyStoryData;
  /** Optional WhatsApp-style trust band. Rendered after extras, before the CTA. */
  safety?: { items: SafetyPillar[]; title?: string; subtitle?: string };
  /** Optional page-specific FAQ. Falls back to the shared site FAQ when unset. */
  faq?: { q: string; a: string }[];
  /** Optional FAQ subtitle override. */
  faqSubtitle?: string;
};

/** Centered hero: heading + subtitle + download buttons + phone visual. */
function FeatureHero({ heading, subtitle, heroImage, heroImageAlt, heroOverlay, heroFramed }: Pick<FeaturePageData, "heading" | "subtitle" | "heroImage" | "heroImageAlt" | "heroOverlay" | "heroFramed">) {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-white to-[#f9f6f2]">
      <div className="relative flex flex-col items-center text-center px-[var(--ds-space-gutter)] pt-[max(120px,calc(200*var(--u)))]">
        <h1 className="[word-break:break-word] font-['Poppins:Bold',sans-serif] not-italic text-h1 leading-heading text-black tracking-[-0.047em] w-full max-w-[860px]">
          {heading.map((part, i) => (
            <BlurIn key={i} delay={0.05 + i * 0.16} className={part.highlight ? "text-[#ff6000]" : undefined}>
              {part.text + (i < heading.length - 1 ? " " : "")}
            </BlurIn>
          ))}
        </h1>

        <p className="font-['Poppins:Regular',sans-serif] leading-subhead text-[#1a1a1a]/70 text-sm mt-[20px] w-full max-w-[660px]">
          <WordReveal text={subtitle} delay={0.5} />
        </p>

        {/* Hero phone — top-of-device mockup that fades out at its own bottom edge,
            so it bleeds straight into the section with no gap or shadow. */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          className="relative mt-[var(--ds-space-stack)] w-[clamp(200px,55vw,360px)]"
        >
          {heroFramed ? (
            /* Bare app screen wrapped in a thin phone bezel. We show only the
               TOP HALF of the device and blend the rest into the page — like the
               baked-in-bezel hero PNGs. The frame is a fixed phone aspect; the
               wrapper crops it to the top portion and masks the bottom away. */
            <motion.div
              className="relative w-full [aspect-ratio:9/10] overflow-hidden [mask-image:linear-gradient(to_bottom,black_62%,transparent_100%)]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            >
              {/* Full-height phone, top-anchored — only its top half is visible.
                  Proportions follow the real iPhone 15 Pro (393×852pt screen):
                  • screen aspect 9/19.5  • screen corner radius 55pt ≈ 14% width
                  • uniform hardware bezel ≈ 3% width
                  • outer (bezel) radius = screen radius + bezel, so corners stay
                    concentric.
                  Sizes use `cqw` (container-query width units) so every length
                  tracks the device width and the corners stay true circular arcs
                  — a single `%` radius would go egg-shaped on a tall element. */}
              <div className="[container-type:inline-size] absolute inset-x-0 top-0 [aspect-ratio:9/19.5]">
                {/* bezel — thin, uniform; radius = screen radius + bezel width */}
                <div className="absolute inset-0 rounded-[17cqw] bg-[#1a1a1a] p-[3cqw] shadow-[0_30px_60px_-24px_rgba(26,26,26,0.45)]">
                  {/* screen — corner radius 14% of width */}
                  <div className="relative h-full w-full overflow-hidden rounded-[14cqw] bg-[#171719]">
                    <img
                      src={src(heroImage)}
                      alt={heroImageAlt}
                      className="absolute inset-x-0 top-0 w-full h-auto select-none pointer-events-none"
                    />
                    {/* Dynamic Island — the SVG screens omit it. Real iPhone 15
                        Pro: 125×37pt, 11pt from top → 31.8% of width, 4.3% of
                        height, 1.3% top, fully rounded. (% resolve against the
                        screen box, so this scales with the device.) */}
                    <span className="absolute left-1/2 top-[1.3%] z-10 h-[4.3%] w-[31.8%] -translate-x-1/2 rounded-full bg-black" />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.img
              src={src(heroImage)}
              alt={heroImageAlt}
              className="w-full h-auto object-contain select-none pointer-events-none"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            />
          )}

          {heroOverlay}

          {/* Download buttons float over the phone — wrapped so they read as
              clickable: hover lift + tap press + pointer cursor. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
            className="absolute top-[50%] sm:top-[68%] left-1/2 -translate-x-1/2 flex flex-col sm:flex-row sm:flex-nowrap gap-[12px] sm:gap-[18px] items-center justify-center w-[min(calc(100vw-2*var(--ds-space-gutter)),398px)]"
          >
            {LAUNCHED ? (
              <>
                <motion.div
                  className="w-full flex justify-center sm:block sm:flex-1 sm:min-w-0 cursor-pointer"
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 350, damping: 18 }}
                >
                  <GetOnIPhoneButton />
                </motion.div>
                <motion.div
                  className="w-full flex justify-center sm:block sm:flex-1 sm:min-w-0 cursor-pointer"
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 350, damping: 18 }}
                >
                  <GetOnAndroidButton />
                </motion.div>
              </>
            ) : (
              <motion.div
                className="flex justify-center cursor-pointer"
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
              >
                <WaitlistButton />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/** Alternating image + copy row. Reveals once and STAYS (no retreat), so the
 *  page never looks empty. Entrance = gentle rise + scale; image keeps a
 *  permanent idle float so each row stays alive after it lands. */
function FeatureRow({ image, imageAlt, title, body, cta, ctaHref, reverse, framed }: FeatureRowData) {
  const tilt = reverse ? -6 : 6; // subtle 3D settle, fires once
  const reveal = { once: true, amount: 0.3 } as const;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-[clamp(20px,5vw,80px)] w-full max-w-[1286px] mx-auto [perspective:1200px]">
      {/* Text — rises + fades in once, then stays. DOM-first for mobile stack. */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={reveal}
        transition={{ duration: 0.8, ease: EASE }}
        className={`w-full lg:w-1/2 flex flex-col items-start text-left gap-[clamp(14px,2vw,24px)] order-1 ${reverse ? "lg:order-1" : "lg:order-2"}`}
      >
        <h3 className="font-['Poppins:Bold',sans-serif] leading-[1.15] text-[#1a1a1a] text-h3 tracking-[-0.025em]">
          {typeof title === "string" ? <ScrollBlurIn>{title}</ScrollBlurIn> : title}
        </h3>
        <p className="font-['Poppins:Regular',sans-serif] leading-[1.6] text-[#1a1a1a] text-body w-full max-w-[460px]">
          <ScrollWordReveal text={body} delay={0.1} />
        </p>
        {cta && (
          <SmartMotionLink
            href={ctaHref ?? "#"}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="font-['Poppins:Regular',sans-serif] text-[#ff5a00] text-body-lg tracking-[-0.5px] transition-opacity hover:opacity-70"
          >
            {cta}
          </SmartMotionLink>
        )}
      </motion.div>

      {/* Image — scales/rises in once with a tiny 3D settle, then stays. The
          inner img keeps a permanent idle float so it never sits dead. */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94, rotateY: tilt }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
        viewport={reveal}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className={`w-full lg:w-1/2 shrink-0 flex justify-center order-2 [transform-style:preserve-3d] ${reverse ? "lg:order-2" : "lg:order-1"}`}
      >
        {framed ? (
          /* Bare app screen → phone bezel (full device, no bottom blend). */
          <motion.div
            className="w-[clamp(200px,55vw,300px)]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
          >
            <DeviceFrame bare>
              <img
                src={src(image)}
                alt={imageAlt}
                className="absolute inset-0 h-full w-full object-cover object-top pointer-events-none select-none"
              />
            </DeviceFrame>
          </motion.div>
        ) : (
          <motion.img
            src={src(image)}
            alt={imageAlt}
            className="w-[clamp(220px,72vw,517px)] h-auto object-contain pointer-events-none select-none"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
          />
        )}
      </motion.div>
    </div>
  );
}

/** Generic feature page: hero → alternating rows → FAQ → final CTA. */
export function FeaturePage({ data }: { data: FeaturePageData }) {
  return (
    <div className="bg-[#f9f6f2] flex flex-col w-full">
      <Navbar />
      <FeatureHero
        heading={data.heading}
        subtitle={data.subtitle}
        heroImage={data.heroImage}
        heroImageAlt={data.heroImageAlt}
        heroOverlay={data.heroOverlay}
        heroFramed={data.heroFramed}
      />

      {/* Story lives OUTSIDE any overflow-hidden ancestor so its sticky pin works. */}
      {data.story && (
        <div className="relative z-10 bg-[#f9f6f2] px-[var(--ds-space-gutter)] pt-[var(--ds-space-section-y)]">
          <StickyScrollStory data={data.story} />
        </div>
      )}

      <div className="relative bg-[#f9f6f2] px-[var(--ds-space-gutter)] pt-[var(--ds-space-section-y)] pb-[var(--ds-space-section-y)] overflow-hidden">
        <AmbientGlow />
        {data.rows.length > 0 && (
          <div className="relative z-10 flex flex-col gap-[var(--ds-space-section-y)]">
            {data.rows.map((row, i) => (
              <FeatureRow key={i} {...row} />
            ))}
          </div>
        )}

        <div className="relative z-10">{data.extraSections}</div>

        {data.safety && (
          <div className="relative z-10 pt-[var(--ds-space-section-y)]">
            <SafetyBand items={data.safety.items} title={data.safety.title} subtitle={data.safety.subtitle} />
          </div>
        )}

        {/* Get Started CTA below the feature rows */}
        <ScrollFadeUp className="relative z-10 flex justify-center pt-[var(--ds-space-stack)]">
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

      <Faq items={data.faq} subtitle={data.faqSubtitle} />
      <FinalCta />
    </div>
  );
}
