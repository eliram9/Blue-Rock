"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Blueprint from "../../../public/svg/test3";
import Container from "@/components/ui/Container";
import Corners from "@/components/ui/Corners";
import MiniHero from "@/components/sections/MiniHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { BUSINESS } from "@/lib/site";
import { SITE_CONFIG } from "@/constants/config";

type Status = "idle" | "submitting" | "success" | "error";

const INITIAL_FORM = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "residential",
    message: "",
};

/* The four required text fields, rendered into a 2-column grid via .map() */
const CONTACT_FIELDS = [
    { name: "firstName", type: "text", label: "First Name", placeholder: "Enter your first name" },
    { name: "lastName", type: "text", label: "Last Name", placeholder: "Enter your last name" },
    { name: "email", type: "email", label: "Email Address", placeholder: "your.email@example.com" },
    { name: "phone", type: "tel", label: "Phone Number", placeholder: "(555) 123-4567" },
] as const;

/* Direct-line sheet rows — values come from BUSINESS/SITE_CONFIG, never
   hardcoded, so contact details stay in sync site-wide. */
const DIRECT_LINE_ROWS: { label: string; content: React.ReactNode; note?: string }[] = [
    {
        label: "Call Now",
        note: "Fastest way to reach us - talk to the team directly.",
        content: (
            <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="mt-2 block font-mono text-2xl font-bold tracking-wide text-white transition-colors hover:text-brand-light md:text-3xl"
            >
                {SITE_CONFIG.phoneDisplay}
            </a>
        ),
    },
    {
        label: "Email Us",
        note: "Plans, photos, and project details welcome.",
        content: (
            <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="mt-2 block break-all font-mono text-lg font-bold tracking-wide text-white transition-colors hover:text-brand-light md:text-xl"
            >
                {SITE_CONFIG.email}
            </a>
        ),
    },
    {
        label: "Business Hours",
        content: (
            <div className="mt-3 space-y-2">
                {BUSINESS.hoursDisplay.map((row) => (
                    <div key={row.days} className="flex items-baseline justify-between gap-4">
                        <span className="text-sm text-blue-100/70">{row.days}</span>
                        <span className="font-mono text-sm font-bold text-white">{row.hours}</span>
                    </div>
                ))}
            </div>
        ),
    },
    {
        label: "Address",
        note: `Serving ${BUSINESS.areaServed.join(" and ")}.`,
        content: (
            <address className="mt-2 not-italic text-base leading-relaxed text-blue-100/90">
                {SITE_CONFIG.address}
            </address>
        ),
    },
];

/* Shared field styling — drafting-sheet inputs on the themed surface */
const inputClass =
    "w-full border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted/60 transition-colors focus:border-main-blue focus:outline-none focus:ring-1 focus:ring-main-blue";
const labelClass =
    "mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-main-blue";

const SERVICE_OPTIONS = [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "government", label: "Government" },
    { value: "renovation", label: "Renovation" },
    { value: "other", label: "Other" },
] as const;

