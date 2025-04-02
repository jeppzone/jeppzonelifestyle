<script lang="ts">
	import SleepCycleCalculator from '$lib/components/tools/SleepCycleCalculator.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Sleep Cycle Calculator | Jeppzone Lifestyle</title>
	<meta
		name="description"
		content="Calculate your optimal bedtime based on sleep cycles. Get personalized sleep recommendations and tips for better sleep quality."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<SleepCycleCalculator />
</div>
