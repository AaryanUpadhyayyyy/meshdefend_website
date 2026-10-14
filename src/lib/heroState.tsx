"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

/**
 * Shared state machine for the hero dashboard + healing mesh.
 * States: idle → failed → proposed → approved → verified → (auto resets)
 * 
 * The dashboard drives transitions, or auto-cycles with tabs.
 * The HealingMesh subscribes and reflects the state visually.
 */

export type HeroState = "idle" | "failed" | "proposed" | "approved" | "verified";

interface HeroStateContextType {
  state: HeroState;
  setState: (s: HeroState) => void;
  advance: () => void;
  approve: () => void;
  reset: () => void;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  isPaused: boolean;
  setIsPaused: (p: boolean) => void;
}

const HeroStateContext = createContext<HeroStateContextType | null>(null);

export function HeroStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<HeroState>("failed");
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto transition for the hero story if not approved manually
  useEffect(() => {
    if (isPaused) return;

    if (state === "failed") {
      const t = setTimeout(() => setState("proposed"), 2000);
      return () => clearTimeout(t);
    }
    if (state === "proposed") {
      // Auto approve after 4s if user hasn't clicked
      const t = setTimeout(() => {
        setState("approved");
      }, 4000);
      return () => clearTimeout(t);
    }
    if (state === "approved") {
      const t = setTimeout(() => setState("verified"), 1400);
      return () => clearTimeout(t);
    }
    if (state === "verified") {
      // Return to idle after 3s, then loop to failed
      const t = setTimeout(() => setState("idle"), 3500);
      return () => clearTimeout(t);
    }
    if (state === "idle") {
      const t = setTimeout(() => setState("failed"), 3000);
      return () => clearTimeout(t);
    }
  }, [state, isPaused]);

  const advance = useCallback(() => {
    setState((prev) => {
      switch (prev) {
        case "idle": return "failed";
        case "failed": return "proposed";
        case "proposed": return "approved";
        case "approved": return "verified";
        case "verified": return "idle";
      }
    });
  }, []);

  const approve = useCallback(() => {
    setState("approved");
    setTimeout(() => setState("verified"), 1200);
  }, []);

  const reset = useCallback(() => {
    setState("idle");
  }, []);

  return (
    <HeroStateContext.Provider
      value={{
        state,
        setState,
        advance,
        approve,
        reset,
        activeTab,
        setActiveTab,
        isPaused,
        setIsPaused,
      }}
    >
      {children}
    </HeroStateContext.Provider>
  );
}

const defaultHeroState: HeroStateContextType = {
  state: "failed",
  setState: () => {},
  advance: () => {},
  approve: () => {},
  reset: () => {},
  activeTab: 0,
  setActiveTab: () => {},
  isPaused: false,
  setIsPaused: () => {},
};

export function useHeroState() {
  const ctx = useContext(HeroStateContext);
  return ctx || defaultHeroState;
}
