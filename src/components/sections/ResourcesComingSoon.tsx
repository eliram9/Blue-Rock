"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { motion, MotionConfig } from "framer-motion";
import BlueprintGrid from "@/components/svg/BlueprintGrid";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp, stagger, viewport } from "@/lib/motion";

/* Existing pages that already answer what the guides will cover. No /contact
   row on purpose: the CTA band below owns that intent alone. */
const MEANWHILE = [
    { href: "/faq", label: "Frequently Asked Questions" },
    { href: "/services/residential", label: "Residential Services" },
    { href: "/services/commercial", label: "Commercial Services" },
    { href: "/projects", label: "Completed Projects" },
] as const;

/**
 * Placeholder body for /resources. The page sits in the primary nav, so it
 * states that the library is unfinished and hands the visitor somewhere to go.
 * That is the whole job, so it is one band: there is no article here to
 * preview, and a grid of unwritten titles would only dress up an empty page.
 *
 * Styled as the standard numbered band, matching About's WhoWeAre exactly:
 * bg-surface, BlueprintGrid at 40%, py-24/32, max-w-6xl, and the SectionHeader
 * grammar with a meta stamp. It is themed rather than steel/ink on purpose:
 * /resources is only three bands deep and the CTA below is already steel +
 * blueprint, so a second steel band directly above merged the two into one
 * long dark slab and put the heaviest ground on the page's thinnest content.
 *
 * `MotionConfig reducedMotion="user"` follows ServiceSplitSections — it drops
 * the transform half of every entrance in this subtree, SectionHeader's own
 * variants included, which a local variant swap could not reach.
 */
export default function ResourcesComingSoon() {
    return (
        <MotionConfig reducedMotion="user">
            <section className="relative overflow-hidden bg-surface py-24 transition-colors md:py-32">
                <BlueprintGrid
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full select-none text-light-blue opacity-40"
                />

                <div className="relative z-10 mx-auto max-w-6xl px-6">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                    >
                        <SectionHeader
                            prefix="Resources"
                            index="01"
                            title="The Library Is In Progress"
                            meta={"In Development · Maryland & DC"}
                        />

                        <motion.p
                            variants={fadeUp}
                            className="mt-20 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg"
                        >
                            Guides on permits, budgeting, and planning a remodel are being
                            written. In the meantime:
                        </motion.p>

                        {/* Held to max-w-md so it reads as a short index rather than a
                            second navigation bar competing with the header. */}
                        <div className="mt-8 max-w-md">
                            {MEANWHILE.map((item) => (
                                <motion.div key={item.href} variants={fadeUp}>
                                    <Link
                                        href={item.href}
                                        className="group flex items-center gap-4 border-b border-border py-3 transition-colors hover:border-light-blue/60"
                                    >
                                        <span className="min-w-0 flex-1 text-base transition-colors group-hover:text-main-blue">
                                            {item.label}
                                        </span>
                                        <IconArrowRight
                                            aria-hidden="true"
                                            stroke={1.5}
                                            className="h-4 w-4 shrink-0 text-light-blue transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </MotionConfig>
    );
}
