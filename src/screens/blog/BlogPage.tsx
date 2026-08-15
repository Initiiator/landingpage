"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { BlurIn, WordReveal, ScrollBlurIn, AmbientGlow, EASE } from "@/components/animations";
import { useEndpointForm } from "@/lib/useEndpointForm";
import { Navbar } from "@/screens/landing/sections/Navbar";
import { FinalCta } from "@/screens/landing/sections/FinalCta";
import imgHero from "@/assets/blog/hero.webp";

// Reused repo photos as temporary card images (swap for real blog photos later).
import imgCard1 from "@/assets/landing/5dd15eb15411b90762eff71c4cae645914b6a5d6.webp";
import imgCard2 from "@/assets/landing/142d4e1b76993626d62521e6ec29d8c5374c683b.webp";
import imgCard3 from "@/assets/landing/db3a5260a0e3d3bb1d9041fb9622b55aa5636862.webp";
import imgCard4 from "@/assets/landing/19faa2e11f1b16c5444a6d6674652b3519f173b2.webp";
import imgCard5 from "@/assets/landing/9e925d45cf7c5764ab4418d1dfe873534da20cc7.webp";
import imgCard6 from "@/assets/landing/16c4ae71a6d80ccb09c57a6df9982a891b0f3ba3.webp";

type Category = "Research" | "Community" | "Insights" | "Stories" | "Tips";

type Post = {
  category: Category;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  image: { src: string };
};

const POSTS: Post[] = [
  {
    category: "Research",
    date: "March 28, 2026",
    readTime: "4 min read",
    title: "The Science Behind Why Real-Life Connections Matter",
    excerpt:
      "Recent studies show that face-to-face interactions trigger oxytocin release and reduce cortisol levels more effectively than digital communication alone.",
    author: "Rachel Kim",
    image: imgCard1,
  },
  {
    category: "Community",
    date: "March 28, 2026",
    readTime: "4 min read",
    title: "How to Make Friends as an Adult: Tips from Our Community",
    excerpt:
      "Making friends after college doesn't have to be awkward. Our users share their best tips for breaking the ice and building genuine connections.",
    author: "Rachel Kim",
    image: imgCard2,
  },
  {
    category: "Insights",
    date: "March 28, 2026",
    readTime: "4 min read",
    title: "Fighting Loneliness in the Digital Age",
    excerpt:
      "Social media promised connection but delivered isolation. Here's how proximity-based apps are bringing humanity back to social networking.",
    author: "Rachel Kim",
    image: imgCard3,
  },
  {
    category: "Stories",
    date: "March 28, 2026",
    readTime: "4 min read",
    title: "Success Story: From Strangers to Best Friends",
    excerpt:
      "Meet Jamie and Alex, two initiiator users who connected over a shared love of hiking and are now planning their third adventure together.",
    author: "Rachel Kim",
    image: imgCard4,
  },
  {
    category: "Research",
    date: "March 28, 2026",
    readTime: "4 min read",
    title: "The Psychology of Proximity: Why Location-Based Connections Work",
    excerpt:
      "Distance matters more than we think. Exploring the mere-exposure effect and how being nearby creates opportunities for lasting friendships.",
    author: "Rachel Kim",
    image: imgCard5,
  },
  {
    category: "Tips",
    date: "March 28, 2026",
    readTime: "4 min read",
    title: "Building Community One Coffee at a Time",
    excerpt:
      "Why the best connections often start with the simplest activities. A guide to low-pressure meetups that actually work.",
    author: "Rachel Kim",
    image: imgCard6,
  },
];

const FILTERS: ("All" | Category)[] = ["All", "Research", "Community", "Insights", "Stories", "Tips"];

