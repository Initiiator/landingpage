import { AboutPage } from "@/screens/about/AboutPage";

export const metadata = {
  title: "About",
  description:
    "Creating the path to meaningful connections. Learn about initiiator's mission to reconnect people in the real world.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutPage />;
}
