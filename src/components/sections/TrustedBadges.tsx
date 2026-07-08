"use client";

import { motion, type Variants } from "framer-motion";
import RecognitionLogos from "@/components/ui-elements/RecognitionLogos";
import { BUSINESS } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, amount: 0.3 };

const sectionStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function ShieldCheckIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 2.5 4.5 5.4v6.1c0 4.6 3.2 8.4 7.5 9.9 4.3-1.5 7.5-5.3 7.5-9.9V5.4L12 2.5Z" />
            <path d="m9 12 2.2 2.2L15.5 9.7" />
        </svg>
    );
}

/**
 * Home-page trust strip: licensing credentials as badge pills, then the
 * "as reviewed on" logo row. Themed surface — flips with light/dark.
 */
export default function TrustedBadges() {
    return (
        <section className="bg-surface py-16 transition-colors md:py-12">
            <motion.div
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mx-auto max-w-6xl px-6"
            >
                {/* Kicker */}
                <motion.div
                    variants={fadeUp}
                    className="mb-4 flex items-center justify-center gap-3"
                >
                    <span className="h-px w-8 bg-main-blue/50" />
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-main-blue">
                        Licensed · Insured · Trusted
                    </span>
                    <span className="h-px w-8 bg-main-blue/50" />
                </motion.div>

                {/* Headline */}
                <motion.h2
                    variants={fadeUp}
                    className="text-center font-title text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl"
                >
                    Credentials You Can Verify
                </motion.h2>

                {/* License badges */}
                <motion.ul
                    variants={fadeUp}
                    className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4"
                >
                    {BUSINESS.licenses.map((license) => (
                        <li
                            key={license}
                            className="flex items-center gap-2.5 rounded-full border border-border bg-surface-muted px-5 py-2.5 text-sm font-medium text-foreground transition-colors"
                        >
                            <ShieldCheckIcon className="h-4.5 w-4.5 shrink-0 text-main-blue" />
                            {license}
                        </li>
                    ))}
                </motion.ul>

                {/* Divider */}
                <motion.div variants={fadeUp} className="mt-12 flex items-center gap-4">
                    <span className="flex-1 border-t border-dashed border-border" />
                    <span className="whitespace-nowrap font-mono text-md uppercase tracking-[0.2em] text-muted">
                        As reviewed on
                    </span>
                    <span className="flex-1 border-t border-dashed border-border" />
                </motion.div>
            </motion.div>

            {/* Review-logo marquee — outside the container so it runs full-bleed */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mt-8"
            >
                <RecognitionLogos />
            </motion.div>
        </section>
    );
}
