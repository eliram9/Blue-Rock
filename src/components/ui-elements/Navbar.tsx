"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "@/components/ui/NavLink";
import { NAVIGATION_LINKS } from "@/constants/navigation";
import { IconChevronDown } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";

export default function Navbar(): React.ReactElement {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();

    const cancelPendingClose = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const open = (label: string) => {
        cancelPendingClose();
        setOpenDropdown(label);
    };

    const close = () => {
        cancelPendingClose();
        setOpenDropdown(null);
    };

    /* Grace period so the pointer can cross the gap between the trigger and
       the panel without the panel vanishing underneath it. */
    const closeAfterGrace = () => {
        cancelPendingClose();
        timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
    };

    useEffect(() => cancelPendingClose, []);

    /* A navigation closes any open panel: the pointer never "leaves" a link
       that swaps the page out from under it, so no mouseleave ever arrives.
       Reset during render, not from an effect, so the panel is gone in the
       same paint as the new route. A close already queued by the grace timer
       is left alone — when it fires it sets null over null. */
    const [lastPathname, setLastPathname] = useState(pathname);
    if (pathname !== lastPathname) {
        setLastPathname(pathname);
        setOpenDropdown(null);
    }

    useEffect(() => {
        if (!openDropdown) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpenDropdown(null);
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [openDropdown]);

    /* Contact lives as the CTA button in the header actions, not here */
    const centerLinks = NAVIGATION_LINKS.filter((link) => link.href !== "/contact");

    return (
        <nav
            aria-label="Main"
            className="hidden md:flex md:items-center md:gap-6 lg:gap-8"
        >
            {centerLinks.map((link) => {
                if (link.dropdown) {
                    const isOpen = openDropdown === link.label;
                    /* The group has no page of its own, so "current" means the
                       route sits under one of its children. */
                    const isCurrent = link.dropdown.some((item) => pathname === item.href);

                    return (
                        <div
                            key={link.label}
                            className="relative"
                            onMouseEnter={() => open(link.label)}
                            onMouseLeave={closeAfterGrace}
                            /* Keyboard users tab through the trigger and the
                               panel links; the panel closes when focus leaves
                               the group entirely. */
                            onFocus={() => open(link.label)}
                            onBlur={(event) => {
                                if (!event.currentTarget.contains(event.relatedTarget as Node)) close();
                            }}
                        >
                            <button
                                type="button"
                                aria-expanded={isOpen}
                                aria-haspopup="true"
                                onClick={() => (isOpen ? close() : open(link.label))}
                                className={`flex cursor-pointer touch-manipulation items-center gap-1 border-b-2 py-0.5 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main-blue ${
                                    isCurrent
                                        ? "border-main-blue text-main-blue dark:border-light-blue dark:text-light-blue"
                                        : "border-transparent text-gray-700 hover:border-main-blue hover:text-main-blue dark:text-gray-300 dark:hover:border-light-blue dark:hover:text-light-blue"
                                }`}
                            >
                                {link.label}
                                <IconChevronDown
                                    size={16}
                                    stroke={2}
                                    aria-hidden="true"
                                    className={`transition-transform duration-200 motion-reduce:transition-none ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {/* Dropdown Menu — drafting sheet, centred under
                                trigger. The `pt-3` sits inside the hover region
                                so the pointer never crosses a dead gap. */}
                            <div
                                inert={!isOpen}
                                className={`absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-3 transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
                                    isOpen
                                        ? "translate-y-0 opacity-100"
                                        : "pointer-events-none -translate-y-1 opacity-0"
                                }`}
                            >
                                <div className="border border-border bg-surface shadow-xl">
                                    <div className="border-b border-border px-4 py-2">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                                            {link.label}
                                        </span>
                                    </div>
                                    {link.dropdown.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            aria-current={pathname === item.href ? "page" : undefined}
                                            className={`block px-4 py-2.5 font-medium transition-colors hover:bg-surface-muted hover:text-main-blue focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-main-blue ${
                                                pathname === item.href ? "text-main-blue" : "text-foreground"
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                }

                return (
                    <NavLink key={link.href} href={link.href}>
                        {link.label}
                    </NavLink>
                );
            })}
        </nav>
    );
}
