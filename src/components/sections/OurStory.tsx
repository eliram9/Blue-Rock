"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Blueprint from "../../../public/svg/test3-bright";
import RecognitionLogos from "@/components/ui-elements/RecognitionLogos";
import { BUSINESS } from "@/lib/site";

/* Blueprint-style corner brackets wrapper */
function BlueprintBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative border border-brand-light/25 ${className}`}>
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-light -translate-x-px -translate-y-px" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-light translate-x-px -translate-y-px" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-light -translate-x-px translate-y-px" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-light translate-x-px translate-y-px" />
            {children}
        </div>
    );
}

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.12, ease: EASE },
    }),
};

/* Reduced-motion twin: same variant keys so the whole section can swap sets
   without touching a single motion prop. */
const fadeStill: Variants = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 },
};

const viewport = { once: true, amount: 0.3 };

const timeline = [
    {
        year: "2010",
        title: "Founded in Rockville",
        desc: "Blue Rock started as a home remodeling company serving Maryland homeowners.",
    },
    {
        year: "Growth",
        title: "Full-service construction",
        desc: "We expanded into additions, basements, exteriors, and new-home builds across the DMV.",
    },
    {
        year: "Today",
        title: "One contractor, every sector",
        desc: "Residential, commercial, and government projects. Licensed, insured, and handled end to end.",
    },
];

export default function OurStory() {
    const reduce = useReducedMotion();
    const fade = reduce ? fadeStill : fadeUp;

    return (
        <section className="relative overflow-hidden bg-ink-raised py-24 md:py-32">
            {/* Bright blueprint variant (test3-bright), held at texture strength: any
                stronger and the drawing lines run behind the copy, which drops the real
                (composited) contrast below the 4.5:1 the copy measures on flat ground.
                `gridStep` tightens the grid to fine graph paper; the radial mask fades
                the drawing out under the text block and lets it breathe at the edges. */}
            <Blueprint
                aria-hidden="true"
                gridStep={36}
                titleBlock={false}
                className="pointer-events-none absolute inset-0 h-full w-full select-none opacity-[0.10]
                    [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,transparent_10%,black_100%)]
                    [-webkit-mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,transparent_10%,black_100%)]"
            />
            <div className="relative z-10 mx-auto max-w-6xl px-6">
                <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-12 lg:gap-x-16">
                    {/* ── Left rail: title block, pinned while the story scrolls past ── */}
                    <div className="md:col-span-4">
                        <div className="md:sticky md:top-28">
                            <motion.div
                                variants={fade}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewport}
                                className="flex items-center gap-3 mb-8"
                            >
                                <span className="font-mono text-base text-brand-light tracking-widest uppercase">
                                    About 01.02
                                </span>
                                <div className="flex-1 border-t border-dashed border-brand-light/25" />
                            </motion.div>

                            <motion.div
                                variants={fade}
                                custom={1}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewport}
                                className="relative"
                            >
                                <span className="pointer-events-none absolute -top-8 -left-3 font-title text-[6.5rem] md:text-[8rem] leading-none font-bold text-brand-light/[0.12] select-none">
                                    02
                                </span>
                                <h2 className="relative font-title text-3xl md:text-5xl font-bold uppercase tracking-tight text-white ml-12 md:ml-14">
                                    OUR STORY
                                </h2>
                                <div className="mt-10 flex flex-col items-start gap-4">
                                    <span className="h-1 w-24 bg-brand-light" />
                                    <span className="font-mono text-base tracking-[0.2em] text-blue-100/85 uppercase">
                                        2010 — Present · DMV
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* ── Right column: the story itself ── */}
                    <div className="md:col-span-8">
                        {/* Editorial intro */}
                        <motion.p
                            variants={fade}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            className="text-2xl md:text-3xl leading-snug tracking-tight text-white"
                        >
                            What began in 2010 as a{" "}
                            <span className="text-brand-light">Rockville remodeling shop</span> is now a
                            full-service general contractor for the entire DMV.
                        </motion.p>
                        <motion.p
                            variants={fade}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            className="mt-7 max-w-[62ch] border-l border-dashed border-brand-light/30 pl-6 text-lg md:text-xl leading-relaxed text-blue-100/90"
                        >
                            Over 15 years we&apos;ve grown from single-room renovations into additions,
                            basements, exteriors, and ground-up builds. The same crew, standards, and
                            accountability carry into every sector we serve.
                        </motion.p>

                        {/* Timeline — vertical spine, draws in on scroll */}
                        <div className="relative mt-14 md:mt-20">
                            <motion.div
                                aria-hidden="true"
                                initial={reduce ? false : { scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 1.2, ease: EASE }}
                                className="absolute left-[7px] top-2 bottom-6 w-px origin-top bg-gradient-to-b from-brand-light via-brand-light/60 to-brand-light/15"
                            />

                            <ol className="space-y-10 md:space-y-12">
                                {timeline.map((step, i) => (
                                    <motion.li
                                        key={step.year}
                                        variants={fade}
                                        custom={i}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={viewport}
                                        className="relative pl-10"
                                    >
                                        {/* Node dot */}
                                        <motion.span
                                            initial={reduce ? false : { scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={{ duration: 0.4, delay: 0.35 + i * 0.15, ease: EASE }}
                                            className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full bg-brand-light ring-4 ring-ink-raised"
                                        />
                                        <span className="font-mono text-base text-brand-light tracking-widest uppercase">
                                            {step.year}
                                        </span>
                                        <h3 className="text-white font-semibold text-xl mt-2 mb-2">{step.title}</h3>
                                        <p className="max-w-[58ch] text-blue-100/85 text-lg leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </motion.li>
                                ))}
                            </ol>
                        </div>

                        {/* Credentials — one drafting frame, divided into license cells */}
                        <div className="mt-16 md:mt-20">
                            <motion.div
                                variants={fade}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewport}
                            >
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="h-px w-8 bg-brand-light" />
                                    <span className="font-mono text-base tracking-[0.2em] text-brand-light uppercase">
                                        Credentials
                                    </span>
                                </div>
                                <p className="max-w-3xl text-3xl md:text-4xl leading-snug tracking-tight text-white mb-8">
                                    Fully <span className="text-brand-light">licensed, bonded &amp; insured</span>{" "}
                                    in Maryland.
                                </p>
                            </motion.div>

                            <motion.div
                                variants={fade}
                                custom={1}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewport}
                            >
                                <BlueprintBox>
                                    {/* Divide lives on an inner wrapper: `divide-dashed` sets the
                                        border-style shorthand on every child, which would turn the
                                        solid corner brackets dashed if applied to the box itself. */}
                                    <div className="divide-y divide-dashed divide-brand-light/20 md:flex md:divide-x md:divide-y-0">
                                        {BUSINESS.licenses.map((license, i) => (
                                            <div key={license} className="flex-1 p-5">
                                                <span className="font-mono text-base text-brand-light mb-3 block">
                                                    0{i + 1}
                                                </span>
                                                <span className="text-blue-100/95 text-lg leading-snug">{license}</span>
                                            </div>
                                        ))}
                                    </div>
                                </BlueprintBox>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Recognition — logo badges spread full width (non-interactive, no links) */}
                <motion.div
                    variants={fade}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="mt-20 md:mt-28 border-t border-dashed border-brand-light/20 pt-10"
                >
                    <div className="mb-8 flex items-center gap-3">
                        <span className="font-mono text-base tracking-[0.2em] text-blue-100/85 uppercase whitespace-nowrap">
                            As reviewed on
                        </span>
                        <span className="flex-1 border-t border-dashed border-brand-light/15" />
                    </div>
                    <RecognitionLogos onInk />
                </motion.div>
            </div>
        </section>
    );
}
