"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

/**
 * Drafting-sheet section header, and the site-wide standard for every numbered
 * band. The reference implementation is the About page: WhoWeAre (themed) and
 * OurStory (ink) hand-roll this exact grammar, and this component is the shared
 * source of truth for it, the way lib/motion owns the entrances.
 *
 * The grammar, top to bottom:
 *   1. mono label "Prefix 01.0X" with a trailing dashed rule
 *   2. oversized ghost number bleeding behind an offset headline
 *   3. optional accent bar + mono meta stamp under the headline
 *
 * `tone="ink"` for steel/navy bands (fixed colors), `themed` for light sections
 * (flipping tokens). Must render inside a motion parent driving hidden/visible
 * variants (the standard stagger container).
 */
export default function SectionHeader({
    prefix,
    index,
    kicker,
    title,
    meta,
    tone = "themed",
}: {
    prefix: string;
    index: string;
    /** Appended to the label as "· Kicker". Omit for the About-page grammar,
        where the sheet number alone carries the label. */
    kicker?: string;
    title: string;
    /** Accent bar + mono stamp under the headline ("Est. 2010 · DMV Area").
        Keep it factual: it reads as a drafting-sheet annotation, not a tagline. */
    meta?: string;
    tone?: "themed" | "ink";
}) {
    const ink = tone === "ink";
    return (
        <>
            <motion.div variants={fadeUp} className="mb-8 flex items-center gap-3">
                <span
                    className={`font-mono text-base uppercase tracking-widest ${ink ? "text-brand-light" : "text-light-blue/80"}`}
                >
                    {prefix} 01.{index}
                    {kicker ? ` · ${kicker}` : ""}
                </span>
                <div
                    className={`flex-1 border-t border-dashed ${ink ? "border-brand-light/25" : "border-light-blue/25"}`}
                />
            </motion.div>

            <motion.div variants={fadeUp} className="relative">
                <span
                    className={`pointer-events-none absolute -top-8 -left-3 select-none font-title text-[6.5rem] font-normal leading-none md:text-[8rem] ${ink ? "text-brand-light/[0.12]" : "text-light-blue/[0.25]"}`}
                >
                    {index}
                </span>
                <h2
                    className={`relative ml-12 font-title text-3xl font-normal uppercase tracking-[0.015em] md:ml-14 md:text-5xl ${ink ? "text-white" : "text-foreground"}`}
                >
                    {title}
                </h2>

                {/* flex-wrap: in a narrow rail (OurStory) the stamp drops under
                    the bar; at full width it sits beside it. */}
                {meta ? (
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <span className={`h-1 w-24 ${ink ? "bg-brand-light" : "bg-light-blue"}`} />
                        <span
                            className={`font-mono text-base uppercase tracking-[0.2em] ${ink ? "text-blue-100/85" : "text-muted"}`}
                        >
                            {meta}
                        </span>
                    </div>
                ) : null}
            </motion.div>
        </>
    );
}
