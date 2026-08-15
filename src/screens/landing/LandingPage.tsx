import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { Problem } from "./sections/Problem";
import { RealLifeConnection } from "./sections/RealLifeConnection";
import { Community } from "./sections/Community";
import { Faq } from "./sections/Faq";
import { FinalCta } from "./sections/FinalCta";
import { LAUNCHED } from "@/lib/launch";

/**
 * Landing page. Each section is a self-contained component under ./sections/;
 * this file just orders them. To reorder or add a section, edit the list below.
 */
export default function LandingPage() {
  return (
    <div className="bg-[#f9f6f2] content-stretch flex flex-col items-stretch relative w-full" data-name="landing page redesign">
      <Navbar hideCtaAtTop={!LAUNCHED} />
      <Hero />
      <Problem />
      <RealLifeConnection />
      <Community />
      <Faq />
      <FinalCta />
    </div>
  );
}
