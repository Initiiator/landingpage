import { WavePage } from "@/screens/features/WavePage";

export const metadata = {
  title: "Wave",
  description:
    "The lightest way to say hello. Send a wave to start a meaningful connection.",
  alternates: { canonical: "/features/wave" },
};

export default function Page() {
  return <WavePage />;
}
