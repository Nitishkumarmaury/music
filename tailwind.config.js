/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'premium-navy': '#181c2a',
        'premium-black': '#101014',
        'premium-gold': '#ffd700',
        'premium-gold-dark': '#bfa140',
        'premium-cream': '#f8f5ee',
        'premium-gray': '#23232b',
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #181c2a 0%, #23232b 60%, #101014 100%)',
      },
      boxShadow: {
        'premium-card': '0 8px 32px 0 rgba(24,28,42,0.18), 0 1.5px 6px 0 rgba(191,161,64,0.08)',
      },
      borderRadius: {
        'premium': '1.5rem',
      },
    },
  },
  plugins: [],
}
