"use client";

import { motion, type Variants } from "framer-motion";

/* Line-art icons "draw themselves" in: each path animates 0 → full length.
   Requires a framer-motion parent driving hidden/visible variants. */
const iconDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 1.1, ease: "easeInOut" },
    },
};

/* Stroke path sets per service (24×24 grid, drawn to read at a glance). */
export const ICON_PATHS: Record<string, string[]> = {
    "kitchen-remodeling": [
        "M5 10.5h14v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18.5v-8Z",
        "M3.5 10.5h17",
        "M9 14.5h6",
        "M8.5 7.5c0-1.2 1-1.8 1-3M12 7.5c0-1.2 1-1.8 1-3M15.5 7.5c0-1.2 1-1.8 1-3",
    ],
    "bathroom-remodeling": [
        "M4 12.5h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2Z",
        "M6 12.5V6a2 2 0 0 1 4 0",
        "M8.5 6.5h3",
        "M7 19.5 6 21.5M17 19.5l1 2",
    ],
    "home-additions": [
        "M3.5 11 12 4l8.5 7",
        "M6 9.5V20h12V9.5",
        "M12 12.5v5M9.5 15h5",
    ],
    "basement-finishing": [
        "M3.5 9.5 12 3l8.5 6.5",
        "M6 8v6h12V8",
        "M6 17h12v4H6z",
        "M12 14v3",
    ],
    "exterior-renovations": [
        "M4 5.5h12v4H4z",
        "M16 7.5h3.5V11H14",
        "M14 11v3",
        "M12.5 14h3v6.5h-3z",
    ],
    "demolition-services": [
        /* Excavator — Tabler Icons "backhoe" (MIT), matches the set's
           24×24 stroke conventions */
        "M2 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
        "M11 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
        "M13 19l-9 0",
        "M4 15l9 0",
        "M8 12v-5h2a3 3 0 0 1 3 3v5",
        "M5 15v-2a1 1 0 0 1 1 -1h7",
        "M21.12 9.88l-3.12 -4.88l-5 5",
        "M21.12 9.88a3 3 0 0 1 -2.12 5.12a3 3 0 0 1 -2.12 -.88l4.24 -4.24",
    ],
    "deck-installation": [
        "M3.5 12h17",
        "M5 12v8M9.5 12v8M14.5 12v8M19 12v8",
        "M3.5 16h17",
        "M7 12 12 5l5 7",
    ],
    "interior-design": [
        /* Chaise longue — Iconify "marketeq:chaise-longue" rescaled 50→24 */
        "M20 14.5a4 4 0 0 0-4-4H13v-0.5a3.5 3.5 0 0 0-7 0v0.27m14 10.23v-2m-14 2v-2z",
        "M8 14.5v-1.89a2.07 2.07 0 0 0-1.66-2.11 2 2 0 0 0-2.34 2v6h18v-3a1 1 0 0 0-1-1z",
    ],
    "commercial-services": [
        "M3.5 21h17",
        "M6 21V4.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1V21",
        "M14 9.5h3.5a1 1 0 0 1 1 1V21",
        "M8.5 7.5h2M8.5 11h2M8.5 14.5h2M16 13h.75M16 16.5h.75",
    ],
    "government-services": [
        "M3.5 9.5 12 4l8.5 5.5",
        "M4.5 9.5h15",
        "M6 12v6.5M10 12v6.5M14 12v6.5M18 12v6.5",
        "M3.5 21h17M4.5 18.5h15",
    ],
};

export default function ServiceIcon({
    slug,
    animated,
    className = "",
}: {
    slug: string;
    animated: boolean;
    className?: string;
}) {
    const paths = ICON_PATHS[slug] ?? [];
    if (paths.length === 0 && process.env.NODE_ENV !== "production") {
        console.warn(`ServiceIcon: no icon paths defined for slug "${slug}" — add it to ICON_PATHS.`);
    }
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {paths.map((d) =>
                animated ? (
                    <motion.path key={d} d={d} variants={iconDraw} />
                ) : (
                    /* pathLength=1 normalizes dash math so CSS stroke-redraw
                       effects work regardless of real path length */
                    <path key={d} d={d} pathLength={1} />
                ),
            )}
        </svg>
    );
}
