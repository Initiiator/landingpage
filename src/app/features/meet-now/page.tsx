import { MeetNowPage } from "@/screens/features/MeetNowPage";

export const metadata = {
  title: "Meet Now",
  description:
    "Go from chatting to actually meeting, safely and on your terms.",
  alternates: { canonical: "/features/meet-now" },
};

export default function Page() {
  return <MeetNowPage />;
}
