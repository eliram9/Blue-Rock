"use client";

import { motion, type Variants } from "framer-motion";
import { SOCIAL_LINKS } from "@/constants/social";

export type RecognitionLogo = {
    src: string;
    alt: string;
    href: string;
    /** Optional per-logo height class to balance marks with uneven padding. */
    size?: string;
};

/**
 * Default "as reviewed on" logo set. Links come from SOCIAL_LINKS — update
 * those placeholder URLs with the real profile links to make them live.
 */
export const RECOGNITION_LOGOS: RecognitionLogo[] = [
    { src: "/social/google.png", alt: "Google Reviews", href: SOCIAL_LINKS.google },
    { src: "/social/yelp.png", alt: "Yelp", href: SOCIAL_LINKS.yelp },
    { src: "/social/houzz.png", alt: "Houzz", href: SOCIAL_LINKS.houzz, size: "h-[4.5rem]" },
    { src: "/social/bbb.png", alt: "Better Business Bureau", href: SOCIAL_LINKS.bbb },
    { src: "/social/homeadvisor.svg", alt: "HomeAdvisor", href: SOCIAL_LINKS.homeadvisor },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* Parent orchestrates a staggered reveal of its children. */
const listVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

/* Each pill pops up + scales in, then springs on hover. */
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.55, ease: EASE },
    },
};

/**
 * Reusable "as reviewed on" logo row. Logos rest in greyscale and bloom to
 * full colour on hover, lift with a spring, and catch a light sweep. Pass a
 * custom `logos` array to reuse the treatment elsewhere.
 */
export default function RecognitionLogos({
    logos = RECOGNITION_LOGOS,
    className = "",
}: {
    logos?: RecognitionLogo[];
    className?: string;
}) {
    return (
        <motion.ul
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className={`flex flex-wrap items-center justify-center gap-4 sm:justify-between ${className}`}
        >
            {logos.map((logo) => (
                <motion.li
                    key={logo.alt}
                    variants={itemVariants}
                    whileHover={{ y: -6, scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 380, damping: 20 }}
                    className="flex-1 sm:min-w-0"
                >
                    <a
                        href={logo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${logo.alt} — opens in a new tab`}
                        className="group relative flex h-24 items-center justify-center overflow-hidden rounded-md bg-gray-50 px-6 shadow-sm ring-1 ring-black/[0.04] transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-light/25"
                    >
                        {/* Light sweep that glides across on hover */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                        />
                        {/* Greyscale at rest → full colour on hover */}
                        <img
                            src={logo.src}
                            alt={logo.alt}
                            className={`relative ${logo.size ?? "h-14"} w-auto object-contain grayscale brightness-[0.45] transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:brightness-100`}
                        />
                    </a>
                </motion.li>
            ))}
        </motion.ul>
    );
}
