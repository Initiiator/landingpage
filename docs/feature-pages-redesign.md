# Feature Pages Redesign — Design Plan

**Status:** Proposal for review (no code yet)
**Date:** 2026-06-24
**Scope:** Differentiate within the existing data-driven template **+ add an Apple-style sticky scroll-storytelling variant** for flagship features. Keep the design system, type scale, orange/cream palette (`#ff5a00`/`#ff6000`/`#f9f6f2`/`#1a1a1a`), `--u`/`--ds-*` tokens, `motion/react` + shared `EASE`, and the reusable-data architecture. This is a differentiation + interactivity pass, **not** a restyle.

---

## 1. Problem statement

All seven feature pages render through one `FeaturePage.tsx` template:

> Hero (centered heading + floating phone + download buttons) → alternating image/copy rows → `<Extras>` → Get Started CTA → shared FAQ → FinalCta.

1. **Every page is visually identical** — Wave, Chat, Spaces read as the same page with swapped text.
2. **Placeholder imagery** — `WavePage` reuses `breaktheice.png`/`3phones.png` across rows.
3. **Static "tell" not interactive "show"** — only LiveRadar has a hero animation (`RadarOverlay`). Everything else describes the mechanic in body copy.

**Asset reality check:** only 5 images exist in `src/assets/features/` (`3phones`, `breaktheice`, `connections`, `radar-phone`, `Mask group`). Six of seven pages can't get real screenshots soon → **hero moments and story visuals should be synthetic (CSS/SVG via motion/react), not image-dependent.** This is exactly the `RadarOverlay` precedent (pure markup, no asset).

---

## 2. Reference synthesis (live, June 2026)

| App | Pattern | What we take |
|---|---|---|
| **Apple** | Gold-standard long scroll: one idea per *act*, device **pins and animates** as you scroll; type carries narrative; parallax only on hero. Combine scroll-triggered animation + snap. | `StickyScrollStory` (Layer 2). |
| **WhatsApp** (security page) | Three pillars: **Protection → Control → Support**. In-context screenshots; bold conversational headlines; safety framed as empowerment. | `SafetyBand` (Layer 3). |
| **Bumble** | Warm, human, rounded; one highlighted word per headline (we do this already). | Human texture; keep "first move" voice for Wave. |
| **Tinder** | Bold gradient moments; animations that demonstrate the mechanic live. | One signature hero moment per feature (Layer 1). |

**Accessibility (consistent across references):** animate only `transform`/`opacity`; honor `prefers-reduced-motion` (motion/react `useReducedMotion()` → render the final static frame); drive scroll with `useScroll`/Intersection Observer, **not** scroll-event handlers.

---

## 3. The redesign — three additive layers

### Layer 1 — Signature hero moment per feature (synthetic, over the phone)
Reuse the existing `heroOverlay` slot. Each is a small `motion/react` component sized to the phone's lower screen area, like `RadarOverlay`. Reduced-motion → static end-state.

| Feature | Hero moment | Primitive reuse |
|---|---|---|
| Wave | Profile blip emits an expanding wave arc → ✓ "waved back" badge pops | rings from `RadarOverlay` + spring pop |
| Spaces | 3 dots drift inward inside a 120m ring → ring brightens, "Space live" label | `RadarOverlay` rings + converge |
| Meet Now | Pin drops on mini-map; expiry ring sweeps down (countdown) | SVG pin + circular progress |
| Recent Encounters | 3 stacked memory cards fade/desaturate on a 24h timer; one keeps a "Reconnect" glow | opacity stagger |
| Chat | Two distant dots + dashed line → line dissolves, chat bubble rises | line draw + bubble spring |
| Events | Category chips assemble into an event card | stagger assemble |
| Explore | Grid of community tiles parallax-drifts at 2 depths | slow `y` loops |

### Layer 2 — `StickyScrollStory` (Apple-style), opt-in per page
A pinned device with copy that cross-fades through 3 beats as you scroll. Implementation: a tall `position: sticky` device column + `useScroll({ target, offset })` mapping scroll progress to per-beat `opacity` and the device's internal state. Reduced-motion → static stacked list of beats beside a static device.

- **Flagships (get the story):** Wave, Spaces, Meet Now.
- **Lighter features keep alternating rows:** Chat, Recent Encounters, Events, Explore.

