"use client";

import { type StickyStoryData } from "../../_story/StickyScrollStory";
import { makeScreenStoryDevice } from "../../_story/ScreenStoryDevice";
// Real Figma mobile screens — the discover → join → chat flow.
import screenDiscover from "@/assets/spaces/story-discover.svg";
import screenJoin from "@/assets/spaces/story-join.svg";
// The chat beat shows two screens (conversations list → open chat). Both are
// photo-heavy, so they're rasterised to WebP (the source SVGs embedded several
// MB of base64 images; the WebPs are ~65/97KB at 2× resolution, no visible loss).
import screenChatList from "@/assets/spaces/story-chat-a.webp";
import screenChatOpen from "@/assets/spaces/story-chat-b.webp";

export const spacesStory: StickyStoryData = {
  heading: "Discover, join, start chatting",
  device: makeScreenStoryDevice({
    discover: { src: screenDiscover.src, alt: "Explore Spaces: browse communities to join" },
    join: { src: screenJoin.src, alt: "Join a space around you" },
    // Two screens — they auto-cycle while this beat is active.
    chat: [
      { src: screenChatList.src, alt: "Conversations inside a space" },
      { src: screenChatOpen.src, alt: "An open conversation in a space" },
    ],
  }),
  beats: [
    {
      eyebrow: "01 · Discover",
      title: "See the spaces around you.",
      body: "Spaces Around You surface the communities forming nearby: real people with shared interests, right where you are. Browse what's alive and pick where you belong.",
      state: "discover",
    },
    {
      eyebrow: "02 · Join",
      title: "Step inside in one tap.",
      body: "Join a space and you're in: its events, its members, and everything happening right now. No empty rooms; you only ever join a space that's already real.",
      state: "join",
    },
    {
      eyebrow: "03 · Start chatting",
      title: "Talk, plan, and meet up.",
      body: "Inside the space, conversation keeps it buzzing and events surface right alongside it, turning shared interest into people you actually meet.",
      state: "chat",
    },
  ],
};
