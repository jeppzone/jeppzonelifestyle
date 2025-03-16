<script>
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
</script>

<svelte:head>
	<title>Health & Lifestyle Tools | Jeppzone Lifestyle</title>
	<meta
		name="description"
		content="Free calculators and tools for health metrics including BMI calculator and child height predictor."
	/>
</svelte:head>

<div class="max-w-5xl mx-auto space-y-16">
	<!-- Header -->
	<section class="text-center space-y-6">
		<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-up">
			Health & Lifestyle Tools
		</h1>
		<p class="text-xl text-text-muted max-w-2xl mx-auto animate-slide-up">
			Free calculators and tools to help you track and understand your health metrics.
		</p>
	</section>

	<!-- Tools Grid -->
	<section class="grid gap-8 md:grid-cols-2" class:opacity-0={!browser} in:fade={{ duration: 300 }}>
		<a
			href="/tools/child-height-calculator"
			class="card group hover:border-primary/50 border border-transparent"
		>
			<div class="flex items-center space-x-6">
				<div
					class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
				>
					<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
						/>
					</svg>
				</div>
				<div class="flex-1">
					<h2 class="text-2xl font-semibold group-hover:text-primary transition-colors">
						Child Height Calculator
					</h2>
					<p class="mt-2 text-text-muted">
						Predict your child's adult height based on parental heights and other factors.
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

		<a
			href="/tools/bmi-calculator"
			class="card group hover:border-primary/50 border border-transparent"
		>
			<div class="flex items-center space-x-6">
				<div
					class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
				>
					<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
						/>
					</svg>
				</div>
				<div class="flex-1">
					<h2 class="text-2xl font-semibold group-hover:text-primary transition-colors">
						BMI Calculator
					</h2>
					<p class="mt-2 text-text-muted">
						Calculate your Body Mass Index (BMI) to assess your weight relative to your height.
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
	</section>
</div>
