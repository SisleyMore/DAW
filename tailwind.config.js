/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      screens: {
        'primeng-md': '960px',
      },
      keyframes: {
        scalein: {
          '0%': {
            opacity: 0,
            transform: 'scaleY(0.8)',
            transition:
              'transform .12s cubic-bezier(0, 0, 0.2, 1), opacity .12s cubic-bezier(0, 0, 0.2, 1)',
          },
          '100%': {
            opacity: 1,
            transform: 'scaleY(1)',
          },
        },
        fadeout: {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
      },
      animation: {
        scalein: 'scalein 0.15s linear',
        fadeout: 'fadeout 0.15s linear',
      },
    },
  },
  plugins: [],
}
