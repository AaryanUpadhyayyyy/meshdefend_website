export const SPRING_PHYSICS = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 1,
};

export const SPRING_STAGGER = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const SPRING_ITEM = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: SPRING_PHYSICS,
  },
};
