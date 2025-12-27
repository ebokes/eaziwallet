/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
      xl: "1440px",
    },
    colors: {
      indigo: "#270685",
      "ocean-blue": "#7e5bef",
      "majorelle-blue": "#6F45E9",
      lavender: "#E6DDFF",
      mangolia: "#F7F4FF",
      "dark-bronze": "#ffc82c",
      golden: "#DDA921",
      mango: "#FDC228",
      blond: "#FFECBA",
      "floral-white": "#FFFAEC",
      "american-purple": "#540F55",
      violet: "#963898",
      "pearly-purple": "#B462B6",
      "bright-gray": "#F2E1F2",
      powder: "#FFF6FF",
      maroon: "#6F1212",
      "golden-gate-bridge": "#B83232",
      "jelly-bean": "#E05555",
      "pale-pink": "#FFD6D6",
      snow: "#FFF6F6",
      "la-salle-green": "#117031",
      "sea-green": "#289B4F",
      shamrock: "#4DA66B",
      "mint-cream": "#E6F6EC",
      "bright-green": "#F4FFF8",
      grass: "#0B453B",
      emerald: "#2A907E",
      verdigris: "#4FBCA8",
      "columbia-blue": "#C9EBE5",
      bubbles: "#E9FFFB",
      "catalina-blue": "#0D3674",
      "celtic-blue": "#1D62CA",
      "bleu-de-france": "#3B85F3",
      cloud: "#E4EFFF",
      "ghost-white": "#F5F9FF",

      black: "#191919",
      "black-coral": "#535D66",
      "slate-gray": "#78838D",
      "sliver-sand": "#BAC2C7",
      "azureish-white": "#E1E3ED",
      "alice-blue": "#EDEFF6",
      cultured: "#F7F8FE",
      white: "#FFFFFF",

      primary: "var(--bg-primary)",
      secondary: "var(--bg-secondary)",
      tertiary: "var(--bg-tertiary)",
    },

    extend: {
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
      },
      borderColor: {
        soft: "var(--border-soft)",
        light: "var(--border-light)",
      },
      fontSize: {
        // B1 & S1 & R1 - 36px
        B1: ["2.25rem", { fontWeight: "700" }],
        S1: ["2.25rem", { fontWeight: "600" }],
        R1: ["2.25rem", { fontWeight: "400" }],

        // B2 & S2 & R2 - 24px
        B2: ["1.5rem", { fontWeight: "700" }],
        S2: ["1.5rem", { fontWeight: "600" }],
        R2: ["1.5rem", { fontWeight: "400" }],

        // B3 & S3 & R3 - 21px
        B3: ["1.3125rem", { fontWeight: "700" }],
        S3: ["1.3125rem", { fontWeight: "600" }],
        R3: ["1.3125rem", { fontWeight: "400" }],

        // B4 & S4 & R4 - 18px
        B4: ["1.125rem", { fontWeight: "700" }],
        S4: ["1.125rem", { fontWeight: "600" }],
        R4: ["1.125rem", { fontWeight: "400" }],

        // B5 & S5 & R5 - 16px
        B5: ["1rem", { fontWeight: "700" }],
        S5: ["1rem", { fontWeight: "600" }],
        R5: ["1rem", { fontWeight: "400" }],

        // B6 & S6 & R6 - 14px
        B6: ["0.875rem", { fontWeight: "700" }],
        S6: ["0.875rem", { fontWeight: "600" }],
        R6: ["0.875rem", { fontWeight: "400" }],

        // B7 & S7 & R7 - 12px
        B7: ["0.75rem", { fontWeight: "700" }],
        S7: ["0.75rem", { fontWeight: "600" }],
        R7: ["0.75rem", { fontWeight: "400" }],
      },
    },
    fontFamily: {
      sora: ["Sora", "sans-serif"],
    },
    boxShadow: {
      "elevation-low": "0 16px 24px rgba(0,0,0,0.20)",
      "elevation-card": "0 8px 24px rgba(0,0,0,0.20)",
      "elevation-high": "0 -6px 24px 0px rgba(0,0,0,0.08)",
    },
  },
  plugins: [],
};
