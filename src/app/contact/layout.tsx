import type { Metadata } from "next";
import { SITE_URL, BUSINESS } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/contact`;

/* contact/page.tsx is a client component and can't export metadata, so it
   was inheriting the root layout's canonical ("/"), title and description -
   telling search engines to index the homepage instead of this page. */
export const metadata: Metadata = {
    title: "Contact Us",
    description: `Request a free quote from ${BUSINESS.name}. Call ${BUSINESS.phoneDisplay} or visit our Rockville, MD office, serving ${BUSINESS.areaServed.join(" and ")}.`,
    alternates: { canonical: PAGE_URL },
    openGraph: {
        title: `Contact ${BUSINESS.name}`,
        description: `Free remodeling quotes across ${BUSINESS.areaServed.join(" and ")}. Call ${BUSINESS.phoneDisplay} or send a project inquiry.`,
        url: PAGE_URL,
        type: "website",
        images: [{ url: "/kitchen.jpg", width: 1200, height: 630, alt: BUSINESS.name }],
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
