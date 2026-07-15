import type { Metadata } from "next";
import FaqShowcase from "@/components/sections/FaqShowcase";
import ReadyToTransform from "@/components/sections/ReadyToTransform";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, BUSINESS } from "@/lib/site";
import { FAQ_CATEGORIES, FAQ_COUNT } from "@/lib/faq";

const PAGE_URL = `${SITE_URL}/faq`;

export const metadata: Metadata = {
    title: "FAQ",
    description: `${FAQ_COUNT} answers about remodeling in Maryland and Washington, DC - licensing, estimates, kitchen and bathroom timelines, home addition permits, basement finishing, and deck care from ${BUSINESS.name}.`,
    alternates: { canonical: PAGE_URL },
    openGraph: {
        title: `Remodeling FAQ | ${BUSINESS.name}`,
        description:
            "Straight answers to the questions homeowners and businesses ask most - timelines, permits, materials, and how Blue Rock works across Maryland and Washington, DC.",
        url: PAGE_URL,
    },
};

export default function FaqPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "FAQ", item: PAGE_URL },
        ],
    };

    /* Mirrors the visible Q&A rendered by FaqShowcase — both read from
       FAQ_CATEGORIES, so structured data and on-page text never drift. */
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_CATEGORIES.flatMap((category) =>
            category.items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
        ),
    };

    return (
        <main className="min-h-screen bg-background transition-colors">
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={faqSchema} />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "FAQ" }
                ]}
            />

            {/* Hero + category rail + grouped accordions */}
            <FaqShowcase />

            {/* CTA band */}
            <ReadyToTransform />
        </main>
    );
}
