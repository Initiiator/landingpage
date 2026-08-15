"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary. Deliberately self-contained — it imports no
 * layout chrome (Navbar/FinalCta), because if the error originated in one of
 * those the boundary would throw again while trying to render the fallback.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface it for whatever error reporting gets wired up; without this the
    // failure is invisible once the fallback renders.
    console.error(error);
  }, [error]);

  return (
    <main className="bg-[#f9f6f2] min-h-screen w-full flex items-center px-[var(--ds-space-gutter)] py-[max(72px,calc(120*var(--u)))]">
      <div className="w-full max-w-[560px] mx-auto text-center flex flex-col items-center">
        <span className="grid size-[52px] place-items-center rounded-full bg-[rgba(255,90,0,0.10)]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 8v5M12 16.5v.5"
              stroke="#ff5a00"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="9" stroke="#ff5a00" strokeWidth="2" />
          </svg>
        </span>

        <h1 className="font-['Poppins:Bold',sans-serif] text-h3 leading-heading tracking-heading text-[#1a1a1a] mt-[20px]">
          Something went wrong.
        </h1>

        <p className="font-['Poppins:Regular',sans-serif] leading-subhead text-body text-[rgba(26,26,26,0.65)] mt-[12px]">
          That&apos;s on us, not you. Try again, and if it keeps happening let us
          know at{" "}
          <a
            href="mailto:support@initiiator.com"
            className="underline underline-offset-2 hover:text-[#ff5a00] transition-colors"
          >
            support@initiiator.com
          </a>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-[12px] items-center mt-[28px]">
          <button
            onClick={reset}
            className="btn-brand h-[55px] px-[28px] py-[14px] text-[16px] whitespace-nowrap"
          >
            Try again
          </button>
          <Link
            href="/"
            className="font-['Poppins:Medium',sans-serif] text-body text-[rgba(26,26,26,0.7)] underline underline-offset-4 decoration-[rgba(26,26,26,0.2)] hover:text-[#ff5a00] hover:decoration-[#ff5a00] transition-colors px-[12px]"
          >
            Back to home
          </Link>
        </div>

        {error.digest && (
          <p className="font-['Poppins:Regular',sans-serif] text-[12px] text-[rgba(26,26,26,0.4)] mt-[24px]">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
