"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import ProjectsBlueprint from "@/components/ui/ProjectsBlueprint";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectGrid from "@/components/sections/ProjectGrid";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { PROJECTS } from "@/lib/projects";

/**
 * The /projects index band. One chronological grid, no filters - category
 * lives on every record so a filter row is a pure-UI addition later, but the
 * catalog is not yet large enough for filtering to earn its complexity.
 */
export default function ProjectsIndex() {
    return (
        <section className="relative overflow-hidden bg-surface-muted py-16 transition-colors md:py-24">
            <ProjectsBlueprint
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full select-none text-light-blue dark:opacity-50"
            />

            <Container className="relative z-10">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="mx-auto max-w-6xl"
                >
                    <SectionHeader
                        prefix="Projects"
                        index="01"
                        kicker="Index"
                        title="Completed Work"
                    />
                    <motion.p
                        variants={fadeUp}
                        className="mt-8 ml-20 max-w-[58ch] text-base leading-relaxed text-muted md:text-lg"
                    >
                        Kitchens, bathrooms, basements, additions, and exteriors
                        completed across Maryland and Washington, DC, newest work
                        first. Projects with a full set of photographs open to their
                        own page.
                    </motion.p>
                </motion.div>

                <div className="mx-auto mt-16 max-w-6xl md:mt-20">
                    <ProjectGrid projects={PROJECTS} />
                </div>
            </Container>
        </section>
    );
}
