import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/screens/landing/sections/Navbar";
import { FinalCta } from "@/screens/landing/sections/FinalCta";
import { PRIMARY_CTA_HREF, LAUNCHED } from "@/lib/launch";

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 has nothing worth ranking, and indexing it would dilute the real pages.
  robots: { index: false, follow: true },
};

/* Popular destinations, so a dead link becomes a way back in rather than a
   dead end. Blog is omitted pre-launch for the same reason it's hidden in the
   footer — there's no real content behind it yet. */
const LINKS = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/#features" },
  { label: "Live Radar", href: "/features/live-radar" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  ...(LAUNCHED ? [{ label: "Blog", href: "/blog" }] : []),
];

export default function NotFound() {
  return (
    <div className="bg-[#f9f6f2] flex flex-col w-full min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center px-[var(--ds-space-gutter)] py-[max(72px,calc(120*var(--u)))]">
        <div className="w-full max-w-[820px] mx-auto text-center flex flex-col items-center">
          <p className="font-['Poppins:SemiBold',sans-serif] text-[#ff5a00] text-body tracking-[0.08em] uppercase">
            404
          </p>

          <h1 className="font-['Poppins:Bold',sans-serif] text-h2 leading-heading tracking-heading text-[#1a1a1a] mt-[12px]">
            This one&apos;s out of range.
          </h1>

          <p className="font-['Poppins:Regular',sans-serif] leading-subhead text-body text-[rgba(26,26,26,0.65)] mt-[16px] max-w-[460px]">
            The page you&apos;re looking for doesn&apos;t exist, or it moved somewhere
            else. Here&apos;s the way back.
          </p>

          <Link
            href={PRIMARY_CTA_HREF}
            className="btn-brand h-[55px] px-[28px] py-[14px] text-[16px] whitespace-nowrap mt-[32px]"
          >
            {LAUNCHED ? "Get the app" : "Join the waitlist"}
          </Link>

          <nav className="flex flex-wrap gap-x-[24px] gap-y-[10px] items-center justify-center mt-[36px]">
            {LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-['Poppins:Regular',sans-serif] text-body text-[rgba(26,26,26,0.7)] underline underline-offset-4 decoration-[rgba(26,26,26,0.2)] hover:text-[#ff5a00] hover:decoration-[#ff5a00] transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </main>

      <FinalCta />
    </div>
  );
}
