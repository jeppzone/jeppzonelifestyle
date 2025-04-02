<script>
	import { page } from '$app/stores';
	import '../app.css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import Spinner from '$lib/Spinner.svelte';
	import { fade } from 'svelte/transition';
	import SEO from '$lib/components/SEO.svelte';

	$: loading = false;
	$: isHome = $page.url.pathname === '/';
	$: isBlogPost = $page.url.pathname.startsWith('/posts/') && $page.url.pathname !== '/posts';
	$: mobileMenuOpen = false;

	// Simple default SEO values that will be overridden by specific pages when needed
	$: pageTitle = isHome ? 'JeppzoneLifestyle - Health and Fitness Tools' : 'JeppzoneLifestyle';

	$: pageDescription =
		'Discover health and fitness tools, calculators, and informative articles to help you on your wellness journey.';

	beforeNavigate(() => {
		loading = true;
	});

	afterNavigate(() => {
		loading = false;
	});
</script>

<SEO title={pageTitle} description={pageDescription} />

<div class="min-h-screen bg-gradient-to-br from-background to-surface text-text">
	<header
		class="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-slate-800"
	>
		<nav class="sm:container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<a
					href="/"
					class="text-2xl font-bold text-primary hover:text-primary-dark transition-colors"
				>
					JeppzoneLifestyle
				</a>

				<div class="hidden md:flex items-center space-x-8">
					{#if !isBlogPost}
						<a
							href="/"
							class="nav-link {isHome ? 'text-primary' : 'text-text-muted hover:text-text'}">Home</a
						>
					{/if}
					<a
						href="/tools"
						class="nav-link {$page.url.pathname.startsWith('/tools')
							? 'text-primary'
							: 'text-text-muted hover:text-text'}">Tools</a
					>
					<a
						href="/topics"
						class="nav-link {$page.url.pathname.startsWith('/topics')
							? 'text-primary'
							: 'text-text-muted hover:text-text'}">Topics</a
					>
					<a
						href="/posts"
						class="nav-link {$page.url.pathname.startsWith('/posts')
							? 'text-primary'
							: 'text-text-muted hover:text-text'}">Blog</a
					>
				</div>

				<!-- Mobile menu button -->
				<button
					class="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
					aria-label="Menu"
					on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
		</nav>
	</header>

	<!-- Mobile menu -->
	{#if mobileMenuOpen}
		<div
			class="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden animate-fade-in"
			on:click={() => (mobileMenuOpen = false)}
		>
			<nav class="flex flex-col items-center justify-center h-full space-y-8">
				{#if !isBlogPost}
					<a
						href="/"
						class="text-2xl {isHome ? 'text-primary' : 'text-text-muted hover:text-text'}"
						on:click={() => (mobileMenuOpen = false)}
					>
						Home
					</a>
				{/if}
				<a
					href="/tools"
					class="text-2xl {$page.url.pathname.startsWith('/tools')
						? 'text-primary'
						: 'text-text-muted hover:text-text'}"
					on:click={() => (mobileMenuOpen = false)}
				>
					Tools
				</a>
				<a
					href="/topics"
					class="text-2xl {$page.url.pathname.startsWith('/topics')
						? 'text-primary'
						: 'text-text-muted hover:text-text'}"
					on:click={() => (mobileMenuOpen = false)}
				>
					Topics
				</a>
				<a
					href="/posts"
					class="text-2xl {$page.url.pathname.startsWith('/posts')
						? 'text-primary'
						: 'text-text-muted hover:text-text'}"
					on:click={() => (mobileMenuOpen = false)}
				>
					Blog
				</a>
			</nav>
		</div>
	{/if}

	<main class="sm:container mx-auto px-4 pt-24 pb-16 min-h-screen">
		{#if loading}
			<div class="flex justify-center items-center h-[50vh]">
				<Spinner width="w-16" height="h-16" />
				<span class="sr-only">Loading...</span>
			</div>
		{:else}
			{#key $page.url.pathname}
				<div transition:fade={{ duration: 150 }}>
					<slot />
				</div>
			{/key}
		{/if}
	</main>

	<footer class="bg-surface/50 border-t border-slate-800">
		<div class="sm:container mx-auto px-4 py-8">
			<p class="text-center text-text-muted">
				Disclaimer: The contents of this site is for informational purposes only and should not be
				seen as medical advice
			</p>
		</div>
	</footer>
</div>

<style>
	.nav-link {
		@apply relative font-medium transition-colors duration-200;
	}

	.nav-link::after {
		@apply content-[''] absolute left-0 right-0 bottom-[-2px] h-[2px] bg-primary scale-x-0 transition-transform duration-200;
	}

	.nav-link:hover::after {
		@apply scale-x-100;
	}
</style>
