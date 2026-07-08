import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Display from "@/components/typography/Display";
import Text from "@/components/typography/Text";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

/* Tier 2 (category: /services/*, /about) and tier 3 (subcategory / utility
   pages). Heights use min-h + svh so content can grow and mobile browser
   chrome doesn't cause overflow; the type scale steps down with the tier. */
type MiniHeroSize = "category" | "subcategory";

interface MiniHeroProps {
    title: string;
    subtitle?: string;
    imageSrc?: string;
    size?: MiniHeroSize;
    breadcrumbs?: BreadcrumbItem[];
}

const tiers: Record<MiniHeroSize, { section: string; display: "lg" | "sm" }> = {
    category: { section: "min-h-[38svh] md:min-h-[55svh]", display: "lg" },
    subcategory: { section: "min-h-[28svh] md:min-h-[45svh]", display: "sm" },
};

export default function MiniHero({
    title,
    subtitle,
    imageSrc = "/images/hero/inner-hero.jpg",
    size = "category",
    breadcrumbs,
}: MiniHeroProps): React.ReactElement {
    const tier = tiers[size];

    return (
        <section
            className={`relative flex w-full items-center justify-center overflow-hidden ${tier.section}`}
        >
            <Image
                src={imageSrc}
                alt={title}
                fill
                priority
                className="object-cover blur-[1px]"
                quality={85}
            />
            {/* Scrim — fixed ink on a fixed photo; identical in light & dark */}
            <div className="absolute inset-0 bg-ink/30" />

            <div className="relative z-10 w-full py-12">
                <Container className="text-center">
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <nav aria-label="Breadcrumb" className="mb-4">
                            <ol className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-white/70">
                                {breadcrumbs.map((item, index) => {
                                    const isLast = index === breadcrumbs.length - 1;

                                    return (
                                        <li key={item.label} className="flex items-center gap-2">
                                            {index > 0 && (
                                                <span aria-hidden="true" className="text-white/40">
                                                    /
                                                </span>
                                            )}
                                            {isLast || !item.href ? (
                                                <span aria-current="page" className="text-white">
                                                    {item.label}
                                                </span>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    className="transition-colors hover:text-white"
                                                >
                                                    {item.label}
                                                </Link>
                                            )}
                                        </li>
                                    );
                                })}
                            </ol>
                        </nav>
                    )}
                    <Display size={tier.display} className="text-white mb-4 bg-transparent rounded-md py-3 px-10">
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
