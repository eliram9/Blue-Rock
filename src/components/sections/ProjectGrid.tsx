"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Corners from "@/components/ui/Corners";
import ProjectModal from "@/components/ui/ProjectModal";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import {
    ADDITION_1,
    ADDITION_3,
    BASEMENT_1,
    BASEMENT_3,
    BATH_7,
    BATH_10,
    BATH_11,
    BATH_12,
    BATH_13,
    CATEGORY_LABELS,
    GARAGE_1,
    KITCHEN_10,
    KITCHEN_11,
    projectSheetId,
    type Project,
} from "@/lib/projects";

/* ── Layout system ─────────────────────────────────────────────────────────
   The portfolio is laid out as a sequence of row compositions rather than a
   uniform card grid. Every tile in a row is the SAME HEIGHT and a DIFFERENT
   WIDTH, which is what lets a wide lead project sit beside a narrow one
   without either being cropped to a card.

   Each layout is a set of column spans against a 12-track grid plus a height
   tier shared by the whole row. Edit or reorder ROW_LAYOUTS to change the
   rhythm of the page; the packer below handles the rest.                    */

type HeightTier = "hero" | "tall" | "mid";

interface RowLayout {
    id: string;
    /** Column spans out of 12. Length = number of projects in the row. */
    spans: number[];
    height: HeightTier;
}

export const ROW_LAYOUTS: RowLayout[] = [
    { id: "feature-left", spans: [7, 5], height: "tall" },
    { id: "triptych", spans: [4, 4, 4], height: "mid" },
    { id: "feature-right", spans: [5, 7], height: "tall" },
    { id: "panorama", spans: [12], height: "hero" },
    { id: "wide-pair", spans: [8, 4], height: "mid" },
    { id: "duo", spans: [6, 6], height: "mid" },
];

/* Used when fewer projects remain than the next layout wants, so the last row
   is always exactly full. A grid with a blank cell at the end is a planning
   error, not a layout. */
const TAIL_LAYOUTS: Record<number, RowLayout> = {
    1: { id: "tail-single", spans: [12], height: "hero" },
    2: { id: "tail-duo", spans: [6, 6], height: "mid" },
    3: { id: "tail-triptych", spans: [4, 4, 4], height: "mid" },
};

/* One shared height on mobile, where everything is a single column anyway, and
   the tier only takes effect once the row actually has columns. */
const HEIGHTS: Record<HeightTier, string> = {
    hero: "h-60 md:h-[30rem]",
    tall: "h-60 md:h-[26rem]",
    mid: "h-60 md:h-[20rem]",
};

const SPAN_CLASS: Record<number, string> = {
    4: "md:col-span-4",
    5: "md:col-span-5",
    6: "md:col-span-6",
    7: "md:col-span-7",
    8: "md:col-span-8",
    12: "md:col-span-12",
};

/**
 * Put a featured project in the row's widest slot when it isn't already.
 *
 * Skipped when every span in the row is equal: there is no widest slot to
 * promote into, so a swap would only scramble the sheet numbers (PRJ-04 landing
 * ahead of PRJ-03) for no visual gain.
 */
function leadWithFeatured(slice: Project[], spans: number[]): Project[] {
    const widest = spans.indexOf(Math.max(...spans));
    if (spans.every((span) => span === spans[0])) return slice;
    const featured = slice.findIndex((p) => p.featured);
    if (featured === -1 || featured === widest) return slice;
    const out = [...slice];
    [out[widest], out[featured]] = [out[featured], out[widest]];
    return out;
}

