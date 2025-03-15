export const prerender = false;
export const ssr = true;

export const load = ({ url }) => {
	const canonicalPath = url.pathname === '/' ? '' : url.pathname;

	return {
		url: url.pathname,
		meta: {
			title: 'Jeppzone Lifestyle - Health, Wellness & Personal Development',
			description:
				'Discover expert insights on health, wellness, and personal development with Jeppzone Lifestyle. Tools, guides, and actionable content to help you live your best life.',
			keywords:
				'health, wellness, personal development, lifestyle, fitness, mental health, productivity tools',
			ogImage: 'https://jeppzone.com/og-image.jpg', // Make sure to create and add this image
			canonical: `https://jeppzone.com${canonicalPath}`
		}
	};
};
