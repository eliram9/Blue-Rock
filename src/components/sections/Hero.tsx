import Image from "next/image";
import Button from "@/components/ui/Button";
import Display from "@/components/typography/Display";
import Text from "@/components/typography/Text";
import Container from "@/components/ui/Container";
import Blueprint from "@/components/svg/BlueprintBright";

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
                   sizes="100vw"
                   className="object-cover"
                   quality={85}
            />

            {/* Drafting grid, held at the outer thirds. The mask is the inverse of
                the one on Our Story: transparent in the centre so the drawing never
                sits behind the copy (which would drop the composited contrast), and
                visible at the edges where it ties the photo to the blueprint
                language the rest of the site speaks. Plain SVG, so the hero stays a
                Server Component. */}
            <Blueprint
                aria-hidden="true"
                gridStep={44}
                titleBlock={false}
                className="pointer-events-none absolute inset-0 h-full w-full select-none opacity-[0.07]
                    [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_35%,black_100%)]
                    [-webkit-mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_35%,black_100%)]"
            />

            {/* Scrim — fixed ink on a fixed photo; identical in light & dark.
                Flat base plus a centre vignette in one element (two background
                layers, one paint layer): the copy sits on the darkest part of the
                render while the edges keep more of the kitchen. The flat wash is
                held at 55% because the accent word is a mid-tone blue: over the
                bright cabinets a 40% wash left it at 2.8:1, under the 3:1 AA
                floor for large text. At 55% the worst point measures 3.8:1. */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,rgb(10_22_40/0.35),transparent_75%)] bg-ink/55"
            ></div>

            {/* Content */}
            <div className="relative z-10 w-full py-16 md:py-20">
                <Container className="text-center">
                    {/* Eyebrow, framed by brand hairlines (the blueprint keyline
                        used across the site) rather than coloured type, so the
                        small caps keep full white contrast over photography.
                        The negative right margin cancels the trailing letter-space
                        that wide tracking leaves after the last glyph, which would
                        otherwise pull the centred line visibly left. */}
                    <div className="hero-rise mb-6 flex items-center justify-center gap-4">
                        <span aria-hidden="true" className="h-px w-8 bg-brand-light/70 md:w-14" />
                        <Text
                            variant="small"
                            as="span"
                            className="font-mono uppercase tracking-[0.28em] -mr-[0.28em] text-white/90 hero-type-shadow-soft"
                        >
                            Craft Dreams, Build Realities
                        </Text>
                        <span aria-hidden="true" className="h-px w-8 bg-brand-light/70 md:w-14" />
                    </div>
                    {/* One h1, two registers. The heading text is unchanged; only its
                        typography splits, so the eye lands on the name rather than on
                        a uniform run of caps. No animation-delay here on purpose: the
                        headline is an LCP candidate and a delayed fade-in from
                        opacity 0 postpones the paint Chrome measures. */}
                    <div className="hero-reveal mb-6">
                        <Display size="lg" className="font-title uppercase">
                            <span className="mb-2 block font-mono text-fluid-sm font-normal tracking-[0.3em] -mr-[0.3em] text-white/70 hero-type-shadow-soft md:mb-3 md:text-base">
                                Welcome to
                            </span>
                            {/* Two-tone: the accent lands on the second word, so
                                the line reads as one shape with a highlight. The
                                space between the spans keeps the h1's text content
                                exactly "Welcome to Blue Rock" for search. */}
                            <span className="block text-white hero-type-drop">
                                Blue <span className="text-brand-lighter">Rock</span>
                            </span>
                        </Display>
                    </div>
                    <Text
                        variant="lead"
                        fluid
                        className="hero-rise [animation-delay:150ms] mx-auto mb-8 max-w-2xl text-balance text-white/90 hero-type-shadow-soft"
                    >
                        Blue Rock Remodeling provides excellence in every residential and commercial building with precision and passion.
                    </Text>
                    {/* Drafting plates, the same register as the CTA band and the
                        header's Contact plate: square, mono, uppercase, wide
                        tracking, with the running-border streak on hover. The
                        rounded pills they replace were the last piece of the hero
                        speaking a different language than the rest of the site.
                        Stacked below sm — two plates at this tracking overrun a
                        320px viewport side by side.
                        The lift is CSS, not framer-motion (which the CTA band can
                        afford): the hero is a Server Component and the buttons sit
                        next to the LCP headline. */}
                    <div className="hero-rise [animation-delay:230ms] flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button
                            href="/contact"
                            variant="cta"
                            className="running-border hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                        >
                            Get Started
                        </Button>
                        {/* The CTA band's outline plate sits on a flat steel
                            gradient, where a brand-light hairline reads fine. Over
                            photography it disappears, so this one keeps the white
                            keyline and blur wash the old secondary pill carried —
                            same shape and type, surface adapted to its ground. */}
                        <Button
                            href="/projects"
                            variant="ctaOutline"
                            className="running-border border-white/60 bg-white/10 backdrop-blur-sm hover:border-white hover:bg-white/20 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                        >
                            View Projects
                        </Button>
                    </div>
                </Container>
            </div>
        </section>
    );
}
