/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#2563EB', // Primary brand color for finance apps
        'exception-red': '#DC2626', // For highlighting critical exceptions
        'status-pending': '#FACC15', // For items requiring attention
        'neutral-light': '#F8FAFC', // A light background neutral
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}