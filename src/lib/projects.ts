/**
 * The project portfolio: the /projects grid, the photo modal, the
 * /projects/[slug] pages, and the "recent work" bands on service pages all
 * read from here.
 *
 * The records themselves live in JSON so content can be edited without
 * touching code:
 *
 *   src/data/projects.json          one entry per project - the tile. Title,
 *                                   summary, category, city, cover photo.
 *                                   Array order is the grid's display order.
 *   src/data/project-gallery.json   keyed by slug - what the photo modal
 *                                   shows. `photos` are the frames that
 *                                   follow the cover, plus optional `intro`
 *                                   text. Every slug has a slot, most are
 *                                   still empty.
 *
 * This file owns the types, the helpers, and the before/after studies (which
 * drive the service-page comparison bands, not the modal). It composes the two
 * JSON files back into the `Project` shape every consumer already expects, so
 * nothing downstream had to change.
 *
 * Photo paths are public paths, no `public/` prefix - that folder is the web
 * root.
 */

import indexJson from "@/data/projects.json";
import galleryJson from "@/data/project-gallery.json";

export type ProjectCategory =
    | "kitchen"
    | "bath"
    | "basement"
    | "addition"
    | "garage"
    | "exterior"
    | "whole-home";

/** Human label for a category, used on cards and in the detail spec sheet. */
export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
    kitchen: "Kitchen",
    bath: "Bathroom",
    basement: "Basement",
    addition: "Addition",
    garage: "Garage",
    exterior: "Exterior",
    "whole-home": "Whole Home",
};

/**
 * Where a frame sits in the job's timeline. Optional on purpose: most
 * portfolio shots are finished work and carry no stamp at all. Only set it
 * when the frame would be misread without it.
 */
export type PhotoStatus = "before" | "after" | "in-progress";

/** Chip text for a status stamp. */
export const PHOTO_STATUS_LABELS: Record<PhotoStatus, string> = {
    before: "Before",
    after: "After",
    "in-progress": "In Progress",
};

export interface ProjectPhoto {
    src: string;
    /** Describe what's in the frame, not "project photo 1". */
    alt: string;
    /** Short label shown under the photo in the detail gallery. */
    caption?: string;
    /** Stamped over the frame in the viewer. Omit for finished work. */
    status?: PhotoStatus;
}

interface ProjectFrame {
    src: string;
    alt: string;
    label: string;
    note: string;
}

/**
 * One documented before/after study on a project.
 *
 * `mode` is the important field. Pick it from the photographs, not from
 * preference: "wipe" needs a registered pair (same camera position, same
 * framing, ideally the same season) or the divider seam reads as two
 * unrelated photographs. Anything else is "pair", which shows both frames
 * side by side and compares cleanly regardless of how the shots were taken.
 *
 * Deliberately omits `title` and `location` - those live on the Project, and
 * `toBeforeAfterProjects` merges them back in for the service-page band.
 */
export interface ProjectBeforeAfter {
    mode: "wipe" | "pair";
    lead: string;
    before: ProjectFrame;
    after: ProjectFrame;
    caption: string;
    /** Drafting readouts describing the scope, shown under the frames. */
    specs: { label: string; value: string }[];
}

export interface Project {
    slug: string;
    title: string;
    /** Answer-first, 1-2 sentences. Feeds the card and the meta description. */
    summary: string;
    category: ProjectCategory;
    /** City + state only - never a client's street address. `null` when the
        city is still unconfirmed, so the compiler forces every call site to
        decide what to render instead of leaking a "TBD" placeholder. */
    location: string | null;
    /** Grid tile, detail-page hero, and OG image. */
    cover: ProjectPhoto;
    /** Modal and detail-page gallery, cover excluded. Empty = cover only.
        Edited in src/data/project-gallery.json. */
    photos: ProjectPhoto[];
    /** Optional paragraph shown under the title in the photo modal. Lives
        alongside the photos in src/data/project-gallery.json. */
    intro?: string;
    /** Populated once a job has a documented before/after study. */
    beforeAfter?: ProjectBeforeAfter[];
    /** Featured tiles span two grid columns and lead the home-page carousel. */
    featured: boolean;
    /** Keeps a record out of the portfolio (`PROJECTS`) while leaving it
        addressable by slug, so a named export can still point a service-page
        carousel at its cover. Use it for photos worth showing in context but
        not worth a portfolio tile - not as a delete button, which is editing
        the JSON. */
    hidden?: boolean;
    /** Optional "YYYY-MM". Not displayed and not sorted on - PROJECTS array
        order is the display order. Kept only where the month is known, so
        detail pages can emit `datePublished` without inventing one. */
    completedAt?: string;
}

