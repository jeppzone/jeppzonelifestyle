<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { format } from 'date-fns';

	let wakeTime = format(new Date(), 'HH:mm');
	const sleepCycles = 6;
	let results: { bedtime: Date; cycles: number }[] = [];
	let showResults = false;

	$: {
		if (wakeTime) {
			calculateSleepTimes();
		}
	}

	function calculateSleepTimes() {
		results = [];
		const cycleDuration = 90; // minutes per sleep cycle
		const fallAsleepTime = 15; // average time to fall asleep in minutes

		// Create a Date object for the wake time in local timezone
		const [hours, minutes] = wakeTime.split(':').map(Number);
		const wakeDate = new Date();
		wakeDate.setHours(hours, minutes, 0, 0);

		// Convert to UTC for calculations
		const wakeDateUTC = new Date(
			Date.UTC(
				wakeDate.getUTCFullYear(),
				wakeDate.getUTCMonth(),
				wakeDate.getUTCDate(),
				wakeDate.getHours(),
				wakeDate.getMinutes()
			)
		);

		// Calculate 3 different bedtime options
		for (let i = 0; i < 3; i++) {
			const cycles = sleepCycles - i;
			const bedtimeUTC = new Date(wakeDateUTC);
			// Calculate total minutes to subtract (cycles * 90 + 15 minutes to fall asleep)
			const minutesToSubtract = cycles * cycleDuration + fallAsleepTime;
			bedtimeUTC.setTime(bedtimeUTC.getTime() - minutesToSubtract * 60 * 1000);

			// If the bedtime is after the wake time, it means we need to go back one day
			if (bedtimeUTC > wakeDateUTC) {
				bedtimeUTC.setUTCDate(bedtimeUTC.getUTCDate() - 1);
			}

			// Convert back to local time for display
			const bedtime = new Date(bedtimeUTC.getTime());
			results.push({ bedtime, cycles });
		}
	}

	function formatTime(timeStr: string): string {
		const [hours, minutes] = timeStr.split(':').map(Number);
		const date = new Date();
		date.setHours(hours, minutes, 0, 0);
		return format(date, 'h:mm a');
	}

	function getSleepQuality(cycles: number): string {
		if (cycles >= 6) return 'Optimal';
		if (cycles >= 5) return 'Good';
		return 'Minimum';
	}

	function getSleepQualityColor(cycles: number): string {
		if (cycles >= 6) return 'text-green-500';
		if (cycles >= 5) return 'text-yellow-500';
		return 'text-red-500';
	}
</script>

<div class="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
	<h1 class="text-3xl font-bold text-white mb-6">Sleep Cycle Calculator</h1>
	<p class="text-gray-300 mb-8">
		Calculate your optimal bedtime based on sleep cycles. Each sleep cycle lasts approximately 90
		minutes, and most adults need 5-6 cycles for optimal rest.
	</p>

	<div class="space-y-6">
		<div>
			<label for="wakeTime" class="block text-sm font-medium text-gray-300 mb-2">
				When do you need to wake up?
			</label>
			<input
				type="time"
				id="wakeTime"
				bind:value={wakeTime}
				class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:invert"
			/>
		</div>
	</div>

	{#if results.length > 0}
		<div class="mt-8 space-y-4" transition:fade={{ duration: 300 }}>
			<h2 class="text-xl font-semibold text-white">Recommended Bedtimes</h2>
			<p class="text-sm text-gray-300 mb-4">
				Based on your wake-up time of {formatTime(wakeTime)}
			</p>

			{#each results as result, i}
				<div class="p-4 bg-gray-800 rounded-lg" transition:slide={{ delay: i * 100 }}>
					<div class="flex justify-between items-center">
						<div>
							<p class="text-lg font-medium text-white">
								{formatTime(result.bedtime.toISOString().split('T')[1])}
							</p>
							<p class="text-sm text-gray-300">
								{result.cycles} sleep cycles
							</p>
						</div>
						<div class="text-right">
							<p class="text-sm font-medium {getSleepQualityColor(result.cycles)}">
								{getSleepQuality(result.cycles)}
							</p>
							<p class="text-sm text-gray-300">
								{result.cycles * 1.5} hours
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<div class="mt-8 p-4 bg-blue-900/50 rounded-lg">
		<h3 class="text-lg font-semibold text-blue-200 mb-2">Tips for Better Sleep</h3>
		<ul class="list-disc list-inside space-y-2 text-blue-100">
			<li>Try to maintain consistent sleep and wake times</li>
			<li>Create a relaxing bedtime routine</li>
			<li>Avoid screens and bright lights 1-2 hours before bed</li>
			<li>Keep your bedroom cool and dark</li>
			<li>Avoid caffeine and heavy meals close to bedtime</li>
		</ul>
	</div>
</div>
