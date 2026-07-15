"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Blueprint from "../../../public/svg/test3";
import BlueprintGrid from "../../../public/svg/test1";
import Carousel from "@/components/ui/Carousel";
import Container from "@/components/ui/Container";
import Corners from "@/components/ui/Corners";
import SectionHeader from "@/components/ui/SectionHeader";
import { EASE, fadeUp, stagger, viewport } from "@/lib/motion";
import type { ServiceDetail } from "@/lib/services";

/* Dashed connector between phase markers "draws" downward into view */
const lineDraw: Variants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 0.5, ease: EASE } },
};

export default function ServiceDetailSections({ detail }: { detail: ServiceDetail }) {
    const { materials, process, care, timeline, gallery, faq } = detail;
    /* Single-open FAQ accordion; answers stay in the DOM (CSS-collapsed, same
       as the home-page services drawer) so they keep matching the FAQPage
       JSON-LD for search and AI crawlers. */
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    /* Process, care, and timeline are optional — sheet numbers stay
       sequential across whichever sections a service actually has. */
    let sheet = 1; // materials is always 01
    const pad = (n: number) => String(n).padStart(2, "0");
    const processIndex = process ? pad(++sheet) : "";
    const careIndex = care ? pad(++sheet) : "";
    const timelineIndex = timeline ? pad(++sheet) : "";
    const galleryIndex = pad(++sheet);
    const faqIndex = pad(++sheet);

    return (
        <>
            {/* ── 01 · Design & materials — narrative + framed photo ── */}
            <section className="bg-surface-muted py-16 transition-colors md:py-24">
                <Container>
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="mx-auto max-w-6xl"
                    >
                        <SectionHeader prefix={detail.sheetName} index="01" kicker={materials.kicker} title={materials.heading} />

                        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 py-10">
                            <div className="lg:col-span-6">
                                {materials.paragraphs.map((paragraph) => (
                                    <motion.p
                                        key={paragraph.slice(0, 32)}
                                        variants={fadeUp}
                                        className="mt-6 text-base leading-relaxed text-muted first:mt-0 md:text-lg"
                                    >
                                        {paragraph}
                                    </motion.p>
                                ))}
                                <motion.p
                                    variants={fadeUp}
                                    className="mt-8 border-l-2 border-main-blue pl-5 text-lg font-medium leading-relaxed text-foreground md:text-xl"
                                >
                                    {materials.pullQuote}
                                </motion.p>
                            </div>

                            {/* Framed photo — drafting-sheet corners + caption strip */}
                            <motion.figure variants={fadeUp} className="lg:col-span-6">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border">
                                    <Corners />
                                    <Image
                                        src={materials.image.src}
                                        alt={materials.image.alt}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover"
                                        quality={85}
                                    />
                                </div>
                                <figcaption className="mt-3 flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                                    <span>{materials.image.caption}</span>
                                    <span>Fig. 01</span>
                                </figcaption>
                            </motion.figure>
                        </div>

                        {/* Optional choice cards — e.g. wood vs. composite */}
                        {materials.options && (
                            <div className="grid grid-cols-1 gap-5 pb-10 md:grid-cols-2">
                                {materials.options.map((option) => (
                                    <motion.div
                                        key={option.title}
                                        variants={fadeUp}
                                        className="group relative border border-border bg-surface p-6 transition-colors hover:border-main-blue/40 md:p-8"
                                    >
                                        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-main-blue">
                                            {option.label}
                                        </span>
                                        <h3 className="mt-3 font-title text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
                                            {option.title}
                                        </h3>
                                        <ul className="mt-5 space-y-3">
                                            {option.points.map((point) => (
                                                <li
                                                    key={point}
                                                    className="flex items-start gap-3 text-sm leading-relaxed text-muted md:text-base"
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className="mt-[0.65em] h-px w-4 shrink-0 bg-main-blue/70"
                                                    />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </Container>
            </section>

            {/* ── The process — ordered phase log ── */}
            {process && (
            <section className="relative overflow-hidden bg-surface py-16 transition-colors md:py-24">
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
                        className="mx-auto max-w-4xl"
                    >
                        <SectionHeader prefix={detail.sheetName} index={processIndex} kicker={process.kicker} title={process.heading} />

                        <div className="py-10">
                            <motion.p
                                variants={fadeUp}
                                className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-muted md:text-lg"
                            >
                                {process.lead}
                            </motion.p>

                            <ol className="mt-10">
                                {process.phases.map((phase, i) => {
                                    const last = i === process.phases.length - 1;
                                    return (
                                        <motion.li
                                            key={phase.title}
                                            variants={fadeUp}
                                            className="group flex gap-5 md:gap-6"
                                        >
                                            {/* Marker rail: numbered node + dashed connector */}
                                            <div className="flex flex-col items-center">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-main-blue/50 bg-surface font-mono text-xs tracking-wider text-main-blue transition-colors duration-300 group-hover:border-main-blue group-hover:bg-main-blue group-hover:text-white">
                                                    {String(i + 1).padStart(2, "0")}
                                                </div>
                                                {!last && (
                                                    <motion.div
                                                        aria-hidden="true"
                                                        variants={lineDraw}
                                                        className="my-1.5 w-px flex-1 origin-top border-l border-dashed border-main-blue/40"
                                                    />
                                                )}
                                            </div>

                                            <div className={last ? "pt-2" : "pb-8 pt-2"}>
                                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-main-blue/70">
                                                        Phase {String(i + 1).padStart(2, "0")}
                                                    </span>
                                                    <h3 className="text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-main-blue md:text-lg">
                                                        {phase.title}
                                                    </h3>
                                                </div>
                                                <p className="mt-1 text-sm leading-relaxed text-muted">
                                                    {phase.note}
                                                </p>
                                            </div>
                                        </motion.li>
                                    );
                                })}
                            </ol>

                            <motion.p
                                variants={fadeUp}
                                className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-muted md:text-lg"
                            >
                                {process.close}
                            </motion.p>
                        </div>
                    </motion.div>
                </Container>
            </section>
            )}

            {/* ── Care & repair — inspection sheet on ink ── */}
            {care && (
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
                            prefix={detail.sheetName}
                            index={careIndex}
                            kicker={care.kicker}
                            title={care.heading}
                            tone="ink"
                        />

                        <motion.p
                            variants={fadeUp}
                            className="mx-auto mt-8 max-w-3xl pt-10 text-center text-base leading-relaxed text-blue-100/80 md:text-lg"
                        >
                            {care.lead}
                        </motion.p>

                        {/* Warning-sign readouts — inspection-sheet treatment */}
                        <motion.div
                            variants={fadeUp}
                            className="relative mt-12 border border-brand-light/25 bg-gradient-to-b from-ink-soft/80 to-ink/40 backdrop-blur-sm"
                        >
                            <Corners />

                            {/* Title block strip */}
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-light/20 px-6 py-3">
                                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-100/60">
                                    Inspection Sheet · Warning Signs
                                </span>
                                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-100/60">
                                    Check annually
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                                {care.signs.map((sign, i) => {
                                    const last = i === care.signs.length - 1;
                                    return (
                                        <div
                                            key={sign.title}
                                            className={`group px-5 py-5 transition-colors duration-300 hover:bg-brand-light/[0.07] md:py-6 ${!last ? "lg:border-r" : ""} ${i % 2 === 0 && !last ? "sm:border-r" : ""} ${!last ? "max-lg:border-b" : ""} border-brand-light/15`}
                                        >
                                            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-light">
                                                WS—{String(i + 1).padStart(2, "0")}
                                            </div>
                                            <div className="mt-2 font-title text-lg font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-brand-light">
                                                {sign.title}
                                            </div>
                                            <div className="mt-2 text-xs leading-relaxed text-blue-100/60 transition-colors duration-300 group-hover:text-blue-100/85">
                                                {sign.note}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        <motion.p
                            variants={fadeUp}
                            className="mx-auto mt-10 max-w-3xl text-center text-base leading-relaxed text-blue-100/80 md:text-lg"
                        >
                            {care.close}
                        </motion.p>
                    </motion.div>
                </Container>
            </section>
            )}

            {/* ── Timeline — ink band with stat readouts ── */}
            {timeline && (
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
                            prefix={detail.sheetName}
                            index={timelineIndex}
                            kicker={timeline.kicker}
                            title={timeline.heading}
                            tone="ink"
                        />

                        <div className="mt-8 max-w-3xl pt-10">
                            {timeline.paragraphs.map((paragraph) => (
                                <motion.p
                                    key={paragraph.slice(0, 32)}
                                    variants={fadeUp}
                                    className="mt-6 text-base leading-relaxed text-blue-100/80 first:mt-0 md:text-lg"
                                >
                                    {paragraph}
                                </motion.p>
                            ))}
                        </div>

                        {/* Stat readouts — credential-sheet treatment */}
                        <motion.div
                            variants={fadeUp}
                            className="relative mb-10 mt-12 border border-brand-light/25 bg-gradient-to-b from-ink-soft/80 to-ink/40 backdrop-blur-sm"
                        >
                            <Corners />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {timeline.stats.map((stat, i) => {
                                    const last = i === timeline.stats.length - 1;
                                    return (
                                        <div
                                            key={stat.label}
                                            className={`group px-6 py-6 transition-colors duration-300 hover:bg-brand-light/[0.07] md:py-8 ${!last ? "lg:border-r" : ""} ${i % 2 === 0 && !last ? "sm:border-r" : ""} ${!last ? "max-lg:sm:border-b" : ""} ${last ? "max-lg:sm:col-span-2" : ""} border-brand-light/15`}
                                        >
                                            <div className="font-title text-4xl font-bold tracking-tight text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:text-brand-light md:text-5xl">
                                                {stat.value}
                                            </div>
                                            {/* Measurement line — draws across on hover */}
                                            <div
                                                aria-hidden="true"
                                                className="mt-3 h-px origin-left scale-x-0 bg-brand-light/70 transition-transform duration-500 ease-out group-hover:scale-x-100"
                                            />
                                            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-brand-light">
                                                {stat.label}
                                            </div>
                                            <div className="mt-2 text-xs leading-relaxed text-blue-100/60 transition-colors duration-300 group-hover:text-blue-100/85">
                                                {stat.note}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>
            )}

            {/* ── Recent work — project carousel ── */}
            <section className="bg-surface py-16 transition-colors md:py-24">
                <Container>
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="mx-auto max-w-5xl"
                    >
                        <SectionHeader prefix={detail.sheetName} index={galleryIndex} kicker={gallery.kicker} title={gallery.heading} />

                        <motion.div variants={fadeUp} className="mt-12 py-10">
                            <Carousel
                                images={gallery.slides}
                                height="h-[380px] md:h-[520px]"
                                autoplayInterval={6000}
                            />
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            {/* ── FAQ — visible Q&A, mirrored as FAQPage JSON-LD ── */}
            <section className="bg-surface-muted py-16 transition-colors md:py-24">
                <Container>
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="mx-auto max-w-3xl"
                    >
                        <SectionHeader prefix={detail.sheetName} index={faqIndex} kicker="FAQ" title="Common Questions" />

                        <dl className="mt-12 py-10">
                            {faq.map((item, i) => {
                                const open = openFaq === i;
                                return (
                                    <motion.div
                                        key={item.question}
                                        variants={fadeUp}
                                        className={`border-b transition-colors duration-300 ${open ? "border-main-blue/40" : "border-border"}`}
                                    >
                                        <dt>
                                            <button
                                                type="button"
                                                aria-expanded={open}
                                                aria-controls={`faq-answer-${i}`}
                                                onClick={() => setOpenFaq(open ? null : i)}
                                                className="group flex w-full items-baseline gap-4 py-6 text-left"
                                            >
                                                <span className="shrink-0 font-mono text-xs tracking-[0.2em] text-main-blue">
                                                    Q—{String(i + 1).padStart(2, "0")}
                                                </span>
                                                <span
                                                    className={`flex-1 text-lg font-semibold leading-snug transition-colors duration-300 ${open ? "text-main-blue" : "text-foreground group-hover:text-main-blue"}`}
                                                >
                                                    {item.question}
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    className={`self-center text-xl leading-none text-main-blue transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                                                >
                                                    +
                                                </span>
                                            </button>
                                        </dt>
                                        <dd
                                            id={`faq-answer-${i}`}
                                            aria-hidden={!open}
                                            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                        >
                                            <div className="overflow-hidden">
                                                <p
                                                    className={`border-l-2 border-main-blue/40 pb-6 pl-5 text-base leading-relaxed text-muted transition-transform duration-500 ease-out sm:ml-14 ${open ? "translate-y-0" : "-translate-y-3"}`}
                                                >
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </dd>
                                    </motion.div>
                                );
                            })}
                        </dl>
                    </motion.div>
                </Container>
            </section>
        </>
    );
}
