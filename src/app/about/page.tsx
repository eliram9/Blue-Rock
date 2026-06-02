import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MiniHero from "@/components/sections/MiniHero";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function About() {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "About Us" }
                ]}
            />

            {/* Hero Section */}
            <MiniHero
                title="ABOUT US"
                subtitle="Crafting Excellence, Constructing Trust"
            />

            {/* Welcome Section */}
            <section className="py-20 md:py-28">
                <Container>
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                Welcome to Blue Rock Remodeling
                            </h2>
                            <div className="w-24 h-1 bg-light-blue mx-auto mb-8"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                    Your trusted construction partner with over a decade of experience serving
                                    <span className="font-semibold text-main-blue dark:text-light-blue"> Maryland, Washington DC, and Virginia</span>.
                                </p>
                                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                    We pride ourselves on delivering quality workmanship and personalized design approaches
                                    tailored to each client's unique vision. From concept to completion, we're committed to
                                    transforming your space into something extraordinary.
                                </p>
                            </div>

                            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/kitchen.jpg"
                                    alt="Our Work"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Our Story Section */}
            <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800/50 transition-colors">
                <Container>
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                Our Story
                            </h2>
                            <div className="w-24 h-1 bg-light-blue mx-auto"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/kitchen.jpg"
                                    alt="Our Story"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="order-1 md:order-2 space-y-6">
                                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                    Founded in <span className="font-bold text-main-blue dark:text-light-blue">2010</span>,
                                    Blue Rock Remodeling has grown from a small team with a big vision to a
                                    trusted name in the construction industry.
                                </p>
                                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                    With over <span className="font-bold text-main-blue dark:text-light-blue">20+ years</span> of
                                    combined expertise among our team members, we bring unparalleled knowledge
                                    and skill to every project.
                                </p>
                                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Our service range spans from kitchen and bathroom renovations to comprehensive
                                    exterior work including siding, roofing, and everything in between. No project
                                    is too big or too small for our dedicated team.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Stats Section */}
            <section className="py-20 md:py-28">
                <Container>
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-main-blue dark:text-light-blue mb-2">
                                    2010
                                </div>
                                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                                    Founded
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-main-blue dark:text-light-blue mb-2">
                                    20+
                                </div>
                                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                                    Years Experience
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-main-blue dark:text-light-blue mb-2">
                                    500+
                                </div>
                                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                                    Projects Done
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-main-blue dark:text-light-blue mb-2">
                                    100%
                                </div>
                                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                                    Satisfaction
                                </div>
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
                            Ready to Transform Your Space?
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                            Whether you're dreaming of a kitchen renovation, bathroom remodel, or exterior upgrade,
                            our team is here to bring your vision to life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/contact" variant="secondary">
                                Get Started Today
                            </Button>
                            <Button href="/projects" variant="ghost">
                                View Our Work
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
