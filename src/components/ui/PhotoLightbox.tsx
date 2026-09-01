"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";
import Corners from "@/components/ui/Corners";
import type { ProjectPhoto } from "@/lib/projects";

/**
 * Full-bleed photo viewer, built on the native <dialog> element.
 *
 * <dialog>.showModal() supplies the focus trap, the inert background, Escape
 * to close, and focus restoration to whatever opened it - all of which are
 * easy to get subtly wrong by hand. Everything below is the part the platform
 * does not give us: arrow-key paging and the drafting-sheet frame.
 *
 * Controlled: `index` is the open photo, or null when closed. The parent owns
 * the state so it can also decide whether to mirror it into the URL.
 */
export default function PhotoLightbox({
    photos,
    index,
    label,
    onClose,
    onNavigate,
}: {
    photos: ProjectPhoto[];
    index: number | null;
    /** Accessible name for the dialog, e.g. the project title. */
    label: string;
    onClose: () => void;
    onNavigate: (next: number) => void;
}) {
    const ref = useRef<HTMLDialogElement>(null);
    const open = index !== null;
    const count = photos.length;

    /* Drive the real dialog from the `index` prop rather than rendering
       conditionally - showModal() is what installs the focus trap. */
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (open && !el.open) el.showModal();
        if (!open && el.open) el.close();
    }, [open]);

    const step = useCallback(
        (delta: number) => {
            if (index === null || count < 2) return;
            onNavigate((index + delta + count) % count);
        },
        [index, count, onNavigate],
    );

    const onKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
        }
        /* Escape is left to the dialog's own handling, which fires onClose. */
    };

    const photo = index === null ? null : photos[index];

    return (
        <dialog
            ref={ref}
            aria-label={label}
            onClose={onClose}
            onKeyDown={onKeyDown}
            /* Clicking the backdrop lands on the dialog itself, never a child. */
            onClick={(event) => {
                if (event.target === ref.current) onClose();
            }}
            className="lightbox max-h-none max-w-none overscroll-contain bg-transparent p-0 backdrop:bg-ink/90 backdrop:backdrop-blur-sm"
            style={{ width: "100vw", height: "100dvh" }}
        >
            {photo && (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 md:p-8">
                    {/* Top bar: counter left, close right. */}
                    <div className="flex w-full max-w-5xl shrink-0 items-center justify-between">
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-100/70">
                            {String(index! + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                        </span>
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close photo viewer"
                            className="flex h-10 w-10 items-center justify-center border border-brand-light/30 text-blue-100 transition-colors hover:border-brand-light hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                            style={{ touchAction: "manipulation" }}
                        >
                            <IconX size={20} stroke={1.5} aria-hidden="true" />
                        </button>
                    </div>

                    <figure className="relative flex min-h-0 w-full max-w-5xl flex-1 flex-col">
                        <div className="relative min-h-0 flex-1 border border-brand-light/25 bg-ink-soft">
                            <Corners />
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                sizes="100vw"
                                quality={90}
                                priority
                                className="object-contain p-1.5"
                            />
                        </div>
                        {photo.caption && (
                            <figcaption className="mt-4 shrink-0 border-l-2 border-brand-light pl-4 text-base leading-relaxed text-blue-100/90">
                                {photo.caption}
                            </figcaption>
                        )}
                    </figure>

                    {count > 1 && (
                        <div className="flex shrink-0 items-center gap-3">
                            <button
                                type="button"
                                onClick={() => step(-1)}
                                aria-label="Previous photo"
                                className="flex h-11 w-11 items-center justify-center border border-brand-light/30 text-blue-100 transition-colors hover:border-brand-light hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                                style={{ touchAction: "manipulation" }}
                            >
                                <IconChevronLeft size={20} stroke={1.5} aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                onClick={() => step(1)}
                                aria-label="Next photo"
                                className="flex h-11 w-11 items-center justify-center border border-brand-light/30 text-blue-100 transition-colors hover:border-brand-light hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                                style={{ touchAction: "manipulation" }}
                            >
                                <IconChevronRight size={20} stroke={1.5} aria-hidden="true" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </dialog>
    );
}
