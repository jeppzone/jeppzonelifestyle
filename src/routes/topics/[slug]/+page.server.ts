import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { topics } from '$lib/data/topics';

export const load: PageServerLoad = async ({ params }) => {
	const topic = topics.find((t) => t.slug === params.slug);
	if (!topic) {
		throw error(404, 'Topic not found');
	}

	// In a real application, you would fetch these from your database
	// For now, we'll create mock data based on the slugs
	const relatedPosts = topic.posts.map((slug) => ({
		slug,
		title: slug
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' '),
		description: `Learn more about ${slug.split('-').join(' ')}.`
	}));

	const relatedTools = topic.tools.map((slug) => ({
		slug,
		title: slug
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' '),
		description: `Use our ${slug.split('-').join(' ')} tool.`
	}));

	return {
		slug: params.slug,
		relatedPosts,
		relatedTools
	};
};
