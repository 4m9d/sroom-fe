/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/constants/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
    darkTheme: 'dark', // default: 'dark'
    base: true, // default: true
    styled: true, // default: true
    utils: true, // default: true
    rtl: false, // default: false
    prefix: '', // default: ''
    logs: false // default: 
  }
};
