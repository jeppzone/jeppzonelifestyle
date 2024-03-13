<script>
	export let data;
</script>

<svelte:head>
	<title>Lifestyle Content Creator | Jeppzone Lifestyle</title>
	<meta
		name="description"
		content="Lifestyle content creator based in Gothenburg. Writing and proudcing videos about all things health and lifestyle"
	/>
</svelte:head>

<section>
	<h1 class="md:text-7xl sm:text-5xl xs:text-5xl text-center tracking-tight font-bold pt-10">
		Jeppzone Lifestyle.
	</h1>
	<h2 class="text-3xl pt-5 text-center tracking-tight font-bold">
		Health enthusiast and lifestyle content creator based in Gothenburg.
	</h2>
	<p class="pt-5 text-xl text-pretty text-center tracking-tight">
		Hi! I'm Jesper Olsson Laine. I like to experiment with my health and produce content around my
		experiences.
	</p>
	<h2 class="text-5xl pt-10 text-center tracking-tight font-bold">Posts.</h2>
	<div class="grid grid-cols-1 gap-4 pt-10">
		{#each data.posts as post}
			<a
				href={`/posts/${post.slug}`}
				class="text-white text-pretty border border-white py-8 px-10 rounded-l text-xl text-center tracking-tight"
				>{post.title}</a
			>
		{/each}
	</div>
	<h2 class="text-5xl pt-10 text-center tracking-tight font-bold">Socials.</h2>
	<div class="grid grid-cols-1 gap-4 pt-10">
		<a
			href="https://www.youtube.com/@jeppzonelifestyle"
			class="text-white text-pretty border border-white py-5 px-10 rounded-l text-xl text-center tracking-tight"
			>Youtube Channel</a
		>
	</div>
</section>
