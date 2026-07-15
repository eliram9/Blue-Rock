"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselProps {
    images: {
        src: string;
        alt: string;
        title?: string;
        description?: string;
        /** Category label shown as a chip on the main image only,
            e.g. "Residential — Kitchen". */
        tag?: string;
    }[];
    autoplay?: boolean;
    autoplayInterval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    height?: string;
}

export default function Carousel({
    images,
    autoplay = true,
    autoplayInterval = 5000,
    showDots = true,
    showArrows = true,
    height = "h-[500px]",
}: CarouselProps): React.ReactElement {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

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

    // Autoplay functionality
    useEffect(() => {
        if (!autoplay || isAutoplayPaused) return;

        const interval = setInterval(() => {
            goToNext();
        }, autoplayInterval);

        return () => clearInterval(interval);
    }, [autoplay, autoplayInterval, isAutoplayPaused, goToNext]);

    // Touch handlers for swipe
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrevious();
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                goToPrevious();
            } else if (e.key === "ArrowRight") {
                goToNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goToNext, goToPrevious]);

    if (!images || images.length === 0) {
        return <div className="text-gray-500">No images available</div>;
    }

    return (
        <div
            className="relative w-full group"
            onMouseEnter={() => setIsAutoplayPaused(true)}
            onMouseLeave={() => setIsAutoplayPaused(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Main Image Container — blueprint frame with corner brackets */}
            <div className={`relative ${height} overflow-hidden rounded-sm border border-border`}>
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
                            className="object-cover"
                            priority={currentIndex === 0}
                            quality={90}
                        />

                        {/* Category tag — light glass chip so the brand-blue text
                            stays readable over any photo; crossfades with its slide */}
                        {images[currentIndex].tag && (
                            <span className="absolute top-5 left-5 z-20 rounded-sm border border-white/60 bg-white/85 px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand backdrop-blur-sm">
                                {images[currentIndex].tag}
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
                                        <h3 className="mb-2 font-title text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
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

                {/* Autoplay progress hairline — restarts each slide */}
                {autoplay && !isAutoplayPaused && (
                    <motion.span
                        key={currentIndex}
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 z-20 h-0.5 bg-brand-light"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: autoplayInterval / 1000, ease: "linear" }}
                    />
                )}

                {/* Navigation Arrows — inside the frame so top-1/2 centers on
                    the image itself, not the image + thumbnail strip */}
                {showArrows && images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-sm border border-brand-light/40 bg-ink/40 p-3 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-brand-light hover:bg-brand-light/30"
                            aria-label="Previous slide"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-sm border border-brand-light/40 bg-ink/40 p-3 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-brand-light hover:bg-brand-light/30"
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

            {/* Thumbnail Row — fills the full frame width: 5-per-row grid on
                phones (tappable), equal flex-1 strip from sm up */}
            {images.length > 1 && (
                <div className="mt-4 grid grid-cols-5 gap-2 sm:flex md:gap-3 [&>*]:min-w-0 sm:[&>*]:flex-1">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`relative aspect-[16/10] overflow-hidden rounded-sm border transition-all duration-300 ${
                                index === currentIndex
                                    ? "border-main-blue opacity-100 ring-1 ring-main-blue"
                                    : "border-border opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                            }`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                quality={60}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
