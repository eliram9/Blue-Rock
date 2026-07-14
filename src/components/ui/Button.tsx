import React from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: ButtonVariant;
    children: React.ReactNode;
}

export default function Button({
    variant = "primary",
    children,
    className = "",
    ...props
}: ButtonProps): React.ReactElement {
    const baseStyles = "font-semibold px-8 py-3 rounded-lg transition-colors inline-block";

    const variants: Record<ButtonVariant, string> = {
        primary: "bg-main-blue hover:bg-main-blue-deep text-white",
        secondary: "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white",
        ghost: "bg-transparent text-white hover:bg-ink/40"
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
