import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SERVICES } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
        { path: "/", priority: 1.0, changeFrequency: "monthly" },
        { path: "/about", priority: 0.8, changeFrequency: "yearly" },
        { path: "/services/residential", priority: 0.8, changeFrequency: "monthly" },
        // One entry per service subcategory page, always in sync with the data
        ...SERVICES.map((service) => ({
            path: service.href,
            priority: 0.7,
            changeFrequency: "monthly" as const,
        })),
        { path: "/services/commercial", priority: 0.8, changeFrequency: "monthly" },
        { path: "/services/government", priority: 0.8, changeFrequency: "monthly" },
        { path: "/residential", priority: 0.7, changeFrequency: "monthly" },
        { path: "/projects", priority: 0.7, changeFrequency: "monthly" },
        { path: "/resources", priority: 0.5, changeFrequency: "monthly" },
        { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    ];

    return routes.map(({ path, priority, changeFrequency }) => ({
        url: `${SITE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
    }));
}