/* ── Composition ───────────────────────────────────────────────────────────
   JSON gives us widened types (`string`, not the category union), so the two
   imports are asserted once here and nowhere else. `assertRecords` below is
   what keeps that assertion honest: a typo like "beofre" would otherwise
   compile clean and silently render no chip. */

type GalleryEntry = { intro?: string; photos: ProjectPhoto[] };

/* Two files, one job each, and the split is deliberate:

     projects.json          the tile. Title, summary, category, city, cover.
     project-gallery.json    the modal. Every frame the carousel shows.

   A project's photos belong in the gallery file and nowhere else. Do not
   inline a `photos` array on a record in projects.json - assertRecords
   rejects it, because two places to look is how the two drift apart. */
type IndexRecord = Omit<Project, "photos" | "beforeAfter" | "intro">;

const INDEX = indexJson as IndexRecord[];
const GALLERY = galleryJson as Record<string, GalleryEntry>;

/**
 * Before/after studies, keyed by slug. These stay in code rather than JSON:
 * they are not what the modal shows, they drive the service-page comparison
 * bands and the detail pages, and their `mode` choice is a judgement about the
 * photographs that wants the comment attached to it.
 */
const BEFORE_AFTER: Record<string, ProjectBeforeAfter[]> = {
    "addition-second-story-garage": [
        {
            /* Registered pair: same vantage point, same season, so the
               divider seam holds together across the elevation. */
            mode: "wipe",
            lead: "This colonial had a single-story two-car garage wing and a half-width second floor. Blue Rock built a full second story over the existing garage, which added an upper level of finished living space without extending the foundation or giving up a foot of yard or driveway. Drag the revision line to compare the original elevation with the finished one.",
            before: {
                src: "/images/projects/addition/pro1-before.webp",
                alt: "Two-story colonial home before construction, with a single-story attached two-car garage and a lower roofline over the garage wing",
                label: "Rev. A",
                note: "Existing elevation",
            },
            after: {
                src: "/images/projects/addition/pro1-after.webp",
                alt: "The same colonial home after Blue Rock built a second story over the attached garage, with the roofline carried across the full width and siding, trim, and shutters matched to the original house",
                label: "Rev. B",
                note: "As built",
            },
            caption:
                "Second story framed over the existing attached garage, with the main roofline extended across the full elevation and a rebuilt entry porch roof.",
            specs: [
                { label: "Scope", value: "Full second story over an attached two-car garage" },
                { label: "Added", value: "Upper level living space with two new front windows" },
                { label: "Matched", value: "Roofline, siding profile, trim, and shutters" },
                { label: "Footprint", value: "Unchanged, built over the existing garage" },
            ],
        },
    ],
    "addition-mid-century-second-story": [
        {
            /* Unregistered pair: the record shot and the finished shot were
               taken from different positions and in different seasons, so
               these run side by side instead of behind a wipe divider. */
            mode: "pair",
            lead: "This split-level had a low single-story garage wing that stopped well short of the two-story brick section. Rather than sit an addition on top of the house, Blue Rock drew the new upper level in the home's own mid-century vocabulary, so the finished elevation reads as one design instead of two eras.",
            before: {
                src: "/images/projects/addition/pro2-before.webp",
                alt: "Mid-century split-level brick home before construction, with a low single-story attached garage wing under a shingled roof and a bare autumn treeline behind it",
                label: "Rev. A",
                note: "Existing elevation",
            },
            after: {
                src: "/images/projects/addition/pro2-after.webp",
                alt: "The same split-level home after Blue Rock built a second story over the garage wing, with an angled mid-century roofline, full-height glazing, tan panel cladding, and teal accent panels matching the original entry band",
                label: "Rev. B",
                note: "As built",
            },
            caption:
                "Second story framed over the existing garage wing and drawn in the home's own mid-century vocabulary: an angled roofline, full-height glazing, and teal accent panels picked up from the original entry band.",
            specs: [
                { label: "Scope", value: "Full second story over an attached garage wing" },
                { label: "Added", value: "Upper level living space behind full-height glazing" },
                { label: "Matched", value: "Mid-century roof pitch, brickwork, and teal accent panels" },
                { label: "Site", value: "New planting beds and a resurfaced driveway" },
            ],
        },
    ],
};

/* Fails the build rather than shipping a silently broken chip or a dead
   image reference. Runs once at module load, which on this site is build
   time. */
