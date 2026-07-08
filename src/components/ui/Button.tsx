import React from "react";

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

    return (
        <a
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </a>
    );
}
