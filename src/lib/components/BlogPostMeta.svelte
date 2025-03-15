<!-- BlogPostMeta.svelte -->
<script lang="ts">
	import ArticleSchema from './ArticleSchema.svelte';
	import { formatDate } from '$lib/utils';

	export let post: {
		title: string;
		description: string;
		date: string;
		slug: string;
		categories?: string[];
		keywords?: string;
		image?: string;
		updatedAt?: string;
	};

	export let baseUrl = 'https://www.jeppzonelifestyle.com';
	const canonicalUrl = `${baseUrl}/posts/${post.slug}`;

	// Generate structured breadcrumbs for the post
	const breadcrumbs = [
		{
			'@type': 'ListItem',
			position: 1,
			item: {
				'@id': baseUrl,
				name: 'Home'
			}
		},
		{
			'@type': 'ListItem',
			position: 2,
			item: {
				'@id': `${baseUrl}/posts`,
				name: 'Blog'
			}
		},
		{
			'@type': 'ListItem',
			position: 3,
			item: {
				'@id': canonicalUrl,
				name: post.title
			}
		}
	];

	const breadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbs
	};

	const schemaString = JSON.stringify(breadcrumbSchema);
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<title>{post.title} | Jeppzone Lifestyle</title>
	<meta name="description" content={post.description} />
	{#if post.keywords}
		<meta name="keywords" content={post.keywords} />
	{/if}

	<!-- Canonical URL -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph Tags -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.description} />
	<meta property="og:url" content={canonicalUrl} />
	{#if post.image}
		<meta property="og:image" content={`${baseUrl}${post.image}`} />
		<meta property="og:image:alt" content={post.title} />
	{/if}
	<meta property="article:published_time" content={post.date} />
	{#if post.updatedAt}
		<meta property="article:modified_time" content={post.updatedAt} />
	{/if}
	{#if post.categories}
		{#each post.categories as category}
			<meta property="article:tag" content={category} />
		{/each}
	{/if}

	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content={post.image ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:description" content={post.description} />
	{#if post.image}
		<meta name="twitter:image" content={`${baseUrl}${post.image}`} />
		<meta name="twitter:image:alt" content={post.title} />
	{/if}
</svelte:head>

<!-- Article Schema -->
<ArticleSchema {post} {baseUrl} />

<!-- Breadcrumb Schema -->
{@html `<script type="application/ld+json">${schemaString}</script>`}

<!-- Visible Post Metadata -->
<div class="post-meta text-center">
	<time datetime={post.date} class="text-gray-400 text-sm inline-block">
		{formatDate(post.date)}
	</time>
	{#if post.categories}
		<div class="categories mt-3">
			{#each post.categories as category}
				<span
					class="inline-block bg-white/10 text-gray-300 rounded-full px-3 py-1 text-sm mr-2 mb-2"
				>
					{category}
				</span>
			{/each}
		</div>
	{/if}
</div>
