import type { Metadata } from "next";
import CommercialShowcase from "@/components/sections/CommercialShowcase";
import MiniHero from "@/components/sections/MiniHero";
import ReadyToTransform from "@/components/sections/ReadyToTransform";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, BUSINESS } from "@/lib/site";
import { ORG_ID } from "@/lib/schema";

const PAGE_URL = `${SITE_URL}/services/commercial`;

export const metadata: Metadata = {
    title: "Commercial Services",
    description:
        "Commercial general contractor in Maryland and Washington, DC - office build-outs, retail renovations, restaurant interiors, and commercial kitchen upgrades with minimal disruption to your business. BBB A+ rated, licensed and insured since 2010.",
    alternates: { canonical: PAGE_URL },
    openGraph: {
        title: "Commercial Construction & Renovation | Blue Rock Remodeling",
        description:
            "Office build-outs, retail renovations, restaurant interiors, and commercial kitchen upgrades across Maryland and Washington, DC - scheduled around your operating hours.",
        url: PAGE_URL,
        images: [{ url: "/images/hero/commercial.png", alt: `Commercial construction by ${BUSINESS.name}` }],
    },
};

export default function CommercialServices() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Commercial Services", item: PAGE_URL },
        ],
    };

    /* Description mirrors the visible section-01 copy so structured data and
       on-page content never drift. */
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Commercial Construction & Renovation",
        serviceType: "Commercial General Contracting",
        url: PAGE_URL,
        provider: { "@id": ORG_ID },
        areaServed: BUSINESS.areaServed.map((name) => ({
            "@type": "AdministrativeArea",
            name,
        })),
        description:
            "With over a decade of experience and a Better Business Bureau A+ rating, Blue Rock Remodeling brings the same craftsmanship from residential projects to commercial spaces across Maryland and DC - office build-outs, retail renovations, restaurant interiors, and full commercial kitchen upgrades.",
    };

    return (
        <main className="min-h-screen bg-background transition-colors">
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={serviceSchema} />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Services" },
                    { label: "Commercial" }
                ]}
            />

            {/* Hero Section — brand tint over the light render */}
            <MiniHero
                title="COMMERCIAL SERVICES"
                subtitle="Spaces That Work as Hard as Your Business"
                imageSrc="/images/hero/commercial.png"
                tint
            />

            {/* Designed sections: overview + scope, disruption-free delivery,
                trust checklist */}
            <CommercialShowcase />

            {/* CTA band */}
            <ReadyToTransform />
        </main>
    );
}
