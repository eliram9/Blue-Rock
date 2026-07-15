/**
 * Shared framer-motion primitives for the drafting-sheet design language.
 * One source of truth so section entrances stay consistent site-wide —
 * import these instead of re-declaring per file.
 */

import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Standard whileInView viewport config for section reveals. */
export const viewport = { once: true, amount: 0.15 };

export const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Checkmark that draws itself in when the row scrolls into view */
export const checkDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
    },
};
