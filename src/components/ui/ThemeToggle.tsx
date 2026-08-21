"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import React from "react";
import { useThemeToggle } from "@/hooks/useThemeToggle";

/**
 * Theme switch, drawn as a drafting plate: a sharp-cornered track with the
 * two states side by side and a solid light-blue plate that slides between
 * them. The plate colour is fixed in both themes; only the track flips.
 *
 * Everything visual is driven by the `.dark` class on <html>, never by React
 * state. next-themes sets that class in its pre-hydration script, so the
 * switch is already in the right position on first paint — no mounted guard,
 * no icon swap flash, no layout shift, and no animation library in the header.
 *
 * The glyph inside the plate is a second copy of the icon row, clipped by the
 * plate and counter-translated by exactly the plate's travel. It stays pinned
 * to the track while the plate moves over it, so each icon inverts precisely
 * as the plate's edge crosses it.
 */
export default function ThemeToggle(): React.ReactElement {
    const { toggleTheme } = useThemeToggle();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Centre of the switch, so keyboard activation gets the same origin
        // as a click (pointer coords are 0,0 for Enter/Space).
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    };

    const glide = "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

    // Rendered twice — once resting in the track, once clipped by the plate.
    // Both copies must lay out identically for the inversion to line up.
    const icons = (
        <>
            <span className="grid flex-1 place-items-center">
                <IconSun size={18} stroke={1.75} />
            </span>
            <span className="grid flex-1 place-items-center">
                <IconMoon size={17} stroke={1.75} />
            </span>
        </>
    );

    return (
        <button
            type="button"
            onClick={handleClick}
            // Negative margin keeps the ~47px touch target from changing the
            // header's 80px row height.
            className="group -my-1 block cursor-pointer py-1 focus-visible:outline-none"
        >
            {/* Accessible name flips with the class on <html> too, so it is
                already correct before hydration. */}
            <span className="sr-only">
                <span className="dark:hidden">Switch to dark mode</span>
                <span className="hidden dark:inline">Switch to light mode</span>
            </span>

            {/* Height matches the Contact plate exactly: its `text-xs`
                line-box (0.75rem x 1.4 = 16.8px) + `py-2.5` (20px) + its two
                1px borders = 38.8px = 2.425rem. Width is twice that, so each
                half-cell comes out square. Re-derive if the CTA's padding or
                type scale changes.

                The `border` token (#E5E7EB) disappears against the white header,
                so the track hairline is drawn from `muted` at low alpha instead:
                visible in both modes, without competing with the Contact plate. */}
            <span
                aria-hidden="true"
                className="relative block h-[2.425rem] w-[4.85rem] border border-muted/40 bg-surface-muted transition-[border-color,transform] duration-300 ease-out group-hover:border-main-blue/45 group-active:scale-[0.97] group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-main-blue"
            >
                {/* A single hairline frame, offset outward — the drafting
                    motif kept, but as one calm outline instead of four
                    brackets snapping in at the corners. */}
                <span className="pointer-events-none absolute -inset-[3px] border border-main-blue/0 transition-colors duration-300 group-hover:border-main-blue/20" />

                {/* Resting icons, sitting in the track. `inset-0` spans the
                    full padding box so these cells line up exactly with the
                    plate's copy below — any mismatch shows as a jump when the
                    plate crosses a glyph. */}
                <span className="absolute inset-0 flex text-muted transition-colors duration-300 group-hover:text-main-blue">
                    {icons}
                </span>

                {/* The plate, plus the knocked-out copy of the icon row. The
                    plate is an ink surface: fixed `brand-light` with a white
                    glyph, so it renders identically in both modes and takes no
                    `dark:` colour variant. */}
                <span
                    className={`absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-brand-light shadow-sm transition-shadow duration-300 group-hover:shadow-md dark:translate-x-full ${glide}`}
                >
                    <span
                        className={`absolute inset-y-0 left-0 flex w-[200%] text-white dark:-translate-x-1/2 ${glide}`}
                    >
                        {icons}
                    </span>
                </span>
            </span>
        </button>
    );
}
