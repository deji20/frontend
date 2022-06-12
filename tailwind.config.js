module.exports = {
  mode: "jit",
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {    
    extend: {
      zIndex: {
        "-1": -1,
      },
      colors: {
        dark: "#10071e",
        soulBlue: "#60a5fa"
      },
      transitionDuration: {
        2000: '2000ms',
      },
      animation: {
        'spin-slow': 'spin 50s linear infinite',
        blob: 'blob 4s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(10px, -16px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-10px, 10px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      }  
    },
  },
  variants: {
    extend: {
      
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
