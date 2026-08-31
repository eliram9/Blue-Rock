"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { NAVIGATION_LINKS } from "@/constants/navigation";

/** Mobile navigation: a drafting-plate trigger plus a drop sheet anchored to
 *  the bottom of the header.
 *
 *  The sheet and its scrim are positioned `absolute` with `top-full`, which
 *  resolves against the nearest positioned ancestor — the sticky <header>.
 *  That is deliberate: the header row is 64px on small screens and 80px from
 *  `md` up, and `top-full` tracks whichever is current. Do not give this
 *  component's own wrapper a `relative`, and do not swap `top-full` back to a
 *  fixed offset.
 *
 *  The sheet is always mounted and closed with `inert`, not unmounted and not
 *  hidden with `visibility`. Staying mounted leaves something for the CSS
 *  transition to run against, so the whole animation is CSS and no animation
 *  library ships on a component that sits on every route.
 *
 *  `inert` rather than `visibility: hidden` is deliberate. A transitioned
 *  `visibility` interpolates to `hidden` at progress 0, so on the frame the
 *  sheet opens it is still unfocusable and the `.focus()` below would silently
 *  drop focus to <body>. `inert` is not animatable, so it flips in the same
 *  commit as the class change: it takes the rows out of the tab order, out of
 *  the accessibility tree, and out of hit-testing, all synchronously.
 *
 *  Contact is filtered out of the list and rendered as the CTA plate at the
 *  foot of the sheet, mirroring the desktop header where it is the button
 *  rather than a nav link. */
