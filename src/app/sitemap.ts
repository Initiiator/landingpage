import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** All public routes, with rough priorities. Next serves this at /sitemap.xml. */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/waitlist", priority: 0.9, changeFrequency: "monthly" },
  { path: "/features/live-radar", priority: 0.8, changeFrequency: "monthly" },
  { path: "/features/wave", priority: 0.8, changeFrequency: "monthly" },
  { path: "/features/spaces", priority: 0.8, changeFrequency: "monthly" },
  { path: "/features/events", priority: 0.8, changeFrequency: "monthly" },
  { path: "/features/chat", priority: 0.8, changeFrequency: "monthly" },
  { path: "/features/meet-now", priority: 0.8, changeFrequency: "monthly" },
  { path: "/features/explore", priority: 0.8, changeFrequency: "monthly" },
  { path: "/features/recent-encounters", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy-security", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.5, changeFrequency: "weekly" },
  { path: "/community-guidelines", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
