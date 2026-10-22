import VideoEmbed from "@/components/ui/VideoEmbed";
import { formatDuration, type Video } from "@/lib/videos";

/**
 * A project's videos as detail callouts hanging off its before/after study,
 * the way a drawing set pulls a detail out of an elevation: a dashed leader
 * drops from the sheet above to a split detail marker (letter over sheet
 * number), and a second leader runs across to the footage.
 *
 * Rev. A and Rev. B are the before/after frames, so details start at C and
 * step through the alphabet. The study's title block already carries the
 * scope, so a callout adds nothing but the marker, the title, and the run time.
 *
 * `mirror` flips the callout - footage left, marker right - so stacked studies
 * alternate sides instead of repeating one silhouette down the band.
 *
 * Ink surface only - it lives inside the before/after band. Renders nothing
 * when the project has no videos.
 */
export default function VideoDetail({
    videos,
    sheet,
    mirror = false,
}: {
    videos: Video[];
    sheet: string;
    mirror?: boolean;
}) {
    if (!videos.length) return null;

    return (
        <div className="space-y-12 md:space-y-14">
            {videos.map((video, i) => {
                const letter = String.fromCharCode(67 + i);
                const duration = formatDuration(video.duration);
                return (
                    <div key={video.youtubeId} className="relative pt-10 md:pt-12">
                        {/* Leader from the title block above down to the marker */}
                        <span
                            aria-hidden="true"
                            className={`absolute top-0 h-10 border-l border-dashed border-brand-light/40 md:h-12 ${
                                mirror ? "right-8 md:right-10" : "left-8 md:left-10"
                            }`}
                        />

                        <div className="grid gap-6 md:grid-cols-12 md:items-start md:gap-0">
                            {/* Phone: marker beside the title. Desktop: the title drops
                                under the marker so the leader can run the full width. */}
                            <div
                                className={`grid items-center gap-x-4 md:col-span-5 md:row-start-1 md:gap-x-0 md:gap-y-5 ${
                                    mirror ? "grid-cols-[1fr_auto] md:col-start-8" : "grid-cols-[auto_1fr]"
                                }`}
                            >
                                {/* Split detail marker: detail letter over sheet number */}
                                <span
                                    aria-hidden="true"
                                    className={`row-start-1 flex h-16 w-16 shrink-0 flex-col ${mirror ? "col-start-2" : ""} items-center justify-center rounded-full border-2 border-brand-light bg-ink font-mono md:h-20 md:w-20`}
                                >
                                    <span className="text-lg leading-none text-brand-light md:text-xl">{letter}</span>
                                    <span className="my-1.5 h-px w-3/5 bg-brand-light/60" />
                                    <span className="text-[10px] leading-none tracking-widest text-blue-100/70 md:text-[11px]">
                                        {sheet}
                                    </span>
                                </span>

                                <div
                                    className={`row-start-1 min-w-0 md:col-span-2 md:row-start-2 ${
                                        mirror ? "col-start-1 text-right md:pl-8" : "md:pr-8"
                                    }`}
                                >
                                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-light">
                                        Detail {letter}
                                        {duration && (
                                            <>
                                                <span className="mx-2 text-brand-light/50">/</span>
                                                <span className="sr-only">Run time </span>
                                                <time dateTime={video.duration}>{duration}</time>
                                            </>
                                        )}
                                    </p>
                                    <h4 className="mt-1.5 text-base font-semibold leading-snug text-white md:text-lg">
                                        {video.title}
                                    </h4>
                                </div>

                                {/* Leader across to the footage, desktop only */}
                                <span
                                    aria-hidden="true"
                                    className={`hidden border-t border-dashed border-brand-light/40 md:row-start-1 md:block ${
                                        mirror ? "md:col-start-1 md:mr-4" : "md:col-start-2 md:ml-4"
                                    }`}
                                />
                            </div>

                            <div
                                className={`relative border border-brand-light/25 md:col-span-7 md:row-start-1 ${
                                    mirror ? "md:col-start-1" : ""
                                }`}
                            >
                                <VideoEmbed
                                    video={video}
                                    tone="ink"
                                    caption={false}
                                    sizes="(min-width: 1280px) 640px, (min-width: 768px) 55vw, calc(100vw - 32px)"
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
