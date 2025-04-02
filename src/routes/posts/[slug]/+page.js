import { error } from '@sveltejs/kit';
import { topics } from '$lib/data/topics';

export const prerender = true;
export async function load({ params }) {
	try {
		const post = await import(`../../../posts/${params.slug}.md`);
		const topic = topics.find((t) => t.posts.includes(params.slug));

		// Get related posts metadata
		const relatedPosts = topic
			? await Promise.all(
					topic.posts
						.filter((slug) => slug !== params.slug)
						.map(async (slug) => {
							try {
								const relatedPost = await import(`../../../posts/${slug}.md`);
								return {
									slug,
									title: relatedPost.metadata.title,
									description: relatedPost.metadata.description
								};
							} catch (e) {
								console.error(`Could not load related post: ${slug}`);
								return null;
							}
						})
				).then((posts) => posts.filter(Boolean))
			: [];

		return {
			content: post.default,
			meta: post.metadata,
			slug: params.slug,
			relatedPosts
		};
	} catch (e) {
		error(404, `Could not find ${params.slug}`);
	}
}
