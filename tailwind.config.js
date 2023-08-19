/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/constants/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'sroom-black-100': '#999999',
        'sroom-black-200': '#666666',
        'sroom-black-300': '#333333',
        'sroom-black-400': '#111111',
        'sroom-gray-100': '#FAFAFA',
        'sroom-gray-200': '#F7F7F7',
        'sroom-gray-300': '#F1F1F1',
        'sroom-gray-400': '#EEEEEE',
        'sroom-gray-500': '#DDDDDD',
        'sroom-green': '24BC61',
        'sroom-red': '#FF0000',
        'sroom-white': '#FFFFFF',
        'sroom-brand': '#FA5B3E'
      }
    },
    plugins: [
      require('daisyui'),
      require('tailwind-scrollbar-hide'),
      require('tailwindcss'),
      require('autoprefixer')
    ],
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
  }
};
