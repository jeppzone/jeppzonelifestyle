<!-- ArticleSchema.svelte -->
<script>
	export let post;
	export let baseUrl = 'https://www.jeppzonelifestyle.com';

	const articleSchema = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: post.description,
		image: post.image ? `${baseUrl}${post.image}` : undefined,
		datePublished: post.date,
		dateModified: post.updatedAt || post.date,
		author: {
			'@type': 'Person',
			name: 'Jesper Olsson Laine',
			url: baseUrl
		},
		publisher: {
			'@type': 'Organization',
			name: 'Jeppzone Lifestyle',
			url: baseUrl,
			logo: {
				'@type': 'ImageObject',
				url: `${baseUrl}/logo.png`
			}
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${baseUrl}/posts/${post.slug}`
		}
	};

	const schemaString = JSON.stringify(articleSchema);
</script>

{@html `<script type="application/ld+json">${schemaString}</script>`}
