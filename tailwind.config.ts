import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ============================================
         COLOR PALETTE (Official Brand Colors)
         Primary: Brand Navy #3A3A52 (desaturated blue-grey)
         Accent:  Terracotta #9C5D4E (warm earth tone)
         Background: Off-white #F9F9F9 / pure #FFFFFF
         ============================================ */
      colors: {
        "brand-navy": {
          50: "#EDEDF0",
          100: "#D5D5DC",
          200: "#ABABBA",
          300: "#828297",
          400: "#5E5E74",
          500: "#3A3A52",
          600: "#31314A",
          700: "#27273C",
          800: "#1D1D2E",
          900: "#141420",
          950: "#0B0B14",
        },
        terracotta: {
          50: "#FBF5F3",
          100: "#F5E6E2",
          200: "#ECCCC4",
          300: "#DFADA1",
          400: "#CD8575",
          500: "#9C5D4E",
          600: "#864E41",
          700: "#6D3F34",
          800: "#553128",
          900: "#3D241D",
          950: "#251613",
        },
        cream: {
          50: "#FFFFFF",
          100: "#FEFEFE",
          200: "#FAFAF8",
          300: "#F9F9F9",
          400: "#F0F0EE",
          500: "#E5E5E3",
          600: "#D4D4D2",
          700: "#B8B8B6",
          800: "#8A8A88",
          900: "#5C5C5A",
          950: "#2E2E2D",
        },
      },

      /* ============================================
         TYPOGRAPHY
         Serif: Frank Ruhl Libre (Hebrew-native, headings)
         Sans:  Heebo (Hebrew-native, body text)
         ============================================ */
      fontFamily: {
        heading: [
          "var(--font-heading)",
          "Georgia",
          '"Times New Roman"',
          "serif",
        ],
        body: ["var(--font-body)", '"Segoe UI"', "Tahoma", "Arial", "sans-serif"],
      },

      fontSize: {
        "display-lg": [
          "4.5rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        display: [
          "3.75rem",
          { lineHeight: "1.15", letterSpacing: "-0.02em" },
        ],
        "display-sm": [
          "3rem",
          { lineHeight: "1.2", letterSpacing: "-0.01em" },
        ],
        "heading-lg": [
          "2.25rem",
          { lineHeight: "1.25", letterSpacing: "-0.01em" },
        ],
        heading: ["1.875rem", { lineHeight: "1.3" }],
        "heading-sm": ["1.5rem", { lineHeight: "1.35" }],
        "body-lg": ["1.125rem", { lineHeight: "1.8" }],
        body: ["1rem", { lineHeight: "1.8" }],
        "body-sm": ["0.875rem", { lineHeight: "1.7" }],
      },

      /* ============================================
         SPACING — Extended for extreme whitespace
         ============================================ */
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
        "42": "10.5rem",
        "50": "12.5rem",
        "58": "14.5rem",
        "66": "16.5rem",
      },

      maxWidth: {
        reading: "65ch",
        narrow: "42rem",
        content: "72rem",
        wide: "84rem",
      },

      /* ============================================
         TRANSITIONS — Slow, luxurious timing
         ============================================ */
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1000": "1000ms",
        "1200": "1200ms",
        "1500": "1500ms",
        "2000": "2000ms",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "luxury-in": "cubic-bezier(0.4, 0, 0.2, 1)",
        "luxury-out": "cubic-bezier(0, 0, 0.25, 1)",
        reveal: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "line-expand": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-in":
          "fade-in 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "fade-in-right":
          "fade-in-right 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "fade-in-left":
          "fade-in-left 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "scale-in":
          "scale-in 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "line-expand":
          "line-expand 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },

      /* ============================================
         SHADOWS — Subtle, brand-navy-based for harmony
         ============================================ */
      boxShadow: {
        soft: "0 2px 15px -3px rgba(58, 58, 82, 0.04), 0 4px 6px -4px rgba(58, 58, 82, 0.02)",
        "soft-md":
          "0 4px 25px -5px rgba(58, 58, 82, 0.06), 0 8px 10px -6px rgba(58, 58, 82, 0.03)",
        "soft-lg":
          "0 10px 40px -10px rgba(58, 58, 82, 0.08), 0 16px 20px -12px rgba(58, 58, 82, 0.04)",
        "soft-xl":
          "0 20px 60px -15px rgba(58, 58, 82, 0.1), 0 24px 30px -18px rgba(58, 58, 82, 0.05)",
        "terracotta-glow": "0 4px 20px -4px rgba(156, 93, 78, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
