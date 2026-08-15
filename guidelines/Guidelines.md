# Initiator — Design System

The single source of truth lives in [`src/styles/theme.css`](../src/styles/theme.css)
as CSS custom properties prefixed `--ds-*`, and is exposed to Tailwind via
`@theme inline` (utilities) and `@layer components` (button classes).
Values were extracted from the Figma "landing page redesign" frame.

When building or editing UI, **use these tokens/utilities instead of hardcoding
hex colors, pixel font sizes, or repeating the button gradient.**

## Colors

| Token            | Value                  | Tailwind utility      | Use                          |
| ---------------- | ---------------------- | --------------------- | ---------------------------- |
| `--ds-brand`     | `#ff5a00`              | `text-brand`/`bg-brand` | primary orange             |
| `--ds-brand-2`   | `#ff8f00`              | `text-brand-2`        | gradient end (amber)         |
| `--ds-brand-accent` | `#ff6000`           | `text-brand-accent`   | headline highlight word      |
| `--ds-ink`       | `#1a1a1a`              | `text-ink`            | primary text                 |
| `--ds-ink-muted` | `rgba(26,26,26,.7)`    | `text-ink-muted`      | body / secondary text        |
| `--ds-ink-faint` | `#969696`              | `text-ink-faint`      | captions, timestamps         |
| `--ds-cream`     | `#f9f6f2`              | `bg-cream`            | navbar + feature ticker only |
| `--ds-surface`   | `#ffffff`              | `bg-white`            | hero content + cards         |

**Surface rule:** the hero **content area is white**; cream (`#f9f6f2`) is used
only on the navbar and the feature ticker strip.

## Typography

Poppins throughout (`--font-sans`). Fluid sizes via `clamp(min, vw, max)` — the
design is a layout map, so type scales with the viewport (max = 1512px desktop).

| Role          | Token / utility | Desktop max | Use                       |
| ------------- | --------------- | ----------- | ------------------------- |
| Display       | `text-display`  | 64px        | hero H1                   |
| H1            | `text-h1`       | 53.9px      | Problem section heading   |
| H2            | `text-h2`       | 48.4px      | section headings          |
| H3            | `text-h3`       | 40px        | card titles               |
| H4            | `text-h4`       | 30px        | feature titles            |
| Lead          | `text-lead`     | 22px        | intro paragraphs          |
| Body large    | `text-body-lg`  | 20px        | emphasised body           |
| Body          | `text-body`     | 18px        | default body              |

Weights: Regular 400, Medium 500, SemiBold 600, Bold 700 (+ Italic 400).

## Spacing

| Token                   | Value                | Use                          |
| ----------------------- | -------------------- | ---------------------------- |
| `--ds-space-section-y`  | `clamp(56,7vw,100)`  | vertical section padding     |
| `--ds-space-gutter`     | `clamp(20,5vw,80)`   | horizontal page padding      |
| `--ds-space-stack`      | `clamp(28,4vw,60)`   | gap between stacked blocks   |

## Radii

`--ds-radius-pill` 40px (buttons) · `--ds-radius-card` 20px (cards/images) ·
`--ds-radius-lg` 30px (large image frames).

## Buttons

Primary CTA = orange→amber gradient pill. Styling lives in **one** place:

- CSS class `.btn-brand` (theme.css) — gradient, shadow, hover lift.
- React primitive [`src/app/ui/Button.tsx`](../src/app/ui/Button.tsx) —
  `<Button href size="md|icon">`.
- `.bg-gradient-brand` / `.text-gradient-brand` for non-button gradient surfaces
  and gradient headline text.

Do **not** paste the long inline `linear-gradient(...)` string again — reference
`bg-gradient-brand` / `.btn-brand`.

## Responsive conventions

Below `lg` (1024px): navbar → hamburger; hero & two-column rows stack centered;
card grids 2-col (tablet) → 1-col (phone); footer columns stack. Images use
`aspect-[…]` + `object-cover`; never hardcode a fixed width without a `max-w` cap.
