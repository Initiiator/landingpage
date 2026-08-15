"use client";

import { motion } from "motion/react";
import { SmartMotionLink } from "@/components/SmartLink";
import { ScrollBlurIn, ScrollWordReveal, ScrollFadeUp, ParallaxImage } from "@/components/animations";
import svgPaths from "@/assets/landing/svgPaths";
import imgJoyfulOutdoorMoment1 from "@/assets/landing/9e925d45cf7c5764ab4418d1dfe873534da20cc7.webp";
import imgJoyfulConnection1 from "@/assets/landing/db3a5260a0e3d3bb1d9041fb9622b55aa5636862.webp";
import imgJoyfulOutdoorMoment11 from "@/assets/landing/3680d9c8c44678d7be4b00e358518fb694575d26.webp";
import imgSereneTrioInRetroSummerFashion1 from "@/assets/landing/19faa2e11f1b16c5444a6d6674652b3519f173b2.webp";
import type { ImageSrc } from "@/components/CommunityCarousel";

function SectionHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-center w-full max-w-[876.807px] mx-auto">
      <div className="content-stretch flex flex-wrap gap-[clamp(10px,1.2vw,16px)] items-center justify-center relative shrink-0 w-full text-center">
        <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[1.04] not-italic relative shrink-0 text-h2 text-black tracking-[-0.047em]">
          <ScrollBlurIn delay={0}>From a Wave</ScrollBlurIn>
        </p>
        <ScrollFadeUp delay={0.15}>
          <div className="bg-gradient-brand content-stretch drop-shadow-[0px_12.664px_11.174px_rgba(255,90,0,0.32)] flex items-center justify-center relative rounded-[clamp(14px,1.6vw,20px)] shrink-0 size-[clamp(48px,5.5vw,74px)]">
            <div className="h-[50%] aspect-[32.0909/37.2479] relative shrink-0">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.0909 37.2479">
                <g id="Group"><g id="Vector" />
                  <path d={svgPaths.p30389400} fill="var(--fill-0, white)" id="Vector_2" />
                </g>
              </svg>
            </div>
          </div>
        </ScrollFadeUp>
        <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[1.04] not-italic relative shrink-0 text-h2 text-black tracking-[-0.047em]">
          <ScrollBlurIn delay={0.12}>{`to a `}</ScrollBlurIn>
          <ScrollBlurIn delay={0.24}>Real Connection</ScrollBlurIn>
        </p>
      </div>
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#1a1a1a] text-lead text-center w-full">
        <ScrollWordReveal text="With initiiator, every meaningful connection starts with a wave." delay={0.1} />
      </p>
    </div>
  );
}

function DiscoverIcon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="block w-[40%] h-[40%]" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g id="Icon">
          <path d={svgPaths.p2a9f500} fill="var(--fill-0, #FF5A00)" stroke="var(--stroke-0, #FF5A00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
          <path d={svgPaths.p1be91680} stroke="var(--stroke-0, #F9F6F2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
        </g>
      </svg>
    </div>
  );
}

function MeetIcon() {
  return (
    <div className="absolute inset-[35.38%_24.62%_36.41%_24.62%]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.0001 18.3336">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.pfc62d00} fill="var(--fill-0, #FF5A00)" fillRule="evenodd" />
          <path d={svgPaths.p174e4600} fill="var(--fill-0, #FF5A00)" />
        </g>
      </svg>
    </div>
  );
}

function SafeIcon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="block w-[44%] h-[44%]" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <path d={svgPaths.p13bade00} fill="#FF5A00" stroke="#FF5A00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      </svg>
    </div>
  );
}

