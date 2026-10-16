export interface PodcastEpisode {
  id: string;
  episodeNumber: string;
  roman: string;
  title: string;
  discipline: string;
  guest: string;
  date: string;
  duration: string;
  ytId: string;
  thumbnail: string;
  coverImage: string;
  description: string;
  binding: string;
  color: string;
  foil: string;
  ink: string;
  width: number;
  height: number;
  depth: number;
  seed: number;
}

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: "ep-01",
    episodeNumber: "01",
    roman: "I",
    title: "Everyone is talking about AI, here's what no one's saying",
    discipline: "Autonomous operations",
    guest: "WTR Episode 1",
    date: "September 24, 2026",
    duration: "15 min",
    ytId: "2A46u6gUETc",
    thumbnail: "https://i.ytimg.com/vi/2A46u6gUETc/maxresdefault.jpg",
    coverImage: "/images/here wahtnoonesaying.png",
    description:
      "A deep dive into the realities of AI infrastructure, enterprise readiness, and what the industry is missing when it comes to true cyber resilience.",
    binding: "Espresso leather cloth · warm terracotta foil",
    color: "#24130d",
    foil: "#e88c38",
    ink: "#fae8d4",
    width: 1.36,
    height: 2.04,
    depth: 0.30,
    seed: 11,
  },
  {
    id: "ep-02",
    episodeNumber: "02",
    roman: "II",
    title: "PT. Sapta Tunas Teknologi X MeshDefend - Episode 2",
    discipline: "Human-in-the-loop AI",
    guest: "Tejas Pandit & Felix",
    date: "September 22, 2026",
    duration: "15 min",
    ytId: "0Nth0uYx5Vk",
    thumbnail: "https://i.ytimg.com/vi/0Nth0uYx5Vk/maxresdefault.jpg",
    coverImage: "/images/aipowerdefenseyourdata.png",
    description:
      "Exploring the evolution of backup operations, human-in-the-loop agentic AI, and why MeshDefend is building the operating system for data infrastructure.",
    binding: "Midnight obsidian cloth · electric cyan foil",
    color: "#121b29",
    foil: "#3ba8f5",
    ink: "#d8ecfc",
    width: 1.36,
    height: 2.04,
    depth: 0.31,
    seed: 22,
  },
  {
    id: "ep-03",
    episodeNumber: "03",
    roman: "III",
    title: "PT. Sapta Tunas Teknologi X MeshDefend - Episode 3",
    discipline: "Continuous posture management",
    guest: "Industry Experts",
    date: "September 15, 2026",
    duration: "11 min",
    ytId: "P8Pb90RkOUY",
    thumbnail: "https://i.ytimg.com/vi/P8Pb90RkOUY/maxresdefault.jpg",
    coverImage: "/images/everryonetalkingaboutai.png",
    description:
      "A conversation on the reality of recovery, the illusion of backup success, and why forward-thinking enterprises are shifting to continuous posture management.",
    binding: "Deep navy cloth · sapphire gold foil",
    color: "#141f32",
    foil: "#4ba3f5",
    ink: "#dcebfc",
    width: 1.36,
    height: 2.04,
    depth: 0.30,
    seed: 33,
  },
];
