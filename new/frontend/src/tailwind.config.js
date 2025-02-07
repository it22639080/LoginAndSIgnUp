/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", 
      "./src/components/Signup/**/*.{js,jsx,ts,tsx}",
      "./src/components/Login/**/*.{js,jsx,ts,tsx}",
      "./src/components/Main/**/*.{js,jsx,ts,tsx}",// Include all your React files
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  