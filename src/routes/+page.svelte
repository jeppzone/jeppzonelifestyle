<script>
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	export let data;
</script>

<svelte:head>
	<title>Lifestyle Content Creator | Jeppzone Lifestyle</title>
	<meta
		name="description"
		content="Lifestyle content creator based in Gothenburg. Hi! I'm Jesper Olsson Laine. I write and produce videos about all things health and lifestyle"
	/>
</svelte:head>

{#if browser}
	<div class="space-y-24" in:fade={{ duration: 300 }}>
		<!-- Hero Section -->
		<section class="relative overflow-hidden">
			<div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl" />
			<div class="relative py-20 px-6 md:px-12">
				<div class="max-w-4xl mx-auto text-center space-y-8">
					<h1 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-slide-up">
						Explore Health & Lifestyle
						<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
							>Together</span
						>
					</h1>
					<p class="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto animate-slide-up">
						Hi! I'm Jesper Olsson Laine, a health enthusiast and lifestyle content creator based in
						Gothenburg. Join me on my journey of health experimentation and discovery.
					</p>
				</div>
			</div>
		</section>

		<!-- Topics Section -->
		<section class="space-y-12">
			<div class="text-center space-y-4">
				<h2 class="text-3xl md:text-4xl font-bold tracking-tight">Explore Topics</h2>
				<p class="text-text-muted">Dive deep into specific health and lifestyle areas</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				{#each [{ title: 'Sleep Health', slug: 'sleep-health', description: 'Learn about sleep science, sleep disorders, and how to improve your sleep quality.' }, { title: 'Fitness & Recovery', slug: 'fitness-recovery', description: 'Explore fitness training, injury recovery, and physical rehabilitation.' }, { title: 'Nutrition & Diet', slug: 'nutrition-diet', description: 'Discover different dietary approaches and their impact on health.' }, { title: 'Health Metrics & Monitoring', slug: 'health-metrics', description: 'Understand and track your health metrics for better wellness.' }, { title: 'Mental Health & Personal Growth', slug: 'mental-health', description: 'Explore mental wellness, personal development, and emotional health.' }] as topic}
					<a
						href="/topics/{topic.slug}"
						class="card group hover:border-primary/50 border border-transparent"
					>
						<h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
							{topic.title}
						</h3>
						<p class="mt-2 text-text-muted">{topic.description}</p>
						<div class="mt-4 flex items-center text-sm text-text-muted">
							<span>Explore topic</span>
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
			</div>
		</section>

		<!-- Blog Posts Section -->
		<section class="space-y-12">
			<div class="text-center space-y-4">
				<h2 class="text-3xl md:text-4xl font-bold tracking-tight">Latest Blog Posts</h2>
				<p class="text-text-muted">Explore my thoughts and experiences on health and lifestyle</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
			</div>
		</section>

		<!-- Tools Section -->
		<section class="space-y-12">
			<div class="text-center space-y-4">
				<h2 class="text-3xl md:text-4xl font-bold tracking-tight">Useful Tools</h2>
				<p class="text-text-muted">Calculate and track your health metrics</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				<a
					href="/tools/child-height-calculator"
					class="card group hover:border-primary/50 border border-transparent"
				>
					<div class="flex items-center justify-between">
						<div>
							<h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
								Child Height Calculator
							</h3>
							<p class="mt-2 text-text-muted">
								Predict your child's adult height based on parental heights
							</p>
						</div>
						<div
							class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
						>
							<svg
								class="w-6 h-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
								/>
							</svg>
						</div>
					</div>
				</a>
				<a
					href="/tools/bmi-calculator"
					class="card group hover:border-primary/50 border border-transparent"
				>
					<div class="flex items-center justify-between">
						<div>
							<h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
								BMI Calculator
							</h3>
							<p class="mt-2 text-text-muted">Calculate your Body Mass Index</p>
						</div>
						<div
							class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
						>
							<svg
								class="w-6 h-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								/>
							</svg>
						</div>
					</div>
				</a>
				<a
					href="/tools/one-rep-max-calculator"
					class="card group hover:border-primary/50 border border-transparent"
				>
					<div class="flex items-center justify-between">
						<div>
							<h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
								One Rep Max Calculator
							</h3>
							<p class="mt-2 text-text-muted">Estimate your maximum strength potential</p>
						</div>
						<div
							class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
						>
							<svg
								class="w-6 h-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
								/>
							</svg>
						</div>
					</div>
				</a>
				<a
					href="/tools/sleep-cycle-calculator"
					class="card group hover:border-primary/50 border border-transparent"
				>
					<div class="flex items-center justify-between">
						<div>
							<h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
								Sleep Cycle Calculator
							</h3>
							<p class="mt-2 text-text-muted">
								Calculate your optimal bedtime based on sleep cycles
							</p>
						</div>
						<div
							class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
						>
							<svg
								class="w-6 h-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
								/>
							</svg>
						</div>
					</div>
				</a>
			</div>
		</section>

		<!-- Social Section -->
		<section class="space-y-12">
			<div class="text-center space-y-4">
				<h2 class="text-3xl md:text-4xl font-bold tracking-tight">Connect With Me</h2>
				<p class="text-text-muted">Follow my journey on social media</p>
			</div>
			<div class="max-w-xl mx-auto">
				<a
					href="https://www.youtube.com/@jeppzonelifestyle"
					class="card group hover:border-primary/50 border border-transparent flex items-center justify-between"
				>
					<div class="flex items-center space-x-4">
						<div
							class="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors"
						>
							<svg
								class="w-6 h-6 text-red-500"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
								/>
							</svg>
						</div>
						<div class="flex-1">
							<h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
								YouTube Channel
							</h3>
							<p class="text-text-muted">Watch my latest health and lifestyle videos</p>
						</div>
						<svg
							class="w-5 h-5 text-text-muted transition-transform group-hover:translate-x-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</div>
				</a>
			</div>
		</section>
	</div>
{:else}
	<div class="space-y-24">
		<!-- Same content without transitions for server-side rendering -->
		<section class="relative overflow-hidden">
			<div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl" />
			<div class="relative py-20 px-6 md:px-12">
				<div class="max-w-4xl mx-auto text-center space-y-8">
					<h1 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-slide-up">
						Explore Health & Lifestyle
						<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
							>Together</span
						>
					</h1>
					<p class="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto animate-slide-up">
						Hi! I'm Jesper Olsson Laine, a health enthusiast and lifestyle content creator based in
						Gothenburg. Join me on my journey of health experimentation and discovery.
					</p>
				</div>
			</div>
		</section>

		<!-- Topics Section -->
		<section class="space-y-12">
			<div class="text-center space-y-4">
				<h2 class="text-3xl md:text-4xl font-bold tracking-tight">Explore Topics</h2>
				<p class="text-text-muted">Dive deep into specific health and lifestyle areas</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				{#each [{ title: 'Sleep Health', slug: 'sleep-health', description: 'Learn about sleep science, sleep disorders, and how to improve your sleep quality.' }, { title: 'Fitness & Recovery', slug: 'fitness-recovery', description: 'Explore fitness training, injury recovery, and physical rehabilitation.' }, { title: 'Nutrition & Diet', slug: 'nutrition-diet', description: 'Discover different dietary approaches and their impact on health.' }, { title: 'Health Metrics & Monitoring', slug: 'health-metrics', description: 'Understand and track your health metrics for better wellness.' }, { title: 'Mental Health & Personal Growth', slug: 'mental-health', description: 'Explore mental wellness, personal development, and emotional health.' }] as topic}
					<a
						href="/topics/{topic.slug}"
						class="card group hover:border-primary/50 border border-transparent"
					>
						<h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
							{topic.title}
						</h3>
						<p class="mt-2 text-text-muted">{topic.description}</p>
						<div class="mt-4 flex items-center text-sm text-text-muted">
							<span>Explore topic</span>
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
			</div>
		</section>

		<!-- Blog Posts Section -->
		<section class="space-y-12">
			<div class="text-center space-y-4">
				<h2 class="text-3xl md:text-4xl font-bold tracking-tight">Latest Blog Posts</h2>
				<p class="text-text-muted">Explore my thoughts and experiences on health and lifestyle</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
			</div>
		</section>

		<!-- Tools Section -->
		<section class="space-y-12">
			<div class="text-center space-y-4">
				<h2 class="text-3xl md:text-4xl font-bold tracking-tight">Useful Tools</h2>
				<p class="text-text-muted">Calculate and track your health metrics</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				<a
					href="/tools/child-height-calculator"
					class="card group hover:border-primary/50 border border-transparent"
				>
					<div class="flex items-center justify-between">
						<div>
							<h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
								Child Height Calculator
							</h3>
							<p class="mt-2 text-text-muted">
								Predict your child's adult height based on parental heights
							</p>
						</div>
						<div
							class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
						>
							<svg
								class="w-6 h-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
								/>
							</svg>
						</div>
					</div>
				</a>
				<a
					href="/tools/bmi-calculator"
					class="card group hover:border-primary/50 border border-transparent"
				>
					<div class="flex items-center justify-between">
						<div>
							<h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
								BMI Calculator
							</h3>
							<p class="mt-2 text-text-muted">Calculate your Body Mass Index</p>
						</div>
						<div
							class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
						>
							<svg
								class="w-6 h-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								/>
							</svg>
						</div>
					</div>
				</a>
				<a
					href="/tools/one-rep-max-calculator"
					class="card group hover:border-primary/50 border border-transparent"
				>
					<div class="flex items-center justify-between">
						<div>
							<h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
								One Rep Max Calculator
							</h3>
							<p class="mt-2 text-text-muted">Estimate your maximum strength potential</p>
						</div>
						<div
							class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
						>
							<svg
								class="w-6 h-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
								/>
							</svg>
						</div>
					</div>
				</a>
				<a
					href="/tools/sleep-cycle-calculator"
					class="card group hover:border-primary/50 border border-transparent"
				>
					<div class="flex items-center justify-between">
						<div>
							<h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
								Sleep Cycle Calculator
							</h3>
							<p class="mt-2 text-text-muted">
								Calculate your optimal bedtime based on sleep cycles
							</p>
						</div>
						<div
							class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
						>
							<svg
								class="w-6 h-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
								/>
							</svg>
						</div>
					</div>
				</a>
			</div>
		</section>

		<!-- Social Section -->
		<section class="space-y-12">
			<div class="text-center space-y-4">
				<h2 class="text-3xl md:text-4xl font-bold tracking-tight">Connect With Me</h2>
				<p class="text-text-muted">Follow my journey on social media</p>
			</div>
			<div class="max-w-xl mx-auto">
				<a
					href="https://www.youtube.com/@jeppzonelifestyle"
					class="card group hover:border-primary/50 border border-transparent flex items-center justify-between"
				>
					<div class="flex items-center space-x-4">
						<div
							class="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors"
						>
							<svg
								class="w-6 h-6 text-red-500"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
								/>
							</svg>
						</div>
						<div class="flex-1">
							<h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
								YouTube Channel
							</h3>
							<p class="text-text-muted">Watch my latest health and lifestyle videos</p>
						</div>
						<svg
							class="w-5 h-5 text-text-muted transition-transform group-hover:translate-x-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</div>
				</a>
			</div>
		</section>
	</div>
{/if}
