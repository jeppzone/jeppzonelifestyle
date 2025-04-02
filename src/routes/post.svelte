<script lang="ts">
	import { DateTime } from 'luxon';
	import { fade } from 'svelte/transition';

	export let title = '';
	export let date = '';
	export let description = '';

	$: publishedAt = DateTime.fromISO(date).toFormat('MMMM d, yyyy');
</script>

<div class="min-h-screen w-full flex flex-col items-center" transition:fade>
	<div class="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
		<!-- Header -->
		<header class="mb-12 space-y-8 animate-slide-up">
			<div class="space-y-4 text-center">
				<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{title}</h1>
				{#if description}
					<p class="text-xl text-text-muted max-w-2xl mx-auto">{description}</p>
				{/if}
			</div>
			<div class="flex justify-center">
				<time datetime={date} class="text-text-muted">{publishedAt}</time>
			</div>
		</header>

		<!-- Article Content -->
		<div class="w-full flex justify-center">
			<article
				class="prose prose-invert prose-lg
				prose-headings:font-bold prose-headings:tracking-tight
				prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
				prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
				prose-p:text-text-muted prose-p:leading-relaxed
				prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary-dark prose-a:transition-colors
				prose-strong:text-text prose-strong:font-semibold
				prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono
				prose-pre:bg-surface prose-pre:border prose-pre:border-slate-800
				prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-surface/50
				prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto"
			>
				<slot />
			</article>
		</div>

		<!-- Navigation -->
		<nav class="mt-12 pt-8 border-t border-slate-800">
			<div class="flex justify-center items-center">
				<a
					href="/posts"
					class="group inline-flex items-center space-x-2 text-text-muted hover:text-text transition-colors"
				>
					<svg
						class="w-5 h-5 transition-transform group-hover:-translate-x-1"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 16l-4-4m0 0l4-4m-4 4h18"
						/>
					</svg>
					<span>Back to Blog</span>
				</a>
			</div>
		</nav>
	</div>
</div>
