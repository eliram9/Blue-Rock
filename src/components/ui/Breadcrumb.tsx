import Link from "next/link";
import Container from "@/components/ui/Container";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps): React.ReactElement {
    return (
        <nav
            aria-label="Breadcrumb"
            className="hidden md:block py-4 bg-gray-50 dark:bg-gray-800/30 border-b border-gray-200 dark:border-gray-700 transition-colors"
        >
            <Container>
                <ol className="flex items-center space-x-2 text-sm">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;

                        return (
                            <li key={index} className="flex items-center">
                                {index > 0 && (
                                    <svg
                                        className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                )}

                                {isLast || !item.href ? (
                                    <span
                                        className="font-medium text-gray-900 dark:text-white"
                                        aria-current="page"
                                    >
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="text-gray-600 dark:text-gray-400 hover:text-main-blue dark:hover:text-light-blue transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </Container>
        </nav>
    );
}
