export const prerender = true;

export const load = ({ url }) => {
	return {
		url: url.pathname,
		meta: {
			title: 'Jeppzone Lifestyle - Health, Wellness & Personal Development',
			description:
				'Discover expert insights on health, wellness, and personal development with Jeppzone Lifestyle. Tools, guides, and actionable content to help you live your best life.',
			keywords:
				'health, wellness, personal development, lifestyle, fitness, mental health, productivity tools',
			ogImage: 'https://jeppzone.com/og-image.jpg', // Make sure to create and add this image
			canonical: `https://jeppzone.com${url.pathname}`
		}
	};
};
