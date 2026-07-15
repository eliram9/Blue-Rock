"use client";

import { motion } from "framer-motion";
import Corners from "@/components/ui/Corners";
import { checkDraw, fadeUp } from "@/lib/motion";

/**
 * Drafting-document review checklist: corner-bracketed sheet with a title
 * strip, numbered requirement rows whose checkmarks draw themselves in, and
 * a sign-off footer. Themed surface (flipping tokens). Must render inside a
 * motion parent driving hidden/visible variants.
 */
export default function ChecklistSheet({
    titleLeft,
    titleRight,
    items,
    itemPrefix = "RQ",
    footer,
}: {
    titleLeft: string;
    titleRight: string;
    items: readonly string[];
    itemPrefix?: string;
    footer: string;
}) {
    return (
        <div className="relative border border-border bg-surface-muted/60">
            <Corners color="border-main-blue/50" />

            {/* Title block strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    {titleLeft}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    {titleRight}
                </span>
            </div>

            {/* Requirement rows */}
            <ul>
                {items.map((item, i) => (
                    <motion.li
                        key={item}
                        variants={fadeUp}
                        className="group flex items-start gap-4 border-b border-border px-5 py-4 transition-colors hover:bg-surface"
                    >
                        {/* Drafting checkbox with drawn check */}
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-main-blue/60 transition-colors group-hover:border-main-blue">
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-3.5 w-3.5 text-main-blue"
                            >
                                <motion.path variants={checkDraw} d="m5 12.5 4.5 4.5L19 7" />
                            </svg>
                        </span>
                        <span className="shrink-0 pt-0.5 font-mono text-xs tracking-[0.2em] text-main-blue">
                            {itemPrefix}—{String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-base leading-relaxed text-foreground">
                            {item}
                        </span>
                    </motion.li>
                ))}
            </ul>

            {/* Sign-off strip */}
            <div className="px-5 py-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    {footer}
                </span>
            </div>
        </div>
    );
}
