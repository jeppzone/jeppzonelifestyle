<script lang="ts">
	import { formatDate } from '$lib/utils';
	import SEO from '$lib/components/SEO.svelte';
	import Comments from '$lib/components/Comments.svelte';
	import { page } from '$app/stores';

	export let data;
	console.log('Blog post data:', data);

	// Get the slug from the page store
	$: postSlug = $page.params.slug;
	console.log('Post slug from params:', postSlug);
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

<div class="mt-16">
	<Comments {postSlug} />
</div>
