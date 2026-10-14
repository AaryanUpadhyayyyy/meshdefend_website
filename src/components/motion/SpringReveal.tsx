"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { SPRING_PHYSICS } from "./MotionPhysics";

interface SpringRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function SpringReveal({
  children,
  delay = 0,
  yOffset = 24,
  threshold = 0.15,
  className = "",
  style = {},
  ...props
}: SpringRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        ...SPRING_PHYSICS,
        delay,
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
