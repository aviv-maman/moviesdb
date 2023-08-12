// tailwind.config.js
import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export const darkMode = 'class';
export const content = [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/*.{js,ts,jsx,tsx,mdx}',
  './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
  extend: {
    colors: {
      // background: 'hsl(var(--background))',
      // foreground: 'hsl(var(--foreground))',
      // btn: {
      //   background: 'hsl(var(--btn-background))',
      //   'background-hover': 'hsl(var(--btn-background-hover))',
      // },
    },
  },
};
export const plugins = [nextui()];
