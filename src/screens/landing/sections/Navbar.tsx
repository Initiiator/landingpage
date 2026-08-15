"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import svgPaths from "@/assets/landing/svgPaths";
import { LAUNCHED, PRIMARY_CTA_HREF } from "@/lib/launch";

/** Wordmark "initiiator" assembled from the Figma logo paths. */
function Logo() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 h-[25.777px] ml-0 mt-[1.14px] relative row-1 w-[134px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134 25.777">
          <g id="Group 1484578589">
            <path d={svgPaths.p3836f000} fill="var(--fill-0, #FF5A00)" id="Vector" />
            <path d={svgPaths.p3e2dbe0c} fill="var(--fill-0, #FF5A00)" id="Vector_2" />
            <path d={svgPaths.pe1a07c0} fill="var(--fill-0, #FF5A00)" id="Vector_3" />
            <path d={svgPaths.p33b3dc80} fill="var(--fill-0, #FF5A00)" id="Vector_4" />
            <path d={svgPaths.p5e70880} fill="var(--fill-0, #FF5A00)" id="Vector_5" />
            <path d={svgPaths.p26a32800} fill="var(--fill-0, #FF5A00)" id="Vector_6" />
            <path d={svgPaths.p354b2600} fill="var(--fill-0, #FF5A00)" id="Vector_7" />
            <path d={svgPaths.p2b139a00} fill="var(--fill-0, #FF5A00)" id="Vector_8" />
            <path d={svgPaths.p28537d80} fill="var(--fill-0, #FF5A00)" id="Vector_9" />
            <path d={svgPaths.p2fd7d400} fill="var(--fill-0, #FF5A00)" id="Vector_10" />
          </g>
        </svg>
      </div>
      <div className="col-1 h-[26.257px] ml-[49.08px] mt-[0.01px] relative row-1 w-[9.842px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.84216 26.2573">
          <g id="Group 1484578590">
            <path d={svgPaths.p2e84fd80} fill="var(--fill-0, black)" id="Vector" />
            <path d={svgPaths.p1c05f780} fill="var(--fill-0, black)" id="Vector_2" />
          </g>
        </svg>
      </div>
      <div className="col-1 h-[26.264px] ml-[60.5px] mt-0 relative row-1 w-[9.662px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6621 26.2643">
          <g id="Group 1484578591">
            <path d={svgPaths.p409c380} fill="var(--fill-0, black)" id="Vector" />
            <path d={svgPaths.p13dbec00} fill="var(--fill-0, black)" id="Vector_2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative size-[24px]" data-name="iconamoon:arrow-up-2-duotone">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="iconamoon:arrow-up-2-duotone">
          <path d="M17 14L12 9L7 14" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

type FeatureItem = { label: string; href: string };
const FEATURES_COLUMNS: { heading: string; items: FeatureItem[] }[] = [
  {
    heading: "Discover",
    items: [
      { label: "Live radar", href: "/features/live-radar" },
      { label: "Recent encounters", href: "/features/recent-encounters" },
      { label: "Explore", href: "/features/explore" },
    ],
  },
  {
    heading: "Connect",
    items: [
      { label: "Wave", href: "/features/wave" },
      { label: "Chat", href: "/features/chat" },
      { label: "Meet Now", href: "/features/meet-now" },
    ],
  },
  {
    heading: "Experiences",
    items: [
      { label: "Spaces", href: "/features/spaces" },
      { label: "Events", href: "/features/events" },
    ],
  },
];

/** Three-column features mega-dropdown panel. */
function FeaturesDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="absolute top-[calc(100%+8px)] left-0 z-50 bg-white rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-[clamp(24px,3vw,40px)] min-w-[clamp(320px,30vw,449px)]"
      onMouseLeave={onClose}
    >
      <div className="flex gap-[clamp(28px,4vw,56px)] items-start">
        {FEATURES_COLUMNS.map((col) => (
          <div key={col.heading} className="flex flex-col gap-[20px]">
            <p className="font-['Poppins:SemiBold',sans-serif] text-[#413f3f] text-[clamp(15px,1.2vw,18px)] leading-none">
              {col.heading}
            </p>
            <div className="flex flex-col gap-[16px]">
              {col.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="font-['Poppins:Regular',sans-serif] text-[#413f3f] text-[clamp(14px,1.1vw,16px)] leading-none whitespace-nowrap transition-colors hover:text-[#ff5a00]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Desktop-only: Features trigger + floating dropdown. */
function FeaturesLink() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, close]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 transition-opacity hover:opacity-60"
      >
        <p className="font-['Poppins:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1a1a1a] text-[16px] whitespace-nowrap">Features</p>
        <div className={`flex items-center justify-center relative shrink-0 transition-transform duration-200 ${open ? "" : "-scale-y-100"}`}>
          <ChevronDown />
        </div>
      </button>
      {open && <FeaturesDropdown onClose={close} />}
    </div>
  );
}

/** Top-level nav links beside Features, by launch mode.
    Pre-launch: none — the bar is just logo + waitlist CTA so there's nowhere
    to go but the signup. Post-launch: the full support/content set. */
const NAV_LINKS: { label: string; href: string }[] = LAUNCHED
  ? [
      { label: "Blogs", href: "/blog" },
      { label: "Privacy & Security", href: "/privacy-security" },
      { label: "Help Center", href: "/contact" },
    ]
  : [];


const LINK_CLASS = "flex items-center justify-between py-4 border-b border-[rgba(0,0,0,0.07)] font-['Poppins:Regular',sans-serif] text-[#1a1a1a] text-[17px] transition-colors hover:text-[#ff5a00]";

/** Mobile drawer: main menu screen. */
function MobileMainMenu({ onFeaturesClick }: { onFeaturesClick: () => void }) {
  return (
    <div className="flex flex-col">
      {LAUNCHED && (
        <button type="button" onClick={onFeaturesClick} className={`${LINK_CLASS} w-full text-left`}>
          <span>Features</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
      {NAV_LINKS.map((link) => (
        <Link key={link.label} href={link.href} className={LINK_CLASS}>{link.label}</Link>
      ))}
    </div>
  );
}

/** Mobile drawer: features sub-screen. */
function MobileFeaturesMenu({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col">
      {/* Back header */}
      <button type="button" onClick={onBack} className="flex items-center gap-2 py-4 mb-2 font-['Poppins:Medium',sans-serif] text-[#ff5a00] text-[15px]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back
      </button>
      <p className="font-['Poppins:SemiBold',sans-serif] text-[#1a1a1a] text-[20px] mb-6">Features</p>
      {FEATURES_COLUMNS.map((col) => (
        <div key={col.heading} className="mb-6">
          <p className="font-['Poppins:SemiBold',sans-serif] text-[#413f3f] text-[12px] uppercase tracking-widest mb-3">{col.heading}</p>
          <div className="flex flex-col">
            {col.items.map((item) => (
              <Link key={item.label} href={item.href} className={LINK_CLASS}>{item.label}</Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GetStartedButton() {
  const label = LAUNCHED ? "Get Started" : "Join the waitlist";
  return (
    <Link href={PRIMARY_CTA_HREF} className="h-[48px] relative shrink-0" data-name="Container" aria-label={label}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <div className="bg-gradient-brand drop-shadow-[0px_14.487px_12.783px_rgba(255,90,0,0.32)] h-[clamp(42px,5vw,47px)] relative rounded-full shrink-0 w-fit transition-[filter] hover:brightness-[1.06]" data-name="Button">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[clamp(16px,2vw,23px)] relative size-full">
            <p className="[word-break:break-word] font-['Poppins:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[clamp(13px,1vw,14px)] text-center text-white whitespace-nowrap">{label}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round">
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M3 6h18" />
          <path d="M3 12h18" />
          <path d="M3 18h18" />
        </>
      )}
    </svg>
  );
}

const NAV_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Navbar({ hideCtaAtTop = false }: { hideCtaAtTop?: boolean } = {}) {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<"main" | "features">("main");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  const openDrawer = useCallback(() => { setScreen("main"); setOpen(true); }, []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  useEffect(() => { if (!open) setScreen("main"); }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Hide when scrolling down past 80px, show when scrolling up
      if (y > 80) {
        setHidden(y > lastY.current);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Outer: spring-driven hide/show on scroll direction */}
      <motion.div
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.8 }}
        /* No backdrop-filter here on purpose. A full-width blur on a sticky bar
           forces the browser to re-sample and re-blur everything behind it on
           every scroll frame, which was a main source of scroll jank. At 0.92
           alpha over the cream background the frosted effect was barely visible
           anyway, so the cost bought almost nothing. To restore it, add
           `[backdrop-filter:blur(12px)]` and drop the alpha back to ~0.85. */
        className={`pointer-events-auto sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-[rgba(249,246,242,0.92)] shadow-[0_1px_24px_rgba(0,0,0,0.07)]"
            : "bg-[#f9f6f2]"
        }`}
        data-name="Navbar"
      >
        {/* Inner: one-time load-in on mount — opacity + slight drop only, no y conflict */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: NAV_EASE }}
        >
        <div className="content-stretch flex h-[80px] sm:h-[112px] items-center justify-between px-[clamp(20px,6vw,124px)] py-[16px]">
          {/* Logo slides in from left */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: NAV_EASE, delay: 0.15 }}
          >
            <Link href="/" aria-label="initiiator home" className="inline-block">
              <Logo />
            </Link>
          </motion.div>

          {/* Desktop nav — each link staggers down */}
          <motion.div
            className="relative shrink-0 hidden lg:flex gap-[clamp(20px,2.6vw,48px)] items-center"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.28 } } }}
          >
            {LAUNCHED && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: NAV_EASE } },
                }}
              >
                <FeaturesLink />
              </motion.div>
            )}
            {NAV_LINKS.map((link) => (
              <motion.div
                key={link.label}
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: NAV_EASE } },
                }}
              >
                <Link href={link.href} className="flex items-center transition-opacity hover:opacity-60">
                  <p className="font-['Poppins:Regular',sans-serif] leading-[24px] text-[#1a1a1a] text-[16px] whitespace-nowrap">{link.label}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Get Started button — on the homepage, hidden at the very top since
              the hero already has its own waitlist CTA there; appears once
              scrolled so there's never two waitlist buttons on screen at once. */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: -10 }}
            animate={
              hideCtaAtTop
                ? { opacity: scrolled ? 1 : 0, y: scrolled ? 0 : -10 }
                : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.3, ease: NAV_EASE, delay: hideCtaAtTop ? 0 : 0.58 }}
            style={{ pointerEvents: hideCtaAtTop && !scrolled ? "none" : "auto" }}
          >
            <GetStartedButton />
          </motion.div>

          {/* Hamburger — mobile only */}
          <motion.button
            type="button"
            aria-label="Toggle menu"
            onClick={() => (open ? closeDrawer() : openDrawer())}
            className="lg:hidden inline-flex items-center justify-center p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <MenuIcon open={open} />
          </motion.button>
        </div>
        </motion.div>
      </motion.div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex flex-col">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeDrawer} />
          <div className="relative mt-[80px] sm:mt-[112px] bg-[#f9f6f2] flex flex-col px-[clamp(24px,6vw,48px)] pt-4 pb-10 overflow-y-auto max-h-[calc(100vh-80px)] sm:max-h-[calc(100vh-112px)]">
            {screen === "main" ? (
              <>
                <MobileMainMenu onFeaturesClick={() => setScreen("features")} />
                <div className="mt-8">
                  <GetStartedButton />
                </div>
              </>
            ) : (
              <MobileFeaturesMenu onBack={() => setScreen("main")} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
