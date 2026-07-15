"use client";

import { motion } from "framer-motion";
import Blueprint from "../../../public/svg/test3";
import ChecklistSheet from "@/components/ui/ChecklistSheet";
import Container from "@/components/ui/Container";
import Corners from "@/components/ui/Corners";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const CREDENTIALS = [
    { value: "A+", label: "BBB Rating", note: "Better Business Bureau accredited" },
    { value: "2010", label: "Established", note: "Over a decade of commercial and residential work" },
    { value: "MD · DC", label: "Service area", note: "Offices, retail, and restaurants across the region" },
] as const;

/* Scope of work — discrete, extractable list for search and AI engines */
const PROJECT_TYPES = [
    "Office Build-Outs",
    "Retail Renovations",
    "Restaurant Interiors",
    "Commercial Kitchen Upgrades",
] as const;

/* Operational commitments — how work proceeds without stopping the business */
const HOW_WE_WORK = [
    { value: "After-Hours", label: "Scheduling", note: "Work planned around your operating hours" },
    { value: "Permits", label: "Managed", note: "Local permitting handled end to end" },
    { value: "Open Line", label: "Communication", note: "Clear updates - fewer surprises, less downtime" },
] as const;

const WHY_BUSINESSES = [
    "Licensed and insured for commercial work",
    "Better Business Bureau A+ rating",
    "Transparent pricing with no surprises",
    "A commitment to deadlines your business can plan around",
    "Tailored to how your space actually operates - never one-size-fits-all",
    "Over a decade of craftsmanship across Maryland and DC",
] as const;

export default function CommercialShowcase() {
    return (
        <>
            {/* ── 01 · Overview — Built for Business ── */}
            <section className="bg-surface py-16 transition-colors md:py-24">
                <Container>
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="mx-auto max-w-5xl"
                    >
                        <SectionHeader prefix="Commercial" index="01" kicker="Overview" title="Built for Business" />
                        <motion.div variants={fadeUp} className="mt-20 h-0.5 w-16 bg-main-blue" />

                        <motion.p variants={fadeUp} className="mt-10 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
                            With over a decade of experience and a Better Business Bureau A+
                            rating, Blue Rock Remodeling brings the same craftsmanship from
                            residential projects to commercial spaces across Maryland and DC.
                        </motion.p>
                        <motion.p variants={fadeUp} className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
                            From office build-outs and retail renovations to restaurant
                            interiors and full commercial kitchen upgrades, we handle projects
                            of any scale for businesses that need their space to perform, not
                            just look good.
                        </motion.p>

                        {/* Scope of work — capability tiles */}
                        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {PROJECT_TYPES.map((projectType, i) => (
                                <motion.div
                                    key={projectType}
                                    variants={fadeUp}
                                    className="group relative border border-border bg-surface p-5 transition-colors hover:border-main-blue/40"
                                >
                                    <span className="pointer-events-none absolute right-3 top-2 select-none font-title text-4xl font-bold leading-none text-light-blue/15">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-main-blue">
                                        CM—{String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="mt-3 pr-8 text-base font-semibold leading-snug text-foreground">
                                        {projectType}
                                    </h3>
                                </motion.div>
                            ))}
                        </div>

                        {/* Credential readouts — drafting-sheet strip */}
                        <motion.div
                            variants={fadeUp}
                            className="relative mt-12 border border-border bg-surface-muted/60"
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

            {/* ── 02 · How we work — disruption-free delivery on ink ── */}
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
                        className="mx-auto max-w-5xl"
                    >
                        <SectionHeader
                            prefix="Commercial"
                            index="02"
                            kicker="How We Work"
                            title="Minimizing Disruption to Your Business"
                            tone="ink"
                        />

                        <motion.p
                            variants={fadeUp}
                            className="mx-auto mt-8 max-w-3xl pt-10 text-center text-base leading-relaxed text-blue-100/80 md:text-lg"
                        >
                            Commercial projects run on a different clock than residential ones
                            - your business doesn&apos;t stop while we work. We coordinate
                            every trade, manage permits, and plan around your operating hours
                            so renovations move forward without derailing your day-to-day.
                        </motion.p>
                        <motion.p
                            variants={fadeUp}
                            className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-blue-100/80 md:text-lg"
                        >
                            Clear communication and careful scheduling mean fewer surprises
                            and less downtime for your business.
                        </motion.p>

                        {/* Operational readouts — credential-sheet treatment */}
                        <motion.div
                            variants={fadeUp}
                            className="relative mb-10 mt-12 border border-brand-light/25 bg-gradient-to-b from-ink-soft/80 to-ink/40 backdrop-blur-sm"
                        >
                            <Corners />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {HOW_WE_WORK.map((item, i) => {
                                    const last = i === HOW_WE_WORK.length - 1;
                                    return (
                                        <div
                                            key={item.label}
                                            className={`group px-6 py-6 transition-colors duration-300 hover:bg-brand-light/[0.07] md:py-8 ${!last ? "lg:border-r" : ""} ${i % 2 === 0 && !last ? "sm:border-r" : ""} ${!last ? "max-lg:sm:border-b" : ""} ${last ? "max-lg:sm:col-span-2" : ""} border-brand-light/15`}
                                        >
                                            <div className="font-mono text-xl font-bold tracking-wide text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:text-brand-light md:text-2xl">
                                                {item.value}
                                            </div>
                                            {/* Measurement line — draws across on hover */}
                                            <div
                                                aria-hidden="true"
                                                className="mt-3 h-px origin-left scale-x-0 bg-brand-light/70 transition-transform duration-500 ease-out group-hover:scale-x-100"
                                            />
                                            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-brand-light">
                                                {item.label}
                                            </div>
                                            <div className="mt-2 text-xs leading-relaxed text-blue-100/60 transition-colors duration-300 group-hover:text-blue-100/85">
                                                {item.note}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            {/* ── 03 · Trust — review checklist ── */}
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
                            <SectionHeader prefix="Commercial" index="03" kicker="Differentiators" title="A Partner You Can Trust" />
                            <div className="mt-20 h-0.5 w-16 bg-main-blue" />
                            <p className="mt-6 text-base leading-relaxed text-muted">
                                Licensed and insured, Blue Rock Remodeling stands behind every
                                commercial project with transparent pricing and a commitment to
                                deadlines. We adapt to the unique needs of each space instead
                                of applying a one-size-fits-all approach, so the final result
                                fits how your business actually operates - not just how it
                                looks on day one.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp} className="lg:col-span-7">
                            <ChecklistSheet
                                titleLeft="Business Review · Qualifications"
                                titleRight="Sheet CM—1.3 · Rev. A"
                                items={WHY_BUSINESSES}
                                footer={`${WHY_BUSINESSES.length} of ${WHY_BUSINESSES.length} requirements met`}
                            />
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

        </>
    );
}
