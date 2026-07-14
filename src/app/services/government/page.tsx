import type { Metadata } from "next";
import MiniHero from "@/components/sections/MiniHero";
import GovernmentCapabilities from "@/components/sections/GovernmentCapabilities";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, BUSINESS } from "@/lib/site";
import { ORG_ID } from "@/lib/schema";
import { GOV_NAICS } from "@/lib/government";

const PAGE_URL = `${SITE_URL}/services/government`;

export const metadata: Metadata = {
    title: "Government Contracting",
    description:
        "SAM-registered general contractor (CAGE 9U3H6, UEI VSCDRQLFUAW3) providing renovation, demolition, fencing, site development, and construction services to federal, state, and local government clients in the DMV.",
    alternates: { canonical: PAGE_URL },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Government Contracting", item: PAGE_URL },
    ],
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Government Construction Contracting",
    serviceType: "Government facility construction, renovation, demolition, fencing, and site development",
    url: PAGE_URL,
    provider: { "@id": ORG_ID },
    areaServed: BUSINESS.areaServed.map((name) => ({
        "@type": "AdministrativeArea",
        name,
    })),
    description:
        "Full-service construction and facilities contracting for federal, state, local government, and institutional clients — SAM registered with active procurement eligibility.",
    identifier: [
        { "@type": "PropertyValue", propertyID: "CAGE", value: "9U3H6" },
        { "@type": "PropertyValue", propertyID: "UEI", value: "VSCDRQLFUAW3" },
        ...GOV_NAICS.map((row) => ({
            "@type": "PropertyValue",
            propertyID: "NAICS",
            value: row.code,
        })),
    ],
};

export default function GovernmentServices() {
    return (
        <main className="min-h-screen bg-background transition-colors">
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={serviceSchema} />

            {/* Breadcrumb bar */}
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Services" },
                    { label: "Government" },
                ]}
            />

            {/* Category-tier hero — brand tint over the light render */}
            <MiniHero
                title="GOVERNMENT CONTRACTING"
                subtitle="Renovation, demolition, fencing, site development, and general construction for federal, state, local government, and institutional clients"
                imageSrc="/images/hero/government.png"
                tint
            />

            {/* Capability statement, overview, capabilities, past performance,
                NAICS schedule, CTA */}
            <GovernmentCapabilities />
        </main>
    );
}
