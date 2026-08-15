import { PrivacySecurityPage } from "@/screens/features/PrivacySecurityPage";

export const metadata = {
  title: "Privacy & Security",
  description:
    "Meet people nearby, not your data. initiiator keeps you in control of your privacy and safety.",
  alternates: { canonical: "/privacy-security" },
};

export default function Page() {
  return <PrivacySecurityPage />;
}
