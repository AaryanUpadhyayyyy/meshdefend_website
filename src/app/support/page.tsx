import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SupportPageClient } from "./components/SupportPageClient";

export const metadata: Metadata = {
  title: "Support | MeshDefend",
  description:
    "Technical question, demo request, partnership or something else? Reach the MeshDefend team and we will point it to the right team.",
  openGraph: {
    title: "Support | MeshDefend",
    description:
      "Technical question, demo request, partnership or something else? Tell us what you need and we will point it to the right team.",
    siteName: "MeshDefend",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support | MeshDefend",
    description:
      "Technical question, demo request, partnership or something else? Tell us what you need and we will point it to the right team.",
  },
};

export default function SupportPage() {
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
