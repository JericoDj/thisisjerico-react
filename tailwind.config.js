/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#004225',
                secondary: '#F5F5DC',
                accent1: '#FFB000',
                accent2: '#FFCF9D',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['"PT Serif"', 'Georgia', 'serif'],
            },
        },
    },
    plugins: [],
}
