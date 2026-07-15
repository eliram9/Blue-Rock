import type { Metadata } from "next";
import MiniHero from "@/components/sections/MiniHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import WhoWeAre from "@/components/sections/WhoWeAre";
import OurStory from "@/components/sections/OurStory";
import ReadyToTransform from "@/components/sections/ReadyToTransform";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, BUSINESS } from "@/lib/site";
import { aboutBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Blue Rock Remodeling & Construction is a licensed general contractor serving residential, commercial, and government clients across Maryland and Washington, DC since 2010.",
    alternates: { canonical: `${SITE_URL}/about` },
    openGraph: {
        title: `About ${BUSINESS.name}`,
        description:
            "Licensed DMV general contractor since 2010 — residential, commercial, and government projects. MHIC, GC, and New Home Builder licensed.",
        url: `${SITE_URL}/about`,
        type: "website",
        images: [{ url: "/kitchen.jpg", width: 1200, height: 630, alt: BUSINESS.name }],
    },
};

export default function About() {
    return (
        <main className="min-h-screen bg-ink">
            <JsonLd data={aboutBreadcrumbSchema} />

            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "About Us" },
                ]}
            />

            <MiniHero
                title="ABOUT US"
                subtitle="Crafting Excellence, Constructing Trust"
                imageSrc="/images/hero/blueprint_1.svg"
            />

            {/* 01 · Who We Are */}
            <WhoWeAre />

            {/* 02 · Our Story (+ credentials, recognition, NAP) */}
            <OurStory />

            {/* 03 · Ready to Transform Your Home? (CTA) */}
            <ReadyToTransform />
        </main>
    );
}
