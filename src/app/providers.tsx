"use client";

import { ThemeProvider } from "next-themes";
import { type ReactNode } from "react";
import { ScrollRevealObserver } from "@/lib/useReveal";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ScrollRevealObserver />
      {children}
    </ThemeProvider>
  );
}

