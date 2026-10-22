"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IconClock, IconPlayerPlayFilled } from "@tabler/icons-react";
import { embedUrl, formatDuration, posterUrl, type Video } from "@/lib/videos";

/**
 * YouTube facade. Until the visitor presses play this is a poster image and a
 * button: no iframe, no YouTube script, no third-party cookies. The click swaps
 * in the youtube-nocookie player.
 *
 * Nothing plays on page load. The player gets `autoplay=1` only because it is
 * created by the click - without it the visitor would have to press play a
 * second time inside YouTube's own UI.
 *
 * `tone` themes the caption: `themed` on light bands (flipping tokens), `ink`
 * on navy/steel bands (fixed). Everything over the poster is a constant on a
 * photo, so it uses fixed ink/white/brand in both tones.
 */
export default function VideoEmbed({
    video,
    sizes,
    tone = "themed",
    caption = true,
}: {
    video: Video;
    /** Match the frame's rendered width, or next/image ships an oversized poster. */
    sizes: string;
    tone?: "themed" | "ink";
    /** Off when the caller sets the title and duration in its own title block. */
    caption?: boolean;
}) {
    const [playing, setPlaying] = useState(false);
    const [poster, setPoster] = useState(video.poster ?? posterUrl(video.youtubeId));
    const frameRef = useRef<HTMLIFrameElement>(null);
    const ink = tone === "ink";
    const duration = formatDuration(video.duration);

    /* The button that had focus is gone once the player mounts; hand focus to
       the player so keyboard users land on it instead of back at <body>. */
    useEffect(() => {
        if (playing) frameRef.current?.focus();
    }, [playing]);

    return (
        <figure>
            <div className="relative aspect-video overflow-hidden bg-ink">
                {playing ? (
                    <iframe
                        ref={frameRef}
                        src={`${embedUrl(video.youtubeId)}?autoplay=1&rel=0&playsinline=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                    />
                ) : (
                    <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        aria-label={`Play video: ${video.title}${duration ? ` (${duration})` : ""}`}
                        className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none"
                    >
                        <Image
                            src={poster}
                            alt=""
                            fill
                            sizes={sizes}
                            onError={() => setPoster(posterUrl(video.youtubeId, "hqdefault"))}
                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.03]"
                        />
                        {/* Scrim so the play mark reads on any frame */}
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-ink/30 transition-colors duration-300 group-hover:bg-ink/15"
                        />
                        <span
                            aria-hidden="true"
                            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/30 bg-brand text-white shadow-[0_12px_32px_-8px_var(--color-ink)] transition-[background-color,transform] duration-300 group-hover:bg-brand-deep group-active:scale-[0.96] md:h-20 md:w-20"
                        >
                            <IconPlayerPlayFilled className="ml-1 h-7 w-7 md:h-8 md:w-8" />
                        </span>
                        {/* Focus ring as the top layer: an inset ring on the
                            button itself paints under the poster and vanishes. */}
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 ring-inset ring-brand-light group-focus-visible:ring-4"
                        />

                    </button>
                )}
            </div>

            {caption && (
                <figcaption className="mt-4 flex items-start justify-between gap-4">
                    <span className={`text-base font-semibold leading-snug md:text-lg ${ink ? "text-white" : "text-foreground"}`}>
                        {video.title}
                    </span>
                    {duration && (
                        <span
                            className={`mt-0.5 flex shrink-0 items-center gap-1.5 font-mono text-sm tracking-wider ${ink ? "text-brand-light" : "text-main-blue"}`}
                        >
                            <IconClock aria-hidden="true" className="h-4 w-4" stroke={1.75} />
                            <span className="sr-only">Duration </span>
                            <time dateTime={video.duration}>{duration}</time>
                        </span>
                    )}
                </figcaption>
            )}
        </figure>
    );
}
