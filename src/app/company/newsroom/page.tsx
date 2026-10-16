import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NewsroomClient } from "./components/NewsroomClient";
import "./newsroom.css";

export const metadata: Metadata = {
  title: "Newsroom & Dispatches | MeshDefend",
  description:
    "Official coverage, funding announcements, and media dispatches for MeshDefend — AI-native enterprise operations layer for backup, recovery, and resilience.",
  openGraph: {
    title: "Newsroom & Dispatches | MeshDefend",
    description:
      "MeshDefend secures $2.3M in round led by Kalaari Capital. Explore official media coverage and press dispatches.",
    siteName: "MeshDefend",
    images: [
      {
        url: "/images/news-et-kalaari.jpg",
        width: 1200,
        height: 675,
        alt: "MeshDefend in The Economic Times - $2.3M Funding Round",
      },
    ],
  },
};

export default function NewsroomPage() {
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
