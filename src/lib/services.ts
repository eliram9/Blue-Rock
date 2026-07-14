/**
 * Single source of truth for Blue Rock's service offerings - rendered by the
 * home-page WhatWeDo section and emitted as OfferCatalog JSON-LD. Flagship
 * services (core expertise) show first; the rest live behind "more services".
 * `href` values point at section anchors today; swap to dedicated subcategory
 * pages here when those routes exist.
 */

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
}

export const SERVICES: Service[] = [
    {
        slug: "kitchen-remodeling",
        title: "Kitchen Remodeling",
        blurb: "Custom kitchens designed and built around how you cook and live - cabinetry, counters, lighting, and layout.",
        flagship: true,
        href: "/services/residential/kitchen-remodeling",
        intro: [
            "Blue Rock Remodeling & Construction designs and builds custom kitchens across Maryland, Washington, DC, and Virginia - handling layout, cabinetry, countertops, lighting, plumbing, and finish work with one licensed, accountable team. As an MHIC-licensed general contractor serving the region since 2010, we take projects from the first sketch to the final walkthrough with transparent pricing at every step.",
            "Whether you want a full gut renovation, an island and layout reconfiguration, or updated cabinetry and counters, we build around how your family actually cooks and lives.",
        ],
        image: "/images/hero/kitchen-remodeling.png",
    },
    {
        slug: "bathroom-remodeling",
        title: "Bathroom Remodeling",
        blurb: "Spa-inspired bathrooms with modern fixtures, custom cabinetry, and finishes tailored to your style.",
        flagship: true,
        href: "/services/residential/bathroom-remodeling",
        intro: [
            "From powder-room refreshes to full primary-suite renovations, Blue Rock builds bathrooms that balance everyday function with spa-level comfort - tile, custom vanities, glass enclosures, lighting, and plumbing handled by one licensed team across Maryland, Washington, DC, and Virginia.",
            "We manage waterproofing, ventilation, and code compliance behind the walls as carefully as the finishes you see, so the result looks beautiful and stays that way.",
        ],
        image: "/images/hero/bathroom.png",
    },
    {
        slug: "home-additions",
        title: "Home Additions",
        blurb: "Expand your living space with seamless new rooms or additional levels, from design through final walkthrough.",
        flagship: true,
        href: "/services/residential/home-additions",
        intro: [
            "Blue Rock designs and builds home additions across the DMV - extra bedrooms, expanded kitchens, second stories, and in-law suites that blend seamlessly with your home's existing structure and style.",
            "From permits and foundation to framing, roofing, and finish work, one accountable team carries the project from drawings to a finished space that feels like it was always there.",
        ],
        image: "/images/hero/addition.png",
    },
    {
        slug: "basement-finishing",
        title: "Basement Finishing",
        blurb: "Turn an unfinished basement into a functional living area - home theater, office, gym, or in-law suite.",
        flagship: true,
        href: "/services/residential/basement-finishing",
        intro: [
            "An unfinished basement is square footage waiting to work for you. Blue Rock turns basements across Maryland, Washington, DC, and Virginia into home theaters, offices, gyms, guest suites, and rental-ready living areas.",
            "We handle moisture control, egress, insulation, electrical, and finishes as one licensed team - so the new level of your home is comfortable, code-compliant, and built to last.",
        ],
        image: "/images/hero/basement.png",
    },
    {
        slug: "exterior-renovations",
        title: "Exterior Renovations",
        blurb: "Boost curb appeal with siding, trim, and professional exterior painting and upgrades.",
        flagship: false,
        href: "/services/residential/exterior-renovations",
        intro: [
            "Curb appeal is more than paint. Blue Rock renovates exteriors across the DMV - siding, trim, windows, doors, and professional exterior painting that protect your home and lift its value.",
            "We combine durable materials with meticulous installation, so the first impression your home makes lasts through every season.",
        ],
        image: "/images/hero/exterior.png",
    },
    {
        slug: "demolition-services",
        title: "Demolition Services",
        blurb: "Safe, comprehensive demolition for residential and commercial projects, prepped for what's next.",
        flagship: false,
        href: "/services/residential/demolition-services",
        intro: [
            "Safe, clean demolition is the first step of a successful build. Blue Rock provides selective interior demolition and full structure removal for residential and commercial projects across Maryland, Washington, DC, and Virginia.",
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
        image: "/images/hero/deck.png",
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
        image: "/images/hero/interior.png",
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
        image: "/images/hero/commercial.png",
    },
    {
        slug: "government-services",
        title: "Government",
        blurb: "Licensed contracting for government facilities and public-sector projects across the DMV.",
        flagship: false,
        href: "/services/government",
        intro: [
            "Blue Rock serves government clients across Maryland, Washington, DC, and Virginia with licensed, insured general contracting for public facilities.",
            "We meet public-sector compliance, documentation, and scheduling requirements from bid to closeout.",
        ],
        image: "/images/hero/government.png",
    },
];

/* ── Rich subcategory-page content ─────────────────────────────────────────
   Services with an entry in SERVICE_DETAILS get the full designed page
   (materials split, process log, timeline band, gallery, FAQ) rendered by
   ServiceDetailSections; the rest keep the intro-only layout. FAQ items are
   also emitted as FAQPage JSON-LD, so answers must stay self-contained and
   match the visible text. */

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
    };
    /** 02 - ordered phase log. */
    process: {
        kicker: string;
        heading: string;
        lead: string;
        phases: { title: string; note: string }[];
        close: string;
    };
    /** 03 - ink band with stat readouts. */
    timeline: {
        kicker: string;
        heading: string;
        paragraphs: string[];
        stats: { value: string; label: string; note: string }[];
    };
    /** 04 - project carousel. */
    gallery: {
        kicker: string;
        heading: string;
        slides: { src: string; alt: string; tag?: string; title?: string }[];
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
            /* Placeholder slides - same /kitchen.jpg the home-page carousel
               uses. Swap src/alt per real project photo. */
            slides: [
                {
                    src: "/kitchen.jpg",
                    alt: "Full kitchen renovation with white cabinetry and stone countertops",
                    tag: "Kitchen Remodel",
                    title: "Full Gut Renovation",
                },
                {
                    src: "/kitchen.jpg",
                    alt: "Kitchen remodel with two-tone cabinets and quartz countertops",
                    tag: "Kitchen Remodel",
                    title: "Two-Tone Cabinetry & Quartz",
                },
                {
                    src: "/kitchen.jpg",
                    alt: "Open-layout kitchen reconfiguration with island seating",
                    tag: "Kitchen Remodel",
                    title: "Open-Layout Reconfiguration",
                },
                {
                    src: "/kitchen.jpg",
                    alt: "Classic white shaker kitchen with tile backsplash",
                    tag: "Kitchen Remodel",
                    title: "Classic Shaker Kitchen",
                },
                {
                    src: "/kitchen.jpg",
                    alt: "Kitchen island and lighting upgrade with new hardware and fixtures",
                    tag: "Kitchen Remodel",
                    title: "Island & Lighting Upgrade",
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
};
