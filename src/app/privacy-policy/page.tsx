import { PrivacyPolicyPage } from "@/screens/legal/PrivacyPolicyPage";

export const metadata = {
  title: "Privacy Policy",
  description: "How initiiator collects, uses, and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
