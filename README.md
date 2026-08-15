# initiiator — Landing & Marketing Site

Marketing site for **initiiator**, a proximity-aware social platform that helps
people reconnect in real life through nearby discovery, intentional waves,
persistent chat, and real-world meetups.

This repo contains the public-facing website: the landing page, feature pages,
the Privacy & Security page, and the blog.

## Stack

- **Next.js 15** (App Router)
- **React 19** + TypeScript
- **Tailwind CSS v4** with a custom proportional design system
- **motion** (Framer Motion) for scroll and interaction animations

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Project structure

```
src/
  app/                 # routes (App Router)
    page.tsx           # landing page
    features/          # one route per feature (live-radar, wave, chat, …)
    privacy-security/  # privacy & security page
    blog/              # blog
  screens/             # page-level compositions
    landing/           # landing sections (hero, problem, community, faq, cta …)
    features/          # reusable FeaturePage + per-feature data
    blog/              # blog page
  components/          # shared UI + animation primitives
  styles/              # theme tokens + global styles
  assets/              # images and SVG paths
```

## Environment variables

Copy `.env.example` to `.env.local` for development, and set the same values in
the host's dashboard (Vercel → Settings → Environment Variables) for production.

Every variable is `NEXT_PUBLIC_`, so it is **inlined into the client bundle at
build time** — none of them are secrets, and changing one in production requires
a redeploy to take effect.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL. Drives canonical tags, sitemap, robots and OG image URLs. No trailing slash. **If unset it falls back to the Vercel deployment hostname**, which silently breaks canonicals on a custom domain. |
| `NEXT_PUBLIC_LAUNCHED` | `"true"` puts the site in live mode (store buttons, full nav, Blog in footer). Anything else = pre-launch mode (waitlist CTAs, trimmed nav). |
| `NEXT_PUBLIC_WAITLIST_ENDPOINT` | Form-service endpoint the waitlist POSTs to (e.g. Formspree). Unset → the form says signups aren't open rather than failing. |
| `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` | Same, for the blog newsletter. Deliberately a separate list from the waitlist — different consents. |
| `NEXT_PUBLIC_IOS_URL` / `NEXT_PUBLIC_ANDROID_URL` | Store listings. Used only when launched; **fall back to `"#"` if empty**, so set them in the same deploy that flips `NEXT_PUBLIC_LAUNCHED`. |

## Going live

Launch is a config change, not a code change (see `src/lib/launch.ts`). In one
deploy, set `NEXT_PUBLIC_LAUNCHED=true` **and** both store URLs — flipping the
flag without the URLs leaves the download buttons pointing at `#`.

## Conventions

- **Images are WebP.** Photos are imported as static assets so Next fingerprints
  and long-cache them. Don't add PNG photography — a 1200px photo is ~1MB as PNG
  and ~60KB as WebP. `src/app/icon.png` is the exception (a Next special file).
- **Below-the-fold animation uses the `Scroll*` helpers** in
  `src/components/animations.tsx` (`ScrollBlurIn`, `ScrollWordReveal`,
  `ScrollFadeUp`). They are `whileInView` + `once`, so they reveal on arrival.
  The plain `BlurIn` / `WordReveal` variants fire on mount — use those only for
  content that is visible on load, i.e. the hero.
- **Security headers** (CSP, HSTS, `X-Frame-Options`, `Permissions-Policy`, …)
  are defined in `next.config.ts`. `connect-src`/`form-action` currently allow
  any `https:` origin because the form endpoints are configurable; narrow them
  to the form provider's domain once that is fixed.

## Design system

Type scale, spacing, colors, and radii live as CSS custom properties in
`src/styles/theme.css` (`--ds-*` tokens). Layout uses a proportional `--u`
unit derived from the 1512px design width so the desktop canvas matches Figma
1:1, with fluid `clamp()` overrides below the `lg` breakpoint for mobile.

## Feature pages

Feature pages are data-driven: `src/screens/features/FeaturePage.tsx` is a
generic layout (hero → alternating content rows → FAQ → CTA), and each feature
supplies a small data file. Adding a feature page is a data file plus a route.