/* ── Hero ────────────────────────────────────────────────────────────────── */
function BlogHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Background drifts down slower than the page as the hero scrolls away (parallax).
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden h-[max(560px,calc(897*var(--u)))]">
      {/* Image is taller than the hero so the parallax shift never exposes an edge */}
      <motion.img
        src={imgHero.src}
        alt=""
        style={{ y: bgY }}
        className="absolute inset-x-0 top-0 w-full h-[130%] object-cover object-center pointer-events-none select-none"
      />
      {/* Soft fade so the text band stays readable and the photo melts into the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f6f2]/20 via-transparent to-[#f9f6f2] pointer-events-none" />
      <div className="relative h-full flex flex-col items-center justify-start text-center px-[var(--ds-space-gutter)] pt-[max(320px,calc(639*var(--u)))]">
        <h1 className="font-['Poppins:Bold',sans-serif] not-italic text-display leading-heading text-[#1a1a1a] tracking-[-0.047em] w-full max-w-[1280px]">
          <BlurIn delay={0.05} className="lg:whitespace-nowrap lg:inline-block">Discover the stories behind meaningful</BlurIn>
          <br aria-hidden />
          <BlurIn delay={0.28} className="text-[#ff6000]">connections</BlurIn>
          <BlurIn delay={0.42}>.</BlurIn>
        </h1>
        <p className="font-['Poppins:Regular',sans-serif] leading-subhead text-[rgba(26,26,26,0.7)] text-sm mt-[20px] w-full max-w-[860px]">
          <WordReveal
            text="From networking tips to community stories, find inspiration that helps you connect with the right people."
            delay={0.55}
          />
        </p>
      </div>
    </div>
  );
}

/* ── Filter pills ─────────────────────────────────────────────────────────── */
function Filters({ active, onChange }: { active: string; onChange: (f: "All" | Category) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-[10px] mb-[max(32px,calc(56*var(--u)))]">
      {FILTERS.map((f) => {
        const on = active === f;
        return (
          <button
            key={f}
            type="button"
            onClick={() => onChange(f)}
            className={`font-['Poppins:Medium',sans-serif] text-sm rounded-full px-[20px] py-[10px] border-2 transition-colors ${
              on
                ? "bg-gradient-brand text-white border-transparent shadow-[0px_8px_18px_rgba(255,90,0,0.28)]"
                : "bg-white text-[#1a1a1a] border-[rgba(0,0,0,0.08)] hover:border-[rgba(255,90,0,0.19)]"
            }`}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}

/* ── Post card ────────────────────────────────────────────────────────────── */
function PostCard({ post }: { post: Post }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: EASE }}
      whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(0,0,0,0.10)" }}
      className="group bg-white rounded-[20px] overflow-hidden flex flex-col w-full"
    >
      {/* Image with category tag */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <motion.img
          src={post.image.src}
          alt=""
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: EASE }}
        />
        <span className="absolute top-[14px] left-[14px] bg-gradient-brand text-white font-['Poppins:Medium',sans-serif] text-sm rounded-full px-[12px] py-[5px]">
          {post.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[12px] p-[max(18px,calc(28*var(--u)))] flex-1">
        <div className="flex items-center gap-[10px] font-['Poppins:Regular',sans-serif] text-sm text-[rgba(26,26,26,0.6)]">
          <span>{post.date}</span>
          <span className="size-[3px] rounded-full bg-[rgba(26,26,26,0.3)]" />
          <span>{post.readTime}</span>
        </div>

        <h3 className="font-['Poppins:SemiBold',sans-serif] leading-[1.2] text-[#1a1a1a] text-h4 tracking-[-0.017em]">
          {post.title}
        </h3>

        <p className="font-['Poppins:Regular',sans-serif] leading-[1.625] text-[rgba(26,26,26,0.7)] text-body flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between border-t border-[rgba(0,0,0,0.1)] pt-[14px] mt-[4px]">
          <span className="flex items-center gap-[8px] font-['Poppins:Regular',sans-serif] text-sm text-[rgba(26,26,26,0.6)]">
            <span className="size-[22px] rounded-full bg-[rgba(255,90,0,0.12)] flex items-center justify-center text-[#ff5a00] text-sm font-['Poppins:SemiBold',sans-serif]">
              {post.author.charAt(0)}
            </span>
            {post.author}
          </span>
          <motion.a
            href="#"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="font-['Poppins:Medium',sans-serif] text-[#ff5a00] text-body inline-flex items-center gap-[4px]"
          >
            Read <span aria-hidden>→</span>
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Newsletter band ──────────────────────────────────────────────────────── */
/* Subscribers go to a form-service endpoint set via NEXT_PUBLIC_NEWSLETTER_ENDPOINT.
   It's deliberately separate from the waitlist endpoint: "tell me when you launch"
   and "send me weekly posts" are different consents and shouldn't share a list. */
const NEWSLETTER_ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

function Newsletter() {
  const { status, error, handleSubmit } = useEndpointForm(
    NEWSLETTER_ENDPOINT,
    "The newsletter isn't open just yet. Check back soon."
  );

  return (
    <div className="bg-gradient-brand drop-shadow-[0px_17px_15px_rgba(255,90,0,0.32)] rounded-[20px] w-full max-w-[1234px] mx-auto text-center text-white px-[max(24px,calc(64*var(--u)))] py-[max(36px,calc(56*var(--u)))] mt-[var(--ds-space-section-y)]">
      <p className="font-['Poppins:SemiBold',sans-serif] text-h3 leading-[1.04] tracking-[-0.025em]">
        <ScrollBlurIn>Stay Connected</ScrollBlurIn>
      </p>
      <p className="font-['Poppins:Regular',sans-serif] leading-[1.5] text-body text-[rgba(255,255,255,0.85)] mt-[10px] max-w-[520px] mx-auto">
        Get the latest stories and insights delivered straight to your inbox every week.
      </p>

      {status === "success" ? (
        <p
          role="status"
          className="font-['Poppins:SemiBold',sans-serif] text-body mt-[24px] max-w-[480px] mx-auto"
        >
          You&apos;re subscribed. Look out for the next one in your inbox.
        </p>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-[12px] items-center justify-center mt-[24px] max-w-[480px] mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              disabled={status === "loading"}
              placeholder="Enter your email"
              className="w-full sm:flex-1 h-[clamp(46px,5.5vw,55px)] rounded-full bg-white text-[#1a1a1a] placeholder:text-[rgba(26,26,26,0.45)] font-['Poppins:Regular',sans-serif] text-body px-[20px] outline-none disabled:opacity-70"
            />
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto h-[clamp(46px,5.5vw,55px)] rounded-full bg-white text-[#ff5a00] font-['Poppins:SemiBold',sans-serif] text-body px-[28px] whitespace-nowrap disabled:opacity-70"
            >
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </motion.button>
          </form>

          {status === "error" && (
            <p
              role="alert"
              className="font-['Poppins:Regular',sans-serif] text-sm mt-[14px] max-w-[480px] mx-auto"
            >
              {error}
            </p>
          )}

          <p className="font-['Poppins:Regular',sans-serif] text-[12px] text-[rgba(255,255,255,0.75)] mt-[14px] max-w-[480px] mx-auto">
            Unsubscribe anytime. See our{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
        </>
      )}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export function BlogPage() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const visible = filter === "All" ? POSTS : POSTS.filter((p) => p.category === filter);

  return (
    <div className="bg-[#f9f6f2] flex flex-col w-full">
      <Navbar />
      <BlogHero />

      <div className="relative bg-[#f9f6f2] px-[var(--ds-space-gutter)] py-[var(--ds-space-section-y)] overflow-hidden">
        <AmbientGlow />
        <div className="relative z-10 w-full max-w-[1234px] mx-auto">
          <Filters active={filter} onChange={setFilter} />

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(16px,2vw,28px)] items-stretch">
            <AnimatePresence mode="popLayout">
              {visible.map((post) => (
                <PostCard key={post.title} post={post} />
              ))}
            </AnimatePresence>
          </motion.div>

          <Newsletter />
        </div>
      </div>

      <FinalCta />
    </div>
  );
}
