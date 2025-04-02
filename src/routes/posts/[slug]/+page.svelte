<script lang="ts">
	import { formatDate } from '$lib/utils';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import RelatedContent from '$lib/components/RelatedContent.svelte';
	import { topics } from '$lib/data/topics';
	import type { PageData } from './$types';

	interface PostMeta {
		title: string;
		description?: string;
		date?: string;
		author?: string;
		categories?: string[];
		image?: string;
	}

	interface RelatedPost {
		slug: string;
		title: string;
		description: string;
	}

	interface PostData extends PageData {
		content: any;
		meta: PostMeta;
		slug: string;
		relatedPosts: RelatedPost[];
	}

	export let data: PostData;

	// Find the topic that contains this post
	const topic = topics.find((t) => t.posts.includes(data.slug));

	const breadcrumbItems = [{ title: 'Posts', href: '/posts' }];

	if (topic) {
		breadcrumbItems.push(
			{ title: topic.title, href: `/topics/${topic.slug}` },
			{ title: data.meta.title, href: `/posts/${data.slug}` }
		);
	} else {
		breadcrumbItems.push({ title: data.meta.title, href: `/posts/${data.slug}` });
	}

	// Get related tools from the same topic
	const relatedTools = topic
		? topic.tools.map((slug) => ({
				slug,
				title: slug
					.split('-')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' '),
				description: `Use our ${slug.split('-').join(' ')} tool.`
			}))
		: [];
</script>

<SEO
	title={`${data.meta.title} | JeppzoneLifestyle`}
	description={data.meta.description}
	type="article"
	date={data.meta.date}
	author={data.meta.author || 'Jesper Olsson Laine'}
	categories={data.meta.categories || []}
	image={data.meta.image || 'https://www.jeppzonelifestyle.com/og-image.jpg'}
/>

<div class="max-w-5xl mx-auto space-y-8">
	<Breadcrumb items={breadcrumbItems} />

	<article class="prose prose-lg max-w-none">
		<svelte:component this={data.content} />
	</article>

	<RelatedContent relatedPosts={data.relatedPosts} {relatedTools} />
</div>
