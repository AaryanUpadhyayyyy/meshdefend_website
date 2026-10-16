import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SupportPageClient } from "./components/SupportPageClient";

export const metadata: Metadata = {
  title: "Contact Us | MeshDefend",
  description:
    "Technical question, demo request, partnership or enterprise inquiry? Reach the MeshDefend team and we will point it to the right department.",
  openGraph: {
    title: "Contact Us | MeshDefend",
    description:
      "Technical question, demo request, partnership or enterprise inquiry? Tell us what you need and we will point it to the right department.",
    siteName: "MeshDefend",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | MeshDefend",
    description:
      "Technical question, demo request, partnership or enterprise inquiry? Tell us what you need and we will point it to the right department.",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <SupportPageClient />
      </main>
      <Footer />
    </>
  );
}
