"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

export interface PathCardItem {
  id: string;
  title: string;
  topic: string;
  sub?: string;
  cluster: "Backup" | "Business apps" | "Cloud";
  linkHref?: string;
}

export const PATH_CARDS: PathCardItem[] = [
  {
    id: "tech-support",
    title: "Technical support",
    topic: "Technical support",
    cluster: "Backup",
  },
  {
    id: "demo",
    title: "Book a demo",
    topic: "Demo or sales",
    cluster: "Business apps",
    linkHref: "/demo",
  },
  {
    id: "partnerships",
    title: "Partnerships",
    topic: "Partnerships",
    sub: "system integrators, MSPs, advisory firms",
    cluster: "Cloud",
  },
];

interface PathCardsProps {
  selectedTopic: string;
  onSelectTopic: (topic: string, cluster: "Backup" | "Business apps" | "Cloud") => void;
  isMobileChips?: boolean;
}

export function PathCards({
  selectedTopic,
  onSelectTopic,
  isMobileChips = false,
}: PathCardsProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let nextIndex = index;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        nextIndex = (index + 1) % PATH_CARDS.length;
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        nextIndex = (index - 1 + PATH_CARDS.length) % PATH_CARDS.length;
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const card = PATH_CARDS[index];
        onSelectTopic(card.topic, card.cluster);
        return;
      } else {
        return;
      }

      const nextCard = PATH_CARDS[nextIndex];
      onSelectTopic(nextCard.topic, nextCard.cluster);
      const el = document.getElementById(`path-card-${nextCard.id}`);
      el?.focus();
    },
    [onSelectTopic]
  );

  if (isMobileChips) {
    return (
      <div
        role="radiogroup"
        aria-label="Select support topic"
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 8,
          WebkitOverflowScrolling: "touch",
        }}
      >
        {PATH_CARDS.map((card, idx) => {
          const isSelected = selectedTopic === card.topic;
          return (
            <button
              key={card.id}
              id={`path-chip-${card.id}`}
              role="radio"
              aria-checked={isSelected}
              type="button"
              onClick={() => onSelectTopic(card.topic, card.cluster)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              style={{
                flexShrink: 0,
                padding: "10px 14px",
                backgroundColor: isSelected ? "#2a272a" : "#1e1e1e",
                border: isSelected ? "1px solid #fd4703" : "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 4,
                color: isSelected ? "#fefdfd" : "#a09a9c",
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 12,
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: isSelected ? "#fd4703" : "rgba(255, 255, 255, 0.3)",
                }}
              />
              <span>{card.title}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Select support pathway"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        perspective: 1000,
      }}
    >
      {PATH_CARDS.map((card, idx) => (
        <TiltCard
          key={card.id}
          card={card}
          index={idx}
          isSelected={selectedTopic === card.topic}
          onSelect={() => onSelectTopic(card.topic, card.cluster)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}

function TiltCard({
  card,
  isSelected,
  onSelect,
  onKeyDown,
  reducedMotion,
}: {
  card: PathCardItem;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  reducedMotion: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Up to 8deg rotation
    const rx = -(y - 0.5) * 16;
    const ry = (x - 0.5) * 16;
    setRotX(Math.max(-8, Math.min(8, rx)));
    setRotY(Math.max(-8, Math.min(8, ry)));
    setLightPos({ x: x * 100, y: y * 100 });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
    setLightPos({ x: 50, y: 50 });
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  // Depth translation when selected: translateZ 30px
  const translateZValue = reducedMotion ? 0 : isSelected ? 30 : isHovered ? 12 : 0;
  const transformStyle = reducedMotion
    ? undefined
    : `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${translateZValue}px)`;

  return (
    <div
      id={`path-card-${card.id}`}
      ref={cardRef}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        position: "relative",
        borderRadius: 4,
        backgroundColor: isSelected ? "#221f22" : "#1c1c1c",
        border: isSelected
          ? "1px solid #fd4703"
          : isHovered
          ? "1px solid rgba(253, 71, 3, 0.4)"
          : "1px solid rgba(255, 255, 255, 0.1)",
        padding: "24px 22px",
        cursor: "pointer",
        transform: transformStyle,
        transformStyle: "preserve-3d",
        transition: isHovered
          ? "transform 0.1s ease-out, border-color 0.2s, background-color 0.2s"
          : "transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1), border-color 0.2s, background-color 0.2s",
        boxShadow: isSelected
          ? "0 20px 32px -12px rgba(253, 71, 3, 0.25)"
          : isHovered
          ? "0 14px 28px -10px rgba(0, 0, 0, 0.5)"
          : "none",
        outline: "none",
        userSelect: "none",
      }}
    >
      {/* Moving Light Edge (Layer 0: translateZ 0) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 4,
          pointerEvents: "none",
          background: isHovered
            ? `radial-gradient(circle 180px at ${lightPos.x}% ${lightPos.y}%, rgba(253, 71, 3, 0.15), transparent 70%)`
            : "transparent",
          transition: "background 0.15s ease",
          transform: "translateZ(0px)",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Text Layer (translateZ 12px) */}
        <div style={{ transform: reducedMotion ? "none" : "translateZ(12px)" }}>
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: 11,
              letterSpacing: "0.06em",
              color: isSelected ? "#fd4703" : "rgba(255, 255, 255, 0.45)",
              textTransform: "uppercase",
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            PATHWAY · {card.cluster.toUpperCase()}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body, Inter, sans-serif)",
              fontSize: 18,
              fontWeight: 600,
              color: "#fefdfd",
              marginBottom: card.sub ? 6 : 0,
              lineHeight: 1.3,
            }}
          >
            {card.title}
          </div>
          {card.sub && (
            <div
              style={{
                fontFamily: "var(--font-body, Inter, sans-serif)",
                fontSize: 13,
                color: "rgba(255, 255, 255, 0.6)",
                lineHeight: 1.4,
              }}
            >
              {card.sub}
            </div>
          )}
        </div>

        {/* Icon Layer (translateZ 24px) */}
        <div
          style={{
            transform: reducedMotion ? "none" : "translateZ(24px)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {card.linkHref && (
            <Link
              href={card.linkHref}
              onClick={(e) => e.stopPropagation()}
              aria-label={`Go to ${card.title} page`}
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: 11,
                color: "#fd4703",
                textDecoration: "none",
                padding: "3px 8px",
                border: "1px solid rgba(253, 71, 3, 0.4)",
                borderRadius: 2,
                backgroundColor: "rgba(253, 71, 3, 0.08)",
              }}
            >
              /demo ↗
            </Link>
          )}

          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              border: isSelected ? "1.5px solid #fd4703" : "1px solid rgba(255, 255, 255, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isSelected ? "rgba(253, 71, 3, 0.15)" : "transparent",
            }}
          >
            {isSelected && (
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#fd4703",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
