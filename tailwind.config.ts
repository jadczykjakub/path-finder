import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|ripple|spinner).js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dog-svg': "url('/svg/dog.svg')",
        'dog-food-svg': "url('/svg/dog-food.svg')",
        'dog-track-svg': "url('/svg/dog-track.svg')",
      },
      colors: {
        primary: '#1d9a9f',
        secondary: '#f2f5fa',
      }
    },
  },
  plugins: [nextui()],
};
export default config;
