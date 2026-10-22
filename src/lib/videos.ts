/**
 * Every client video on the site. Service pages, project pages, and the home
 * page all read from here - there is no second list.
 *
 * The records live in src/data/videos.json so content can be edited without
 * touching code. One entry per YouTube video:
 *
 *   youtubeId     the 11-character id from the watch URL (?v=...)
 *   title         visible caption and the VideoObject `name`
 *   description   one or two factual sentences; feeds the VideoObject
 *   duration      ISO 8601 ("PT1M5S") - copy it from the watch page's
 *                 `itemprop="duration"`; the visible "1:05" is derived
 *   uploadDate    ISO 8601 publish date from YouTube, timezone included
 *   specs         optional drafting readouts shown beside the frame
 *   poster        optional public path to a project photo used as the
 *                 poster instead of YouTube's thumbnail - for when the
 *                 thumbnail is weak or repeats a photo already on the page
 *   project       a projects.json slug, or null. A project video renders as
 *                 a detail callout under that project's before/after study
 *   service       a SERVICES slug, or null. A service video renders as the
 *                 standalone "From the Job Site" band. Set one, not both,
 *                 or the video shows twice on the page
 *   homepage      true to feature it on the home page
 *
 * Pages filter by `service`, `project`, or `homepage`. Array order is display
 * order within each filter.
 */

import videosJson from "@/data/videos.json";

export interface Video {
    youtubeId: string;
    title: string;
    description: string;
    duration: string;
    uploadDate: string;
    specs?: { label: string; value: string }[];
    poster?: string;
    project: string | null;
    service: string | null;
    homepage: boolean;
}

const VIDEOS = videosJson as Video[];

export const videosForService = (slug: string) => VIDEOS.filter((v) => v.service === slug);
export const videosForProject = (slug: string) => VIDEOS.filter((v) => v.project === slug);
export const homepageVideos = () => VIDEOS.filter((v) => v.homepage);
export const allVideos = () => VIDEOS;

/** maxresdefault exists for any HD upload; hqdefault is the always-there
    fallback for older or SD videos. */
export const posterUrl = (id: string, size: "maxresdefault" | "hqdefault" = "maxresdefault") =>
    `https://i.ytimg.com/vi/${id}/${size}.jpg`;

/** Privacy-enhanced host: no YouTube cookies until the visitor presses play. */
export const embedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}`;

/** "PT1M5S" -> "1:05", "PT1H2M3S" -> "1:02:03". */
export function formatDuration(iso: string): string {
    const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
    if (!m) return "";
    const [h, min, s] = [m[1], m[2], m[3]].map((n) => Number(n ?? 0));
    const ss = String(s).padStart(2, "0");
    return h ? `${h}:${String(min).padStart(2, "0")}:${ss}` : `${min}:${ss}`;
}

/** schema.org VideoObject. Emit one per video the page actually renders. */
export function videoSchema(video: Video) {
    return {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: video.title,
        description: video.description,
        thumbnailUrl: [posterUrl(video.youtubeId), posterUrl(video.youtubeId, "hqdefault")],
        uploadDate: video.uploadDate,
        duration: video.duration,
        embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    };
}
