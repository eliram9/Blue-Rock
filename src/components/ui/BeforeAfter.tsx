"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate } from "framer-motion";
import Corners from "@/components/ui/Corners";
import { EASE } from "@/lib/motion";

interface Frame {
    src: string;
    alt: string;
    /** Drafting revision label shown in the corner badge, e.g. "Rev. A". */
    label: string;
    /** Short readout under the label, e.g. "Existing structure". */
    note: string;
}

interface BeforeAfterProps {
    before: Frame;
    after: Frame;
    /** Sheet caption rendered in the title block under the frame. */
    caption: string;
    /** Scope readouts rendered as a definition list inside the title block. */
    specs?: { label: string; value: string }[];
}

/** Divider position, in percent, before the first reveal plays. */
const START = 92;
const REST = 50;
const STEP = 2;
const BIG_STEP = 10;

/**
 * Drafting-sheet before/after: two photos of the same elevation stacked, with
 * a draggable revision line wiping between them. The "before" layer is clipped
 * against a `--pos` custom property that pointer, keyboard, and the entrance
 * tween all write directly to the DOM — no React state per frame, so dragging
 * never re-renders the tree.
 *
 * Both images stay in the markup at full alt text regardless of divider
 * position, so crawlers and AI engines read the whole comparison from the
 * server HTML.
 */
