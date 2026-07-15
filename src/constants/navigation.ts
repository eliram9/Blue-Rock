/** A direct link in the nav. */
interface NavigationLeaf {
    href: string;
    label: string;
    dropdown?: never;
}

/** A label-only group whose children are the links (e.g. Services). */
interface NavigationGroup {
    label: string;
    dropdown: { label: string; href: string }[];
    href?: never;
}

/** Discriminated union: checking `link.dropdown` narrows to one arm, so
    leaves always have a string `href` — no assertions needed downstream. */
export type NavigationLink = NavigationLeaf | NavigationGroup;

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
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
];
