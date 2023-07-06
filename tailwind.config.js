/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
      // MOBILE FIRST
      'sm': '640px',   // @media (min-width: 640px) { ... }
      'md': '768px',   // @media (min-width: 768px) { ... }
      'lg': '1024px',  // @media (min-width: 1024px) { ... }
      'xl': '1280px',  // @media (min-width: 1280px) { ... }
      'xl+': '1440px', // @media (min-width: 1440px) { ... }
      '2xl': '1536px', // @media (min-width: 1536px) { ... }
      '3xl': '1920px', // @media (min-width: 1920px) { ... }
      '4xl': '2560px', // @media (min-width: 2560px) { ... } // 2k
      '5xl': '3840px', // @media (min-width: 3840px) { ... } // 4k
    },
  },
  plugins: [],
}
