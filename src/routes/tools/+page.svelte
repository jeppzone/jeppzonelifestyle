<script>
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import ToolCard from '$lib/components/ToolCard.svelte';

	const tools = [
		{
			href: '/tools/child-height-calculator',
			title: 'Child Height Calculator',
			description: "Predict your child's adult height based on parental heights and other factors.",
			icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />'
		},
		{
			href: '/tools/bmi-calculator',
			title: 'BMI Calculator',
			description:
				'Calculate your Body Mass Index (BMI) to assess your weight relative to your height.',
			icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />'
		},
		{
			href: '/tools/one-rep-max-calculator',
			title: 'One Rep Max Calculator',
			description:
				'Estimate your maximum strength potential using the scientifically validated Brzycki formula.',
			icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />'
		}
	];
</script>

<svelte:head>
	<title>Health & Lifestyle Tools | Jeppzone Lifestyle</title>
	<meta
		name="description"
		content="Free calculators and tools for health metrics including BMI calculator and child height predictor."
	/>
</svelte:head>

<div class="max-w-5xl mx-auto space-y-16">
	<PageHeader
		title="Health & Lifestyle Tools"
		description="Free calculators and tools to help you track and understand your health metrics."
	/>

	<section class="grid gap-8 md:grid-cols-2" class:opacity-0={!browser} in:fade={{ duration: 300 }}>
		{#each tools as tool}
			<ToolCard {...tool} />
		{/each}
	</section>
</div>
