"use client";

import { ExtrasShell, ScrollFade, SectionHead, StatCallout, CategoryCloud, NumberedGrid } from "./primitives";

export function ExploreExtras() {
  return (
    <ExtrasShell>
      <StatCallout
        stat="Global"
        title="Always-on places to belong."
        body="Explore Spaces aren't tied to the radar or the 120m range. They're permanent, global communities you can join and stay part of for as long as you like, wherever you go."
      />

      <ScrollFade>
        <SectionHead title="Find your corner" subtitle="Communities are grouped into clear categories, so you always know where you'll feel at home." />
        <CategoryCloud
          items={[
            { label: "Creativity" },
            { label: "Networking" },
            { label: "Learning" },
            { label: "Lifestyle" },
            { label: "Culture" },
            { label: "Late Night" },
          ]}
        />
      </ScrollFade>

      <ScrollFade>
        <SectionHead title="More than a feed" subtitle="Every space blends three things, so a shared interest becomes people you actually meet." />
        <NumberedGrid
          cols={3}
          items={[
            { n: "01", label: "Conversations", desc: "Lightweight, ongoing talk that keeps the community alive." },
            { n: "02", label: "Events", desc: "Real-world meetups born from what the space cares about." },
            { n: "03", label: "Nearby activity", desc: "See when your community comes alive around you in person." },
          ]}
        />
      </ScrollFade>
    </ExtrasShell>
  );
}
