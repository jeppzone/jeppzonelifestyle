<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<section>
	<h1 class="md:text-7xl sm:text-5xl xs:text-5xl text-center tracking-tight font-bold pt-10">
		Blog Posts.
	</h1>
	<div class="grid grid-cols-1 gap-4 pt-10">
		{#each data.posts as post}
			<a
				href={`/posts/${post.slug}`}
				class="text-white text-pretty py-8 px-10 rounded-xl text-xl text-center tracking-tight font-bold bg-violet-900"
				>{post.title}</a
			>
		{/each}
	</div>
</section>
