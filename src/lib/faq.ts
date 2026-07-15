/**
 * Single source of truth for the /faq page: the 15 strongest Q&A pairs,
 * curated from the service-detail FAQs, the About-page schema, and the
 * legacy site's FAQ section. Rendered by FaqShowcase and emitted as
 * FAQPage JSON-LD, so answers must stay self-contained, answer-first,
 * and identical in meaning to the visible text.
 */

export interface FaqItem {
    question: string;
    answer: string;
}

export interface FaqCategory {
    /** Anchor id for the category rail. */
    id: string;
    label: string;
    items: FaqItem[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
    {
        id: "general",
        label: "General & Company",
        items: [
            {
                question: "What areas does Blue Rock Remodeling serve?",
                answer: "Blue Rock Remodeling & Construction serves Maryland and Washington, DC - including Rockville, Potomac, Bethesda, Silver Spring, Chevy Chase, and Gaithersburg. The company is headquartered in Rockville, MD.",
            },
            {
                question: "Is Blue Rock Remodeling licensed and insured?",
                answer: "Yes. Blue Rock holds a Maryland Home Improvement Commission (MHIC) license, a General Contractor license, and a New Home Builder license, and is fully insured.",
            },
            {
                question: "What types of projects does Blue Rock take on?",
                answer: "Residential, commercial, and government projects - one licensed contractor covering all three sectors. Residential work spans kitchens, bathrooms, home additions, basements, exteriors, and decks; commercial work covers office build-outs, retail renovations, restaurant interiors, and commercial kitchen upgrades.",
            },
            {
                question: "How long has Blue Rock Remodeling been in business?",
                answer: "Blue Rock Remodeling & Construction was founded in 2010 and has served Maryland and Washington, DC for more than 15 years, earning a Better Business Bureau A+ rating.",
            },
            {
                question: "How do I get an estimate for my project?",
                answer: "Fill out the contact form on the Blue Rock Remodeling website or call (240) 750-4889. The team responds within 24 hours, and pricing is transparent - clear, detailed estimates with no hidden costs.",
            },
            {
                question: "What questions should I ask before hiring a general contractor?",
                answer: "Ask how much experience the company has, whether it has completed similar projects, and whether it is licensed, bonded, and insured. Also ask for a clear pricing structure. Blue Rock Remodeling answers all of these openly: licensed and insured since 2010, with transparent pricing and no hidden charges.",
            },
        ],
    },
    {
        id: "kitchens-bathrooms",
        label: "Kitchens & Bathrooms",
        items: [
            {
                question: "How long does a kitchen remodel take in Maryland or DC?",
                answer: "Most kitchen remodels take about eight weeks from start to finish, depending on the scope of the project. That window covers proper demolition, any surprises behind the walls - common in older homes throughout Maryland and DC - and unhurried finishing phases so quality is never rushed.",
            },
            {
                question: "Do I have to choose from one cabinet, countertop, or tile brand?",
                answer: "No. Blue Rock Remodeling works with multiple suppliers across the Maryland-DC region for cabinets, countertops, tile, vanities, and fixtures, so materials are chosen to match your design and style - not what is easiest to install.",
            },
            {
                question: "Why is waterproofing so important in a bathroom remodel?",
                answer: "Waterproofing determines whether a bathroom lasts. Membranes and the shower pan are installed and sealed before any tile goes down, so the finished space is built to last - not just to look good on day one.",
            },
        ],
    },
    {
        id: "additions-basements",
        label: "Additions & Basements",
        items: [
            {
                question: "Do I need a permit for a home addition?",
                answer: "Yes. Home additions add new structure, so they require building permits and inspections. Blue Rock handles the permitting process from approved drawings through final inspection for homes across Maryland and Washington, DC.",
            },
            {
                question: "Will my addition match the rest of my house?",
                answer: "Yes. Every addition Blue Rock builds is designed to integrate seamlessly with the existing home - matching rooflines, siding, and finishes so it feels original, not tacked on. Materials are sourced from suppliers across Maryland and DC to match your home's structure and style.",
            },
            {
                question: "How long does basement finishing take?",
                answer: "Most basement finishing projects take 4 to 8 weeks depending on scope. Blue Rock keeps homeowners updated at each stage, so you always know exactly where things stand.",
            },
            {
                question: "What can I turn my basement into?",
                answer: "A family room, home office, entertainment space, home theater, gym, or guest suite - Blue Rock designs the layout around how you'll actually use the space, not a generic template.",
            },
        ],
    },
    {
        id: "decks-outdoor",
        label: "Decks & Outdoor",
        items: [
            {
                question: "Should I choose wood or composite decking?",
                answer: "Both are built with pressure-treated framing and galvanized fasteners for durability. A classic wood deck gives a traditional look and can be stained or sealed in any finish; a composite deck is lower maintenance because it skips yearly staining. Blue Rock matches the material to how you'll use the space and to the Maryland/DC climate.",
            },
            {
                question: "How do I know when my deck needs repair?",
                answer: "Warping, rotting, cracking, missing screws, and surface discoloration are the main warning signs. Inspect your deck annually and repair early - catching issues early keeps small repairs from turning into full rebuilds.",
            },
        ],
    },
];

export const FAQ_COUNT = FAQ_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
