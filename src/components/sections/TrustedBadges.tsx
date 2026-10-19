"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    IconBuildingMonument,
    IconHelmet,
    IconHomeCheck,
    IconHomePlus,
    type Icon,
} from "@tabler/icons-react";
import Blueprint from "@/components/svg/BlueprintGrid";
import Corners from "@/components/ui/Corners";
import RecognitionLogos from "@/components/ui-elements/RecognitionLogos";
import { SOCIAL_LINKS } from "@/constants/social";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { BUSINESS } from "@/lib/site";

type License = (typeof BUSINESS.licenses)[number];

/* Keyed by the license name so adding one to BUSINESS.licenses without
   describing it here is a type error, not a silently blank cell. */
const LICENSE_DETAILS: Record<License, { icon: Icon; scope: string }> = {
    "Maryland Home Improvement Commission (MHIC)": {
        icon: IconHomeCheck,
        scope: "Licensed for home improvement work throughout Maryland.",
    },
    "D.C. Home Improvement Contractor": {
        icon: IconBuildingMonument,
        scope: "Licensed for home improvement work in the District of Columbia.",
    },
    "General Contractor": {
        icon: IconHelmet,
        scope: "Full-scope construction, from structural work to finishes.",
    },
    "New Home Builder": {
        icon: IconHomePlus,
        scope: "Ground-up custom homes, from foundation to final walkthrough.",
    },
};

/* Dashed ledger rules between cells: stacked on mobile, 2×2 from sm up. */
function cellRules(i: number) {
    return [
        i > 0 ? "border-t" : "",
        i < 2 ? "sm:border-t-0" : "",
        i % 2 === 1 ? "sm:border-l" : "",
    ].join(" ");
}

/**
 * Home-page trust band: a credential ledger (headline left, licenses as a
 * drafting-sheet panel right), then the "as reviewed on" logo marquee.
 * Themed surface — flips with light/dark.
 */
export default function TrustedBadges() {
    return (
        <section className="relative overflow-hidden bg-surface py-20 transition-colors md:py-28">
            <Blueprint
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full select-none text-light-blue opacity-30"
            />

            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:items-center lg:gap-16"
            >
                {/* Copy column */}
                <div className="lg:col-span-5">
                    <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
                        <span className="h-px w-8 bg-main-blue/50" />
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-main-blue">
                            Licensed · Insured · Trusted
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeUp}
                        className="font-title text-4xl font-normal uppercase leading-[1.05] tracking-[0.015em] text-foreground md:text-5xl"
                    >
                        Credentials You Can Verify
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        className="mt-6 max-w-md text-base leading-relaxed text-foreground/80 md:text-lg"
                    >
                        Licensed in Maryland and Washington, D.C. for remodels, additions, and
                        new-home builds. Each credential is a public record you can check with
                        its issuing board.
                    </motion.p>

                    {/* BBB accreditation: same badge as the footer, linked to the live profile */}
                    <motion.a
                        variants={fadeUp}
                        href={SOCIAL_LINKS.bbb}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Better Business Bureau: Accredited Business, A+ rating (opens in a new tab)"
                        className="mt-8 inline-block rounded-full transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main-blue motion-reduce:transition-none"
                    >
                        <Image
                            src="/social/bbb-footer.png"
                            alt="Better Business Bureau Accredited Business, A+ rating"
                            width={389}
                            height={164}
                            sizes="(min-width: 768px) 166px, 142px"
                            className="h-[60px] w-auto md:h-[70px]"
                        />
                    </motion.a>
                </div>

                {/* Credential ledger */}
                <motion.ul
                    variants={fadeUp}
                    className="relative grid border border-border bg-surface-muted/70 backdrop-blur-[2px] sm:grid-cols-2 lg:col-span-7"
                >
                    <Corners color="border-main-blue/60" />
                    {BUSINESS.licenses.map((license, i) => {
                        const { icon: LicenseIcon, scope } = LICENSE_DETAILS[license];
                        return (
                            <li
                                key={license}
                                className={`group flex flex-col border-dashed border-border p-6 md:p-7 ${cellRules(i)}`}
                            >
                                <div className="flex items-start justify-between">
                                    <span className="grid h-11 w-11 place-items-center bg-main-blue/10 text-main-blue transition-colors duration-300 group-hover:bg-main-blue group-hover:text-white motion-reduce:transition-none">
                                        <LicenseIcon aria-hidden="true" size={22} stroke={1.75} />
                                    </span>
                                    <span className="font-mono text-sm text-muted">
                                        0{i + 1}
                                    </span>
                                </div>
                                <h3 className="mt-5 text-lg font-semibold leading-snug text-foreground">
                                    {license}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                                    {scope}
                                </p>
                            </li>
                        );
                    })}
                </motion.ul>
            </motion.div>

            {/* Divider */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="relative z-10 mx-auto mt-16 flex max-w-6xl items-center gap-4 px-6 md:mt-20"
            >
                <span className="flex-1 border-t border-dashed border-border" />
                <span className="whitespace-nowrap font-mono text-md uppercase tracking-[0.2em] text-muted">
                    As reviewed on
                </span>
                <span className="flex-1 border-t border-dashed border-border" />
            </motion.div>

            {/* Review-logo marquee — outside the container so it runs full-bleed */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="relative z-10 mt-8"
            >
                <RecognitionLogos />
            </motion.div>
        </section>
    );
}
