/**
 * Single source of truth for Blue Rock's service offerings - rendered by the
 * home-page WhatWeDo section and emitted as OfferCatalog JSON-LD. Flagship
 * services (core expertise) show first; the rest live behind "more services".
 * `href` values point at section anchors today; swap to dedicated subcategory
 * pages here when those routes exist.
 */

import {
    BASEMENT_1,
    BASEMENT_2,
    BASEMENT_3,
    BASEMENT_4,
    BATH_1,
    BATH_2,
    BATH_3,
    BATH_4,
    BATH_5,
    BATH_6,
    BATH_7,
    BATH_8,
    BATH_9,
    DC_KITCHEN,
    KITCHEN_3,
    KITCHEN_4,
    KITCHEN_5,
    KITCHEN_6,
    KITCHEN_7,
    KITCHEN_8,
    KITCHEN_9,
    POTOMAC_KITCHEN,
} from "@/lib/projects";

export interface Service {
    slug: string;
    title: string;
    blurb: string;
    flagship: boolean;
    href: string;
    /** Isometric blueprint→reality render in public/images/hero/.
        Flagship cards with an image render full-bleed; without, icon layout. */
    image?: string;
    /** Two answer-first paragraphs for the service's subcategory page. */
    intro: [string, string];
    /** Optional overrides for the subcategory page's <title> and meta
        description, for services whose search demand is phrased differently
        from the nav label. Falls back to `title` and `blurb` when absent. */
    seoTitle?: string;
    seoDescription?: string;
}

export const SERVICES: Service[] = [
    {
        slug: "kitchen-remodeling",
        title: "Kitchen Remodeling",
        blurb: "Custom kitchens designed and built around how you cook and live - cabinetry, counters, lighting, and layout.",
        flagship: true,
        href: "/services/residential/kitchen-remodeling",
        intro: [
            "Blue Rock Remodeling & Construction designs and builds custom kitchens across Maryland and Washington, DC - handling layout, cabinetry, countertops, lighting, plumbing, and finish work with one licensed, accountable team. As an MHIC-licensed general contractor serving the region since 2010, we take projects from the first sketch to the final walkthrough with transparent pricing at every step.",
            "Whether you want a full gut renovation, an island and layout reconfiguration, or updated cabinetry and counters, we build around how your family actually cooks and lives.",
        ],
        image: "/images/hero/kitchen-remodeling.webp",
    },
    {
        slug: "bathroom-remodeling",
        title: "Bathroom Remodeling",
        blurb: "Spa-inspired bathrooms with modern fixtures, custom cabinetry, and finishes tailored to your style.",
        flagship: true,
        href: "/services/residential/bathroom-remodeling",
        intro: [
            "From powder-room refreshes to full primary-suite renovations, Blue Rock builds bathrooms that balance everyday function with spa-level comfort - tile, custom vanities, glass enclosures, lighting, and plumbing handled by one licensed team across Maryland and Washington, DC.",
            "We manage waterproofing, ventilation, and code compliance behind the walls as carefully as the finishes you see, so the result looks beautiful and stays that way.",
        ],
        image: "/images/hero/bathroom.webp",
    },
    {
        slug: "home-additions",
        title: "Home Additions",
        blurb: "Expand your living space with seamless new rooms or additional levels, from design through final walkthrough.",
        flagship: true,
        href: "/services/residential/home-additions",
        intro: [
            "Blue Rock Remodeling & Construction designs and builds home additions in Rockville and across the DMV, including extra bedrooms, expanded kitchens, sunrooms, in-law suites, and full second stories built over an existing garage. Every addition is matched to the home's roofline, siding, and trim so it reads as original construction.",
            "One licensed team carries the project from permit drawings through foundation or structural tie-in, framing, roofing, mechanical rough-in, and finish work, ending at a final walkthrough and closed-out permits.",
        ],
        image: "/images/hero/addition.webp",
        seoTitle: "Home Addition Services in Rockville, MD",
        seoDescription:
            "Licensed home addition contractor in Rockville, MD. Blue Rock builds second stories, in-law suites, sunrooms, and room additions across Montgomery County and the DMV, matched to your home's existing structure.",
    },
    {
        slug: "basement-finishing",
        title: "Basement Finishing",
        blurb: "Turn an unfinished basement into a functional living area - home theater, office, gym, or in-law suite.",
        flagship: true,
        href: "/services/residential/basement-finishing",
        intro: [
            "An unfinished basement is square footage waiting to work for you. Blue Rock turns basements across Maryland and Washington, DC into home theaters, offices, gyms, guest suites, and rental-ready living areas.",
            "We handle moisture control, egress, insulation, electrical, and finishes as one licensed team - so the new level of your home is comfortable, code-compliant, and built to last.",
        ],
        image: "/images/hero/basement.webp",
    },
    {
        slug: "exterior-renovations",
        title: "Exterior Renovations",
        blurb: "Siding, trim, windows, doors, and professional exterior painting that protect your home and lift its curb appeal.",
        flagship: false,
        href: "/services/residential/exterior-renovations",
        intro: [
            "Blue Rock Remodeling & Construction renovates home exteriors across Maryland and Washington, DC - siding, trim, soffit and fascia, windows, entry doors, roofline repairs, and professional exterior painting, handled by one MHIC-licensed general contractor working in the region since 2010.",
            "We specify materials rated for the DMV's mixed-humid climate and flash and seal every opening to the manufacturer's warranty requirements, so the first impression your home makes holds up through every season.",
        ],
        image: "/images/hero/exterior.webp",
        seoTitle: "Exterior Renovation Services in Rockville, MD",
        seoDescription:
            "Licensed exterior renovation contractor in Rockville, MD. Blue Rock replaces siding, trim, windows, and entry doors across Montgomery County and the DMV.",
    },
    {
        slug: "demolition-services",
        title: "Demolition Services",
        blurb: "Safe, comprehensive demolition for residential and commercial projects, prepped for what's next.",
        flagship: false,
        href: "/services/residential/demolition-services",
        intro: [
            "Safe, clean demolition is the first step of a successful build. Blue Rock provides selective interior demolition and full structure removal for residential and commercial projects across Maryland and Washington, DC.",
            "Licensed, insured, and careful about containment, disposal, and site prep, we leave every project ready for what comes next.",
        ],
    },
    {
        slug: "deck-installation",
        title: "Deck Installation & Repair",
        blurb: "Outdoor decks built and restored to code - materials, railings, and finishes that last.",
        flagship: false,
        href: "/services/residential/deck-installation",
        intro: [
            "Blue Rock designs, builds, and repairs decks across the DMV - composite and wood structures with railings, stairs, and finishes engineered to code and built for year-round use.",
            "From footings to final seal, one licensed team ensures your outdoor living space is safe, durable, and ready for the seasons.",
        ],
        image: "/images/hero/deck.webp",
    },
    {
        slug: "interior-design",
        title: "Interior Design",
        blurb: "Guidance on colors, furniture, and accessories so the finished space feels intentional, not improvised.",
        flagship: false,
        href: "/services/residential/interior-design",
        intro: [
            "Great renovations deserve finishing touches that feel intentional. Blue Rock's interior design guidance covers colors, materials, lighting, furniture, and accessories that complete the spaces we build.",
            "Because design and construction live under one roof, choices stay coordinated - and the finished space matches the vision from day one.",
        ],
        image: "/images/hero/interior.webp",
    },
];

