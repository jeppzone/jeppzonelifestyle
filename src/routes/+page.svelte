<script>
	export let data;
</script>

<svelte:head>
	<title>Lifestyle Content Creator | Jeppzone Lifestyle</title>
	<meta
		name="description"
		content="Lifestyle content creator based in Gothenburg. Hi! I'm Jesper Olsson Laine. I write and produce videos about all things health and lifestyle"
	/>
</svelte:head>

<div class="space-y-24 pb-24">
	<!-- Hero Section -->
	<section class="relative overflow-hidden">
		<div class="container-xl pt-24 pb-32">
			<div class="relative z-10 max-w-3xl">
				<h1 class="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
					Exploring Health & Lifestyle Through Experience
				</h1>
				<p class="text-xl md:text-2xl text-slate-400 mb-8">
					Hi! I'm Jesper Olsson Laine, a health enthusiast and lifestyle content creator based in
					Gothenburg. I experiment with my health and share insights from my journey.
				</p>
				<div class="flex flex-wrap gap-4">
					<a href="/posts" class="button-primary"> Read Blog Posts </a>
					<a
						href="https://www.youtube.com/@jeppzonelifestyle"
						target="_blank"
						rel="noopener noreferrer"
						class="button-secondary"
					>
						Watch on YouTube
					</a>
				</div>
			</div>
		</div>
		<div class="absolute inset-0 -z-10">
			<div
				class="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-pink-500/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
			/>
		</div>
	</section>

	<!-- Latest Blog Posts -->
	<section>
		<div class="container-xl">
			<div class="flex flex-col items-center text-center mb-12">
				<h2 class="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
					Latest Blog Posts
				</h2>
				<p class="text-slate-400 max-w-2xl">
					Dive into my latest articles where I share insights, experiments, and discoveries about
					health and lifestyle optimization.
				</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each data.posts as post}
					<a href={`/posts/${post.slug}`} class="card group">
						<h3 class="text-xl font-semibold mb-2 group-hover:text-violet-400 transition-colors">
							{post.title}
						</h3>
						<p class="text-sm text-slate-400 line-clamp-2">
							Click to read more about {post.title}
						</p>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Tools Section -->
	<section>
		<div class="container-xl">
			<div class="flex flex-col items-center text-center mb-12">
				<h2 class="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
					Useful Tools
				</h2>
				<p class="text-slate-400 max-w-2xl">
					Free calculators and tools to help you on your health and fitness journey.
				</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				<a href="/tools/child-height-calculator" class="card group">
					<h3 class="text-xl font-semibold mb-2 group-hover:text-violet-400 transition-colors">
						Child Height Calculator
					</h3>
					<p class="text-sm text-slate-400">
						Estimate your child's adult height based on parental heights.
					</p>
				</a>
				<a href="/tools/bmi-calculator" class="card group">
					<h3 class="text-xl font-semibold mb-2 group-hover:text-violet-400 transition-colors">
						BMI Calculator
					</h3>
					<p class="text-sm text-slate-400">
						Calculate your Body Mass Index (BMI) and understand what it means for your health.
					</p>
				</a>
			</div>
		</div>
	</section>

	<!-- YouTube Section -->
	<section>
		<div class="container-xl">
			<div class="flex flex-col items-center text-center mb-12">
				<h2 class="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
					Watch on YouTube
				</h2>
				<p class="text-slate-400 max-w-2xl">
					Subscribe to my YouTube channel for in-depth videos about health, fitness, and lifestyle
					optimization.
				</p>
			</div>
			<div class="flex justify-center">
				<a
					href="https://www.youtube.com/@jeppzonelifestyle"
					target="_blank"
					rel="noopener noreferrer"
					class="button-primary"
				>
					Visit YouTube Channel
				</a>
			</div>
		</div>
	</section>
</div>
