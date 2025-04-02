<script lang="ts">
	interface Post {
		slug: string;
		title: string;
		description?: string;
	}

	interface Tool {
		slug: string;
		title: string;
		description?: string;
	}

	export let relatedPosts: Post[] = [];
	export let relatedTools: Tool[] = [];
</script>

<div class="space-y-8">
	{#if relatedPosts.length > 0}
		<div>
			<h3 class="text-xl font-semibold mb-4">Related Posts</h3>
			<div class="grid gap-4 md:grid-cols-2">
				{#each relatedPosts as post}
					<a
						href={`/posts/${post.slug}`}
						class="card group hover:border-primary/50 border border-transparent"
					>
						<h4 class="font-medium group-hover:text-primary transition-colors">
							{post.title}
						</h4>
						{#if post.description}
							<p class="mt-1 text-sm text-text-muted line-clamp-2">{post.description}</p>
						{/if}
					</a>
				{/each}
			</div>
		</div>
	{/if}

	{#if relatedTools.length > 0}
		<div>
			<h3 class="text-xl font-semibold mb-4">Related Tools</h3>
			<div class="grid gap-4 md:grid-cols-2">
				{#each relatedTools as tool}
					<a
						href={`/tools/${tool.slug}`}
						class="card group hover:border-primary/50 border border-transparent"
					>
						<h4 class="font-medium group-hover:text-primary transition-colors">
							{tool.title}
						</h4>
						{#if tool.description}
							<p class="mt-1 text-sm text-text-muted line-clamp-2">{tool.description}</p>
						{/if}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div>
