import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CareersClient } from "./components/CareersClient";
import "./careers.css";

export const metadata: Metadata = {
  title: "Careers & Engineering Culture | MeshDefend",
  description:
    "Join the team building the autonomous operations engine for enterprise data resilience. Explore open engineering, infrastructure, and go-to-market roles in Bengaluru and remote.",
  openGraph: {
    title: "Careers & Engineering Culture | MeshDefend",
    description:
      "Join the team building the autonomous operations engine for enterprise data resilience. Explore open engineering, infrastructure, and go-to-market roles.",
    siteName: "MeshDefend",
    images: [
      {
        url: "/images/careers-lab-studio.jpg",
        width: 1200,
        height: 675,
        alt: "MeshDefend Systems Engineering Studio",
      },
    ],
  },
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="careers-page">
        <CareersClient />
      </main>
      <Footer />
    </>
  );
}
