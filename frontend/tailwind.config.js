module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        term: {
          bg: "#F8FAFC",
          panel: "#FFFFFF",
          header: "#F1F5F9",
          text: "#1E293B",
          muted: "#64748B",
          cyan: "#06B6D4",
          pink: "#EC4899",
          amber: "#F59E0B",
          indigo: "#6366F1",
          green: "#10B981",
        },
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        "swipe-hint": {
          "0%, 100%": { transform: "translateX(0)", opacity: "0.4" },
          "50%": { transform: "translateX(8px)", opacity: "1" },
        },
        "swipe-hint-left": {
          "0%, 100%": { transform: "translateX(0)", opacity: "0.4" },
          "50%": { transform: "translateX(-8px)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "swipe-right": "swipe-hint 1.6s ease-in-out infinite",
        "swipe-left": "swipe-hint-left 1.6s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
