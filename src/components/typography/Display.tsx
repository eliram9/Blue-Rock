import React from "react";

type DisplaySize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface DisplayProps {
    size?: DisplaySize;
    children: React.ReactNode;
    className?: string;
}

const sizeClasses: Record<DisplaySize, string> = {
    xs: "text-fluid-3xl",
    sm: "text-fluid-4xl",
    md: "text-fluid-5xl",
    lg: "text-fluid-5xl md:text-6xl",
    xl: "text-fluid-5xl md:text-6xl lg:text-7xl",
    "2xl": "text-fluid-5xl md:text-6xl lg:text-7xl xl:text-8xl",
};

export default function Display({
    size = "lg",
    children,
    className = "",
}: DisplayProps): React.ReactElement {
    return (
        /* Unica One ships a single weight (400). Asking for `font-bold` made the
           browser synthesise it by smearing the glyphs, which is what read as a
           soft white slab on the heroes. Condensed caps also need slightly
           positive tracking — `tracking-tight` jammed them together. */
        <h1 className={`font-normal tracking-[0.015em] text-balance ${sizeClasses[size]} ${className}`}>
            {children}
        </h1>
    );
}
