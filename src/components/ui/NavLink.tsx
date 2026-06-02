"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
}

export default function NavLink({ href, children, className = "", ...props }: NavLinkProps): React.ReactElement {
    const pathname = usePathname();
    const isActive = pathname === href;

    const linkClassName = isActive
        ? "text-main-blue dark:text-light-blue font-medium transition-colors border-b-2 border-main-blue dark:border-light-blue"
        : "text-gray-700 dark:text-gray-300 font-medium hover:text-main-blue dark:hover:text-light-blue transition-colors border-b-2 border-transparent hover:border-main-blue dark:hover:border-light-blue";

    return (
        <a href={href} className={`${linkClassName} ${className}`} {...props}>
            {children}
        </a>
    );
}