function CardContent({
  image, imageName, icon, title, body, cta, ctaHref, reverse,
}: {
  image: ImageSrc; imageName: string; icon: React.ReactNode;
  title: string; body: string; cta: string; ctaHref?: string; reverse?: boolean;
}) {
  return (
    <div className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} md:items-center gap-[clamp(20px,4vw,64px)]`}>
      <div className="w-full md:w-[45%] flex flex-col items-start text-left gap-[clamp(12px,1.6vw,28px)]">
        <motion.div
          whileHover={{ scale: 1.08, rotate: 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="bg-[rgba(255,90,0,0.08)] border-[1.625px] border-[rgba(255,90,0,0.19)] rounded-[clamp(11px,1vw,13px)] size-[clamp(44px,4.5vw,65px)] relative shrink-0"
        >
          {icon}
        </motion.div>
        <h3 className="font-['Poppins:Bold',sans-serif] leading-[1.15] text-[#1a1a1a] text-h3 tracking-[-0.025em]">
          <ScrollBlurIn>{title}</ScrollBlurIn>
        </h3>
        <p className="font-['Poppins:Regular',sans-serif] leading-[1.6] text-[#1a1a1a] text-body w-full">
          <ScrollWordReveal text={body} delay={0.1} />
        </p>
        <SmartMotionLink
          href={ctaHref ?? "#download"}
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="font-['Poppins:Regular',sans-serif] text-[#ff5a00] text-body-lg tracking-[-0.5px] transition-opacity hover:opacity-70"
        >
          {cta}
        </SmartMotionLink>
      </div>
      <div className="w-full md:w-[55%] shrink-0 max-w-[420px] md:max-w-none mx-auto md:mx-0">
        <ParallaxImage
          src={typeof image === "string" ? image : image.src}
          alt={imageName}
          strength={50}
          hover
          className="w-full aspect-[474/419] rounded-[clamp(14px,2vw,20px)]"
        />
      </div>
    </div>
  );
}

/**
 * Each card sticks at a slightly lower top offset than the one before, so as you
 * scroll, each later card scrolls up naturally and slides over the stuck card
 * beneath it. The small top stagger leaves a sliver of the previous card peeking.
 * These offsets are the same at every breakpoint — tablet and desktop share
 * identical stacking behaviour; only the card's internal layout (CardContent)
 * changes with screen width.
 */
const STICK_CLASSES = [
  "top-[90px] z-10",
  "top-[108px] z-20",
  "top-[126px] z-30",
  "top-[144px] z-40",
];

/**
 * How much scroll each card gets before the next one slides up over it.
 *
 * The gap between two sticky cards *is* the extra scroll distance the lower one
 * dwells for, on top of its own height. At the original 5vh (~40px) a card was
 * covered barely 40px after it finished arriving, so all four flew past in well
 * under two screens. Clamped rather than pure vh so short laptop viewports don't
 * feel rushed and tall monitors don't turn the section into an endless scroll.
 */
const CARD_DWELL = "clamp(120px, 28vh, 280px)";

/**
 * Trailing space below the last card: none, and it must stay that way.
 *
 * It is tempting to add padding-bottom here to give the last card a longer
 * turn, because unlike the others nothing slides over it to end its turn. Don't
 * — the two are the same pixels. Every earlier card's dwell is paid for by the
 * *next card* occupying that space; the last card has nothing behind it, so any
 * padding renders as bare background.
 *
 * Measured at 1920x1080: the card sticks at top:144 and is 675 tall, so its
 * bottom sits at 819 and only 261px of viewport remain beneath it. A 640px tail
 * therefore showed a 261px band of empty cream for ~470px of scrolling before
 * the Community banner climbed into view. The ceiling is
 * `viewport - (stick offset + card height)`, which on a short laptop viewport is
 * only ~50px — i.e. effectively zero. The section's own py-[--ds-space-section-y]
 * already supplies the breathing room between this section and the next.
 */

function StickyCard({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <div className={`sticky w-full ${STICK_CLASSES[index] ?? STICK_CLASSES[STICK_CLASSES.length - 1]}`}>
      <div className="bg-white w-full rounded-[clamp(18px,2.5vw,30px)] p-[clamp(18px,2.6vw,48px)] shadow-[0_8px_48px_rgba(0,0,0,0.08)]">
        {children}
      </div>
    </div>
  );
}

const CARDS = [
  {
    image: imgJoyfulOutdoorMoment1,
    imageName: "Joyful Outdoor Moment",
    icon: <DiscoverIcon />,
    title: "Discover Nearby People",
    body: "Find people nearby who share your interests, attend the same events, or simply want to make meaningful connections. initiiator helps you discover opportunities to connect naturally.",
    cta: "LEARN MORE",
    ctaHref: "/features/live-radar",
    reverse: false,
  },
  {
    image: imgJoyfulConnection1,
    imageName: "Joyful Connection",
    icon: (
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="block w-[46%] h-[46%]" fill="none" preserveAspectRatio="none" viewBox="0 0 25 22.5">
          <path d={svgPaths.p19e8dcc0} fill="#FF5A00" />
        </svg>
      </div>
    ),
    title: "Be the initiiator",
    body: "Send a wave, exchange messages, and get to know people before meeting. The best conversations begin with someone willing to make the first move.",
    cta: "START CONNECTING",
    ctaHref: "/features/wave",
    reverse: true,
  },
  {
    image: imgJoyfulOutdoorMoment11,
    imageName: "Joyful Outdoor Moment",
    icon: <MeetIcon />,
    title: "Meet & Connect",
    body: "The first hello is only the beginning. initiiator helps friendships, collaborations, and communities grow into real connections.",
    cta: "GET STARTED",
    ctaHref: "/features/meet-now",
    reverse: false,
  },
  {
    image: imgSereneTrioInRetroSummerFashion1,
    imageName: "Friends Together Outdoors",
    icon: <SafeIcon />,
    title: "Safe and intentional",
    body: "Meet in public places. Verified profiles. Safety features built for real-world meetups. Connect with confidence.",
    cta: "LEARN MORE",
    ctaHref: "/privacy-security",
    reverse: true,
  },
];

export function RealLifeConnection() {
  return (
    <div
      id="features"
      className="bg-[#f9f6f2] relative shrink-0 w-full py-[var(--ds-space-section-y)] px-[var(--ds-space-gutter)] flex flex-col gap-[max(40px,calc(70*var(--u)))] scroll-mt-[90px]"
      data-name="reallifeconnection"
    >
      <SectionHeader />

      {/* Sticky stack — identical gap/offset values at every breakpoint, so
          tablet's stacking/reveal behaviour matches desktop exactly. */}
      <div
        className="relative w-full max-w-[1286px] mx-auto flex flex-col"
        style={{ gap: CARD_DWELL }}
      >
        {CARDS.map((card, i) => (
          <StickyCard key={card.title} index={i}>
            <CardContent {...card} />
          </StickyCard>
        ))}
      </div>
    </div>
  );
}