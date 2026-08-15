"use client";

import { motion } from "motion/react";
import { BlurIn, EASE, ParallaxImage } from "@/components/animations";
import svgPaths from "@/assets/landing/svgPaths";
import imgJoyfulOutdoorSelfie1 from "@/assets/landing/3ed7ce04b12c1f310990293c036c5cfe6e9dc61f.webp";
import { GetOnIPhoneButton, GetOnAndroidButton, WaitlistButton } from "./_shared/StoreButtons";
import { LAUNCHED } from "@/lib/launch";

/** Headline + supporting copy + download buttons (the top hero row). */
function HeroHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-[clamp(24px,3vw,40px)] w-full max-w-[1398px] mx-auto text-left">
      {/* Headline — left side */}
      <div className="flex flex-col gap-[clamp(12px,1.4vw,20px)] shrink-0 w-full lg:w-[68%] max-w-[960px]">
        {/* This is the site's <h1>. It was a <p> styled to look like a heading,
            which left the homepage — the page that matters most for search —
            with no h1 at all, only an h2 and four h3s. Purely a semantic change:
            the classes and animation are unchanged. */}
        <h1 className="[word-break:break-word] [text-wrap:balance] font-['Poppins:Bold',sans-serif] not-italic relative text-display leading-[1.08] text-black tracking-[-0.047em]">
          <BlurIn delay={0.05}>Make real connections in </BlurIn>
          <BlurIn delay={0.12} className="text-[#ff6000]">real time</BlurIn>
        </h1>
        <p className="[word-break:break-word] [text-wrap:balance] font-['Poppins:Regular',sans-serif] not-italic relative text-body-lg leading-[1.4] text-[rgba(26,26,26,0.7)] tracking-[-0.5px]">
          <BlurIn delay={0.22}>People you fancy. Connections you want, not what the </BlurIn>
          <BlurIn delay={0.3} className="text-[#ff6000]">algorithm</BlurIn>
          <BlurIn delay={0.36}> decides.</BlurIn>
        </p>
      </div>

      {/* Button — right side, pushed toward the far edge */}
      <div className="flex flex-col items-start lg:items-end justify-center shrink-0 w-full lg:w-auto lg:ml-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
          className="flex flex-nowrap gap-[18px] items-start justify-start shrink-0"
        >
          {LAUNCHED ? (
            <>
              <GetOnIPhoneButton />
              <GetOnAndroidButton />
            </>
          ) : (
            <WaitlistButton />
          )}
        </motion.div>
      </div>
    </div>
  );
}

function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className="bg-[#f9f6f2] w-full max-w-[1398px] mx-auto rounded-[clamp(16px,2vw,30px)] overflow-hidden"
    >
      <ParallaxImage
        src={imgJoyfulOutdoorSelfie1.src}
        alt=""
        strength={70}
        priority
        className="w-full aspect-[1258/664]"
        imgClassName="pointer-events-none"
      />
    </motion.div>
  );
}

/** One feature pill in the scrolling ticker: icon + label. */
function TickerItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="content-stretch flex gap-[4px] sm:gap-[8px] items-center relative shrink-0">
      {icon}
      <div className="[word-break:break-word] flex flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-white text-[9px] sm:text-[18px] tracking-[-0.35px] sm:tracking-[-0.7px] whitespace-nowrap">
        <p className="leading-[8.5px] sm:leading-[17px]">{label}</p>
      </div>
    </div>
  );
}

