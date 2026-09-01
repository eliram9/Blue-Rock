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
   Pair it with `className="running-border"` the way the form does. */
const DRAFT = "px-8 py-4 font-bold font-mono text-base uppercase tracking-[0.25em]";

export default function Button({
    variant = "primary",
    children,
    className = "",
    ...props
}: ButtonProps): React.ReactElement {
    const baseStyles = "inline-block transition-colors";

    const variants: Record<ButtonVariant, string> = {
        primary: `${PILL} bg-main-blue hover:bg-main-blue-deep text-white`,
        secondary: `${PILL} bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white`,
        ghost: `${PILL} bg-transparent text-white hover:bg-ink/40`,
        cta: `${DRAFT} bg-main-blue text-white hover:bg-main-blue-deep`,
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
