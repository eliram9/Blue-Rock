import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "main-blue": "#0E48CC",
        "light-blue": "#5A87DD",
        "gray": "#7C7C7C",
        "dark": "#1A1A1A",
        "light-bg": "#F8F9FA",
        "success": "#10B981",
        "error": "#EF4444",
        "warning": "#F59E0B",
      },
    },
  },
  plugins: [],
};

export default config;
