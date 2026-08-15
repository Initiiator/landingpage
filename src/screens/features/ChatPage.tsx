import { FeaturePage, type FeaturePageData } from "./FeaturePage";
import { ChatExtras } from "./_extras/ChatExtras";
import { chatStory } from "./_extras/stories/ChatStory";
// Real Figma Chat screen (an open conversation) as the framed hero.
import imgHero from "@/assets/chat/thread.webp";

const data: FeaturePageData = {
  heading: [
    { text: "Once you connect," },
    { text: "stay connected", highlight: true },
    { text: "." },
  ],
  subtitle:
    "When a Wave is accepted, your conversation is yours to keep. You're no longer limited by distance or the radar, giving your connection the space to grow naturally.",
  heroImage: imgHero,
  heroImageAlt: "An open conversation between two people who matched",
  // Bare app screen → phone frame that bleeds into the page (matches Spaces/Events).
  heroFramed: true,
  // Apple-style sticky story carries the opens → talk → control flow.
  story: chatStory,
  extraSections: <ChatExtras />,
  safety: {
    title: "Your conversation, your rules",
    subtitle: "Every chat keeps its safety tools one tap away in a single three-dot menu.",
    items: [
      { kind: "protection", label: "Private by default", desc: "A chat only exists after a mutual wave. No one can message you off a one-sided interaction." },
      { kind: "control", label: "Search, clear or delete", desc: "Find anything you mentioned, tidy a thread, or remove it entirely. Your history is yours to manage." },
      { kind: "support", label: "Block & report anytime", desc: "Block someone instantly and quietly, or report bad behavior, always a single tap away." },
    ],
  },
  faqSubtitle: "Everything about Chat",
  faq: [
    { q: "When does a chat open?", a: "Only after a mutual wave. A conversation can't exist off a one-sided interaction, so no one messages you unless you both said yes." },
    { q: "Does the chat end when we leave the area?", a: "No. Once a chat is created it leaves the 120m radar behind. Whether you're across the street or across the city, the conversation stays." },
    { q: "Is chat text-only?", a: "Text and voice notes both. Chat is built for real conversation that grows at its own pace, not endless scrolling." },
    { q: "What safety controls do I have?", a: "Everything's a tap away inside the chat: mute alerts, hide read receipts, manage what you share, search your history, and block, report, or delete. Your conversation, your rules." },
  ],
  // The sticky story replaces the alternating rows.
  rows: [],
};

export function ChatPage() {
  return <FeaturePage data={data} />;
}
