import { EventsPage } from "@/screens/features/EventsPage";

export const metadata = {
  title: "Events",
  description:
    "Turn shared interests into real plans, real people, real places.",
  alternates: { canonical: "/features/events" },
};

export default function Page() {
  return <EventsPage />;
}
