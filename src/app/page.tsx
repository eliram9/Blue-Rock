import Hero from "@/components/sections/Hero";
import Container from "@/components/ui/Container";
import Carousel from "@/components/ui/Carousel";

export default function Home(): React.ReactElement {
    // Example carousel images - you can replace these with your actual project images
    const carouselImages = [
        {
            src: "/kitchen.jpg",
            alt: "Modern Kitchen Remodel",
            title: "Kitchen Transformations",
            description: "Creating beautiful, functional spaces for your home"
        },
        {
            src: "/kitchen.jpg",
            alt: "Bathroom Renovation",
            title: "Bathroom Renovations",
            description: "Luxury bathrooms designed for comfort and style"
        },
        {
            src: "/kitchen.jpg",
            alt: "Home Addition",
            title: "Home Additions",
            description: "Expanding your living space with seamless additions"
        },
        {
            src: "/kitchen.jpg",
            alt: "Basement Finishing",
            title: "Basement Finishing",
            description: "Transform your basement into a functional living area"
        },
    ];

    return (
        <div className="min-h-screen">
            <Hero />

            {/* Featured Projects Carousel Section */}
            <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800/50 transition-colors">
                <Container>
                    <div className="max-w-6xl mx-auto">
                        {/* Section Header */}
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                Featured Projects
                            </h2>
                            <div className="w-24 h-1 bg-light-blue mx-auto mb-6"></div>
                            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                                Explore our portfolio of stunning remodeling projects that showcase our craftsmanship and attention to detail.
                            </p>
                        </div>

                        {/* Carousel */}
                        <Carousel
                            images={carouselImages}
                            autoplay={true}
                            autoplayInterval={5000}
                            showDots={true}
                            showArrows={true}
                            height="h-[500px] md:h-[600px]"
                        />
                    </div>
                </Container>
            </section>
        </div>
    );
}
