import LandingPage from "@/screens/landing/LandingPage";
import { FAQ_DATA } from "@/screens/landing/data";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

/**
 * Structured data for the landing page.
 *
 * FAQPage makes the questions in the FAQ section eligible for the expandable
 * FAQ rich result in Google, which is worth real SERP real estate — it's the
 * same copy that already renders in the accordion, so there's nothing to keep
 * in sync beyond FAQ_DATA itself. WebSite adds the sitelinks search-ready
 * identity alongside the Organization block in the root layout.
 *
 * This page is a server component, so the JSON-LD is in the initial HTML where
 * crawlers will see it without executing anything.
 */
function jsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_DATA.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
    },
  ];
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <LandingPage />
    </>
  );
}
