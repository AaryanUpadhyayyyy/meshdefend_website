/**
 * Initial CMS values for the homepage sections that are currently composed in
 * React. These defaults preserve the site's existing copy and visual assets.
 */
export const HERO_BACKING_LINE =
  "Backed by Kalaari Capital · Kettleborough VC";

export const PAIN_CAROUSEL_CARDS = [
  {
    num: "01",
    group: "Recovery Confidence",
    imageAlt: "Recovery confidence timeline showing fresh proof today and stale evidence after three months",
    imageUrl: "/images/home/recovery-confidence-timeline.svg",
    summary: "",
  },
  {
    num: "02",
    group: "Complexity at Scale",
    imageAlt: "Complex hybrid cloud environments connected across AWS, Azure, Veeam, Commvault, Rubrik, and Dell",
    imageUrl: "/images/img/1000227811.png",
    summary: "",
  },
  {
    num: "03",
    group: "Operational Friction",
    imageAlt: "An overwhelmed operator surrounded by disconnected runbooks, tickets, tools, and specialist handoffs",
    imageUrl: "/images/img/Operational Friction.png",
    summary: "",
  },
];

export const TRUST_SECTION_CONTENT = {
  backedByLabel: "BACKED BY",
  backedByCaption: "Enterprise CXOs and Founders",
  backers: [
    {
      name: "Kalaari Capital",
      lightSrc: "/images/logos/kalaari-transparent.png",
      darkSrc: "/images/logos/kalaari-white.png",
      height: 34,
      href: "",
    },
    {
      name: "Kettleborough VC",
      lightSrc: "/images/logos/kettleborough-transparent.png",
      darkSrc: "/images/logos/kettleborough-dark.png",
      height: 34,
      href: "",
    },
  ],
  partnersLabel: "Partners",
  partners: [
    {
      name: "Sapta Tunas Teknologi",
      lightSrc: "/images/logos/saptatuns-light.webp",
      darkSrc: "/images/logos/saptatuns-dark.webp",
      height: 34,
    },
    {
      name: "NVIDIA Inception Program",
      lightSrc: "/images/logos/nvidia-light.webp",
      darkSrc: "/images/logos/nvidia-dark.webp",
      height: 32,
    },
    {
      name: "OpenAI",
      lightSrc: "/images/logos/openai-light.png",
      darkSrc: "/images/logos/openai-dark.webp",
      height: 28,
    },
    {
      name: "AWS",
      lightSrc: "/images/logos/aws-light.webp",
      darkSrc: "/images/logos/aws-dark.webp",
      height: 28,
    },
    {
      name: "Microsoft",
      lightSrc: "/images/logos/microsoft-light.png",
      darkSrc: "/images/logos/microsoft-dark.png",
      height: 26,
    },
    {
      name: "Anthropic",
      lightSrc: "/images/logos/anthropic-light.png",
      darkSrc: "/images/logos/anthropic-dark.png",
      height: 22,
    },
    {
      name: "Azure AI Foundry",
      lightSrc: "/images/logos/azure-light.png",
      darkSrc: "/images/logos/azure-dark.png",
      height: 26,
    },
    {
      name: "Powered by Dell Technologies",
      lightSrc: "/images/logos/dell-light.png",
      darkSrc: "/images/logos/dell-dark.png",
      height: 28,
    },
  ],
};

export const AGENT_MESH_SECTION_CONTENT = {
  eyebrow: "[ 04 // AGENT MESH INTELLIGENCE ENGINE ]",
  headingFirst: "The intelligence to act.",
  headingSecond: "The discipline to stop.",
  intro:
    "ResOC is the unified console teams operate in; Agent Mesh™ is the multi-agent engine beneath it. It correlates signals across vendors, maps Minimum Viable Company (MVC) dependencies, and automates operations with Human-in-the-Loop (HITL) and Human-on-the-Loop (HIOL) approval gates.",
  policyStatus: "POLICY_GOVERNED",
  cycleAriaLabel: "Agent Mesh Reasoning Cycle",
  closingLine: "Works across on-prem, public cloud and hybrid estates.",
  steps: [
    {
      label: "Learn",
      description:
        "Agents map your backup, storage, application, security, ITSM and cloud tools. They read; they change nothing.",
      status: "OBSERVES · NO CHANGES",
    },
    {
      label: "Reason",
      description:
        "They join the signals, trace the cause and propose a fix, with the evidence attached.",
      status: "RECOMMENDS · NO CHANGES",
    },
    {
      label: "Act",
      description:
        "The approved step runs inside policy limits, and the result is saved as audit-ready evidence.",
      status: "REQUIRES HUMAN APPROVAL",
    },
  ],
  pillars: AGENT_MESH.pillars,
};
import { AGENT_MESH } from "./content.ts";

