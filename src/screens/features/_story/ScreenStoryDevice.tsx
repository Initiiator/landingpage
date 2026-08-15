import { ScreenStoryFrame } from "./ScreenStoryFrame";

/* ════════════════════════════════════════════════════════════════════════
   SCREEN STORY DEVICE  (server-safe factory)
   Shared phone-mockup for any sticky story driven by real app screenshots.

   Most stories show one full screen per beat and cross-fade between them as the
   reader scrolls. Some beats hold *several* screens that auto-cycle while that
   beat is active (e.g. a conversations list → an open chat). This factory turns
   a beat-key → screen(s) map into the `device` component a StickyStory expects.

   The factory is a plain (server-safe) function; the interactive rendering lives
   in ScreenStoryFrame (a client component). Story files can therefore stay
   server modules and call this at module top-level.
   ════════════════════════════════════════════════════════════════════════ */

export type Screen = { src: string; alt: string };
/** beat key → the screen (or sequence of screens) shown for that beat */
export type ScreenMap = Record<string, Screen | Screen[]>;

/** Build the `device` component for a screen-driven story from its screen map.
    Beat order is taken from the map's key order. */
export function makeScreenStoryDevice(screens: ScreenMap) {
  function ScreenStoryDevice({ state }: { state: string }) {
    return <ScreenStoryFrame screens={screens} state={state} />;
  }
  return ScreenStoryDevice;
}
