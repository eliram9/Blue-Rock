"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Corners from "@/components/ui/Corners";
import PhotoLightbox from "@/components/ui/PhotoLightbox";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import type { ProjectPhoto } from "@/lib/projects";

/**
 * The query string is the source of truth for which photo is open, so a single
 * frame can be linked or shared and survives a reload.
 *
 * It is read through useSyncExternalStore rather than copied into state by an
 * effect: the URL is an external system, the server snapshot is null so
 * hydration matches, and there is no setState-in-effect cascade. replaceState
 * fires no event of its own, hence the manual notify.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
    listeners.add(onChange);
    window.addEventListener("popstate", onChange);
    return () => {
        listeners.delete(onChange);
        window.removeEventListener("popstate", onChange);
    };
}

/* Returns a string or null - a primitive, so React can compare snapshots by
   value and will not loop. */
function readPhotoParam() {
    return new URLSearchParams(window.location.search).get("photo");
}

function writePhotoParam(value: number | null) {
    const url = new URL(window.location.href);
    if (value === null) url.searchParams.delete("photo");
    else url.searchParams.set("photo", String(value + 1));
    window.history.replaceState(null, "", url);
    listeners.forEach((onChange) => onChange());
}

/**
 * Detail-page photo grid. Thumbnails open the lightbox, and the open photo is
 * mirrored into `?photo=N`.
 */
export default function ProjectGallery({
    photos,
    label,
}: {
    photos: ProjectPhoto[];
    label: string;
}) {
    const raw = useSyncExternalStore(subscribe, readPhotoParam, () => null);

    /* `?photo=3` is the third photo. Anything out of range or unparseable is
       treated as closed rather than clamped, so a stale link cannot open a
       frame the visitor did not ask for. */
    const parsed = raw === null ? NaN : Number(raw) - 1;
    const index =
        Number.isInteger(parsed) && parsed >= 0 && parsed < photos.length ? parsed : null;

    return (
        <>
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6"
            >
                {photos.map((photo, i) => (
                    <motion.button
                        key={photo.src}
                        variants={fadeUp}
                        type="button"
                        onClick={() => writePhotoParam(i)}
                        aria-label={`Open photo ${i + 1} of ${photos.length}: ${photo.alt}`}
                        className="group relative block border border-border bg-surface text-left transition-colors hover:border-main-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-blue"
                        style={{ touchAction: "manipulation" }}
                    >
                        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Corners color="border-main-blue/50" />
                        </span>

                        <span className="relative block aspect-[4/3] overflow-hidden">
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 30vw"
                                quality={80}
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />
                        </span>

                        {photo.caption && (
                            <span className="block border-t border-border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                                {photo.caption}
                            </span>
                        )}
                    </motion.button>
                ))}
            </motion.div>

            <PhotoLightbox
                photos={photos}
                index={index}
                label={label}
                onClose={() => writePhotoParam(null)}
                onNavigate={writePhotoParam}
            />
        </>
    );
}
