import React from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingSize = "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";

interface HeadingProps {
    level?: HeadingLevel;
    size?: HeadingSize;
    children: React.ReactNode;
    className?: string;
    fluid?: boolean;
}

const sizeClasses: Record<HeadingSize, string> = {
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
};

const fluidSizeClasses: Record<HeadingSize, string> = {
    xl: "text-fluid-xl",
    "2xl": "text-fluid-2xl",
    "3xl": "text-fluid-3xl",
    "4xl": "text-fluid-4xl",
    "5xl": "text-fluid-5xl",
    "6xl": "text-fluid-5xl", // Max out at 5xl for fluid
};

const defaultSizes: Record<HeadingLevel, HeadingSize> = {
    h1: "5xl",
    h2: "4xl",
    h3: "3xl",
    h4: "2xl",
    h5: "xl",
    h6: "xl",
};

export default function Heading({
    level = "h2",
    size,
    children,
    className = "",
    fluid = false,
}: HeadingProps): React.ReactElement {
    const Component = level;
    const headingSize = size || defaultSizes[level];
    const sizeClass = fluid ? fluidSizeClasses[headingSize] : sizeClasses[headingSize];

    return (
        <Component className={`font-bold text-dark tracking-tight ${sizeClass} ${className}`}>
            {children}
        </Component>
    );
}
