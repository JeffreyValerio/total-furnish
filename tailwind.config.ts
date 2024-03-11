import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gunmetal: "rgba(36, 52, 69, 1)",
        oxfordBlue: "rgba(14, 33, 54, 1)",
        antiflashWhite: "rgba(233, 237, 239, 1)",
        slateGray: "rgba(115, 127, 136, 1)",
        charcoal: "rgba(63, 79, 95, 1)"
      }
    },
  },
  plugins: [require("daisyui")],
  daysyui: {
    themes: ['light', 'dark']
  }
};
export default config;
