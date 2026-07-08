"use client";

import { motion, type Variants } from "framer-motion";
import Blueprint from "../../../public/svg/test3-bright";
import Button from "@/components/ui/Button";
import { BUSINESS } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, amount: 0.4 };

/* Card orchestrates a staggered cascade: corners draw in, then content. */
const cardStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* Each corner bracket scales up from its own corner — the frame "assembles". */
const cornerVariant: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: EASE } },
};

/* Headline words rise from behind a clip mask, one after another. */
const headlineStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};
const wordVariant: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

const HEADLINE = "Ready to Transform Your Home?";
const ACCENT_WORD = "Transform";

const corners = [
    { pos: "top-0 left-0", edges: "border-t-2 border-l-2", origin: "top left" },
    { pos: "top-0 right-0", edges: "border-t-2 border-r-2", origin: "top right" },
    { pos: "bottom-0 left-0", edges: "border-b-2 border-l-2", origin: "bottom left" },
    { pos: "bottom-0 right-0", edges: "border-b-2 border-r-2", origin: "bottom right" },
];

export default function ReadyToTransform() {
    return (
        <section className="relative overflow-hidden border-t-2 border-brand-light/25 bg-gradient-to-b from-steel-top to-steel-bottom py-24 md:py-32">
            {/* Bright blueprint variant (test3-bright): soft-light removed, uniform
                white gradient, grid opacity raised — renders crisp bright white. */}
            <Blueprint
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full select-none opacity-90"
            />
            {/* Vignette to focus the card (matches the section's lower tone) */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,var(--color-steel-bottom)_95%)]" />

            <div className="relative z-10 mx-auto max-w-4xl px-6">
                {/* Ambient glow that gently breathes behind the card */}
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-light/20 blur-3xl"
                    animate={{ opacity: [0.35, 0.6, 0.35], scale: [0.95, 1.03, 0.95] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                    variants={cardStagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="relative overflow-hidden rounded-sm border border-brand-light/20 bg-gradient-to-b from-ink-soft/70 to-ink/30 px-8 py-14 text-center backdrop-blur-sm md:px-16 md:py-20"
                >
                    {/* Corner brackets that draw themselves in */}
                    {corners.map((c) => (
                        <motion.span
                            key={c.pos}
                            aria-hidden="true"
                            variants={cornerVariant}
                            style={{ transformOrigin: c.origin }}
                            className={`absolute ${c.pos} h-6 w-6 ${c.edges} border-brand-light`}
                        />
                    ))}

                    {/* One-time light sweep across the card as it assembles */}
                    <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: "-150%", opacity: 0 }}
                        whileInView={{ x: "450%", opacity: [0, 1, 0] }}
                        viewport={viewport}
                        transition={{ duration: 1.3, delay: 0.9, ease: EASE }}
                    />

                    {/* Oversized ghost index — continues 01 / 02 from the sections above */}
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none font-title text-[7rem] font-bold leading-none text-brand-light/[0.07] md:text-[11rem]"
                    >
                        03
                    </span>

                    {/* Kicker */}
                    <motion.div
                        variants={fadeUp}
                        className="relative mb-6 flex items-center justify-center gap-3"
                    >
                        <span className="h-px w-8 bg-brand-light/50" />
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-light">
                            Let&apos;s build together
                        </span>
                        <span className="h-px w-8 bg-brand-light/50" />
                    </motion.div>

                    {/* Headline — rises word-by-word */}
                    <motion.h2
                        variants={headlineStagger}
                        className="relative font-title text-5xl font-bold uppercase leading-[1.05] tracking-tight text-white md:text-7xl"
                    >
                        {HEADLINE.split(" ").map((word, i) => (
                            <span
                                key={`${word}-${i}`}
                                className="mr-[0.25em] inline-block overflow-hidden pb-2 -mb-2 align-bottom"
                            >
                                <motion.span
                                    variants={wordVariant}
                                    className={`inline-block ${word === ACCENT_WORD ? "text-brand-light" : ""}`}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </motion.h2>

                    {/* Accent bar */}
                    <motion.div
                        variants={fadeUp}
                        className="relative mx-auto mt-6 h-0.5 w-20 bg-brand-light"
                    />

                    {/* Answer-first, fact-dense lead paragraph */}
                    <motion.p
                        variants={fadeUp}
                        className="relative mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-blue-100/80 md:text-xl"
                    >
                        Whether you&apos;re planning a new kitchen, a spa-inspired bathroom, or a full
                        home makeover, {BUSINESS.name} turns your vision into finished work. As a
                        licensed general contractor serving{" "}
                        {BUSINESS.areaServed.join(", ")} since {BUSINESS.foundingYear} — MHIC,
                        General Contractor, and New Home Builder licensed — we deliver residential,
                        commercial, and government projects with transparent pricing and one
                        accountable team from design to final walkthrough.
                    </motion.p>

                    {/* CTA prompt */}
                    <motion.p
                        variants={fadeUp}
                        className="relative mx-auto mt-4 max-w-xl text-base text-blue-100/60"
                    >
                        Contact us today for a free consultation and start building the home
                        you&apos;ve always wanted.
                    </motion.p>

                    {/* Actions */}
                    <motion.div
                        variants={fadeUp}
                        className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <motion.div
                            whileHover={{ y: -3, scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            <Button href="/contact" variant="primary" className="running-border">
                                Get Your Free Consultation
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -3, scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            <Button href="/projects" variant="ghost" className="running-border">
                                View Our Work
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Direct-call affordance (local SEO + conversion) */}
                    <motion.p
                        variants={fadeUp}
                        className="relative mt-6 font-mono text-sm text-blue-100/50"
                    >
                        Or call{" "}
                        <a
                            href={`tel:${BUSINESS.phone}`}
                            className="text-brand-light transition-colors hover:text-white"
                        >
                            {BUSINESS.phoneDisplay}
                        </a>
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
