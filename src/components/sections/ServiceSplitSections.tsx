"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import BlueprintGrid from "../../../public/svg/test1";
import Container from "@/components/ui/Container";
import Corners from "@/components/ui/Corners";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import type { ServiceSplitBand } from "@/lib/services";

/**
 * Photo/copy bands for subcategory pages that have real photography but not
 * enough documented material for the full ServiceDetailSections page
 * (process log, before/after, FAQ).
 *
 * Structured exactly like ResidentialShowcase's overview: the drafting-sheet
 * header runs full width at the top of the section, then the short accent
 * rule, then the content underneath. Here that content is a two-up of photo
 * and copy, tops aligned, with the photo swapping sides per `flip`.
 *
 * Grounds alternate on the same rhythm the showcase pages use - plain surface
 * first, then muted surface over the blueprint grid - so two bands in a row
 * don't read as one long block. Both bands keep the photo first in the DOM,
 * so the mobile stack is identical down the page.
 *
 * `MotionConfig reducedMotion="user"` rather than a hand-rolled still variant:
 * it drops the transform half of every entrance in this subtree, including
 * SectionHeader's own, which a local variant swap could not reach.
 */
export default function ServiceSplitSections({ band }: { band: ServiceSplitBand }) {
    /* Single-open accordion. Answers stay in the DOM and are collapsed with
       CSS grid rows rather than unmounted, exactly as ServiceDetailSections
       does it, so they keep matching the FAQPage JSON-LD for search and AI
       crawlers - which never click anything. */
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    /* FAQ closes the sheet sequence: two bands means it is 03. */
    const faqIndex = String(band.sections.length + 1).padStart(2, "0");

    return (
        <MotionConfig reducedMotion="user">
            {band.sections.map((section, i) => {
                const patterned = i % 2 === 1;

                return (
                    <section
                        key={section.index}
                        className={
                            patterned
                                ? "relative overflow-hidden bg-surface-muted py-16 transition-colors md:py-24"
                                : "bg-surface py-16 transition-colors md:py-24"
                        }
                    >
                        {patterned && (
                            /* Same strength the showcase pages use, but masked
                               hollow through the middle. The grid stretches to
                               the section box, and this band is shorter than a
                               service-index grid, so unmasked its dimension
                               callouts land straight on the headline. Same
                               radial-mask trick as OurStory. */
                            <BlueprintGrid
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 h-full w-full select-none text-light-blue opacity-20
                                    [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_25%,black_100%)]
                                    [-webkit-mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_25%,black_100%)]"
                            />
                        )}

                        <Container className={patterned ? "relative z-10" : ""}>
                            <motion.div
                                variants={stagger}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewport}
                                className="mx-auto max-w-6xl"
                            >
                                <SectionHeader
                                    prefix={band.sheetName}
                                    index={section.index}
                                    kicker={section.kicker}
                                    title={section.heading}
                                />
                                <motion.div
                                    variants={fadeUp}
                                    className="mt-20 h-0.5 w-16 bg-main-blue"
                                />

                                {/* 7/5 rather than an even split - the photography is the
                                    reason this band exists, and 5 tracks still leaves
                                    the copy a ~60-character measure. */}
                                <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
                                    {/* ── Photo: drafting frame + title block ── */}
                                    {/* Hover is one move: the photograph eases in
                                        behind a frame that holds still. Slow and
                                        small on purpose - the frame, brackets, and
                                        title block are the fixed sheet the image is
                                        mounted on, so nothing but the image moves. */}
                                    <motion.figure
                                        variants={fadeUp}
                                        className={`group lg:col-span-7 ${section.flip ? "lg:order-2" : ""}`}
                                    >
                                        {/* 4:3 rather than the source's 2:1 - the copy
                                            column runs taller than a panorama, and
                                            `focus` decides which third of the frame
                                            the crop keeps. */}
                                        <div className="relative aspect-[4/3] w-full overflow-hidden border border-main-blue/25 bg-surface-muted transition-colors duration-700 group-hover:border-main-blue/50">
                                            <Image
                                                src={section.image.src}
                                                alt={section.image.alt}
                                                fill
                                                style={{ objectPosition: section.image.focus }}
                                                /* Half of a max-w-6xl container minus the
                                                   gap at the top breakpoint, so ~640px
                                                   rather than the full viewport Next would
                                                   otherwise assume. Below the fold, so no
                                                   `priority` - the MiniHero is the LCP. */
                                                sizes="(min-width: 1024px) 640px, (min-width: 640px) 90vw, 100vw"
                                                quality={85}
                                                /* Site EASE curve, long duration: the
                                                   zoom should be felt rather than seen
                                                   starting. `motion-safe` rather than a
                                                   useReducedMotion() read - that hook
                                                   returns null on the server and the
                                                   real value on the client, so gating a
                                                   className on it hydration-mismatches
                                                   for exactly the users it protects. */
                                                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.06]"
                                            />

                                            <Corners color="border-main-blue" />
                                        </div>

                                        <figcaption className="relative flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border border-t-0 border-main-blue/25 px-4 py-3 transition-colors duration-700 group-hover:border-main-blue/50">
                                            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-main-blue">
                                                {section.image.caption}
                                            </span>
                                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors duration-700 group-hover:text-main-blue">
                                                Sheet {band.sheetCode}—1.{section.index.replace(/^0/, "")}
                                            </span>
                                        </figcaption>
                                    </motion.figure>

                                    {/* ── Copy ── */}
                                    <div className={`lg:col-span-5 ${section.flip ? "lg:order-1" : ""}`}>
                                        {section.paragraphs.map((paragraph, p) => (
                                            <motion.p
                                                key={paragraph.slice(0, 32)}
                                                variants={fadeUp}
                                                className={`text-base leading-relaxed text-muted md:text-lg ${p === 0 ? "" : "mt-4"}`}
                                            >
                                                {paragraph}
                                            </motion.p>
                                        ))}

                                        {section.points && (
                                            <motion.ul variants={fadeUp} className="mt-8 space-y-3">
                                                {section.points.map((point) => (
                                                    <li
                                                        key={point}
                                                        className="flex items-start gap-3 text-sm leading-relaxed text-muted md:text-base"
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className="mt-[0.65em] h-px w-4 shrink-0 bg-main-blue/70"
                                                        />
                                                        {point}
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}

                                        {section.pullQuote && (
                                            <motion.p
                                                variants={fadeUp}
                                                className="mt-8 border-l-2 border-main-blue pl-5 text-lg font-medium leading-relaxed text-foreground md:text-xl"
                                            >
                                                {section.pullQuote}
                                            </motion.p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </Container>
                    </section>
                );
            })}

            {/* ── FAQ — visible Q&A, mirrored as FAQPage JSON-LD ── */}
            {band.faq && band.faq.length > 0 && (
                <section className="bg-surface py-16 transition-colors md:py-24">
                    <Container>
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            className="mx-auto max-w-3xl"
                        >
                            <SectionHeader
                                prefix={band.sheetName}
                                index={faqIndex}
                                kicker="FAQ"
                                title="Common Questions"
                            />
                            <motion.div
                                variants={fadeUp}
                                className="mt-20 h-0.5 w-16 bg-main-blue"
                            />

                            <dl className="mt-10">
                                {band.faq.map((item, q) => {
                                    const open = openFaq === q;
                                    return (
                                        <motion.div
                                            key={item.question}
                                            variants={fadeUp}
                                            className={`border-b transition-colors duration-300 ${open ? "border-main-blue/40" : "border-border"}`}
                                        >
                                            <dt>
                                                <button
                                                    type="button"
                                                    aria-expanded={open}
                                                    aria-controls={`faq-answer-${q}`}
                                                    onClick={() => setOpenFaq(open ? null : q)}
                                                    className="group flex w-full items-baseline gap-4 py-6 text-left"
                                                >
                                                    <span className="shrink-0 font-mono text-xs tracking-[0.2em] text-main-blue">
                                                        Q—{String(q + 1).padStart(2, "0")}
                                                    </span>
                                                    <span
                                                        className={`flex-1 text-lg font-semibold leading-snug transition-colors duration-300 ${open ? "text-main-blue" : "text-foreground group-hover:text-main-blue"}`}
                                                    >
                                                        {item.question}
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        className={`self-center text-xl leading-none text-main-blue transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                                                    >
                                                        +
                                                    </span>
                                                </button>
                                            </dt>
                                            <dd
                                                id={`faq-answer-${q}`}
                                                aria-hidden={!open}
                                                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                            >
                                                <div className="overflow-hidden">
                                                    <p
                                                        className={`border-l-2 border-main-blue/40 pb-6 pl-5 text-base leading-relaxed text-muted transition-transform duration-500 ease-out sm:ml-14 ${open ? "translate-y-0" : "-translate-y-3"}`}
                                                    >
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            </dd>
                                        </motion.div>
                                    );
                                })}
                            </dl>
                        </motion.div>
                    </Container>
                </section>
            )}
        </MotionConfig>
    );
}
