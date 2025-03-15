<script lang="ts">
	import { formatDate } from '$lib/utils';
	import BlogPostMeta from '$lib/components/BlogPostMeta.svelte';
	import OptimizedImage from '$lib/components/OptimizedImage.svelte';

	export let data;
</script>

<BlogPostMeta post={data.meta} />

<article class="max-w-4xl mx-auto px-4 py-8" itemscope itemtype="https://schema.org/BlogPosting">
	{#if data.meta}
		<header class="text-center mb-12">
			<h1
				class="md:text-6xl sm:text-5xl text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4 pb-1"
				itemprop="headline"
			>
				{data.meta.title}
			</h1>
			{#if data.meta.date}
				<div class="text-gray-400 text-sm">
					<time datetime={data.meta.date} itemprop="datePublished">
						{formatDate(data.meta.date)}
					</time>
					{#if data.meta.updatedAt && data.meta.updatedAt !== data.meta.date}
						<span class="mx-2">•</span>
						<time datetime={data.meta.updatedAt} itemprop="dateModified">
							Updated {formatDate(data.meta.updatedAt)}
						</time>
					{/if}
				</div>
			{/if}
			{#if data.meta.description}
				<p class="text-gray-300 text-lg mt-4 max-w-2xl mx-auto" itemprop="description">
					{data.meta.description}
				</p>
			{/if}
			{#if data.meta.image}
				<div class="mt-8">
					<OptimizedImage
						src={data.meta.image}
						alt={data.meta.title}
						className="rounded-xl shadow-lg mx-auto"
						loading="eager"
					/>
				</div>
			{/if}
		</header>
	{/if}

	<div
		class="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10"
		itemprop="articleBody"
	>
		<div
			class="prose prose-invert max-w-none prose-headings:text-gray-100 prose-p:text-gray-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-gray-200 prose-code:text-blue-300 prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-img:rounded-xl"
		>
			<svelte:component this={data.content} />
		</div>

		<nav class="mt-12 pt-8 border-t border-white/10">
			<a
				href="/posts"
				class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
				aria-label="Back to all blog posts"
			>
				<span class="transform group-hover:-translate-x-1 transition-transform duration-300">←</span
				>
				<span class="ml-2">Back to all posts</span>
			</a>
		</nav>
	</div>
</article>

<style>
	/* Additional styling for code blocks and inline code */
	:global(pre) {
		padding: 1.5rem !important;
		margin: 2rem 0 !important;
		overflow-x: auto;
	}

	:global(code) {
		background: rgba(255, 255, 255, 0.1) !important;
		padding: 0.2em 0.4em !important;
		border-radius: 0.25rem !important;
		font-size: 0.875em !important;
	}

	:global(pre code) {
		background: transparent !important;
		padding: 0 !important;
	}

	/* Improve table styling */
	:global(table) {
		width: 100%;
		border-collapse: collapse;
	}

	:global(th, td) {
		padding: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	:global(th) {
		background: rgba(255, 255, 255, 0.05);
	}

	/* Improve blockquote styling */
	:global(blockquote) {
		border-left-color: rgba(255, 255, 255, 0.2) !important;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 0.5rem;
		padding: 1rem 1.5rem !important;
		margin: 2rem 0 !important;
	}

	/* Improve list styling */
	:global(ul, ol) {
		padding-left: 1.5rem !important;
	}

	:global(li) {
		margin-top: 0.5rem !important;
		margin-bottom: 0.5rem !important;
	}

	/* Improve image accessibility */
	:global(img) {
		max-width: 100%;
		height: auto;
		display: block;
		margin: 2rem auto;
	}

	:global(figure) {
		margin: 2rem 0;
	}

	:global(figcaption) {
		text-align: center;
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.6);
		margin-top: 0.5rem;
	}
</style>
