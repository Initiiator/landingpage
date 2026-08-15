import { SpacesPage } from "@/screens/features/SpacesPage";

export const metadata = {
  title: "Spaces",
  description:
    "Living communities built around shared interests and shared places.",
  alternates: { canonical: "/features/spaces" },
};

export default function Page() {
  return <SpacesPage />;
}
