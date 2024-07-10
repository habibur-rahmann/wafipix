import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        portfolioTitle: "2.25rem",
        portfolioTitleMd: "3rem",
        portfolioTitleLg: "5rem",

        bannerHead: "2.25rem",
        bannerHeadMd: "3rem",
        bannerHeadLg: "4rem",

        bannerPara: "1.125rem",
        bannerparaMd: "1.3rem",
        bannerparaLg: "1.5rem",

        cardTitle: "1.25rem",
        cardTitleMd: "1.3rem",
        cardTitleLg: "1.4rem",

        cardLink: "0.875rem",
        cardLinkMd: "1rem",
        cardLinkLg: "1.25rem",

        tagline: "1.6",
        taglineMd: "1.75",
        taglineLg: "1.85rem",

        sectionTitle: "2.4rem",
        sectionTitleMd: "3.75rem",
        sectionTitleMdLg: "5.2rem",

        articleTitle: "1.4rem",
        articleTitleMd: "1.5rem",
        articleTitleLg: "1.6rem",

        articlePara: "1.125rem",
        articleParaMd: "1.2rem",
        articleParaLg: "1.3",
      },
      minHeight: {
        fullScreenWithoutNavbar: "calc(100vh - 64px)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        accent2: {
          DEFAULT: "hsl(var(--accent2))",
          foreground: "hsl(var(--accent2-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      gridTemplateColumns: {
        "auto-height": "repeat(auto-fit, minmax(250px, 1fr))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
