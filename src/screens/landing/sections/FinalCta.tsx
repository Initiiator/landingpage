"use client";

import { useRef, useState, useId } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ScrollBlurIn, ScrollWordReveal, ScrollFadeUp, EASE } from "@/components/animations";
import svgPaths from "@/assets/landing/svgPaths";
import imgLogo1Sonia2 from "@/assets/landing/b539584d8bfeeae6193af60e245edabe4b5307fd.webp";
import imgImage381 from "@/assets/landing/191bb9fbf711238afded7edb06701871607d4932.webp";
import { GetOnIPhoneButtonCta, GetOnAndroidButton, WaitlistButton } from "./_shared/StoreButtons";
import { LAUNCHED } from "@/lib/launch";

/** Pulls its child toward the cursor on hover, springs back on leave. */
function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    setPos({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

function CtaContent() {
  return (
    <div className="content-stretch flex flex-col gap-[31px] items-center w-full max-w-[calc(1100*var(--u))] mx-auto">
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[calc(28*var(--u))] items-center not-italic relative shrink-0 text-center text-white w-full">
        {/* drifting aurora glow behind the heading */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 w-[min(560px,90%)] h-[280px] rounded-full bg-[radial-gradient(closest-side,rgba(255,90,0,0.45),rgba(255,90,0,0)_70%)] blur-[40px]"
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7], x: [0, 24, 0] }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
        />
        <div className="font-['Poppins:Bold',sans-serif] leading-heading relative shrink-0 text-display tracking-[-0.047em] w-full">
          <p className="mb-0">
            <ScrollBlurIn delay={0}>{`Meet people `}</ScrollBlurIn>
            <ScrollBlurIn delay={0.16}>you fancy.</ScrollBlurIn>
          </p>
          <p><ScrollBlurIn delay={0.3}>Wave to the connections you want.</ScrollBlurIn></p>
        </div>
        <p className="font-['Poppins:Regular',sans-serif] leading-[1.5] relative shrink-0 text-body-lg tracking-[-0.5px] w-full max-w-[calc(729*var(--u))]">
          <ScrollWordReveal
            text={
              LAUNCHED
                ? "Download initiiator and meet the people your city never introduced you to."
                : "Join the waitlist and meet the people your city never introduced you to."
            }
            delay={0.2}
          />
        </p>
      </div>
      <ScrollFadeUp delay={0.35}>
        <div className="content-stretch flex flex-nowrap gap-[18px] items-center justify-center relative shrink-0 w-full max-w-[398px]">
          {LAUNCHED ? (
            <>
              <Magnetic><GetOnIPhoneButtonCta /></Magnetic>
              <Magnetic><GetOnAndroidButton /></Magnetic>
            </>
          ) : (
            <Magnetic><WaitlistButton cta /></Magnetic>
          )}
        </div>
      </ScrollFadeUp>
    </div>
  );
}

function FooterLogo() {
  return (
    <div className="bg-white relative rounded-[98.997px] shrink-0 w-[54.448px]">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-[3.63px] py-[6.05px] relative rounded-[inherit] size-full">
        <div className="h-[41.249px] relative shrink-0 w-full">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogo1Sonia2.src} />
        </div>
      </div>
      <div aria-hidden className="absolute border-[#ea3308] border-[1.878px] border-solid inset-[-1.878px] pointer-events-none rounded-[100.875px]" />
    </div>
  );
}

/** Each glyph renders in a given colour so we can stack a dark + a white copy.
    Paths below are self-contained (not from svgPaths) so they always render. */
function FacebookIcon({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 size-full p-[10px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z"
        fill={color}
      />
    </svg>
  );
}

function InstagramIcon({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 size-full p-[10px]" fill="none" viewBox="0 0 20 20">
      <path d={svgPaths.p4b98700} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p19f4a800} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M14.5833 5.41667H14.5917" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </svg>
  );
}

