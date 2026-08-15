"use client";

import { type StickyStoryData } from "../../_story/StickyScrollStory";
import { makeScreenStoryDevice } from "../../_story/ScreenStoryDevice";
// Real Figma Event screens — the discover → host → publish flow. Rasterised to
// WebP (~43–44KB each) from the source SVGs.
import screenDiscover from "@/assets/event-clean/discover.webp";
import screenHost from "@/assets/event-clean/host.webp";
import screenPublish from "@/assets/event-clean/publish.webp";

export const eventsStory: StickyStoryData = {
  heading: "Real plans, made and shared",
  device: makeScreenStoryDevice({
    discover: { src: screenDiscover.src, alt: "Upcoming Events across your spaces, each with a countdown" },
    host: { src: screenHost.src, alt: "Create Event: pick a category, settings, and headcount" },
    publish: { src: screenPublish.src, alt: "Event preview before publishing it to the community" },
  }),
  beats: [
    {
      eyebrow: "01 · Discover",
      title: "Real plans, right where your people are.",
      body: "Upcoming events appear across the Spaces you're in, each with a time, a place, and a countdown. The plans you discover come from the people and communities you're already connected to.",
      state: "discover",
    },
    {
      eyebrow: "02 · Host",
      title: "Turn an idea into a real-life moment.",
      body: "Set the vibe, choose who can see it (everyone in the space, nearby only, or recommended members), and pick how many people feels right. Hosting is earned, so every event has a reliable face behind it.",
      state: "host",
    },
    {
      eyebrow: "03 · Publish",
      title: "Preview it, publish it, fill the room.",
      body: "See exactly how your event will appear, then publish it to the community. People join, the energy builds, and a shared interest becomes a real gathering.",
      state: "publish",
    },
  ],
};
