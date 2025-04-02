<script lang="ts">
	interface BreadcrumbItem {
		title: string;
		href: string;
	}

	export let items: BreadcrumbItem[] = [];
</script>

<nav class="flex items-center space-x-2 text-sm text-text-muted">
	<a href="/" class="hover:text-primary">Home</a>
	{#each items as item, i}
		<span class="text-text-muted/50">/</span>
		{#if i === items.length - 1}
			<span class="text-text-muted">{item.title}</span>
		{:else}
			<a href={item.href} class="hover:text-primary">{item.title}</a>
		{/if}
	{/each}
</nav>
