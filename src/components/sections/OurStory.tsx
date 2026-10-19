"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useTransform,
    type Variants,
} from "framer-motion";
import Blueprint from "@/components/svg/BlueprintBright";
import RecognitionLogos from "@/components/ui-elements/RecognitionLogos";
import SectionHeader from "@/components/ui/SectionHeader";
import { stagger } from "@/lib/motion";
import { BUSINESS } from "@/lib/site";

/* Blueprint-style corner brackets wrapper */
function BlueprintBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative border border-brand-light/25 ${className}`}>
            <div className="absolute top-0 left-0 z-10 w-4 h-4 border-t-2 border-l-2 border-brand-light -translate-x-px -translate-y-px" />
            <div className="absolute top-0 right-0 z-10 w-4 h-4 border-t-2 border-r-2 border-brand-light translate-x-px -translate-y-px" />
            <div className="absolute bottom-0 left-0 z-10 w-4 h-4 border-b-2 border-l-2 border-brand-light -translate-x-px translate-y-px" />
            <div className="absolute bottom-0 right-0 z-10 w-4 h-4 border-b-2 border-r-2 border-brand-light translate-x-px translate-y-px" />
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

/* Aperture reveal for the fleet photo: the frame opens from a centred slit. */
const aperture: Variants = {
    hidden: { clipPath: "inset(12% 18% 12% 18%)" },
    visible: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: EASE } },
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

    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLOListElement>(null);
    const [active, setActive] = useState(0);

    /* Slow vertical drift on the fleet photo across the whole band. */
    const { scrollYProgress: sectionProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const photoY = useTransform(sectionProgress, [0, 1], ["-5%", "5%"]);

    /* The timeline spine fills with scroll, and whichever third of it has been
       reached becomes the active milestone. The photo overlay follows it, so
       reading down the story re-captions the fleet shot. State only changes
       when the index does (three times per pass), never per scroll frame. */
    const { scrollYProgress: timelineProgress } = useScroll({
        target: timelineRef,
        offset: ["start 70%", "end 55%"],
    });
    useMotionValueEvent(timelineProgress, "change", (p) => {
        setActive(Math.min(timeline.length - 1, Math.floor(p * timeline.length)));
    });

    const current = timeline[active];

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-ink-raised py-16 md:py-20">
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
                {/* ── Header + editorial intro ── */}
                <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-12 lg:gap-x-16">
                    <motion.div
                        variants={stagger}
                        initial={reduce ? false : "hidden"}
                        whileInView="visible"
                        viewport={viewport}
                        className="md:col-span-5"
                    >
                        <SectionHeader
                            prefix="About"
                            index="02"
                            title="Our Story"
                            meta="2010 — Present · DMV"
                            tone="ink"
                        />
                    </motion.div>

                    <div className="md:col-span-7 md:pt-10">
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
                    </div>
                </div>

                {/* ── Fleet photo (pinned) + scroll-driven timeline ── */}
                <div className="mt-14 grid gap-y-12 md:mt-20 md:grid-cols-12 md:gap-x-12 lg:gap-x-16">
                    <div className="md:col-span-7">
                        <motion.figure
                            variants={reduce ? fadeStill : aperture}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.25 }}
                            className="md:sticky md:top-28"
                        >
                            {/* Offset ink plate behind the frame */}
                            <div className="relative">
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 translate-x-3 translate-y-3 border border-brand-light/20 bg-ink md:translate-x-4 md:translate-y-4"
                                />
                                <BlueprintBox className="group relative overflow-hidden">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <motion.div
                                            style={reduce ? undefined : { y: photoY }}
                                            className="absolute -inset-y-[6%] inset-x-0"
                                        >
                                            <Image
                                                src="/BR-Fleet.webp"
                                                alt="The Blue Rock Remodeling fleet: two branded blue Ford pickup trucks and a white Ram work van parked side by side"
                                                fill
                                                sizes="(min-width: 1200px) 640px, (min-width: 768px) 56vw, calc(100vw - 48px)"
                                                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                                            />
                                        </motion.div>

                                        {/* Scrim for the caption */}
                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />

                                        {/* Live caption: mirrors the active milestone. Hidden from
                                            assistive tech because the timeline already says it. */}
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 md:inset-x-6 md:bottom-6"
                                        >
                                            <div className="flex min-w-0 items-center gap-4 border border-white/15 bg-ink/55 px-4 py-3 backdrop-blur-md md:px-5">
                                                <AnimatePresence mode="wait" initial={false}>
                                                    <motion.div
                                                        key={current.year}
                                                        initial={reduce ? false : { opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.35, ease: EASE }}
                                                        className="flex min-w-0 items-center gap-4"
                                                    >
                                                        <span className="font-title text-2xl leading-none tracking-wide text-white md:text-3xl">
                                                            {current.year}
                                                        </span>
                                                        <span className="truncate font-mono text-[11px] uppercase tracking-widest text-white/80">
                                                            {current.title}
                                                        </span>
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>

                                            {/* Progress ticks */}
                                            <div className="mb-1 flex shrink-0 gap-1.5">
                                                {timeline.map((step, i) => (
                                                    <span
                                                        key={step.year}
                                                        className={`h-1 w-6 transition-colors duration-500 ${
                                                            i <= active ? "bg-brand-light" : "bg-white/25"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </BlueprintBox>
                            </div>
                        </motion.figure>
                    </div>

                    {/* Timeline: the spine fills as you scroll, nodes light as they're passed */}
                    <div className="md:col-span-5">
                        <div className="relative md:pt-6">
                            {/* Track + fill */}
                            <span
                                aria-hidden="true"
                                className="absolute left-[7px] top-2 bottom-8 w-px bg-brand-light/15 md:top-8"
                            />
                            <motion.span
                                aria-hidden="true"
                                style={{ scaleY: reduce ? 1 : timelineProgress }}
                                className="absolute left-[7px] top-2 bottom-8 w-px origin-top bg-gradient-to-b from-brand-light via-brand-light to-brand-light/40 md:top-8"
                            />

                            <ol ref={timelineRef} className="space-y-14 md:space-y-28 md:pb-24">
                                {timeline.map((step, i) => {
                                    const reached = i <= active;
                                    const isActive = i === active;
                                    return (
                                        <motion.li
                                            key={step.year}
                                            variants={fade}
                                            custom={i}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={viewport}
                                            onPointerEnter={(e) => {
                                                if (e.pointerType === "mouse") setActive(i);
                                            }}
                                            aria-current={isActive ? "step" : undefined}
                                            className="relative pl-10"
                                        >
                                            {/* Node: hollow until reached, filled + haloed when active */}
                                            <span
                                                aria-hidden="true"
                                                className={`absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-brand-light ring-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                                    reached ? "bg-brand-light" : "bg-ink-raised"
                                                } ${isActive ? "scale-125 ring-brand-light/25" : "scale-100 ring-ink-raised"}`}
                                            />
                                            <span className="font-mono text-base text-brand-light tracking-widest uppercase">
                                                {step.year}
                                            </span>
                                            <h3
                                                className={`text-white font-semibold text-xl mt-2 mb-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                                    isActive ? "translate-x-1.5" : "translate-x-0"
                                                }`}
                                            >
                                                {step.title}
                                            </h3>
                                            <p className="max-w-[58ch] text-blue-100/85 text-lg leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </motion.li>
                                    );
                                })}
                            </ol>
                        </div>
                    </div>
                </div>

                {/* ── Credentials: one drafting frame, four license cells ── */}
                <div className="mt-20 md:mt-24">
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
                            {/* gap-px over a tinted ground draws the cell rules, so the grid can
                                reflow 1 → 2 → 4 columns without per-cell border bookkeeping. */}
                            <ul className="grid gap-px bg-brand-light/15 sm:grid-cols-2 lg:grid-cols-4">
                                {BUSINESS.licenses.map((license, i) => (
                                    <li key={license} className="group/cell relative overflow-hidden bg-ink-raised p-5 md:p-6">
                                        {/* Hover: fill rises from the base, top rule draws across */}
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0 origin-bottom scale-y-0 bg-brand-light/10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cell:scale-y-100"
                                        />
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand-light transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cell:scale-x-100"
                                        />
                                        <span className="relative mb-3 block font-mono text-base text-brand-light transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cell:translate-x-1">
                                            0{i + 1}
                                        </span>
                                        <span className="relative text-blue-100/95 text-lg leading-snug">{license}</span>
                                    </li>
                                ))}
                            </ul>
                        </BlueprintBox>
                    </motion.div>
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
