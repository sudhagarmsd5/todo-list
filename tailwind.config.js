/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "var(--color-blue)",
        grey: "var(--color-grey)",
        light_black: "var(--color-black)",
        custom_white: "var(--color-custom-white)",
        light_green: "var(--color-light-green)",
        dark_green: "var(--color-dark-green)",
        custom_yellow: "var(--color-yellow)",
        custom_pink: "var(--color-pink)",
        custom_red: "var(--color-red)",
        custom_brown: "var(--color-brown)",
      },
    },
  },
  plugins: [],
};
