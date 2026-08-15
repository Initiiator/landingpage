import path from "node:path";
import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * This is a static marketing site with no backend, no auth and no user data
 * beyond a form POST to a third-party form service, so the attack surface is
 * small — but these are free and are what a security scan will look for.
 *
 * The CSP is deliberately not locked down to `script-src 'self'` because Next's
 * hydration inlines bootstrap scripts and the app injects a JSON-LD block, both
 * of which need 'unsafe-inline'. Everything else is closed: no plugins, no
 * framing, no form posts to arbitrary origins, and all subresources must be
 * same-origin (fonts are self-hosted now, so nothing external is needed).
 *
 * `connect-src` allows https: because the waitlist and newsletter forms POST to
 * whatever endpoint NEXT_PUBLIC_*_ENDPOINT is set to. Narrow it to your form
 * provider's domain once that's fixed for production.
 */
/**
 * Next's Fast Refresh runtime evaluates strings, so a CSP without
 * 'unsafe-eval' kills the dev bundle outright: hydration never completes and
 * every element animating up from opacity 0 stays invisible — a blank page.
 * Production builds contain no eval, so the allowance is dev-only and the
 * shipped policy stays strict.
 */
const isDev = process.env.NODE_ENV === "development";

const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "form-action 'self' https:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  // Clickjacking. frame-ancestors above covers modern browsers; this is the
  // legacy equivalent and costs nothing to keep.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site asks for none of these, so deny them outright.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // 2 years + preload is the submission requirement for hstspreload.org.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this project; a stray lockfile in a parent
  // directory was making Next infer the wrong root.
  outputFileTracingRoot: path.join(__dirname),
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
