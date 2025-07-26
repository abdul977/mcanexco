/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontSize: {
        'xxs': '0.625rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      minHeight: {
        '12': '3rem',
        '16': '4rem',
      },
    },
  },
  plugins: [],
  // Enable print styles
  variants: {
    extend: {
      backgroundColor: ['print'],
      textColor: ['print'],
      borderColor: ['print'],
      borderWidth: ['print'],
      margin: ['print'],
      padding: ['print'],
      display: ['print'],
    },
  },
};