function assertRecords() {
    const seen = new Set<string>();
    for (const record of INDEX) {
        if (seen.has(record.slug)) throw new Error(`Duplicate project slug: ${record.slug}`);
        seen.add(record.slug);
        if (!CATEGORY_LABELS[record.category]) {
            throw new Error(`Unknown category "${record.category}" on ${record.slug}`);
        }
        if ("photos" in record) {
            throw new Error(
                `${record.slug} has a photos array in projects.json. Carousel ` +
                    `frames belong in project-gallery.json - move it there.`,
            );
        }
        if (!GALLERY[record.slug]) {
            throw new Error(`${record.slug} has no slot in project-gallery.json`);
        }
        for (const photo of GALLERY[record.slug].photos) {
            if (photo.status && !PHOTO_STATUS_LABELS[photo.status]) {
                throw new Error(`Unknown status "${photo.status}" on ${record.slug}`);
            }
            if (photo.src === record.cover.src) {
                throw new Error(
                    `${record.slug} repeats its cover as a gallery frame. The ` +
                        `cover is the tile and is not shown in the modal.`,
                );
            }
        }
    }
    for (const slug of Object.keys(GALLERY)) {
        if (!seen.has(slug)) throw new Error(`Gallery entry has no project: ${slug}`);
    }
    for (const slug of Object.keys(BEFORE_AFTER)) {
        if (!seen.has(slug)) throw new Error(`Before/after entry has no project: ${slug}`);
    }
}
assertRecords();

/* Every record, `hidden` ones included. Only `bySlug` reads this: it is the
   lookup table, not the portfolio. */
const ALL_PROJECTS: Project[] = INDEX.map((record) => {
    const gallery = GALLERY[record.slug];
    return {
        ...record,
        photos: gallery.photos,
        ...(gallery.intro ? { intro: gallery.intro } : {}),
        ...(BEFORE_AFTER[record.slug] ? { beforeAfter: BEFORE_AFTER[record.slug] } : {}),
    };
});

/**
 * The portfolio: every record that is shown as a project in its own right.
 *
 * Display order is `src/data/projects.json` order. Reorder the JSON to reorder
 * the grid; the sheet numbers follow automatically.
 *
 * `hidden` records are filtered out here rather than at the grid, so one flag
 * covers the index, the "more work" strips, and the sheet numbering together -
 * a hidden record leaves no gap in the PRJ-NN sequence and cannot reappear as
 * a tile somewhere else. Its cover is still reachable through a named export,
 * which is the whole point of hiding it instead of deleting it.
 */
export const PROJECTS: Project[] = ALL_PROJECTS.filter((p) => !p.hidden);

/* Named exports, re-derived by slug. services.ts references these ~90 times
   and ProjectGrid uses ADDITION_1, so they stay part of the public surface;
   they are now views onto the JSON rather than the storage itself. */
function bySlug(slug: string): Project {
    const found = ALL_PROJECTS.find((p) => p.slug === slug);
    if (!found) throw new Error(`Unknown project slug: ${slug}`);
    return found;
}

export const ADDITION_1 = bySlug("addition-second-story-garage");
export const ADDITION_2 = bySlug("addition-mid-century-second-story");
export const ADDITION_3 = bySlug("addition-bethesda-2025");
export const POTOMAC_KITCHEN = bySlug("potomac-kitchen");
export const DC_KITCHEN = bySlug("washington-dc-kitchen");
export const KITCHEN_3 = bySlug("kitchen-open-plan-white");
export const KITCHEN_4 = bySlug("kitchen-farmhouse-white");
export const KITCHEN_5 = bySlug("kitchen-marble-galley");
export const KITCHEN_6 = bySlug("kitchen-navy-brass");
export const KITCHEN_7 = bySlug("kitchen-matte-black");
export const KITCHEN_8 = bySlug("kitchen-classic-cream");
export const KITCHEN_9 = bySlug("kitchen-vaulted-white");
export const KITCHEN_10 = bySlug("kitchen-wood-tone-modernized");
export const KITCHEN_11 = bySlug("kitchen-family-room-rockville");
export const BATH_1 = bySlug("bath-slate-vanity-primary");
export const BATH_2 = bySlug("bath-stone-walk-in");
export const BATH_3 = bySlug("bath-gray-brass");
export const BATH_4 = bySlug("bath-spa-fireplace");
export const BATH_5 = bySlug("bath-classic-luxury");
export const BATH_6 = bySlug("bath-fluted-wood");
export const BATH_7 = bySlug("bath-white-marble-primary");
export const BATH_8 = bySlug("bath-double-shower");
export const BATH_9 = bySlug("bath-wood-tile-shower");
export const BATH_10 = bySlug("bath-potomac-primary-gut");
export const BATH_11 = bySlug("bath-office-conversion-silver-spring");
export const BATH_12 = bySlug("bath-primary-suite-bowie");
export const BATH_13 = bySlug("bath-rockville-gut");
export const BASEMENT_1 = bySlug("basement-open-rec-room");
export const BASEMENT_2 = bySlug("basement-modern-lower-level");
export const BASEMENT_3 = bySlug("basement-tornado-shelter");
export const GARAGE_1 = bySlug("garage-renovation-potomac");
export const EXTERIOR_1 = bySlug("exterior-stone-entry");
export const EXTERIOR_2 = bySlug("exterior-corner-elevation");

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

