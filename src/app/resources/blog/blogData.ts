export interface BlogPost {
  id: string;
  isFeatured: boolean;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorAvatar?: string;
  image: string;
  readTime?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    isFeatured: true,
    date: "Oct 12, 2026",
    category: "Cyber Resilience",
    title: "RTO vs. Reality: Why Immutable Backups Aren't Enough",
    excerpt:
      "A successful backup does not equal a successful recovery. We explore the critical gap between storage integrity and actual application readiness in modern hybrid environments.",
    authorName: "Tejas Pandit",
    image: "/images/blog-1.jpg", // Agent: Use a neutral gray #f3f1f1 box if missing
  },
  {
    id: "post-2",
    isFeatured: false,
    date: "Sep 28, 2026",
    category: "Engineering",
    title: "Agentic Operations: The End of Manual Runbooks",
    excerpt:
      "How Human-in-the-Loop (HITL) agentic workflows are replacing static recovery runbooks to reduce MTTR by up to 80%.",
    authorName: "Ravi Chitlur",
    image: "/images/blog-2.jpg",
  },
  {
    id: "post-3",
    isFeatured: false,
    date: "Sep 15, 2026",
    category: "Architecture",
    title: "Air-Gapped Telemetry: Secure Recovery Patterns",
    excerpt:
      "Maintaining continuous operational visibility without breaching physical network perimeters.",
    authorName: "Marcus Vane",
    image: "/images/blog-3.jpg",
  },
  {
    id: "post-4",
    isFeatured: false,
    date: "Sep 02, 2026",
    category: "Threat Intel",
    title: "When Patching Everything Stops Being a Strategy",
    excerpt:
      "Shifting from CVSS scores to quantified financial exposure for vulnerability management.",
    authorName: "Andrew Bayers",
    image: "/images/blog-4.jpg",
  },
];
