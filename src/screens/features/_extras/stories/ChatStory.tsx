"use client";

import { type StickyStoryData } from "../../_story/StickyScrollStory";
import { makeScreenStoryDevice } from "../../_story/ScreenStoryDevice";
// Real Figma Chat screens — the opens → talk → control flow. Photo-heavy
// (embedded avatars), so rasterised to WebP (~33–54KB vs 1.3–3.5MB SVGs).
import screenList from "@/assets/chat/list.webp";
import screenThread from "@/assets/chat/thread.webp";
import screenControls from "@/assets/chat/controls.webp";

export const chatStory: StickyStoryData = {
  heading: "A conversation that's earned, and yours to control",
  device: makeScreenStoryDevice({
    list: { src: screenList.src, alt: "Chat list: people who waved back, ready to talk" },
    thread: { src: screenThread.src, alt: "An open conversation with messages and voice notes" },
    controls: { src: screenControls.src, alt: "Per-chat controls: alerts, sharing, block, report and delete" },
  }),
  beats: [
    {
      eyebrow: "01 · It opens",
      title: "A chat only exists once it's mutual.",
      body: "Every conversation starts with a wave that was waved back. So your inbox isn't full of strangers, it's the people who actually chose to connect with you.",
      state: "list",
    },
    {
      eyebrow: "02 · You talk",
      title: "Real talk, no distance limit.",
      body: "Send messages and voice notes and let it grow at its own pace. Once a chat opens it leaves the 120m radar behind: across the street or across the city, it stays.",
      state: "thread",
    },
    {
      eyebrow: "03 · You're in control",
      title: "Every safety tool, one tap away.",
      body: "Mute alerts, hide read receipts, manage what you share, and block, report, or delete, all from a single menu inside the chat. Your conversation, your rules.",
      state: "controls",
    },
  ],
};
