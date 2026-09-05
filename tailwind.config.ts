import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#14130F",
          soft: "#211F18",
          line: "#33312A",
        },
        brass: {
          DEFAULT: "#A9812E",
          light: "#C9A227",
          dim: "#8A6B29",
        },
        paper: {
          DEFAULT: "#F7F5F0",
          dim: "#EDEAE1",
        },
        stone: {
          DEFAULT: "#5B5748",
          light: "#8A8574",
        },
        ivory: "#F5F3EE",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-work-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
        prose: "38rem",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(20,19,15,0.06)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
