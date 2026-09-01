/**
 * Single source of truth for Blue Rock's completed project portfolio - the
 * /projects gallery, the /projects/[slug] detail pages, and the "recent work"
 * bands on service detail pages all read from here.
 *
 * Photos live in public/images/projects/<category>/ and are referenced by their
 * public path (no `public/` prefix - that folder is the web root).
 */

export type ProjectCategory =
    | "kitchen"
    | "bath"
    | "basement"
    | "addition"
    | "exterior"
    | "whole-home";

/** Human label for a category, used on cards and in the detail spec sheet. */
export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
    kitchen: "Kitchen",
    bath: "Bathroom",
    basement: "Basement",
    addition: "Addition",
    exterior: "Exterior",
    "whole-home": "Whole Home",
};

export interface ProjectPhoto {
    src: string;
    /** Describe what's in the frame, not "project photo 1". */
    alt: string;
    /** Short label shown under the photo in the detail gallery. */
    caption?: string;
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
    /** Detail-page gallery, cover excluded. Empty = tile only, no detail route. */
    photos: ProjectPhoto[];
    /** Populated once a job has a documented before/after study. */
    beforeAfter?: ProjectBeforeAfter[];
    /** Featured tiles span two grid columns and lead the home-page carousel. */
    featured: boolean;
    /** Optional "YYYY-MM". Not displayed and not sorted on - PROJECTS array
        order is the display order. Kept only where the month is known, so
        detail pages can emit `datePublished` without inventing one. */
    completedAt?: string;
}

/* ── Additions ─────────────────────────────────────────────────────────────
   The two richest records in the portfolio: both carry a documented
   before/after study, so both earn a detail page today. */

