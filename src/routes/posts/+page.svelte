<script lang="ts">
	import { formatDate } from '$lib/utils';
	import OptimizedImage from '$lib/components/OptimizedImage.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	interface BlogPost {
		title: string;
		description: string;
		date: string;
		slug: string;
		updatedAt?: string;
	}

	const baseUrl = 'https://www.jeppzonelifestyle.com';
	const pageTitle = 'Blog Posts | Jeppzone Lifestyle';
	const pageDescription =
		'Explore articles about health, wellness, and personal development. Learn about sleep, nutrition, fitness, and lifestyle optimization.';

	// Generate blog listing schema
	const blogSchema = {
		'@context': 'https://schema.org',
		'@type': 'Blog',
		name: 'Jeppzone Lifestyle Blog',
		description: pageDescription,
		url: `${baseUrl}/posts`,
		author: {
			'@type': 'Person',
			name: 'Jesper Olsson Laine',
			url: baseUrl
		},
		blogPost: data.posts.map((post: BlogPost) => ({
			'@type': 'BlogPosting',
			headline: post.title,
			description: post.description,
			datePublished: post.date,
			dateModified: post.updatedAt || post.date,
			url: `${baseUrl}/posts/${post.slug}`,
			author: {
				'@type': 'Person',
				name: 'Jesper Olsson Laine',
				url: baseUrl
			}
		}))
	};

	const schemaString = JSON.stringify(blogSchema);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta
		name="keywords"
		content="blog, articles, health, wellness, personal development, lifestyle, fitness, nutrition, sleep"
	/>
	<link rel="canonical" href={`${baseUrl}/posts`} />

	<!-- Open Graph Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={`${baseUrl}/posts`} />

	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
</svelte:head>

{@html `<script type="application/ld+json">${schemaString}</script>`}

<article class="max-w-6xl mx-auto px-4 py-8">
	<div class="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10">
		<header class="text-center mb-12">
			<h1
				class="md:text-6xl sm:text-5xl text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent pb-8"
			>
				Blog Posts
			</h1>
			<p class="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
				{pageDescription}
			</p>
		</header>

		<div
			class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
			role="feed"
			aria-label="Blog posts"
		>
			{#each data.posts as post}
				<article
					class="group relative bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 ease-out min-h-[8rem] p-6 flex"
				>
					<a
						href={`/posts/${post.slug}`}
						class="flex flex-col justify-between w-full gap-4"
						aria-label={post.title}
					>
						<div>
							<h2
								class="text-xl font-semibold text-gray-200 group-hover:text-white transition-colors"
							>
								{post.title}
							</h2>
							{#if post.description}
								<p class="text-gray-400 mt-2 line-clamp-2">{post.description}</p>
							{/if}
							<time datetime={post.date} class="block text-sm text-gray-500 mt-2">
								{formatDate(post.date)}
							</time>
							{#if post.categories}
								<div class="mt-2 flex flex-wrap gap-2">
									{#each post.categories as category}
										<span class="text-xs bg-white/5 text-gray-400 rounded-full px-2 py-1">
											{category}
										</span>
									{/each}
								</div>
							{/if}
						</div>
						<div class="flex justify-end">
							<span
								class="text-blue-400 group-hover:translate-x-1 transition-transform duration-300"
								aria-hidden="true"
							>
								→
							</span>
						</div>
					</a>
				</article>
			{/each}
		</div>

		{#if data.posts.length === 0}
			<div class="mt-12 bg-white/5 rounded-xl p-8 text-center">
				<p class="text-gray-400 text-lg">No blog posts available yet.</p>
			</div>
		{/if}
	</div>
</article>

<style>
	/* Add hover effect for the cards */
	article {
		transform: translateY(0);
		box-shadow: 0 0 0 rgba(0, 0, 0, 0);
	}

	article:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}
</style>
