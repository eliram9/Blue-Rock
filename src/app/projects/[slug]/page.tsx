import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MiniHero from "@/components/sections/MiniHero";
import ProjectDetailSections from "@/components/sections/ProjectDetailSections";
import ReadyToTransform from "@/components/sections/ReadyToTransform";
import JsonLd from "@/components/seo/JsonLd";
import { ORG_ID } from "@/lib/schema";
import { DETAIL_PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

/* Only projects with a real photo set are built. A page per cover photo would
   be thin content competing with the service pages for the same terms; see
   hasDetailPage in lib/projects.ts. */
export function generateStaticParams() {
    return DETAIL_PROJECTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = DETAIL_PROJECTS.find((p) => p.slug === slug);
    if (!project) return {};

    const url = `${SITE_URL}/projects/${project.slug}`;
    const where = project.location ? ` in ${project.location}` : "";

    return {
        title: project.title,
        description: project.summary,
        alternates: { canonical: url },
        openGraph: {
            title: `${project.title}${where} | Blue Rock Remodeling`,
            description: project.summary,
            url,
            images: [{ url: project.cover.src, alt: project.cover.alt }],
        },
    };
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = DETAIL_PROJECTS.find((p) => p.slug === slug);
    if (!project) notFound();

    const url = `${SITE_URL}/projects/${project.slug}`;
    const photos = [project.cover, ...project.photos];

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
            { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
    };

    const gallerySchema = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "@id": url,
        name: project.title,
        description: project.summary,
        url,
        provider: { "@id": ORG_ID },
        /* Only emitted where the month is actually known - most records have
           no completedAt, and inventing one would be a lie in structured data. */
        ...(project.completedAt ? { datePublished: `${project.completedAt}-01` } : {}),
        ...(project.location ? { contentLocation: { "@type": "Place", name: project.location } } : {}),
        image: photos.map((photo) => ({
            "@type": "ImageObject",
            contentUrl: `${SITE_URL}${photo.src}`,
            caption: photo.caption ?? photo.alt,
        })),
    };

    return (
        <main className="min-h-screen bg-background transition-colors">
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={gallerySchema} />

            <MiniHero
                title={project.title}
                subtitle={project.location ?? undefined}
                imageSrc={project.cover.src}
                size="subcategory"
                tint
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Projects", href: "/projects" },
                    { label: project.title },
                ]}
            />

            <ProjectDetailSections project={project} />

            <ReadyToTransform />
        </main>
    );
}
