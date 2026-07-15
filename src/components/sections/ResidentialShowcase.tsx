"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BlueprintGrid from "../../../public/svg/test1";
import ChecklistSheet from "@/components/ui/ChecklistSheet";
import Container from "@/components/ui/Container";
import Corners from "@/components/ui/Corners";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { SERVICES } from "@/lib/services";

/* next/link with motion props — keeps client-side nav + viewport prefetch */
const MotionLink = motion.create(Link);

/* lg layout: 6 grid tracks, cards span 2 → LG_PER_ROW cards per row. A
   trailing orphan row centers via col-start; keep these two in sync. */
const LG_PER_ROW = 3;
function orphanStartClass(i: number, total: number): string {
    const orphans = total % LG_PER_ROW;
    if (orphans === 2 && i === total - 2) return "lg:col-start-2";
    if (orphans === 1 && i === total - 1) return "lg:col-start-3";
    return "";
}

const CREDENTIALS = [
    { value: "2010", label: "Established", note: "Over a decade of home remodeling experience" },
    { value: "MHIC", label: "Licensed & insured", note: "Maryland Home Improvement Commission" },
    { value: "MD · DC", label: "Service area", note: "Rockville, Silver Spring, Chevy Chase, and beyond" },
] as const;

const WHY_HOMEOWNERS = [
    "Quality craftsmanship - meticulous attention to detail in every project",
    "On-time delivery without compromising quality",
    "Transparent pricing with no hidden costs or surprise charges",
    "MHIC-licensed and fully insured",
    "One accountable team from design through final walkthrough",
    "Over a decade serving homeowners across Maryland and Washington, DC",
] as const;

/* The three extrusion layers of the card icon, back to front: offset shadow,
   brand mid, white face (which also redraws its strokes on hover). */
const ICON_LAYERS = [
    "absolute inset-0 h-full w-full translate-x-[4px] translate-y-[4px] text-ink/60 transition-transform duration-500 ease-out group-hover:translate-x-[8px] group-hover:translate-y-[8px]",
    "absolute inset-0 h-full w-full translate-x-[2px] translate-y-[2px] text-brand transition-transform duration-500 ease-out group-hover:translate-x-[4px] group-hover:translate-y-[4px]",
    "relative h-full w-full text-white drop-shadow-[0_6px_18px_rgba(10,22,40,0.55)] transition-transform duration-500 ease-out group-hover:-translate-x-[2px] group-hover:-translate-y-[2px] [&_path]:[stroke-dasharray:1] group-hover:[&_path]:[animation:icon-redraw_1.1s_ease-in-out_both]",
] as const;

