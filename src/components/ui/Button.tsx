import React from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "cta" | "ctaOutline";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: ButtonVariant;
    children: React.ReactNode;
}

/* Shape and type live on the variant, not on the base, so the drafting-style
   `cta` pair can be square + mono without fighting the rounded pill variants
   through class-order roulette. */
const PILL = "font-semibold px-8 py-3 rounded-lg";

/* Drafting register — mirrors the contact form's "Get Your Free Quote" submit
   (src/app/contact/page.tsx): square, mono, uppercase, wide tracking, py-4.
   Pair it with `className="running-border"` the way the form does.
   No negative right margin here, unlike the centred mono labels elsewhere: the
   plate shrink-wraps its line box, and the trailing letter-space that 0.25em
   tracking leaves after the last glyph is already trimmed off it — measured,
   the label sits 33.1px from both edges. Adding one would only pull the plate
   4px into whatever follows it in the flex row. */
const DRAFT =
    "px-8 py-4 font-bold font-mono text-base uppercase tracking-[0.25em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light";

export default function Button({
    variant = "primary",
    children,
    className = "",
    ...props
}: ButtonProps): React.ReactElement {
    /* transition-property is spelled out rather than `transition-colors` so the
       drafting plates can lift on hover without a second transition-* utility
       fighting this one for the property (class order wouldn't decide it). */
    const baseStyles =
        "inline-block transition-[color,background-color,border-color,transform] duration-200 ease-out";

    const variants: Record<ButtonVariant, string> = {
        primary: `${PILL} bg-main-blue hover:bg-main-blue-deep text-white`,
        secondary: `${PILL} bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white`,
        ghost: `${PILL} bg-transparent text-white hover:bg-ink/40`,
        /* Fixed `brand`, not flipping `main-blue`: both consumers of this pair
           (the hero photo, the steel CTA band) are art-directed surfaces that
           stay identical in light and dark, and the outline twin below is
           already on fixed tokens. main-blue lightens to #5A87DD in dark, where
           white 16px bold measured 3.53:1 — under the 4.5:1 AA floor.
           border-transparent, not no border: without a box matching the outline
           twin's 1px keyline the two plates render 2px apart in height wherever
           they sit side by side. */
        cta: `${DRAFT} border border-transparent bg-brand text-white hover:bg-brand-deep`,
        ctaOutline: `${DRAFT} border border-brand-light/40 bg-transparent text-white hover:border-brand-light hover:bg-brand-light/10`,
    };

    const { href, ...rest } = props;
    const classes = `${baseStyles} ${variants[variant]} ${className}`;

    /* Internal routes get next/link (client-side nav + viewport prefetch);
       external/tel/mailto links stay plain anchors */
    if (href?.startsWith("/")) {
        return (
            <Link href={href} className={classes} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <a href={href} className={classes} {...rest}>
            {children}
        </a>
    );
}
