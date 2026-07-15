import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";
import React from "react";

export default function Header(): React.ReactElement {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur transition-colors duration-300">
            <Container>
                {/* Three zones: logo · centered nav · actions. The 1fr flanks
                    keep the nav truly centered regardless of side widths. */}
                <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center">
                    {/* Logo */}
                    <div className="justify-self-start">
                        <Link href="/">
                            <Image
                                src="/logos/BR-logo.png"
                                alt="BlueRock Logo"
                                width={200}
                                height={120}
                                priority
                                className="hover:opacity-80 transition-opacity"
                                style={{ width: '200px', height: 'auto' }}
                            />
                        </Link>
                    </div>

                    {/* Centered navigation */}
                    <Navbar />

                    {/* Actions */}
                    <div className="flex items-center gap-4 justify-self-end">
                        {/* Contact CTA — drafting plate, fills on hover */}
                        <Link
                            href="/contact"
                            className="hidden items-center gap-2 border border-main-blue px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-main-blue transition-colors hover:bg-main-blue hover:text-white lg:inline-flex"
                        >
                            Contact Us
                            <span aria-hidden="true">→</span>
                        </Link>

                        {/* Dark mode toggle */}
                        <ThemeToggle />

                        {/* Mobile menu */}
                        <MobileMenu />
                    </div>
                </div>
            </Container>
        </header>
    );
}
