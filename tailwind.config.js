/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#D97706',
          light: '#FEF3C7',
          dark: '#B45309',
        },
        success: {
          DEFAULT: '#16A34A',
          light: '#DCFCE7',
        },
        star: '#F59E0B',
      },
      maxWidth: {
        mobile: '430px',
      },
    },
  },
  plugins: [],
}
