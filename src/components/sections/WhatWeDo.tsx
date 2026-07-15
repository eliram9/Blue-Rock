"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Blueprint from "../../../public/svg/test1";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { FLAGSHIP_SERVICES, MORE_SERVICES, SECTOR_SERVICES, type Service } from "@/lib/services";

/* next/link with motion props — keeps client-side nav + viewport prefetch */
const MotionLink = motion.create(Link);

const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, amount: 0.2 };

const sectionStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function ArrowIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M4 12h15M14 6.5 19.5 12 14 17.5" />
        </svg>
    );
}

/* Full-bleed flagship card: the blueprint→reality render fills the card,
   washed blueprint-blue at rest and "built" to full colour on hover, with
   the content riding a fixed-ink scrim (identical in light & dark). */
function ImageFlagshipCard({
    service,
    index,
    tabIndex,
}: {
    service: Service;
    index: number;
    tabIndex?: number;
}) {
    return (
        <MotionLink
            variants={fadeUp}
            href={service.href}
            tabIndex={tabIndex}
            whileTap={{ scale: 0.98 }}
            className="group relative flex aspect-[3/4] min-w-0 flex-col justify-end overflow-hidden border border-border transition-[flex,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-main-blue/40 md:aspect-[2/3] lg:aspect-auto lg:h-[480px] lg:flex-[1_1_0%] lg:hover:flex-[2.4_1_0%]"
        >
            <Image
                src={service.image!}
                alt={`${service.title} — 3D blueprint render blending into the finished space`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover saturate-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:saturate-100"
            />
            {/* Blueprint-blue wash that lifts on hover — the card "gets built" */}
            <span
                aria-hidden="true"
                className="absolute inset-0 bg-brand/30 mix-blend-multiply transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0"
            />
            {/* Fixed-ink scrim so the on-image text reads in both themes */}
            <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent"
            />

            {/* Corner brackets that appear on hover */}
            {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((pos) => (
                <span
                    key={pos}
                    aria-hidden="true"
                    className={`absolute ${pos} z-10 h-4 w-4 border-brand-light opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
            ))}

            {/* Service icon — top-left, echoing the icon cards */}
            <span aria-hidden="true" className="absolute left-4 top-4 z-10">
                <ServiceIcon
                    slug={service.slug}
                    animated
                    className="h-7 w-7 text-brand-light/80 md:h-8 md:w-8"
                />
            </span>

            {/* Ghost index */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1 z-10 select-none font-title text-6xl font-bold leading-none text-white/25"
            >
                {String(index + 1).padStart(2, "0")}
            </span>

            <span className="relative z-10 flex flex-col p-6">
                <h3 className="font-title text-xl font-bold uppercase tracking-tight text-white transition-[font-size] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:text-2xl">
                    {service.title}
                </h3>
                {/* lg: blurb is the expansion's reward — arrives just after the
                    card starts growing so the motion reads as a sequence */}
                <span className="mt-2 line-clamp-2 text-xs leading-relaxed text-blue-100/80 md:text-[15px] md:leading-relaxed lg:mt-0 lg:max-h-0 lg:opacity-0 lg:transition-all lg:duration-700 lg:ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:mt-2 lg:group-hover:max-h-24 lg:group-hover:opacity-100 lg:group-hover:delay-150">
                    {service.blurb}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-brand-light md:text-sm">
                    View details
                    <ArrowIcon className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5 md:h-4 md:w-4" />
                </span>
            </span>
        </MotionLink>
    );
}

/* Icon flagship card: fallback while a service has no blueprint render yet.
   Hover behavior matches the image cards: accordion expansion only. */
function FlagshipCard({
    service,
    index,
    tabIndex,
}: {
    service: Service;
    index: number;
    tabIndex?: number;
}) {
    return (
        <MotionLink
            variants={fadeUp}
            href={service.href}
            tabIndex={tabIndex}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="group relative flex aspect-[3/4] min-w-0 flex-col border border-border bg-surface p-6 transition-[flex,border-color] duration-500 ease-out hover:border-main-blue/40 md:aspect-[2/3] lg:aspect-auto lg:h-[480px] lg:flex-[1_1_0%] lg:hover:flex-[2.4_1_0%]"
        >
            {/* Corner brackets that appear on hover */}
            {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((pos) => (
                <span
                    key={pos}
                    aria-hidden="true"
                    className={`absolute ${pos} h-4 w-4 border-main-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
            ))}

            {/* Ghost index */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1 select-none font-title text-6xl font-bold leading-none text-light-blue/15"
            >
                {String(index + 1).padStart(2, "0")}
            </span>

            <ServiceIcon
                slug={service.slug}
                animated
                className="mb-5 h-11 w-11 text-main-blue transition-transform duration-300 group-hover:scale-110"
            />
            <h3 className="font-title text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
                {service.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-base">{service.blurb}</p>
            <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-main-blue md:text-sm">
                View details
                <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5 md:h-4 md:w-4" />
            </span>
        </MotionLink>
    );
}

/**
 * Home-page services section: the four flagship specialties as rich cards,
 * with the remaining services in an expandable drawer. All cards render in
 * the server HTML (the drawer is CSS-collapsed, not conditionally rendered)
 * so search and AI crawlers always see the full offering. Themed surface.
 */
export default function WhatWeDo() {
    const [expanded, setExpanded] = useState(false);

    return (
        <section className="relative overflow-hidden bg-surface py-20 transition-colors md:py-28">
            {/* Soft ambient gradient under the blueprint: white → light blue → gray.
                Flipping tokens keep it equally subtle in dark mode. */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-surface via-light-blue/15 to-surface-muted"
            />
            {/* Blueprint background — flips with the theme via text token */}
            <Blueprint
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full select-none text-light-blue opacity-25"
            />

            <motion.div
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="relative z-10 mx-auto max-w-6xl px-6"
            >
                {/* Kicker */}
                <motion.div
                    variants={fadeUp}
                    className="mb-4 flex items-center justify-center gap-3"
                >
                    <span className="h-px w-8 bg-main-blue/50" />
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-main-blue">
                        What we do
                    </span>
                    <span className="h-px w-8 bg-main-blue/50" />
                </motion.div>

                {/* Headline */}
                <motion.h2
                    variants={fadeUp}
                    className="mx-auto text-center font-title text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl"
                >
                    A Wide Range of General Construction Services
                </motion.h2>

                {/* Accent bar */}
                <motion.div variants={fadeUp} className="mx-auto mt-6 h-0.5 w-20 bg-main-blue" />

                {/* Lead */}
                <motion.p
                    variants={fadeUp}
                    className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted md:text-lg"
                >
                    From full kitchen and bathroom remodels to additions and finished
                    basements — our core specialties, backed by a licensed team that
                    covers every trade in between.
                </motion.p>

                {/* Flagship four */}
                {/* lg: flex accordion — the hovered card grows, siblings yield */}
                <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:flex">
                    {FLAGSHIP_SERVICES.map((service, i) =>
                        service.image ? (
                            <ImageFlagshipCard key={service.slug} service={service} index={i} />
                        ) : (
                            <FlagshipCard key={service.slug} service={service} index={i} />
                        ),
                    )}
                </div>

                {/* Expandable drawer — always in the DOM, CSS-collapsed */}
                <div
                    id="more-services"
                    aria-hidden={!expanded}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                        expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                    <div className="overflow-hidden">
                        {/* Same card treatment + accordion row as the flagship four */}
                        <div className="grid grid-cols-1 gap-5 pt-5 sm:grid-cols-2 lg:flex">
                            {MORE_SERVICES.map((service, i) =>
                                service.image ? (
                                    <ImageFlagshipCard
                                        key={service.slug}
                                        service={service}
                                        index={i + FLAGSHIP_SERVICES.length}
                                        tabIndex={expanded ? undefined : -1}
                                    />
                                ) : (
                                    <FlagshipCard
                                        key={service.slug}
                                        service={service}
                                        index={i + FLAGSHIP_SERVICES.length}
                                        tabIndex={expanded ? undefined : -1}
                                    />
                                ),
                            )}
                        </div>

                        {/* Third row: the other two sectors we serve */}
                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:flex">
                            {SECTOR_SERVICES.map((service, i) =>
                                service.image ? (
                                    <ImageFlagshipCard
                                        key={service.slug}
                                        service={service}
                                        index={i + FLAGSHIP_SERVICES.length + MORE_SERVICES.length}
                                        tabIndex={expanded ? undefined : -1}
                                    />
                                ) : (
                                    <FlagshipCard
                                        key={service.slug}
                                        service={service}
                                        index={i + FLAGSHIP_SERVICES.length + MORE_SERVICES.length}
                                        tabIndex={expanded ? undefined : -1}
                                    />
                                ),
                            )}
                        </div>
                    </div>
                </div>

                {/* Toggle */}
                <motion.div variants={fadeUp} className="mt-10 flex justify-center">
                    <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls="more-services"
                        onClick={() => setExpanded((v) => !v)}
                        className="group inline-flex items-center gap-3 border border-border bg-surface px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-main-blue/50 hover:text-main-blue"
                    >
                        <span
                            aria-hidden="true"
                            className={`text-base leading-none text-main-blue transition-transform duration-300 ${
                                expanded ? "rotate-45" : ""
                            }`}
                        >
                            +
                        </span>
                        {expanded
                            ? "Show less"
                            : `${MORE_SERVICES.length + SECTOR_SERVICES.length} more services`}
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
}
