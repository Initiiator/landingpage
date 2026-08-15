"use client";

import { ExtrasShell, ScrollFade, SectionHead, StatCallout, ChipRow, NumberedGrid } from "./primitives";

export function MeetNowExtras() {
  return (
    <ExtrasShell>
      <StatCallout
        stat="2h"
        title="Then we ask: did you meet?"
        body="About two hours after your planned meetup, initiiator gently checks in. Every confirmed meetup strengthens your Trust Score and streak, reflecting the connections you've actually made."
      />

      <ScrollFade>
        <SectionHead title="Share your location for exactly as long as you want" subtitle="Live location automatically expires, so you're never sharing it a second longer than you intended." />
        <ChipRow
          items={[
            { label: "15 minutes", desc: "Quick hand-off", on: true },
            { label: "30 minutes", desc: "Short meetup" },
            { label: "1 hour", desc: "A proper hang" },
            { label: "4 hours", desc: "The whole evening" },
          ]}
        />
      </ScrollFade>

      <ScrollFade>
        <SectionHead title="Meet somewhere that feels right" subtitle="Meet Now suggests safe, public spots nearby, pulled live from the map." />
        <NumberedGrid
          cols={3}
          items={[
            { n: "01", label: "Cafés & lounges", desc: "Easy, public, and relaxed, perfect for a first meet." },
            { n: "02", label: "Parks & libraries", desc: "Open, calm spaces when you'd rather be outside or quiet." },
            { n: "03", label: "Restaurants", desc: "When the conversation's going well and you both want more time." },
          ]}
        />
      </ScrollFade>
    </ExtrasShell>
  );
}
