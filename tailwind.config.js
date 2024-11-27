/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        dark: "#2A2A2A",
        secDark: "#3A3A3A",
        textDarkp: "#e2e8f0",
        light: "#E5E1DA",
        secLight: "#8EA3A6",
        textLightp: "#333333",
        textLights: "#555555",
      },
    },
  },
 
  plugins: [],
};
