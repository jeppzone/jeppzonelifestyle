<script lang="ts">
	export let title = 'JeppzoneLifestyle - Health and Fitness Tools';
	export let description =
		'Discover health and fitness tools, calculators, and informative articles to help you on your wellness journey.';
	export let type = 'website';
	export let image = 'https://www.jeppzonelifestyle.com/og-image.jpg';

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
	};

	let schema: Schema = {
		'@context': 'https://schema.org',
		'@type': type === 'article' ? 'Article' : 'WebSite',
		name: title,
		description: description,
		url: canonicalUrl
	};

	$: {
		schema = {
			'@context': 'https://schema.org',
			'@type': type === 'article' ? 'Article' : 'WebSite',
			name: title,
			description: description,
			url: canonicalUrl
		};

		if (type === 'article') {
			schema.author = {
				'@type': 'Person',
				name: 'Jesper Olsson Laine'
			};
		}
	}

	$: jsonLd = JSON.stringify(schema);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="og:title" content={title} />
	<meta name="og:description" content={description} />
	<meta name="og:type" content={type} />
	<meta name="og:image" content={image} />
	<link rel="canonical" href={canonicalUrl} />

	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>
