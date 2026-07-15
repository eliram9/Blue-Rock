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
            "Blue Rock Remodeling & Construction designs and builds custom kitchens across Maryland and Washington, DC - handling layout, cabinetry, countertops, lighting, plumbing, and finish work with one licensed, accountable team. As an MHIC-licensed general contractor serving the region since 2010, we take projects from the first sketch to the final walkthrough with transparent pricing at every step.",
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
            "From powder-room refreshes to full primary-suite renovations, Blue Rock builds bathrooms that balance everyday function with spa-level comfort - tile, custom vanities, glass enclosures, lighting, and plumbing handled by one licensed team across Maryland and Washington, DC.",
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
            "An unfinished basement is square footage waiting to work for you. Blue Rock turns basements across Maryland and Washington, DC into home theaters, offices, gyms, guest suites, and rental-ready living areas.",
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
            "Blue Rock serves government clients across Maryland and Washington, DC with licensed, insured general contracting for public facilities.",
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
                src: "/images/hero/bathroom.png",
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
            /* Placeholder slides - swap src/alt per real project photo. */
            slides: [
                {
                    src: "/images/hero/bathroom.png",
                    alt: "Primary suite bathroom renovation with custom tile and double vanity",
                    tag: "Bathroom Remodel",
                    title: "Primary Suite Renovation",
                },
                {
                    src: "/images/hero/bathroom.png",
                    alt: "Walk-in shower conversion with frameless glass enclosure",
                    tag: "Bathroom Remodel",
                    title: "Walk-In Shower Conversion",
                },
                {
                    src: "/images/hero/bathroom.png",
                    alt: "Spa-inspired bathroom with freestanding tub and stone tile",
                    tag: "Bathroom Remodel",
                    title: "Spa-Inspired Primary Bath",
                },
                {
                    src: "/images/hero/bathroom.png",
                    alt: "Powder room refresh with new vanity, lighting, and fixtures",
                    tag: "Bathroom Remodel",
                    title: "Powder Room Refresh",
                },
                {
                    src: "/images/hero/bathroom.png",
                    alt: "Tub-to-shower conversion with custom tile surround",
                    tag: "Bathroom Remodel",
                    title: "Tub-to-Shower Conversion",
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
                "Every home addition we build is designed to integrate seamlessly with your existing home - matching rooflines, siding, and finishes so it feels original, not tacked on.",
                "Whether it's a sunroom, an extra bedroom, a home office, or a family room, Blue Rock Remodeling sources materials across Maryland and DC to match your home's structure and style.",
            ],
            pullQuote:
                "A great addition doesn't look like an addition - it looks like your home was always meant to have it.",
            image: {
                /* Placeholder render - swap for a real project photo. */
                src: "/images/hero/addition.png",
                alt: "Seamless home addition matching existing rooflines and siding by Blue Rock Remodeling",
                caption: "Structural integration · Rooflines & siding",
            },
        },
        process: {
            kicker: "The Process",
            heading: "The Remodeling Process",
            lead: "An addition starts with foundation and framing, then moves through electrical, plumbing, insulation, and finishes - all tied into your home's existing systems. Home additions take longer than interior remodels since they involve new structure, permitting, and inspections. We keep homeowners across Maryland and DC informed at every stage, from permits to final walkthrough, so there are no surprises - just a new space that adds real living area and real value to your home.",
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
        gallery: {
            kicker: "Recent Work",
            heading: "Recent Addition Projects",
            /* Placeholder slides - swap src/alt per real project photo. */
            slides: [
                {
                    src: "/images/hero/addition.png",
                    alt: "Two-story rear home addition with matched roofline and siding",
                    tag: "Home Addition",
                    title: "Two-Story Rear Addition",
                },
                {
                    src: "/images/hero/addition.png",
                    alt: "Sunroom addition with full-height windows and matched exterior finishes",
                    tag: "Home Addition",
                    title: "Sunroom Addition",
                },
                {
                    src: "/images/hero/addition.png",
                    alt: "Primary suite addition with bedroom and en-suite bathroom",
                    tag: "Home Addition",
                    title: "Primary Suite Addition",
                },
                {
                    src: "/images/hero/addition.png",
                    alt: "Family room extension tied into the home's existing structure",
                    tag: "Home Addition",
                    title: "Family Room Extension",
                },
                {
                    src: "/images/hero/addition.png",
                    alt: "In-law suite addition with separate living space",
                    tag: "Home Addition",
                    title: "In-Law Suite Addition",
                },
            ],
        },
        faq: [
            {
                question: "How long does a home addition take in Maryland or DC?",
                answer: "Home additions take longer than interior remodels because they involve new structure, permitting, and inspections. The exact timeline depends on the size and scope of the addition. Blue Rock keeps homeowners informed at every stage, from permits to final walkthrough, so there are no surprises.",
            },
            {
                question: "Will my addition match the rest of my house?",
                answer: "Yes. Every addition Blue Rock builds is designed to integrate seamlessly with the existing home - matching rooflines, siding, and finishes so it feels original, not tacked on. Materials are sourced from suppliers across Maryland and DC to match your home's structure and style.",
            },
            {
                question: "Do I need a permit for a home addition?",
                answer: "Yes. Home additions add new structure, so they require building permits and inspections. Blue Rock handles the permitting process from approved drawings through final inspection for homes across Maryland and Washington, DC.",
            },
            {
                question: "What types of home additions does Blue Rock build?",
                answer: "Sunrooms, extra bedrooms, home offices, family rooms, expanded kitchens, second stories, primary suites, and in-law suites - from single-room additions to full second-story projects across Maryland and Washington, DC.",
            },
            {
                question: "Does a home addition add value to my home?",
                answer: "A well-built addition adds real living area and real value. Because the new space is tied into the home's existing systems and matched to its structure and style, it functions as one with the rest of your home - not as a separate structure.",
            },
            {
                question: "Which areas does Blue Rock serve for home additions?",
                answer: "Blue Rock Remodeling & Construction builds home additions in Rockville, Silver Spring, Chevy Chase, and homes throughout Maryland and Washington, DC.",
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
                src: "/images/hero/basement.png",
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
            /* Placeholder slides - swap src/alt per real project photo. */
            slides: [
                {
                    src: "/images/hero/basement.png",
                    alt: "Basement home theater conversion with recessed lighting",
                    tag: "Basement Finishing",
                    title: "Home Theater Conversion",
                },
                {
                    src: "/images/hero/basement.png",
                    alt: "Basement guest suite build-out with bedroom and full bath",
                    tag: "Basement Finishing",
                    title: "Guest Suite Build-Out",
                },
                {
                    src: "/images/hero/basement.png",
                    alt: "Basement home office conversion with built-in lighting",
                    tag: "Basement Finishing",
                    title: "Home Office Conversion",
                },
                {
                    src: "/images/hero/basement.png",
                    alt: "Basement home gym with durable flooring and utility space",
                    tag: "Basement Finishing",
                    title: "Home Gym & Utility Space",
                },
                {
                    src: "/images/hero/basement.png",
                    alt: "Rental-ready basement in-law suite with separate living area",
                    tag: "Basement Finishing",
                    title: "Rental-Ready In-Law Suite",
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
                src: "/images/hero/deck.png",
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
                    src: "/images/hero/deck.png",
                    alt: "Composite deck with railings and integrated stairs",
                    tag: "Deck Installation",
                    title: "Composite Deck & Railings",
                },
                {
                    src: "/images/hero/deck.png",
                    alt: "Classic wood platform deck with pressure-treated lumber",
                    tag: "Deck Installation",
                    title: "Wood Platform Deck",
                },
                {
                    src: "/images/hero/deck.png",
                    alt: "Deck repair with board and fastener replacement",
                    tag: "Deck Repair",
                    title: "Deck Repair & Board Replacement",
                },
                {
                    src: "/images/hero/deck.png",
                    alt: "Multi-level deck with stairs and code-compliant railings",
                    tag: "Deck Installation",
                    title: "Multi-Level Deck With Stairs",
                },
                {
                    src: "/images/hero/deck.png",
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