/**
 * The project's sheet number, as printed on its tile ("PRJ-07").
 *
 * Derived from position in PROJECTS rather than from a grid's local loop
 * index, so the same project carries the same number on the index page and in
 * a "more work" strip on some other page.
 *
 * Matches on `slug`, never on object identity: a Project handed to a Client
 * Component has crossed the RSC boundary as JSON, so it is a structurally
 * equal but different object and indexOf would return -1.
 */
export function projectSheetId(project: Project): string {
    return String(projectPosition(project) + 1).padStart(2, "0");
}

/** Index of a project in PROJECTS, matched by slug. -1 when absent. */
export function projectPosition(project: Project): number {
    return PROJECTS.findIndex((p) => p.slug === project.slug);
}

/**
 * A project earns its own URL once it has a real set to show. One cover photo
 * and an invented title is a thin page that competes with the service pages
 * for the same terms, so those stay grid tiles that open a lightbox instead.
 *
 * generateStaticParams, the sitemap, and the grid tile's link-vs-button choice
 * all read this one predicate, so a project's page appears by itself the moment
 * its photos land. Nothing to migrate.
 */
export const DETAIL_PHOTO_THRESHOLD = 4;

export function hasDetailPage(project: Project): boolean {
    const total = 1 + project.photos.length;
    return total >= DETAIL_PHOTO_THRESHOLD || Boolean(project.beforeAfter?.length);
}

export const DETAIL_PROJECTS = PROJECTS.filter(hasDetailPage);

/**
 * Flattens a project's before/after studies into the shape the service-page
 * `beforeAfter` band expects, merging back the title and location that live on
 * the Project rather than on each study.
 */
export function toBeforeAfterProjects(project: Project) {
    return (project.beforeAfter ?? []).map((study) => ({
        title: project.title,
        ...(project.location ? { location: project.location } : {}),
        ...study,
    }));
}

/* ------------------------------------------------------------------ *
 * Home-page carousel
 * ------------------------------------------------------------------ */

export interface HomeSlide {
    src: string;
    alt: string;
    tag: string;
    title: string;
    description: string;
}

/**
 * The home-page portfolio carousel: the strongest finished frame from each
 * residential service page that has real photography behind it - kitchen,
 * bath, additions, basement, exterior.
 *
 * Ordered so no two consecutive slides share a service; the strip below the
 * frame shows eight at a time, so a run of five baths would read as one long
 * bathroom gallery rather than a portfolio.
 *
 * `src` is resolved against the project's own cover and gallery, so the alt
 * text stays in `project-gallery.json` and a photo renamed or dropped there
 * fails the build here instead of shipping a dead frame.
 */
