"use client";

import { motion, type Variants } from "framer-motion";
import Blueprint from "../../../public/svg/test1";

/* Blueprint-style corner brackets wrapper */
function BlueprintBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative border border-light-blue/20 ${className}`}>
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-light-blue -translate-x-px -translate-y-px" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-light-blue translate-x-px -translate-y-px" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-light-blue -translate-x-px translate-y-px" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-light-blue translate-x-px translate-y-px" />
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

export default function WhoWeAre() {
    return (
        <section className="relative overflow-hidden bg-surface py-24 md:py-32">
            {/* Blueprint background (test1) */}
            <Blueprint
                aria-hidden="true"
                className="absolute inset-0 w-full h-full text-light-blue opacity-40 pointer-events-none select-none"
            />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                {/* Section label */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="flex items-center gap-3 mb-6"
                >
                    <span className="font-mono text-sm text-light-blue/80 tracking-widest uppercase">
                        About 01.01
                    </span>
                    <div className="flex-1 border-t border-dashed border-light-blue/25" />
                </motion.div>

                {/* Oversized headline */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="relative"
                >
                    <span className="pointer-events-none absolute -top-10 -left-2 font-title text-[7rem] md:text-[11rem] leading-none font-bold text-light-blue/[0.25] select-none">
                        01
                    </span>
                    <h2 className="relative font-title text-3xl md:text-5xl font-bold uppercase tracking-tight text-foreground ml-20">
                        WHO WE ARE
                    </h2>
                    <div className="mt-15 flex items-center gap-4">
                        <span className="h-1 w-24 bg-light-blue" />
                        <span className="font-mono text-md tracking-[0.25em] text-muted uppercase">
                            Est. 2010 · DMV Area
                        </span>
                    </div>
                </motion.div>

                {/* Big cinematic image */}
                <motion.figure
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="relative mt-14 md:mt-20"
                >
                    {/* Dimension line accent above the image */}
                    <motion.div
                        variants={fadeUp}
                        className="mb-4 flex items-center gap-2 text-light-blue/60"
                    >
                        <span className="h-2 w-px bg-current" />
                        <span className="h-px flex-1 bg-current/40" />
                        <span className="font-mono text-[11px] tracking-widest uppercase">Blue Rock Remodeling & Construction</span>
                        <span className="h-px flex-1 bg-current/40" />
                        <span className="h-2 w-px bg-current" />
                    </motion.div>

                    {/* Offset dark square behind */}
                    <div className="absolute inset-x-0 bottom-0 top-10 translate-x-4 translate-y-4 bg-ink border border-light-blue/30" />

                    <BlueprintBox className="group relative z-10 overflow-hidden">
                        {/* Zoom wrapper (kept separate so Framer's reveal transform on the img isn't overridden) */}
                        <div className="overflow-hidden">
                            <motion.img
                                variants={imageReveal}
                                src="/kitchen.jpg"
                                alt="Blue Rock kitchen remodeling project"
                                className="w-full object-cover aspect-[16/9] transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                            />
                        </div>

                        {/* Gradient scrim for badge legibility */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

                        {/* Hover: navy tint */}
                        <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />

                        {/* Hover: blueprint targeting reticle */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 scale-90 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100">
                            <div className="relative h-20 w-20 md:h-24 md:w-24">
                                {/* corner ticks */}
                                <span className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-white/80" />
                                <span className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-white/80" />
                                <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-white/80" />
                                <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-white/80" />
                                {/* crosshair */}
                                <span className="absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-white/80" />
                                <span className="absolute top-1/2 left-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-white/80" />
                            </div>
                        </div>

                        {/* Floating badge */}
                        <motion.div
                            variants={fadeUp}
                            custom={2}
                            className="absolute bottom-5 left-5 md:bottom-7 md:left-7"
                        >
                            <div className="flex items-center gap-4 rounded-sm border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-md">
                                <span className="font-title text-3xl md:text-4xl font-bold text-white leading-none">
                                    2010
                                </span>
                                <span className="font-mono text-[11px] leading-tight tracking-wide text-white/80 uppercase">
                                    Building trust
                                    <br />
                                    across the DMV
                                </span>
                            </div>
                        </motion.div>
                    </BlueprintBox>
                </motion.figure>

                {/* Editorial copy below */}
                <div className="mt-16 md:mt-24 grid gap-10 md:grid-cols-12">
                    {/* Lead statement */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="md:col-span-5"
                    >
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-8 bg-light-blue" />
                            <span className="font-mono text-sm tracking-[0.2em] text-light-blue uppercase">
                                Who we serve
                            </span>
                        </div>
                        <p className="text-3xl md:text-4xl leading-snug tracking-tight text-foreground">
                            A licensed general contractor serving{" "}
                            <span className="text-main-blue">residential, commercial &amp; government</span>{" "}
                            clients across the DMV.
                        </p>
                    </motion.div>

                    {/* Supporting detail */}
                    <motion.div
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="md:col-span-7 space-y-5 md:border-l md:border-dashed md:border-light-blue/30 md:pl-10"
                    >
                        <p className="text-foreground/80 leading-relaxed text-lg md:text-xl">
                            Founded in 2010, <span className="font-semibold">Blue Rock Remodeling &amp; Construction</span>{" "}
                            handles the full scope of work — kitchen and bath remodels, additions, basements,
                            exteriors, and new-home builds — across Maryland, Washington DC, and Virginia.
                        </p>
                        <p className="text-foreground/80 leading-relaxed text-lg md:text-xl">
                            We&apos;re licensed by the Maryland Home Improvement Commission (MHIC) and hold
                            General Contractor and New Home Builder licenses, so every project meets the
                            highest legal and professional standards.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
