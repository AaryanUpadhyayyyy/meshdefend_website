"use client";

import { ThemeProvider } from "next-themes";
import { type ReactNode } from "react";
import { ScrollRevealObserver } from "@/lib/useReveal";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SmoothScroll>
        <ScrollRevealObserver />
        {children}
      </SmoothScroll>
    </ThemeProvider>
  );
}
