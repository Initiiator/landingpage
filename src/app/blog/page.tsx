import { BlogPage } from "@/screens/blog/BlogPage";

export const metadata = {
  title: "Blog",
  description:
    "Discover the stories behind meaningful connections: networking tips, community stories, and inspiration.",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  return <BlogPage />;
}
