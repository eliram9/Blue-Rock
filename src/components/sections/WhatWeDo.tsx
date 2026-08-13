"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
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

/* ── Hover choreography ────────────────────────────────────────────────────
   One timing scale for every layer of a card so the states land together.
   Rules that keep the accordion smooth:
     · flex-grow is the ONLY layout property allowed in flight, and only for
       the 420ms expansion window. Everything else is opacity/filter/transform.
     · The reveal is sequenced, not simultaneous: the card widens first, the
       blurb arrives as it settles. Exit has no delay so leaving feels prompt.
     · Card titles reserve two lines at lg so nothing re-wraps mid-animation. */
const EXPAND = "duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";
const TINT = "duration-[420ms] ease-out motion-reduce:transition-none";

/* Hovering the card OR tabbing to it drives the same state. */
const OPEN = "group-hover:opacity-100 group-focus-visible:opacity-100";
const FOCUS_RING =
    "outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand-light";

const CORNERS = [
    "top-0 left-0 border-t-2 border-l-2",
    "top-0 right-0 border-t-2 border-r-2",
    "bottom-0 left-0 border-b-2 border-l-2",
    "bottom-0 right-0 border-b-2 border-r-2",
];

/* Shared accordion geometry: equal at rest, hovered/focused card takes 2.4x.
   transition-property is flex-grow only — not the `flex` shorthand, which
   would also interpolate basis and shrink for no visual gain. */
const ACCORDION = `transition-[flex-grow,border-color] ${EXPAND} lg:aspect-auto lg:h-[480px] lg:flex-[1_1_0%] lg:hover:flex-[2.4_1_0%] lg:focus-visible:flex-[2.4_1_0%]`;

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

