import { FeaturePage, type FeaturePageData } from "./FeaturePage";
import { RadarOverlay, RadarExtras } from "./_radar/RadarExtras";
import imgHero from "@/assets/features/radar-phone.webp";
import imgThreePhones from "@/assets/features/3phones.webp";
import imgBreakTheIce from "@/assets/features/breaktheice.webp";
import imgConnections from "@/assets/features/connections.webp";

const data: FeaturePageData = {
  heading: [
    { text: "Discover people" },
    { text: "nearby", highlight: true },
    { text: "who actually match your vibe." },
  ],
  subtitle:
    "Live Radar helps you find compatible people around you while keeping your privacy protected.",
  heroImage: imgHero,
  heroImageAlt: "initiiator Discover radar screen showing nearby people",
  heroOverlay: <RadarOverlay />,
  extraSections: <RadarExtras />,
  rows: [
    {
      image: imgThreePhones,
      imageAlt: "Profiles revealing interests and personality",
      title: "Meet people beyond a profile picture.",
      body: "Live Radar reveals the interests, personality, and passions behind every profile, helping you discover people you'll genuinely enjoy connecting with.",
      cta: "Learn more",
      ctaHref: "/features/explore",
    },
    {
      image: imgBreakTheIce,
      imageAlt: "Sending a wave to break the ice",
      title: "Break the ice naturally.",
      body: "A simple wave is all it takes to express interest. No pressure, no awkward introductions, just a thoughtful way to start meaningful connections.",
      cta: "Learn more",
      ctaHref: "/features/wave",
      reverse: true,
    },
    {
      image: imgConnections,
      imageAlt: "Mutual wave turning into a connection",
      title: "Connections happen when interest goes both ways.",
      body: "When someone waves back, the conversation can begin. Mutual interest creates the foundation for more authentic and rewarding relationships.",
      cta: "Learn more",
      ctaHref: "/features/chat",
    },
  ],
  faqSubtitle: "Everything about Live Radar",
  faq: [
    { q: "How does Live Radar find people?", a: "It surfaces compatible people within about 120m of you (real, present, nearby) and reveals the interests and personality behind every profile, so you discover people you'll genuinely enjoy meeting." },
    { q: "Is my exact location shared?", a: "No. Live Radar is about proximity, not pinpoints. It shows that someone compatible is near you. It doesn't broadcast your precise position or track you." },
    { q: "How do I reach out to someone?", a: "Send a wave. It's a simple, low-pressure way to express interest. If they wave back, a conversation opens. Mutual interest is what starts every connection." },
    { q: "Will I see the same people over and over?", a: "Live Radar reflects who's actually around you now, so it changes as you and the people near you move through the day." },
  ],
};

export function LiveRadarPage() {
  return <FeaturePage data={data} />;
}
