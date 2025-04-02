<script lang="ts">
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import RelatedContent from '$lib/components/RelatedContent.svelte';
	import { topics } from '$lib/data/topics';
	import type { PageData } from './$types';
	export let data: PageData;

	const topic = topics.find((t) => t.slug === data.slug);
	if (!topic) {
		throw new Error('Topic not found');
	}

	const breadcrumbItems = [
		{ title: 'Topics', href: '/topics' },
		{ title: topic.title, href: `/topics/${topic.slug}` }
	];
</script>

<svelte:head>
	<title>{topic.title} | Jeppzone Lifestyle</title>
	<meta name="description" content={topic.description} />
</svelte:head>

<div class="max-w-5xl mx-auto space-y-8">
	<Breadcrumb items={breadcrumbItems} />

	<section class="text-center space-y-6">
		<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
			{topic.title}
		</h1>
		<p class="text-xl text-text-muted max-w-2xl mx-auto">
			{topic.description}
		</p>
	</section>

	<section class="prose prose-lg max-w-none">
		<div class="card p-6">
			<h2>About This Topic</h2>
			<p>
				Welcome to our comprehensive guide on {topic.title.toLowerCase()}. Here you'll find
				everything you need to know about this important aspect of health and lifestyle.
			</p>
		</div>
	</section>

	<RelatedContent relatedPosts={data.relatedPosts} relatedTools={data.relatedTools} />
</div>