/** Corner brackets that fade in once the card has started opening. */
function CornerBrackets({ tone }: { tone: string }) {
    return (
        <>
            {CORNERS.map((pos) => (
                <span
                    key={pos}
                    aria-hidden="true"
                    className={`absolute ${pos} ${tone} ${OPEN} z-10 h-4 w-4 opacity-0 transition-opacity duration-200 ease-out delay-0 group-hover:delay-100 group-focus-visible:delay-100 motion-reduce:transition-none`}
                />
            ))}
        </>
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
            /* `isolate` scopes the multiply wash to the card. Without it the
               blend reaches the section's blueprint SVG and repaints it. */
            className={`group relative isolate flex aspect-[3/4] min-w-0 flex-col justify-end overflow-hidden border border-border hover:border-main-blue/40 focus-visible:border-main-blue/40 md:aspect-[2/3] ${FOCUS_RING} ${ACCORDION}`}
        >
            <Image
                src={service.image!}
                alt={`${service.title} — 3D blueprint render blending into the finished space`}
                fill
                /* Sized for the EXPANDED card, since that is the state anyone
                   actually looks at. Above 1152px the row stops growing (the
                   wrapper is max-w-6xl = 1152px, minus px-6 and gap-5), so the
                   hovered card is a fixed ~464px on the flagship row and
                   ~580px on the 3-card drawer row — hence a px value, not vw.
                   A vw unit here keeps scaling with the viewport long after
                   the container has capped, which on a 2133px screen made the
                   browser fetch the 1920w candidate for a 260px card. */
                sizes="(min-width: 1152px) 560px, (min-width: 1024px) 42vw, (min-width: 640px) 50vw, 100vw"
                /* filter only. `transition-all` made the img animate its own
                   box, so it lagged the container it was supposed to fill.
                   No scale either — the card expanding is already the zoom. */
                className={`object-cover saturate-[0.45] transition-[filter] ${TINT} group-hover:saturate-100 group-focus-visible:saturate-100`}
            />
            {/* Blueprint-blue wash that lifts on hover — the card "gets built" */}
            <span
                aria-hidden="true"
                className={`absolute inset-0 bg-brand/30 mix-blend-multiply transition-opacity ${TINT} group-hover:opacity-0 group-focus-visible:opacity-0`}
            />
            {/* Fixed-ink scrim so the on-image text reads in both themes */}
            <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent"
            />

            <CornerBrackets tone="border-brand-light" />

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
                {/* min-h reserves two lines at lg so a title that un-wraps as
                    the card widens does not shunt the block mid-animation. */}
                <h3 className="font-title text-xl font-bold uppercase tracking-tight text-white lg:flex lg:min-h-[3.5rem] lg:items-end">
                    {service.title}
                </h3>
                {/* lg: blurb is the expansion's reward. 0fr→1fr eases over the
                    real content height (max-height eased over a guess and
                    stopped short), and the delay lets the width settle first
                    so the two never contend for the same frames. */}
                <span
                    className={`grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:opacity-0 lg:transition-[grid-template-rows,opacity] lg:duration-300 lg:ease-out lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-hover:delay-[260ms] lg:group-focus-visible:grid-rows-[1fr] lg:group-focus-visible:opacity-100 lg:group-focus-visible:delay-[260ms] motion-reduce:transition-none`}
                >
                    <span className="overflow-hidden">
                        <span className="mt-2 block line-clamp-2 text-xs leading-relaxed text-blue-100/80 md:text-[15px] md:leading-relaxed">
                            {service.blurb}
                        </span>
                    </span>
                </span>
                <span className="mt-4 inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-brand-light md:text-sm">
                    View details
                    <ArrowIcon className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 motion-reduce:transition-none md:h-4 md:w-4" />
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
            className={`group relative flex aspect-[3/4] min-w-0 flex-col border border-border bg-surface p-6 hover:border-main-blue/40 focus-visible:border-main-blue/40 md:aspect-[2/3] ${FOCUS_RING} ${ACCORDION}`}
        >
            <CornerBrackets tone="border-main-blue" />

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
                className="mb-5 h-11 w-11 text-main-blue transition-transform duration-200 ease-out group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transition-none"
            />
            <h3 className="font-title text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl lg:flex lg:min-h-[3.5rem] lg:items-end lg:text-xl">
                {service.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-base">{service.blurb}</p>
            <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-main-blue md:text-sm">
                View details
                <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 motion-reduce:transition-none md:h-4 md:w-4" />
            </span>
        </MotionLink>
    );
}

/** Picks the right card treatment for a service; keeps the three rows terse. */
function ServiceCard(props: { service: Service; index: number; tabIndex?: number }) {
    return props.service.image ? <ImageFlagshipCard {...props} /> : <FlagshipCard {...props} />;
}

/**
 * Home-page services section: the four flagship specialties as rich cards,
 * with the remaining services in an expandable drawer. All cards render in
 * the server HTML (the drawer is CSS-collapsed, not conditionally rendered)
 * so search and AI crawlers always see the full offering. Themed surface.
 */
export default function WhatWeDo() {
    const [expanded, setExpanded] = useState(false);
    const reduceMotion = useReducedMotion();

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
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "visible"}
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
                    {FLAGSHIP_SERVICES.map((service, i) => (
                        <ServiceCard key={service.slug} service={service} index={i} />
                    ))}
                </div>

                {/* Expandable drawer — always in the DOM, CSS-collapsed */}
                <div
                    id="more-services"
                    aria-hidden={!expanded}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
                        expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                    <div className="overflow-hidden">
                        {/* Same card treatment + accordion row as the flagship four */}
                        <div className="grid grid-cols-1 gap-5 pt-5 sm:grid-cols-2 lg:flex">
                            {MORE_SERVICES.map((service, i) => (
                                <ServiceCard
                                    key={service.slug}
                                    service={service}
                                    index={i + FLAGSHIP_SERVICES.length}
                                    tabIndex={expanded ? undefined : -1}
                                />
                            ))}
                        </div>

                        {/* Third row: the other two sectors we serve */}
                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:flex">
                            {SECTOR_SERVICES.map((service, i) => (
                                <ServiceCard
                                    key={service.slug}
                                    service={service}
                                    index={i + FLAGSHIP_SERVICES.length + MORE_SERVICES.length}
                                    tabIndex={expanded ? undefined : -1}
                                />
                            ))}
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
                            className={`text-base leading-none text-main-blue transition-transform duration-300 motion-reduce:transition-none ${
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