### Layer 3 — `SafetyBand` + `DeviceFrame`
- `SafetyBand` — 3-column **Protection / Control / Support** band (dark `#1a1a1a` surface, matching `StatCallout`). Surfaces each feature's real controls as a feature, not fine print.
- `DeviceFrame` — phone-bezel wrapper so any screenshot reads as intentional immediately (fixes placeholder problem the day a real screenshot lands).

| Feature | Protection | Control | Support |
|---|---|---|---|
| Wave | One wave per person | Re-opens only on a new day | — |
| Chat | E2E private | Block / clear / delete | Report |
| Meet Now | Location auto-expires (15m–4h) | You pick duration | "Did you meet?" trust check |
| Spaces | Needs ≥3 people to form | Leave anytime | Report a space |

---

## 4. Data-model changes (the actual contract)

All **additive** to `FeaturePageData` — existing pages compile unchanged.

```ts
export type StoryBeat = {
  eyebrow?: string;       // small label above the title
  title: React.ReactNode;
  body: string;
  state: string;          // key the pinned device reads to pick its frame
};

export type StickyStoryData = {
  device: React.ReactNode;          // synthetic phone that responds to `state`
  beats: StoryBeat[];               // 3 recommended
  placement?: "replace-rows" | "before-rows"; // default "before-rows"
};

export type SafetyPillar = { kind: "protection" | "control" | "support"; label: string; desc: string };

export type FeaturePageData = {
  // ...existing fields unchanged...
  story?: StickyStoryData;          // Layer 2 — render StickyScrollStory when present
  safety?: SafetyPillar[];          // Layer 3 — render SafetyBand when present
};
```

`FeaturePage` render order becomes: Hero → (`story.placement === "before-rows"` ? story) → rows → story(if replace) → extraSections → SafetyBand(if `safety`) → CTA → FAQ → FinalCta.

**New files:**
- `src/screens/features/_story/StickyScrollStory.tsx`
- `src/screens/features/_extras/SafetyBand.tsx`, `DeviceFrame.tsx` (or add to `primitives.tsx`)
- `src/screens/features/_extras/heroes/<Feature>Hero.tsx` — the 7 overlays (colocated like `_radar/RadarExtras.tsx`)

**No deletions.** `extraSections`, `heroOverlay`, `rows` stay.

---

## 5. Animation spec (house style — match existing code)
- Library: `motion/react`; shared `EASE` from `@/components/animations`.
- Entrances: `initial={{opacity:0, y:24–40}}` → `whileInView`, `viewport={{ once:true, amount:0.3–0.5 }}`, `duration 0.6–0.9`.
- Springs (pops/chips): `type:"spring", stiffness:280–350, damping:18–20`.
- Idle float on devices: `y:[0,-10,0]`, `duration 5–5.5`, `repeat:Infinity` (already the hero/row convention).
- Sizing in `--u`/`clamp()` tokens, never fixed px for spacing.
- Every animated component: `if (useReducedMotion()) return <StaticFrame/>`.

---

## 6. Rollout
1. Build primitives: `StickyScrollStory`, `SafetyBand`, `DeviceFrame`, `WaveHero`.
2. **Prototype Wave** end-to-end (hero moment + sticky story + safety band) = reference impl. Review, lock pattern.
3. Roll hero moments to the other 6 pages.
4. Add sticky story to Spaces + Meet Now.
5. Add SafetyBand where controls exist (table §3).
6. Swap real screenshots into `DeviceFrame` as they arrive.

**Verification per page:** desktop + mobile stack, `prefers-reduced-motion` on, keyboard focus through CTAs, no layout shift (only `transform`/`opacity` animate).

---

## 7. Decisions needed
1. **Synthetic-first confirmed?** (Recommended yes — 6/7 pages have no real screenshots.)
2. **Flagship story set = Wave, Spaces, Meet Now?**
3. **Story placement default** — before rows (intro act) or replace rows entirely for flagships? (Recommended: `before-rows`, keep a couple of rows for depth.)
4. Keep shared FAQ + FinalCta on every page? (Recommended: yes.)

---

## Sources
- [Scrolling Designs: Patterns & When to Use — Lovable](https://lovable.dev/guides/scrolling-designs-patterns-when-to-use)
- [4 Types of Website Scrolling Patterns — UXPin](https://www.uxpin.com/studio/blog/4-types-creative-website-scrolling-patterns/)
- [Security Features, Safety Tools & Tips — WhatsApp](https://www.whatsapp.com/security)
- [14 Web Design Trends 2026 — UX Pilot](https://uxpilot.ai/blogs/web-design-trends-2026)
