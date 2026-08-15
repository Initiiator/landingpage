"use client";

import { ExtrasShell, ScrollFade, SectionHead, StatCallout, StepFlow, ChipRow } from "./primitives";

export function RecentEncountersExtras() {
  return (
    <ExtrasShell>
      <StatCallout
        stat="24h"
        title="A rolling 24-hour memory."
        body="Everyone who appeared on your radar but you never interacted with stays here for 24 hours, then quietly disappears. No history to manage, just a second chance while the moment is still fresh."
      />

      <ScrollFade>
        <SectionHead title="How a missed moment comes back" />
        <StepFlow
          steps={[
            { label: "They appear", desc: "Someone crosses your 120m radar during the day." },
            { label: "No interaction", desc: "Neither of you waved. Life got in the way." },
            { label: "Saved quietly", desc: "They land in Recent Encounters for 24 hours." },
            { label: "Reconnect", desc: "Reach out and, if accepted, a chat opens instantly." },
          ]}
        />
      </ScrollFade>

      <ScrollFade>
        <SectionHead
          title="Reconnect is different from a wave"
          subtitle={
            <>
              It's a thoughtful way to say, <em>"We crossed paths, and I'd like to talk."</em> Not in the moment, but
              because the moment stayed with you.
            </>
          }
        />
        <ChipRow
          items={[
            { label: "Reflection-based", desc: "Sent after the moment, on purpose", on: true },
            { label: "Instant chat on accept", desc: "No second step" },
            { label: "Auto-clears in 24h", desc: "Always stays light" },
          ]}
        />
      </ScrollFade>
    </ExtrasShell>
  );
}
