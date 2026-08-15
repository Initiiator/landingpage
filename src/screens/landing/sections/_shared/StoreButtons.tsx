/**
 * App-store download buttons (iPhone + Android), shared by the hero and the
 * final CTA. Built as real markup (gradient pill + icon + text) rather than
 * baked-in Figma SVGs, so they scale crisply and the labels stay selectable.
 *
 * Pre-launch (NEXT_PUBLIC_LAUNCHED ≠ "true") the consumers render <WaitlistButton>
 * instead of these; once launched the store buttons link to the real listings
 * (NEXT_PUBLIC_IOS_URL / NEXT_PUBLIC_ANDROID_URL). See `@/lib/launch`.
 */
import Link from "next/link";
import svgPaths from "@/assets/landing/svgPaths";
import { IOS_URL, ANDROID_URL, WAITLIST_PATH } from "@/lib/launch";

// Shared pill geometry so the iPhone and Android buttons are identical in size.
// flex-1 + a min lets the two buttons share a row equally and stay on one line,
// shrinking together on narrow screens instead of wrapping.
const PILL =
  "content-stretch flex gap-[8px] h-[clamp(46px,5.5vw,55px)] items-center justify-center px-[27px] relative rounded-full flex-1 min-w-0 max-w-[195px] basis-0";

function AppleIcon() {
  return (
    <svg className="shrink-0 size-[20px]" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M17.05 12.04c-.03-2.79 2.28-4.13 2.38-4.19-1.3-1.9-3.32-2.16-4.03-2.19-1.72-.17-3.35 1.01-4.22 1.01-.86 0-2.2-.99-3.62-.96-1.86.03-3.58 1.08-4.54 2.75-1.93 3.36-.49 8.33 1.39 11.06.92 1.33 2.01 2.83 3.45 2.78 1.38-.06 1.9-.89 3.57-.89 1.66 0 2.13.89 3.59.86 1.48-.03 2.42-1.36 3.33-2.7 1.05-1.55 1.48-3.05 1.5-3.13-.03-.01-2.88-1.1-2.91-4.37zM14.28 4.07c.76-.92 1.27-2.2 1.13-3.47-1.09.04-2.42.73-3.2 1.65-.7.81-1.31 2.11-1.15 3.35 1.22.09 2.46-.62 3.22-1.53z" />
    </svg>
  );
}

/** "Get on iPhone" label, shared by both variants. */
function IPhoneLabel() {
  return (
    <p className="[word-break:break-word] font-['Poppins:Medium',sans-serif] leading-[27.6px] not-italic relative shrink-0 text-[16px] text-white text-center whitespace-nowrap">
      Get on iPhone
    </p>
  );
}

/** iPhone button as used in the hero (carries the brand drop-shadow). */
export function GetOnIPhoneButton() {
  return (
    <a href={IOS_URL} aria-label="Get on iPhone" className={`bg-gradient-brand drop-shadow-[0px_17px_15px_rgba(255,90,0,0.32)] ${PILL}`} data-name="Button">
      <AppleIcon />
      <IPhoneLabel />
    </a>
  );
}

/** iPhone button as used in the final CTA (no extra shadow). */
export function GetOnIPhoneButtonCta() {
  return (
    <a href={IOS_URL} aria-label="Get on iPhone" className={`bg-gradient-brand ${PILL}`} data-name="Button">
      <AppleIcon />
      <IPhoneLabel />
    </a>
  );
}

function PlaystoreIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mage:playstore">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mage:playstore">
          <path d={svgPaths.p1397d000} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

/** Android / Play Store button (identical in hero and CTA). */
export function GetOnAndroidButton() {
  return (
    <a href={ANDROID_URL} aria-label="Get on Android" className={`bg-[#f2f2f2] ${PILL}`} data-name="Button">
      <div aria-hidden className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[40px]" />
      <PlaystoreIcon />
      <p className="[word-break:break-word] font-['Poppins:Medium',sans-serif] leading-[27.6px] not-italic relative shrink-0 text-[16px] text-black text-center whitespace-nowrap">Get on Android</p>
    </a>
  );
}

/** Pre-launch CTA: a single "Join the waitlist" pill that replaces the two
    store buttons. `cta` drops the extra drop-shadow for use in the final CTA. */
export function WaitlistButton({ cta = false }: { cta?: boolean }) {
  return (
    <Link
      href={WAITLIST_PATH}
      aria-label="Join the waitlist"
      className={`bg-gradient-brand ${cta ? "" : "drop-shadow-[0px_17px_15px_rgba(255,90,0,0.32)]"} content-stretch flex gap-[8px] h-[clamp(46px,5.5vw,55px)] items-center justify-center px-[34px] relative rounded-full transition-[filter] hover:brightness-[1.06]`}
    >
      <span className="size-[8px] rounded-full bg-white/90" />
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[16px] text-white text-center whitespace-nowrap">
        Join the waitlist
      </p>
    </Link>
  );
}
