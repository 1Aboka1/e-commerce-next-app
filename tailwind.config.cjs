/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
	extend: {
	    colors: {
		'tropical-blue': {
		    400: '#89b4ff',
		    500: '#89b4ff',
		},
	    },
	},
    },
    plugins: [],
};
