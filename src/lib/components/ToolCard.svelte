<script>
	export let href;
	export let title;
	export let description;
	export let icon;
</script>

<a {href} class="card group hover:border-primary/50 border border-transparent">
	<div class="flex items-center space-x-6">
		<div
			class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
		>
			<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				{@html icon}
			</svg>
		</div>
		<div class="flex-1">
			<h2 class="text-2xl font-semibold group-hover:text-primary transition-colors">
				{title}
			</h2>
			<p class="mt-2 text-text-muted">
				{description}
			</p>
		</div>
	</div>
	<div class="mt-6 flex items-center text-sm text-text-muted">
		<span>Try calculator</span>
		<svg
			class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M17 8l4 4m0 0l-4 4m4-4H3"
			/>
		</svg>
	</div>
</a>