export const ADDITION_1: Project = {
    slug: "addition-second-story-garage",
    title: "Second Story Over The Garage",
    summary:
        "A full second story framed over an existing attached two-car garage, with the main roofline carried across the whole elevation and siding, trim, and shutters matched to the original house. The foundation and footprint are unchanged.",
    category: "addition",
    location: null,
    cover: {
        src: "/images/projects/addition/pro1-after.webp",
        alt: "Two-story colonial home after Blue Rock built a second story over the attached garage, with the roofline carried across the full width and siding, trim, and shutters matched to the original house",
    },
    photos: [],
    beforeAfter: [
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
    featured: true,
};

export const ADDITION_2: Project = {
    slug: "addition-mid-century-second-story",
    title: "Mid-Century Second Story",
    summary:
        "A second story over an existing garage wing on a split-level, drawn in the home's own mid-century vocabulary - an angled roofline, full-height glazing, and teal accent panels picked up from the original entry band.",
    category: "addition",
    location: "Rockville, MD",
    cover: {
        src: "/images/projects/addition/pro2-after.webp",
        alt: "Split-level home after Blue Rock built a second story over the garage wing, with an angled mid-century roofline, full-height glazing, tan panel cladding, and teal accent panels",
    },
    photos: [],
    beforeAfter: [
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
    featured: false,
};

/* ── Kitchens ──────────────────────────────────────────────────────────────
   Exported by name as well as through PROJECTS so service pages can pull a
   specific project's photo and location without a find() + non-null assert.

   TODO: locations below are null - confirm the city for each job with the
   client, then fill them in. Until then these render without a location chip. */

export const POTOMAC_KITCHEN: Project = {
    slug: "potomac-kitchen",
    title: "Potomac Kitchen Remodel",
    summary:
        "A full gut renovation opening the kitchen into a bright galley layout - handleless flat-panel cabinetry, a waterfall marble island with prep sink, full-slab backsplash, and a professional appliance suite.",
    category: "kitchen",
    location: "Potomac, MD",
    completedAt: "2026-06",
    cover: {
        src: "/images/projects/kitchen/kitchen1.jpg",
        alt: "Modern white kitchen with handleless cabinetry, waterfall marble island, matte black faucets, and stainless steel professional range",
    },
    photos: [],
    featured: true,
};

export const DC_KITCHEN: Project = {
    slug: "washington-dc-kitchen",
    title: "Washington DC Kitchen Remodel",
    summary:
        "A two-tone kitchen built around a walnut-stained island - slate shaker cabinetry, marble-look quartz counters, a subway tile backsplash, and a professional range set into the island.",
    category: "kitchen",
    location: "Washington, DC",
    completedAt: "2026-04",
    cover: {
        src: "/images/projects/kitchen/kitchen2.jpg",
        alt: "Two-tone kitchen with slate gray shaker cabinets, walnut island, marble-look quartz counters, and glass globe pendant lights",
    },
    photos: [],
    featured: true,
};

export const KITCHEN_3: Project = {
    slug: "kitchen-open-plan-white",
    title: "Open-Plan White Kitchen",
    summary:
        "A bright open-plan kitchen and dining space - handleless white cabinetry, a quartz island with an undermount prep sink, and dark-framed windows against wide-plank hardwood.",
    category: "kitchen",
    location: null,
    cover: {
        src: "/images/projects/kitchen/kitchen3.jpg",
        alt: "Bright open-plan white kitchen with a quartz island, handleless cabinetry, dark-framed windows, and hardwood floors",
    },
    photos: [],
    featured: false,
};

export const KITCHEN_4: Project = {
    slug: "kitchen-farmhouse-white",
    title: "Farmhouse Kitchen",
    summary:
        "A farmhouse kitchen built around a plaster-style range hood - white shaker and glass-front cabinetry, a gray subway backsplash, lantern pendants, and a seated island.",
    category: "kitchen",
    location: null,
    cover: {
        src: "/images/projects/kitchen/kitchen4.jpg",
        alt: "Farmhouse kitchen with white cabinetry, plaster range hood, gray subway tile backsplash, lantern pendants, and wood bar stools at the island",
    },
    photos: [],
    featured: false,
};

export const KITCHEN_5: Project = {
    slug: "kitchen-marble-galley",
    title: "Marble Galley Kitchen",
    summary:
        "A galley layout finished in soft gray shaker cabinetry with a full marble slab backsplash, a long marble island, farmhouse sink, and a professional range.",
    category: "kitchen",
    location: null,
    cover: {
        src: "/images/projects/kitchen/kitchen5.jpg",
        alt: "Gray shaker galley kitchen with a long marble island, marble slab backsplash, stainless farmhouse sink, and professional range",
    },
    photos: [],
    featured: false,
};

export const KITCHEN_6: Project = {
    slug: "kitchen-navy-brass",
    title: "Navy & Brass Kitchen",
    summary:
        "A two-tone kitchen pairing white perimeter cabinetry with a navy island, brass hardware and fixtures throughout, white oak floors, and a farmhouse sink.",
    category: "kitchen",
    location: null,
    cover: {
        src: "/images/projects/kitchen/kitchen6.jpg",
        alt: "White kitchen with a navy island, brass hardware and faucet, white oak floors, farmhouse sink, and double wall ovens",
    },
    photos: [],
    featured: false,
};

export const KITCHEN_7: Project = {
    slug: "kitchen-matte-black",
    title: "Matte Black Kitchen",
    summary:
        "A dramatic matte black kitchen under a vaulted, beamed ceiling - white quartz counters, an induction cooktop set into the island, double wall ovens, and light wood floors.",
    category: "kitchen",
    location: null,
    cover: {
        src: "/images/projects/kitchen/kitchen7.jpg",
        alt: "Matte black kitchen with a vaulted beamed ceiling, white quartz island with induction cooktop, cylinder pendants, and double wall ovens",
    },
    photos: [],
    featured: false,
};

export const KITCHEN_8: Project = {
    slug: "kitchen-classic-cream",
    title: "Classic Cream Kitchen",
    summary:
        "A classic kitchen in cream shaker cabinetry - black granite perimeter counters against a marble-topped gray island, a marble subway backsplash with a tile medallion, and a professional range.",
    category: "kitchen",
    location: null,
    cover: {
        src: "/images/projects/kitchen/kitchen8.jpg",
        alt: "Cream shaker kitchen with black granite counters, a gray island topped in marble, marble subway backsplash, farmhouse sink, and stainless pro range",
    },
    photos: [],
    featured: false,
};

export const KITCHEN_9: Project = {
    slug: "kitchen-vaulted-white",
    title: "Vaulted White Kitchen",
    summary:
        "A white kitchen under a vaulted ceiling with a gable window wall - a waterfall quartz island seating four, black lantern pendants, a pot filler over the gas cooktop, and light oak floors.",
    category: "kitchen",
    location: null,
    cover: {
        src: "/images/projects/kitchen/kitchen9.jpg",
        alt: "White shaker kitchen under a vaulted ceiling with a gable window wall, waterfall quartz island with black bar stools, lantern pendants, and light oak floors",
    },
    photos: [],
    featured: false,
};

/* ── Bathrooms ─────────────────────────────────────────────────────────────
   Same TODO as the kitchens above: locations are unconfirmed, so these render
   without a location chip until the client supplies the city for each job. */

export const BATH_1: Project = {
    slug: "bath-slate-vanity-primary",
    title: "Slate Vanity Primary Bath",
    summary:
        "A primary bath built around a slate-blue double vanity with a white quartz top - matte black fixtures, a freestanding soaking tub, and large-format porcelain floor tile.",
    category: "bath",
    location: null,
    cover: {
        src: "/images/projects/bath/bath1.jpg",
        alt: "Primary bathroom with a slate-blue double vanity, white quartz counter, matte black fixtures, and a freestanding soaking tub by the window",
    },
    photos: [],
    featured: false,
};

export const BATH_2: Project = {
    slug: "bath-stone-walk-in",
    title: "Stone Tile Walk-In Bath",
    summary:
        "A compact bath finished in large-format stone-look tile - a light wood floating vanity, backlit mirror cabinet, and a frameless glass walk-in shower with a rain head.",
    category: "bath",
    location: null,
    cover: {
        src: "/images/projects/bath/bath2.jpg",
        alt: "Contemporary bathroom with light wood floating vanity, stone-look tile walls, backlit mirror cabinet, and a glass walk-in shower",
    },
    photos: [],
    featured: false,
};

export const BATH_3: Project = {
    slug: "bath-gray-brass",
    title: "Gray & Brass Bath",
    summary:
        "A bright bath pairing a gray shaker double vanity with brass hardware and arched mirrors - a black-framed subway tile shower and a marble-look tile floor.",
    category: "bath",
    location: null,
    cover: {
        src: "/images/projects/bath/bath3.jpg",
        alt: "Bathroom with gray shaker double vanity, brass hardware and arched mirrors, black-framed glass shower, and white subway tile",
    },
    photos: [],
    featured: false,
};

export const BATH_4: Project = {
    slug: "bath-spa-fireplace",
    title: "Spa Bath with Fireplace",
    summary:
        "A spa-style primary bath centered on a freestanding soaking tub - a marble-look feature wall with a linear fireplace and hexagon porcelain floor tile.",
    category: "bath",
    location: null,
    cover: {
        src: "/images/projects/bath/bath4.jpg",
        alt: "Spa bathroom with a freestanding soaking tub, marble-look feature wall with a linear fireplace, and gray hexagon floor tile",
    },
    photos: [],
    featured: false,
};

export const BATH_5: Project = {
    slug: "bath-classic-luxury",
    title: "Classic Luxury Bath",
    summary:
        "A classic luxury bath in cream marble - a fluted stone vanity, integrated wood shelving and storage, and a frameless glass shower alongside a built-in tub.",
    category: "bath",
    location: null,
    cover: {
        src: "/images/projects/bath/bath5.jpg",
        alt: "Cream marble luxury bathroom with a fluted stone vanity, wood shelving, glass shower enclosure, and built-in tub",
    },
    photos: [],
    featured: false,
};

export const BATH_6: Project = {
    slug: "bath-fluted-wood",
    title: "Fluted Wood Vanity Bath",
    summary:
        "A modern bath mixing a fluted wood floating vanity and vessel sink with a geometric feature tile wall and a ribbed wood-look tile walk-in shower.",
    category: "bath",
    location: null,
    cover: {
        src: "/images/projects/bath/bath6.jpg",
        alt: "Modern bathroom with a fluted wood floating vanity, vessel sink, geometric patterned accent tile, and a ribbed wood-look tile shower",
    },
    photos: [],
    featured: false,
};

export const BATH_7: Project = {
    slug: "bath-white-marble-primary",
    title: "White Marble Primary Bath",
    summary:
        "A bright primary suite in white and marble - a light oak vanity with marble counters, brass fixtures, and a freestanding tub set beneath a triple window.",
    category: "bath",
    location: null,
    cover: {
        src: "/images/projects/bath/bath7.jpg",
        alt: "White primary bathroom with light oak vanity, marble counters, brass fixtures, and a freestanding tub under a triple window",
    },
    photos: [],
    featured: false,
};

export const BATH_8: Project = {
    slug: "bath-double-shower",
    title: "Double Shower Primary Bath",
    summary:
        "A primary bath with an oversized marble walk-in shower - dual shower heads, a built-in bench, and a freestanding oval tub by the window.",
    category: "bath",
    location: null,
    cover: {
        src: "/images/projects/bath/bath8.jpg",
        alt: "Primary bathroom with a large marble walk-in shower with dual shower heads and bench seat, and a freestanding oval tub",
    },
    photos: [],
    featured: false,
};

export const BATH_9: Project = {
    slug: "bath-wood-tile-shower",
    title: "Wood Tile Shower Bath",
    summary:
        "A guest bath finished with a ribbed wood-look tile shower behind a brass sliding glass door, paired with a wood vanity and marble-look floor tile.",
    category: "bath",
    location: null,
    cover: {
        src: "/images/projects/bath/bath9.jpg",
        alt: "Bathroom with a ribbed wood-look tile shower behind a brass-framed sliding glass door, wood vanity, and marble-look floor tile",
    },
    photos: [],
    featured: false,
};

/* ── Basements ─────────────────────────────────────────────────────────────
   BASEMENT_1 is one job photographed in three rooms. The storage end and the
   utility/fireplace room used to be separate exports, which listed one build
   three times in the portfolio; they are now photos on the job they belong to. */

export const BASEMENT_1: Project = {
    slug: "basement-open-rec-room",
    title: "Open Basement Rec Room",
    summary:
        "An unfinished basement turned into an open rec room - light oak plank flooring, recessed lighting throughout, a cable-rail stair, and a wet bar and full bath off the main space.",
    category: "basement",
    location: null,
    cover: {
        src: "/images/projects/basement/basement1.jpg",
        alt: "Finished basement rec room with light oak plank flooring, recessed lighting, a black cable-rail staircase, and a wet bar through the open door",
    },
    photos: [
        {
            src: "/images/projects/basement/basement3.jpg",
            alt: "Finished basement hallway with gray louvered bifold closet doors and a rolling steel workbench with a butcher-block top along the far wall",
            caption: "Basement Storage & Workshop",
        },
        {
            src: "/images/projects/basement/basement4.jpg",
            alt: "Basement utility area with open cedar storage shelving, a rolling steel workbench, and an open door to a room with a white brick fireplace",
            caption: "Utility & Fireplace Room",
        },
    ],
    featured: false,
};

export const BASEMENT_2: Project = {
    slug: "basement-modern-lower-level",
    title: "Modern Lower Level",
    summary:
        "A dramatic lower level built around a floating marble stair with lit treads - polished concrete floors, a stone-clad bar, and woven pendants over a built-in wood table.",
    category: "basement",
    location: null,
    cover: {
        src: "/images/projects/basement/basement2.jpg",
        alt: "Modern lower level with a floating marble staircase with lit treads, polished concrete floor, stone bar, and woven pendant lights over a wood table",
    },
    photos: [],
    featured: false,
};

/* ── Exteriors ─────────────────────────────────────────────────────────────
   These two photographs were previously hardcoded as string literals inside
   SERVICE_SPLITS["exterior-renovations"]; that band now reads them from here
   so the portfolio and the service page cannot drift apart. */

export const EXTERIOR_1: Project = {
    slug: "exterior-stone-entry",
    title: "Stone Entry & Hardscape",
    summary:
        "A rebuilt front entry in stone cladding - wide stair treads up to a dark full-height door, recessed landscape lighting along the planting bed, and new hardscape across the approach.",
    category: "exterior",
    location: null,
    cover: {
        src: "/images/projects/exterior/exterior1.webp",
        alt: "Stone-clad home exterior at dusk with a rebuilt entry landing, wide stair treads, a dark full-height front door, and recessed landscape lighting along the planting bed",
    },
    photos: [],
    featured: false,
};

export const EXTERIOR_2: Project = {
    slug: "exterior-corner-elevation",
    title: "Corner Elevation & Lighting",
    summary:
        "A re-clad corner elevation in large-format stone with a continuous lit soffit line, wall sconces set between the windows, and a paver walkway carried around the corner.",
    category: "exterior",
    location: null,
    cover: {
        src: "/images/projects/exterior/exterior2.webp",
        alt: "Corner elevation of a renovated home exterior with large-format stone cladding, a continuous lit soffit line, wall sconces between windows, and a paver walkway",
    },
    photos: [],
    featured: false,
};

/**
 * The portfolio, in display order.
 *
 * Array position IS the order the /projects grid renders in - there is no
 * sort. `completedAt` is missing on most records, so it cannot order anything;
 * this list is curated by hand instead. Two rules when editing it: put the
 * strongest work first, and interleave categories so the grid shows range
 * rather than nine kitchens followed by nine bathrooms.
 */
export const PROJECTS: Project[] = [
    ADDITION_1,
    BATH_1,
    KITCHEN_3,
    POTOMAC_KITCHEN,
    BASEMENT_1,
    BATH_2,
    EXTERIOR_1,
    DC_KITCHEN,
    KITCHEN_4,
    BATH_3,
    ADDITION_2,
    KITCHEN_5,
    BATH_4,
    BASEMENT_2,
    KITCHEN_6,
    BATH_5,
    EXTERIOR_2,
    KITCHEN_7,
    BATH_6,
    KITCHEN_8,
    BATH_7,
    KITCHEN_9,
    BATH_8,
    BATH_9,
];

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
