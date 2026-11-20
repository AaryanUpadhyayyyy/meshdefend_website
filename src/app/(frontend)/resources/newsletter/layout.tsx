import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What The Resilience - Weekly Newsletter | MeshDefend",
  description:
    "Join technical leaders receiving our weekly executive briefing on multi-vendor cyber recovery, RTO/RPO proof engineering, and agentic resilience.",
  openGraph: {
    title: "What The Resilience - Weekly Newsletter | MeshDefend",
    description:
      "Operational thinking, direct to your inbox. Weekly executive briefings for enterprise technical leaders.",
    siteName: "MeshDefend",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "MeshDefend - What The Resilience - Weekly Newsletter",
      },
    ],
  },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
