<script>
	import { DateTime } from 'luxon';

	export let title = '';
	export let date = '';
	// export let author = '';

	$: publishedAt = DateTime.fromISO(date).toLocaleString('en-GB');
</script>

<div class="w-full px-4">
	<div class="mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<!-- <h2 class="text-lg uppercase font-semibold text-gray-900">{tags}</h2> -->
			<h1 class="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
				{title}
			</h1>
			<p class="mx-auto mt-3 max-w-xl text-xl text-white">
				{publishedAt}
			</p>
		</div>
	</div>

	<div
		class="text-pretty prose-p:leading-relaxed prose-p:font-light prose-li:font-light max-w-4xl mx-auto text-white prose-h2:text-white prose-h2:text-5xl prose-h3:text-white prose-h3:text-4xl prose-h4:text-white prose-h4:text-3xl prose-p:text-white text-xl prose-p: prose-strong:text-white prose-strong:font-extrabold prose-a:text-white prose-li:leading-relaxed"
	>
		<slot />
		<nav class="w-full grid justify-center">
			<a href="/" class="text-white border border-white p-5 rounded-l mt-10">Home</a>
		</nav>
	</div>
</div>
