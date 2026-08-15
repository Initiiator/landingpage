import type { Metadata } from "next";
import "@/styles/index.css";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "initiiator: real connections, nearby",
    // Per-page titles render as "Spaces | initiiator", etc.
    template: "%s | initiiator",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "initiiator",
    "meet people nearby",
    "real-world connections",
    "make friends nearby",
    "local community app",
    "in-person social app",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "initiiator: real connections, nearby",
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "initiiator: real connections, nearby",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Organization structured data — helps search engines tie the brand, logo and
  // social profiles together for richer results.
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/icon.png`,
  };

  return (
    <html lang="en">
      {/* overflow-x: clip (not hidden) prevents horizontal scroll WITHOUT making
          <body> a scroll container — so position: sticky keeps working. */}
      <body className="w-full [overflow-x:clip] scroll-smooth">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
