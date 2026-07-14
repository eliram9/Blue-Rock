import type { Metadata } from "next";
import MiniHero from "@/components/sections/MiniHero";
import Container from "@/components/ui/Container";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Our Projects",
    description:
        "Explore Blue Rock Remodeling's portfolio of completed kitchen, bathroom, basement, and whole-home projects across Maryland, Washington DC, and Virginia.",
    alternates: { canonical: `${SITE_URL}/projects` },
};

export default function Projects() {
    return (
        <main className="min-h-screen bg-background transition-colors">
            <MiniHero
                title="OUR PROJECTS"
                subtitle="A portfolio of finished work across the DMV"
                size="subcategory"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
            />

            <section className="bg-surface py-16 transition-colors md:py-24">
                <Container>
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-base leading-relaxed text-muted md:text-lg">
                            Project gallery coming soon — we&apos;re curating photography
                            from recent kitchens, bathrooms, basements, and additions.
                        </p>
                    </div>
                </Container>
            </section>
        </main>
    );
}
