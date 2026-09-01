"use client";

import { motion } from "framer-motion";
import Blueprint from "@/components/svg/Blueprint";
import Container from "@/components/ui/Container";
import Corners from "@/components/ui/Corners";
import ProjectsBlueprint from "@/components/ui/ProjectsBlueprint";
import SectionHeader from "@/components/ui/SectionHeader";
import BeforeAfter from "@/components/ui/BeforeAfter";
import SheetPair from "@/components/ui/SheetPair";
import ProjectGallery from "@/components/sections/ProjectGallery";
import ProjectGrid from "@/components/sections/ProjectGrid";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { BUSINESS } from "@/lib/site";
import {
    CATEGORY_LABELS,
    PROJECTS,
    projectPosition,
    projectSheetId,
    type Project,
} from "@/lib/projects";

/** "2026-06" -> "June 2026". Only ever called on a value we know exists. */
function formatMonth(value: string): string {
    const [year, month] = value.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });
}

/**
 * The next three projects after this one, wrapping at the end of the list.
 * Position comes from projectPosition (slug match) because this component runs
 * on the client, where `project` is a deserialized copy rather than the
 * PROJECTS entry itself.
 */
function relatedProjects(project: Project): Project[] {
    const start = projectPosition(project);
    if (start === -1) return [];
    return Array.from({ length: 3 }, (_, i) => PROJECTS[(start + 1 + i) % PROJECTS.length]);
}

export default function ProjectDetailSections({ project }: { project: Project }) {
    const studies = project.beforeAfter ?? [];
    const related = relatedProjects(project);

    /* Section numbers count only the sections that actually render, so a
       project with no before/after study does not skip from 01 to 03. */
    let counter = 1;
    const nextIndex = () => String(counter++).padStart(2, "0");
    const overviewIndex = nextIndex();
    const studyIndex = studies.length ? nextIndex() : null;
    const galleryIndex = project.photos.length ? nextIndex() : null;
    const relatedIndex = related.length ? nextIndex() : null;

    const specs: { label: string; value: string }[] = [
        { label: "Category", value: CATEGORY_LABELS[project.category] },
        ...(project.location ? [{ label: "Location", value: project.location }] : []),
        ...(project.completedAt
            ? [{ label: "Completed", value: formatMonth(project.completedAt) }]
            : []),
        {
            label: "Record",
            value: studies.length
                ? "Documented before and after construction"
                : `${1 + project.photos.length} photograph${project.photos.length ? "s" : ""}`,
        },
    ];

    return (
        <>
            {/* ── 01 · Overview ─────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-surface py-16 transition-colors md:py-24">
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
                            prefix="Project"
                            index={overviewIndex}
                            kicker="Overview"
                            title="Scope of Work"
                        />

                        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-x-16">
                            {/* Spec sheet rides alongside the prose on desktop. */}
                            <motion.div variants={fadeUp} className="lg:col-span-5">
                                <div className="relative border border-border bg-surface-muted lg:sticky lg:top-28">
                                    <Corners color="border-main-blue/50" />

                                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-6 py-3">
                                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                                            {BUSINESS.name}
                                        </span>
                                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                                            Sheet PRJ—{projectSheetId(project)} · Rev. A
                                        </span>
                                    </div>

                                    <dl className="divide-y divide-border">
                                        {specs.map((spec) => (
                                            <div key={spec.label} className="px-6 py-5">
                                                <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-main-blue">
                                                    {spec.label}
                                                </dt>
                                                <dd className="mt-2 text-base leading-relaxed text-foreground">
                                                    {spec.value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeUp} className="lg:col-span-7">
                                <p className="max-w-[62ch] border-l-2 border-main-blue pl-5 text-lg leading-relaxed text-foreground md:text-xl">
                                    {project.summary}
                                </p>
                                <p className="mt-8 max-w-[58ch] text-base leading-relaxed text-muted md:text-lg">
                                    Blue Rock Remodeling &amp; Construction handled this
                                    project end to end with one licensed, insured crew,
                                    from drawings and permits through the final
                                    walkthrough. We build across{" "}
                                    {BUSINESS.areaServed.join(" and ")}.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* ── 02 · Before & After (ink) ─────────────────────────────── */}
            {studyIndex && (
                <section className="relative overflow-hidden bg-ink py-16 md:py-24">
                    <Blueprint
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 h-full w-full select-none opacity-40"
                    />

                    <Container className="relative z-10">
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            className="mx-auto max-w-5xl"
                        >
                            <SectionHeader
                                prefix="Project"
                                index={studyIndex}
                                kicker="Before & After"
                                title="The Record"
                                tone="ink"
                            />

                            <div className="mt-20 space-y-20 md:space-y-24">
                                {studies.map((study) => (
                                    <motion.div variants={fadeUp} key={study.caption}>
                                        <p className="max-w-3xl text-base leading-relaxed text-blue-100/80 md:text-lg">
                                            {study.lead}
                                        </p>
                                        <div className="mt-10">
                                            {study.mode === "wipe" ? (
                                                <BeforeAfter
                                                    before={study.before}
                                                    after={study.after}
                                                    caption={study.caption}
                                                    specs={study.specs}
                                                />
                                            ) : (
                                                <SheetPair
                                                    before={study.before}
                                                    after={study.after}
                                                    caption={study.caption}
                                                    specs={study.specs}
                                                />
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </Container>
                </section>
            )}

            {/* ── 03 · Gallery ──────────────────────────────────────────── */}
            {galleryIndex && (
                <section className="bg-surface-muted py-16 transition-colors md:py-24">
                    <Container>
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            className="mx-auto max-w-6xl"
                        >
                            <SectionHeader
                                prefix="Project"
                                index={galleryIndex}
                                kicker="Gallery"
                                title="More Frames"
                            />
                        </motion.div>

                        <div className="mx-auto mt-16 max-w-6xl md:mt-20">
                            <ProjectGallery
                                photos={[project.cover, ...project.photos]}
                                label={project.title}
                            />
                        </div>
                    </Container>
                </section>
            )}

            {/* ── 04 · More work ────────────────────────────────────────── */}
            {relatedIndex && (
                <section className="bg-surface py-16 transition-colors md:py-24">
                    <Container>
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            className="mx-auto max-w-6xl"
                        >
                            <SectionHeader
                                prefix="Project"
                                index={relatedIndex}
                                kicker="Index"
                                title="More Work"
                            />
                        </motion.div>

                        <div className="mx-auto mt-16 max-w-6xl md:mt-20">
                            <ProjectGrid projects={related} />
                        </div>
                    </Container>
                </section>
            )}
        </>
    );
}
