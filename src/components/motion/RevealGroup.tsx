"use client";

import React from "react";
import { REVEAL_CONFIG, type RevealVariant } from "./revealConfig";
import { Reveal } from "./Reveal";

export interface RevealGroupProps {
  children: React.ReactNode;
  staggerDelay?: number;
  delay?: number;
  maxStagger?: number;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  variant?: RevealVariant;
  duration?: number;
  y?: number;
  threshold?: number;
  margin?: string;
  id?: string;
}

export function RevealGroup({
  children,
  staggerDelay = REVEAL_CONFIG.stagger.children,
  delay = 0,
  maxStagger = REVEAL_CONFIG.stagger.maxTotal,
  as = "div",
  className = "",
  style = {},
  variant = "fade-up",
  duration = REVEAL_CONFIG.duration,
  y = REVEAL_CONFIG.y,
  threshold = REVEAL_CONFIG.viewport.amount,
  margin = REVEAL_CONFIG.viewport.margin,
  id,
}: RevealGroupProps) {
  const isList = as === "ul" || as === "ol";
  const childArray = React.Children.toArray(children);
  const Tag = as as any;

  return (
    <Tag
      id={id}
      className={className}
      style={style}
      data-reveal-group=""
    >
      {childArray.map((child, index) => {
        const itemDelay = delay + Math.min(index * staggerDelay, maxStagger);

        // If child is already a Reveal component, inject staggered delay
        if (
          React.isValidElement(child) &&
          (child.type === Reveal ||
            (child.type as any)?.displayName === "Reveal")
        ) {
          return React.cloneElement(child as React.ReactElement<any>, {
            delay: (child.props as any).delay ?? itemDelay,
            variant: (child.props as any).variant ?? variant,
          });
        }

        // If child is an <li> inside a list container, avoid double li nesting
        if (isList && React.isValidElement(child) && child.type === "li") {
          const childProps = child.props as any;
          return (
            <Reveal
              as="li"
              key={(child as any)?.key ?? index}
              delay={itemDelay}
              variant={variant}
              duration={duration}
              y={y}
              threshold={threshold}
              margin={margin}
              className={`reveal-group-item ${childProps.className || ""}`}
              style={childProps.style}
            >
              {childProps.children}
            </Reveal>
          );
        }

        return (
          <Reveal
            as={isList ? "li" : "div"}
            key={(child as any)?.key ?? index}
            delay={itemDelay}
            variant={variant}
            duration={duration}
            y={y}
            threshold={threshold}
            margin={margin}
            className="reveal-group-item"
            style={{
              height: "100%",
              width: "100%",
              minWidth: 0,
            }}
          >
            {child}
          </Reveal>
        );
      })}
    </Tag>
  );
}

RevealGroup.displayName = "RevealGroup";

export interface RevealItemProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  variant?: RevealVariant;
}

export function RevealItem({
  children,
  delay = 0,
  y = REVEAL_CONFIG.y,
  duration = REVEAL_CONFIG.duration,
  as = "div",
  className = "",
  style = {},
  variant = "fade-up",
}: RevealItemProps) {
  return (
    <Reveal
      delay={delay}
      y={y}
      duration={duration}
      as={as}
      className={`reveal-group-item ${className}`}
      style={style}
      variant={variant}
    >
      {children}
    </Reveal>
  );
}

RevealItem.displayName = "RevealItem";
