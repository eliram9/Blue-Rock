/**
 * Single source of truth for the business's identity (NAP), used across
 * metadata, JSON-LD, and visible on-page content so the entity reads
 * identically everywhere — a requirement for SEO/GEO entity consistency.
 */

export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bluerockremodeling.com";

export const BUSINESS = {
    name: "Blue Rock Remodeling & Construction",
    shortName: "Blue Rock",
    foundingYear: 2010,
    phone: "+1-240-750-4889",
    phoneDisplay: "(240) 750-4889",
    email: "info@bluerockremodeling.com",
    address: {
        street: "6177 Executive Blvd",
        city: "Rockville",
        region: "MD",
        postalCode: "20852",
        country: "US",
    },
    hours: "Mon–Fri, 9:00 AM – 5:00 PM",
    areaServed: ["Maryland", "Washington, DC", "Virginia"],
    cities: ["Rockville", "Potomac", "Bethesda", "Silver Spring", "Gaithersburg"],
    licenses: [
        "Maryland Home Improvement Commission (MHIC)",
        "General Contractor",
        "New Home Builder",
    ],
    /**
     * Real, verified profile URLs the business owns. Left empty on purpose —
     * fabricated sameAs URLs are penalized. Add the actual Google Business,
     * Yelp, Houzz, and BBB profile links here to strengthen entity signals.
     */
    sameAs: [] as string[],
} as const;
