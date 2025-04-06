<script lang="ts">
	import { page } from '$app/stores';

	$: title = $page.status === 404 ? 'Page Not Found' : 'Error';
	$: description =
		$page.status === 404
			? "The page you're looking for doesn't exist. Here are some helpful links to get you back on track:"
			: $page.error?.message ?? 'Something went wrong';
</script>

<div class="min-h-screen flex flex-col items-center justify-center p-4">
	<div class="max-w-2xl text-center">
		<h1 class="text-6xl font-bold text-white mb-4">{$page.status}</h1>
		<h2 class="text-2xl font-semibold text-gray-300 mb-6">{title}</h2>
		<p class="text-gray-400 mb-8">
			{description}
		</p>
		<div class="space-y-4">
			<a
				href="/"
				class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
			>
				Return to Home
			</a>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
				<a
					href="/tools"
					class="p-4 bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
				>
					<h3 class="font-semibold text-white">Health Tools</h3>
					<p class="text-sm text-gray-400">Explore our health and wellness calculators</p>
				</a>
				<a
					href="/posts"
					class="p-4 bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
				>
					<h3 class="font-semibold text-white">Blog Posts</h3>
					<p class="text-sm text-gray-400">Read our latest health and wellness articles</p>
				</a>
				<a
					href="/topics"
					class="p-4 bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
				>
					<h3 class="font-semibold text-white">Topics</h3>
					<p class="text-sm text-gray-400">Browse our health and wellness topics</p>
				</a>
			</div>
		</div>
	</div>
</div>
