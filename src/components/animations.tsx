"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Shared trigger for the Scroll* helpers below.
 *
 * `once` so a reveal never replays and re-animates content the reader has
 * already passed. `amount: 0.2` fires a fifth of the way in rather than on the
 * first pixel, which lands the animation while the element is comfortably in
 * view instead of down at the fold edge.
 */
const REVEAL_VIEWPORT = { once: true, amount: 0.2 } as const;

/**
 * Parallax image: the image drifts vertically within a fixed frame as the frame
 * scrolls through the viewport, creating a sense of depth. The image is rendered
 * taller than its frame (frame has overflow-hidden) so edges never show.
 *
 * `strength` (px) = how far the image travels across the full scroll pass.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  style,
  strength = 60,
  hover = false,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
  strength?: number;
  hover?: boolean;
  /** Set on above-the-fold images (the hero) so they aren't deferred — lazy
      loading the LCP image delays first paint instead of helping it. */
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // The image is (2*strength) taller than the frame and offset up by `strength`,
  // so it sits centered when y = 0. Drift from -strength → +strength as it
  // passes, keeping both edges covered throughout (an unbalanced 0 → -2*strength
  // range pulls the bottom edge clear of the frame at the top of the range).
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} style={style} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.img
        src={src}
        alt={alt}
        // Defer off-screen photos and keep image decoding off the main thread —
        // synchronously decoding a full-width photo mid-scroll drops frames.
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        // Taller than the frame so the vertical drift never exposes an edge.
        style={{ y, top: -strength, height: `calc(100% + ${strength * 2}px)` }}
        whileHover={hover ? { scale: 1.04 } : undefined}
        transition={hover ? { duration: 0.5, ease: EASE } : undefined}
        className={`absolute inset-x-0 w-full object-cover ${imgClassName ?? ""}`}
      />
    </div>
  );
}

/**
 * Ambient drifting glow — soft, slow-moving orange radial blobs rendered behind
 * a section so it never feels static or empty, even between content. Purely
 * decorative (pointer-events-none, low opacity). Place inside a `relative`
 * parent; content should sit above it (higher z-index).
 */
export function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-0">
      <motion.div
        className="absolute left-[-10%] top-[10%] w-[45vw] max-w-[640px] aspect-square rounded-full bg-[radial-gradient(closest-side,rgba(255,90,0,0.10),rgba(255,90,0,0)_70%)] blur-[40px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute right-[-12%] top-[45%] w-[40vw] max-w-[560px] aspect-square rounded-full bg-[radial-gradient(closest-side,rgba(255,143,0,0.10),rgba(255,143,0,0)_70%)] blur-[40px]"
        animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, delay: 2 }}
      />
    </div>
  );
}

/** Fades in while unblurring. Use for headings. */
export function BlurIn({
  children,
  delay = 0,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
}) {
  const Comp = motion[Tag] as typeof motion.span;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, filter: "blur(14px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/** Splits text into words and reveals them one by one. Use for body copy. */
export function WordReveal({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.045, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * Blur-in for section headings. Reveals when scrolled into view.
 *
 * These used to fire on mount, which meant every reveal below the fold played
 * out while the reader was still looking at the hero — so the lower half of the
 * page had no entrance motion left by the time you reached it and simply slid
 * past. Use the plain BlurIn/WordReveal variants for above-the-fold content
 * that should animate on load.
 */
export function ScrollBlurIn({
  children,
  delay = 0,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
}) {
  const Comp = motion[Tag] as typeof motion.span;
  const reduce = useReducedMotion();
  if (reduce) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/** Word-by-word reveal for body copy. Reveals when scrolled into view. */
export function ScrollWordReveal({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/** Generic fade-up for containers (images, cards, buttons); reveals in view. */
export function ScrollFadeUp({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  if (reduce)
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
