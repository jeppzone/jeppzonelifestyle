<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Spinner from '$lib/Spinner.svelte';
	import '../app.css';
</script>

<div class="app bg-gradient-to-r from-slate-950 to-slate-900">
	{#if !browser}
		<div class="mx-auto">
			<Spinner />
		</div>
	{:else}
		<header>
			{#if $page.url.pathname !== '/'}
				<nav class="w-full grid justify-center">
					<a href="/" class="text-white border border-white p-5 rounded-l mt-10">Home</a>
				</nav>
			{/if}
		</header>
		<main>
			<slot />
		</main>
		<footer class="text-pretty pt-10 text-center tracking-tighter">
			<p>
				Disclaimer: The contents of this site is for informational purposes only and should not be
				seen as medical advice
			</p>
		</footer>
	{/if}
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
