import { CommunityGuidelinesPage } from "@/screens/community/CommunityGuidelinesPage";

export const metadata = {
  title: "Community Guidelines",
  description:
    "Building a community rooted in respect and trust. The guidelines that keep initiiator safe and welcoming.",
  alternates: { canonical: "/community-guidelines" },
};

export default function Page() {
  return <CommunityGuidelinesPage />;
}
