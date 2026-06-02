import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { NAVIGATION_LINKS } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/config";
import { SOCIAL_LINKS } from "@/constants/social";

export default function Footer(): React.ReactElement {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-gray-900 border-t border-gray-800 transition-colors duration-300 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/kitchen.jpg"
                    alt="Footer background"
                    fill
                    className="object-cover"
                    quality={75}
                />
                <div className="absolute inset-0 bg-gray-900/90" />
            </div>

            {/* Content */}
            <Container className="relative z-10">
                {/* Section 1: Logo Centered */}
                <div className="py-12 flex justify-center">
                    <a href="/">
                        <Image
                            src="/logos/BR-logo2.png"
                            alt="BlueRock Logo"
                            width={120}
                            height={72}
                            className="hover:opacity-80 transition-opacity"
                            style={{ width: '120px', height: 'auto' }}
                        />
                    </a>
                </div>

                {/* Section 2: Contact Info + Navigation */}
                <div className="py-8 border-t border-gray-700 grid md:grid-cols-2 gap-8">
                    {/* Left Column: Contact Information */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                            Contact Us
                        </h3>
                        <div className="space-y-3 text-gray-400">
                            {/* Phone */}
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 flex-shrink-0 text-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a
                                    href={`tel:${SITE_CONFIG.phone}`}
                                    className="hover:text-light-blue transition-colors"
                                >
                                    {SITE_CONFIG.phoneDisplay}
                                </a>
                            </div>

                            {/* Email */}
                            {SITE_CONFIG.email && (
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 flex-shrink-0 text-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a
                                        href={`mailto:${SITE_CONFIG.email}`}
                                        className="hover:text-light-blue transition-colors"
                                    >
                                        {SITE_CONFIG.email}
                                    </a>
                                </div>
                            )}

                            {/* Address */}
                            {SITE_CONFIG.address && (
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p className="text-sm">
                                        {SITE_CONFIG.address}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Social Media Icons (SVG) */}
                        <div className="flex gap-2 mt-6">
                            {/* Google */}
                            <a
                                href={SOCIAL_LINKS.google}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our Google page"
                                className="text-gray-400 hover:text-light-blue transition-colors border border-light-blue rounded-full p-1.5 hover:border-white"
                            >
                                <Image
                                    src="/svg/google.svg"
                                    alt="Google"
                                    width={16}
                                    height={16}
                                    className="w-4 h-4"
                                />
                            </a>

                            {/* Yelp */}
                            <a
                                href={SOCIAL_LINKS.yelp}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our Yelp page"
                                className="text-gray-400 hover:text-light-blue transition-colors border border-light-blue rounded-full p-1.5 hover:border-white"
                            >
                                <Image
                                    src="/svg/yelp.svg"
                                    alt="Yelp"
                                    width={16}
                                    height={16}
                                    className="w-4 h-4"
                                />
                            </a>

                            {/* Houzz */}
                            <a
                                href={SOCIAL_LINKS.houzz}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our Houzz page"
                                className="text-gray-400 hover:text-light-blue transition-colors border border-light-blue rounded-full p-1.5 hover:border-white"
                            >
                                <Image
                                    src="/svg/houzz.svg"
                                    alt="Houzz"
                                    width={16}
                                    height={16}
                                    className="w-4 h-4"
                                />
                            </a>

                            {/* HomeAdvisor */}
                            <a
                                href={SOCIAL_LINKS.homeadvisor}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our HomeAdvisor page"
                                className="text-gray-400 hover:text-light-blue transition-colors border border-light-blue rounded-full p-1.5 hover:border-white"
                            >
                                <Image
                                    src="/svg/homeadvisor.svg"
                                    alt="HomeAdvisor"
                                    width={16}
                                    height={16}
                                    className="w-4 h-4"
                                />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Navigation Links */}
                    <nav className="md:text-right">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                            Navigation
                        </h3>
                        <ul className="space-y-3">
                            {NAVIGATION_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-light-blue transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Section 3: Social Media Logos */}
                    {/* <div className="py-8 border-t border-gray-700">
                    <div className="flex justify-center items-center gap-6 flex-wrap"> */}
                        {/* Facebook */}
                        
                        {/* Instagram */}

                        {/* Yelp */}
                      
                        {/* Google */}
                       
                        {/* BBB */}
                        {/* <a
                            href={SOCIAL_LINKS.bbb}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our BBB page"
                            className="opacity-80 hover:opacity-100 transition-all duration-300"
                        >
                            <Image
                                src="/social/bbb.png"
                                alt="Better Business Bureau"
                                width={160}
                                height={80}
                                className="w-40 h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </a> */}

                        {/* Houzz */}
                        {/* <a
                            href={SOCIAL_LINKS.houzz}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our Houzz page"
                            className="opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <Image
                                src="/social/houzz.png"
                                alt="Houzz"
                                width={160}
                                height={80}
                                className="w-40 h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </a> */}

                        {/* HomeAdvisor */}
                        {/* <a
                            href={SOCIAL_LINKS.homeadvisor}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our HomeAdvisor page"
                            className="opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <Image
                                src="/social/home-adv3.webp"
                                alt="HomeAdvisor"
                                width={160}
                                height={80}
                                className="w-40 h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </a> */}

                        {/* Yelp */}
                        {/* <a
                            href={SOCIAL_LINKS.yelp}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our Yelp page"
                            className="opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <Image
                                src="/social/yelp.png"
                                alt="Yelp"
                                width={120}
                                height={80}
                                className="w-30 h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </a> */}

                        {/* BuildZoom */}
                        {/* <a
                            href={SOCIAL_LINKS.buildzoom}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our BuildZoom page"
                            className="opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <Image
                                src="/social/bzoom.png"
                                alt="BuildZoom"
                                width={160}
                                height={80}
                                className="w-40 h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </a> */}

                        {/* Google */}
                        {/* <a
                            href={SOCIAL_LINKS.google}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our Google page"
                            className="opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <Image
                                src="/social/google.png"
                                alt="Google"
                                width={160}
                                height={80}
                                className="w-40 h-14 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </a>
                    </div>
                </div> */}

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
                                <Image
                                    src="/social/bbb.png"
                                    alt="Better Business Bureau"
                                    width={80}
                                    height={40}
                                    className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </div>

                            {/* Powered By */}
                            {SITE_CONFIG.poweredBy && (
                                <p className="text-xs">
                                    Built by <span className="font-medium text-light-blue">{SITE_CONFIG.poweredBy}</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
