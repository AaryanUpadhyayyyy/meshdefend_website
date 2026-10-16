import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekly Resilience Brief | MeshDefend",
  description:
    "Join technical leaders receiving our weekly executive briefing on multi-vendor cyber recovery, RTO/RPO proof engineering, and agentic resilience.",
  openGraph: {
    title: "Weekly Resilience Brief | MeshDefend",
    description:
      "Operational thinking, direct to your inbox. Weekly executive briefings for enterprise technical leaders.",
    siteName: "MeshDefend",
  },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
