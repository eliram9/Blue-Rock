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
            {/* First focusable element on every page. Hidden until it takes
                keyboard focus, then drawn as a drafting plate like the CTA. */}
            <a
                href="#main-content"
                className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-3 focus-visible:z-10 focus-visible:border focus-visible:border-main-blue focus-visible:bg-surface focus-visible:px-4 focus-visible:py-2 focus-visible:font-mono focus-visible:text-xs focus-visible:uppercase focus-visible:tracking-[0.2em] focus-visible:text-main-blue"
            >
                Skip to content
            </a>

            <Container>
                {/* Two zones on small screens, three from `md` up.
                    The column count is breakpoint-matched to the Navbar's own
                    `hidden md:flex`: a display:none nav is not a grid item at
                    all, so a fixed three-column track would push the actions
                    into the centre cell and strand a full column of dead space
                    at the right edge. Keep these two breakpoints in sync. */}
                <div className="grid h-16 grid-cols-[auto_1fr] items-center gap-4 md:h-20 md:grid-cols-[1fr_auto_1fr]">
                    {/* Logo — scales with the row so the bar keeps its
                        proportions from 320px up. Intrinsic size is 4020x785;
                        the width/height pair below is that ratio exactly, so
                        the reserved box matches what loads and the header
                        contributes nothing to CLS. */}
                    <div className="min-w-0 justify-self-start">
                        <Link
                            href="/"
                            aria-label="Blue Rock Remodeling, home"
                            className="block touch-manipulation transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main-blue"
                        >
                            <Image
                                src="/logos/BR-logo.png"
                                alt="Blue Rock Remodeling"
                                width={804}
                                height={157}
                                priority
                                className="h-7 w-auto md:h-8 lg:h-9"
                            />
                        </Link>
                    </div>

                    {/* Centred navigation (md and up) */}
                    <Navbar />

                    {/* Actions */}
                    <div className="flex items-center gap-2 justify-self-end sm:gap-3 lg:gap-4">
                        {/* Contact CTA — drafting plate, fills on hover. Held
                            back to `lg`: at `md` the nav plus the plate overrun
                            the 768px row. Below `lg` it lives in the mobile
                            sheet instead, so the action is never absent. */}
                        <Link
                            href="/contact"
                            className="hidden items-center gap-2 border border-main-blue px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-main-blue transition-colors hover:bg-main-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-blue lg:inline-flex"
                        >
                            Contact Us
                            <span aria-hidden="true">&rarr;</span>
                        </Link>

                        {/* Dark mode toggle */}
                        <ThemeToggle />

                        {/* Mobile menu trigger + sheet */}
                        <MobileMenu />
                    </div>
                </div>
            </Container>
        </header>
    );
}
