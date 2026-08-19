/**
 * Single source of truth for Blue Rock's completed project portfolio - the
 * /projects gallery, the home-page FeaturedProjects carousel, and the
 * "recent work" bands on service detail pages all read from here.
 *
 * Photos live in public/images/projects/<slug>/ and are referenced by their
 * public path (no `public/` prefix - that folder is the web root).
 */

export interface ProjectPhoto {
    src: string;
    /** Describe what's in the frame, not "project photo 1". */
    alt: string;
}

export interface Project {
    slug: string;
    title: string;
    /** Answer-first, 1-2 sentences. Feeds the card and the meta description. */
    summary: string;
    /** City + state only - never a client's street address. */
    location: string;
    /** "YYYY-MM" - sorts the gallery newest-first. */
    completedAt: string;
    cover: ProjectPhoto;
    /** Home-page carousel picks these up. */
    featured: boolean;
}

/* Exported by name as well as through PROJECTS so service pages can pull a
   specific project's photo and location without a find() + non-null assert. */
export const POTOMAC_KITCHEN: Project = {
    slug: "potomac-kitchen",
    title: "Potomac Kitchen Remodel",
    summary:
        "A full gut renovation opening the kitchen into a bright galley layout - handleless flat-panel cabinetry, a waterfall marble island with prep sink, full-slab backsplash, and a professional appliance suite.",
    location: "Potomac, MD",
    completedAt: "2026-06",
    cover: {
        src: "/images/projects/kitchen/kitchen1.jpg",
        alt: "Modern white kitchen with handleless cabinetry, waterfall marble island, matte black faucets, and stainless steel professional range",
    },
    featured: true,
};

export const DC_KITCHEN: Project = {
    slug: "washington-dc-kitchen",
    title: "Washington DC Kitchen Remodel",
    summary:
        "A two-tone kitchen built around a walnut-stained island - slate shaker cabinetry, marble-look quartz counters, a subway tile backsplash, and a professional range set into the island.",
    location: "Washington, DC",
    completedAt: "2026-04",
    cover: {
        src: "/images/projects/kitchen/kitchen2.jpg",
        alt: "Two-tone kitchen with slate gray shaker cabinets, walnut island, marble-look quartz counters, and glass globe pendant lights",
    },
    featured: true,
};

/* TODO: locations below are placeholders - confirm the city for each job with
   the client, then swap "TBD" for e.g. "Bethesda, MD". Until then these slides
   render without a location chip on the service pages. */
export const KITCHEN_3: Project = {
    slug: "kitchen-open-plan-white",
    title: "Open-Plan White Kitchen",
    summary:
        "A bright open-plan kitchen and dining space - handleless white cabinetry, a quartz island with an undermount prep sink, and dark-framed windows against wide-plank hardwood.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/kitchen/kitchen3.jpg",
        alt: "Bright open-plan white kitchen with a quartz island, handleless cabinetry, dark-framed windows, and hardwood floors",
    },
    featured: false,
};

export const KITCHEN_4: Project = {
    slug: "kitchen-farmhouse-white",
    title: "Farmhouse Kitchen",
    summary:
        "A farmhouse kitchen built around a plaster-style range hood - white shaker and glass-front cabinetry, a gray subway backsplash, lantern pendants, and a seated island.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/kitchen/kitchen4.jpg",
        alt: "Farmhouse kitchen with white cabinetry, plaster range hood, gray subway tile backsplash, lantern pendants, and wood bar stools at the island",
    },
    featured: false,
};

export const KITCHEN_5: Project = {
    slug: "kitchen-marble-galley",
    title: "Marble Galley Kitchen",
    summary:
        "A galley layout finished in soft gray shaker cabinetry with a full marble slab backsplash, a long marble island, farmhouse sink, and a professional range.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/kitchen/kitchen5.jpg",
        alt: "Gray shaker galley kitchen with a long marble island, marble slab backsplash, stainless farmhouse sink, and professional range",
    },
    featured: false,
};

