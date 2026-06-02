import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MiniHero from "@/components/sections/MiniHero";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function ResidentialServices() {
    const services = [
        {
            title: "Kitchen Remodeling",
            description: "Transform your kitchen into a functional and beautiful space with custom cabinetry, modern appliances, and innovative design solutions.",
            image: "/kitchen.jpg",
        },
        {
            title: "Bathroom Renovation",
            description: "Create your dream bathroom with luxurious fixtures, elegant tiles, and smart storage solutions tailored to your lifestyle.",
            image: "/kitchen.jpg",
        },
        {
            title: "Basement Finishing",
            description: "Maximize your home's potential by transforming your basement into a comfortable living space, home office, or entertainment area.",
            image: "/kitchen.jpg",
        },
        {
            title: "Home Additions",
            description: "Expand your living space with seamlessly integrated additions that blend with your home's existing architecture and style.",
            image: "/kitchen.jpg",
        },
        {
            title: "Exterior Renovations",
            description: "Enhance your home's curb appeal and protection with new siding, roofing, windows, and outdoor living spaces.",
            image: "/kitchen.jpg",
        },
        {
            title: "Whole Home Remodeling",
            description: "Complete home transformations that reimagine every space while maintaining functionality and increasing property value.",
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
                    { label: "Residential" }
                ]}
            />

            {/* Hero Section */}
            <MiniHero
                title="RESIDENTIAL SERVICES"
                subtitle="Transforming Houses into Dream Homes"
            />

            {/* Introduction Section */}
            <section className="py-20 md:py-28">
                <Container>
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Expert Residential Remodeling
                        </h2>
                        <div className="w-24 h-1 bg-light-blue mx-auto mb-8"></div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            At Blue Rock Remodeling, we specialize in transforming residential spaces into beautiful,
                            functional homes that reflect your unique style and meet your family's needs.
                        </p>
                        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                            With over a decade of experience serving Maryland, Washington DC, and Virginia, we bring
                            expertise, creativity, and meticulous attention to detail to every project.
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
                                Our Services
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
                                Why Choose Blue Rock?
                            </h2>
                            <div className="w-24 h-1 bg-light-blue mx-auto"></div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-light-blue/10 dark:bg-light-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    Quality Craftsmanship
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Meticulous attention to detail and superior workmanship in every project we undertake.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-light-blue/10 dark:bg-light-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    On-Time Delivery
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    We respect your time and complete projects on schedule without compromising quality.
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
                                    Clear, detailed estimates with no hidden costs or surprise charges along the way.
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
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                            Let's discuss your residential remodeling needs and bring your vision to life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/contact" variant="secondary">
                                Get Free Consultation
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
