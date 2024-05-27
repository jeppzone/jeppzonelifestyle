<script lang="ts">
	import { formatDate } from '$lib/utils';

	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta?.title} | Jeppzone Lifestyle</title>
	<meta name="keywords" content={data.meta?.keywords} />
	<meta name="description" content={data.meta?.description} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta?.title} />
</svelte:head>

<section>
	<div class="prose max-w-4xl">
		<svelte:component this={data.content} />
	</div>
</section>
