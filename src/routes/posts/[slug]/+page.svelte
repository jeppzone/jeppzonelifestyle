<script lang="ts">
	import { formatDate } from '$lib/utils';
	import SEO from '$lib/components/SEO.svelte';

	export let data;
</script>

<SEO
	title={`${data.meta?.title} | JeppzoneLifestyle`}
	description={data.meta?.description}
	type="article"
	date={data.meta?.date}
	author={data.meta?.author || 'Jesper Olsson Laine'}
	categories={data.meta?.categories || []}
	image={data.meta?.image || 'https://www.jeppzonelifestyle.com/og-image.jpg'}
/>

<section>
	<div class="prose max-w-4xl">
		<svelte:component this={data.content} />
	</div>
</section>
