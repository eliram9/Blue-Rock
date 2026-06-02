import Image from "next/image";
import Container from "@/components/ui/Container";
import Display from "@/components/typography/Display";
import Text from "@/components/typography/Text";

interface MiniHeroProps {
    title: string;
    subtitle?: string;
    imageSrc?: string;
}

export default function MiniHero({
    title,
    subtitle,
    imageSrc = "/kitchen.jpg"
}: MiniHeroProps): React.ReactElement {
    return (
        <section className="relative w-full h-[40vh] min-h-[0px] overflow-hidden">
            <Image
                src={imageSrc}
                alt={title}
                fill
                priority
                className="object-cover"
                quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

            <div className="relative z-10 h-full flex items-center justify-center">
                <Container className="text-center">
                    <Display size="lg" className="text-white mb-4">
                        {title}
                    </Display>
                    {subtitle && (
                        <Text variant="lead" fluid className="text-white/90 max-w-2xl mx-auto">
                            {subtitle}
                        </Text>
                    )}
                </Container>
            </div>
        </section>
    );
}
