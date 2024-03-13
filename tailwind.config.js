/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans]
			}
		},
		screens: {
			xs: '10px',
			...defaultTheme.screens
		}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
