"use client";

import { ExtrasShell, ScrollFade, SectionHead, StatCallout, NumberedGrid, CategoryCloud } from "./primitives";

export function SpacesExtras() {
  return (
    <ExtrasShell>
      <StatCallout
        stat="3+"
        title="Spaces that form around you."
        body="When at least three like-minded people gather within 120m, a Space Around You can come alive: a community that exists because the right people are actually here, right now."
      />

      <ScrollFade>
        <SectionHead title="Four kinds of spaces, one home" subtitle="From always-on global communities to ones that appear only when your neighborhood lights up." />
        <NumberedGrid
          cols={4}
          items={[
            { n: "01", label: "Explore", desc: "Global, permanent communities for every interest." },
            { n: "02", label: "Around You", desc: "Dynamic spaces that form within 120m in real time." },
            { n: "03", label: "Your Active", desc: "The spaces you've joined and keep coming back to." },
            { n: "04", label: "Upcoming Events", desc: "Real-world meetups happening inside your spaces." },
          ]}
        />
      </ScrollFade>

      <ScrollFade>
        <SectionHead title="A space for every side of you" />
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
    </ExtrasShell>
  );
}
