"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PHOTO_STATUS_LABELS, type PhotoStatus } from "@/lib/projects";

/**
 * Which surface the carousel is sitting on, per the two-surface model in the
 * dark-mode skill. "themed" uses flipping tokens and is right for a normal
 * page band; "ink" uses the fixed navy/brand tokens and is what a carousel
 * inside the photo modal needs, because that modal is dark in both themes and
 * a flipping `border-border` would go pale-on-navy in light mode.
 */
type CarouselTone = "themed" | "ink";

interface CarouselProps {
    images: {
        src: string;
        alt: string;
        title?: string;
        description?: string;
        /** Label chipped on the top left of the main image, e.g. a category
            on the home page or the project's city in the photo modal. */
        tag?: string;
        /** Optional second chip beside `tag`. Omit for finished work. */
        status?: PhotoStatus;
    }[];
    autoplay?: boolean;
    autoplayInterval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    /** Frame height. Leave unset — every carousel on the site shares one
        height so slides read as the same size from section to section. */
    height?: string;
    tone?: CarouselTone;
}

/* The only classes that differ between the two surfaces. Everything else in
   the carousel is already fixed-token or photo, so it reads the same on both. */
const TONES: Record<
    CarouselTone,
    { frame: string; thumb: string; thumbActive: string; thumbWidth: string }
> = {
    themed: {
        frame: "border-border",
        thumb: "border-border",
        thumbActive: "border-main-blue ring-1 ring-main-blue",
        thumbWidth: "",
    },
    ink: {
        frame: "border-brand-light/25",
        thumb: "border-brand-light/20",
        thumbActive: "border-brand-light ring-1 ring-brand-light",
        /* A page band can be as tall as it likes; the modal has to fit inside
           one viewport. Without a cap, `flex-1` stretches a three-photo strip
           to ~376px per thumb, which at 16/10 is a 235px band that pushes the
           frame off a short laptop window. 150px also matches the `sizes` hint
           below, so the browser stops requesting a file too small for its box. */
        thumbWidth: "sm:max-w-[150px]",
    },
};

