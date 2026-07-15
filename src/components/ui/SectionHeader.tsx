"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

/**
 * Drafting-sheet section header: mono label ("Prefix 01.0X · Kicker") with a
 * trailing dashed rule, and an oversized ghost number behind the headline.
 * `tone="ink"` for steel/navy bands (fixed colors), `themed` for light
 * sections (flipping tokens). Must render inside a motion parent driving
 * hidden/visible variants (the standard stagger container).
 */
export default function SectionHeader({
    prefix,
    index,
    kicker,
    title,
    tone = "themed",
}: {
    prefix: string;
    index: string;
    kicker: string;
    title: string;
    tone?: "themed" | "ink";
}) {
    const ink = tone === "ink";
    return (
        <>
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
                <span
                    className={`font-mono text-sm uppercase tracking-widest ${ink ? "text-brand-light/80" : "text-light-blue/80"}`}
                >
                    {prefix} 01.{index} · {kicker}
                </span>
                <div
                    className={`flex-1 border-t border-dashed ${ink ? "border-brand-light/25" : "border-light-blue/25"}`}
                />
            </motion.div>

            <motion.div variants={fadeUp} className="relative">
                <span
                    className={`pointer-events-none absolute -top-10 -left-2 select-none font-title text-[7rem] font-bold leading-none md:text-[11rem] ${ink ? "text-brand-light/[0.09]" : "text-light-blue/[0.25]"}`}
                >
                    {index}
                </span>
                <h2
                    className={`relative ml-20 font-title text-3xl font-bold uppercase tracking-tight md:text-5xl ${ink ? "text-white" : "text-foreground"}`}
                >
                    {title}
                </h2>
            </motion.div>
        </>
    );
}
