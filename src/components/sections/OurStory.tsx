"use client";

import { motion, type Variants } from "framer-motion";
import Blueprint from "../../../public/svg/test3";
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

const imageReveal: Variants = {
    hidden: { opacity: 0, scale: 1.06, clipPath: "inset(0 0 100% 0)" },
    visible: {
        opacity: 1,
        scale: 1,
        clipPath: "inset(0 0 0% 0)",
        transition: { duration: 1, ease: EASE },
    },
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
        desc: "Residential, commercial, and government projects — licensed, insured, and handled end to end.",
    },
];

export default function OurStory() {
    return (
        <section className="relative overflow-hidden bg-ink py-24 md:py-32">
            {/* Blueprint background (test3) — white lines read on the dark ground */}
            <Blueprint
                aria-hidden="true"
                className="absolute inset-0 w-full h-full opacity-[0.30] pointer-events-none select-none"
            />
            {/* Radial vignette to focus the center (kept gentle so the grid stays visible) */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,var(--color-ink)_100%)]" />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                {/* Section label */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="flex items-center gap-3 mb-6"
                >
                    <span className="font-mono text-sm text-brand-light/80 tracking-widest uppercase">
                        Section 01.02
                    </span>
                    <div className="flex-1 border-t border-dashed border-brand-light/25" />
                </motion.div>

                {/* Oversized headline */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="relative"
                >
                    <span className="pointer-events-none absolute -top-10 -left-2 font-title text-[7rem] md:text-[11rem] leading-none font-bold text-brand-light/[0.09] select-none">
                        02
                    </span>
                    <h2 className="relative font-title text-6xl md:text-8xl font-bold tracking-tight text-white ml-20">
                        OUR STORY
                    </h2>
                    <div className="mt-5 flex items-center gap-4">
                        <span className="h-1 w-24 bg-brand-light" />
                        <span className="font-mono text-md tracking-[0.25em] text-blue-100/50 uppercase">
                            2010 — Present · DMV
                        </span>
                    </div>
                </motion.div>

                {/* Editorial intro */}
                <div className="mt-14 md:mt-20 grid gap-10 md:grid-cols-12 items-start">
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="md:col-span-6 text-2xl md:text-3xl leading-snug tracking-tight text-white"
                    >
                        What began in 2010 as a{" "}
                        <span className="text-brand-light">Rockville remodeling shop</span> is now a
                        full-service general contractor for the entire DMV.
                    </motion.p>
                    <motion.p
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="md:col-span-6 md:pt-2 text-blue-100/65 leading-relaxed text-base md:text-lg md:border-l md:border-dashed md:border-brand-light/30 md:pl-10"
                    >
                        Over 15 years we&apos;ve grown from single-room renovations into additions,
                        basements, exteriors, and ground-up builds — carrying the same crew, standards,
                        and accountability into every sector we serve.
                    </motion.p>
                </div>

                {/* Cinematic image */}
                <motion.figure
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="relative mt-16 md:mt-20"
                >
                    <motion.div variants={fadeUp} className="mb-4 flex items-center gap-2 text-brand-light/70">
                        <span className="h-2 w-px bg-current" />
                        <span className="h-px flex-1 bg-current/40" />
                        <span className="font-mono text-[11px] tracking-widest uppercase">
                            15+ Years in the DMV
                        </span>
                        <span className="h-px flex-1 bg-current/40" />
                        <span className="h-2 w-px bg-current" />
                    </motion.div>

                    {/* Offset accent square behind */}
                    <div className="absolute inset-x-0 bottom-0 top-10 -translate-x-4 translate-y-4 border border-brand-light/40 bg-brand-light/[0.04]" />

                    <BlueprintBox className="group relative z-10 overflow-hidden">
                        <div className="overflow-hidden">
                            <motion.img
                                variants={imageReveal}
                                src="/images/hero/inner-hero.jpg"
                                alt="Blue Rock Remodeling & Construction project in the DMV"
                                className="w-full object-cover aspect-[21/9] transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                            />
                        </div>

                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

                        {/* Hover: navy tint */}
                        <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />

                        {/* Hover: targeting reticle */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 scale-90 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100">
                            <div className="relative h-20 w-20 md:h-24 md:w-24">
                                <span className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-white/80" />
                                <span className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-white/80" />
                                <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-white/80" />
                                <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-white/80" />
                                <span className="absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-white/80" />
                                <span className="absolute top-1/2 left-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-white/80" />
                            </div>
                        </div>
                    </BlueprintBox>
                </motion.figure>

                {/* Timeline with animated connector */}
                <div className="relative mt-16 md:mt-24">
                    {/* Connector line (draws in on scroll) — desktop only */}
                    <motion.div
                        aria-hidden="true"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.2, ease: EASE }}
                        className="hidden md:block absolute left-0 right-0 top-[7px] h-px origin-left bg-gradient-to-r from-brand-light via-brand-light/50 to-transparent"
                    />

                    <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
                        {timeline.map((step, i) => (
                            <motion.li
                                key={step.year}
                                variants={fadeUp}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewport}
                                className="relative md:pt-8"
                            >
                                {/* Node dot */}
                                <motion.span
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.4, delay: 0.6 + i * 0.15, ease: EASE }}
                                    className="hidden md:block absolute left-0 top-0 h-3.5 w-3.5 rounded-full bg-brand-light ring-4 ring-ink"
                                />
                                <span className="font-mono text-md text-brand-light tracking-widest uppercase">
                                    {step.year}
                                </span>
                                <h3 className="text-white font-semibold text-lg mt-3 mb-2">{step.title}</h3>
                                <p className="text-blue-100/60 text-md leading-relaxed">{step.desc}</p>
                            </motion.li>
                        ))}
                    </ol>
                </div>

                {/* Credentials */}
                <div className="mt-20 md:mt-28">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                    >
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-8 bg-brand-light" />
                            <span className="font-mono text-xs tracking-[0.2em] text-brand-light uppercase">
                                Credentials
                            </span>
                        </div>
                        <p className="max-w-3xl text-3xl md:text-4xl leading-snug tracking-tight text-white mb-8">
                            Fully <span className="text-brand-light">licensed, bonded &amp; insured</span>{" "}
                            in Maryland.
                        </p>
                    </motion.div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {BUSINESS.licenses.map((license, i) => (
                            <motion.div
                                key={license}
                                variants={fadeUp}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewport}
                            >
                                <BlueprintBox className="h-full p-5">
                                    <span className="font-mono text-sm text-brand-light/50 mb-3 block">
                                        0{i + 1}
                                    </span>
                                    <span className="text-blue-100/85 text-sm leading-snug">{license}</span>
                                </BlueprintBox>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Recognition — logo badges spread full width (non-interactive, no links) */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="mt-16 md:mt-20 border-t border-dashed border-brand-light/20 pt-10"
                >
                    <div className="mb-8 flex items-center gap-3">
                        <span className="font-mono text-sm tracking-[0.2em] text-blue-100/40 uppercase whitespace-nowrap">
                            As reviewed on
                        </span>
                        <span className="flex-1 border-t border-dashed border-brand-light/15" />
                    </div>
                    <RecognitionLogos />
                </motion.div>
            </div>
        </section>
    );
}
