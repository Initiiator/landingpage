import { FeaturePage, type FeaturePageData } from "./FeaturePage";
import { SpacesExtras } from "./_extras/SpacesExtras";
import { spacesStory } from "./_extras/stories/SpacesStory";
// Real Figma mobile screen as the hero (gradient space-detail card).
import imgHero from "@/assets/spaces/space-photography.svg";

const data: FeaturePageData = {
  heading: [
    { text: "Spaces that form" },
    { text: "around you", highlight: true },
    { text: "." },
  ],
  subtitle:
    "When at least three like-minded people gather within 120 meters, a Space Around You comes alive, because the right people are in the right place at the right time.",
  heroImage: imgHero,
  heroImageAlt: "Spaces screen: a Photography Walk space with members nearby",
  // Bare app screen → wrap in a phone frame that bleeds into the page,
  // matching the Live Radar hero.
  heroFramed: true,
  // No overlay — the real screen is detailed enough to stand on its own; the
  // gather → forms → lives story is told by the sticky device below.
  // Sticky story carries the gather → forms → lives flow.
  story: spacesStory,
  extraSections: <SpacesExtras />,
  safety: {
    title: "Communities that stay healthy",
    subtitle: "Spaces are built to feel alive and intentional, never empty, never noisy.",
    items: [
      { kind: "protection", label: "Needs ≥3 people to exist", desc: "A Space Around You only forms when enough people are actually present. No ghost rooms, no dead chats." },
      { kind: "control", label: "Join and leave freely", desc: "Spaces are yours to join when they fit and leave the moment they don't. Nothing holds you there." },
      { kind: "support", label: "Report a space", desc: "Anything off? Report a space or a conversation and our team takes it from there." },
    ],
  },
  faqSubtitle: "Everything about Spaces",
  faq: [
    { q: "What is a Space?", a: "A Space is a living community built around a shared interest and place. Some are nearby, in-the-moment 'Spaces Around You'; others are permanent Explore Spaces you can stay part of. Either way it's people and conversation, not just a group chat." },
    { q: "How does a Space Around You form?", a: "When at least three like-minded people gather within range, the conditions for a space are met and it lights up. It only ever appears when there are enough people to make it real, so you never walk into an empty room." },
    { q: "Can I leave a Space whenever I want?", a: "Yes. Spaces are yours to join when they fit and leave the moment they don't. Nothing holds you there, and leaving is always one tap away." },
    { q: "What if something feels off in a Space?", a: "You can report a space or a conversation at any time and our team takes it from there. Spaces are built to stay healthy and intentional." },
  ],
  // The sticky story replaces the alternating rows.
  rows: [],
};

export function SpacesPage() {
  return <FeaturePage data={data} />;
}
