"use client";

import { motion, MotionConfig } from "framer-motion";
import Blueprint from "@/components/svg/Blueprint";
import BlueprintGrid from "@/components/svg/BlueprintGrid";
import Corners from "@/components/ui/Corners";
import SectionHeader from "@/components/ui/SectionHeader";
import VideoEmbed from "@/components/ui/VideoEmbed";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import type { Video } from "@/lib/videos";

/**
 * Job-site footage band for a service page. One row per video: the framed
 * player on the left, the drafting readout (description + specs) on the right.
 * Renders nothing when the page has no videos, so mounting it is always safe.
 *
 * The caller picks the surface so the band alternates with its neighbours:
 *   themed  bg-surface        (WhoWeAre reference)
 *   muted   bg-surface-muted  (themed, for when the band above is bg-surface)
 *   ink     bg-ink-raised     (OurStory reference)
 */
export default function ServiceVideoBand({
    videos,
    prefix,
    index,
    tone = "themed",
    title = "From the Job Site",
}: {
    videos: Video[];
    prefix: string;
    index: string;
    tone?: "themed" | "muted" | "ink";
    title?: string;
}) {
    if (!videos.length) return null;
    const ink = tone === "ink";

    return (
        <MotionConfig reducedMotion="user">
            <section
                className={`relative overflow-hidden py-16 transition-colors md:py-24 ${
                    ink ? "bg-ink-raised" : tone === "muted" ? "bg-surface-muted" : "bg-surface"
                }`}
            >
                {ink ? (
                    <Blueprint
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 h-full w-full select-none opacity-40"
                    />
                ) : (
                    <BlueprintGrid
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 h-full w-full select-none text-light-blue opacity-40"
                    />
                )}

                <div className="relative z-10 mx-auto max-w-6xl px-6">
                    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
                        <SectionHeader prefix={prefix} index={index} title={title} tone={ink ? "ink" : "themed"} />
                    </motion.div>

                    {videos.map((video) => (
                        <motion.div
                            key={video.youtubeId}
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-14"
                        >
                            {/* Frame: corner brackets + the offset ink plate from WhoWeAre */}
                            <motion.div variants={fadeUp} className="relative lg:col-span-8">
                                <div
                                    aria-hidden="true"
                                    className={`absolute inset-x-0 top-0 aspect-video translate-x-3 translate-y-3 border bg-ink md:translate-x-4 md:translate-y-4 ${
                                        ink ? "border-brand-light/30" : "border-light-blue/30"
                                    }`}
                                />
                                {/* Brackets hug the 16:9 frame only, not the caption below it */}
                                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 aspect-video">
                                    <Corners color={ink ? "border-brand-light" : "border-light-blue"} />
                                </div>
                                <div className="relative">
                                    <VideoEmbed
                                        video={video}
                                        tone={ink ? "ink" : "themed"}
                                        sizes="(min-width: 1200px) 720px, (min-width: 1024px) 62vw, calc(100vw - 48px)"
                                    />
                                </div>
                            </motion.div>

                            {/* Readout rail */}
                            <motion.div
                                variants={fadeUp}
                                className={`lg:col-span-4 lg:border-l lg:border-dashed lg:pl-10 ${
                                    ink ? "lg:border-brand-light/30" : "lg:border-light-blue/30"
                                }`}
                            >
                                <p
                                    className={`text-base leading-relaxed md:text-lg ${
                                        ink ? "text-blue-100/85" : "text-foreground/80"
                                    }`}
                                >
                                    {video.description}
                                </p>

                                {video.specs?.length ? (
                                    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-1">
                                        {video.specs.map((spec) => (
                                            <div key={spec.label}>
                                                <dt
                                                    className={`font-mono text-xs uppercase tracking-[0.2em] ${
                                                        ink ? "text-brand-light" : "text-main-blue"
                                                    }`}
                                                >
                                                    {spec.label}
                                                </dt>
                                                <dd
                                                    className={`mt-1 text-base font-semibold ${ink ? "text-white" : "text-foreground"}`}
                                                >
                                                    {spec.value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                ) : null}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </MotionConfig>
    );
}
