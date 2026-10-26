import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm, ContactFormSkeleton } from "./components/ContactPageClient";
import "./contact.css";

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
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "MeshDefend - Autonomous Resilience Operations Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | MeshDefend",
    description:
      "We'd love to hear from you. Technical question, demo request, partnership or enterprise inquiry — our team typically responds within one business day.",
    images: ["/images/og-image.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="contact-page-wrap">
        <div className="contact-container">
          {/* Top Header Section - Server Rendered */}
          <div className="contact-header">
            <div className="contact-eyebrow">GET IN TOUCH</div>
            <h1 className="contact-title display">
              Contact <span className="contact-title-italic">Us</span>
            </h1>
          </div>

          {/* Main Form Card Shell - Server Rendered */}
          <div className="contact-grid">
            <div className="contact-main-card">
              <h2 className="contact-card-title display">Send us a message</h2>
              <p className="contact-card-subhead">
                We&apos;d love to hear from you. Our team typically responds within one business day.
              </p>

              {/* Only the client-side searchParams-reading form is wrapped in Suspense */}
              <Suspense fallback={<ContactFormSkeleton />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
