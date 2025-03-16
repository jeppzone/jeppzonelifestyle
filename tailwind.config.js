/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#6366f1',
					dark: '#4f46e5'
				},
				secondary: '#0ea5e9',
				accent: '#f59e0b',
				background: '#0f172a',
				surface: '#1e293b',
				text: {
					DEFAULT: '#f8fafc',
					muted: '#94a3b8'
				}
			},
			fontFamily: {
				sans: [
					'Inter',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'sans-serif'
				],
				mono: ['Fira Code', 'Fira Mono', 'monospace']
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease forwards',
				'slide-up': 'slideUp 0.5s ease forwards'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				}
			},
			spacing: {
				xs: '0.5rem',
				sm: '1rem',
				md: '1.5rem',
				lg: '2rem',
				xl: '3rem'
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.text.DEFAULT'),
						maxWidth: '65ch',
						margin: '0 auto',
						a: {
							color: theme('colors.primary.DEFAULT'),
							'&:hover': {
								color: theme('colors.primary.dark')
							}
						},
						strong: {
							color: theme('colors.text.DEFAULT')
						},
						h1: {
							color: theme('colors.text.DEFAULT')
						},
						h2: {
							color: theme('colors.text.DEFAULT')
						},
						h3: {
							color: theme('colors.text.DEFAULT')
						},
						h4: {
							color: theme('colors.text.DEFAULT')
						},
						code: {
							color: theme('colors.primary.DEFAULT')
						},
						'code::before': {
							content: '""'
						},
						'code::after': {
							content: '""'
						},
						pre: {
							backgroundColor: theme('colors.surface'),
							color: theme('colors.text.DEFAULT')
						},
						p: {
							color: theme('colors.text.muted')
						},
						ul: {
							color: theme('colors.text.muted')
						},
						ol: {
							color: theme('colors.text.muted')
						},
						li: {
							color: theme('colors.text.muted')
						}
					}
				}
			})
		},
		screens: {
			xs: '10px',
			...defaultTheme.screens
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
