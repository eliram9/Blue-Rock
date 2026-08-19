"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";
import { flushSync } from "react-dom";

/** Viewport coordinates the theme wipe expands from — normally the centre
 *  of the switch that was activated. */
export type WipeOrigin = { x: number; y: number };

export function useThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();

    // Resolve 'system' to the actual active theme. There is no `mounted` gate
    // any more: ThemeToggle draws itself from the `.dark` class on <html>, not
    // from this value, so nothing renders differently on the server.
    // `currentTheme` is only read inside the click handler, after hydration.
    const currentTheme = theme === "system" ? systemTheme : theme;

    // Toggle off the RESOLVED theme so a first click from "system" always
    // flips visibly (using raw `theme` could no-op when OS matches the target).
    //
    // With an origin (and browser + user support) the swap runs inside a View
    // Transition and the incoming theme is revealed as a circle growing out of
    // that point. Everything degrades to a plain setTheme: no origin, reduced
    // motion, or no startViewTransition all take the early return.
    const toggleTheme = useCallback(
        (origin?: WipeOrigin) => {
            const next = currentTheme === "dark" ? "light" : "dark";
            const root = document.documentElement;
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (!origin || prefersReducedMotion || typeof document.startViewTransition !== "function") {
                setTheme(next);
                return;
            }

            // The body's own colour transition would race the wipe (the root
            // snapshot renders live content), so it is parked for the duration.
            root.dataset.themeWipe = "";
            const clearWipe = () => {
                delete root.dataset.themeWipe;
            };

            // flushSync so next-themes has swapped the class on <html> by the
            // time the transition captures the "new" state.
            const transition = document.startViewTransition(() => {
                flushSync(() => setTheme(next));
            });

            transition.ready.then(
                () => {
                    // Radius reaches the furthest viewport corner from the origin.
                    const radius = Math.hypot(
                        Math.max(origin.x, window.innerWidth - origin.x),
                        Math.max(origin.y, window.innerHeight - origin.y),
                    );

                    root.animate(
                        {
                            clipPath: [
                                `circle(0px at ${origin.x}px ${origin.y}px)`,
                                `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
                            ],
                        },
                        {
                            duration: 620,
                            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                            pseudoElement: "::view-transition-new(root)",
                        },
                    );
                },
                () => {
                    /* transition skipped — nothing to animate */
                },
            );

            transition.finished.then(clearWipe, clearWipe);
        },
        [currentTheme, setTheme],
    );

    return {
        theme: currentTheme,
        toggleTheme,
        isDark: currentTheme === "dark",
    };
}
