"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import type { StaticImageData } from "next/image";

/** A plain URL string or a Next static-image import. */
export type ImageSrc = string | StaticImageData;

/**
 * Community carousel — a 3D rotating ring (coverflow on a circle).
 *
 * The front card faces the viewer; neighbours curve back into the screen on
 * each side and recede. The ring rotates continuously, carrying images around.
 * Nothing is clipped (no overflow:hidden).
 *
 *  - Auto-rotates one step every `interval` ms, looping forever.
 *  - Pauses while the pointer is over the carousel (and while dragging).
 *  - Drag/swipe left or right (mouse or touch) to step the ring — the primary
 *    control on mobile.
 *  - On desktop, circular prev/next arrows also appear on hover. The arrows are
 *    hidden on mobile, where touch swiping is the only control.
 *
 * Add more photos by appending to the `images` array.
 */

// How far (px) a horizontal drag must travel to count as one step.
const DRAG_THRESHOLD = 60;

// Front card dimensions from Figma (468 × 488).
const CARD_W = 468;
const CARD_H = 488;
const ARC = 43; // degrees between adjacent cards on the ring
const RADIUS = 480; // ring radius in px
const WINDOW = 3; // cards rendered each side of centre

// A px value scaled to the canvas: full size up to 1512px, shrinking below.
const u = (px: number) => `min(${px}px, calc(${px} * var(--u)))`;

export function CommunityCarousel({
  images,
  interval = 3500,
  onIndexChange,
}: {
  images: ImageSrc[];
  interval?: number;
  /** Called with the front card's logical index (wrapped into [0, images.length)) whenever it changes. */
  onIndexChange?: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  // Pointer-drag tracking: start X and whether a drag is in progress.
  const dragStartX = useRef<number | null>(null);
  const n = images.length;

  const go = useCallback((d: 1 | -1) => setIndex((i) => i + d), []);

  useEffect(() => {
    if (!onIndexChange || n === 0) return;
    onIndexChange(((index % n) + n) % n);
  }, [index, n, onIndexChange]);

  useEffect(() => {
    if (hovered || dragging || n < 2) return;
    const id = setInterval(() => setIndex((i) => i + 1), interval);
    return () => clearInterval(id);
  }, [hovered, dragging, n, interval]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, []);

  const endDrag = useCallback(
    (clientX: number) => {
      const start = dragStartX.current;
      dragStartX.current = null;
      setDragging(false);
      if (start === null || n < 2) return;
      const dx = clientX - start;
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      // Drag right → reveal the previous card; drag left → the next one.
      go(dx > 0 ? -1 : 1);
    },
    [go, n],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => endDrag(e.clientX),
    [endDrag],
  );

  const cards = Array.from(
    { length: WINDOW * 2 + 1 },
    (_, k) => index - WINDOW + k,
  );

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Stage: a centred box exactly the size of the front card. The
          `cc-stage` class lets a <1024px media query widen it on mobile only
          (see theme.css) — desktop sizing here is unchanged. */}
      <div
        className="cc-stage relative mx-auto cursor-grab touch-pan-y [perspective:1400px] active:cursor-grabbing"
        style={{ width: u(CARD_W), height: u(CARD_H) }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* 3D ring */}
        <div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ transform: `translateZ(-${RADIUS}px)` }}
        >
          {cards.map((abs) => {
            const rel = abs - index;
            const img = images[((abs % n) + n) % n];
            const isFront = rel === 0;
            const mag = Math.abs(rel);
            return (
              <motion.div
                key={abs}
                className="absolute inset-0 [transform-style:preserve-3d] [backface-visibility:hidden]"
                style={{ zIndex: 100 - mag }}
                animate={{
                  transform: `rotateY(${rel * ARC}deg) translateZ(${RADIUS}px) scale(${
                    isFront ? 1 : mag === 1 ? 0.78 : 0.62
                  })`,
                  opacity: mag > WINDOW - 1 ? 0 : isFront ? 1 : 0.7,
                }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              >
                <img
                  src={typeof img === "string" ? img : img.src}
                  alt={isFront ? "Community moment" : ""}
                  className="h-full w-full rounded-[clamp(16px,1.5vw,24px)] object-cover shadow-[0_40px_70px_-30px_rgba(0,0,0,0.55)]"
                  draggable={false}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Arrows — centred on the stage's left & right edges (= card edges) */}
        <button
          type="button"
          aria-label="Previous"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => go(-1)}
          className={`absolute left-0 top-1/2 z-[200] hidden size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#1a1a1a] shadow-lg backdrop-blur transition-opacity duration-300 hover:bg-white lg:grid ${
            hovered ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => go(1)}
          className={`absolute right-0 top-1/2 z-[200] hidden size-12 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#1a1a1a] shadow-lg backdrop-blur transition-opacity duration-300 hover:bg-white lg:grid ${
            hovered ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