function XIcon({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 size-full p-[11px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M18.9 2H22l-7.1 8.13L23.3 22h-6.6l-5.16-6.75L5.6 22H2.5l7.6-8.7L1.5 2h6.75l4.66 6.16L18.9 2Zm-2.32 18.15h1.83L7.5 3.75H5.55l11.03 16.4Z"
        fill={color}
      />
    </svg>
  );
}

function TikTokIcon({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 size-full p-[10px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M16.6 2h-3.2v13.6a3.1 3.1 0 1 1-2.2-2.97V9.3a6.3 6.3 0 1 0 5.4 6.24V8.6a7.1 7.1 0 0 0 4.4 1.5V6.9a4 4 0 0 1-4.4-4.9Z"
        fill={color}
      />
    </svg>
  );
}

type FooterNavLink = { label: string; href: string };

/**
 * Social icon that fills with a wavy orange "liquid" rising from the bottom on
 * hover. Built from three stacked layers inside a clipped circle:
 *   1. dark glyph (visible when empty)
 *   2. the liquid (orange body + a wobbling wave crest) that rises on hover
 *   3. white glyph, clipped to the liquid's shape, so the glyph "submerges"
 */
function SocialLink({
  Icon,
  href,
  label,
}: {
  Icon: (p: { color: string }) => React.ReactElement;
  href: string;
  /* The link's only content is a decorative glyph, so without this a screen
     reader announces it as an unlabelled link. */
  label: string;
}) {
  const [hover, setHover] = useState(false);
  const waveId = useId();

  return (
    <motion.a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{ scale: 1.12, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      className="bg-[rgba(0,0,0,0.08)] relative rounded-full shrink-0 size-[40px] overflow-hidden block"
    >
      {/* 1. dark glyph (base) */}
      <Icon color="#1A1A1A" />

      {/* 2. rising liquid — rises slowly with a fine, shallow ripple crest */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        initial={false}
        animate={{ height: hover ? "130%" : "0%", opacity: hover ? 1 : 0 }}
        transition={{ height: { duration: 1.5, ease: EASE }, opacity: { duration: 0.25 } }}
      >
        {/* fine, shallow wave crest sitting on top of the liquid body */}
        <motion.svg
          className="absolute -top-[4px] left-0 w-[200%] h-[6px]"
          viewBox="0 0 80 6"
          preserveAspectRatio="none"
          animate={{ x: hover ? ["0%", "-50%"] : "0%" }}
          transition={{ duration: 2.6, ease: "linear", repeat: hover ? Infinity : 0 }}
        >
          <path d="M0 6 Q 10 2 20 4 T 40 4 T 60 4 T 80 4 L 80 6 Z" fill="#ff5a00" />
        </motion.svg>
        <div className="size-full bg-[#ff5a00]" />
      </motion.div>

      {/* 3. white glyph, revealed only where the liquid covers it */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ clipPath: hover ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
        transition={{ duration: 1.5, ease: EASE }}
        aria-hidden
        // unique key keeps each icon's wave independent
        data-wave={waveId}
      >
        <Icon color="#ffffff" />
      </motion.div>
    </motion.a>
  );
}

/* Canonical profile URLs. These were originally pasted from the mobile apps'
   share sheets, which append tracking cruft (`mibextid`, `igsh`, `utm_source=qr`)
   that is tied to the sharing session and can expire — the bare URLs are stable. */
const SOCIAL_LINKS = [
  { Icon: FacebookIcon, label: "initiiator on Facebook", href: "https://www.facebook.com/profile.php?id=61593041009220" },
  { Icon: InstagramIcon, label: "initiiator on Instagram", href: "https://www.instagram.com/initiiator" },
  { Icon: XIcon, label: "initiiator on X", href: "https://x.com/Initiiator" },
  { Icon: TikTokIcon, label: "initiiator on TikTok", href: "https://www.tiktok.com/@initiiator" },
];

/** Footer link with an orange underline that wipes in from the left on hover. */
function FooterLink({ label, href }: FooterNavLink) {
  return (
    <Link
      href={href}
      className="group relative inline-block font-['Poppins:Regular',sans-serif] leading-[24px] text-[16px] text-[rgba(0,0,0,0.7)] whitespace-nowrap w-fit transition-colors hover:text-[#ff5a00]"
    >
      {label}
      <span className="absolute left-0 -bottom-[1px] h-[1.5px] w-full origin-left scale-x-0 bg-[#ff5a00] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
    </Link>
  );
}

function FooterColumn({ heading, links }: { heading: string; links: FooterNavLink[] }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[123px]">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[28px] text-[18px] text-black whitespace-nowrap">{heading}</p>
      <div className="content-stretch flex flex-col gap-[8px] h-[88px] items-start relative shrink-0 w-full">
        {links.map((link) => (
          <FooterLink key={link.label} label={link.label} href={link.href} />
        ))}
      </div>
    </div>
  );
}

function FooterLeft() {
  return (
    <div className="flex flex-col items-start gap-[42px]">
      <div className="flex flex-col items-start gap-[10px] max-w-[626px]">
        <FooterLogo />
        <p className="font-['Poppins:Regular',sans-serif] leading-[1.4] text-[clamp(16px,2vw,24px)] text-[rgba(0,0,0,0.7)]">
          Real conversations. Real People. Real connections
        </p>
      </div>
      <div className="flex flex-col items-start gap-[16px]">
        <p className="font-['Poppins:SemiBold',sans-serif] leading-[24px] text-[18px] text-[#1a1a1a]">Follow us:</p>
        <div className="flex gap-[16px]">
          {SOCIAL_LINKS.map(({ Icon, href, label }) => (
            <SocialLink key={href} Icon={Icon} href={href} label={label} />
          ))}
        </div>
      </div>
    </div>
  );
}

const LEGAL_LINKS: FooterNavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Community Guidelines", href: "/community-guidelines" },
];

function FooterBottom() {
  return (
    <div className="relative w-full border-t border-[rgba(0,0,0,0.1)] pt-[28px]">
      <div className="flex flex-col-reverse gap-[24px] sm:flex-row sm:items-center sm:justify-between">
        <p className="font-['Poppins:Regular',sans-serif] leading-[20px] text-[14px] text-[rgba(0,0,0,0.6)]">
          © 2026 initiiator. All rights reserved.
        </p>
        <div className="flex flex-col gap-[12px] sm:flex-row sm:flex-wrap sm:gap-x-[24px] sm:gap-y-[8px]">
          {LEGAL_LINKS.map((link) => (
            <FooterLink key={link.label} label={link.label} href={link.href} />
          ))}
        </div>
      </div>
    </div>
  );
}

const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function Footer() {
  return (
    <ScrollFadeUp delay={0.1} className="bg-white rounded-[20px] w-full max-w-[1388px] mx-auto" style={{ padding: "clamp(28px, 4vw, 56px)" }}>
      <motion.div
        className="flex flex-col gap-[42px]"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }}
      >
        <div className="flex flex-col gap-[42px] lg:flex-row lg:items-start lg:justify-between">
          <motion.div variants={STAGGER_ITEM}>
            <FooterLeft />
          </motion.div>
          <motion.div variants={STAGGER_ITEM} className="lg:mt-[64px]">
            <div className="flex gap-[30px] items-start">
              <FooterColumn
                heading="Company"
                links={[
                  { label: "About Us", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  // Blog only once launched — no content to show pre-launch.
                  ...(LAUNCHED ? [{ label: "Blog", href: "/blog" }] : []),
                ]}
              />
              <FooterColumn
                heading="Product"
                links={[
                  { label: "Why initiiator?", href: "/#why" },
                  { label: "How it works", href: "/#features" },
                  { label: "FAQ", href: "/#faq" },
                ]}
              />
            </div>
          </motion.div>
        </div>
        <motion.div variants={STAGGER_ITEM}>
          <FooterBottom />
        </motion.div>
      </motion.div>
    </ScrollFadeUp>
  );
}

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Background drifts slowly as the section passes — extra height absorbs the travel.
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="bg-[#1a1a1a] overflow-hidden relative shrink-0 w-full" data-name="WarmFinalCTASection">
      <motion.div style={{ y: bgY }} className="absolute left-0 right-0 top-[calc(-138*var(--u))] h-[calc(1437*var(--u))] min-h-full w-full">
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgImage381.src} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70 pointer-events-none" />
      <div className="relative flex flex-col gap-[max(64px,calc(390*var(--u)))] px-[max(20px,calc(131*var(--u)))] pt-[max(56px,calc(112*var(--u)))] pb-[max(40px,calc(80*var(--u)))]">
        <CtaContent />
        <Footer />
      </div>
    </div>
  );
}