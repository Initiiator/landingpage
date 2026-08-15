import { WaitlistPage } from "@/screens/waitlist/WaitlistPage";

export const metadata = {
  title: "Join the waitlist",
  description:
    "initiiator is launching soon. Join the waitlist to be first when real, nearby connection opens in your city.",
  alternates: { canonical: "/waitlist" },
};

export default function Page() {
  return <WaitlistPage />;
}
