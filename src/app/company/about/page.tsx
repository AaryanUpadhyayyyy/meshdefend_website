import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutClient } from "./components/AboutClient";
import "./about.css";

export const metadata: Metadata = {
  title: "About Us & Founding Origins | MeshDefend",
  description:
    "MeshDefend is the autonomous enterprise operations layer for backup, recovery, and continuous cyber resilience. Founded by former Dell infrastructure leaders and funded by Kalaari Capital.",
  openGraph: {
    title: "About Us & Founding Origins | MeshDefend",
    description:
      "MeshDefend is the autonomous enterprise operations layer for backup, recovery, and continuous cyber resilience. Founded by former Dell infrastructure leaders.",
    siteName: "MeshDefend",
    images: [
      {
        url: "/images/about-foundry-hero.jpg",
        width: 1200,
        height: 675,
        alt: "MeshDefend Engineering Foundry",
      },
    ],
  },
};

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="about-page">
        <AboutClient />
      </main>
      <Footer />
    </>
  );
}
