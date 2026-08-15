"use client";

import { useState } from "react";

/**
 * Shared submit handling for the site's form-service-backed forms (waitlist,
 * newsletter). Every one of them POSTs a FormData body to an endpoint supplied
 * by env (Formspree, Tally, etc.) — there is no backend code here.
 *
 * The endpoint is deliberately allowed to be undefined: an unset env var means
 * that form isn't open yet, and we say so plainly rather than firing a request
 * at `undefined` and showing a generic failure.
 */

export type FormStatus = "idle" | "loading" | "success" | "error";

const GENERIC_ERROR = "Something went wrong. Please try again in a moment.";

export function useEndpointForm(
  endpoint: string | undefined,
  closedMessage = "Signups aren't open just yet. Check back soon."
) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!endpoint) {
      setError(closedMessage);
      setStatus("error");
      return;
    }

    // Grab the element now: after the first await, React may have pooled the
    // event and `e.currentTarget` would be null by the time we call reset().
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setError("");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setError(GENERIC_ERROR);
      setStatus("error");
    }
  }

  return { status, error, handleSubmit };
}
