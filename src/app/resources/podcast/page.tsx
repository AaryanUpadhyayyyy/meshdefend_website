import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PodcastShelfClient } from "./components/PodcastShelfClient";
import "./podcast.css";

export const metadata: Metadata = {
  title: "The Resilience Ledger · Video Podcast | MeshDefend",
  description:
    "An interactive 3D video ledger of conversations on AI infrastructure, enterprise readiness, and what the industry is missing when it comes to true cyber resilience.",
  openGraph: {
    title: "The Resilience Ledger · Video Podcast | MeshDefend",
    description:
      "Conversations on AI infrastructure, autonomous backup operations, and continuous posture management.",
    siteName: "MeshDefend",
    images: [
      {
        url: "https://i.ytimg.com/vi/2A46u6gUETc/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "MeshDefend - The Resilience Ledger Video Podcast",
      },
    ],
  },
};

export default function PodcastPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PodcastShelfClient />
      </main>
      <Footer />
    </>
  );
}
