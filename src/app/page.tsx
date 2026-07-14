import Hero from "@/components/sections/Hero";
import TrustedBadges from "@/components/sections/TrustedBadges";
import WhatWeDo from "@/components/sections/WhatWeDo";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ReadyToTransform from "@/components/sections/ReadyToTransform";
import JsonLd from "@/components/seo/JsonLd";
import { servicesCatalogSchema } from "@/lib/schema";

export default function Home(): React.ReactElement {
    return (
        <div className="min-h-screen">
            <JsonLd data={servicesCatalogSchema} />
            <Hero />

            {/* Licensing + review-platform trust strip */}
            <TrustedBadges />

            {/* Flagship services + expandable full catalog */}
            <WhatWeDo />

            {/* Portfolio carousel */}
            <FeaturedProjects />

            {/* CTA band */}
            <ReadyToTransform />
        </div>
    );
}
