import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InvestorsPartnersClient } from "./components/InvestorsPartnersClient";
import "./investors-partners.css";

export const metadata: Metadata = {
  title: "Investors & Strategic Alliances | MeshDefend",
  description:
    "MeshDefend is backed by Kalaari Capital and Kettleborough VC. Architecturally integrated across leading cloud runtimes, storage platforms, and enterprise recovery fabrics.",
  openGraph: {
    title: "Investors & Strategic Alliances | MeshDefend",
    description:
      "Backed by Kalaari Capital and Kettleborough VC. Learn about our institutional backing and certified enterprise partner ecosystem.",
    siteName: "MeshDefend",
    images: [
      {
        url: "/images/investors-topology-art.jpg",
        width: 1200,
        height: 675,
        alt: "MeshDefend Strategic Alliance Topology",
      },
    ],
  },
};

export default function InvestorsPartnersPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="investors-partners-page">
        <InvestorsPartnersClient />
      </main>
      <Footer />
    </>
  );
}
