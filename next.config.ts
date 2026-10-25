import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Rewrites `import { IconSun } from "@tabler/icons-react"` to per-icon
     module paths. Without it the barrel pulls ~5k icon modules into every
     dev compile that touches the header. */
  experimental: {
    optimizePackageImports: ["@tabler/icons-react"],
  },
  /* NOTE: `output: 'export'` was disabled here so the site runs on a Node
     server (`next start`) — which is what makes the image optimizer below
     work. The two are coupled: static export has no image server, so
     re-enabling export means re-adding `images.unoptimized: true` and
     losing every resize/format benefit. Don't flip one without the other. */
  images: {
    /* Was `unoptimized: true` (a leftover from the export experiment). It
       silently turned every <Image> into a plain <img> serving the original
       file at full resolution — the source renders are 1536x1024, so a
       261px-wide card was downloading the whole thing. */
    formats: ["image/avif", "image/webp"],
    /* Next 16 only honours qualities listed here (default: [75]) and rejects
       the rest. These are the values actually passed by components today —
       Hero/MiniHero/ServiceDetailSections 85, MiniHero tinted 95, Carousel
       90 and 60, GovernmentCapabilities 80, Footer 75. Add a value here
       before using a new one in a `quality={...}` prop. */
    qualities: [60, 75, 80, 85, 90, 95],
    /* YouTube posters for the VideoEmbed facade (src/data/videos.json). */
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  /* Turns off Next's built-in trailing-slash strip, which ran *before*
     redirects() and turned every legacy WordPress URL (they all end in "/")
     into a 2-hop chain: /about-us/ -> /about-us -> /about. src/proxy.ts now
     does the strip instead, and it runs after redirects(), so legacy URLs
     resolve in one hop. Don't remove one without the other. */
  skipTrailingSlashRedirect: true,
  async redirects() {
    // Each source is registered with and without the trailing slash so both
    // forms land in a single 308.
    return Object.entries(LEGACY_REDIRECTS).flatMap(([source, destination]) =>
      [source, `${source}/`].map((s) => ({ source: s, destination, permanent: true })),
    );
  },
};

/* WordPress -> Next.js migration map (old site inventory taken 2026-10-22
   from page-sitemap.xml, the WP REST API and a link crawl; the old site had
   no blog posts). Paths that are unchanged apart from the trailing slash
   (/, /projects, /resources) are left to the proxy. Intentionally absent:
   /elementskit-content/dynamic-content-widget-b397b85-99/ - an Elementor
   template fragment, not a page, so it 404s. */
const LEGACY_REDIRECTS: Record<string, string> = {
  // Stale duplicate route removed (2026-07-15); /services/residential is
  // the canonical residential page. Also the old WordPress URL.
  "/residential": "/services/residential",
  "/home": "/",
  "/about-us": "/about",
  "/contact-us": "/contact",
  "/commercial": "/services/commercial",
  "/government-contracts": "/services/government",
  "/general-contracting-in-rockville-md": "/services/commercial",
  "/residential-kitchen-remodelers-in-rockville-md": "/services/residential/kitchen-remodeling",
  "/residential-bathroom-remodeling-services-in-rockville-md": "/services/residential/bathroom-remodeling",
  "/home-addition-services-in-rockville-md": "/services/residential/home-additions",
  "/residential-basement-finishing-in-rockville-md": "/services/residential/basement-finishing",
  "/exterior-renovation-services-in-rockville-md": "/services/residential/exterior-renovations",
  "/residential-commercial-demolition-services-in-rockville-md": "/services/residential/demolition-services",
  "/residential-deck-installation-repair-in-rockville-md": "/services/residential/deck-installation",
  // No dedicated page; the FAQ answers "What areas does Blue Rock serve?"
  "/areas-we-serve": "/faq",
  // Old /blogs/ was an empty listing; /resources is the content hub.
  "/blogs": "/resources",
  // Old sitemap URLs still registered in Search Console.
  "/sitemap_index.xml": "/sitemap.xml",
  "/page-sitemap.xml": "/sitemap.xml",
  "/sitemaps/sitemap.xml": "/sitemap.xml",
  "/wp-sitemap.xml": "/sitemap.xml",
};

export default nextConfig;
