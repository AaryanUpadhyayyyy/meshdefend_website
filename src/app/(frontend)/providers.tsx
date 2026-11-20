"use client";

import { ThemeProvider } from "next-themes";
import { type ReactNode } from "react";
import { ScrollRevealObserver } from "@/lib/useReveal";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CalEmbed } from "@/components/common/CalEmbed";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SmoothScroll>
        <CalEmbed />
        <ScrollRevealObserver />
        {children}
      </SmoothScroll>
    </ThemeProvider>
  );
}
