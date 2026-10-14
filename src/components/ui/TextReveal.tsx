"use client";

import React, { useRef, useEffect, useState } from "react";

interface TextRevealProps {
  children?: React.ReactNode;
  text?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
  style?: React.CSSProperties;
  delay?: number; // base delay in seconds
  stagger?: number; // stagger delay between words in seconds
  type?: "words" | "blur" | "lines";
}

/**
 * TextReveal Component
 * Animates text word-by-word with a masked lift and soft blur entrance
 * when it scrolls into view on the page.
 */
export function TextReveal({
  children,
  text,
  as: Component = "span",
  className = "",
  style,
  delay = 0,
  stagger = 0.035,
  type = "words",
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08,
      }
    );

    // Immediate check if element is already within viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setIsRevealed(true);
    } else {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // If text string is provided directly
  const rawText = text || (typeof children === "string" ? children : null);

  if (rawText && type === "words") {
    const words = rawText.split(/\s+/).filter(Boolean);

    return (
      <Component
        ref={containerRef as React.Ref<HTMLDivElement>}
        className={`text-reveal-block ${isRevealed ? "is-revealed" : ""} ${className}`}
        style={style}
        aria-label={rawText}
      >
        {words.map((word, idx) => (
          <span key={`${word}-${idx}`} className="word-mask">
            <span
              className="word-inner"
              style={{
                transitionDelay: `${delay + idx * stagger}s`,
              }}
            >
              {word}
            </span>
            {/* Trailing space */}
            <span style={{ display: "inline-block", width: "0.26em" }}>&nbsp;</span>
          </span>
        ))}
      </Component>
    );
  }

  // Fallback / Children mode (for custom markup or blur type)
  return (
    <Component
      ref={containerRef as React.Ref<HTMLDivElement>}
      className={`text-blur-in ${isRevealed ? "is-revealed" : ""} ${className}`}
      style={{
        ...style,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </Component>
  );
}

/**
 * TextBlurIn — Simple wrapper that unblurs and slides up text as it appears.
 */
export function TextBlurIn({
  children,
  className = "",
  style,
  delay = 0,
  as: Component = "p",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: "p" | "span" | "div" | "h2" | "h3" | "h4";
}) {
  const ref = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08,
      }
    );

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setIsRevealed(true);
    } else {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      className={`text-blur-in ${isRevealed ? "is-revealed" : ""} ${className}`}
      style={{
        ...style,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </Component>
  );
}
