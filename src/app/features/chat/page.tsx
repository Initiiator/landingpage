import { ChatPage } from "@/screens/features/ChatPage";

export const metadata = {
  title: "Chat",
  description:
    "Once you connect, stay connected. Persistent conversations free from distance.",
  alternates: { canonical: "/features/chat" },
};

export default function Page() {
  return <ChatPage />;
}
