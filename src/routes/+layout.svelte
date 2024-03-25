<script>
	import { page } from '$app/stores';
	import '../app.css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import Spinner from '$lib/Spinner.svelte';

	$: loading = false;

	beforeNavigate(() => {
		loading = true;
	});

	// Hook to detect when the navigation has finished
	afterNavigate(() => {
		loading = false;
	});
</script>

<div class="app bg-gradient-to-r from-slate-950 to-slate-900">
	<header>
		{#if $page.url.pathname !== '/'}
			<nav class="w-full grid justify-center">
				<div class="grid grid-cols-3 gap-4 text-center">
					<a href="/" class="text-white border border-white px-6 py-2 rounded-l mt-10">Home</a>
					<a href="/tools" class="text-white border border-white px-6 py-2 rounded-l mt-10">Tools</a
					>
					<a href="/posts" class="text-white border border-white px-6 py-2 rounded-l mt-10"
						>Blog Posts</a
					>
				</div>
			</nav>
		{/if}
	</header>
	<main>
		{#if loading}
			<div role="status" class="flex justify-center align-middle h-full">
				<Spinner width="w-16" height="h-16" />
				<span class="sr-only">Loading...</span>
			</div>
		{:else}
			<slot />
		{/if}
	</main>
	<footer class="text-pretty pt-10 text-center tracking-tighter">
		<p>
			Disclaimer: The contents of this site is for informational purposes only and should not be
			seen as medical advice
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
