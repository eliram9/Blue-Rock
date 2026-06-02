import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Commented out to use npm start for testing
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
