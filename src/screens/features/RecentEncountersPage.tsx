import { FeaturePage, type FeaturePageData } from "./FeaturePage";
import { RecentEncountersExtras } from "./_extras/RecentEncountersExtras";
// Real Figma screens. The discover feed leads; profile + sent carry the rows.
import imgHero from "@/assets/wave/discover.webp";
import imgProfile from "@/assets/wave/profile.webp";
import imgSent from "@/assets/wave/sent.webp";

const data: FeaturePageData = {
  heading: [
    { text: "The people you" },
    { text: "almost met", highlight: true },
    { text: "are still within reach." },
  ],
  subtitle:
    "Recent Encounters remembers everyone who crossed your path in the last 24 hours, so a missed moment doesn't have to stay missed.",
  heroImage: imgHero,
  heroImageAlt: "Profile of someone you crossed paths with in the last 24 hours",
  // Bare app screen → phone frame that bleeds into the page (matches Spaces/Live Radar).
  heroFramed: true,
  // No sticky story: there are no real Recent Encounters screens (24h-timer list,
  // reconnect flow) to drive it, and we don't want a synthetic mockup standing in.
  // The extras + safety band carry the narrative instead, like the Live Radar page.
  extraSections: <RecentEncountersExtras />,
  safety: {
    title: "A light second chance, never a tracker",
    subtitle: "Recent Encounters is designed to fade, so it stays a gentle reminder, never a record of everyone you've passed.",
    items: [
      { kind: "protection", label: "Auto-deletes after 24h", desc: "Every encounter disappears on its own within a day. There's no growing history of who you've crossed paths with." },
      { kind: "control", label: "No alert until you act", desc: "People aren't notified that you saw them. Nothing happens unless you choose to Reconnect." },
      { kind: "support", label: "Reconnect stays mutual", desc: "A reconnect only becomes a chat if they accept. Same consent that protects every connection on initiiator." },
    ],
  },
  // Real-screen rows carry the narrative (no synthetic story). Same proven
  // pattern as the Live Radar page.
  rows: [
    {
      image: imgHero,
      imageAlt: "A feed of people who crossed your path",
      title: "Everyone you crossed paths with, held for a day.",
      body: "People who appeared on your radar but you never interacted with stay here for 24 hours, then they're gone. A gentle second chance while the moment is still fresh, not a growing log.",
      cta: "Learn more",
      ctaHref: "/features/live-radar",
      framed: true,
    },
    {
      image: imgProfile,
      imageAlt: "The profile of someone you almost met",
      title: "A missed moment, still within reach.",
      body: "Some people are worth finding twice. See who you nearly met, discover their interests and vibe, and reconnect while the moment is still fresh.",
      cta: "Learn more",
      ctaHref: "/features/wave",
      reverse: true,
      framed: true,
    },
    {
      image: imgSent,
      imageAlt: "Reaching out to reconnect",
      title: "Reconnect, and let it be mutual.",
      body: "A Reconnect is a simple way to say, \"We crossed paths, and I'd like to talk.\" If the feeling is mutual, the conversation begins. If not, the moment quietly passes after 24 hours.",
      cta: "Learn more",
      ctaHref: "/features/chat",
      framed: true,
    },
  ],
  faqSubtitle: "Everything about Recent Encounters",
  faq: [
    { q: "Who shows up in Recent Encounters?", a: "Everyone who crossed your path during the day but you never interacted with. They're held here for 24 hours as a gentle second chance, then they're gone." },
    { q: "How long do encounters last?", a: "Exactly 24 hours. Every encounter auto-deletes on its own within a day, so there's never a growing log of everyone you've passed, just what's still fresh." },
    { q: "Will someone know I looked at their profile?", a: "No. People aren't notified that you saw them. Nothing happens unless you choose to reconnect." },
    { q: "How is a reconnect different from a wave?", a: "It's reflection-based: a thoughtful 'we crossed paths and I'd like to talk,' sent after the moment rather than in it. If they accept, a chat opens; if not, it clears with everything else in 24 hours." },
  ],
};

export function RecentEncountersPage() {
  return <FeaturePage data={data} />;
}
