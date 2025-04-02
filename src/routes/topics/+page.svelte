<script>
	import TopicNav from '$lib/components/TopicNav.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
</script>

<svelte:head>
	<title>Topics | Jeppzone Lifestyle</title>
	<meta
		name="description"
		content="Explore our comprehensive guides and articles organized by health and lifestyle topics."
	/>
</svelte:head>

<div class="max-w-5xl mx-auto space-y-8">
	<Breadcrumb items={[{ title: 'Topics', href: '/topics' }]} />

	<section class="text-center space-y-6">
		<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
			Health & Lifestyle Topics
		</h1>
		<p class="text-xl text-text-muted max-w-2xl mx-auto">
			Explore our comprehensive guides and articles organized by topic. Find everything you need to
			know about health, fitness, nutrition, and more.
		</p>
	</section>

	<TopicNav />
</div>
