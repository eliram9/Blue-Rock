"use client";

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

    return (
        <nav className="hidden md:flex space-x-8">
            {NAVIGATION_LINKS.map((link) => {
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

                            {/* Dropdown Menu */}
                            {openDropdown === link.label && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                                    {link.dropdown.map((item) => (
                                        <a
                                            key={item.href}
                                            href={item.href}
                                            className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-main-blue dark:hover:text-light-blue transition-colors"
                                        >
                                            {item.label}
                                        </a>
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
