"use client";

import Link from "next/link";
import NavLink from "@/components/ui/NavLink";
import { NAVIGATION_LINKS } from "@/constants/navigation";
import React, { useState, useRef, useEffect } from "react";

export default function Navbar(): React.ReactElement {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (label: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setOpenDropdown(label);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 150);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    /* Contact lives as the CTA button in the header actions, not here */
    const centerLinks = NAVIGATION_LINKS.filter((link) => link.href !== "/contact");

    return (
        <nav className="hidden md:flex md:items-center md:gap-8">
            {centerLinks.map((link) => {
                if (link.dropdown) {
                    return (
                        <div
                            key={link.label}
                            className="relative"
                            onMouseEnter={() => handleMouseEnter(link.label)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-main-blue dark:hover:text-light-blue transition-colors font-medium"
                            >
                                {link.label}
                                <svg
                                    className={`w-4 h-4 transition-transform ${
                                        openDropdown === link.label ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown Menu — drafting sheet, centered under trigger */}
                            {openDropdown === link.label && (
                                <div className="absolute top-full left-1/2 z-50 mt-3 w-52 -translate-x-1/2 border border-border bg-surface shadow-xl">
                                    <div className="border-b border-border px-4 py-2">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                                            {link.label}
                                        </span>
                                    </div>
                                    {link.dropdown.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block px-4 py-2.5 text-foreground font-medium transition-colors hover:bg-surface-muted hover:text-main-blue"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                }

                return (
                    <NavLink key={link.href} href={link.href!}>
                        {link.label}
                    </NavLink>
                );
            })}
        </nav>
    );
}