export const KITCHEN_6: Project = {
    slug: "kitchen-navy-brass",
    title: "Navy & Brass Kitchen",
    summary:
        "A two-tone kitchen pairing white perimeter cabinetry with a navy island, brass hardware and fixtures throughout, white oak floors, and a farmhouse sink.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/kitchen/kitchen6.jpg",
        alt: "White kitchen with a navy island, brass hardware and faucet, white oak floors, farmhouse sink, and double wall ovens",
    },
    featured: false,
};

export const KITCHEN_7: Project = {
    slug: "kitchen-matte-black",
    title: "Matte Black Kitchen",
    summary:
        "A dramatic matte black kitchen under a vaulted, beamed ceiling - white quartz counters, an induction cooktop set into the island, double wall ovens, and light wood floors.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/kitchen/kitchen7.jpg",
        alt: "Matte black kitchen with a vaulted beamed ceiling, white quartz island with induction cooktop, cylinder pendants, and double wall ovens",
    },
    featured: false,
};

export const KITCHEN_8: Project = {
    slug: "kitchen-classic-cream",
    title: "Classic Cream Kitchen",
    summary:
        "A classic kitchen in cream shaker cabinetry - black granite perimeter counters against a marble-topped gray island, a marble subway backsplash with a tile medallion, and a professional range.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/kitchen/kitchen8.jpg",
        alt: "Cream shaker kitchen with black granite counters, a gray island topped in marble, marble subway backsplash, farmhouse sink, and stainless pro range",
    },
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
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/bath/bath1.jpg",
        alt: "Primary bathroom with a slate-blue double vanity, white quartz counter, matte black fixtures, and a freestanding soaking tub by the window",
    },
    featured: false,
};

export const BATH_2: Project = {
    slug: "bath-stone-walk-in",
    title: "Stone Tile Walk-In Bath",
    summary:
        "A compact bath finished in large-format stone-look tile - a light wood floating vanity, backlit mirror cabinet, and a frameless glass walk-in shower with a rain head.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/bath/bath2.jpg",
        alt: "Contemporary bathroom with light wood floating vanity, stone-look tile walls, backlit mirror cabinet, and a glass walk-in shower",
    },
    featured: false,
};

export const BATH_3: Project = {
    slug: "bath-gray-brass",
    title: "Gray & Brass Bath",
    summary:
        "A bright bath pairing a gray shaker double vanity with brass hardware and arched mirrors - a black-framed subway tile shower and a marble-look tile floor.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/bath/bath3.jpg",
        alt: "Bathroom with gray shaker double vanity, brass hardware and arched mirrors, black-framed glass shower, and white subway tile",
    },
    featured: false,
};

export const BATH_4: Project = {
    slug: "bath-spa-fireplace",
    title: "Spa Bath with Fireplace",
    summary:
        "A spa-style primary bath centered on a freestanding soaking tub - a marble-look feature wall with a linear fireplace and hexagon porcelain floor tile.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/bath/bath4.jpg",
        alt: "Spa bathroom with a freestanding soaking tub, marble-look feature wall with a linear fireplace, and gray hexagon floor tile",
    },
    featured: false,
};

export const BATH_5: Project = {
    slug: "bath-classic-luxury",
    title: "Classic Luxury Bath",
    summary:
        "A classic luxury bath in cream marble - a fluted stone vanity, integrated wood shelving and storage, and a frameless glass shower alongside a built-in tub.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/bath/bath5.jpg",
        alt: "Cream marble luxury bathroom with a fluted stone vanity, wood shelving, glass shower enclosure, and built-in tub",
    },
    featured: false,
};

export const BATH_6: Project = {
    slug: "bath-fluted-wood",
    title: "Fluted Wood Vanity Bath",
    summary:
        "A modern bath mixing a fluted wood floating vanity and vessel sink with a geometric feature tile wall and a ribbed wood-look tile walk-in shower.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/bath/bath6.jpg",
        alt: "Modern bathroom with a fluted wood floating vanity, vessel sink, geometric patterned accent tile, and a ribbed wood-look tile shower",
    },
    featured: false,
};

