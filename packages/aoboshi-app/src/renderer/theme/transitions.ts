import type { Transition } from "motion/react";

export const none = { type: false } satisfies Transition;

export const sidebar = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} satisfies Transition;

export const tooltip = {
  type: "spring",
  stiffness: 2000,
  damping: 70,
} satisfies Transition;
