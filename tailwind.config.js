
import keepPreset from "keep-react/preset";
export default {

  theme: {
    extend: {
      colors: {
        customColor: '#1c1a40',
      },
    },
  },

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [keepPreset],

};
