import { RecentEncountersPage } from "@/screens/features/RecentEncountersPage";

export const metadata = {
  title: "Recent Encounters",
  description:
    "Reconnect with people you recently crossed paths with. Recent Encounters keeps a 24-hour memory of who was nearby.",
  alternates: { canonical: "/features/recent-encounters" },
};

export default function Page() {
  return <RecentEncountersPage />;
}
