<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Blog Posts | Jeppzone Lifestyle</title>
	<meta
		name="description"
		content="Explore articles about health, lifestyle, and personal development written by Jesper Olsson Laine."
	/>
</svelte:head>

<div class="max-w-5xl mx-auto space-y-16">
	<!-- Header -->
	<section class="text-center space-y-6">
		<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-up">
			Exploring Health & Lifestyle
		</h1>
		<p class="text-xl text-text-muted max-w-2xl mx-auto animate-slide-up">
			Dive into articles about health experimentation, lifestyle optimization, and personal
			development.
		</p>
	</section>

	<!-- Blog Posts Grid -->
	<section class="grid gap-8 md:grid-cols-2">
		{#each data.posts as post}
			<a
				href={`/posts/${post.slug}`}
				class="card group hover:border-primary/50 border border-transparent"
			>
				<h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
					{post.title}
				</h3>
				{#if post.description}
					<p class="mt-2 text-text-muted line-clamp-2">{post.description}</p>
				{/if}
				<div class="mt-4 flex items-center text-sm text-text-muted">
					<span>Read more</span>
					<svg
						class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</div>
			</a>
		{/each}
	</section>
</div>

<style>
	.opacity-0 {
		opacity: 0;
	}
</style>