const TICKER_ITEMS: { icon: React.ReactNode; label: string }[] = [
  {
    label: "Meet New People",
    icon: (
      <div className="h-[9px] sm:h-[18px] relative shrink-0 w-[12.25px] sm:w-[24.5px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 25.6666">
          <path d={svgPaths.p275ae340} fill="var(--fill-0, #ffffff)" id="Vector" />
        </svg>
      </div>
    ),
  },
  {
    label: "Nearby Connections",
    icon: (
      <div className="h-[9.625px] sm:h-[19.25px] relative shrink-0 w-[7.7px] sm:w-[15.4px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 27.4994">
          <path clipRule="evenodd" d={svgPaths.pbfe1b80} fill="var(--fill-0, #ffffff)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
    ),
  },
  {
    label: "Real Conversations",
    icon: (
      <div className="relative shrink-0 size-[10.5px] sm:size-[21px]" data-name="mdi:chat">
        <div className="absolute inset-[12.5%_8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 22.5">
            <path d={svgPaths.p19e8dcc0} fill="var(--fill-0, #ffffff)" id="Vector" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: "Shared Interests",
    icon: (
      <div className="h-[6.4px] sm:h-[12.8px] relative shrink-0 w-[11.55px] sm:w-[23.1px]" data-name="Group">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.0001 18.3336">
          <g id="Group">
            <path clipRule="evenodd" d={svgPaths.pfc62d00} fill="var(--fill-0, #ffffff)" fillRule="evenodd" id="Vector" />
            <path d={svgPaths.p174e4600} fill="var(--fill-0, #ffffff)" id="Vector_2" />
          </g>
        </svg>
      </div>
    ),
  },
  {
    label: "Join in Community",
    icon: (
      <div className="relative shrink-0 size-[8.75px] sm:size-[17.5px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
          <path d={svgPaths.p7f30ff0} fill="var(--fill-0, #ffffff)" id="Vector" />
        </svg>
      </div>
    ),
  },
  {
    label: "Build Relationships",
    icon: (
      <div className="relative shrink-0 size-[10.5px] sm:size-[21px]" data-name="mdi:heart">
        <div className="absolute inset-[12.5%_8.33%_11.04%_8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 22.9375">
            <path d={svgPaths.p15307370} fill="var(--fill-0, #ffffff)" id="Vector" />
          </svg>
        </div>
      </div>
    ),
  },
];

function TickerRow() {
  return (
    <div className="content-stretch flex gap-[13.5px] sm:gap-[27px] h-[10.5px] sm:h-[21px] items-center relative shrink-0">
      {TICKER_ITEMS.map((item) => (
        <TickerItem key={item.label} icon={item.icon} label={item.label} />
      ))}
    </div>
  );
}

/** Horizontal feature ticker — scrolls continuously. The row is duplicated
    enough times (not just twice) so that even on very wide screens, there's
    always at least 2x the viewport's worth of content — otherwise a gap of
    empty background flashes before the loop resets.

    Item sizes (icons, text, gaps) are halved below the `sm` breakpoint via
    paired arbitrary-value classes (e.g. `text-[9px] sm:text-[18px]`) rather
    than a CSS transform, so mobile renders crisp text/SVG at the smaller
    size instead of a scaled-down full-size version. */
function Ticker() {
  // 4 copies covers up to ~4x a single row's width scrolling into view,
  // which comfortably exceeds 2x viewport width on any realistic screen size.
  const COPIES = 4;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="bg-[#ff6000] w-full overflow-hidden px-[16px] py-[clamp(10px,1.225vw,31px)] sm:py-[clamp(20px,2.45vw,31px)]"
    >
      <div
        className="flex w-max gap-[13.5px] sm:gap-[27px] animate-[ticker_30s_linear_infinite]"
        style={{ "--ticker-copies": COPIES } as React.CSSProperties}
      >
        {Array.from({ length: COPIES }).map((_, i) => (
          <TickerRow key={i} />
        ))}
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="MacBook Pro 14' - 1">
      <div className="w-full flex flex-col gap-[max(36px,calc(65*var(--u)))] pt-[max(24px,calc(90*var(--u)))]">
        <div className="px-[var(--ds-space-gutter)]">
          <HeroHeader />
        </div>
        <div className="px-[var(--ds-space-gutter)]">
          <HeroImage />
        </div>
        <Ticker />
      </div>
    </div>
  );
}
