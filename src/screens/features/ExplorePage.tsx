import { FeaturePage, type FeaturePageData } from "./FeaturePage";
import { ExploreExtras } from "./_extras/ExploreExtras";
import { exploreStory } from "./_extras/stories/ExploreStory";
// Real Figma Explore screen (communities by interest) as the framed hero.
import imgHero from "@/assets/explore/interest.svg";

const data: FeaturePageData = {
  heading: [
    { text: "Find your people by" },
    { text: "what you love", highlight: true },
    { text: "not just who's nearby." },
  ],
  subtitle:
    "Explore helps you discover communities built around shared interests, from creativity to late-night conversations, so you find people who feel like your kind of people.",
  heroImage: imgHero,
  heroImageAlt: "Explore screen: communities grouped by interest",
  // Bare app screen → phone frame that bleeds into the page (matches Spaces/Events).
  heroFramed: true,
  // Apple-style sticky story carries the by-interest → browse → belong flow.
  story: exploreStory,
  extraSections: <ExploreExtras />,
  faqSubtitle: "Everything about Explore",
  faq: [
    { q: "How is Explore different from Spaces Around You?", a: "Spaces Around You form from people physically nearby, right now. Explore Spaces are global, always-on communities organized by interest. You join them and stay part of them, wherever you are." },
    { q: "How are communities organized?", a: "Into clear interest categories: Creativity, Networking, Learning, Lifestyle, Culture, Late Night. So you always know where you'll feel at home." },
    { q: "Do Explore Spaces ever expire?", a: "No. They're permanent places to belong. The conversation never resets, and you're part of it for as long as you want to be." },
    { q: "What happens inside a space I join?", a: "Conversations, events, and nearby activity all live together, so a shared passion turns into people you actually meet." },
  ],
  // The sticky story replaces the alternating rows.
  rows: [],
};

export function ExplorePage() {
  return <FeaturePage data={data} />;
}
