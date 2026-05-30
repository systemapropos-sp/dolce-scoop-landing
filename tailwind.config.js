/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { ds: { rose: "#FF6B7A", "rose-dark": "#E85D6B", "rose-light": "#FFE0E3", cream: "#FFF8F0", chocolate: "#3D1F00", caramel: "#D4A574", vanilla: "#F5E6C8", mint: "#7DD3C0", lavender: "#C4A7E7", peach: "#FFB085" } },
      fontFamily: { display: ['"Playfair Display"', 'serif'], sans: ['Inter', 'system-ui', 'sans-serif'] },
      borderRadius: { "4xl": "2rem" },
      keyframes: { "float": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } }, "marquee": { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } } },
      animation: { "float": "float 6s ease-in-out infinite", "marquee": "marquee 30s linear infinite" },
    },
  },
  plugins: [require("tailwindcss-animate")],
}