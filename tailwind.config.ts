import type { Config } from 'tailwindcss'
import {themes} from "./src/app/shared/constants/ui-themes";
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      'xs': '375px',
      ...defaultTheme.screens,
    },

  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: [...themes],
  }
}
export default config
