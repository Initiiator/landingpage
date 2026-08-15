"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ComponentProps } from "react";

/**
 * next/link wrapped for framer-motion, so internal navigation still gets
 * hover/tap/scroll motion props (whileHover, whileTap, initial/animate…)
 * while routing client-side instead of a full browser reload.
 */
export const MotionLink = motion.create(Link);

/**
 * Some CTAs point at PRIMARY_CTA_HREF, which is an internal path
 * ("/waitlist") pre-launch and an external app-store URL once launched.
 * This picks MotionLink for internal routes and a plain motion.a for
 * external URLs (and "#" anchors), so neither case breaks.
 */
export function SmartMotionLink({ href, ...props }: ComponentProps<typeof motion.a> & { href: string }) {
  if (href.startsWith("/")) {
    return <MotionLink href={href} {...(props as ComponentProps<typeof MotionLink>)} />;
  }
  return <motion.a href={href} {...props} />;
}
