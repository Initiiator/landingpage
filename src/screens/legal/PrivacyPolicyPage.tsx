import { LegalPage, type LegalPageData } from "./LegalPage";

const data: LegalPageData = {
  title: "Privacy Policy",
  dateLabel: "Last updated: August 15, 2026",
  sections: [
    {
      heading: "Introduction",
      blocks: [
        {
          type: "paragraph",
          text: [
            "Welcome to initiiator. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our application and use our proximity-based services. Please read this privacy policy carefully.",
          ],
        },
      ],
    },
    {
      heading: "Location Data",
      blocks: [
        {
          type: "paragraph",
          text: [
            'Because initiiator relies on proximity to function, we collect real-time location data from your device. This data is essential for our "Proximity Radar" feature. Your exact location is never displayed to other users; instead, we only show distance and relative positioning within a 120-meter radius. Location data is strictly ephemeral and is not permanently stored on our servers once you end a session.',
          ],
        },
      ],
    },
    {
      heading: "Data Collection",
      blocks: [
        {
          type: "definitions",
          items: [
            {
              term: "Personal Data:",
              desc: ["Demographics, name, email address, and profile picture that you provide when registering."],
            },
            {
              term: "Usage Data:",
              desc: ["Information on how you interact with our app, including waves sent, chats initiated, and meetups proposed."],
            },
            {
              term: "Chat Data:",
              desc: ["Messages are end-to-end encrypted and ephemeral. They are permanently deleted from our servers once the chat window expires or a meetup concludes."],
            },
          ],
        },
      ],
    },
    {
      heading: "Sharing Your Information",
      blocks: [
        {
          type: "paragraph",
          text: [
            "We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners.",
          ],
        },
      ],
    },
    {
      heading: "Security",
      blocks: [
        {
          type: "paragraph",
          text: [
            "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.",
          ],
        },
      ],
    },
    {
      heading: "Contact Us",
      blocks: [
        {
          type: "paragraph",
          text: [
            "If you have questions or comments about this Privacy Policy, please contact us at: ",
            { bold: "privacy@initiiator.com" },
          ],
        },
      ],
    },
  ],
};

export function PrivacyPolicyPage() {
  return <LegalPage data={data} />;
}
