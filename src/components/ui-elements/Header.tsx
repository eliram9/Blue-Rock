import Image from "next/image";
import Navbar from "./Navbar";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";
import React from "react";

export default function Header(): React.ReactElement {
    return (
        <header className="w-full shadow-sm bg-white dark:bg-gray-900 transition-colors duration-300">
            <Container>
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/">
                            <Image
                                src="/logos/BR-logo.png"
                                alt="BlueRock Logo"
                                width={200}
                                height={120}
                                priority
                                className="hover:opacity-80 transition-opacity"
                                style={{ width: '200px', height: 'auto' }}
                            />
                        </a>
                    </div>

                    {/* Right side: Navigation + Actions */}
                    <div className="flex items-center gap-8">
                        {/* Navigation */}
                        <Navbar />

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                        {/* Dark mode toggle */}
                        <ThemeToggle />

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                className="text-gray-700 hover:text-main-blue transition-colors"
                                aria-label="Toggle mobile menu"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
}
