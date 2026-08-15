import { TermsPage } from "@/screens/legal/TermsPage";

export const metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of initiiator.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return <TermsPage />;
}
