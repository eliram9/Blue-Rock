export interface NavigationLink {
    href?: string;
    label: string;
    dropdown?: {
        label: string;
        href: string;
    }[];
}

export const NAVIGATION_LINKS: NavigationLink[] = [
    { href: "/about", label: "About" },
    {
        label: "Services",
        dropdown: [
            { label: "Residential", href: "/services/residential" },
            { label: "Commercial", href: "/services/commercial" },
            { label: "Government", href: "/services/government" },
        ],
    },
    { href: "/projects", label: "Projects" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
];
