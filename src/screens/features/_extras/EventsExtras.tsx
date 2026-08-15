"use client";

import { ExtrasShell, ScrollFade, SectionHead, StatCallout, CategoryCloud, NumberedGrid } from "./primitives";

export function EventsExtras() {
  return (
    <ExtrasShell>
      <StatCallout
        stat="Trust"
        title="Hosting is earned, not given."
        body="Anyone can join an event, but hosting is unlocked through real participation and successful meetups. So every event you walk into is run by someone the community already trusts."
      />

      <ScrollFade>
        <SectionHead title="Every kind of meetup" subtitle="Whatever you're in the mood for, there's an event shaped around it." />
        <CategoryCloud
          items={[
            { label: "Reflective" },
            { label: "Networking" },
            { label: "Social" },
            { label: "Outdoor" },
            { label: "Creative" },
          ]}
        />
      </ScrollFade>

      <ScrollFade>
        <SectionHead title="You decide who sees it" subtitle="Hosts choose how far an event reaches, from the whole space to just the people nearby." />
        <NumberedGrid
          cols={3}
          items={[
            { n: "01", label: "Anyone in the space", desc: "Open it up to the full community around the interest." },
            { n: "02", label: "Nearby only", desc: "Keep it local to people currently within range." },
            { n: "03", label: "Recommended", desc: "Surface it to people the event is a great fit for." },
          ]}
        />
      </ScrollFade>
    </ExtrasShell>
  );
}
