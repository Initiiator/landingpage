"use client";

import { ExtrasShell, ScrollFade, SectionHead, StatCallout, StepFlow, NumberedGrid } from "./primitives";

export function WaveExtras() {
  return (
    <ExtrasShell>
      <StatCallout
        stat="1"
        title="One wave per person."
        body="A wave isn't something you spam. You get a single wave for each person, so when you send one, it actually means something. It only reopens if you cross paths again on another day."
      />

      <ScrollFade>
        <SectionHead title="The life of a wave" subtitle="Every wave moves through a few simple states, you always know exactly where you stand." />
        <StepFlow
          steps={[
            { label: "Sent", desc: "You signal interest with a single tap." },
            { label: "Received", desc: "It appears in their activity. No notifications spam." },
            { label: "Accepted", desc: "Mutual interest opens a persistent chat." },
            { label: "Expired", desc: "Unanswered waves quietly fade away." },
          ]}
        />
      </ScrollFade>

      <ScrollFade>
        <SectionHead title="Why a wave, not a message?" />
        <NumberedGrid
          cols={3}
          items={[
            { n: "01", label: "No blank page", desc: "Skip the pressure of writing a perfect opener to a stranger." },
            { n: "02", label: "Lower stakes", desc: "A wave is easy to send and easy to receive. No awkwardness either way." },
            { n: "03", label: "Real signal", desc: "Because it's mutual-or-nothing, a chat only starts when both people opt in." },
          ]}
        />
      </ScrollFade>
    </ExtrasShell>
  );
}
