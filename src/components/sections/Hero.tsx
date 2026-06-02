import Image from "next/image";
import Button from "@/components/ui/Button";
import Display from "@/components/typography/Display";
import Text from "@/components/typography/Text";
import Container from "@/components/ui/Container";

export default function Hero(): React.ReactElement {
    return (
        <section className="relative w-full h-[90vh] overflow-hidden">
            {/* Background Image */}
            <Image src="/kitchen.jpg"
                   alt="Modern kitchen"
                   fill
                   priority
                   className="object-cover"
                   quality={85}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center">
                <Container className="text-center">
                    <Text variant="lead" fluid className="text-white mb-8">
                        Craft Dreams, Build Realities
                    </Text>
                    <Display size="lg" className="text-white mb-6">
                        WELCOME TO BLUE ROCK
                    </Display>
                    <Text variant="lead" fluid className="text-white mb-8">
                    Blue Rock Remodeling provides excellence in every residential and commercial building with precision and passion.
                    </Text>
                    <div className="flex gap-4 justify-center">
                        <Button href="/contact" variant="primary">
                            Get Started
                        </Button>
                        <Button href="/projects" variant="secondary">
                            View Projects
                        </Button>
                    </div>
                </Container>
            </div>
        </section>
    );
}
