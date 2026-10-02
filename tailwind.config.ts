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
        canvas: {
          DEFAULT: "#F7F7F5",
          muted: "#F0F0EE",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#FAFAF9",
          elevated: "#FFFFFF",
        },
        border: {
          subtle: "#E5E5E2",
          DEFAULT: "#DDDDDD",
          strong: "#C8C8C4",
        },
        text: {
          primary: "#171717",
          secondary: "#666666",
          muted: "#8A8A87",
        },
        accent: {
          DEFAULT: "#D9381E",
          hover: "#C22F17",
          subtle: "#FDF2F0",
          active: "#B02812",
        },
        stock: {
          in: "#15803D",
          low: "#B45309",
          out: "#B91C1C",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(0, 0, 0, 0.04)",
        card: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
        dropdown: "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
        modal: "0 20px 40px -10px rgba(0, 0, 0, 0.16)",
      },
      maxWidth: {
        site: "1400px",
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "6px",
        md: "6px",
        lg: "8px",
        xl: "10px",
        "2xl": "12px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