export const FLAGSHIP_SERVICES = SERVICES.filter((s) => s.flagship);
/** Home-page drawer row. Demolition stays in SERVICES (residential grid,
    slug route, sitemap) but is not shown on the home page. */
export const MORE_SERVICES = SERVICES.filter(
    (s) => !s.flagship && s.slug !== "demolition-services",
);

/**
 * Sector categories shown as the last drawer row on the home page. Kept out
 * of SERVICES on purpose: they link to their own category pages, not
 * residential subcategory routes, so they must not join the residential
 * grid, the sitemap's service mapping, or the OfferCatalog.
 */
export const SECTOR_SERVICES: Service[] = [
    {
        slug: "commercial-services",
        title: "Commercial",
        blurb: "Build-outs, renovations, and tenant improvements for offices, retail, and business spaces.",
        flagship: false,
        href: "/services/commercial",
        intro: [
            "Blue Rock delivers commercial construction across the DMV - office build-outs, retail renovations, and tenant improvements completed on schedule and to code.",
            "One licensed team manages permits, trades, and finish work so your business opens on time.",
        ],
        image: "/images/hero/commercial.webp",
    },
    {
        slug: "government-services",
        title: "Government",
        blurb: "Licensed contracting for government facilities and public-sector projects across the DMV.",
        flagship: false,
        href: "/services/government",
        intro: [
            "Blue Rock serves government clients across Maryland and Washington, DC with licensed, insured general contracting for public facilities.",
            "We meet public-sector compliance, documentation, and scheduling requirements from bid to closeout.",
        ],
        image: "/images/hero/government.webp",
    },
];

/* ── Photo + narrative bands ───────────────────────────────────────────────
   The lightweight alternative to SERVICE_DETAILS: a service with real
   photography but no documented process, before/after set, or FAQ gets one
   or two alternating photo/copy bands instead of the full designed page.
   Rendered by ServiceSplitSections; a service can have a SERVICE_SPLITS
   entry, a SERVICE_DETAILS entry, or neither. */

export interface ServiceSplit {
    /** Sheet number inside the band, e.g. "01" → "Exterior 01.01 · Kicker". */
    index: string;
    kicker: string;
    /** The section headline, rendered full width at display scale above the
        photo/copy pair - same shape as ResidentialShowcase's "Expert
        Residential Remodeling". Two to four words. */
    heading: string;
    /** Answer-first, then detail. Each paragraph has to survive being lifted
        on its own: AI answer engines quote single passages, not sections, so
        no "as mentioned above" and no unresolved pronouns. */
    paragraphs: string[];
    /** Dashed scope list. Optional, and mutually exclusive with `pullQuote`
        in practice - one band gets the list, the next gets the quote, so the
        two bands don't read as the same block twice. */
    points?: string[];
    /** Accent pull-quote closing the column. Optional. */
    pullQuote?: string;
    image: {
        src: string;
        alt: string;
        /** Mono label in the frame's title block. Describes what the photo
            shows; it is not a location or a project claim. */
        caption: string;
        /** `object-position` for the 4:3 crop, e.g. "60% 50%". The source
            renders are 2:1, so a centered crop drops a third of the width -
            set this to whichever third actually holds the subject. */
        focus?: string;
    };
    /** Photo on the right instead of the left. Alternate it down the page. */
    flip?: boolean;
}

export interface ServiceSplitBand {
    /** Word before the sheet number in section labels, e.g. "Exterior". */
    sheetName: string;
    /** Two-letter code in each frame's title block, e.g. "EX" → "Sheet EX—1.1".
        Explicit rather than derived from `sheetName`, so two services starting
        with the same letters don't silently share a code. */
    sheetCode: string;
    sections: ServiceSplit[];
    /** Visible Q&A closing the page, mirrored as FAQPage JSON-LD. Answers
        must stay self-contained and match the visible text - the schema and
        the page have to agree or the markup reads as a mismatch. Optional;
        the band renders without it. */
    faq?: { question: string; answer: string }[];
}

