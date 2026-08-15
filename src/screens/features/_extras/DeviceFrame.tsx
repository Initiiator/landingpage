"use client";

/* ════════════════════════════════════════════════════════════════════════
   DEVICE FRAME
   Phone-bezel wrapper so any screen (synthetic scene or real screenshot) reads
   as an intentional in-device mockup. Children fill the screen area.

   Proportions follow the real iPhone 15 Pro (393×852pt screen):
   • screen aspect 9/19.5  • screen corner radius 55pt ≈ 14% width
   • uniform hardware bezel ≈ 3% width
   • outer (bezel) radius = screen radius + bezel, so corners stay concentric
   • Dynamic Island 125×37pt, 11pt from top → 31.8% × 4.3%, 1.3% top
   Sizes use `cqw` (container-query width units) so every length tracks the
   device width and corners stay true circular arcs — a single `%` radius would
   go egg-shaped on a tall element.
   ════════════════════════════════════════════════════════════════════════ */

export function DeviceFrame({
  children,
  className,
  bare = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** When the child is a real full-screen screenshot that already includes its
      own background + status bar — drop the cream fill so the screenshot fills
      the screen edge-to-edge. (The Dynamic Island is still drawn on top, since
      the screens omit it.) */
  bare?: boolean;
}) {
  return (
    <div className={`[container-type:inline-size] relative aspect-[9/19.5] w-[clamp(200px,55vw,300px)] ${className ?? ""}`}>
      {/* bezel — thin, uniform; radius = screen radius + bezel width */}
      <div className="absolute inset-0 rounded-[17cqw] bg-[#1a1a1a] p-[3cqw] shadow-[0_30px_60px_-20px_rgba(26,26,26,0.45)]">
        {/* screen — corner radius 14% of width */}
        <div className={`relative h-full w-full overflow-hidden rounded-[14cqw] ${bare ? "bg-[#171719]" : "bg-[#f9f6f2]"}`}>
          {children}
          {/* Dynamic Island — drawn on top of all screen content. */}
          <span className="absolute left-1/2 top-[1.3%] z-20 h-[4.3%] w-[31.8%] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}
