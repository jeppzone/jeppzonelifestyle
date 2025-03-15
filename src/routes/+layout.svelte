<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import Spinner from '$lib/Spinner.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	$: loading = false;
	$: currentPath = $page.url.pathname;

	// Generate breadcrumbs based on current path
	$: breadcrumbs = currentPath
		.split('/')
		.filter(Boolean)
		.reduce(
			(acc, part, index, arr) => {
				const path = '/' + arr.slice(0, index + 1).join('/');
				const label = part
					.split('-')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' ');
				return [...acc, { path, label }];
			},
			[{ path: '/', label: 'Home' }]
		);

	beforeNavigate(() => {
		loading = true;
	});

	// Hook to detect when the navigation has finished
	afterNavigate(() => {
		loading = false;
	});
</script>

<div class="min-h-screen flex flex-col">
	<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:p-4">
		Skip to main content
	</a>

	<header
		class="relative z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm"
		role="banner"
	>
		<div class="container-xl">
			<nav class="flex h-16 items-center justify-between" aria-label="Main navigation">
				<a href="/" class="flex items-center space-x-2" aria-label="Jeppzone Lifestyle Home">
					<span
						class="text-xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent"
					>
						Jeppzone
					</span>
				</a>
				<div class="hidden md:flex md:items-center md:space-x-6">
					<a href="/" class="nav-link" aria-current={currentPath === '/' ? 'page' : undefined}
						>Home</a
					>
					<a
						href="/tools"
						class="nav-link"
						aria-current={currentPath.startsWith('/tools') ? 'page' : undefined}>Tools</a
					>
					<a
						href="/posts"
						class="nav-link"
						aria-current={currentPath.startsWith('/posts') ? 'page' : undefined}>Blog</a
					>
					<a
						href="https://www.youtube.com/@jeppzonelifestyle"
						target="_blank"
						rel="noopener noreferrer"
						class="button-primary"
						aria-label="Visit Jeppzone YouTube Channel (opens in new tab)"
					>
						YouTube Channel
					</a>
				</div>
				<!-- Mobile menu button -->
				<button
					class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500"
					aria-expanded="false"
					aria-controls="mobile-menu"
					aria-label="Toggle mobile menu"
				>
					<span class="sr-only">Open main menu</span>
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</nav>
		</div>
	</header>

	{#if !loading && breadcrumbs.length > 1}
		<div class="container-xl">
			<Breadcrumbs items={breadcrumbs} />
		</div>
	{/if}

	<main id="main-content" class="flex-1 container-xl py-4" role="main">
		{#if loading}
			<div class="flex items-center justify-center min-h-[50vh]" aria-live="polite">
				<Spinner width="w-16" height="h-16" />
				<span class="sr-only">Loading page content...</span>
			</div>
		{:else}
			<slot />
		{/if}
	</main>

	<footer class="border-t border-slate-800 bg-slate-950/80 backdrop-blur-sm" role="contentinfo">
		<div class="container-xl py-12">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<section>
					<h2 class="text-lg font-semibold mb-4">About</h2>
					<p class="text-sm text-slate-400">
						Lifestyle content creator based in Gothenburg, focusing on health, wellness, and
						personal development.
					</p>
				</section>
				<nav aria-label="Footer navigation">
					<h2 class="text-lg font-semibold mb-4">Quick Links</h2>
					<ul class="space-y-2">
						<li>
							<a href="/tools" class="text-sm text-slate-400 hover:text-white transition-colors"
								>Tools</a
							>
						</li>
						<li>
							<a href="/posts" class="text-sm text-slate-400 hover:text-white transition-colors"
								>Blog Posts</a
							>
						</li>
						<li>
							<a
								href="https://www.youtube.com/@jeppzonelifestyle"
								class="text-sm text-slate-400 hover:text-white transition-colors"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Visit YouTube Channel (opens in new tab)"
							>
								YouTube Channel
							</a>
						</li>
					</ul>
				</nav>
				<section>
					<h2 class="text-lg font-semibold mb-4">Disclaimer</h2>
					<p class="text-sm text-slate-400">
						The contents of this site are for informational purposes only and should not be seen as
						medical advice.
					</p>
				</section>
			</div>
			<div class="mt-8 pt-8 border-t border-slate-800">
				<p class="text-sm text-center text-slate-400">
					© {new Date().getFullYear()} Jeppzone Lifestyle. All rights reserved.
				</p>
			</div>
		</div>
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