export default function ResidentialShowcase() {
    return (
        <>
            {/* ── 01 · Overview — intro copy + credential readout strip ── */}
            <section className="bg-surface py-16 transition-colors md:py-24">
                <Container>
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="mx-auto max-w-5xl"
                    >
                        <SectionHeader prefix="Residential" index="01" kicker="Overview" title="Expert Residential Remodeling" />
                        <motion.div variants={fadeUp} className="mt-20 h-0.5 w-16 bg-main-blue" />

                        <motion.p variants={fadeUp} className="mt-10 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
                            At Blue Rock Remodeling, we specialize in transforming residential
                            spaces into beautiful, functional homes that reflect your unique
                            style and meet your family&apos;s needs.
                        </motion.p>
                        <motion.p variants={fadeUp} className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
                            With over a decade of experience serving Maryland and Washington
                            DC, we bring expertise, creativity, and meticulous attention to
                            detail to every project.
                        </motion.p>

                        {/* Credential readouts — drafting-sheet strip, themed surface */}
                        <motion.div
                            variants={fadeUp}
                            className="relative mt-14 border border-border bg-surface-muted/60"
                        >
                            <Corners color="border-main-blue/50" />
                            <div className="grid grid-cols-1 sm:grid-cols-3">
                                {CREDENTIALS.map((cred, i) => (
                                    <div
                                        key={cred.label}
                                        className={`group px-6 py-6 transition-colors duration-300 hover:bg-light-blue/[0.07] md:py-8 ${i !== CREDENTIALS.length - 1 ? "max-sm:border-b sm:border-r" : ""} border-border`}
                                    >
                                        <div className="font-title text-3xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-main-blue md:text-4xl">
                                            {cred.value}
                                        </div>
                                        {/* Measurement line — draws across on hover */}
                                        <div
                                            aria-hidden="true"
                                            className="mt-3 h-px origin-left scale-x-0 bg-main-blue/70 transition-transform duration-500 ease-out group-hover:scale-x-100"
                                        />
                                        <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-main-blue">
                                            {cred.label}
                                        </div>
                                        <div className="mt-2 text-xs leading-relaxed text-muted">
                                            {cred.note}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            {/* ── 02 · Service index — icon cards on blueprint ground ── */}
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
                        <SectionHeader prefix="Residential" index="02" kicker="Service Index" title="Our Services" />

                        {/* 6-track grid, cards span 2 → rows of three; trailing
                            orphans sit centered (see orphanStartClass) */}
                        <div className="mt-20 grid gap-8 md:grid-cols-2 md:mt-24 lg:grid-cols-6">
                            {SERVICES.map((service, i) => (
                                <MotionLink
                                    key={service.slug}
                                    variants={fadeUp}
                                    href={service.href}
                                    className={`group flex flex-col overflow-hidden rounded-2xl border border-transparent bg-white shadow-lg transition-[box-shadow,border-color] hover:shadow-2xl dark:border-light-blue/25 dark:bg-gray-800 dark:hover:border-light-blue/60 lg:col-span-2 ${orphanStartClass(i, SERVICES.length)}`}
                                >
                                    {/* Icon header — steel drafting band (fixed ink art
                                        direction, identical in both themes) */}
                                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-steel-top to-steel-bottom">
                                        {/* Graph-paper texture — pure CSS, brightens on hover.
                                            (One shared BlueprintGrid SVG stays as the section
                                            background; inlining it per card cost ~37KB each.) */}
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-0 bg-[linear-gradient(rgba(90,135,221,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(90,135,221,0.16)_1px,transparent_1px)] bg-[size:22px_22px] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                                        />
                                        {/* Brand-light glow behind the icon */}
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(90,135,221,0.35),transparent_60%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                                        />
                                        {/* Ghost index */}
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute right-4 top-2 select-none font-title text-7xl font-bold leading-none text-brand-light/10"
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        {/* Corner brackets — appear on hover */}
                                        {["top-2 left-2 border-t-2 border-l-2", "top-2 right-2 border-t-2 border-r-2", "bottom-9 left-2 border-b-2 border-l-2", "bottom-9 right-2 border-b-2 border-r-2"].map((pos) => (
                                            <span
                                                key={pos}
                                                aria-hidden="true"
                                                className={`absolute ${pos} z-10 h-4 w-4 border-brand-light opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                                            />
                                        ))}
                                        {/* Sheet strip — drafting title block along the bottom */}
                                        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between border-t border-brand-light/20 bg-ink/20 px-4 py-1.5 backdrop-blur-[2px]">
                                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-light/80">
                                                SRV—{String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-light/80">
                                                MD · DC
                                            </span>
                                        </div>
                                        <div className="relative flex h-full items-center justify-center pb-5">
                                            {/* Layered extrusion: offset copies spread on hover so
                                                the icon rises out; front face redraws its strokes */}
                                            <div className="relative h-20 w-20 transition-transform duration-500 ease-out group-hover:[transform:perspective(700px)_rotateX(14deg)_rotateY(-6deg)_translateY(-4px)_scale(1.15)]">
                                                {ICON_LAYERS.map((layerClass) => (
                                                    <ServiceIcon
                                                        key={layerClass}
                                                        slug={service.slug}
                                                        animated={false}
                                                        className={layerClass}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-main-blue dark:text-white">
                                            {service.title}
                                        </h3>
                                        <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-400">
                                            {service.blurb}
                                        </p>
                                        {/* Pinned to the card bottom regardless of blurb length;
                                            fills solid on hover of the whole card */}
                                        <span className="mt-auto flex items-center justify-between gap-2 border border-border px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-main-blue transition-colors duration-300 group-hover:border-main-blue group-hover:bg-main-blue group-hover:text-white">
                                            View details
                                            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                                        </span>
                                    </div>
                                </MotionLink>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* ── 03 · Why homeowners choose Blue Rock — review checklist ── */}
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
                            <SectionHeader prefix="Residential" index="03" kicker="Differentiators" title="Why Choose Us" />
                            <div className="mt-20 h-0.5 w-16 bg-main-blue" />
                            <p className="mt-6 text-base leading-relaxed text-muted">
                                A remodel lives in your home long after the crew leaves. Here
                                is what homeowners get when Blue Rock runs the job.
                            </p>
                        </motion.div>

                        {/* Review checklist — same drafting-document treatment as the
                            government page's qualification sheet */}
                        <motion.div variants={fadeUp} className="lg:col-span-7">
                            <ChecklistSheet
                                titleLeft="Homeowner Review · Qualifications"
                                titleRight="Sheet RS—1.3 · Rev. A"
                                items={WHY_HOMEOWNERS}
                                footer={`${WHY_HOMEOWNERS.length} of ${WHY_HOMEOWNERS.length} requirements met`}
                            />
                        </motion.div>
                    </motion.div>
                </Container>
            </section>
        </>
    );
}