export default function BeforeAfter({ before, after, caption, specs }: BeforeAfterProps) {
    const frameRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const posRef = useRef(START);
    const draggingRef = useRef(false);
    const [hintVisible, setHintVisible] = useState(true);

    /* Single writer for the divider: updates the clip and the a11y value
       together so assistive tech never drifts from what is painted. */
    const setPos = useCallback((next: number) => {
        const clamped = Math.min(100, Math.max(0, next));
        posRef.current = clamped;
        frameRef.current?.style.setProperty("--pos", `${clamped}%`);
        handleRef.current?.setAttribute("aria-valuenow", String(Math.round(clamped)));
    }, []);

    /* Entrance: hold on the "before" elevation, then wipe back to a even split
       so the addition reveals itself. Skipped entirely for reduced motion. */
    useEffect(() => {
        const frame = frameRef.current;
        if (!frame) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            setPos(REST);
            return;
        }

        let controls: ReturnType<typeof animate> | undefined;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();
                controls = animate(START, REST, {
                    duration: 1.4,
                    delay: 0.25,
                    ease: EASE,
                    onUpdate: (value) => {
                        /* A drag mid-tween wins: stop animating and leave the
                           divider wherever the pointer put it. */
                        if (draggingRef.current) {
                            controls?.stop();
                            return;
                        }
                        setPos(value);
                    },
                });
            },
            { threshold: 0.35 },
        );

        observer.observe(frame);
        return () => {
            observer.disconnect();
            controls?.stop();
        };
    }, [setPos]);

    const pointerToPos = useCallback(
        (clientX: number) => {
            const rect = frameRef.current?.getBoundingClientRect();
            if (!rect || rect.width === 0) return;
            setPos(((clientX - rect.left) / rect.width) * 100);
        },
        [setPos],
    );

    const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        draggingRef.current = true;
        setHintVisible(false);
        event.currentTarget.setPointerCapture(event.pointerId);
        pointerToPos(event.clientX);
    };

    const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!draggingRef.current) return;
        pointerToPos(event.clientX);
    };

    const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
        draggingRef.current = false;
        event.currentTarget.releasePointerCapture(event.pointerId);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const keyed: Record<string, number> = {
            ArrowLeft: -STEP,
            ArrowRight: STEP,
            PageDown: -BIG_STEP,
            PageUp: BIG_STEP,
        };
        if (event.key in keyed) {
            event.preventDefault();
            setHintVisible(false);
            setPos(posRef.current + keyed[event.key]);
            return;
        }
        if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            setHintVisible(false);
            setPos(event.key === "Home" ? 0 : 100);
        }
    };

    return (
        <figure className="relative">
            <div
                ref={frameRef}
                style={{ "--pos": `${START}%` } as React.CSSProperties}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                className="relative aspect-[3/2] w-full touch-pan-y select-none overflow-hidden border border-brand-light/25 bg-ink-soft"
            >
                <Corners />

                {/* After: the finished elevation, always the full frame */}
                <Image
                    src={after.src}
                    alt={after.alt}
                    fill
                    sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
                    className="pointer-events-none object-cover"
                />

                {/* Before: same elevation, clipped to the left of the divider.
                    Held back in saturation so the eye reads the finished side
                    as the current state and the change lands on the divider. */}
                <div
                    aria-hidden="true"
                    style={{ clipPath: "inset(0 calc(100% - var(--pos)) 0 0)" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={before.src}
                        alt=""
                        fill
                        sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
                        style={{ filter: "saturate(0.3) contrast(1.04) brightness(0.94)" }}
                        className="pointer-events-none object-cover"
                    />
                </div>

                {/* The before photo's alt text, kept readable to crawlers and
                    screen readers even though the layer above is decorative. */}
                <span className="sr-only">{before.alt}</span>

                {/* Revision badges: fixed ink-surface colors on top of a photo */}
                <div className="pointer-events-none absolute left-7 top-7 z-20 border border-brand-light/40 bg-ink/75 px-3 py-2 backdrop-blur-sm md:left-9 md:top-9">
                    <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-light">
                        {before.label}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-100/70">
                        {before.note}
                    </div>
                </div>
                <div className="pointer-events-none absolute right-7 top-7 z-20 border border-brand-light/40 bg-ink/75 px-3 py-2 text-right backdrop-blur-sm md:right-9 md:top-9">
                    <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-light">
                        {after.label}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-100/70">
                        {after.note}
                    </div>
                </div>

                {/* Revision line + grab handle */}
                <div
                    ref={handleRef}
                    role="slider"
                    tabIndex={0}
                    aria-label="Drag to compare the elevation before and after the addition"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={START}
                    aria-valuetext="Percent of the original elevation shown"
                    onKeyDown={onKeyDown}
                    style={{ left: "var(--pos)" }}
                    className="absolute inset-y-0 z-20 w-10 -translate-x-1/2 cursor-ew-resize outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                >
                    <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-brand-light shadow-[0_0_12px_rgba(90,135,221,0.65)]"
                    />
                    <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand-light bg-ink/85 backdrop-blur-sm"
                    >
                        <span className="font-mono text-[13px] leading-none tracking-tighter text-brand-light">
                            {"◀▶"}
                        </span>
                    </span>
                </div>

                {/* Drag hint, retired the moment the visitor takes over */}
                {hintVisible && (
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 border border-brand-light/30 bg-ink/75 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-blue-100/80 backdrop-blur-sm md:bottom-6"
                    >
                        Drag to compare
                    </div>
                )}
            </div>

            {/* Drafting title block: a frosted panel so the copy sits on its
                own surface instead of fighting the blueprint grid and the
                sheet stamp painted behind the section. */}
            <figcaption className="relative mt-6 border border-brand-light/25 bg-ink/70 px-6 py-6 backdrop-blur-md md:px-8 md:py-7">
                <Corners />

                <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-light md:text-sm">
                    Elevation study
                </span>
                <p className="mt-3 max-w-4xl border-l-2 border-brand-light pl-5 text-lg font-medium leading-relaxed text-white md:text-xl">
                    {caption}
                </p>

                {specs && specs.length > 0 && (
                    <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-dashed border-brand-light/20 pt-5">
                        {specs.map((spec) => (
                            <div key={spec.label} className="flex items-baseline gap-2">
                                <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-light">
                                    {spec.label}
                                </dt>
                                <dd className="text-sm leading-relaxed text-blue-100/70">
                                    {spec.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}
            </figcaption>
        </figure>
    );
}
