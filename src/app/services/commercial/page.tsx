import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MiniHero from "@/components/sections/MiniHero";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function CommercialServices() {
    const services = [
        {
            title: "Commercial Kitchen Remodeling",
            description: "Create efficient workspaces with optimized layouts, modern appliances, energy-efficient lighting, and functional cabinetry designed for commercial use.",
            image: "/kitchen.jpg",
        },
        {
            title: "Bathroom Renovations",
            description: "Modernize commercial bathrooms with durable materials, walk-in showers, slip-resistant tiling, and updated plumbing systems that meet ADA standards.",
            image: "/kitchen.jpg",
        },
        {
            title: "Basement Finishing",
            description: "Transform unfinished basements into viable business spaces with durable flooring, moisture-resistant walls, and modern insulation solutions.",
            image: "/kitchen.jpg",
        },
        {
            title: "Exterior Renovations",
            description: "Improve building durability and aesthetics through siding updates, window replacements, and modern finishes that increase property value.",
            image: "/kitchen.jpg",
        },
        {
            title: "Deck Installation & Repair",
            description: "Professional deck services using premium materials like pressure-treated wood and composite decking for long-lasting outdoor spaces.",
            image: "/kitchen.jpg",
        },
        {
            title: "Demolition Services",
            description: "Precise demolition services using professional equipment including skid steers, excavators, and concrete saws for safe site preparation.",
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
                    { label: "Commercial" }
                ]}
            />

            {/* Hero Section — brand tint over the light render */}
            <MiniHero
                title="COMMERCIAL SERVICES"
                subtitle="Professional General Contracting in Rockville, MD"
                imageSrc="/images/hero/commercial.png"
                tint
            />

            {/* Introduction Section */}
            <section className="py-20 md:py-28">
                <Container>
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Expert Commercial Contracting
                        </h2>
                        <div className="w-24 h-1 bg-light-blue mx-auto mb-8"></div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            Blue Rock Remodeling provides comprehensive commercial general contracting services
                            designed to transform your business space while minimizing disruption to your operations.
                        </p>
                        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                            From small office renovations to large-scale commercial projects, we deliver quality
                            workmanship, transparent pricing, and professional project management from start to finish.
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
                                Our Commercial Services
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
                                Why Choose Blue Rock for Commercial Projects?
                            </h2>
                            <div className="w-24 h-1 bg-light-blue mx-auto"></div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-light-blue/10 dark:bg-light-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    Time-Saving Coordination
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Efficient project management that keeps your business running with minimal disruption.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-light-blue/10 dark:bg-light-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    Cost-Effective Solutions
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Transparent, budget-focused pricing with quality materials that deliver long-term value.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-light-blue/10 dark:bg-light-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    Safety-Centered Approach
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Strict adherence to industry safety standards protecting your property and employees.
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
                                    Convenient single-point contact for all aspects of your commercial project.
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
                            Ready to Transform Your Commercial Space?
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                            Let's discuss your commercial contracting needs and create a customized solution
                            that works for your business.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/contact" variant="secondary">
                                Request a Quote
                            </Button>
                            <Button href="/projects" variant="ghost">
                                View Commercial Projects
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
