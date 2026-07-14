"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Blueprint from "../../../public/svg/test3";
import BlueprintBright from "../../../public/svg/test3-bright";
import BlueprintGrid from "../../../public/svg/test1";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { BUSINESS } from "@/lib/site";
import {
    GOV_CREDENTIALS,
    GOV_CAPABILITIES,
    GOV_WHY_AGENCIES,
    GOV_PAST_PERFORMANCE,
    GOV_NAICS,
} from "@/lib/government";

const EASE = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, amount: 0.2 };

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* Checkmark that draws itself in when the row scrolls into view */
const checkDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
    },
};

/* Past-performance collage — placeholder renders until real project photos
   land. Different widths + offsets so the frames overlap like pinned prints. */
const PP_COLLAGE = [
    {
        src: "/images/hero/government.png",
        alt: "Government facility construction project",
        position: "left-0 top-0 w-[78%]",
        z: "z-10",
    },
    {
        src: "/images/hero/commercial.png",
        alt: "Commercial interior build-out project",
        position: "right-0 top-[30%] w-[64%]",
        z: "z-20",
    },
    {
        src: "/images/hero/exterior.png",
        alt: "Exterior renovation and site improvement project",
        position: "bottom-0 left-0 w-[56%]",
        z: "z-30",
    },
] as const;

/* Blueprint-style corner brackets */
function Corners({ color = "border-brand-light" }: { color?: string }) {
    return (
        <>
            {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((pos) => (
                <span key={pos} aria-hidden="true" className={`absolute ${pos} h-5 w-5 ${color}`} />
            ))}
        </>
    );
}

