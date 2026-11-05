import type { Variants } from "motion/react";

export const heroSectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

export const heroDriftUpVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 10, stiffness: 45 },
  },
};

export const heroNavDropVariants: Variants = {
  hidden: { opacity: 0, y: -10, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 12, stiffness: 50 },
  },
};

export const heroStaggerWordsVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const heroImageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.15, filter: "blur(15px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 25, stiffness: 30 },
  },
};