export default function Carousel({
    images,
    autoplay = true,
    autoplayInterval = 5000,
    showDots = true,
    showArrows = true,
    height = "h-[460px] md:h-[580px]",
    tone = "themed",
}: CarouselProps): React.ReactElement {
    const toneClasses = TONES[tone];
    const [currentIndex, setCurrentIndex] = useState(0);
    /* Hover and focus pause on separate flags rather than one shared boolean:
       a keyboard reader parked on the frame must not be un-paused by a stray
       mouse-leave somewhere else, and vice versa. */
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isTabHidden, setIsTabHidden] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const autoplayPaused = isHovered || isFocused || isTabHidden;

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const goToSlide = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }, [images.length]);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    }, [images.length]);

    /* A backgrounded tab keeps firing timers but stops settling Framer's exit
       animations, so every autoplay tick left another full-size slide mounted
       behind the live one. A tab parked on this page came back holding a dozen
       dead <Image> layers. Freezing autoplay while the tab is hidden stops the
       pile-up at the source, and freezes the progress hairline with it. */
    useEffect(() => {
        const syncVisibility = () => setIsTabHidden(document.hidden);
        syncVisibility();
        document.addEventListener("visibilitychange", syncVisibility);
        return () =>
            document.removeEventListener("visibilitychange", syncVisibility);
    }, []);

    /* Autoplay clock. The timer is rebuilt on every pause, so it carries the
       time it had left across the gap - restarting a whole interval on
       mouse-leave would drift out of step with the progress hairline, which
       freezes and resumes in place. And any slide change (autoplay, arrow,
       swipe, thumbnail) resets it to a full interval: the old setInterval kept
       its own phase through a manual change, so a swipe could be followed a
       blink later by an autoplay advance, under a bar that had just restarted. */
    const remainingRef = useRef(autoplayInterval);
    const resumedAtRef = useRef(0);

    useEffect(() => {
        remainingRef.current = autoplayInterval;
    }, [currentIndex, autoplayInterval]);

    useEffect(() => {
        if (!autoplay || autoplayPaused) return;

        resumedAtRef.current = Date.now();
        const timer = setTimeout(goToNext, remainingRef.current);

        return () => {
            clearTimeout(timer);
            remainingRef.current = Math.max(
                0,
                remainingRef.current - (Date.now() - resumedAtRef.current),
            );
        };
    }, [autoplay, autoplayPaused, goToNext, currentIndex]);

    // Touch handlers for swipe
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        /* Null checks, not falsy ones: a swipe begun hard against the left edge
           reports clientX 0, which the old guard threw away. */
        if (touchStart === null || touchEnd === null) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrevious();
        }

        setTouchStart(null);
        setTouchEnd(null);
    };

    /* Arrow keys used to be bound to window, so every mounted carousel answered
       every keypress: this band advanced while the reader was three sections
       away, and a photo modal opened over a page carousel drove both at once
       from one press. Scoped to the frame, which is its own tab stop, and the
       page no longer scrolls sideways under the slide it just changed. */
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        e.preventDefault();
        if (e.key === "ArrowLeft") {
            goToPrevious();
        } else {
            goToNext();
        }
    };

    if (!images || images.length === 0) {
        return <div className="text-gray-500">No images available</div>;
    }

    /* Every image stays reachable in the main frame (arrows, swipe, autoplay,
       counter), but the strip below it never grows past MAX_THUMBS — past that
       it becomes a window that slides to keep the active slide in view. */
    const MAX_THUMBS = 8;
    const thumbStart =
        images.length <= MAX_THUMBS
            ? 0
            : Math.min(
                  Math.max(0, currentIndex - Math.floor(MAX_THUMBS / 2)),
                  images.length - MAX_THUMBS,
              );
    const visibleThumbs = images.slice(thumbStart, thumbStart + MAX_THUMBS);

    return (
        <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Project photos"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="relative w-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-blue"
            /* Pointer events rather than mouse events: a tap on a phone fires
               mouseenter with no matching mouseleave, which left autoplay
               paused for good after the first touch. */
            onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setIsHovered(true);
            }}
            onPointerLeave={(e) => {
                if (e.pointerType === "mouse") setIsHovered(false);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    setIsFocused(false);
                }
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Main Image Container — blueprint frame with corner brackets */}
            <div className={`relative ${height} overflow-hidden rounded-sm border ${toneClasses.frame}`}>
                {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((pos) => (
                    <span
                        key={pos}
                        aria-hidden="true"
                        className={`absolute ${pos} z-20 h-5 w-5 border-brand-light`}
                    />
                ))}
                {/* initial={false} + no "wait": slides crossfade in place, so the
                    frame never flashes the empty ground between slides */}
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={images[currentIndex].src}
                            alt={images[currentIndex].alt}
                            fill
                            /* Carousel frames sit in max-w-6xl containers, so the
                               slide never renders wider than ~1150px. Without this
                               Next assumes 100vw and ships a full-viewport file. */
                            sizes="(max-width: 1200px) 100vw, 1150px"
                            className="object-cover"
                            priority={currentIndex === 0}
                            quality={90}
                        />

                        {/* Top left: the label chip. A light glass panel so the
                            brand-blue text stays readable over any photo.
                            Crossfades with its slide. */}
                        {images[currentIndex].tag && (
                            <span className="absolute top-5 left-5 z-20 rounded-sm border border-white/60 bg-white/85 px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand backdrop-blur-sm">
                                {images[currentIndex].tag}
                            </span>
                        )}

                        {/* Bottom left: the timeline stamp. Diagonally opposite
                            the counter and clear of the label above, so the
                            frame reads corner to corner instead of stacking two
                            chips in one corner. Outlined rather than filled, so
                            it never competes with the label for attention.
                            `bottom-6` clears the autoplay hairline that sits at
                            bottom-0 on the page carousels. */}
                        {images[currentIndex].status && (
                            <span className="absolute bottom-6 left-5 z-20 rounded-sm border border-brand-light/60 bg-ink/70 px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-blue-100 backdrop-blur-sm">
                                {PHOTO_STATUS_LABELS[images[currentIndex].status]}
                            </span>
                        )}

                        {/* Optional overlay with title and description */}
                        {(images[currentIndex].title || images[currentIndex].description) && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
                            >
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                    {images[currentIndex].title && (
                                        <h3 className="mb-2 font-title text-2xl font-normal uppercase tracking-[0.015em] text-white md:text-3xl">
                                            {images[currentIndex].title}
                                        </h3>
                                    )}
                                    {images[currentIndex].description && (
                                        <p className="max-w-xl text-sm text-blue-100/80 md:text-base">
                                            {images[currentIndex].description}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Autoplay progress hairline — restarts each slide. The track
                    stays painted at all times so there is always a bar on the
                    image; only the fill moves. Hover-pause freezes the fill via
                    animation-play-state rather than unmounting it, which is what
                    used to make the bar disappear under the cursor. */}
                {autoplay && (
                    <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 z-20 h-1 w-full bg-ink/45"
                    >
                        <span
                            key={currentIndex}
                            className="block h-full bg-brand-light shadow-[0_0_8px_rgba(90,135,221,0.9)]"
                            style={{
                                animation: `carousel-progress ${autoplayInterval}ms linear forwards`,
                                animationPlayState: autoplayPaused ? "paused" : "running",
                            }}
                        />
                    </span>
                )}

                {/* Navigation Arrows — inside the frame so top-1/2 centers on
                    the image itself, not the image + thumbnail strip */}
                {showArrows && images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer rounded-sm border border-brand-light/40 bg-ink/40 p-3 text-white backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100 hover:border-brand-light hover:bg-brand-light/30 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                            aria-label="Previous slide"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer rounded-sm border border-brand-light/40 bg-ink/40 p-3 text-white backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100 hover:border-brand-light hover:bg-brand-light/30 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                            aria-label="Next slide"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}
            </div>


            {/* Slide Counter — drafting-sheet style */}
            <div className="absolute top-5 right-5 z-20 rounded-sm border border-brand-light/30 bg-ink/60 px-3 py-1.5 font-mono text-xs tracking-[0.2em] text-white backdrop-blur-sm">
                {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>

            {/* Thumbnail Row — fills the full frame width: 4-per-row grid on
                phones (tappable), equal flex-1 strip from sm up. Capped at
                MAX_THUMBS so a long gallery does not shrink these to slivers. */}
            {images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-2 sm:flex md:gap-3 [&>*]:min-w-0 sm:[&>*]:flex-1">
                    {visibleThumbs.map((image, i) => {
                        const index = thumbStart + i;
                        return (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1} of ${images.length}`}
                            aria-current={index === currentIndex ? "true" : undefined}
                            className={`relative aspect-[16/10] cursor-pointer overflow-hidden rounded-sm border transition-all duration-300 ${
                                index === currentIndex
                                    ? `${toneClasses.thumbActive} opacity-100`
                                    : `${toneClasses.thumb} opacity-60 grayscale hover:opacity-100 hover:grayscale-0`
                            } ${toneClasses.thumbWidth}`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                /* Four across on mobile, up to eight in an even
                                   flex row above that - never wider than ~150px. */
                                sizes="(max-width: 640px) 25vw, 150px"
                                className="object-cover"
                                quality={60}
                            />
                        </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
