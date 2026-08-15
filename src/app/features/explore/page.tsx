import { ExplorePage } from "@/screens/features/ExplorePage";

export const metadata = {
  title: "Explore",
  description:
    "Discover interest-based communities and step into the spaces that feel like you.",
  alternates: { canonical: "/features/explore" },
};

export default function Page() {
  return <ExplorePage />;
}
