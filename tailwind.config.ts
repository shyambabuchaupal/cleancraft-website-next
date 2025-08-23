/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0.75rem",
        sm: "1rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      padding: {
        "section-y-mobile": "32px",
        "section-y-desktop": "64px",
        "section-x-mobile": "16px",
        "section-x-desktop": "20px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1A73E8",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F5B014",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        brand: {
          blue: "#1A73E8",
          "blue-dark": "#1557B0",
          "blue-light": "#E8F0FE",
        },
        cleancraft: {
          gold: "#FFD700",
          darkgold: "#B8860B",
          light: "#FFF9E6",
        },
        google: {
          blue: "#4285f4",
          red: "#ea4335",
          green: "#34a853",
          yellow: "#fbbc04",
          gray: "#5f6368",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": [
          "3.5rem",
          {
            lineHeight: "1.2",
            letterSpacing: "0.02em",
            fontWeight: "700",
            textTransform: "uppercase",
          },
        ],
        "display-md": [
          "3rem",
          {
            lineHeight: "1.2",
            letterSpacing: "0.02em",
            fontWeight: "700",
            textTransform: "uppercase",
          },
        ],
        "display-sm": [
          "2.5rem",
          {
            lineHeight: "1.25",
            letterSpacing: "0.02em",
            fontWeight: "700",
            textTransform: "uppercase",
          },
        ],
        "heading-lg": [
          "2.75rem",
          {
            lineHeight: "1.3",
            letterSpacing: "0.025em",
            fontWeight: "600",
            textTransform: "uppercase",
          },
        ],
        "heading-md": [
          "2.5rem",
          {
            lineHeight: "1.3",
            letterSpacing: "0.025em",
            fontWeight: "600",
            textTransform: "uppercase",
          },
        ],
        "heading-sm": [
          "2.25rem",
          {
            lineHeight: "1.35",
            letterSpacing: "0.025em",
            fontWeight: "600",
            textTransform: "uppercase",
          },
        ],
        "title-lg": [
          "1.5rem",
          {
            lineHeight: "1.4",
            letterSpacing: "0.05em",
            fontWeight: "600",
            textTransform: "uppercase",
          },
        ],
        "title-md": [
          "1.25rem",
          {
            lineHeight: "1.4",
            letterSpacing: "0.05em",
            fontWeight: "600",
            textTransform: "uppercase",
          },
        ],
        "title-sm": [
          "1.125rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0.05em",
            fontWeight: "600",
            textTransform: "uppercase",
          },
        ],
        "body-lg": ["1.25rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "button-lg": ["1rem", { lineHeight: "1.5", fontWeight: "500" }],
        "button-md": ["0.875rem", { lineHeight: "1.5", fontWeight: "500" }],
        "button-sm": ["0.75rem", { lineHeight: "1.5", fontWeight: "500" }],
        caption: ["0.75rem", { lineHeight: "1.5", fontWeight: "400" }],
        overline: [
          "0.625rem",
          {
            lineHeight: "1.5",
            fontWeight: "500",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          },
        ],
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem",
        "4xl": "6rem",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "card-hover":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "elevation-1":
          "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
        "elevation-2":
          "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
        "elevation-3":
          "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
        "float-delayed": "float 3s ease-in-out infinite 1.5s",
      },
    },
  },
  plugins: [],
};

export default config;