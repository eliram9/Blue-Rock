"use client";

import { motion, type Variants } from "framer-motion";
import Carousel from "@/components/ui/Carousel";
import { HOME_CAROUSEL_SLIDES } from "@/lib/projects";

const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, amount: 0.25 };

const sectionStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Home-page portfolio band: house-style header + blueprint-framed carousel.
 * Themed surface — flips with light/dark.
 */
export default function FeaturedProjects() {
    return (
        <section className="bg-surface-muted py-20 transition-colors md:py-28">
            <motion.div
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mx-auto max-w-6xl px-6"
            >
                {/* Kicker */}
                <motion.div
                    variants={fadeUp}
                    className="mb-4 flex items-center justify-center gap-3"
                >
                    <span className="h-px w-8 bg-main-blue/50" />
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-main-blue">
                        Our portfolio
                    </span>
                    <span className="h-px w-8 bg-main-blue/50" />
                </motion.div>

                {/* Headline */}
                <motion.h2
                    variants={fadeUp}
                    className="text-center font-title text-4xl font-normal uppercase tracking-[0.015em] text-foreground md:text-6xl"
                >
                    Featured Projects
                </motion.h2>

                {/* Accent bar */}
                <motion.div variants={fadeUp} className="mx-auto mt-6 h-0.5 w-20 bg-main-blue" />

                {/* Lead */}
                <motion.p
                    variants={fadeUp}
                    className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted md:text-lg"
                >
                    Explore our portfolio of remodeling projects that showcase our
                    craftsmanship and attention to detail — from first sketch to final
                    walkthrough.
                </motion.p>

                {/* Carousel */}
                <motion.div variants={fadeUp} className="mt-12">
                    <Carousel
                        images={HOME_CAROUSEL_SLIDES}
                        autoplay={true}
                        autoplayInterval={5000}
                        showArrows={true}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
