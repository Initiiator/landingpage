import { LegalPage, type LegalPageData } from "./LegalPage";

const data: LegalPageData = {
  title: "Terms Of Service",
  dateLabel: "Effective Date: August 15, 2026",
  sections: [
    {
      heading: "Agreement to Terms",
      blocks: [
        {
          type: "paragraph",
          text: [
            "By accessing or using the initiiator app, website, and related services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.",
          ],
        },
      ],
    },
    {
      heading: "Eligibility",
      blocks: [
        {
          type: "paragraph",
          text: [
            "You must be at least 18 years old to use the Service. By using the Service, you represent and warrant that you are 18 years of age or older, and you have the legal capacity to enter into a binding contract under applicable law.",
          ],
        },
      ],
    },
    {
      heading: "Proximity Features and Safety",
      blocks: [
        {
          type: "paragraph",
          text: [
            "initiiator is designed to facilitate real-world, in-person meetups. When you use the Service, you acknowledge that:",
          ],
        },
        {
          type: "definitions",
          items: [
            {
              term: "Safety is your responsibility:",
              desc: [
                "You agree to exercise caution and common sense when interacting with people you meet through initiiator. Always meet in public places and trust your instincts.",
              ],
            },
            {
              term: "Location sharing:",
              desc: [
                "By using the app, you consent to sharing your approximate location (within a 120-meter radius) with nearby users.",
              ],
            },
          ],
        },
      ],
    },
    {
      heading: "Acceptable Use Policy",
      blocks: [
        { type: "paragraph", text: ["You agree not to use the Service to:"] },
        {
          type: "list",
          items: [
            "Harass, abuse, or harm another person",
            "Impersonate any person or entity",
            "Upload or transmit content that is illegal, defamatory, obscene, or threatening",
            "Use the app for commercial purposes without our prior written consent",
            "Attempt to bypass or break any security mechanism on the platform",
          ],
        },
        {
          type: "paragraph",
          text: [
            "We reserve the right to ban any user who violates these terms, immediately and without prior notice.",
          ],
        },
      ],
    },
    {
      heading: "Intellectual Property",
      blocks: [
        {
          type: "paragraph",
          text: [
            "The Service and its original content, features, and functionality are and will remain the exclusive property of initiiator and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.",
          ],
        },
      ],
    },
    {
      heading: "Changes to Terms",
      blocks: [
        {
          type: "paragraph",
          text: [
            "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
          ],
        },
      ],
    },
  ],
};

export function TermsPage() {
  return <LegalPage data={data} />;
}
