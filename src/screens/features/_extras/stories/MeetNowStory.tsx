"use client";

import { type StickyStoryData } from "../../_story/StickyScrollStory";
import { makeScreenStoryDevice } from "../../_story/ScreenStoryDevice";
// Real Figma Meet Now screens — the agree → place → confirm flow. Photo/map
// heavy, so rasterised to WebP (~44–57KB vs the 2.7–5MB source SVGs).
import screenAgree from "@/assets/meetnow/agree.webp";
import screenPlace from "@/assets/meetnow/place.webp";
import screenConfirm from "@/assets/meetnow/confirm.webp";

export const meetNowStory: StickyStoryData = {
  heading: "From a chat to a real-world meetup",
  device: makeScreenStoryDevice({
    agree: { src: screenAgree.src, alt: "A chat where two people agree to meet up now" },
    place: { src: screenPlace.src, alt: "A shared map suggesting a public place to meet" },
    confirm: { src: screenConfirm.src, alt: "Confirming the meetup point and route on the map" },
  }),
  beats: [
    {
      eyebrow: "01 · Agree",
      title: "It starts the moment you both say yes.",
      body: "A conversation is going well and someone asks to meet. Meet Now turns that 'we should hang out' into a plan you can make together.",
      state: "agree",
    },
    {
      eyebrow: "02 · Pick a place",
      title: "A shared map finds the middle ground.",
      body: "Meet Now suggests public spots (cafés, parks, lounges) pulled live from the map between you both. You pick somewhere open and comfortable, together.",
      state: "place",
    },
    {
      eyebrow: "03 · Confirm & go",
      title: "Agree, and your route is set.",
      body: "Both of you confirm the meetup point and live location is shared only for the meet, on a window you set, ending on its own. Screen to face-to-face, safely and on your terms.",
      state: "confirm",
    },
  ],
};
