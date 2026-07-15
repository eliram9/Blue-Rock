"use client";

import { useState } from "react";
import Link from "next/link";
import { NAVIGATION_LINKS } from "@/constants/navigation";

/** Mobile navigation: hamburger toggle + slide-down panel. Renders the same
 *  NAVIGATION_LINKS as the desktop Navbar, with dropdown groups flattened
 *  under a mono group label. The header must be `relative` so the panel
 *  anchors below it. */
export default function MobileMenu() {
    const [open, setOpen] = useState(false);

    return (
        <div className="md:hidden">
            <button
                type="button"
                aria-label="Toggle mobile menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="text-gray-700 dark:text-gray-200 hover:text-main-blue transition-colors"
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {open ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {open && (
                <div className="absolute inset-x-0 top-20 z-50 border-t border-border bg-surface shadow-xl">
                    <nav aria-label="Mobile" className="px-6 py-2">
                        {NAVIGATION_LINKS.map((link) =>
                            link.dropdown ? (
                                <div key={link.label} className="border-b border-border py-3">
                                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                                        {link.label}
                                    </div>
                                    <div className="mt-2">
                                        {link.dropdown.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setOpen(false)}
                                                className="block py-1.5 text-foreground transition-colors hover:text-main-blue"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href!}
                                    onClick={() => setOpen(false)}
                                    className="block border-b border-border py-3 font-semibold text-foreground transition-colors last:border-b-0 hover:text-main-blue"
                                >
                                    {link.label}
                                </Link>
                            ),
                        )}
                    </nav>
                </div>
            )}
        </div>
    );
}
