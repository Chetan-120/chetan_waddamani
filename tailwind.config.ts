import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        electric: "#2f7cff",
        cyan: "#27f5ff",
        violet: "#6b4dff",
        surface: "rgba(255,255,255,0.07)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      boxShadow: {
        glow: "0 0 44px rgba(39, 245, 255, 0.18)",
        card: "0 26px 80px rgba(0, 0, 0, 0.45)"
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
