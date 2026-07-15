import { SITE_URL, BUSINESS } from "./site";
import { SERVICES } from "./services";

/** Stable @id so every other schema node can reference this one entity. */
export const ORG_ID = `${SITE_URL}/#organization`;

/**
 * Sitewide business entity. GeneralContractor is a schema.org subtype of
 * LocalBusiness, so this doubles as the local-SEO signal (address, phone,
 * hours, area served) and the GEO entity anchor.
 */
export const organizationSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": ORG_ID,
    name: BUSINESS.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logos/BR-logo.png`,
    image: `${SITE_URL}/kitchen.jpg`,
    description:
        "Licensed general contractor serving residential, commercial, and government clients across Maryland and Washington DC since 2010.",
    foundingDate: String(BUSINESS.foundingYear),
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.address.street,
        addressLocality: BUSINESS.address.city,
        addressRegion: BUSINESS.address.region,
        postalCode: BUSINESS.address.postalCode,
        addressCountry: BUSINESS.address.country,
    },
    areaServed: BUSINESS.areaServed.map((name) => ({
        "@type": "AdministrativeArea",
        name,
    })),
    openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
    },
    ...(BUSINESS.sameAs.length > 0 ? { sameAs: BUSINESS.sameAs } : {}),
};

/**
 * Machine-readable service catalog, generated from the same SERVICES data the
 * home-page WhatWeDo section renders — visible content and schema never drift.
 */
export const servicesCatalogSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${BUSINESS.name} — Construction & Remodeling Services`,
    itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.blurb,
            url: `${SITE_URL}${service.href}`,
            provider: { "@id": ORG_ID },
            areaServed: BUSINESS.areaServed.map((name) => ({
                "@type": "AdministrativeArea",
                name,
            })),
        },
    })),
};

/** Breadcrumb trail for the About page. */
export const aboutBreadcrumbSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
            "@type": "ListItem",
            position: 2,
            name: "About Us",
            item: `${SITE_URL}/about`,
        },
    ],
};

/** Real, answer-first Q&A pairs that mirror the visible FAQ on the About page. */
export const aboutFaqSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Where does Blue Rock Remodeling & Construction work?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Blue Rock serves the DMV area — Maryland and Washington DC — including Rockville, Potomac, Bethesda, Silver Spring, and Gaithersburg.",
            },
        },
        {
            "@type": "Question",
            name: "Is Blue Rock Remodeling & Construction licensed and insured?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Blue Rock holds a Maryland Home Improvement Commission (MHIC) license, a General Contractor license, and a New Home Builder license, and is fully insured.",
            },
        },
        {
            "@type": "Question",
            name: "What types of clients does Blue Rock work with?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Blue Rock takes on residential, commercial, and government projects — one contractor covering all three sectors across the DMV.",
            },
        },
        {
            "@type": "Question",
            name: "When was Blue Rock Remodeling & Construction founded?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Blue Rock was founded in 2010 and has served the DMV for more than 15 years.",
            },
        },
    ],
};
