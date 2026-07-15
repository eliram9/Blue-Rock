import type { Metadata } from "next";
import MiniHero from "@/components/sections/MiniHero";
import ReadyToTransform from "@/components/sections/ReadyToTransform";
import ResidentialShowcase from "@/components/sections/ResidentialShowcase";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Residential Services",
    description:
        "Kitchen and bathroom remodeling, home additions, basement finishing, and more - MHIC-licensed residential remodeling across Maryland and Washington, DC since 2010.",
    alternates: { canonical: `${SITE_URL}/services/residential` },
    openGraph: {
        title: "Residential Remodeling Services | Blue Rock Remodeling",
        description:
            "Kitchen and bathroom remodeling, home additions, basement finishing, and more across Maryland and Washington, DC.",
        url: `${SITE_URL}/services/residential`,
        images: [{ url: "/images/hero/residential.png", alt: "Residential remodeling by Blue Rock Remodeling" }],
    },
};

export default function ResidentialServices() {
    return (
        <main className="min-h-screen bg-background transition-colors">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Services" },
                    { label: "Residential" }
                ]}
            />

            {/* Category-tier hero — brand tint over the light render */}
            <MiniHero
                title="RESIDENTIAL SERVICES"
                subtitle="Transforming Houses into Dream Homes"
                imageSrc="/images/hero/residential.png"
                tint
            />

            {/* Designed sections: overview + credentials, service index,
                homeowner checklist */}
            <ResidentialShowcase />

            {/* CTA band */}
            <ReadyToTransform />
        </main>
    );
}
