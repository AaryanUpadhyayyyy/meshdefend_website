import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaqClient } from "./components/FaqClient";

export const metadata: Metadata = {
  title: "Architecture & Security FAQ | MeshDefend",
  description:
    "Authoritative answers on multi-vendor backup integration, agent mesh security boundaries, sovereign air-gap operations, model privacy, and automated cleanroom recovery verification.",
  openGraph: {
    title: "Architecture & Security FAQ | MeshDefend",
    description:
      "Authoritative answers on multi-vendor backup integration, agent mesh security boundaries, sovereign air-gap operations, and automated recovery verification.",
    siteName: "MeshDefend",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "MeshDefend - FAQ",
      },
    ],
  },
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main id="main" style={{ minHeight: "85vh", backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <FaqClient />
      </main>
      <Footer />
    </>
  );
}
