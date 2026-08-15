"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { EASE } from "@/components/animations";
import { DeviceFrame } from "../_extras/DeviceFrame";
import { type Screen, type ScreenMap } from "./ScreenStoryDevice";

/* ════════════════════════════════════════════════════════════════════════
   SCREEN STORY FRAME  (client renderer)
   Renders the phone mockup for a screen-driven story and cross-fades between
   the beats' screens as the active `state` changes.

   Every screen stays mounted so the browser decodes each once — beat changes
   are then a pure opacity tween with no re-decode hitch. The GPU hints
   (translateZ / backface / will-change) keep the cross-fade on the compositor.
   ════════════════════════════════════════════════════════════════════════ */

const CYCLE_MS = 2600; // dwell per screen when a beat holds several

export function ScreenStoryFrame({ screens, state }: { screens: ScreenMap; state: string }) {
  const beats = Object.keys(screens);
  return (
    // In the sticky story the device shares one screen with the copy below it,
    // so on mobile its width is also capped by viewport height (a 9/19.5 phone is
    // ~2.17× as tall as wide → 24vh of width ≈ 52vh tall, leaving room for copy).
    // Desktop restores the standard width.
    <DeviceFrame bare className="!w-[min(58vw,24vh)] lg:!w-[clamp(200px,55vw,300px)]">
      {beats.map((beat) => (
        <BeatScreens key={beat} screens={asArray(screens[beat])} active={beat === state} />
      ))}
    </DeviceFrame>
  );
}

function asArray(s: Screen | Screen[]): Screen[] {
  return Array.isArray(s) ? s : [s];
}

/** One beat's screen(s). A single screen just fades with `active`; several
    screens cross-fade on a slow loop, but only while the beat is active. */
function BeatScreens({ screens, active }: { screens: Screen[]; active: boolean }) {
  const [idx, setIdx] = useState(0);
  const multi = screens.length > 1;

  useEffect(() => {
    if (!active || !multi) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % screens.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [active, multi, screens.length]);

  return (
    <div className={`absolute inset-0 ${active ? "z-10" : "z-0"}`}>
      {screens.map((screen, i) => (
        <motion.img
          key={screen.src}
          src={screen.src}
          alt={screen.alt}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-top [transform:translateZ(0)] [backface-visibility:hidden] will-change-[opacity]"
          initial={false}
          animate={{ opacity: active && (!multi || i === idx) ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      ))}
    </div>
  );
}
