module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#111827', // Tailwind gray-900
        accent: '#ec4899', // Tailwind pink-500
        blue: {
          500: '#3b82f6',
        },
      },
    },
  },
  plugins: [],
}; 