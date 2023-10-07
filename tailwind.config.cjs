const starlightPlugin = require('@astrojs/starlight-tailwind');

// Generated color palettes
const accent = {
  200: '#b8cfc5',
  600: '#327b62',
  900: '#1b392e',
  950: '#162821',
};
const gray = {
  100: '#f1f8fb',
  200: '#e2f0f7',
  300: '#b4c5ce',
  400: '#7091a1',
  500: '#3e5d6c',
  700: '#1e3c4b',
  800: '#0b2b38',
  900: '#0d1a20',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: { accent, gray },
    },
  },
  plugins: [starlightPlugin()],
};
