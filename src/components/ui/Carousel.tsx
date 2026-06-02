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
            {/* Main Image Container */}
            <div className={`relative ${height} overflow-hidden rounded-lg`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
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

                        {/* Optional overlay with title and description */}
                        {(images[currentIndex].title || images[currentIndex].description) && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                            >
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                    {images[currentIndex].title && (
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                            {images[currentIndex].title}
                                        </h3>
                                    )}
                                    {images[currentIndex].description && (
                                        <p className="text-sm md:text-base text-white/90 max-w-xl">
                                            {images[currentIndex].description}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {showArrows && images.length > 1 && (
                <>
                    {/* Previous Button */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-full p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                        aria-label="Previous slide"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-full p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                        aria-label="Next slide"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}


            {/* Slide Counter */}
            <div className="absolute top-6 right-6 z-20 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`relative aspect-[4/3] rounded-md overflow-hidden transition-all duration-300 ${
                                index === currentIndex
                                    ? "ring-4 ring-light-blue opacity-100"
                                    : "opacity-60 hover:opacity-100"
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