function packRows(projects: Project[]) {
    const rows: { layout: RowLayout; items: Project[] }[] = [];
    let i = 0;
    let pattern = 0;

    while (i < projects.length) {
        const remaining = projects.length - i;
        let layout = ROW_LAYOUTS[pattern % ROW_LAYOUTS.length];
        if (layout.spans.length > remaining) layout = TAIL_LAYOUTS[remaining];
        const slice = projects.slice(i, i + layout.spans.length);
        rows.push({ layout, items: leadWithFeatured(slice, layout.spans) });
        i += layout.spans.length;
        pattern += 1;
    }
    return rows;
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
    /* One modal for the whole grid; the open tile decides what it shows.
       Every project opens it, including the ones that also build a detail
       page at /projects/<slug> - those routes stay indexable, they are just
       no longer what a tile click goes to. */
    const [active, setActive] = useState<Project | null>(null);

    const rows = packRows(projects);

    return (
        <>
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="space-y-5 md:space-y-6"
            >
                {rows.map((row, r) => (
                    <div
                        key={`${row.layout.id}-${r}`}
                        /* items-stretch is the point: image wells are a fixed
                           height per row and the label strips stretch, so every
                           tile in the row ends flush at the same baseline. */
                        className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-12 md:gap-6"
                    >
                        {row.items.map((project, c) => {
                            const span = row.layout.spans[c];
                            /* Gallery frames only. The cover is the tile the
                               visitor is already looking at and is not shown
                               inside the modal, so counting it here would
                               promise one more photo than they will get. */
                            const count = project.photos.length;

                            return (
                                <motion.div
                                    key={project.slug}
                                    variants={fadeUp}
                                    className={SPAN_CLASS[span]}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setActive(project)}
                                        aria-label={
                                            count === 0
                                                ? `${project.title} - no photographs yet`
                                                : `View ${count} ${
                                                      count === 1 ? "photo" : "photos"
                                                  } of ${project.title}`
                                        }
                                        className="group relative flex h-full w-full cursor-pointer flex-col border border-border bg-surface text-left transition-colors hover:border-main-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-blue"
                                        style={{ touchAction: "manipulation" }}
                                    >
                                        <TileInner
                                            project={project}
                                            span={span}
                                            heightClass={HEIGHTS[row.layout.height]}
                                        />
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                ))}
            </motion.div>

            <ProjectModal project={active} onClose={() => setActive(null)} />
        </>
    );
}

/* Tiles whose mono label prints the city instead of a sheet number, and so
   suppress the location line underneath. Opted into per project rather than
   derived from `location`: four other records carry a city and still lead with
   PRJ-NN, so converting a tile stays a decision rather than a side effect of
   confirming an address. `location` lives on the record rather than here so
   the photo modal stamps the same city on its frames. */
const CITY_LABEL_SLUGS = new Set([
    ADDITION_1.slug,
    ADDITION_3.slug,
    BASEMENT_1.slug,
    BASEMENT_3.slug,
    GARAGE_1.slug,
    BATH_7.slug,
    BATH_10.slug,
    BATH_11.slug,
    KITCHEN_10.slug,
    KITCHEN_11.slug,
    BATH_12.slug,
    BATH_13.slug,
]);

function TileInner({
    project,
    span,
    heightClass,
}: {
    project: Project;
    span: number;
    heightClass: string;
}) {
    /* sizes has to track the real rendered width or next/image ships a file
       that is too large or too small. The grid caps at max-w-6xl, so a span is
       simply its fraction of the viewport once past the mobile stack. */
    const sizes = `(max-width: 768px) 100vw, ${Math.round((span / 12) * 100)}vw`;

    const leadsWithLocation = CITY_LABEL_SLUGS.has(project.slug) && Boolean(project.location);

    return (
        <>
            {/* Corner brackets draw in on hover so the resting page stays calm. */}
            <span className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Corners color="border-main-blue/50" />
            </span>

            <div className={`relative w-full overflow-hidden ${heightClass}`}>
                <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    fill
                    sizes={sizes}
                    quality={80}
                    /* No priority anywhere in the grid: MiniHero's background is
                       the LCP element and preloading tiles would compete with it
                       for bandwidth. The grid starts below the fold. */
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
            </div>

            {/* Measurement line, drawn left to right on hover. */}
            <span
                aria-hidden="true"
                className="block h-px origin-left scale-x-0 bg-main-blue/70 transition-transform duration-500 ease-out group-hover:scale-x-100"
            />

            <div className="flex flex-1 flex-col border-t border-border px-4 py-4 md:px-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-main-blue">
                    {leadsWithLocation ? project.location : `PRJ—${projectSheetId(project)}`} ·{" "}
                    {CATEGORY_LABELS[project.category]}
                </span>
                <h3 className="mt-2 text-base font-semibold leading-snug text-foreground">
                    {project.title}
                </h3>
                {/* Location is null until the client confirms the city, and an
                    empty chip reads worse than no chip. Suppressed when the
                    label above already prints the city, so the tile never
                    stamps it twice. */}
                {project.location && !leadsWithLocation && (
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                        {project.location}
                    </p>
                )}
            </div>
        </>
    );
}
