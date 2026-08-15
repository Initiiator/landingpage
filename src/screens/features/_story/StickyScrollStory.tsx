"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion, type MotionValue } from "motion/react";
import { ScrollBlurIn, EASE } from "@/components/animations";

/* ════════════════════════════════════════════════════════════════════════
   STICKY SCROLL STORY  (Apple-style)
   A device pinned at viewport center (native CSS `position: sticky`) while the
   section scrolls past, cross-fading copy through one "act" per beat and
   morphing the device's synthetic screen via the active beat's `state`.

   The pin is pure CSS sticky (GPU-smooth, no per-frame JS). The only JS is a
   cheap scroll-progress → active-beat index, throttled to fire just on the
   boundaries. This relies on no ancestor clipping the scroll axis — the root
   layout uses `overflow-x: clip` (not `hidden`) so sticky is never disabled.

   Reduced-motion: a plain stacked list of beats beside a static device.
   ════════════════════════════════════════════════════════════════════════ */

export type StoryBeat = {
  eyebrow?: string;
  title: React.ReactNode;
  body: string;
  /** key the device reads to choose its frame */
  state: string;
};

export type StickyStoryData = {
  /** Phone/scene component; receives the active beat's `state` as a prop.
      MUST be a real component (rendered as <Device state=… />) so React keeps
      its <img> nodes mounted and only animates opacity between beats — calling
      it as a plain function would re-create the subtree each beat and stutter. */
  device: React.ComponentType<{ state: string }>;
  beats: StoryBeat[];
  heading?: string;
};

/** vh of scroll height allotted per beat */
const VH_PER_BEAT = 90;

export function StickyScrollStory({ data }: { data: StickyStoryData }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = data.beats.length;
  const Device = data.device;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Cheap: only updates React state when the beat index actually changes.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.max(0, Math.min(n - 1, Math.floor(p * n)));
    setActive((prev) => (prev === i ? prev : i));
  });

  if (reduce) {
    return (
      <section className="mx-auto w-full max-w-[1234px]">
        {data.heading && (
          <p className="font-['Poppins:SemiBold',sans-serif] text-h2 leading-[1.04] tracking-[-0.041em] text-[#1a1a1a] text-center mb-[max(28px,calc(56*var(--u)))]">{data.heading}</p>
        )}
        <div className="flex flex-col lg:flex-row gap-[clamp(24px,5vw,80px)] items-center lg:items-start">
          <div className="lg:w-1/2 flex justify-center shrink-0"><Device state={data.beats[0].state} /></div>
          <div className="lg:w-1/2 flex flex-col gap-[clamp(24px,4vw,48px)]">
            {data.beats.map((b, i) => (
              <BeatCopy key={i} beat={b} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1234px]">
      {data.heading && (
        <p className="font-['Poppins:SemiBold',sans-serif] text-h2 leading-[1.04] tracking-[-0.041em] text-[#1a1a1a] text-center mb-[max(28px,calc(56*var(--u)))]">
          <ScrollBlurIn>{data.heading}</ScrollBlurIn>
        </p>
      )}

      {/* Tall track gives the section room to scroll through every beat. */}
      <div ref={ref} className="relative" style={{ height: `${n * VH_PER_BEAT}vh` }}>
        {/* Native sticky pin — stays centered in the viewport for the whole pass.
            Mobile: device on top, copy below (both full-width). Desktop: side by
            side, each half-width. */}
        <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-[clamp(20px,5vw,80px)] py-[6vh]">
          {/* Device */}
          <div className="w-full lg:w-1/2 flex justify-center shrink-0 order-1">
            <Device state={data.beats[active].state} />
          </div>

          {/* Copy + progress rail */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center lg:justify-start order-2">
            <div className="hidden lg:flex flex-col gap-[10px] mr-[28px] shrink-0">
              {data.beats.map((_, i) => (
                <span key={i} className="w-[3px] h-[28px] rounded-full overflow-hidden bg-[rgba(26,26,26,0.12)]">
                  <motion.span
                    className="block w-full bg-[#ff5a00]"
                    animate={{ height: i <= active ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                </span>
              ))}
            </div>

            <div className="relative w-full min-h-[180px] lg:min-h-[260px] flex-1">
              {data.beats.map((b, i) => (
                <BeatLayer key={i} beat={b} index={i} count={n} progress={scrollYProgress} isActive={active === i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** One beat's copy, faded continuously by scroll progress so beats blend
 *  through each other (no discrete pop). Centered at (i+0.5)/count. */
function BeatLayer({
  beat,
  index,
  count,
  progress,
  isActive,
}: {
  beat: StoryBeat;
  index: number;
  count: number;
  progress: MotionValue<number>;
  isActive: boolean;
}) {
  const seg = 1 / count;
  const center = (index + 0.5) * seg;
  // A beat owns its segment [start, end] of scroll progress and fades in/out
  // entirely WITHIN it — reaching opacity 0 exactly at the boundary where the
  // next beat starts at 0, so the fade windows touch but never overlap (no two
  // titles lit at once). The ramps are generous for a smooth Apple-style
  // crossfade, and the incoming/outgoing copy travels far enough in Y that even
  // during the brief swap the two never physically sit on the same lines.
  const start = index * seg;
  const end = (index + 1) * seg;
  const band = seg * 0.3; // generous ramp → smooth crossfade
  const fadeIn = start;
  const holdIn = start + band;
  const holdOut = end - band;
  const fadeOut = end;
  const opacity = useTransform(progress, [fadeIn, holdIn, holdOut, fadeOut], [0, 1, 1, 0]);
  const y = useTransform(progress, [fadeIn, center, fadeOut], [44, 0, -44]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center items-center lg:items-start"
      style={{ opacity, y, pointerEvents: isActive ? "auto" : "none" }}
    >
      <BeatCopy beat={beat} />
    </motion.div>
  );
}

function BeatCopy({ beat }: { beat: StoryBeat }) {
  // Centered on mobile (stacked under the device), left-aligned on desktop.
  return (
    <div className="flex flex-col gap-[12px] lg:gap-[14px] max-w-[460px] text-center lg:text-left items-center lg:items-start">
      {beat.eyebrow && (
        <span className="font-['Poppins:Medium',sans-serif] text-sm uppercase tracking-[0.08em] text-[#ff5a00]">{beat.eyebrow}</span>
      )}
      <h3 className="font-['Poppins:Bold',sans-serif] leading-[1.15] text-[#1a1a1a] text-h3 tracking-[-0.025em]">{beat.title}</h3>
      <p className="font-['Poppins:Regular',sans-serif] leading-[1.6] text-body text-[rgba(26,26,26,0.7)]">{beat.body}</p>
    </div>
  );
}