export const SERVICE_SPLITS: Record<string, ServiceSplitBand> = {
    "exterior-renovations": {
        sheetName: "Exterior",
        sheetCode: "EX",
        sections: [
            {
                index: "01",
                kicker: "Overview",
                heading: "Siding, Windows & Doors",
                paragraphs: [
                    "Blue Rock Remodeling & Construction replaces siding, trim, windows, and entry doors on homes in Rockville, Bethesda, Potomac, Silver Spring, Gaithersburg, and across Washington, DC. One MHIC-licensed crew handles the whole exterior - tear-off, moisture barrier, flashing, insulation, and finish - so there is no seam between trades for water to find.",
                    "New trim profiles are matched to the home's existing roofline and detailing rather than to whatever stock the supplier has on the shelf, which is what keeps a re-clad house from reading as a re-clad house.",
                ],
                points: [
                    "Siding in fiber cement, engineered wood, and vinyl",
                    "Trim, soffit, fascia, and gutter replacement",
                    "Window and entry door replacement",
                    "Roofline repairs and roofing upgrades",
                    "Professional exterior painting, prep included",
                ],
                image: {
                    src: "/images/projects/exterior/exterior1.webp",
                    alt: "Stone-clad home exterior at dusk with a rebuilt entry landing, wide stair treads, a dark full-height front door, and recessed landscape lighting along the planting bed",
                    caption: "Entry, cladding & hardscape",
                    focus: "60% 50%",
                },
            },
            {
                index: "02",
                kicker: "Durability & Efficiency",
                heading: "Built To Last",
                flip: true,
                paragraphs: [
                    "A well-built exterior does two jobs at once: it changes how a house reads from the street, and it lowers what the house costs to run. Air-sealing, continuous insulation behind the cladding, and correctly flashed window and door openings cut drafts and reduce heating and cooling load through Maryland's humid summers and freeze-thaw winters.",
                    "We specify for this climate rather than for the fastest install - cladding that resists moisture and impact, coatings that hold their color in direct sun, and flashing and fasteners that will not corrode behind the wall where nobody can see them fail.",
                ],
                pullQuote:
                    "One licensed crew from tear-off to final walkthrough, so the siding, windows, trim, and paint all answer to the same standard.",
                image: {
                    src: "/images/projects/exterior/exterior2.webp",
                    alt: "Corner elevation of a renovated home exterior with large-format stone cladding, a continuous lit soffit line, wall sconces between windows, and a paver walkway",
                    caption: "Corner elevation & lighting",
                    focus: "38% 50%",
                },
            },
        ],
        faq: [
            {
                question: "What siding materials do you install?",
                answer:
                    "Blue Rock installs fiber cement, engineered wood, and vinyl siding, and helps you choose between them based on the house and the budget rather than on what is fastest to hang. Fiber cement holds paint well and resists impact and moisture, engineered wood gives a deeper grain at lower weight, and vinyl is the least expensive to install and maintain. Trim, soffit, fascia, and gutters are replaced as part of the same scope.",
            },
            {
                question: "Should I replace siding and windows at the same time?",
                answer:
                    "Yes, when both are due. Windows and doors are flashed into the same water-resistive barrier that sits behind the siding, so doing them together produces one continuous drainage plane instead of two that have to be patched into each other later. It also means one crew, one schedule, and one company accountable if something needs correcting.",
            },
            {
                question: "Do I need a permit for exterior work in Montgomery County?",
                answer:
                    "It depends on the scope. Like-for-like siding or window replacement often does not require a permit, while structural changes, new openings, and additions do. Blue Rock is licensed by the Maryland Home Improvement Commission, confirms what your jurisdiction requires before work starts, and pulls and closes out the permits as part of the project.",
            },
            {
                question: "What areas do you serve for exterior renovations?",
                answer:
                    "Blue Rock Remodeling & Construction works throughout Maryland and Washington, DC, including Rockville, Bethesda, Potomac, Silver Spring, and Gaithersburg. The company has been based in Rockville since 2010.",
            },
        ],
    },
};

/* ── Rich subcategory-page content ─────────────────────────────────────────
   Services with an entry in SERVICE_DETAILS get the full designed page
   (materials split, process log, timeline band, gallery, FAQ) rendered by
   ServiceDetailSections; the rest keep the intro-only layout. FAQ items are
   also emitted as FAQPage JSON-LD, so answers must stay self-contained and
   match the visible text. */

/**
 * One documented before/after project inside the `beforeAfter` band.
 *
 * `mode` is the important field. Pick it from the photographs, not from
 * preference: "wipe" needs a registered pair (same camera position, same
 * framing, ideally the same season) or the divider seam reads as two
 * unrelated photographs. Anything else is "pair", which shows both frames
 * side by side and compares cleanly regardless of how the shots were taken.
 */
export interface BeforeAfterProject {
    /** Project name, rendered as the sheet title above the frames. */
    title: string;
    /** City + state. Omit when the city is still unconfirmed. */
    location?: string;
    mode: "wipe" | "pair";
    lead: string;
    before: { src: string; alt: string; label: string; note: string };
    after: { src: string; alt: string; label: string; note: string };
    caption: string;
    /** Drafting readouts describing the scope, shown under the frames. */
    specs: { label: string; value: string }[];
}

