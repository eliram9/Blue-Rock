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
  },
  async redirects() {
    return [
      // Stale duplicate route removed (2026-07-15); /services/residential is
      // the canonical residential page.
      {
        source: "/residential",
        destination: "/services/residential",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
