import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PodcastClient } from "./components/PodcastClient";
import "./podcast.css";

export const metadata: Metadata = {
  title: "The Resilience Ledger · Video Podcast | MeshDefend",
  description:
    "Engineering dispatches on heterogeneous storage estates, automated recovery validation, and eliminating silent backup failures across enterprise infrastructure.",
  openGraph: {
    title: "The Resilience Ledger · Video Podcast | MeshDefend",
    description:
      "Engineering dispatches on heterogeneous storage estates, automated recovery validation, and eliminating silent backup failures across enterprise infrastructure.",
    siteName: "MeshDefend",
    images: [
      {
        url: "/images/yt-thumb-2A46u6gUETc.jpg",
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
        <PodcastClient />
      </main>
      <Footer />
    </>
  );
}
