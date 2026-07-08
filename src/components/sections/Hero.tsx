import Image from "next/image";
import Button from "@/components/ui/Button";
import Display from "@/components/typography/Display";
import Text from "@/components/typography/Text";
import Container from "@/components/ui/Container";

export default function Hero(): React.ReactElement {
    return (
        // Tier 1 hero (homepage only). min-h + svh: grows with content, and small
        // viewport units keep mobile browser chrome from causing overflow.
        <section className="relative flex min-h-[55svh] w-full items-center justify-center overflow-hidden md:min-h-[90svh]">
            {/* Background Image */}
            <Image src="/kitchen.jpg"
                   alt="Modern kitchen"
                   fill
                   priority
                   className="object-cover"
                   quality={85}
            />

            {/* Scrim — fixed ink on a fixed photo; identical in light & dark */}
            <div className="absolute inset-0 bg-ink/50"></div>

            {/* Content */}
            <div className="relative z-10 w-full py-20">
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
