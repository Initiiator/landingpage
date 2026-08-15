/**
 * Canonical site configuration used for SEO (metadataBase, sitemap, robots,
 * Open Graph / Twitter cards).
 *
 * The production URL comes from NEXT_PUBLIC_SITE_URL so it's set once at deploy
 * and every absolute URL (canonical, OG image, sitemap entries) resolves
 * correctly — hardcoding it would break the moment the domain changes.
 *
 * If that var isn't set, fall back to Vercel's own auto-injected deployment
 * URL (VERCEL_URL) rather than a hardcoded domain — a hardcoded fallback
 * silently breaks og:image/canonical URLs the moment it doesn't match the
 * domain actually serving the app (e.g. a custom domain that isn't live yet).
 */
const FALLBACK_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL
).replace(/\/$/, "");

export const SITE_NAME = "initiiator";

export const SITE_DESCRIPTION =
  "initiiator finds people near you who'd actually get along with you, then helps you meet them in real life.";

/** Absolute URL helper for canonical / sitemap entries. */
export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
