import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: '#1B4F8A',
            50: '#EBF2FB',
            100: '#C2D8F3',
            200: '#99BEEB',
            300: '#70A4E3',
            400: '#4789DB',
            500: '#1B4F8A',
            600: '#153E6E',
            700: '#0F2D52',
            800: '#091D36',
            900: '#030C1A',
          },
          amber: {
            DEFAULT: '#F5A623',
            50: '#FEF6E7',
            100: '#FDE6B7',
            200: '#FBD587',
            300: '#FAC557',
            400: '#F8B432',
            500: '#F5A623',
            600: '#D4901E',
            700: '#A87118',
            800: '#7C5212',
            900: '#50340B',
          },
          purple: {
            DEFAULT: '#6B3FA0',
            50: '#F0EAF8',
            100: '#D5C4ED',
            200: '#BA9EE2',
            300: '#9F78D7',
            400: '#8452CC',
            500: '#6B3FA0',
            600: '#563282',
            700: '#402664',
            800: '#2B1946',
            900: '#160D28',
          },
          teal: {
            DEFAULT: '#0D9488',
            50: '#E6F7F6',
            100: '#B3E8E5',
            200: '#80D9D3',
            300: '#4DCAC2',
            400: '#1ABBB0',
            500: '#0D9488',
            600: '#0A766D',
            700: '#075852',
            800: '#053A36',
            900: '#021C1A',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
};

export default config;
