"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
}

export default function NavLink({ href, children, className = "", ...props }: NavLinkProps): React.ReactElement {
    const pathname = usePathname();
    const isActive = pathname === href;

    /* `py-0.5` keeps the underline off the text baseline and matches the
       Services trigger next to it, so the row reads as one rule. */
    const base =
        "inline-block py-0.5 font-medium border-b-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main-blue";
    const linkClassName = isActive
        ? `${base} text-main-blue dark:text-light-blue border-main-blue dark:border-light-blue`
        : `${base} text-gray-700 dark:text-gray-300 border-transparent hover:text-main-blue dark:hover:text-light-blue hover:border-main-blue dark:hover:border-light-blue`;

    return (
        <Link
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`${linkClassName} ${className}`}
            {...props}
        >
            {children}
        </Link>
    );
}