export default function Contact() {
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [website, setWebsite] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (status !== "success" && status !== "error") return;
        const timer = setTimeout(() => {
            setStatus("idle");
            setErrorMessage("");
        }, 10000);
        return () => clearTimeout(timer);
    }, [status]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    /* Button stays inert gray until every required field has content */
    const isComplete = [
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone,
        formData.message,
    ].every((value) => value.trim() !== "");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, website }),
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                setStatus("error");
                setErrorMessage(data.error || "Something went wrong. Please try again.");
                return;
            }

            setStatus("success");
            setFormData(INITIAL_FORM);
            setWebsite("");
        } catch {
            setStatus("error");
            setErrorMessage("Network error. Please check your connection and try again.");
        }
    };

    return (
        <main className="min-h-screen bg-background transition-colors">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Contact" }
                ]}
            />

            {/* Hero Section — no breadcrumbs prop; the standalone Breadcrumb
                bar above already renders the trail */}
            <MiniHero
                title="CONTACT US"
                subtitle="Let's Bring Your Vision to Life"
            />

            {/* ── 01 · Project inquiry — form sheet + direct-line panel ── */}
            <section className="bg-surface py-16 transition-colors md:py-24">
                <Container>
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="mx-auto max-w-7xl"
                    >
                        {/* Section label */}
                        <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
                            <span className="font-mono text-sm uppercase tracking-widest text-light-blue/80">
                                Contact 01.01 · Project Inquiry
                            </span>
                            <div className="flex-1 border-t border-dashed border-light-blue/25" />
                        </motion.div>

                        {/* Oversized headline */}
                        <motion.div variants={fadeUp} className="relative">
                            <span className="pointer-events-none absolute -top-10 -left-2 select-none font-title text-[7rem] font-bold leading-none text-light-blue/[0.25] md:text-[11rem]">
                                01
                            </span>
                            <h2 className="relative ml-20 font-title text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
                                Start the Conversation
                            </h2>
                        </motion.div>
                        <motion.div variants={fadeUp} className="mt-20 h-0.5 w-16 bg-main-blue" />

                        <div className="mt-12 grid gap-12 lg:grid-cols-2">
                            {/* Left Column — inquiry form as a drafting sheet */}
                            <motion.div
                                variants={fadeUp}
                                className="relative border border-border bg-surface-muted/40"
                            >
                                <Corners color="border-main-blue/50" />

                                {/* Title block strip */}
                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-6 py-3">
                                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                                        Project Inquiry · Form CT—1.1
                                    </span>
                                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                                        Response within 24h
                                    </span>
                                </div>

                                <div className="p-6 md:p-8">
                                    <h3 className="font-title text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl">
                                        Send Us a Message
                                    </h3>
                                    <p className="mt-2 mb-8 text-muted">
                                        Fill out the form below and we&apos;ll get back to you within 24 hours.
                                    </p>

                                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                                        {/* Honeypot — hidden from users, bots fill it */}
                                        <input
                                            type="text"
                                            name="website"
                                            value={website}
                                            onChange={(e) => setWebsite(e.target.value)}
                                            tabIndex={-1}
                                            autoComplete="off"
                                            aria-hidden="true"
                                            className="absolute left-[-9999px] w-px h-px opacity-0"
                                        />

                                        {/* Contact fields — name / email / phone in one mapped grid */}
                                        <div className="grid gap-6 md:grid-cols-2">
                                            {CONTACT_FIELDS.map((field) => (
                                                <div key={field.name}>
                                                    <label htmlFor={field.name} className={labelClass}>
                                                        {field.label} <span className="text-error">*</span>
                                                    </label>
                                                    <input
                                                        type={field.type}
                                                        id={field.name}
                                                        name={field.name}
                                                        value={formData[field.name]}
                                                        onChange={handleChange}
                                                        placeholder={field.placeholder}
                                                        className={inputClass}
                                                        required
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Service Needed */}
                                        <div>
                                            <span className={labelClass}>Service Needed</span>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                {SERVICE_OPTIONS.map((option) => (
                                                    <label
                                                        key={option.value}
                                                        className="flex cursor-pointer items-center border border-border bg-surface p-4 transition-colors hover:border-main-blue/50 has-[:checked]:border-main-blue has-[:checked]:bg-light-blue/[0.07]"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="service"
                                                            value={option.value}
                                                            checked={formData.service === option.value}
                                                            onChange={handleChange}
                                                            className="h-4 w-4 accent-main-blue"
                                                        />
                                                        <span className="ml-3 text-foreground">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label htmlFor="message" className={labelClass}>
                                                Message <span className="text-error">*</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={6}
                                                placeholder="Tell us about your project, any specific requirements, or questions you have..."
                                                className={`${inputClass} resize-none`}
                                                required
                                            ></textarea>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={!isComplete || status === "submitting"}
                                            className={`w-full px-8 py-4 font-bold font-mono text-md uppercase tracking-[0.25em] transition-colors disabled:cursor-not-allowed ${
                                                isComplete
                                                    ? "running-border bg-main-blue text-white hover:bg-main-blue-deep disabled:opacity-60"
                                                    : "border border-border bg-surface-muted text-muted"
                                            }`}
                                        >
                                            {status === "submitting" ? "Sending..." : "Get Your Free Quote"}
                                        </button>

                                        {status === "success" && (
                                            <div className="border border-success/40 bg-success/10 px-4 py-3 text-sm text-success">
                                                Thanks! Your message has been sent. We&apos;ll get back to you within 24 hours.
                                            </div>
                                        )}
                                        {status === "error" && (
                                            <div className="border border-error/40 bg-error/10 px-4 py-3 text-sm text-error">
                                                {errorMessage}
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </motion.div>

                            {/* Right Column — direct-line panel on the steel band
                                (fixed ink art direction, identical in both themes) */}
                            <motion.div
                                variants={fadeUp}
                                className="relative overflow-hidden border border-brand-light/25 bg-gradient-to-b from-steel-top to-steel-bottom shadow-2xl"
                            >
                                {/* Blueprint layer — same fixed-white sheet as the CTA band */}
                                <Blueprint
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 h-full w-full select-none opacity-50"
                                />
                                {/* Radial vignette grounds the sheet into the steel */}
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-steel-bottom)_95%)]" />

                                {/* Logo Watermark */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
                                    <Image
                                        src="/logos/BR-logo2.png"
                                        alt="Blue Rock Logo"
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Content — flex column so the sheet fills the panel */}
                                <div className="relative z-10 flex h-full flex-col p-6 md:p-8">
                                    {/* Section label */}
                                    <div className="mb-6 flex items-center gap-3">
                                        <span className="font-mono text-sm uppercase tracking-widest text-brand-light/80">
                                            Contact · Direct Line
                                        </span>
                                        <div className="flex-1 border-t border-dashed border-brand-light/25" />
                                    </div>

                                    <h2 className="font-title text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                                        Need Immediate <span className="text-brand-light">Help?</span>
                                    </h2>
                                    <p className="mt-4 text-base leading-relaxed text-blue-100/80">
                                        Our expert team is ready to assist you with any remodeling emergency or question you may have.
                                    </p>

                                    {/* Contact sheet — rows flex to fill the full height */}
                                    <div className="relative mt-8 flex flex-1 flex-col border border-brand-light/25 bg-gradient-to-b from-ink-soft/80 to-ink/40 backdrop-blur-sm">
                                        <Corners color="border-brand-light" />

                                        {/* Title block strip — name reads from BUSINESS so the
                                            entity stays identical everywhere (NAP consistency) */}
                                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-light/20 px-6 py-3">
                                            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-100/60">
                                                {BUSINESS.name}
                                            </span>
                                            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-100/60">
                                                Sheet CT—1.0 · Rev. A
                                            </span>
                                        </div>

                                        {/* Readout rows — mapped; each stretches (flex-1) so the
                                            sheet fills the panel's full height */}
                                        {DIRECT_LINE_ROWS.map((row) => (
                                            <div
                                                key={row.label}
                                                className="group flex flex-1 flex-col justify-center border-b border-brand-light/15 px-6 py-5 transition-colors last:border-b-0 hover:bg-brand-light/[0.07]"
                                            >
                                                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-light">
                                                    {row.label}
                                                </div>
                                                {row.content}
                                                {row.note && (
                                                    <div className="mt-2 text-sm leading-relaxed text-blue-100/60">
                                                        {row.note}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </Container>
            </section>
        </main>
    );
}