export default function MobileMenu() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const sheetId = useId();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const sheetRef = useRef<HTMLDivElement>(null);

    const close = useCallback((returnFocus = false) => {
        setOpen(false);
        if (returnFocus) triggerRef.current?.focus();
    }, []);

    /* A navigation is a successful dismissal, so the sheet must not survive
       it. Reset during render rather than from an effect: an effect would
       paint one frame of the new route with the old sheet still over it. */
    const [lastPathname, setLastPathname] = useState(pathname);
    if (pathname !== lastPathname) {
        setLastPathname(pathname);
        setOpen(false);
    }

    /* Escape, focus containment, outside dismissal, and scroll lock all only
       exist while the sheet is open, so they share one effect and one teardown. */
    useEffect(() => {
        if (!open) return;

        const sheet = sheetRef.current;
        const focusables = () =>
            Array.from(
                sheet?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
            );

        focusables()[0]?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                close(true);
                return;
            }
            if (event.key !== "Tab") return;

            // The scrim makes this modal, so the trigger and the sheet are the
            // whole tab cycle while it is up.
            const stops = [triggerRef.current, ...focusables()].filter(Boolean) as HTMLElement[];
            if (stops.length === 0) return;

            const first = stops[0];
            const last = stops[stops.length - 1];
            const active = document.activeElement;

            if (event.shiftKey && active === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && active === last) {
                event.preventDefault();
                first.focus();
            }
        };

        const onPointerDown = (event: PointerEvent) => {
            const target = event.target as Node;
            if (sheet?.contains(target) || triggerRef.current?.contains(target)) return;
            close();
        };

        /* Crossing into the desktop layout has to close the sheet, not just
           hide it: `md:hidden` takes the close button away with it, and the
           scroll lock below would otherwise stay on with nothing left on
           screen to release it. 768px is the `md` breakpoint the wrapper
           uses — change both together. */
        const desktop = window.matchMedia("(min-width: 768px)");
        const onBreakpoint = () => {
            if (desktop.matches) setOpen(false);
        };
        onBreakpoint();
        desktop.addEventListener("change", onBreakpoint);

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("pointerdown", onPointerDown);

        /* Scroll lock. The gutter compensation keeps the sticky header and the
           page from jumping sideways when a classic scrollbar is reclaimed —
           on overlay-scrollbar platforms the gutter is 0 and this is a no-op. */
        const { body } = document;
        const gutter = window.innerWidth - document.documentElement.clientWidth;
        const previousOverflow = body.style.overflow;
        const previousPadding = body.style.paddingRight;
        body.style.overflow = "hidden";
        if (gutter > 0) body.style.paddingRight = `${gutter}px`;

        return () => {
            desktop.removeEventListener("change", onBreakpoint);
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("pointerdown", onPointerDown);
            body.style.overflow = previousOverflow;
            body.style.paddingRight = previousPadding;
        };
    }, [open, close]);

    const sheetLinks = NAVIGATION_LINKS.filter((link) => link.href !== "/contact");

    /* Every animated row gets a slot in the open cascade, in visual order.
       Precomputed rather than counted inside the map so the render stays a
       pure function of `sheetLinks` and the delays never drift when the
       navigation constant is reordered. */
    const stagger = new Map<string, number>();
    for (const link of sheetLinks) {
        if (link.dropdown) {
            stagger.set(link.label, stagger.size);
            for (const item of link.dropdown) stagger.set(item.href, stagger.size);
        } else {
            stagger.set(link.href, stagger.size);
        }
    }
    const ctaSlot = stagger.size;

    /* Rows rise and fade on a 28ms cascade. Closing collapses at once: a
       reverse cascade makes dismissal feel slower than it is. The delay is
       carried by the row wrapper, never the link itself, so hover and focus
       colours stay instant instead of inheriting the open delay. */
    const cascade = (slot: number) => ({
        className: `transition-[opacity,transform] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            open ? "translate-y-0 opacity-100 duration-300" : "translate-y-2 opacity-0 duration-150"
        }`,
        style: { transitionDelay: open ? `${60 + slot * 28}ms` : "0ms" },
    });

    /* Rows are 48px+ tall and full-bleed to the sheet's padding box, so the
       target is the row rather than the word. */
    const rowBase =
        "flex items-center touch-manipulation border-l-2 py-3.5 pl-4 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-main-blue";
    const rowFor = (href: string) =>
        pathname === href
            ? `${rowBase} border-main-blue font-semibold text-main-blue`
            : `${rowBase} border-transparent font-medium text-foreground hover:border-main-blue/40 hover:text-main-blue`;

    return (
        <div className="md:hidden">
            <button
                ref={triggerRef}
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls={sheetId}
                onClick={() => setOpen((v) => !v)}
                /* Negative margin buys a 47px touch target without changing
                   the header row height — the same trick as ThemeToggle. The
                   glyph is bare rather than plated, so the box below keeps
                   ThemeToggle's 38.8px track height only to hold the row's
                   vertical rhythm, not to draw anything. */
                className="group -m-1 block cursor-pointer touch-manipulation p-1 focus-visible:outline-none"
            >
                {/* Both glyphs stay mounted in the same grid cell and swap by
                    counter-rotating through each other, so the state change
                    reads as one object turning rather than two icons popping.
                    Mounting both is also what keeps it animatable at all —
                    a conditional swap has nothing to transition from. */}
                <span
                    aria-hidden="true"
                    className="grid h-[2.425rem] w-[2.425rem] place-items-center text-foreground transition-[color,transform] duration-300 ease-out group-hover:text-main-blue group-active:scale-90 group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-main-blue"
                >
                    <IconMenu2
                        size={22}
                        stroke={1.75}
                        className={`col-start-1 row-start-1 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                            open ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
                        }`}
                    />
                    <IconX
                        size={22}
                        stroke={1.75}
                        className={`col-start-1 row-start-1 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                            open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
                        }`}
                    />
                </span>
            </button>

            {/* Scrim. Sized from the header's bottom edge downward rather than
                `fixed inset-0`, so it never paints over the header itself.
                Fades in behind the sheet and out ahead of it. */}
            <div
                aria-hidden="true"
                onClick={() => close()}
                className={`absolute inset-x-0 top-full h-[100dvh] bg-ink/40 transition-opacity ease-out motion-reduce:transition-none ${
                    open ? "opacity-100 duration-300" : "pointer-events-none opacity-0 duration-200"
                }`}
            />

            {/* The sheet unrolls: `clip-path` wipes down from the top edge so
                the panel is revealed in place instead of sliding as a block,
                which is what a drafting sheet being pulled down looks like.
                Clipping also takes the shadow with it, so there is no dark
                halo hanging under a closed panel. */}
            <div
                ref={sheetRef}
                id={sheetId}
                inert={!open}
                className={`absolute inset-x-0 top-full bg-surface shadow-xl transition-[clip-path,opacity] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    open
                        ? "opacity-100 duration-[380ms] [clip-path:inset(0_0_0_0)]"
                        : "pointer-events-none opacity-0 duration-200 [clip-path:inset(0_0_100%_0)]"
                }`}
            >
                {/* Drafting rule. Draws left to right as the sheet comes down
                    and stands in for the header's own hairline, which the
                    sheet covers while it is open. */}
                <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-0.5 origin-left bg-main-blue transition-transform ease-out motion-reduce:transition-none ${
                        open ? "scale-x-100 duration-500" : "scale-x-0 duration-150"
                    }`}
                />

                <nav
                    aria-label="Mobile"
                    className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain px-6 py-4"
                >
                    <ul className="divide-y divide-border">
                        {sheetLinks.map((link) =>
                            link.dropdown ? (
                                <li key={link.label} className="py-3">
                                    <span
                                        className={`block pl-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted ${
                                            cascade(stagger.get(link.label) ?? 0).className
                                        }`}
                                        style={cascade(stagger.get(link.label) ?? 0).style}
                                    >
                                        {link.label}
                                    </span>
                                    {/* Indented under a hairline rule: the group
                                        label is not itself a destination, so the
                                        rule carries the nesting instead. */}
                                    <ul className="mt-1 ml-4 border-l border-border">
                                        {link.dropdown.map((item) => (
                                            <li
                                                key={item.href}
                                                className={cascade(stagger.get(item.href) ?? 0).className}
                                                style={cascade(stagger.get(item.href) ?? 0).style}
                                            >
                                                <Link href={item.href} className={rowFor(item.href)}>
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ) : (
                                <li
                                    key={link.href}
                                    className={cascade(stagger.get(link.href) ?? 0).className}
                                    style={cascade(stagger.get(link.href) ?? 0).style}
                                >
                                    <Link href={link.href} className={rowFor(link.href)}>
                                        {link.label}
                                    </Link>
                                </li>
                            ),
                        )}
                    </ul>

                    {/* Same plate as the desktop header CTA, full-bleed. Last
                        in the cascade, so it lands as the sheet settles. */}
                    <div className={`mt-5 ${cascade(ctaSlot).className}`} style={cascade(ctaSlot).style}>
                        <Link
                            href="/contact"
                            className="flex touch-manipulation items-center justify-between border border-main-blue px-5 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-main-blue transition-colors hover:bg-main-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-blue active:bg-main-blue active:text-white"
                        >
                            Contact Us
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
}
