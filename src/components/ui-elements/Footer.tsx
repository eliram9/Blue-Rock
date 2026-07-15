import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { NAVIGATION_LINKS } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/config";
import { SOCIAL_LINKS } from "@/constants/social";

/* Small linked social icons under "Contact Us". Optional `size` overrides
   the default w-4 glyph for marks that render optically smaller. */
const SOCIAL_ICONS = [
    { href: SOCIAL_LINKS.google, src: "/svg/google-footer.svg", label: "Google" },
    { href: SOCIAL_LINKS.yelp, src: "/svg/yelp-footer.svg", label: "Yelp" },
    { href: SOCIAL_LINKS.houzz, src: "/svg/houzz-footer.svg", label: "Houzz" },
    { href: SOCIAL_LINKS.homeadvisor, src: "/svg/homeadvisor-footer.svg", label: "HomeAdvisor", size: "w-5 h-5" },
    { href: SOCIAL_LINKS.buildzoom, src: "/svg/buildzoom-footer.png", label: "BuildZoom" },
];

/* Weekly schedule for the "Working Hours" column */
const WORKING_HOURS = [
    { day: "Monday", hours: "9:00AM - 5:00PM" },
    { day: "Tuesday", hours: "9:00AM - 5:00PM" },
    { day: "Wednesday", hours: "9:00AM - 5:00PM" },
    { day: "Thursday", hours: "9:00AM - 5:00PM" },
    { day: "Friday", hours: "9:00AM - 5:00PM" },
    { day: "Saturday", hours: "Closed" },
    { day: "Sunday", hours: "Closed" },
];

/* Credential badges above the "Built by" line — add new badges here */
const FOOTER_BADGES = [
    { src: "/social/bbb-footer.png", alt: "Better Business Bureau — Accredited Business, A+ rating" },
    { src: "/social/home-adv2.png", alt: "HomeAdvisor Top Rated" },
];

export default function Footer(): React.ReactElement {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-ink border-t border-gray-800 transition-colors duration-300 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/kitchen.jpg"
                    alt="Footer background"
                    fill
                    className="object-cover"
                    quality={75}
                />
                <div className="absolute inset-0 bg-ink/90" />
            </div>

            {/* Content */}
            <Container className="relative z-10">
                {/* Section 1: Logo Centered */}
                <div className="py-12 flex justify-center">
                    <Link href="/">
                        <Image
                            src="/logos/BR-logo2.png"
                            alt="BlueRock Logo"
                            width={120}
                            height={72}
                            className="hover:opacity-80 transition-opacity"
                            style={{ width: '120px', height: 'auto' }}
                        />
                    </Link>
                </div>

                {/* Section 2: Contact Info + Navigation + Working Hours */}
                <div className="py-8 border-t border-gray-700 grid md:grid-cols-3 gap-8 ">
                    {/* Left Column: Contact Information — flex column so the
                        icons pin to the bottom, matching the tallest column */}
                    <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                            Contact Us
                        </h3>
                        <div className="flex-1 space-y-3 text-gray-400">
                            {/* Phone */}
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 flex-shrink-0 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a
                                    href={`tel:${SITE_CONFIG.phone}`}
                                    className="hover:text-brand-light transition-colors"
                                >
                                    {SITE_CONFIG.phoneDisplay}
                                </a>
                            </div>

                            {/* Email */}
                            {SITE_CONFIG.email && (
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 flex-shrink-0 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a
                                        href={`mailto:${SITE_CONFIG.email}`}
                                        className="hover:text-brand-light transition-colors"
                                    >
                                        {SITE_CONFIG.email}
                                    </a>
                                </div>
                            )}

                            {/* Address */}
                            {SITE_CONFIG.address && (
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p className="text-sm">
                                        {SITE_CONFIG.address}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Social Media Icons — bottom of the Contact Us column */}
                        <div className="mt-6 flex gap-2">
                            {SOCIAL_ICONS.map((icon) => (
                                <a
                                    key={icon.label}
                                    href={icon.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit our ${icon.label} page`}
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-light text-gray-400 transition-colors hover:border-white hover:text-brand-light"
                                >
                                    <Image
                                        src={icon.src}
                                        alt={icon.label}
                                        width={20}
                                        height={20}
                                        className={icon.size ?? "w-4 h-4"}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Middle Column: Navigation Links — block centered in its
                        track, text stays left-aligned */}
                    <nav className="md:justify-self-center">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                            Navigation
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {/* Dropdown-only entries (no href) flatten to their children
                                so the footer links every real page. */}
                            {NAVIGATION_LINKS.flatMap((link) =>
                                link.dropdown ? link.dropdown : [link],
                            ).map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-brand-light transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right Column: Working Hours — block at the track's end,
                        text stays left-aligned */}
                    <div className="md:justify-self-end">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                            Working Hours
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            {WORKING_HOURS.map(({ day, hours }) => (
                                <li key={day}>
                                    <span className="text-gray-500">{day}: </span>
                                    <span>{hours}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: License, Copyright, Powered By */}
                <div className="py-6 border-t border-gray-700">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 text-sm text-gray-400">
                        {/* License & Copyright */}
                        <div className="flex flex-col gap-2">
                            {SITE_CONFIG.licenseRemodeling && (
                                <p className="font-medium">
                                    General Contractor License: {SITE_CONFIG.licenseRemodeling}
                                </p>
                            )}
                            {SITE_CONFIG.licenseRemodeling && (
                                <p className="font-medium">
                                    New Home Builder License: {SITE_CONFIG.licenseBuilder}
                                </p>
                            )}
                            <p>
                                © {currentYear} {SITE_CONFIG.companyName}. All rights reserved.
                            </p>
                        </div>

                        {/* Footer Logos & Powered By */}
                        <div className="flex flex-col items-end gap-4">
                            {/* Footer Logos */}
                            <div className="flex items-center gap-4 flex-wrap justify-end">
                                {FOOTER_BADGES.map((badge) => (
                                    <Image
                                        key={badge.src}
                                        src={badge.src}
                                        alt={badge.alt}
                                        width={80}
                                        height={40}
                                        className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                                    />
                                ))}
                            </div>

                            {/* Powered By */}
                            {SITE_CONFIG.poweredBy && (
                                <p className="text-xs">
                                    Built by <span className="font-medium text-brand-light">{SITE_CONFIG.poweredBy}</span>
                                    {" & "}
                                    <a
                                        href="https://iti307.wixstudio.com/itaylevy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium text-brand-light transition-colors hover:text-white"
                                    >
                                        Itay Levy
                                    </a>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
