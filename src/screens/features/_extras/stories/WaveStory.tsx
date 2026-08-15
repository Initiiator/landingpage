"use client";

import { type StickyStoryData } from "../../_story/StickyScrollStory";
import { makeScreenStoryDevice } from "../../_story/ScreenStoryDevice";
// Real Figma Wave screens — the see → wave → sent flow. Photo-heavy, so
// rasterised to WebP (~84–93KB vs the ~3.5MB source SVGs).
import screenDiscover from "@/assets/wave/discover.webp";
import screenProfile from "@/assets/wave/profile.webp";
import screenSent from "@/assets/wave/sent.webp";

export const waveStory: StickyStoryData = {
  heading: "How a wave becomes a conversation",
  device: makeScreenStoryDevice({
    see: { src: screenDiscover.src, alt: "Discover feed: someone nearby you can wave at" },
    wave: { src: screenProfile.src, alt: "A person's profile with a Wave button" },
    sent: { src: screenSent.src, alt: "A wave sent, with the confirmation popup" },
  }),
  beats: [
    {
      eyebrow: "01 · See someone",
      title: "Someone catches your eye.",
      body: "Browsing who's nearby, a profile stands out. Shared interests, the same energy, and enough to turn a simple hello into the start of a conversation.",
      state: "see",
    },
    {
      eyebrow: "02 · Wave",
      title: "One tap to say hello.",
      body: "A Wave is the easiest way to show genuine interest. You only get one per person, so every Wave is a deliberate first move.",
      state: "wave",
    },
    {
      eyebrow: "03 · Sent",
      title: "It lands gently, never spammy.",
      body: "Your wave appears in their activity. No pushy notifications. If they wave back, the chat begins. That shared 'yes' is what makes every connection here feel real.",
      state: "sent",
    },
  ],
};
