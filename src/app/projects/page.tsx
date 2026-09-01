import type { Metadata } from "next";
import MiniHero from "@/components/sections/MiniHero";
import ProjectsIndex from "@/components/sections/ProjectsIndex";
import ReadyToTransform from "@/components/sections/ReadyToTransform";
import JsonLd from "@/components/seo/JsonLd";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/projects`;

export const metadata: Metadata = {
    title: "Our Projects",
    description:
        "Explore Blue Rock Remodeling's portfolio of completed kitchen, bathroom, basement, addition, and exterior projects across Maryland and Washington DC.",
    alternates: { canonical: PAGE_URL },
    openGraph: {
        title: "Completed Projects | Blue Rock Remodeling",
        description:
            "Kitchens, bathrooms, basements, additions, and exteriors completed across Maryland and Washington, DC by a licensed, insured contractor working since 2010.",
        url: PAGE_URL,
        images: [
            {
                url: PROJECTS[0].cover.src,
                alt: PROJECTS[0].cover.alt,
            },
        ],
    },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Projects", item: PAGE_URL },
    ],
};

export default function Projects() {
    return (
        <main className="min-h-screen bg-background transition-colors">
            <JsonLd data={breadcrumbSchema} />

            <MiniHero
                title="OUR PROJECTS"
                subtitle="A portfolio of finished work across the DMV"
                imageSrc="/images/hero/projects.webp"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
            />

            <ProjectsIndex />

            <ReadyToTransform />
        </main>
    );
}
