import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NewsroomClient } from "../../company/newsroom/components/NewsroomClient";
import "../../company/newsroom/newsroom.css";

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
        <NewsroomClient />
      </main>
      <Footer />
    </>
  );
}
