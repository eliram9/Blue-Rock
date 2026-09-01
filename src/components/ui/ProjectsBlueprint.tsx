"use client";

import { useId } from "react";

/**
 * Ambient field for the projects pages.
 *
 * Deliberately not graph paper. A ruled grid plus dimension lines reads as
 * decoration drawn to make a page "feel designed", so this is only two things:
 * a plotted dot matrix and a soft mesh of overlapping radial gradients. The
 * drafting reference survives in the plot points; the depth is entirely
 * gradient and transparency.
 *
 * Parametric rather than exported artwork. The dots are an SVG <pattern> in
 * userSpaceOnUse, so the pitch stays a constant number of pixels however tall
 * the section grows and nothing is ever scaled or cropped. Compare the Figma
 * exports in public/svg, which bake ~39KB of path data onto a fixed canvas.
 *
 * Drawn entirely in `currentColor`: one `text-*` token themes it and the
 * two-surface model holds. Purely decorative, so the caller passes aria-hidden.
 */
export default function ProjectsBlueprint({
    pitch = 26,
    ...props
}: {
    /** Distance between plot points, in CSS pixels. */
    pitch?: number;
} & React.SVGProps<SVGSVGElement>) {
    /* Unique per instance, or a second copy on the page would reference the
       first one's defs. */
    const uid = useId().replace(/:/g, "");
    const id = (name: string) => `${uid}-${name}`;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
            <defs>
                <pattern
                    id={id("dots")}
                    width={pitch}
                    height={pitch}
                    patternUnits="userSpaceOnUse"
                >
                    <circle cx={0.5} cy={0.5} r={1} fill="currentColor" fillOpacity={0.55} />
                </pattern>

                {/* Vertical falloff. The matrix is densest in the negative space
                    around the heading and gone by the time photographs start,
                    so nothing competes with the work itself. */}
                <linearGradient id={id("fade")} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity={0.85} />
                    <stop offset="30%" stopColor="#fff" stopOpacity={0.45} />
                    <stop offset="66%" stopColor="#fff" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#fff" stopOpacity={0} />
                </linearGradient>
                <mask id={id("mask")} maskUnits="userSpaceOnUse">
                    <rect width="100%" height="100%" fill={`url(#${id("fade")})`} />
                </mask>

                {/* Three offset radial stops, overlapping into a soft mesh. Low
                    enough to read as atmosphere rather than as a shape. */}
                <radialGradient id={id("wash-a")} cx="18%" cy="4%" r="62%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity={0.13} />
                    <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
                </radialGradient>
                <radialGradient id={id("wash-b")} cx="76%" cy="-6%" r="54%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity={0.09} />
                    <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
                </radialGradient>
                <radialGradient id={id("wash-c")} cx="52%" cy="46%" r="70%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity={0.05} />
                    <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
                </radialGradient>
            </defs>

            <rect width="100%" height="100%" fill={`url(#${id("wash-a")})`} />
            <rect width="100%" height="100%" fill={`url(#${id("wash-b")})`} />
            <rect width="100%" height="100%" fill={`url(#${id("wash-c")})`} />

            <g mask={`url(#${id("mask")})`}>
                <rect width="100%" height="100%" fill={`url(#${id("dots")})`} />
            </g>
        </svg>
    );
}
