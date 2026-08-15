"use client";

import { ExtrasShell, ScrollFade, SectionHead, StatCallout, NumberedGrid, ChipRow } from "./primitives";

export function ChatExtras() {
  return (
    <ExtrasShell>
      <StatCallout
        stat="∞"
        title="No distance limit, ever."
        body="A chat is created the moment a wave is accepted, and from then on it's completely independent of the radar or the 120m range. Across the street or across the country, the conversation stays."
      />

      <ScrollFade>
        <SectionHead title="Built for real conversation" subtitle="Everything you need to talk naturally, nothing built to keep you endlessly scrolling." />
        <NumberedGrid
          cols={3}
          items={[
            { n: "01", label: "Text & voice notes", desc: "Type when it's quick, send a voice note when it's easier to just say it." },
            { n: "02", label: "Search your chat", desc: "Find that place, time, or plan you mentioned without endless scrolling." },
            { n: "03", label: "Clear or delete", desc: "Tidy a conversation or remove it entirely. Your history, your call." },
          ]}
        />
      </ScrollFade>

      <ScrollFade>
        <SectionHead title="Always in your control" subtitle="One simple three-dot menu keeps every safety tool a single tap away." />
        <ChipRow
          items={[
            { label: "Block anyone", desc: "Instantly and quietly", on: true },
            { label: "Report", desc: "Flag bad behavior" },
            { label: "Clear chat", desc: "Wipe the thread" },
            { label: "Delete", desc: "Remove it for good" },
          ]}
        />
      </ScrollFade>
    </ExtrasShell>
  );
}
