import { ContactPage } from "@/screens/contact/ContactPage";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with the initiiator team. Questions, feedback, or support. We'd love to hear from you.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactPage />;
}
