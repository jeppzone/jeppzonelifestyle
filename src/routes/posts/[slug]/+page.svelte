<script lang="ts">
	import { formatDate } from '$lib/utils';
	import SEO from '$lib/components/SEO.svelte';

	export let data;
</script>

<SEO
	title={`${data.meta?.title} | JeppzoneLifestyle`}
	description={data.meta?.description}
	type="article"
/>

<section>
	<div class="prose max-w-4xl">
		<svelte:component this={data.content} />
	</div>
</section>
