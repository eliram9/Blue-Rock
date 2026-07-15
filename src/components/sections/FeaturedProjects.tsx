"use client";

import { motion, type Variants } from "framer-motion";
import Carousel from "@/components/ui/Carousel";

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

/* Placeholder set — swap for real project photography as it arrives. */
const PROJECT_SLIDES = [
    {
        src: "/kitchen.jpg",
        alt: "Modern kitchen remodel with custom island and cabinetry",
        title: "Kitchen Transformations",
        tag: "Residential — Kitchen",
        description: "Creating beautiful, functional spaces for your home",
    },
    {
        src: "/kitchen.jpg",
        alt: "Bathroom renovation with modern fixtures",
        title: "Bathroom Renovations",
        tag: "Residential — Bathroom",
        description: "Luxury bathrooms designed for comfort and style",
    },
    {
        src: "/kitchen.jpg",
        alt: "Seamless home addition expanding the living space",
        title: "Home Additions",
        tag: "Residential — Home Addition",
        description: "Expanding your living space with seamless additions",
    },
    {
        src: "/kitchen.jpg",
        alt: "Finished basement converted to a living area",
        title: "Basement Finishing",
        tag: "Residential — Basement",
        description: "Transform your basement into a functional living area",
    },
    {
        src: "/kitchen.jpg",
        alt: "Exterior renovation with new siding and trim",
        title: "Exterior Renovations",
        tag: "Residential — Exterior",
        description: "Curb appeal built to last, from siding to paint",
    },
    {
        src: "/kitchen.jpg",
        alt: "Custom deck and outdoor living space",
        title: "Deck & Outdoor Living",
        tag: "Residential — Outdoor",
        description: "Outdoor spaces built for every season",
    },
    {
        src: "/kitchen.jpg",
        alt: "Custom carpentry and built-in cabinetry",
        title: "Custom Carpentry",
        tag: "Residential — Carpentry",
        description: "Built-ins and millwork crafted to fit",
    },
    {
        src: "/kitchen.jpg",
        alt: "Commercial office build-out",
        title: "Commercial Build-Out",
        tag: "Commercial — Build-Out",
        description: "Turnkey spaces for growing businesses",
    },
];

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
                    className="text-center font-title text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl"
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
                        images={PROJECT_SLIDES}
                        autoplay={true}
                        autoplayInterval={5000}
                        showArrows={true}
                        height="h-[440px] md:h-[560px]"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
