export interface NewsArticle {
  id: string;
  date: string;
  publication: string;
  title: string;
  excerpt: string;
  url: string;
  image: string;
  spreadImage: string;
  author?: string;
  category?: string;
  readTime?: string;
  highlights?: string[];
  spreadIndex?: number;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "kalaari-funding-et",
    date: "Oct 2026",
    publication: "The Economic Times",
    title:
      "AI enterprise ops startup MeshDefend raises $2.3 million in round led by Kalaari Capital",
    excerpt:
      "MeshDefend has secured its maiden funding round to scale its Agent Mesh technology and expand its enterprise resilience operations center.",
    url: "https://economictimes.indiatimes.com/tech/funding/ai-enterprise-ops-startup-meshdefend-raises-2-3-million-in-round-led-by-kalaari-capital/articleshow/125111852.cms",
    image: "/images/news-et-kalaari.jpg",
    spreadImage: "/images/spread-news-et.png",
    author: "Tanishka Dubey, ETtech",
    category: "Funding & Milestones",
    readTime: "3 min read",
    highlights: [
      "USD 2.3 Million seed funding round led by Kalaari Capital",
      "Scaling Agent Mesh™ autonomous resilience operations engine",
      "Accelerating enterprise infrastructure readiness & GTM execution",
    ],
    spreadIndex: 0,
  },
  {
    id: "maiden-funding-bw",
    date: "Oct 2026",
    publication: "BW Disrupt",
    title: "MeshDefend Raises $2.3 Mn In Its Maiden External Funding Round",
    excerpt:
      "The cyber resilience platform will use the fresh capital to accelerate product development and strengthen its go-to-market motion across global enterprises.",
    url: "https://www.bwdisrupt.com/article/meshdefend-raises-2-3-mn-in-its-maiden-external-funding-round-578586",
    image: "/images/news-bw-disrupt.jpg",
    spreadImage: "/images/spread-news-bw.png",
    author: "BW Online Bureau",
    category: "Venture & Growth",
    readTime: "4 min read",
    highlights: [
      "Participation from Kettleborough VC and global industry executives",
      "Founded by former Dell leaders Tejas Pandit and Ravi Chitloor",
      "Automating Day-2 resilience and recovery operations for hybrid estates",
    ],
    spreadIndex: 1,
  },
];

export const EDITORIAL_META = {
  kicker: "THE RESILIENCE GAZETTE · DISPATCHES & MEDIA COVERAGE",
  volume: "VOL. I · ISSUE 01",
  location: "BANGALORE & ATLANTA",
  mastheadTitle: "MeshDefend Newsroom",
  mastheadSubtitle:
    "Official coverage, funding announcements, and architectural dispatches documenting the autonomous enterprise resilience layer.",
  leadQuote: {
    quote:
      "Large enterprises operate vast, fragmented backup estates across legacy on-prem and multi-cloud environments. MeshDefend brings an AI-native operations layer that unifies monitoring, validates recovery readiness, and eliminates catastrophic downtime before it strikes.",
    attribution: "Tejas Pandit & Ravi Chitloor",
    role: "Co-Founders, MeshDefend",
  },
  newsletter: {
    eyebrow: "THE RESILIENCE MEMO",
    heading: "Direct Dispatches to Your Desk",
    subhead:
      "Quarterly architectural briefings, enterprise cyber resilience findings, and company milestones. Zero marketing fluff, zero unsolicited cadence.",
    frequency: "Published quarterly · Strictly editorial",
  },
  pressKit: {
    title: "Press & Media Inquiries",
    description:
      "For media inquiries, executive interview requests, or official press kit assets, please reach our communications team directly.",
    email: "press@meshdefend.ai",
    altEmail: "hello@meshdefend.ai",
    assets: [
      { name: "Brand Wordmark & Logomark", format: "Vector SVG / PNG" },
      { name: "Founders Portrait & Executive Bios", format: "High-Res JPEG" },
      { name: "Company Fact Sheet & One-Pager", format: "PDF (1.2 MB)" },
    ],
  },
};
