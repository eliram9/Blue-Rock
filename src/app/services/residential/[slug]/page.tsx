import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MiniHero from "@/components/sections/MiniHero";
import ReadyToTransform from "@/components/sections/ReadyToTransform";
import ServiceDetailSections from "@/components/sections/ServiceDetailSections";
import ServiceSplitSections from "@/components/sections/ServiceSplitSections";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, BUSINESS } from "@/lib/site";
import { ORG_ID } from "@/lib/schema";
import { SERVICES, SERVICE_DETAILS, SERVICE_SPLITS } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return SERVICES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug);
    if (!service) return {};

    return {
        title: service.seoTitle ?? service.title,
        description:
            service.seoDescription ??
            `${service.blurb} Licensed general contractor serving ${BUSINESS.areaServed.join(", ")}.`,
        alternates: { canonical: `${SITE_URL}${service.href}` },
        openGraph: {
            title: service.seoTitle ?? service.title,
            description: service.seoDescription ?? service.blurb,
            url: `${SITE_URL}${service.href}`,
            ...(service.image && {
                images: [{ url: service.image, alt: `${service.title} by ${BUSINESS.name}` }],
            }),
        },
    };
}

export default async function ServicePage({ params }: Props) {
    const { slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug);
    if (!service) notFound();

    const detail = SERVICE_DETAILS[slug];
    const split = SERVICE_SPLITS[slug];
    const pageUrl = `${SITE_URL}${service.href}`;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
                "@type": "ListItem",
                position: 2,
                name: "Residential Services",
                item: `${SITE_URL}/services/residential`,
            },
            { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
        ],
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        serviceType: service.title,
        url: pageUrl,
        provider: { "@id": ORG_ID },
        areaServed: BUSINESS.areaServed.map((name) => ({
            "@type": "AdministrativeArea",
            name,
        })),
        description: service.intro[0],
    };

    /* FAQPage schema mirrors the visible Q&A, whichever component renders it
       — answers must stay identical in meaning to the on-page text. A service
       has one layout or the other, so the two never both supply questions. */
    const faqItems = detail?.faq ?? split?.faq;
    /* Length-checked, not just truthy: an empty `faq: []` would otherwise emit
       an FAQPage carrying no questions while the component renders no visible
       Q&A - markup with nothing behind it. */
    const faqSchema = faqItems?.length ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
    } : undefined;

    return (
        <main className="min-h-screen bg-background transition-colors">
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={serviceSchema} />
            {faqSchema && <JsonLd data={faqSchema} />}

            {/* Breadcrumb bar — same component as the category pages */}
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Residential", href: "/services/residential" },
                    { label: service.title },
                ]}
            />

            {/* Tier-3 subcategory hero — brand tint only over light renders */}
            <MiniHero
                title={service.title.toUpperCase()}
                subtitle={service.blurb}
                imageSrc={service.image}
                size="subcategory"
                tint={Boolean(service.image)}
            />
 
            {/* Designed detail sections — only for services with rich content */}
            {detail && <ServiceDetailSections detail={detail} />}

            {/* Photo/copy bands — the lighter treatment for services with
                photography but no documented process or before/after set */}
            {split && <ServiceSplitSections band={split} />}

            {/* CTA band */}
            <ReadyToTransform />
        </main>
    );
}
