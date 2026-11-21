import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      colors: {
        brand: {
          dark: "#0D4F85",
          navy: "#173B57",
          primary: "#1769AA",
          secondary: "#2D86C9",
          light: "#F3F7FA",
          surface: "#F8FBFE",
          border: "#E2E8F0",
        },
      },
    },
  },
  plugins: [],
};
export default config;
