<script lang="ts">
	export let title = 'JeppzoneLifestyle - Health and Fitness Tools';
	export let description =
		'Discover health and fitness tools, calculators, and informative articles to help you on your wellness journey.';
	export let type = 'website';
	export let image = 'https://www.jeppzonelifestyle.com/og-image.jpg';
	export let date = '';
	export let author = 'Jesper Olsson Laine';
	export let categories: string[] = [];

	import { page } from '$app/stores';
	$: canonicalUrl = `https://www.jeppzonelifestyle.com${$page.url.pathname}`;

	type Schema = {
		'@context': string;
		'@type': string;
		name: string;
		description: string;
		url: string;
		author?: {
			'@type': string;
			name: string;
		};
		datePublished?: string;
		dateModified?: string;
		image?: string;
		publisher?: {
			'@type': string;
			name: string;
			logo: {
				'@type': string;
				url: string;
			};
		};
		mainEntityOfPage?: {
			'@type': string;
			'@id': string;
		};
	};

	let schema: Schema = {
		'@context': 'https://schema.org',
		'@type': type === 'article' ? 'Article' : 'WebSite',
		name: title,
		description: description,
		url: canonicalUrl,
		publisher: {
			'@type': 'Organization',
			name: 'JeppzoneLifestyle',
			logo: {
				'@type': 'ImageObject',
				url: 'https://www.jeppzonelifestyle.com/favicon.ico'
			}
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': canonicalUrl
		}
	};

	$: {
		schema = {
			'@context': 'https://schema.org',
			'@type': type === 'article' ? 'Article' : 'WebSite',
			name: title,
			description: description,
			url: canonicalUrl,
			publisher: {
				'@type': 'Organization',
				name: 'JeppzoneLifestyle',
				logo: {
					'@type': 'ImageObject',
					url: 'https://www.jeppzonelifestyle.com/favicon.ico'
				}
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': canonicalUrl
			}
		};

		if (type === 'article') {
			schema.author = {
				'@type': 'Person',
				name: author
			};
			if (date) {
				schema.datePublished = date;
				schema.dateModified = date;
			}
			if (image) {
				schema.image = image;
			}
		}
	}

	$: jsonLd = JSON.stringify(schema);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:site_name" content="JeppzoneLifestyle" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={canonicalUrl} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />

	<!-- Additional Meta Tags -->
	<meta name="author" content={author} />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Article Specific Meta Tags -->
	{#if type === 'article' && date}
		<meta property="article:published_time" content={date} />
		<meta property="article:modified_time" content={date} />
		<meta property="article:author" content={author} />
		<meta property="article:section" content={categories.join(', ')} />
	{/if}

	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>