const HOME_CAROUSEL_PICKS: {
    project: Project;
    src: string;
    service: string;
    description: string;
}[] = [
    {
        project: KITCHEN_11,
        src: "/images/work_gallery/kitchen_rockville_25/after_06.jpg",
        service: "Kitchen",
        description:
            "Navy island with a downdraft cooktop, brass fixtures, and a white perimeter run - Rockville, MD",
    },
    {
        project: BATH_12,
        src: "/images/work_gallery/master_bath_bowie_25/after_01.jpg",
        service: "Bathroom",
        description:
            "Freestanding soaking tub beside a full-length walk-in shower with a floating bench - Bowie, MD",
    },
    {
        project: ADDITION_1,
        src: "/images/projects/addition/pro1-after.webp",
        service: "Home Addition",
        description:
            "A full second story built over the attached garage, roofline and trim matched to the original - Bethesda, MD",
    },
    {
        project: KITCHEN_10,
        src: "/images/work_gallery/kitchen_clinton_25/after_07.jpg",
        service: "Kitchen",
        description:
            "Dove-gray shaker cabinetry to the ceiling, quartz island, and the original red oak floors kept - Clinton, MD",
    },
    {
        project: BATH_7,
        src: "/images/work_gallery/bath_clarksville_2024/after_04.jpg",
        service: "Bathroom",
        description:
            "Tub bay and frameless glass shower with a brass rain head and paired niches - Clarksville, MD",
    },
    {
        project: BASEMENT_1,
        src: "/images/work_gallery/basement_chevy_Chase_24/after_01.jpg",
        service: "Basement Finishing",
        description:
            "Open rec room around a painted brick fireplace, finished for everyday use - Chevy Chase, MD",
    },
    {
        project: KITCHEN_11,
        src: "/images/work_gallery/kitchen_rockville_25/after_02.jpg",
        service: "Kitchen",
        description:
            "Wall ovens, apron-front sink, and new white oak flooring running the length of the room - Rockville, MD",
    },
    {
        project: BATH_13,
        src: "/images/work_gallery/bath_rockville_25/after_02.jpg",
        service: "Bathroom",
        description:
            "Chevron-laid marble carried across both shower walls over a hex mosaic floor - Rockville, MD",
    },
    {
        project: EXTERIOR_1,
        src: "/images/projects/exterior/exterior1.webp",
        service: "Exterior Renovation",
        description:
            "Rebuilt entry landing, wide stair treads, and recessed lighting along the planting bed",
    },
    {
        project: KITCHEN_10,
        src: "/images/work_gallery/kitchen_clinton_25/after_01.jpg",
        service: "Kitchen",
        description:
            "Dual range and chimney hood against a full-height slab backsplash - Clinton, MD",
    },
    {
        project: BATH_7,
        src: "/images/work_gallery/bath_clarksville_2024/after_02.jpg",
        service: "Bathroom",
        description:
            "Light oak vanity, marble counters, and a freestanding tub under a triple window - Clarksville, MD",
    },
    {
        project: ADDITION_3,
        src: "/images/work_gallery/addition_bethesda_25/after_10.jpg",
        service: "Home Addition",
        description:
            "New bath inside the addition: fluted oak vanity, brass sconces, wood-tiled shower - Bethesda, MD",
    },
    {
        project: KITCHEN_11,
        src: "/images/work_gallery/kitchen_rockville_25/after_04.jpg",
        service: "Kitchen",
        description:
            "Sink run with dishwasher drawers, undercounter refrigeration, and a wine cooler - Rockville, MD",
    },
    {
        project: BATH_13,
        src: "/images/work_gallery/bath_rockville_25/after_04.jpg",
        service: "Bathroom",
        description:
            "Double trough basin on a floating vanity under a backlit mirror - Rockville, MD",
    },
    {
        project: BASEMENT_2,
        src: "/images/projects/basement/basement2.jpg",
        service: "Basement Finishing",
        description:
            "Lower level opened up around a lit staircase, stone bar, and polished concrete floor",
    },
    {
        project: KITCHEN_10,
        src: "/images/work_gallery/kitchen_clinton_25/after_03.jpg",
        service: "Kitchen",
        description:
            "Stainless farmhouse sink set in white quartz, breakfast area beyond - Clinton, MD",
    },
    {
        project: BATH_11,
        src: "/images/work_gallery/office_to_full_bath_silver_spring_24/after_03.jpg",
        service: "Bathroom",
        description:
            "An unused office converted to a full bath with a double vanity and arched mirrors - Silver Spring, MD",
    },
    {
        project: ADDITION_1,
        src: "/images/work_gallery/addition_bethesda_26/after_02.jpg",
        service: "Home Addition",
        description:
            "The finished elevation from the street, siding and shutters carried across the new level - Bethesda, MD",
    },
    {
        project: BATH_12,
        src: "/images/work_gallery/master_bath_bowie_25/after_08.jpg",
        service: "Bathroom",
        description:
            "Stained oak vanity run under a marble-look quartz top with square brass hardware - Bowie, MD",
    },
    {
        project: EXTERIOR_2,
        src: "/images/projects/exterior/exterior2.webp",
        service: "Exterior Renovation",
        description:
            "Corner elevation reclad in large-format stone with a continuous lit soffit line",
    },
];

/** Alt text for one of a project's own frames - its cover or a gallery photo.
    Throws rather than shipping a frame with no alt behind it. */
function frameAlt(project: Project, src: string): string {
    if (project.cover.src === src) return project.cover.alt;
    const photo = project.photos.find((p) => p.src === src);
    if (!photo) {
        throw new Error(`${src} is not a frame of ${project.slug}`);
    }
    return photo.alt;
}

export const HOME_CAROUSEL_SLIDES: HomeSlide[] = HOME_CAROUSEL_PICKS.map(
    ({ project, src, service, description }) => ({
        src,
        alt: frameAlt(project, src),
        tag: `Residential — ${service}`,
        title: project.title,
        description,
    }),
);
