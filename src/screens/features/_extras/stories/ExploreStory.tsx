"use client";

import { type StickyStoryData } from "../../_story/StickyScrollStory";
import { makeScreenStoryDevice } from "../../_story/ScreenStoryDevice";
// Real Figma Explore screens — the by-interest → browse → belong flow.
import screenInterest from "@/assets/explore/interest.svg";
import screenBrowse from "@/assets/explore/browse.svg";
import screenJoined from "@/assets/explore/joined.svg";

export const exploreStory: StickyStoryData = {
  heading: "Find your people by what you love",
  device: makeScreenStoryDevice({
    interest: { src: screenInterest.src, alt: "Explore Spaces grouped by interest categories" },
    browse: { src: screenBrowse.src, alt: "Browsing communities within an interest" },
    belong: { src: screenJoined.src, alt: "Your active spaces: the communities you belong to" },
  }),
  beats: [
    {
      eyebrow: "01 · By interest",
      title: "Communities, organized around what you love.",
      body: "Explore groups spaces into clear interests: Creativity, Networking, Learning, Lifestyle, Culture, Late Night. So you always know where you'll feel at home.",
      state: "interest",
    },
    {
      eyebrow: "02 · Browse",
      title: "Permanent places to belong.",
      body: "Explore Spaces are global, always-on communities you can join and stay part of. The conversation never resets. You're in for as long as you want to be.",
      state: "browse",
    },
    {
      eyebrow: "03 · Belong",
      title: "Step into the ones that feel like you.",
      body: "Join a space and it's yours: its conversations, its events, its people. A shared passion becomes a community you actually show up for.",
      state: "belong",
    },
  ],
};