export const BATH_7: Project = {
    slug: "bath-white-marble-primary",
    title: "White Marble Primary Bath",
    summary:
        "A bright primary suite in white and marble - a light oak vanity with marble counters, brass fixtures, and a freestanding tub set beneath a triple window.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/bath/bath7.jpg",
        alt: "White primary bathroom with light oak vanity, marble counters, brass fixtures, and a freestanding tub under a triple window",
    },
    featured: false,
};

export const BATH_8: Project = {
    slug: "bath-double-shower",
    title: "Double Shower Primary Bath",
    summary:
        "A primary bath with an oversized marble walk-in shower - dual shower heads, a built-in bench, and a freestanding oval tub by the window.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/bath/bath8.jpg",
        alt: "Primary bathroom with a large marble walk-in shower with dual shower heads and bench seat, and a freestanding oval tub",
    },
    featured: false,
};

export const BATH_9: Project = {
    slug: "bath-wood-tile-shower",
    title: "Wood Tile Shower Bath",
    summary:
        "A guest bath finished with a ribbed wood-look tile shower behind a brass sliding glass door, paired with a wood vanity and marble-look floor tile.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/bath/bath9.jpg",
        alt: "Bathroom with a ribbed wood-look tile shower behind a brass-framed sliding glass door, wood vanity, and marble-look floor tile",
    },
    featured: false,
};

/* ── Basements ─────────────────────────────────────────────────────────────
   Same TODO as above: locations are unconfirmed, so these render without a
   location chip. Note that BASEMENT_1, BASEMENT_3, and BASEMENT_4 are three
   rooms of the *same* finished basement, not three separate jobs - only
   BASEMENT_1 goes into PROJECTS so the portfolio doesn't list one build three
   times. The other two are exported for the service-page carousel. */
export const BASEMENT_1: Project = {
    slug: "basement-open-rec-room",
    title: "Open Basement Rec Room",
    summary:
        "An unfinished basement turned into an open rec room - light oak plank flooring, recessed lighting throughout, a cable-rail stair, and a wet bar and full bath off the main space.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/basement/basement1.jpg",
        alt: "Finished basement rec room with light oak plank flooring, recessed lighting, a black cable-rail staircase, and a wet bar through the open door",
    },
    featured: false,
};

export const BASEMENT_2: Project = {
    slug: "basement-modern-lower-level",
    title: "Modern Lower Level",
    summary:
        "A dramatic lower level built around a floating marble stair with lit treads - polished concrete floors, a stone-clad bar, and woven pendants over a built-in wood table.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/basement/basement2.jpg",
        alt: "Modern lower level with a floating marble staircase with lit treads, polished concrete floor, stone bar, and woven pendant lights over a wood table",
    },
    featured: false,
};

export const BASEMENT_3: Project = {
    slug: "basement-storage-workshop",
    title: "Basement Storage & Workshop",
    summary:
        "The storage end of the same finished basement - louvered bifold closets built into the framing and a rolling steel workbench under a butcher-block top.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/basement/basement3.jpg",
        alt: "Finished basement hallway with gray louvered bifold closet doors and a rolling steel workbench with a butcher-block top along the far wall",
    },
    featured: false,
};

export const BASEMENT_4: Project = {
    slug: "basement-utility-fireplace-room",
    title: "Utility & Fireplace Room",
    summary:
        "Utility space kept usable rather than hidden - open cedar shelving along a finished wall, a rolling workbench, and a doorway through to the fireplace room.",
    location: "TBD",
    completedAt: "TBD",
    cover: {
        src: "/images/projects/basement/basement4.jpg",
        alt: "Basement utility area with open cedar storage shelving, a rolling steel workbench, and an open door to a room with a white brick fireplace",
    },
    featured: false,
};

export const PROJECTS: Project[] = [
    POTOMAC_KITCHEN,
    DC_KITCHEN,
    KITCHEN_3,
    KITCHEN_4,
    KITCHEN_5,
    KITCHEN_6,
    KITCHEN_7,
    KITCHEN_8,
    BATH_1,
    BATH_2,
    BATH_3,
    BATH_4,
    BATH_5,
    BATH_6,
    BATH_7,
    BATH_8,
    BATH_9,
    BASEMENT_1,
    BASEMENT_2,
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
