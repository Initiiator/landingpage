import { FeaturePage, type FeaturePageData } from "./FeaturePage";
import { MeetNowExtras } from "./_extras/MeetNowExtras";
import { meetNowStory } from "./_extras/stories/MeetNowStory";
// Real Figma Meet Now screen (the shared map) as the framed hero.
import imgHero from "@/assets/meetnow/place.webp";

const data: FeaturePageData = {
  heading: [
    { text: "From chatting to" },
    { text: "actually meeting", highlight: true },
    { text: "." },
  ],
  subtitle:
    "Meet Now helps you move from conversation to connection, making real-life meetups simple and comfortable.",
  heroImage: imgHero,
  heroImageAlt: "Meet Now: a shared map suggesting a public place to meet",
  // Bare app screen → phone frame that bleeds into the page (matches Spaces/Events).
  heroFramed: true,
  // Sticky story carries the agree → place → confirm flow.
  story: meetNowStory,
  extraSections: <MeetNowExtras />,
  safety: {
    title: "Designed for Safer Meetups",
    subtitle: "Every part of Meet Now is built so meeting offline feels comfortable, safe, and always on your terms.",
    items: [
      { kind: "protection", label: "Location auto-expires", desc: "Live location always ends on its own. You're never sharing a second longer than the window you picked." },
      { kind: "control", label: "You set the window", desc: "15 minutes to four hours. Meeting is always mutual and optional. Trigger it yourself or skip it entirely." },
      { kind: "support", label: "Safe, public places", desc: "Suggestions are cafés, parks, and lounges pulled live from the map: open, public spots for a first meet." },
    ],
  },
  faqSubtitle: "Everything about Meet Now",
  faq: [
    { q: "What does Meet Now do?", a: "It turns a good conversation into a real one. When you both want to meet, Meet Now helps you agree on a public place and find your way there, so going from screen to face-to-face is simple and safe." },
    { q: "How is the meeting spot chosen?", a: "A shared map suggests open, public spots (cafés, parks, lounges) pulled live from the area between you both. You pick somewhere comfortable, together." },
    { q: "Is my live location shared the whole time?", a: "No. Live location is shared only for the meet, on a window you set (from 15 minutes up to a few hours), and it always ends on its own. You're never sharing a second longer than you chose." },
    { q: "Do I have to use it?", a: "Never. Meeting is always mutual and optional. You trigger it yourself when it feels right, or skip it entirely." },
  ],
  // The sticky story replaces the alternating rows.
  rows: [],
};

export function MeetNowPage() {
  return <FeaturePage data={data} />;
}
