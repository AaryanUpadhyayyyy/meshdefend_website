import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactPageClient } from "./components/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | MeshDefend",
  description:
    "We'd love to hear from you. Technical question, demo request, partnership or enterprise inquiry — our team typically responds within one business day.",
  openGraph: {
    title: "Contact Us | MeshDefend",
    description:
      "We'd love to hear from you. Technical question, demo request, partnership or enterprise inquiry — our team typically responds within one business day.",
    siteName: "MeshDefend",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | MeshDefend",
    description:
      "We'd love to hear from you. Technical question, demo request, partnership or enterprise inquiry — our team typically responds within one business day.",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <ContactPageClient />
      </main>
      <Footer />
    </>
  );
}
