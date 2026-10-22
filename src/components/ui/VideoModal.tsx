"use client";

import { useEffect, useRef } from "react";
import { IconX } from "@tabler/icons-react";
import { embedUrl, formatDuration, type Video } from "@/lib/videos";

/**
 * Film viewer for the portfolio grid's video tiles - the video twin of
 * ProjectModal, built the same way on the native <dialog> (focus trap, inert
 * background, Escape to close for free).
 *
 * The player mounts with autoplay because opening the dialog IS the visitor's
 * play click; making them press play again inside YouTube's chrome would be a
 * second click for the same intent. Nothing loads from YouTube until a tile is
 * clicked, and closing unmounts the iframe, which stops playback.
 */
export default function VideoModal({
    video,
    location,
    onClose,
}: {
    video: Video | null;
    location?: string | null;
    onClose: () => void;
}) {
    const ref = useRef<HTMLDialogElement>(null);
    const open = video !== null;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (open && !el.open) el.showModal();
        if (!open && el.open) el.close();
    }, [open]);

    return (
        <dialog
            ref={ref}
            aria-label={video ? `${video.title} video` : undefined}
            onClose={onClose}
            onClick={(event) => {
                if (event.target === ref.current) onClose();
            }}
            className="max-h-none max-w-none overscroll-contain bg-transparent p-0 backdrop:bg-ink/90 backdrop:backdrop-blur-sm"
            style={{ width: "100vw", height: "100dvh" }}
        >
            {video && (
                <div className="flex h-full w-full items-center justify-center p-4 md:p-8">
                    {/* Width is capped by the viewport height too, so a 16:9
                        player never runs off the bottom of a short screen. */}
                    <div className="flex w-full max-w-6xl flex-col" style={{ maxWidth: "min(72rem, calc((100dvh - 9rem) * 16 / 9))" }}>
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-light">
                                    {location ? `${location} · ` : ""}Film
                                    <span className="mx-2 text-brand-light/50">/</span>
                                    <time dateTime={video.duration}>{formatDuration(video.duration)}</time>
                                </p>
                                <h2 className="mt-1.5 font-title text-xl uppercase leading-tight tracking-[0.015em] text-white md:text-2xl">
                                    {video.title}
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close video"
                                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-brand-light/30 text-blue-100 transition-colors hover:border-brand-light hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                                style={{ touchAction: "manipulation" }}
                            >
                                <IconX size={20} stroke={1.5} aria-hidden="true" />
                            </button>
                        </div>

                        <div className="relative aspect-video w-full border border-brand-light/25 bg-ink">
                            <iframe
                                src={`${embedUrl(video.youtubeId)}?autoplay=1&rel=0&playsinline=1`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="absolute inset-0 h-full w-full"
                            />
                        </div>
                    </div>
                </div>
            )}
        </dialog>
    );
}
