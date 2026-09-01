import type { Metadata } from "next";
import MiniHero from "@/components/sections/MiniHero";
import ReadyToTransform from "@/components/sections/ReadyToTransform";
import ResourcesComingSoon from "@/components/sections/ResourcesComingSoon";
import JsonLd from "@/components/seo/JsonLd";
import { ORG_ID } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/resources`;

export const metadata: Metadata = {
    title: "Resources",
    description:
        "Remodeling guides on permits, budgeting, and planning are in development at Blue Rock Remodeling, a licensed general contractor in Rockville, MD.",
    alternates: { canonical: PAGE_URL },
    openGraph: {
        title: "Resources | Blue Rock Remodeling",
        description:
            "Permitting, budgeting, and planning guides for Maryland and Washington, DC remodels are being written.",
        url: PAGE_URL,
    },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Resources", item: PAGE_URL },
    ],
};

/* CollectionPage rather than Article/FAQPage: the library has no published
   entries yet, and marking up guides that do not exist would be a fabricated
   claim to both search engines and answer engines. */
const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}#page`,
    url: PAGE_URL,
    name: "Remodeling Resources",
    description:
        "Guides on permitting, budgeting, and planning a remodel in Maryland and Washington, DC, in development by Blue Rock Remodeling & Construction.",
    /* ORG_ID is the sitewide entity anchor in lib/schema — reference it rather
       than restating the organization, so the graph resolves to one node. */
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
};

export default function Resources() {
    return (
        <main className="min-h-screen bg-background transition-colors">
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={collectionSchema} />

            <MiniHero
                title="RESOURCES"
                subtitle="Guides and helpful information for planning your project"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources" }]}
            />

            <ResourcesComingSoon />

            <ReadyToTransform />
        </main>
    );
}
