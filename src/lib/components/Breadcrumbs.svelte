<!-- Breadcrumbs.svelte -->
<script lang="ts">
	interface BreadcrumbItem {
		path: string;
		label: string;
	}

	export let items: BreadcrumbItem[] = [];
	export let baseUrl = 'https://www.jeppzonelifestyle.com';

	const breadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@id': `${baseUrl}${item.path}`,
				name: item.label
			}
		}))
	};

	const schemaString = JSON.stringify(breadcrumbSchema);
</script>

<nav class="breadcrumbs py-2" aria-label="Breadcrumb">
	<ol class="flex space-x-2 text-sm text-slate-400">
		{#each items as item, i}
			<li>
				{#if i < items.length - 1}
					<a href={item.path} class="hover:text-white transition-colors">{item.label}</a>
					<span class="mx-2">/</span>
				{:else}
					<span class="text-slate-200">{item.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

{@html `<script type="application/ld+json">${schemaString}</script>`}
