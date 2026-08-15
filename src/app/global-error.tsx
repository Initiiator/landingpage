"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary for errors thrown in the root layout itself. It replaces
 * the whole document, so it must supply its own <html>/<body> — and because the
 * layout (and therefore the stylesheet import) never rendered, the styling here
 * is inline rather than Tailwind.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "#f9f6f2",
          color: "#1a1a1a",
          fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 460 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
            Something went wrong.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(26,26,26,0.65)", marginTop: 12 }}>
            That&apos;s on us, not you. Try again, and if it keeps happening let us
            know at{" "}
            <a href="mailto:support@initiiator.com" style={{ color: "#ff5a00" }}>
              support@initiiator.com
            </a>
            .
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: 28,
              height: 52,
              padding: "0 28px",
              fontSize: 16,
              fontWeight: 600,
              color: "#fff",
              background: "linear-gradient(90deg, #ff5a00, #ff8a00)",
              border: "none",
              borderRadius: 999,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Try again
          </button>
          {error.digest && (
            <p style={{ fontSize: 12, color: "rgba(26,26,26,0.4)", marginTop: 24 }}>
              Reference: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
