/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/client/index.html',
    './apps/client/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      "sans": "Carter One",
    },
    extend: {
      backgroundImage: {
        "light-gradient": "linear-gradient(0deg, #FAE493 0%, #FFFFFF00 5%, #FFFFFF00 95%, #FAE493 100%)",
      },
      colors: {
        "jo-main": "#FFD53F",
        "jo-red": "#F86969",
        "jo-blue": "#0CB6FF",
        "jo-green": "#6CF869",
        "jo-black": "#121212",
        "jo-purple": "CF5CCB"
      },
      fontSize: {
        "jo-sm": "20px", 
        "jo-md": "30px",
        "jo-lg": "40px" 
      }
    },
  },
  plugins: [],
};
