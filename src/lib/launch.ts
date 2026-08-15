/**
 * Launch mode switch.
 *
 * The whole site runs in one of two modes, driven by a single env var so launch
 * day is a config change, not a code change:
 *
 *   NEXT_PUBLIC_LAUNCHED = "true"   → the product is live.
 *   anything else (incl. unset)     → pre-launch (default).
 *
 * In pre-launch mode the "download the app" CTAs become a single "Join the
 * waitlist" button, and support/content nav links (Blogs, Help, Privacy) are
 * hidden — so nothing implies the app is available yet. The Features menu stays:
 * it's the storytelling that earns a waitlist signup.
 *
 * Post-launch, store buttons point at the real listings via:
 *   NEXT_PUBLIC_IOS_URL / NEXT_PUBLIC_ANDROID_URL  (fall back to "#" if unset).
 */
export const LAUNCHED = process.env.NEXT_PUBLIC_LAUNCHED === "true";

/** Where pre-launch CTAs send people. */
export const WAITLIST_PATH = "/waitlist";

/** Real store URLs, used only once launched. Empty falls back to "#". */
export const IOS_URL = process.env.NEXT_PUBLIC_IOS_URL || "#";
export const ANDROID_URL = process.env.NEXT_PUBLIC_ANDROID_URL || "#";

/** Where a generic "Get Started" / "Download" CTA should point. Pre-launch it
    drives signups; once launched it sends people to the iOS listing. */
export const PRIMARY_CTA_HREF = LAUNCHED ? IOS_URL : WAITLIST_PATH;
