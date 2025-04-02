<script>
	import { page } from '$app/stores';
</script>

<nav class="flex items-center space-x-6">
	<a
		href="/"
		class="text-lg font-medium hover:text-primary transition-colors {$page.url.pathname === '/'
			? 'text-primary'
			: ''}"
	>
		Home
	</a>
	<a
		href="/topics"
		class="text-lg font-medium hover:text-primary transition-colors {$page.url.pathname.startsWith(
			'/topics'
		)
			? 'text-primary'
			: ''}"
	>
		Topics
	</a>
	<a
		href="/posts"
		class="text-lg font-medium hover:text-primary transition-colors {$page.url.pathname.startsWith(
			'/posts'
		)
			? 'text-primary'
			: ''}"
	>
		Blog
	</a>
	<a
		href="/tools"
		class="text-lg font-medium hover:text-primary transition-colors {$page.url.pathname.startsWith(
			'/tools'
		)
			? 'text-primary'
			: ''}"
	>
		Tools
	</a>
</nav>
