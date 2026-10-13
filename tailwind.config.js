/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aws: {
          squid: '#232F3E',
          smile: '#FF9900',
          'smile-hover': '#EC7211',
          anchor: '#0073BB',
          teal: '#00A4BD',
          deep: '#0F1B2D',
          darkest: '#0A1118',
          cardDark: '#162234',
          borderDark: '#1E2D42',
          cardLight: '#FFFFFF',
          borderLight: '#E2E8F0',
          bgLight: '#F8FAFC',
          bgSecondaryLight: '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-orange': '0 0 20px -3px rgba(255, 153, 0, 0.25)',
        'glow-teal': '0 0 20px -3px rgba(0, 164, 189, 0.25)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.35)',
        'card-light': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
