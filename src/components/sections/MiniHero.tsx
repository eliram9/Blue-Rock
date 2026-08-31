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
    /** Brand-blue "blueprint" wash over the image (like the service cards) —
        use on light renders so the white text stays readable. */
    tint?: boolean;
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
    tint = false,
}: MiniHeroProps): React.ReactElement {
    const tier = tiers[size];

    /* Two-tone display: the last word carries the accent, matching the heroes.
       Single-word titles ("RESOURCES") keep all-white — colouring the only word
       would tint the whole headline rather than highlight part of it. */
    const words = title.trim().split(/\s+/);
    const hasAccent = words.length > 1;
    const head = hasAccent ? `${words.slice(0, -1).join(" ")} ` : title;
    const accent = hasAccent ? words[words.length - 1] : null;

    return (
        <section
            className={`relative flex w-full items-center justify-center overflow-hidden ${tier.section}`}
        >
            {/* Both branches stay razor-sharp. The untinted branch used to carry a
                blur-[1px], which is a full-viewport GPU blur on every composite;
                the scrim below already does that separation work. */}
            <Image
                src={imageSrc}
                alt={title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                quality={tint ? 95 : 85}
            />
            {/* On-image overlays use fixed tokens — identical in light & dark */}
            {tint && (
                <>
                    {/* Brand wash: "blueprints" light renders, like the cards */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-brand/35 mix-blend-multiply"
                    />
                    {/* Gentle depth gradient behind the centered text */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/15 to-ink/50"
                    />
                </>
            )}
            {/* Base scrim: flat wash plus a centre vignette in one element (two
                background layers, one paint layer), so the copy block gains
                contrast without flattening the whole render. Untinted renders need
                a heavier wash than tinted ones: the accent word is a mid-tone blue
                and only clears the 3:1 AA floor for large text once the composite
                behind it is dark enough. Tinted renders already pass that on the
                brand multiply alone, so they keep the lighter wash. */}
            <div
                aria-hidden="true"
                className={
                    tint
                        ? "absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgb(10_22_40/0.3),transparent_78%)] bg-ink/25"
                        : "absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgb(10_22_40/0.35),transparent_78%)] bg-ink/50"
                }
            />

            <div className="relative z-10 w-full py-12">
                <Container className="text-center">
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <nav aria-label="Breadcrumb" className="hero-rise mb-4">
                            <ol className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-white/75 hero-type-shadow-soft">
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
                    {/* Single-phrase titles, so no two-register split here — the
                        hierarchy runs breadcrumbs, headline, subtitle.
                        break-words keeps a long service title inside the viewport
                        at 320px. No animation-delay: the headline is the likeliest
                        LCP element on the short subcategory tier, and a delayed
                        fade from opacity 0 postpones the paint Chrome measures. */}
                    <div className="hero-reveal mb-4">
                        <Display
                            size={tier.display}
                            className="font-title uppercase break-words text-white hero-type-drop"
                        >
                            {head}
                            {accent && <span className="text-brand-lighter">{accent}</span>}
                        </Display>
                    </div>
                    {subtitle && (
                        <Text
                            variant="lead"
                            fluid
                            className="hero-rise [animation-delay:150ms] mx-auto max-w-2xl text-balance text-white/90 hero-type-shadow-soft"
                        >
                            {subtitle}
                        </Text>
                    )}
                </Container>
            </div>
        </section>
    );
}
