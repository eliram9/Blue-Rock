import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MiniHero from "@/components/sections/MiniHero";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
    title: "Government Services | BlueRock",
    description:
        "Blue Rock Remodeling provides general contracting services for federal, state, and municipal facilities in Rockville, MD — renovations, ADA compliance upgrades, and build-outs for public agencies.",
};

export default function GovernmentServices() {
    const services = [
        {
            title: "Facility Renovations",
            description: "Comprehensive renovations for federal, state, and municipal buildings, delivered on schedule with minimal disruption to public services and daily operations.",
            image: "/kitchen.jpg",
        },
        {
            title: "ADA Compliance Upgrades",
            description: "Accessibility improvements including ramps, restroom retrofits, door hardware, and signage that bring public facilities into full ADA compliance.",
            image: "/kitchen.jpg",
        },
        {
            title: "Office Build-Outs",
            description: "Functional, durable office build-outs for public agencies with efficient layouts, modern lighting, and finishes built to withstand heavy daily use.",
            image: "/kitchen.jpg",
        },
        {
            title: "Restroom Modernization",
            description: "Upgrade public restrooms with durable fixtures, slip-resistant tiling, water-efficient plumbing, and layouts that meet current accessibility standards.",
            image: "/kitchen.jpg",
        },
        {
            title: "Exterior & Site Improvements",
            description: "Building envelope repairs, siding and window replacements, and site improvements that extend facility life and reduce maintenance costs.",
            image: "/kitchen.jpg",
        },
        {
            title: "Demolition Services",
            description: "Safe, controlled demolition and site preparation using professional equipment, with strict adherence to safety and environmental requirements.",
            image: "/kitchen.jpg",
        },
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Services" },
                    { label: "Government" }
                ]}
            />

            {/* Hero Section */}
            <MiniHero
                title="GOVERNMENT SERVICES"
                subtitle="Professional General Contracting in Rockville, MD"
            />

            {/* Introduction Section */}
            <section className="py-20 md:py-28">
                <Container>
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Expert Government Contracting
                        </h2>
                        <div className="w-24 h-1 bg-light-blue mx-auto mb-8"></div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            Blue Rock Remodeling partners with federal, state, and municipal agencies to renovate
                            and maintain public facilities with quality workmanship and dependable scheduling.
                        </p>
                        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                            From accessibility upgrades to full facility renovations, we deliver transparent pricing,
                            strict compliance with public-sector standards, and professional project management from start to finish.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Services Grid */}
            <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800/50 transition-colors">
                <Container>
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                Our Government Services
                            </h2>
                            <div className="w-24 h-1 bg-light-blue mx-auto"></div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                                >
                                    <div className="relative h-48">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 md:py-28">
                <Container>
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                Why Choose Blue Rock for Government Projects?
                            </h2>
                            <div className="w-24 h-1 bg-light-blue mx-auto"></div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-light-blue/10 dark:bg-light-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    Standards Compliance
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Strict adherence to public-sector building codes, ADA requirements, and procurement standards.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-light-blue/10 dark:bg-light-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    Transparent Pricing
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Clear, detailed proposals and budget-conscious pricing suited to public procurement processes.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-light-blue/10 dark:bg-light-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    Reliable Scheduling
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Dependable timelines and coordination that keep public facilities operating with minimal disruption.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-light-blue/10 dark:bg-light-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    One-Roof Management
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Convenient single-point contact for all aspects of your government facility project.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-28 bg-gradient-to-br from-main-blue to-blue-700 dark:from-blue-900 dark:to-blue-950 transition-colors">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Have a Government Facility Project?
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                            Let's discuss your agency's contracting needs and create a customized solution
                            that meets your requirements and budget.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/contact" variant="secondary">
                                Request a Quote
                            </Button>
                            <Button href="/projects" variant="ghost">
                                View Our Projects
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
