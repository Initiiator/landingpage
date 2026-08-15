import { FeaturePage, type FeaturePageData } from "./FeaturePage";
import { WaveExtras } from "./_extras/WaveExtras";
import { waveStory } from "./_extras/stories/WaveStory";
// Real Figma Wave screen (a profile you can wave at) as the framed hero.
import imgHero from "@/assets/wave/profile.webp";

const data: FeaturePageData = {
  heading: [
    { text: "Saying hello should be" },
    { text: "this easy", highlight: true },
    { text: "." },
  ],
  subtitle:
    "A Wave is the simplest way to say, \"I'd like to connect.\" Every great connection starts with someone making the first move.",
  heroImage: imgHero,
  heroImageAlt: "A nearby person's profile with a Wave button",
  // Bare app screen → phone frame that bleeds into the page (matches Spaces/Live Radar).
  heroFramed: true,
  // Apple-style sticky story carries the see → wave → sent narrative.
  story: waveStory,
  extraSections: <WaveExtras />,
  // WhatsApp-style trust band: Wave's real controls framed as features.
  safety: {
    title: "Built to feel safe, not spammy",
    subtitle: "Every part of initiiator is designed to make reaching out feel comfortable, respectful, and always in your control.",
    items: [
      { kind: "protection", label: "One wave per person", desc: "You can't spam someone with waves. A single wave is all you get, so each one carries weight." },
      { kind: "control", label: "Reopens only on a new day", desc: "An unanswered wave quietly expires. It only becomes available again if you cross paths another day." },
      { kind: "support", label: "Mutual-or-nothing", desc: "A chat opens only when both people say yes. No one can reach you off a one-sided wave." },
    ],
  },
  faqSubtitle: "Everything about waving",
  faq: [
    { q: "What exactly is a wave?", a: "A wave is the lightest possible way to say 'I'd like to connect.' One tap signals genuine interest to someone nearby, no opening line to agonize over, no pressure on either side." },
    { q: "Can I wave at the same person more than once?", a: "No. You get a single wave per person, so every wave actually means something. If it goes unanswered it quietly expires, and only reopens if you cross paths again on another day." },
    { q: "What happens when someone waves back?", a: "A chat opens. Conversations only ever start from a mutual wave, so no one can message you off a one-sided interaction, and your inbox stays full of people who chose to connect." },
    { q: "Will they know I waved if they don't respond?", a: "Your wave simply appears in their activity. There's no pushy notification and no pressure. If they're not interested, it fades on its own." },
  ],
  // The sticky story carries the full sent → received → accepted flow, so the
  // page intentionally has no alternating image rows.
  rows: [],
};

export function WavePage() {
  return <FeaturePage data={data} />;
}
