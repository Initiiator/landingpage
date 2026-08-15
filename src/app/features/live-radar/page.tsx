import { LiveRadarPage } from "@/screens/features/LiveRadarPage";

export const metadata = {
  title: "Live Radar",
  description:
    "Live Radar helps you find compatible people around you while keeping your privacy protected.",
  alternates: { canonical: "/features/live-radar" },
};

export default function Page() {
  return <LiveRadarPage />;
}
