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
          panel: "#0F172A",
          header: "#1E293B",
          text: "#E2E8F0",
          muted: "#94A3B8",
          cyan: "#22D3EE",
          pink: "#F472B6",
          amber: "#FBBF24",
          indigo: "#818CF8",
          green: "#34D399",
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
