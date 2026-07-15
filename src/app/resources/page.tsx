import type { Metadata } from "next";
import MiniHero from "@/components/sections/MiniHero";
import Container from "@/components/ui/Container";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Resources",
    description:
        "Guides and helpful information on remodeling, permits, and planning from Blue Rock Remodeling — licensed general contractor in Rockville, MD.",
    alternates: { canonical: `${SITE_URL}/resources` },
};

export default function Resources() {
    return (
        <main className="min-h-screen bg-background transition-colors">
            <MiniHero
                title="RESOURCES"
                subtitle="Guides and helpful information for planning your project"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources" }]}
            />

            <section className="bg-surface py-16 transition-colors md:py-24">
                <Container>
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-base leading-relaxed text-muted md:text-lg">
                            Remodeling guides and planning resources are on the way —
                            check back soon.
                        </p>
                    </div>
                </Container>
            </section>
        </main>
    );
}
