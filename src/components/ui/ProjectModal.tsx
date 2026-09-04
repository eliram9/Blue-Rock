"use client";

import { useEffect, useRef } from "react";
import { IconX } from "@tabler/icons-react";
import Carousel from "@/components/ui/Carousel";
import type { Project } from "@/lib/projects";

/**
 * The project photo viewer: every tile in the grid opens this, whether the
 * project has one frame or twenty.
 *
 * Built on the native <dialog> rather than a portal + hand-rolled trap.
 * showModal() supplies the focus trap, the inert background, Escape to close,
 * and focus restoration to the tile that opened it. Getting those four right
 * by hand is most of an accessibility bug budget.
 *
 * The frame itself is a plain <Carousel tone="ink">, the same component the
 * home page and service pages use. It already carries the counter, the
 * top-left chip, and the eight-thumbnail window, so this file is only the
 * dialog shell around it.
 *
 * Controlled: `project` is the open record, or null when closed, so the grid
 * owns the state.
 */
export default function ProjectModal({
    project,
    onClose,
}: {
    project: Project | null;
    onClose: () => void;
}) {
    const ref = useRef<HTMLDialogElement>(null);
    const open = project !== null;

    /* Drive the real dialog from the prop rather than rendering conditionally.
       showModal() is what installs the focus trap, so the element has to be in
       the tree before it can be opened. */
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (open && !el.open) el.showModal();
        if (!open && el.open) el.close();
    }, [open]);

    /* The cover is the grid tile's image and is deliberately NOT shown here:
       opening a tile should reveal frames you have not already seen, not
       replay the one you just clicked. The modal therefore shows exactly the
       `photos` array from src/data/project-gallery.json, in file order. A
       project with no gallery photos has nothing new to show and gets the
       empty state below rather than a duplicate of its own tile. */
    const slides = project
        ? project.photos.map((photo) => ({
              src: photo.src,
              alt: photo.alt,
              /* The city is the same on every slide, so it reads as a stable
                 stamp even though it crossfades with the frame. Projects
                 whose city is unconfirmed simply carry no chip, because an
                 empty chip reads worse than no chip. */
              tag: project.location ?? undefined,
              status: photo.status,
              description: photo.caption,
          }))
        : [];

    return (
        <dialog
            ref={ref}
            aria-label={project ? `${project.title} photos` : undefined}
            onClose={onClose}
            /* A click that lands on the dialog itself is a backdrop click:
               children never resolve to this element as the target. */
            onClick={(event) => {
                if (event.target === ref.current) onClose();
            }}
            className="max-h-none max-w-none overscroll-contain bg-transparent p-0 backdrop:bg-ink/90 backdrop:backdrop-blur-sm"
            style={{ width: "100vw", height: "100dvh" }}
        >
            {project && (
                <div className="flex h-full w-full items-center justify-center p-4 md:p-8">
                    <div className="flex w-full max-w-6xl flex-col">
                        {/* Sheet header: title left, close right. */}
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <h2 className="font-title text-xl uppercase leading-tight tracking-[0.015em] text-white md:text-2xl">
                                    {project.title}
                                </h2>
                                {/* Optional, and empty on most records today.
                                    Rendered only when there is real copy, so a
                                    blank string never opens a gap under the
                                    title. Edited in project-gallery.json. */}
                                {project.intro && (
                                    <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-blue-100/80">
                                        {project.intro}
                                    </p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close photo viewer"
                                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-brand-light/30 text-blue-100 transition-colors hover:border-brand-light hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                                style={{ touchAction: "manipulation" }}
                            >
                                <IconX size={20} stroke={1.5} aria-hidden="true" />
                            </button>
                        </div>

                        {slides.length > 0 ? (
                            <Carousel
                                key={project.slug}
                                images={slides}
                                tone="ink"
                                /* A viewer who opened a photo is reading it, not
                                   waiting to be advanced past it. Autoplay off also
                                   removes the progress hairline, so there is no
                                   looping animation to gate on reduced motion. */
                                autoplay={false}
                                /* Viewport-relative so the frame plus the eight
                                   thumbnails below it always fit without the dialog
                                   scrolling, down to a short laptop window. */
                                height="h-[42vh] sm:h-[50vh] md:h-[58vh]"
                            />
                        ) : (
                            /* Carousel's own no-images fallback is a themed gray
                               line that disappears on this ink ground, so the
                               empty case is drawn here instead: the same framed
                               well the photos would occupy, holding a plain
                               sentence. Add frames in project-gallery.json and
                               this is replaced automatically. */
                            <div className="flex h-[42vh] items-center justify-center rounded-sm border border-brand-light/25 bg-ink-soft px-6 text-center sm:h-[50vh] md:h-[58vh]">
                                <p className="max-w-[42ch] text-sm leading-relaxed text-blue-100/70">
                                    Photographs of this project are being
                                    prepared. Call {"(240) 750-4889"} and we will
                                    walk you through the work in the meantime.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </dialog>
    );
}
