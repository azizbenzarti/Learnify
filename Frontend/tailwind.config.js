// module.exports = {
//   purge: [],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // Add custom font sizes
      fontSize: {
        small: ['0.875rem', '1.25rem'],  // 14px
        medium: ['1rem', '1.5rem'],      // 16px (default)
        large: ['1.125rem', '1.75rem'],  // 18px
      },
      // Add spacing for compact mode
      spacing: {
        'compact': '0.5rem',
      },
      // Add gradient utilities if needed
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #4f46e5, #7c3aed)',
      }
    },
  },
  variants: {
    extend: {
      // Enable variants for your custom utilities
      backgroundColor: ['dark'],
      textColor: ['dark'],
      spacing: ['compact'],
    },
  },
  plugins: [
    // Add any necessary plugins
    require('@tailwindcss/forms'),
  ],
}