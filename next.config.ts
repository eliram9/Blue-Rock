import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Commented out to use npm start for testing
  images: {
    unoptimized: true,
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
