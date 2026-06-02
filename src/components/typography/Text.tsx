import React from "react";

type TextVariant = "body" | "lead" | "small" | "caption";
type TextElement = "p" | "span" | "div";

interface TextProps {
    variant?: TextVariant;
    as?: TextElement;
    children: React.ReactNode;
    className?: string;
    fluid?: boolean;
}

const variantClasses: Record<TextVariant, string> = {
    body: "text-base",
    lead: "text-lg font-medium",
    small: "text-sm",
    caption: "text-xs text-gray-600",
};

const fluidVariantClasses: Record<TextVariant, string> = {
    body: "text-fluid-base",
    lead: "text-fluid-lg font-medium",
    small: "text-fluid-sm",
    caption: "text-xs text-gray-600",
};

export default function Text({
    variant = "body",
    as = "p",
    children,
    className = "",
    fluid = false,
}: TextProps): React.ReactElement {
    const Component = as;
    const variantClass = fluid ? fluidVariantClasses[variant] : variantClasses[variant];

    return (
        <Component className={`${variantClass} ${className}`}>
            {children}
        </Component>
    );
}
