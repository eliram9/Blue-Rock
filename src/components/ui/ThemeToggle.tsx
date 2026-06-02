"use client";

import { useThemeToggle } from "@/hooks/useThemeToggle";
import { motion } from "framer-motion";
import React from "react";

export default function ThemeToggle(): React.ReactElement {
    const { toggleTheme, isDark, mounted } = useThemeToggle();

    // Prevent rendering until mounted to avoid hydration mismatch
    if (!mounted) {
        return (
            <button
                className="text-gray-700 hover:text-main-blue transition-colors p-2"
                aria-label="Toggle dark mode"
                disabled
            >
                <div className="h-5 w-5" />
            </button>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300 hover:text-main-blue dark:hover:text-light-blue transition-colors p-2 relative"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <div className="relative h-5 w-5">
                {/* Moon Icon with Stars - Show in LIGHT mode (to switch TO dark) */}
                <motion.svg
                    className="absolute inset-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={false}
                    animate={{
                        scale: isDark ? 0 : [1, 1.1, 1],
                        rotate: isDark ? 90 : [0, -5, 5, 0],
                        opacity: isDark ? 0 : 1,
                    }}
                    transition={{
                        scale: {
                            duration: isDark ? 0.3 : 2,
                            ease: "easeInOut",
                            repeat: isDark ? 0 : Infinity,
                            repeatDelay: 1,
                        },
                        rotate: {
                            duration: isDark ? 0.3 : 4,
                            ease: "easeInOut",
                            repeat: isDark ? 0 : Infinity,
                            repeatDelay: 0.5,
                        },
                        opacity: {
                            duration: 0.3,
                            ease: "easeInOut",
                        },
                    }}
                >
                    {/* Moon */}
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                    {/* Star - Top Right */}
                    <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 4l0.5 1.5L21 6l-1.5 0.5L19 8l-0.5-1.5L17 6l1.5-0.5L19 4z"
                        fill="currentColor"
                        initial={false}
                        animate={{
                            opacity: isDark ? 0 : [0.4, 1, 0.4],
                            scale: isDark ? 0 : [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 0.3,
                        }}
                    />
                </motion.svg>

                {/* Sun Icon - Show in DARK mode (to switch TO light) */}
                <motion.svg
                    className="absolute inset-0 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={false}
                    animate={{
                        scale: isDark ? [1, 1.15, 1] : 0,
                        rotate: isDark ? [0, 360] : -90,
                        opacity: isDark ? 1 : 0,
                    }}
                    transition={{
                        scale: {
                            duration: isDark ? 3 : 0.3,
                            ease: "easeInOut",
                            repeat: isDark ? Infinity : 0,
                            repeatDelay: 0.5,
                        },
                        rotate: {
                            duration: isDark ? 8 : 0.3,
                            ease: "linear",
                            repeat: isDark ? Infinity : 0,
                        },
                        opacity: {
                            duration: 0.3,
                            ease: "easeInOut",
                        },
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </motion.svg>
            </div>
        </button>
    );
}
