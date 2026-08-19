import Image from "next/image";
import Corners from "@/components/ui/Corners";

interface Frame {
    src: string;
    alt: string;
    /** Drafting revision label shown under the frame, e.g. "Rev. A". */
    label: string;
    /** Short readout beside the label, e.g. "Existing elevation". */
    note: string;
}

interface SheetPairProps {
    before: Frame;
    after: Frame;
    /** Sheet caption rendered in the title block under the pair. */
    caption: string;
    /** Scope readouts rendered as a definition list inside the title block. */
    specs?: { label: string; value: string }[];
}

/**
 * Two elevations as separate drafting sheets, each with its own title block.
 *
 * The companion to BeforeAfter: same title block, different frame treatment.
 * Use this whenever the two photos are NOT a registered pair — different
 * camera position, different season, different framing. A wipe divider needs
 * both frames to line up or the seam reads as two unrelated photographs;
 * side by side, the eye compares two complete scenes instead of two
 * fragments, so an unregistered pair is more legible here, not less.
 *
 * Neither photo is desaturated. In a wipe the record shot has to be held
 * back so the two halves stay distinguishable inside one frame; here the
 * frames and title blocks already do that work, so both photos stay true.
 *
 * Ships zero client JavaScript.
 */
export default function SheetPair({ before, after, caption, specs }: SheetPairProps) {
    return (
        <figure className="relative">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[before, after].map((frame) => (
                    <div key={frame.label}>
                        <div className="relative aspect-[3/2] w-full overflow-hidden border border-brand-light/25 bg-ink-soft">
                            <Corners />
                            <Image
                                src={frame.src}
                                alt={frame.alt}
                                fill
                                /* Half of a max-w-6xl container at the top
                                   breakpoint, so ~560px rather than the full
                                   viewport Next would otherwise assume. */
                                sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, 100vw"
                                quality={85}
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border border-t-0 border-brand-light/25 bg-ink/70 px-4 py-3 backdrop-blur-md">
                            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-light">
                                {frame.label}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-100/70">
                                {frame.note}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Same title block the wipe component uses, so both projects
                read as the same kind of document. */}
            <figcaption className="relative mt-6 border border-brand-light/25 bg-ink/70 px-6 py-6 backdrop-blur-md md:px-8 md:py-7">
                <Corners />

                <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-light md:text-sm">
                    Elevation study
                </span>
                <p className="mt-3 max-w-4xl border-l-2 border-brand-light pl-5 text-lg font-medium leading-relaxed text-white md:text-xl">
                    {caption}
                </p>

                {specs && specs.length > 0 && (
                    <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-dashed border-brand-light/20 pt-5">
                        {specs.map((spec) => (
                            <div key={spec.label} className="flex items-baseline gap-2">
                                <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-light">
                                    {spec.label}
                                </dt>
                                <dd className="text-sm leading-relaxed text-blue-100/70">
                                    {spec.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}
            </figcaption>
        </figure>
    );
}
