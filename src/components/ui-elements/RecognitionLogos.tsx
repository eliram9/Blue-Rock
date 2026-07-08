"use client";

import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/constants/social";

export type RecognitionLogo = {
    src: string;
    alt: string;
    href: string;
    /** Optional per-logo height classes to balance marks with uneven padding. */
    size?: string;
};

/**
 * Default "as reviewed on" logo set. Links come from SOCIAL_LINKS — update
 * those placeholder URLs with the real profile links to make them live.
 */
export const RECOGNITION_LOGOS: RecognitionLogo[] = [
    { src: "/social/google.svg", alt: "Google Reviews", href: SOCIAL_LINKS.google, size: "h-9 md:h-14" },
    { src: "/social/yelp.svg", alt: "Yelp", href: SOCIAL_LINKS.yelp, size: "h-9 md:h-14" },
    { src: "/social/houzz.svg", alt: "Houzz", href: SOCIAL_LINKS.houzz },
    { src: "/social/bbb.svg", alt: "Better Business Bureau", href: SOCIAL_LINKS.bbb, size: "h-9 md:h-14" },
    { src: "/social/homeadvisor.svg", alt: "HomeAdvisor", href: SOCIAL_LINKS.homeadvisor },
    { src: "/social/buildzoom.svg", alt: "BuildZoom", href: SOCIAL_LINKS.buildzoom, size: "h-9 md:h-13" },
    { src: "/social/networx.svg", alt: "Networx", href: SOCIAL_LINKS.networx, size: "h-9 md:h-13" },
];

/**
 * Reusable "as reviewed on" logo marquee. An endless full-width loop gives
 * the logos unbounded horizontal room so they render large; it pauses on
 * hover, fades at the edges, and collapses to a static wrapped grid for
 * reduced-motion users. Logos rest in greyscale and bloom to full colour
 * on hover. Pass a custom `logos` array to reuse the treatment elsewhere.
 */
export default function RecognitionLogos({
    logos = RECOGNITION_LOGOS,
    className = "",
    onInk = false,
}: {
    logos?: RecognitionLogo[];
    className?: string;
    /** Set when rendering on a fixed dark "ink" band (e.g. OurStory), where
        dark: variants don't apply but logos still need a light rest state. */
    onInk?: boolean;
}) {
    /* At rest logos are greyscale; on dark grounds (ink bands always, themed
       surfaces in dark mode) they're inverted to stay legible. Hover restores
       full colour on any ground. */
    const restTreatment = onInk
        ? "grayscale invert opacity-60"
        : "grayscale opacity-60 brightness-75 dark:invert dark:brightness-100";

    const renderSet = (clone: boolean) => (
        <ul
            aria-hidden={clone || undefined}
            className={`marquee-set flex items-center gap-10 pr-10 md:gap-16 md:pr-16 ${clone ? "marquee-clone" : ""}`}
        >
            {logos.map((logo) => (
                <motion.li
                    key={logo.alt}
                    className="flex items-center"
                    whileHover={{ y: -4, scale: 1.12 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 380, damping: 20 }}
                >
                    <a
                        href={logo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={clone ? -1 : undefined}
                        aria-label={`${logo.alt} — opens in a new tab`}
                        className="group relative flex h-16 items-center justify-center rounded-md px-2 md:h-24"
                    >
                        {/* Spotlight glow that blooms behind the logo on hover */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-1/2 top-1/2 h-full w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-light/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                        />
                        {/* Greyscale at rest → full colour on hover */}
                        <img
                            src={logo.src}
                            alt={clone ? "" : logo.alt}
                            className={`marquee-logo relative ${logo.size ?? "h-11 md:h-16"} w-auto object-contain transition-all duration-500 ease-out ${restTreatment} group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100 group-hover:brightness-100`}
                        />
                    </a>
                </motion.li>
            ))}
        </ul>
    );

    return (
        <div
            className={`marquee relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
        >
            <div className="marquee-track flex w-max items-center">
                {renderSet(false)}
                {renderSet(true)}
            </div>
        </div>
    );
}
