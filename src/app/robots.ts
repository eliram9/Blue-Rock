import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Allow all crawlers, including AI retrieval bots (OAI-SearchBot, PerplexityBot,
// ClaudeBot, etc.) — blocking them would remove the site from AI answers.
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