export interface ServiceDetail {
    /** Word before the sheet number in section labels, e.g. "Kitchen" →
        "Kitchen 01.01 · Design & Materials". */
    sheetName: string;
    /** 01 - narrative + framed photo. */
    materials: {
        kicker: string;
        heading: string;
        paragraphs: string[];
        /** Rendered as an accent pull-quote after the paragraphs. */
        pullQuote: string;
        image: { src: string; alt: string; caption: string };
        /** Optional side-by-side choice cards (e.g. wood vs. composite)
            rendered full-width under the narrative + photo. */
        options?: { label: string; title: string; points: string[] }[];
    };
    /** Ordered phase log. Optional: services without a build sequence
        (e.g. deck care) skip it and later sections renumber. */
    process?: {
        kicker: string;
        heading: string;
        lead: string;
        phases: { title: string; note: string }[];
        close: string;
    };
    /** Maintenance / when-to-repair ink band: warning signs rendered as an
        inspection sheet. Optional. */
    care?: {
        kicker: string;
        heading: string;
        lead: string;
        signs: { title: string; note: string }[];
        close: string;
    };
    /** Ink band with stat readouts. Optional: services without it skip
        the band and the later sections renumber accordingly. */
    timeline?: {
        kicker: string;
        heading: string;
        paragraphs: string[];
        stats: { value: string; label: string; note: string }[];
    };
    /** 04 - project carousel. Optional: a service with a single documented
        project uses `beforeAfter` instead of a thin carousel. */
    gallery?: {
        kicker: string;
        heading: string;
        slides: { src: string; alt: string; tag?: string; title?: string }[];
    };
    /** Ink band of documented projects, each compared before and after.
        Optional, and mutually exclusive with `gallery` in practice: use it
        when there are individually documented projects rather than a
        gallery's worth of finished shots. */
    beforeAfter?: {
        kicker: string;
        heading: string;
        /** Intro for the band as a whole. Per-project detail goes on the
            project's own `lead`. */
        lead: string;
        projects: BeforeAfterProject[];
    };
    /** 05 - visible Q&A, mirrored as FAQPage schema. */
    faq: { question: string; answer: string }[];
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
    "kitchen-remodeling": {
        sheetName: "Kitchen",
        materials: {
            kicker: "Design & Materials",
            heading: "Design & Materials",
            paragraphs: [
                "When you're planning a kitchen remodel in Maryland or DC, the first step is choosing materials that match your vision and lifestyle. At Blue Rock Remodeling, we work with multiple cabinet suppliers across the region so we can find the perfect match for your design - whether you want modern sleek finishes, warm traditional styles, or something in between.",
                "Same approach with countertops. We don't lock you into one brand or supplier. Instead, we listen to what you want your kitchen to look and feel like, then we source the materials that make that happen.",
            ],
            pullQuote:
                "Your kitchen in Rockville, Silver Spring, Potomac, or anywhere in Maryland and DC should reflect your taste, not what's easiest for us to install.",
            image: {
                src: "/kitchen.jpg",
                alt: "Remodeled kitchen with custom cabinetry and stone countertops by Blue Rock Remodeling",
                caption: "Material selection · Cabinetry & counters",
            },
        },
        process: {
            kicker: "The Process",
            heading: "The Remodeling Process",
            lead: "A kitchen remodel isn't just about ripping out the old and putting in the new. It's a carefully planned sequence.",
            phases: [
                { title: "Demolition & Disposal", note: "Old kitchen out, debris hauled, site prepped" },
                { title: "Structural Work", note: "Framing, electrical, plumbing, gas lines if needed" },
                { title: "Drywall & Painting", note: "The finishing phases begin" },
                { title: "Cabinet Installation", note: "Sourced from the supplier that fits your design" },
                { title: "Countertop Placement", note: "Templated and set after cabinets" },
                { title: "Backsplash", note: "Tile and detail work" },
                { title: "Flooring", note: "Installed and protected through final trades" },
                { title: "Hardware & Fixtures", note: "Final touches before walkthrough" },
            ],
            close: "Every step connects to the next. When homeowners in the DC area or Maryland suburbs work with Blue Rock, they get a team that coordinates these phases so nothing gets missed and nothing causes delays downstream.",
        },
        timeline: {
            kicker: "Timeline",
            heading: "Timeline & What to Expect",
            paragraphs: [
                "Most kitchen remodels take about eight weeks from start to finish, depending on the scope of your project. That eight-week window gives us time to do demolition properly, handle any surprises behind the walls - which happen in older homes throughout Maryland and DC - and let you live through the finishing phases without rushing quality.",
                "We keep you in the loop throughout. You'll see progress, know what's coming next, and understand why we're on track or if something unexpected needs extra time.",
            ],
            stats: [
                { value: "8", label: "Weeks, start to finish", note: "Typical timeline, depending on scope" },
                { value: "08", label: "Coordinated phases", note: "Demolition through final fixtures" },
                { value: "MHIC", label: "Licensed & insured", note: "Maryland Home Improvement Commission" },
            ],
        },
        gallery: {
            kicker: "Recent Work",
            heading: "Recent Kitchen Projects",
            /* Every slide is a real project pulled from projects.ts, so photos,
               alt text, and location chips stay in sync with the portfolio. */
            slides: [
                {
                    src: POTOMAC_KITCHEN.cover.src,
                    alt: POTOMAC_KITCHEN.cover.alt,
                    tag: POTOMAC_KITCHEN.location,
                    title: "Full Gut Renovation",
                },
                {
                    src: DC_KITCHEN.cover.src,
                    alt: DC_KITCHEN.cover.alt,
                    tag: DC_KITCHEN.location,
                    title: "Two-Tone Cabinetry & Quartz",
                },
                /* No `tag` on the rest yet - the chip renders a project's
                   location, and theirs are still TBD in projects.ts. */
                {
                    src: KITCHEN_3.cover.src,
                    alt: KITCHEN_3.cover.alt,
                    title: KITCHEN_3.title,
                },
                {
                    src: KITCHEN_4.cover.src,
                    alt: KITCHEN_4.cover.alt,
                    title: KITCHEN_4.title,
                },
                {
                    src: KITCHEN_5.cover.src,
                    alt: KITCHEN_5.cover.alt,
                    title: KITCHEN_5.title,
                },
                {
                    src: KITCHEN_6.cover.src,
                    alt: KITCHEN_6.cover.alt,
                    title: KITCHEN_6.title,
                },
                {
                    src: KITCHEN_7.cover.src,
                    alt: KITCHEN_7.cover.alt,
                    title: KITCHEN_7.title,
                },
                {
                    src: KITCHEN_8.cover.src,
                    alt: KITCHEN_8.cover.alt,
                    title: KITCHEN_8.title,
                },
                {
                    src: KITCHEN_9.cover.src,
                    alt: KITCHEN_9.cover.alt,
                    title: KITCHEN_9.title,
                },
            ],
        },
        faq: [
            {
                question: "How long does a kitchen remodel take in Maryland or DC?",
                answer: "Most kitchen remodels take about eight weeks from start to finish, depending on the scope of the project. That window covers proper demolition, any surprises behind the walls - common in older homes throughout Maryland and DC - and unhurried finishing phases so quality is never rushed.",
            },
            {
                question: "Do I have to choose from one cabinet or countertop brand?",
                answer: "No. Blue Rock Remodeling works with multiple cabinet and countertop suppliers across the Maryland–DC region, so materials are sourced to match your design - modern sleek finishes, warm traditional styles, or something in between - rather than what is easiest to install.",
            },
            {
                question: "What steps are included in a full kitchen remodel?",
                answer: "The sequence runs: demolition and disposal, structural work (framing, electrical, plumbing, and gas lines if needed), then the finishing phases - drywall, painting, cabinet installation, countertop placement, backsplash, flooring, and final hardware and fixtures. Each phase is coordinated so nothing gets missed and nothing causes delays downstream.",
            },
            {
                question: "Which areas does Blue Rock serve for kitchen remodeling?",
                answer: "Blue Rock Remodeling & Construction remodels kitchens in Rockville, Silver Spring, Chevy-Chase, and homes throughout Maryland and Washington, DC.",
            },
            {
                question: "Will I know what's happening during my remodel?",
                answer: "Yes. You're kept in the loop throughout the project - you'll see progress, know what's coming next, and understand why the work is on track or whether something unexpected needs extra time.",
            },
        ],
    },
    "bathroom-remodeling": {
        sheetName: "Bathroom",
        materials: {
            kicker: "Design & Materials",
            heading: "Design & Materials",
            paragraphs: [
                "Every bathroom we build starts with materials chosen for your space, not off a shelf. We work with multiple suppliers across Maryland and DC for tile, vanities, countertops, and fixtures, so the finish matches your style - modern, classic, or somewhere in between.",
                "The same care goes into what you don't see. Waterproofing membranes, backer board, and ventilation are selected with the same attention as the tile and vanities, so the finished bathroom stays beautiful long after the reveal.",
            ],
            pullQuote:
                "Your bathroom in Rockville, Silver Spring, or anywhere in Maryland and DC should reflect your style, not what's easiest for us to install.",
            image: {
                /* Placeholder render - swap for a real project photo. */
                src: "/images/hero/bathroom.webp",
                alt: "Remodeled bathroom with custom vanity and tile work by Blue Rock Remodeling",
                caption: "Material selection · Tile & vanities",
            },
        },
        process: {
            kicker: "The Process",
            heading: "The Remodeling Process",
            lead: "Demolition, plumbing, and electrical come first, then waterproofing, tile, and fixtures.",
            phases: [
                { title: "Demolition & Disposal", note: "Old bathroom out, debris hauled, site protected" },
                { title: "Plumbing Rough-In", note: "Supply and drain lines set for the new layout" },
                { title: "Electrical Rough-In", note: "Lighting, ventilation, and GFCI-protected outlets" },
                { title: "Waterproofing", note: "Membranes and shower pan sealed before any tile goes down" },
                { title: "Tile Work", note: "Floors, walls, and shower surrounds" },
                { title: "Vanity & Fixtures", note: "Cabinetry, countertops, faucets, and glass enclosures" },
                { title: "Paint & Final Details", note: "Hardware, mirrors, and finishing touches before walkthrough" },
            ],
            close: "With over a decade remodeling homes across Maryland and DC, we sequence every phase so nothing gets rushed or missed. Bathrooms take time to get right, especially waterproofing and tile work - we keep you updated at every step, so the result is a space built to last, not just to look good on day one.",
        },
        gallery: {
            kicker: "Recent Work",
            heading: "Recent Bathroom Projects",
            /* Every slide is a real project pulled from projects.ts, so photos
               and alt text stay in sync with the portfolio. No `tag` yet - the
               chip renders a location and these are still TBD. */
            slides: [
                {
                    src: BATH_1.cover.src,
                    alt: BATH_1.cover.alt,
                    title: BATH_1.title,
                },
                {
                    src: BATH_2.cover.src,
                    alt: BATH_2.cover.alt,
                    title: BATH_2.title,
                },
                {
                    src: BATH_3.cover.src,
                    alt: BATH_3.cover.alt,
                    title: BATH_3.title,
                },
                {
                    src: BATH_4.cover.src,
                    alt: BATH_4.cover.alt,
                    title: BATH_4.title,
                },
                {
                    src: BATH_5.cover.src,
                    alt: BATH_5.cover.alt,
                    title: BATH_5.title,
                },
                {
                    src: BATH_6.cover.src,
                    alt: BATH_6.cover.alt,
                    title: BATH_6.title,
                },
                {
                    src: BATH_7.cover.src,
                    alt: BATH_7.cover.alt,
                    title: BATH_7.title,
                },
                {
                    src: BATH_8.cover.src,
                    alt: BATH_8.cover.alt,
                    title: BATH_8.title,
                },
                {
                    src: BATH_9.cover.src,
                    alt: BATH_9.cover.alt,
                    title: BATH_9.title,
                },
            ],
        },
        faq: [
            {
                question: "How long does a bathroom remodel take in Maryland or DC?",
                answer: "It depends on the scope, and bathrooms take time to get right - especially waterproofing and tile work. Those phases are never rushed, because they determine whether the bathroom lasts. Blue Rock keeps homeowners updated at every step, so you always know what's happening and what comes next.",
            },
            {
                question: "What steps are included in a full bathroom remodel?",
                answer: "The sequence runs: demolition and disposal, plumbing rough-in, electrical rough-in, waterproofing, tile work, vanity and fixture installation, and final paint and details. Demolition, plumbing, and electrical come first, then waterproofing, tile, and fixtures - each phase is sequenced so nothing gets rushed or missed.",
            },
            {
                question: "Do I have to choose from one tile or vanity brand?",
                answer: "No. Blue Rock Remodeling works with multiple suppliers across Maryland and DC for tile, vanities, countertops, and fixtures, so materials are chosen for your space and style - modern, classic, or somewhere in between - not off a shelf.",
            },
            {
                question: "Why is waterproofing so important in a bathroom remodel?",
                answer: "Waterproofing determines whether a bathroom lasts. Membranes and the shower pan are installed and sealed before any tile goes down, so the finished space is built to last - not just to look good on day one.",
            },
            {
                question: "Which areas does Blue Rock serve for bathroom remodeling?",
                answer: "Blue Rock Remodeling & Construction remodels bathrooms in Rockville, Silver Spring, Chevy Chase, and homes throughout Maryland and Washington, DC.",
            },
        ],
    },
    "home-additions": {
        sheetName: "Addition",
        materials: {
            kicker: "Design & Materials",
            heading: "Design & Materials",
            paragraphs: [
                "A home addition adds finished square footage to a house you already like, in a neighborhood you already chose. For most families in Rockville and the surrounding Montgomery County suburbs, building up or out costs less disruption than moving, and it keeps the schools, the commute, and the neighbors exactly where they are.",
                "Blue Rock designs every addition to read as original construction. We match the existing roofline, siding profile, trim, and shutters, then source materials across Maryland and DC to match what is already on the house. Sunrooms, extra bedrooms, home offices, family rooms, primary suites, in-law suites, and full second stories all follow the same rule: the finished elevation should look like the house was drawn that way.",
            ],
            pullQuote:
                "A great addition does not look like an addition. It looks like your home was always meant to have it.",
            image: {
                /* Placeholder render. Swap for a real project photo. */
                src: "/images/hero/addition.webp",
                alt: "Seamless home addition matching existing rooflines and siding by Blue Rock Remodeling",
                caption: "Structural integration · Rooflines & siding",
            },
        },
        process: {
            kicker: "The Process",
            heading: "The Remodeling Process",
            lead: "An addition starts with drawings and permits, then moves through structure, roofing, mechanical rough-in, and finishes, all tied into the systems your home already runs on. Additions take longer than interior remodels because they involve new structure, permit review, and inspections at fixed checkpoints. Blue Rock keeps homeowners across Maryland and DC informed at every stage, from approved drawings to the final walkthrough, so the schedule holds no surprises.",
            phases: [
                { title: "Permits & Site Prep", note: "Drawings approved, utilities marked, site protected" },
                { title: "Foundation", note: "Footings and foundation poured and inspected" },
                { title: "Framing", note: "Walls, roof, and tie-in to the existing structure" },
                { title: "Roofing & Exterior", note: "Roofline matched, siding and windows installed" },
                { title: "Electrical & Plumbing", note: "New systems tied into your home's existing ones" },
                { title: "Insulation & Drywall", note: "Sealed, inspected, and closed up" },
                { title: "Interior Finishes", note: "Flooring, trim, paint, and fixtures" },
                { title: "Final Inspection & Walkthrough", note: "Permits closed out, space ready to live in" },
            ],
            close: "We coordinate every phase across Maryland and DC so the new space functions as one with the rest of your home, not as a separate structure.",
        },
        beforeAfter: {
            kicker: "Before & After",
            heading: "Additions, Before & After",
            lead: "Two Montgomery County additions, each documented before construction and again after the final walkthrough. Both added a full upper level over an existing garage without extending the foundation or taking a foot of yard or driveway.",
            projects: [
                {
                    title: "Second Story Over The Garage",
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
                {
                    title: "Mid-Century Second Story",
                    location: "Rockville, MD",
                    /* Unregistered pair: the record shot and the finished shot
                       were taken from different positions and in different
                       seasons, so these run side by side instead of behind a
                       wipe divider. See SheetPair for why. */
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
        },
        faq: [
            {
                question: "How long does a home addition take in Maryland or DC?",
                answer: "Home additions take longer than interior remodels because they involve new structure, permit review, and inspections that happen on the county's schedule rather than ours. The exact timeline depends on the size and scope of the addition. Blue Rock keeps homeowners informed at every stage, from approved drawings to the final walkthrough, so you always know which phase is running and what comes next.",
            },
            {
                question: "Can you build a second story over an existing garage?",
                answer: "Yes. Building over an attached garage is one of the most efficient ways to add finished square footage, because the addition uses the garage's existing footprint instead of extending the foundation into the yard. Blue Rock recently framed a full second story over a two-car garage, carried the main roofline across the whole elevation, and matched the siding, trim, and shutters to the original house.",
            },
            {
                question: "Will my addition match the rest of my house?",
                answer: "Yes. Every addition Blue Rock builds is designed to integrate with the existing home, matching rooflines, siding profiles, trim, and shutters so the finished elevation reads as original construction. Materials are sourced from suppliers across Maryland and DC to match your home's structure and style.",
            },
            {
                question: "Do I need a permit for a home addition in Montgomery County?",
                answer: "Yes. A home addition creates new structure, so it requires building permits and inspections, and Rockville sits within Montgomery County's permitting jurisdiction. Blue Rock handles the process from approved drawings through final inspection for homes across Maryland and Washington, DC.",
            },
            {
                question: "Is a home addition cheaper than moving?",
                answer: "For many homeowners it is. An addition avoids agent commissions, closing costs, moving expenses, and the price difference on a larger house in the same area. It also lets you keep the location, the schools, and the community you already chose, which is the part a bigger house somewhere else cannot replace.",
            },
            {
                question: "What types of home additions does Blue Rock build?",
                answer: "Sunrooms, extra bedrooms, home offices, family rooms, expanded kitchens, second stories, primary suites, and in-law suites. Projects range from a single new room to a full second story across Maryland and Washington, DC.",
            },
            {
                question: "Does a home addition add value to my home?",
                answer: "A well-built addition adds both finished living area and resale value. Because the new space is tied into the home's existing systems and matched to its structure and style, it functions as one with the rest of the house rather than as a separate structure a future buyer has to explain.",
            },
            {
                question: "Which areas does Blue Rock serve for home additions?",
                answer: "Blue Rock Remodeling & Construction builds home additions in Rockville, Potomac, Bethesda, Silver Spring, Gaithersburg, Chevy Chase, and homes throughout Maryland and Washington, DC.",
            },
        ],
    },
    "basement-finishing": {
        sheetName: "Basement",
        materials: {
            kicker: "Design & Use",
            heading: "Design & Use",
            paragraphs: [
                "Whether you want a family room, a home office, an entertainment space, or a guest suite, we design the layout around how you'll actually use it - not a generic template.",
                "Every basement in Maryland and DC comes with its own quirks, so we start by assessing the existing structure, water damage risk, and electrical before finalizing the plan.",
            ],
            pullQuote:
                "A finished basement should feel like part of your home - not like a basement.",
            image: {
                /* Placeholder render - swap for a real project photo. */
                src: "/images/hero/basement.webp",
                alt: "Finished basement living space with modern lighting and flooring by Blue Rock Remodeling",
                caption: "Layout planning · Structure & moisture assessment",
            },
        },
        process: {
            kicker: "The Process",
            heading: "The Remodeling Process",
            lead: "Once the plan is set, we move into framing, electrical, and plumbing, then drywall, flooring, and finishing touches like trim and fixtures. Most basement finishing projects take 4 to 8 weeks depending on scope. We keep you updated at each stage, so you know exactly where things stand - and you end up with real, functional living space added to your home in Maryland or DC.",
            phases: [
                { title: "Assessment & Permits", note: "Structure, water damage risk, and electrical checked; local permits handled" },
                { title: "Framing", note: "Walls and ceilings laid out around how you'll use the space" },
                { title: "Electrical & Plumbing", note: "Wiring, lighting, and rough-ins run to code" },
                { title: "Insulation & Moisture Control", note: "Sealed and protected before the walls close up" },
                { title: "Drywall & Paint", note: "Walls closed, finished, and painted" },
                { title: "Flooring", note: "Basement-appropriate flooring installed" },
                { title: "Trim & Fixtures", note: "Finishing touches before final walkthrough" },
            ],
            close: "All work is done to code, and we handle the local permitting so nothing holds up your project down the line.",
        },
        gallery: {
            kicker: "Recent Work",
            heading: "Recent Basement Projects",
            /* Every slide is a real project pulled from projects.ts, so photos
               and alt text stay in sync with the portfolio. No `tag` yet - the
               chip renders a location and these are still TBD. Slides 1, 3, and
               4 are three rooms of the same finished basement. */
            slides: [
                {
                    src: BASEMENT_1.cover.src,
                    alt: BASEMENT_1.cover.alt,
                    title: BASEMENT_1.title,
                },
                {
                    src: BASEMENT_2.cover.src,
                    alt: BASEMENT_2.cover.alt,
                    title: BASEMENT_2.title,
                },
                {
                    src: BASEMENT_3.cover.src,
                    alt: BASEMENT_3.cover.alt,
                    title: BASEMENT_3.title,
                },
                {
                    src: BASEMENT_4.cover.src,
                    alt: BASEMENT_4.cover.alt,
                    title: BASEMENT_4.title,
                },
            ],
        },
        faq: [
            {
                question: "How long does basement finishing take in Maryland or DC?",
                answer: "Most basement finishing projects take 4 to 8 weeks depending on scope. Blue Rock keeps homeowners updated at each stage, so you always know exactly where things stand.",
            },
            {
                question: "Do I need a permit to finish a basement?",
                answer: "Yes. Basement finishing involves framing, electrical, and plumbing work that requires local permits and inspections. Blue Rock handles the local permitting so nothing holds up the project down the line, and all work is done to code.",
            },
            {
                question: "What can I turn my basement into?",
                answer: "A family room, home office, entertainment space, home theater, gym, or guest suite - Blue Rock designs the layout around how you'll actually use the space, not a generic template.",
            },
            {
                question: "How do you handle basement moisture and water damage risk?",
                answer: "Every basement in Maryland and DC comes with its own quirks, so every project starts with an assessment of the existing structure, water damage risk, and electrical before the plan is finalized. Moisture control and insulation are handled before the walls close up, so the finished space stays comfortable and dry.",
            },
            {
                question: "Does finishing a basement add value to my home?",
                answer: "Yes. Finishing a basement turns unfinished square footage into real, functional living space - from family rooms and home offices to rental-ready guest suites - adding usable area and value to your home.",
            },
            {
                question: "Which areas does Blue Rock serve for basement finishing?",
                answer: "Blue Rock Remodeling & Construction finishes basements in Rockville, Silver Spring, Chevy Chase, and homes throughout Maryland and Washington, DC.",
            },
        ],
    },
    "deck-installation": {
        sheetName: "Deck",
        materials: {
            kicker: "Design & Materials",
            heading: "Design & Materials",
            paragraphs: [
                "Choose between a classic wooden platform deck or a low-maintenance composite deck, built with pressure-treated wood, composite decking, and galvanized fasteners for durability.",
                "Whether it's new construction or a repair to your existing deck, materials are matched to how you'll use the space and the Maryland/DC climate.",
            ],
            pullQuote:
                "The right deck is the one that fits how you'll use it - and stands up to Maryland and DC weather.",
            image: {
                /* Placeholder render - swap for a real project photo. */
                src: "/images/hero/deck.webp",
                alt: "Custom outdoor deck with railings and stairs built by Blue Rock Remodeling",
                caption: "Material selection · Wood & composite",
            },
            options: [
                {
                    label: "Option A",
                    title: "Classic Wood Deck",
                    points: [
                        "Traditional platform-deck look and feel",
                        "Pressure-treated lumber for rot resistance",
                        "Galvanized fasteners that hold up outdoors",
                        "Stain or seal in the finish you want",
                    ],
                },
                {
                    label: "Option B",
                    title: "Low-Maintenance Composite",
                    points: [
                        "Composite decking that skips yearly staining",
                        "Consistent color through every season",
                        "Pressure-treated framing underneath",
                        "Galvanized fasteners that hold up outdoors",
                    ],
                },
            ],
        },
        care: {
            kicker: "Care & Repair",
            heading: "Deck Care & When to Repair",
            lead: "Inspect your deck annually - warping, rotting, cracking, missing screws, or surface discoloration are signs it's time for repair before the damage gets worse and more costly.",
            signs: [
                { title: "Warping", note: "Boards lifting, cupping, or twisting out of line" },
                { title: "Rotting", note: "Soft or crumbling wood, especially at posts and joists" },
                { title: "Cracking", note: "Splits along boards or railings" },
                { title: "Missing Screws", note: "Loose boards and fasteners backing out" },
                { title: "Discoloration", note: "Graying or staining across the surface" },
            ],
            close: "Regular cleaning and sealing extends the life of any deck, and catching issues early keeps small repairs from turning into full rebuilds.",
        },
        gallery: {
            kicker: "Recent Work",
            heading: "Recent Deck Projects",
            /* Placeholder slides - swap src/alt per real project photo. */
            slides: [
                {
                    src: "/images/hero/deck.webp",
                    alt: "Composite deck with railings and integrated stairs",
                    tag: "Deck Installation",
                    title: "Composite Deck & Railings",
                },
                {
                    src: "/images/hero/deck.webp",
                    alt: "Classic wood platform deck with pressure-treated lumber",
                    tag: "Deck Installation",
                    title: "Wood Platform Deck",
                },
                {
                    src: "/images/hero/deck.webp",
                    alt: "Deck repair with board and fastener replacement",
                    tag: "Deck Repair",
                    title: "Deck Repair & Board Replacement",
                },
                {
                    src: "/images/hero/deck.webp",
                    alt: "Multi-level deck with stairs and code-compliant railings",
                    tag: "Deck Installation",
                    title: "Multi-Level Deck With Stairs",
                },
                {
                    src: "/images/hero/deck.webp",
                    alt: "Deck restoration with cleaning and resealing",
                    tag: "Deck Repair",
                    title: "Deck Restoration & Sealing",
                },
            ],
        },
        faq: [
            {
                question: "Should I choose wood or composite decking?",
                answer: "Both are built with pressure-treated framing and galvanized fasteners for durability. A classic wood deck gives a traditional look and can be stained or sealed in any finish; a composite deck is lower maintenance because it skips yearly staining. Blue Rock matches the material to how you'll use the space and to the Maryland/DC climate.",
            },
            {
                question: "How do I know when my deck needs repair?",
                answer: "Warping, rotting, cracking, missing screws, and surface discoloration are the main warning signs. Inspect your deck annually and repair early - catching issues early keeps small repairs from turning into full rebuilds.",
            },
            {
                question: "How do I make my deck last longer?",
                answer: "Regular cleaning and sealing extends the life of any deck. Pair that with an annual inspection for warping, rot, cracks, and loose fasteners, so small problems get fixed before they become worse and more costly.",
            },
            {
                question: "Do you repair existing decks or only build new ones?",
                answer: "Both. Blue Rock builds new wood and composite decks and repairs existing ones - from board and fastener replacement to structural fixes - across Maryland and Washington, DC.",
            },
            {
                question: "Are your decks built to code?",
                answer: "Yes. Every deck is engineered to code from footings to railings and stairs, and Blue Rock is a licensed, insured contractor serving Maryland and Washington, DC.",
            },
            {
                question: "Which areas does Blue Rock serve for deck installation and repair?",
                answer: "Blue Rock Remodeling & Construction installs and repairs decks in Rockville, Silver Spring, Chevy Chase, and homes throughout Maryland and Washington, DC.",
            },
        ],
    },
};
