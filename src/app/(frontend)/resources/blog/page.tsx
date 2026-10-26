import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlogClient } from "./components/BlogClient";
import { BLOG_POSTS } from "./blogData";
import "./blog.css";

export { BLOG_POSTS };

export const metadata: Metadata = {
  title: "Architectural Dispatches & Engineering Research | MeshDefend",
  description:
    "Unfiltered technical dispatches on multi-cloud recovery posture, air-gapped operations, and autonomous agentic resilience. Written by the systems architects at MeshDefend.",
  openGraph: {
    title: "Architectural Dispatches & Research | MeshDefend",
    description:
      "Engineering truth on recovery, runbooks, and cyber resilience across heterogeneous enterprise backup estates.",
    siteName: "MeshDefend",
    images: [
      {
        url: "/images/blog-1.jpg",
        width: 1200,
        height: 675,
        alt: "MeshDefend Architectural Dispatches",
      },
    ],
  },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="blog-page">
        <BlogClient />
      </main>
      <Footer />
    </>
  );
}