export default function GovernmentCapabilities() {
    return (
        <>
            {/* ── 01 · Capability sheet: registrations as a drafting title block ── */}
            <section className="relative overflow-hidden border-t-2 border-brand-light/25 bg-gradient-to-b from-steel-top to-steel-bottom py-20 md:py-28">
                <Blueprint
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full select-none opacity-60"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-steel-bottom)_95%)]" />

                <Container className="relative z-10">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="mx-auto max-w-5xl"
                    >
                        {/* Section label */}
                        <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
                            <span className="font-mono text-sm uppercase tracking-widest text-brand-light/80">
                                Government 01.01 · Registrations
                            </span>
                            <div className="flex-1 border-t border-dashed border-brand-light/25" />
                        </motion.div>

                        {/* Oversized headline */}
                        <motion.div variants={fadeUp} className="relative">
                            <span className="pointer-events-none absolute -top-10 -left-2 select-none font-title text-[7rem] font-bold leading-none text-brand-light/[0.09] md:text-[11rem]">
                                01
                            </span>
                            <h2 className="relative ml-20 font-title text-4xl font-bold uppercase tracking-tight text-white md:text-6xl">
                                Capability <span className="text-brand-light">Statement</span>
                            </h2>
                        </motion.div>

                        {/* The sheet */}
                        <motion.div
                            variants={fadeUp}
                            className="relative mt-20 border border-brand-light/25 bg-gradient-to-b from-ink-soft/80 to-ink/40 backdrop-blur-sm"
                        >
                            <Corners />

                            {/* Title block strip — like a drawing's header */}
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-light/20 px-6 py-3">
                                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-100/60">
                                    {BUSINESS.name}
                                </span>
                                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-100/60">
                                    Sheet GC—1.0 · Rev. A
                                </span>
                            </div>

                            {/* Credential readouts */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {GOV_CREDENTIALS.map((cred, i) => (
                                    <motion.div
                                        key={cred.label}
                                        variants={fadeUp}
                                        className={`px-6 py-6 md:py-8 ${i % 3 !== 2 ? "lg:border-r" : ""} ${i < 3 ? "lg:border-b" : ""} ${i % 2 === 0 ? "sm:border-r lg:border-r" : ""} ${i < 4 ? "sm:border-b" : ""} border-brand-light/15`}
                                    >
                                        <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-light">
                                            {cred.label}
                                        </div>
                                        <div className="mt-2 font-mono text-lg font-bold tracking-wide text-white md:text-xl">
                                            {cred.value}
                                        </div>
                                        <div className="mt-2 text-base leading-relaxed text-blue-100/60">
                                            {cred.note}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.p
                            variants={fadeUp}
                            className="mx-auto mt-8 max-w-2xl text-center text-sm text-blue-100/60"
                        >
                            Capability statement available on request —{" "}
                            <Link href="/contact" className="text-brand-light transition-colors hover:text-white">
                                request a copy
                            </Link>
                            .
                        </motion.p>
                    </motion.div>
                </Container>
            </section>

            {/* ── 02 · Overview ── */}
            <section className="bg-surface py-16 transition-colors md:py-24">
                <Container>
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="mx-auto max-w-3xl"
                    >
                        {/* Section label */}
                        <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
                            <span className="font-mono text-sm uppercase tracking-widest text-light-blue/80">
                                Government 01.02 · Overview
                            </span>
                            <div className="flex-1 border-t border-dashed border-light-blue/25" />
                        </motion.div>

                        {/* Oversized headline */}
                        <motion.div variants={fadeUp} className="relative">
                            <span className="pointer-events-none absolute -top-10 -left-2 select-none font-title text-[7rem] font-bold leading-none text-light-blue/[0.25] md:text-[11rem]">
                                02
                            </span>
                            <h2 className="relative text-center font-title text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
                                Built for Government & Institutional Projects
                            </h2>
                        </motion.div>
                        <motion.div variants={fadeUp} className="mt-4 h-0.5 w-16 bg-main-blue" />
                        <motion.p variants={fadeUp} className="mt-6 text-base text-center leading-relaxed text-muted md:text-lg">
                            {BUSINESS.name} is a Maryland-based general contractor providing
                            construction, renovation, demolition, fencing, and site development
                            services for federal, state, local government, commercial, and
                            institutional clients.
                        </motion.p>
                        <motion.p variants={fadeUp} className="mt-4 text-base text-center leading-relaxed text-muted md:text-lg">
                            Our leadership team is composed entirely of military veterans,
                            bringing firsthand experience operating in high-security
                            facilities, executing under pressure, and managing demanding,
                            multi-phase projects on tight deadlines. That background shapes
                            how we run every job - with discipline, accountability, and a
                            clear chain of command from day one.
                        </motion.p>
                        <motion.p variants={fadeUp} className="mt-4 text-base text-center leading-relaxed text-muted md:text-lg">
                            We deliver turnkey project management from planning and
                            permitting through construction and closeout, maintaining strict
                            safety, quality, and schedule requirements throughout.
                        </motion.p>
                    </motion.div>
                </Container>
            </section>

            {/* ── 03 · Core capabilities ── */}
            <section className="relative overflow-hidden bg-surface-muted py-16 transition-colors md:py-24">
                <BlueprintGrid
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full select-none text-light-blue opacity-20"
                />
                <Container className="relative z-10">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="mx-auto max-w-6xl"
                    >
                        {/* Section label */}
                        <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
                            <span className="font-mono text-sm uppercase tracking-widest text-light-blue/80">
                                Government 01.03 · Core Capabilities
                            </span>
                            <div className="flex-1 border-t border-dashed border-light-blue/25" />
                        </motion.div>

                        {/* Oversized headline */}
                        <motion.div variants={fadeUp} className="relative">
                            <span className="pointer-events-none absolute -top-10 -left-2 select-none font-title text-[7rem] font-bold leading-none text-light-blue/[0.25] md:text-[11rem]">
                                03
                            </span>
                            <h2 className="relative ml-20 font-title text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
                                What We Deliver
                            </h2>
                        </motion.div>

                        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {GOV_CAPABILITIES.map((capability, i) => (
                                <motion.div
                                    key={capability}
                                    variants={fadeUp}
                                    className="group relative border border-border bg-surface p-5 transition-colors hover:border-main-blue/40"
                                >
                                    <span className="pointer-events-none absolute right-3 top-2 select-none font-title text-4xl font-bold leading-none text-light-blue/15">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-main-blue">
                                        C—{String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="mt-3 pr-8 text-base font-semibold leading-snug text-foreground">
                                        {capability}
                                    </h3>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* ── 04 · Why agencies choose Blue Rock ── */}
            <section className="bg-surface py-16 transition-colors md:py-24">
                <Container>
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12"
                    >
                        <motion.div variants={fadeUp} className="lg:col-span-5">
                            {/* Section label */}
                            <div className="mb-6 flex items-center gap-3">
                                <span className="font-mono text-sm uppercase tracking-widest text-light-blue/80">
                                    Government 01.04 · Differentiators
                                </span>
                                <div className="flex-1 border-t border-dashed border-light-blue/25" />
                            </div>

                            {/* Oversized headline */}
                            <div className="relative">
                                <span className="pointer-events-none absolute -top-10 -left-2 select-none font-title text-[7rem] font-bold leading-none text-light-blue/[0.25] md:text-[11rem]">
                                    04
                                </span>
                                <h2 className="relative ml-20 font-title text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
                                    Why Agencies Choose US
                                </h2>
                            </div>
                            <div className="mt-4 h-0.5 w-16 bg-main-blue" />
                            <p className="mt-6 text-base leading-relaxed text-muted">
                                Public-sector work demands more than construction skill - it
                                demands documentation, coordination, and accountability. Here
                                is what agencies get with one call.
                            </p>
                        </motion.div>

                        {/* Review checklist — official qualification sheet, same
                            drafting-document treatment as the capability sheet */}
                        <motion.div variants={fadeUp} className="lg:col-span-7">
                            <div className="relative border border-border bg-surface-muted/60">
                                <Corners color="border-main-blue/50" />

                                {/* Title block strip */}
                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3">
                                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                                        Agency Review · Qualifications
                                    </span>
                                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                                        Sheet GC—1.4 · Rev. A
                                    </span>
                                </div>

                                {/* Requirement rows */}
                                <ul>
                                    {GOV_WHY_AGENCIES.map((reason, i) => (
                                        <motion.li
                                            key={reason}
                                            variants={fadeUp}
                                            className="group flex items-start gap-4 border-b border-border px-5 py-4 transition-colors hover:bg-surface"
                                        >
                                            {/* Drafting checkbox with drawn check */}
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-main-blue/60 transition-colors group-hover:border-main-blue">
                                                <svg
                                                    aria-hidden="true"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={3}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-3.5 w-3.5 text-main-blue"
                                                >
                                                    <motion.path variants={checkDraw} d="m5 12.5 4.5 4.5L19 7" />
                                                </svg>
                                            </span>
                                            <span className="shrink-0 pt-0.5 font-mono text-xs tracking-[0.2em] text-main-blue">
                                                RQ—{String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="text-base leading-relaxed text-foreground">
                                                {reason}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Sign-off strip */}
                                <div className="px-5 py-4">
                                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                                        {GOV_WHY_AGENCIES.length} of {GOV_WHY_AGENCIES.length} requirements met
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            {/* ── 05 · Past performance — project log on ink ── */}
            <section className="relative overflow-hidden bg-ink py-16 md:py-24">
                <Blueprint
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full select-none opacity-40"
                />
                <Container className="relative z-10">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="mx-auto max-w-6xl"
                    >
                        {/* Section label */}
                        <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
                            <span className="font-mono text-sm uppercase tracking-widest text-brand-light/80">
                                Government 01.05 · Past Performance
                            </span>
                            <div className="flex-1 border-t border-dashed border-brand-light/25" />
                        </motion.div>

                        {/* Oversized headline */}
                        <motion.div variants={fadeUp} className="relative">
                            <span className="pointer-events-none absolute -top-10 -left-2 select-none font-title text-[7rem] font-bold leading-none text-brand-light/[0.09] md:text-[11rem]">
                                05
                            </span>
                            <h2 className="relative ml-20 font-title text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
                                Project Log
                            </h2>
                        </motion.div>

                        <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                            {/* Project log */}
                            <div className="lg:col-span-7">
                                {GOV_PAST_PERFORMANCE.map((project, i) => (
                                    <motion.div
                                        key={project}
                                        variants={fadeUp}
                                        className="group flex items-baseline gap-5 border-b border-brand-light/15 py-4 transition-colors hover:border-brand-light/40"
                                    >
                                        <span className="shrink-0 font-mono text-sm tracking-[0.2em] text-brand-light">
                                            PP—{String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-base leading-relaxed text-blue-100/90 md:text-lg">
                                            {project}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Overlapping project prints — hover lifts one to the front */}
                            <motion.div variants={fadeUp} className="lg:col-span-5">
                                <div className="relative mx-auto aspect-[4/5] w-full max-w-xl">
                                    {PP_COLLAGE.map((item) => (
                                        <motion.div
                                            key={item.src}
                                            initial={false}
                                            whileHover={{
                                                scale: 1.03,
                                                y: -8,
                                                zIndex: 40,
                                            }}
                                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                            className={`absolute ${item.position} ${item.z} border border-brand-light/25 bg-ink-soft p-1.5 shadow-2xl shadow-black/50`}
                                        >
                                            <div className="relative aspect-[4/3] overflow-hidden">
                                                <Image
                                                    src={item.src}
                                                    alt={item.alt}
                                                    fill
                                                    sizes="(max-width: 1024px) 60vw, 20vw"
                                                    className="object-cover"
                                                    quality={80}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* ── 06 · NAICS schedule ── */}
            <section className="bg-surface py-16 transition-colors md:py-24">
                <Container>
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="mx-auto max-w-4xl"
                    >
                        {/* Section label */}
                        <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
                            <span className="font-mono text-sm uppercase tracking-widest text-light-blue/80">
                                Government 01.06 · Classifications
                            </span>
                            <div className="flex-1 border-t border-dashed border-light-blue/25" />
                        </motion.div>

                        {/* Oversized headline */}
                        <motion.div variants={fadeUp} className="relative">
                            <span className="pointer-events-none absolute -top-10 -left-2 select-none font-title text-[7rem] font-bold leading-none text-light-blue/[0.25] md:text-[11rem]">
                                06
                            </span>
                            <h2 className="relative ml-20 font-title text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
                                NAICS Codes
                            </h2>
                        </motion.div>

                        <motion.p variants={fadeUp} className="mt-20 max-w-3xl text-foreground font-semibold leading-relaxed">
                            {BUSINESS.name} provides construction, demolition, renovation,
                            fencing, and institutional contracting services aligned with the
                            following NAICS classifications for government and commercial
                            procurement opportunities.
                        </motion.p>

                        {/* Drafting-schedule table */}
                        <motion.div variants={fadeUp} className="relative mt-10 overflow-x-auto border border-border">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-border bg-surface-muted">
                                        <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                                            Code
                                        </th>
                                        <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                                            Classification
                                        </th>
                                        <th className="hidden px-5 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted md:table-cell">
                                            Category
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {GOV_NAICS.map((row) => (
                                        <tr
                                            key={row.code}
                                            className="border-b border-border last:border-b-0 transition-colors hover:bg-surface-muted"
                                        >
                                            <td className="px-5 py-4 font-mono text-sm font-bold tracking-wider text-main-blue">
                                                {row.code}
                                            </td>
                                            <td className="px-5 py-4 text-sm leading-relaxed text-foreground">
                                                {row.description}
                                            </td>
                                            <td className="hidden px-5 py-4 text-sm text-muted md:table-cell">
                                                {row.category}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            {/* ── 07 · CTA band ── */}
            <section className="relative overflow-hidden border-t-2 border-brand-light/25 bg-gradient-to-b from-steel-top to-steel-bottom py-20 md:py-28">
                <BlueprintBright
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full select-none opacity-70"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,var(--color-steel-bottom)_95%)]" />

                <Container className="relative z-10">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <motion.div variants={fadeUp} className="mb-6 flex items-center justify-center gap-3">
                            <span className="h-px w-8 bg-brand-light/50" />
                            <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-light">
                                Let&apos;s build together
                            </span>
                            <span className="h-px w-8 bg-brand-light/50" />
                        </motion.div>

                        <motion.h2
                            variants={fadeUp}
                            className="font-title text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white md:text-6xl"
                        >
                            Ready to partner with a reliable{" "}
                            <span className="text-brand-light">government contractor?</span>
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/80 md:text-lg"
                        >
                            {BUSINESS.name} delivers dependable construction, renovation,
                            demolition, and site development services with a commitment to
                            safety, quality, and performance.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                        >
                            <Button href="/contact" variant="primary" className="running-border">
                                Request Capability Statement
                            </Button>
                            <Button href="/contact" variant="ghost" className="running-border">
                                Contact Our Team
                            </Button>
                        </motion.div>

                        <motion.p variants={fadeUp} className="mt-6 font-mono text-sm text-blue-100/50">
                            Or call{" "}
                            <a
                                href={`tel:${BUSINESS.phone}`}
                                className="text-brand-light transition-colors hover:text-white"
                            >
                                {BUSINESS.phoneDisplay}
                            </a>
                        </motion.p>
                    </motion.div>
                </Container>
            </section>
        </>
    );
}
