import { FeaturePage, type FeaturePageData } from "./FeaturePage";
import { EventsExtras } from "./_extras/EventsExtras";
import { eventsStory } from "./_extras/stories/EventsStory";
// Real Figma Events screen (a live gathering) as the framed hero. Photo-heavy,
// so rasterised to WebP (~107KB vs the 5MB source SVG, no visible loss).
import imgHero from "@/assets/event-clean/hero.webp";

const data: FeaturePageData = {
  heading: [
    { text: "Real plans," },
    { text: "real people", highlight: true },
    { text: "real places." },
  ],
  subtitle:
    "Events bring your community to life, turning shared interests into real plans you can organize and enjoy together, right inside your Spaces.",
  heroImage: imgHero,
  heroImageAlt: "An Events screen: people gathered at a real-world meetup",
  // Bare app screen → phone frame that bleeds into the page (matches Spaces/Live Radar).
  heroFramed: true,
  // Apple-style sticky story carries the browse → decide → join flow.
  story: eventsStory,
  extraSections: <EventsExtras />,
  safety: {
    title: "Trusted by design",
    subtitle: "Events stay safe because the people running them have earned it.",
    items: [
      { kind: "protection", label: "Hosting is earned", desc: "You can only host once your trust score is high enough, built through real participation and successful meetups." },
      { kind: "control", label: "You choose visibility", desc: "Hosts decide who sees an event: everyone in the space, nearby only, or recommended members." },
      { kind: "support", label: "Real, accountable hosts", desc: "Because hosting is gated, the events you join are run by reliable members of the community." },
    ],
  },
  faqSubtitle: "Everything about Events",
  faq: [
    { q: "What kind of events can I find?", a: "Real-world plans that grow out of shared interests: reflective gatherings, outdoor adventures, creative meetups, networking and more. Every event has a time, a place, and the people who'll be there." },
    { q: "Who can create an event?", a: "Hosting is earned. You can create events once your trust score is high enough, built through real participation and successful meetups, so the events you join are run by reliable members of the community." },
    { q: "How do I join an event?", a: "Open it, see who's going and what's happening, and join in one tap. It's added to your plans and the event room opens so you can chat with who's coming." },
    { q: "Who gets to see an event I host?", a: "You choose: everyone in the space, nearby members only, or people it's recommended to. Visibility is always in the host's control." },
  ],
  // The sticky story replaces the alternating rows.
  rows: [],
};

export function EventsPage() {
  return <FeaturePage data={data} />;
}
