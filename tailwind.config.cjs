/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
	"./src/**/*.{js,ts,jsx,tsx}",
	"./layout/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
	extend: {
	    colors: {
		'tropical-blue': {
		    100: '#89b4ff',
		    200: '#89b4ff',
		    300: '#7ca6f3',
		    400: '#6f99e7',
		    500: '#628bdb',
		    600: '#557ed0',
		    700: '#4871c4',
		    800: '#3b64b8',
		    900: '#2c57ac',
		    1000: '#1b4ba1',
		    1100: '#013f95',
		},
		'special-slate': {
		    'component': '#191e2b',
		    'text': '#6a7091',
		    'icon': '#142142',
		},
	    },
	},
    },
    plugins: [],
};
