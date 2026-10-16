import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NewsletterClient } from "./NewsletterClient";

export const metadata: Metadata = {
  title: "The Resilience Memo · Quarterly Newsletter | MeshDefend",
  description:
    "Subscribe to The Resilience Memo — quarterly architectural briefings, enterprise cyber resilience findings, and operational dispatches from MeshDefend.",
  openGraph: {
    title: "The Resilience Memo · Quarterly Newsletter | MeshDefend",
    description:
      "Quarterly architectural briefings and operational dispatches. Zero marketing noise.",
    siteName: "MeshDefend",
  },
};

export default function NewsletterPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <NewsletterClient />
      </main>
      <Footer />
    </>
  );
}
