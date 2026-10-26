/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#173D2B",
          dark: "#10291F",
        },
        gold: {
          DEFAULT: "#B99A5A",
          soft: "#D9CBA3",
          ink: "#7D612E",
        },
        ivory: "#F7F5EF",
        white: "#FFFFFF",
        slate: "#333B37",
        border: "#E4E5DD",
        destructive: "#B42318",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Manrope", "system-ui", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
      borderRadius: {
        sm: "0.375rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
      },
      boxShadow: {
        soft: "0 4px 20px -6px rgba(16, 41, 31, 0.08)",
        card: "0 8px 30px -10px rgba(16, 41, 31, 0.06)",
      },
      transitionTimingFunction: {
        refined: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
