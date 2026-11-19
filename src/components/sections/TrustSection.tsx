"use client";

import { TRUST_SECTION_CONTENT } from "@/lib/homeSections";

export type TrustSectionContent = Partial<typeof TRUST_SECTION_CONTENT>;
export type TrustSectionCMSContent = TrustSectionContent;

/**
 * TrustSection:
 * The partner trust logos are now integrated directly into the Hero fold (under the CTAs on the left),
 * with the full iceberg image displayed prominently on the right.
 */
export function TrustSection(_props?: { content?: TrustSectionContent }) {
  return null;
}
