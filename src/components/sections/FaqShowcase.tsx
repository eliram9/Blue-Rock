"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Blueprint from "../../../public/svg/test3";
import Container from "@/components/ui/Container";
import Corners from "@/components/ui/Corners";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { BUSINESS } from "@/lib/site";
import { FAQ_CATEGORIES, FAQ_COUNT } from "@/lib/faq";

export default function FaqShowcase() {
    /* Single-open accordion across the whole page; answers stay in the DOM
       (CSS-collapsed) so they keep matching the FAQPage JSON-LD for search
       and AI crawlers. Keyed by the question's global number. */
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    /* Global Q—01…15 numbering across categories */
    let questionNo = 0;

    return (
        <>
            {/* ── Hero — steel knowledge-sheet band, category-tier height ── */}
            <section className="relative flex min-h-[38svh] items-center overflow-hidden border-t-2 border-brand-light/25 bg-gradient-to-b from-steel-top to-steel-bottom py-12 md:min-h-[55svh]">
                <Blueprint
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full select-none opacity-50"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-steel-bottom)_95%)]" />
                {/* Oversized ghost question mark */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-8 right-4 select-none font-title text-[14rem] font-bold leading-none text-brand-light/[0.08] md:right-16 md:text-[22rem]"
                >
                    ?
                </span>

                <Container className="relative z-10 w-full">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="mx-auto max-w-5xl"
                    >
                        <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
                            <span className="font-mono text-sm uppercase tracking-widest text-brand-light/80">
                                Support · Knowledge Sheet
                            </span>
                            <div className="flex-1 border-t border-dashed border-brand-light/25" />
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            className="font-title text-fluid-5xl font-bold uppercase tracking-tight text-white md:text-6xl"
                        >
                            Questions &amp; <span className="text-brand-light">Answers</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="mt-6 max-w-2xl text-base leading-relaxed text-blue-100/80 md:text-lg"
                        >
                            The {FAQ_COUNT} questions homeowners and businesses ask us most -
                            answered straight, from licensing and estimates to kitchens,
                            additions, basements, and decks across Maryland and Washington, DC.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.25em] text-brand-light/70"
                        >
                            <span>{FAQ_COUNT} Answers</span>
                            <span aria-hidden="true">·</span>
                            <span>MD · DC</span>
                            <span aria-hidden="true">·</span>
                            <span>Since {BUSINESS.foundingYear}</span>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            {/* ── Q&A — category rail + grouped accordions ── */}
            <section className="bg-surface py-16 transition-colors md:py-24">
                <Container>
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12">
                        {/* Category rail — sticky on desktop */}
                        <aside className="lg:col-span-4">
                            <div className="lg:sticky lg:top-24">
                                <motion.div
                                    variants={stagger}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewport}
                                >
                                    <motion.nav
                                        variants={fadeUp}
                                        aria-label="FAQ categories"
                                        className="relative border border-border bg-surface-muted/60"
                                    >
                                        <Corners color="border-main-blue/50" />
                                        <div className="border-b border-border px-5 py-3">
                                            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                                                Index · Categories
                                            </span>
                                        </div>
                                        <ul>
                                            {FAQ_CATEGORIES.map((category, i) => (
                                                <li key={category.id}>
                                                    <a
                                                        href={`#${category.id}`}
                                                        className="group flex items-baseline gap-4 border-b border-border px-5 py-4 transition-colors last:border-b-0 hover:bg-surface"
                                                    >
                                                        <span className="shrink-0 font-mono text-xs tracking-[0.2em] text-main-blue">
                                                            01.{String(i + 1).padStart(2, "0")}
                                                        </span>
                                                        <span className="flex-1 text-base font-semibold text-foreground transition-colors group-hover:text-main-blue">
                                                            {category.label}
                                                        </span>
                                                        <span className="font-mono text-xs text-muted">
                                                            {String(category.items.length).padStart(2, "0")}
                                                        </span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.nav>

                                    {/* Still have a question? — direct line card */}
                                    <motion.div
                                        variants={fadeUp}
                                        className="relative mt-6 overflow-hidden border border-brand-light/25 bg-gradient-to-b from-steel-top to-steel-bottom p-6"
                                    >
                                        <Corners />
                                        <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-light">
                                            Still have a question?
                                        </div>
                                        <p className="mt-3 text-sm leading-relaxed text-blue-100/80">
                                            Talk to the team directly - we respond within 24 hours.
                                        </p>
                                        <a
                                            href={`tel:${BUSINESS.phone}`}
                                            className="mt-4 block font-mono text-xl font-bold tracking-wide text-white transition-colors hover:text-brand-light"
                                        >
                                            {BUSINESS.phoneDisplay}
                                        </a>
                                        <Link
                                            href="/contact"
                                            className="running-border mt-5 flex items-center justify-between gap-2 bg-main-blue px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-main-blue-deep"
                                        >
                                            Ask us anything
                                            <span aria-hidden="true">→</span>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </aside>

                        {/* Grouped accordions */}
                        <div className="lg:col-span-8">
                            {FAQ_CATEGORIES.map((category, catIndex) => (
                                <motion.div
                                    key={category.id}
                                    id={category.id}
                                    variants={stagger}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewport}
                                    className="scroll-mt-24 pb-14 last:pb-0"
                                >
                                    <SectionHeader
                                        prefix="FAQ"
                                        index={String(catIndex + 1).padStart(2, "0")}
                                        kicker={`${category.items.length} Questions`}
                                        title={category.label}
                                    />

                                    <dl className="mt-10">
                                        {category.items.map((item) => {
                                            questionNo += 1;
                                            const n = questionNo;
                                            const open = openFaq === n;
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
                                                            aria-controls={`faq-answer-${n}`}
                                                            onClick={() => setOpenFaq(open ? null : n)}
                                                            className="group flex w-full items-baseline gap-4 py-5 text-left"
                                                        >
                                                            <span className="shrink-0 font-mono text-xs tracking-[0.2em] text-main-blue">
                                                                Q—{String(n).padStart(2, "0")}
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
                                                        id={`faq-answer-${n}`}
                                                        aria-hidden={!open}
                                                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                                    >
                                                        <div className="overflow-hidden">
                                                            <p
                                                                className={`border-l-2 border-main-blue/40 pb-5 pl-5 text-base leading-relaxed text-muted transition-transform duration-500 ease-out sm:ml-14 ${open ? "translate-y-0" : "-translate-y-3"}`}
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
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
