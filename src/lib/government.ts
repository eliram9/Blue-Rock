/**
 * Single source of truth for the government-contracting page: registration
 * identifiers, capabilities, past performance, and NAICS classifications.
 * Rendered by GovernmentCapabilities and emitted into the page's JSON-LD so
 * visible content and structured data never drift.
 */

export const GOV_CREDENTIALS = [
    {
        label: "SAM Registration",
        value: "Active",
        note: "Registered government contractor with active procurement eligibility",
    },
    {
        label: "CAGE Code",
        value: "9U3H6",
        note: "Commercial and Government Entity code",
    },
    {
        label: "UEI",
        value: "VSCDRQLFUAW3",
        note: "Unique Entity Identifier",
    },
    {
        label: "Bonding Capacity",
        value: "Available upon request",
        note: "For qualified federal, municipal, and institutional projects",
    },
    {
        label: "Insurance",
        value: "Fully insured",
        note: "Safety, compliance, and quality-control focused execution",
    },
    {
        label: "Licensing",
        value: "Licensed General Contractor",
        note: "Renovation, construction, demolition, and institutional projects",
    },
] as const;

export const GOV_CAPABILITIES = [
    "Commercial & Institutional Construction",
    "Government Facility Renovations",
    "Interior Build-Outs & Modernizations",
    "Demolition & Selective Demolition",
    "Security & Perimeter Fencing",
    "Site Preparation & Excavation",
    "Concrete & Masonry Construction",
    "Emergency Repairs & Maintenance",
] as const;

export const GOV_WHY_AGENCIES = [
    "Single-source contractor from design through construction",
    "Experience working in occupied facilities",
    "Dedicated project management team",
    "Safety-focused project execution",
    "Rapid mobilization capability",
    "Strong network of specialty subcontractors",
    "Experience coordinating with government inspectors and regulatory agencies",
] as const;

/* Order matters: GovernmentCapabilities places entries 1 and 4 in the large
   feature tiles, so those need the highest-resolution photos. */
export const GOV_PAST_PERFORMANCE = [
    {
        title: "Embassy Renovation & Modernization Projects",
        image: "/images/government/embassy-campus.webp",
        alt: "U.S. embassy building with a flag and landscaped walkways",
    },
    {
        title: "High-Security Facility Construction",
        image: "/images/government/defense-contractor-hq.webp",
        alt: "Modern secure headquarters building with a newly paved entry drive",
    },
    {
        title: "Municipal Renovation Projects",
        image: "/images/government/office-building-scaffolding.webp",
        alt: "Multi-story building under renovation, wrapped in scaffolding",
    },
    {
        title: "Security Fencing & Site Improvement Projects",
        image: "/images/government/security-fencing.webp",
        alt: "Temporary security fencing around an active site preparation area",
    },
    {
        title: "Commercial Tenant Improvements & Interior Build-Outs",
        image: "/images/government/tenant-build-out.webp",
        alt: "Commercial interior build-out with steel stud framing in progress",
    },
    {
        title: "Multi-Family Residential Rehabilitation Projects",
        image: "/images/government/multifamily-rehab.webp",
        alt: "Rendering of a rehabilitated multi-family townhome building",
    },
] as const;

export const GOV_NAICS = [
    { code: "236220", description: "Commercial and Institutional Building Construction", category: "Commercial & Institutional Building" },
    { code: "236118", description: "Residential Remodelers", category: "Government Facilities" },
    { code: "236115", description: "New Single-Family Housing Construction", category: "Government Facilities" },
    { code: "238910", description: "Site Preparation Contractors", category: "Demolition Services" },
    { code: "562910", description: "Remediation Services", category: "Demolition Services" },
    { code: "238190", description: "Other Foundation, Structure, and Building Exterior Contractors", category: "Fencing & Security" },
    { code: "238990", description: "All Other Specialty Trade Contractors", category: "Security Infrastructure" },
] as const;
