"use client";

import type { PointerEvent } from "react";
import Image from "next/image";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
    type Variants,
} from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { stagger } from "@/lib/motion";

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

/* Survey-lens hover: the frame dims except for a clear lens that follows the
   cursor, with full-frame drafting hairlines and a coordinate readout pinned to
   it. Pointer position lives in motion values (normalised 0–1), so moving the
   mouse never re-renders React. Only hover-capable devices see any of it: every
   layer is gated on `group-hover`, which Tailwind v4 scopes to `(hover: hover)`. */
function useSurveyLens() {
    const reduce = useReducedMotion();
    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);
    const spring = { stiffness: 260, damping: 30, mass: 0.5 };
    const sx = useSpring(px, spring);
    const sy = useSpring(py, spring);

    const lensX = useTransform(sx, (v) => `${v * 100}%`);
    const lensY = useTransform(sy, (v) => `${v * 100}%`);
    const dim = useMotionTemplate`radial-gradient(circle at ${lensX} ${lensY}, transparent 0px, transparent 110px, color-mix(in srgb, var(--color-ink) 60%, transparent) 230px)`;

    /* Counter-drift: the photo leans away from the cursor by a hair. */
    const driftX = useTransform(sx, [0, 1], ["1.4%", "-1.4%"]);
    const driftY = useTransform(sy, [0, 1], ["1.4%", "-1.4%"]);

    const readX = useTransform(sx, (v) => `X ${String(Math.round(v * 100)).padStart(3, "0")}`);
    const readY = useTransform(sy, (v) => `Y ${String(Math.round(v * 100)).padStart(3, "0")}`);

    const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
    };
    const onPointerLeave = () => {
        px.set(0.5);
        py.set(0.5);
    };

    return {
        handlers: { onPointerMove, onPointerLeave },
        lensX,
        lensY,
        dim,
        drift: reduce ? { x: 0, y: 0 } : { x: driftX, y: driftY },
        readX,
        readY,
    };
}

export default function WhoWeAre() {
    const lens = useSurveyLens();

    return (
        <section className="relative overflow-hidden bg-surface py-16 md:py-20">
            <div className="relative z-10 mx-auto max-w-6xl px-6">
                <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
                    <SectionHeader prefix="About" index="01" title="Who We Are" meta="Est. 2010 · DMV Area" />
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
                        <div {...lens.handlers} className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden">
                            {/* Reveal wipe on the outer layer, cursor drift on the inner one, so
                                the two transforms never fight over the same element. */}
                            <motion.div variants={imageReveal} className="absolute inset-0">
                                <motion.div style={lens.drift} className="absolute -inset-[3%]">
                                    <Image
                                        src="/BR-team.webp"
                                        alt="Two Blue Rock Remodeling crew members standing between a branded company van and a Blue Rock pickup truck in a residential driveway"
                                        fill
                                        sizes="(min-width: 1200px) 1104px, calc(100vw - 48px)"
                                        className="object-cover object-[center_62%]"
                                    />
                                </motion.div>
                            </motion.div>

                            {/* Gradient scrim for badge legibility */}
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

                            {/* ── Hover: survey lens ── */}
                            <motion.div
                                aria-hidden="true"
                                style={{ background: lens.dim }}
                                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
                            />

                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
                            >
                                {/* Edge rulers */}
                                <div className="absolute inset-x-0 top-0 h-2.5 text-white/45 [background:repeating-linear-gradient(to_right,currentColor_0_1px,transparent_1px_24px)]" />
                                <div className="absolute inset-y-0 left-0 w-2.5 text-white/45 [background:repeating-linear-gradient(to_bottom,currentColor_0_1px,transparent_1px_24px)]" />

                                {/* Full-frame hairlines. Each rides a frame-sized wrapper so a
                                    percentage translate maps 1:1 to the cursor position. */}
                                <motion.div style={{ y: lens.lensY }} className="absolute inset-0">
                                    <span className="absolute inset-x-0 top-0 border-t border-dashed border-white/50" />
                                </motion.div>
                                <motion.div style={{ x: lens.lensX }} className="absolute inset-0">
                                    <span className="absolute inset-y-0 left-0 border-l border-dashed border-white/50" />
                                </motion.div>

                                {/* Reticle + coordinate readout at the intersection */}
                                <motion.div style={{ x: lens.lensX, y: lens.lensY }} className="absolute inset-0">
                                    <span className="absolute left-0 top-0 h-7 w-7 -translate-x-1/2 -translate-y-1/2 border border-white/90" />
                                    <span className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-brand-light" />
                                    <span className="absolute left-5 top-5 flex gap-2 whitespace-nowrap bg-ink/75 px-2 py-1 font-mono text-[11px] tracking-widest text-white/90">
                                        <motion.span>{lens.readX}</motion.span>
                                        <motion.span>{lens.readY}</motion.span>
                                    </span>
                                </motion.div>
                            </div>

                        {/* Floating badge */}
                        <motion.div
                            variants={fadeUp}
                            custom={2}
                            className="absolute bottom-5 left-5 md:bottom-7 md:left-7"
                        >
                            <div className="flex items-center gap-4 rounded-sm border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-md">
                                <span className="font-title text-3xl md:text-4xl font-normal text-white leading-none">
                                    2010
                                </span>
                                <span className="font-mono text-[11px] leading-tight tracking-wide text-white/80 uppercase">
                                    Building trust
                                    <br />
                                    across the DMV
                                </span>
                            </div>
                        </motion.div>
                        </div>
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
                        <p className="text-xl md:text-2xl leading-snug tracking-tight text-foreground">
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
                        <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
                            Founded in 2010, <span className="font-semibold">Blue Rock Remodeling &amp; Construction</span>{" "}
                            handles the full scope of work across Maryland and Washington DC: kitchen and
                            bath remodels, additions, basements, exteriors, and new-home builds.
                        </p>
                        <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
                            We&apos;re licensed by the Maryland Home Improvement Commission (MHIC), hold a D.C.
                            Home Improvement Contractor license, and carry General Contractor and New Home
                            Builder licenses, so every project meets the
                            highest legal and professional standards.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
