/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        beige: '#F5F5DC',
        'beige-dark': '#E8E8C8',
        grey: {
          DEFAULT: '#6B6B6B',
          light: '#A9A9A9',
          dark: '#4A4A4A',
        },
        'dark-blue': {
          DEFAULT: '#001F3F',
          light: '#003366',
          dark: '#001229',
        },
        'warm-grey': {
          DEFAULT: '#F5F4F0',
          dark: '#EDECEA',
        },
      },
      keyframes: {
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.7s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.7s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
};
