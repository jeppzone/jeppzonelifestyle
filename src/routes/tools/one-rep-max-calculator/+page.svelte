<script lang="ts">
	import { fade } from 'svelte/transition';

	// Popular exercises with their specific coefficients and bodyweight ratios
	const exercises = [
		{
			name: 'Bench Press',
			coefficient: 1.0278,
			reps: 8,
			ratios: {
				beginner: 0.5, // 50% of bodyweight
				intermediate: 0.75, // 75% of bodyweight
				advanced: 1.0, // 100% of bodyweight
				elite: 1.5, // 150% of bodyweight
				worldClass: 2.0 // 200% of bodyweight
			}
		},
		{
			name: 'Squat',
			coefficient: 1.0278,
			reps: 8,
			ratios: {
				beginner: 0.75, // 75% of bodyweight
				intermediate: 1.0, // 100% of bodyweight
				advanced: 1.5, // 150% of bodyweight
				elite: 2.0, // 200% of bodyweight
				worldClass: 2.5 // 250% of bodyweight
			}
		},
		{
			name: 'Deadlift',
			coefficient: 1.0278,
			reps: 8,
			ratios: {
				beginner: 1.0, // 100% of bodyweight
				intermediate: 1.5, // 150% of bodyweight
				advanced: 2.0, // 200% of bodyweight
				elite: 2.5, // 250% of bodyweight
				worldClass: 3.0 // 300% of bodyweight
			}
		},
		{
			name: 'Overhead Press',
			coefficient: 1.0278,
			reps: 8,
			ratios: {
				beginner: 0.4, // 40% of bodyweight
				intermediate: 0.6, // 60% of bodyweight
				advanced: 0.8, // 80% of bodyweight
				elite: 1.0, // 100% of bodyweight
				worldClass: 1.25 // 125% of bodyweight
			}
		},
		{
			name: 'Barbell Row',
			coefficient: 1.0278,
			reps: 8,
			ratios: {
				beginner: 0.5, // 50% of bodyweight
				intermediate: 0.75, // 75% of bodyweight
				advanced: 1.0, // 100% of bodyweight
				elite: 1.25, // 125% of bodyweight
				worldClass: 1.5 // 150% of bodyweight
			}
		},
		{
			name: 'Pull-ups',
			coefficient: 1.0278,
			reps: 8,
			ratios: {
				beginner: 0.0, // Bodyweight
				intermediate: 0.1, // 10% above bodyweight
				advanced: 0.25, // 25% above bodyweight
				elite: 0.5, // 50% above bodyweight
				worldClass: 0.75 // 75% above bodyweight
			}
		},
		{
			name: 'Dips',
			coefficient: 1.0278,
			reps: 8,
			ratios: {
				beginner: 0.0, // Bodyweight
				intermediate: 0.1, // 10% above bodyweight
				advanced: 0.25, // 25% above bodyweight
				elite: 0.5, // 50% above bodyweight
				worldClass: 0.75 // 75% above bodyweight
			}
		},
		{
			name: 'Romanian Deadlift',
			coefficient: 1.0278,
			reps: 8,
			ratios: {
				beginner: 0.75, // 75% of bodyweight
				intermediate: 1.0, // 100% of bodyweight
				advanced: 1.5, // 150% of bodyweight
				elite: 2.0, // 200% of bodyweight
				worldClass: 2.5 // 250% of bodyweight
			}
		},
		{
			name: 'Front Squat',
			coefficient: 1.0278,
			reps: 8,
			ratios: {
				beginner: 0.5, // 50% of bodyweight
				intermediate: 0.75, // 75% of bodyweight
				advanced: 1.25, // 125% of bodyweight
				elite: 1.75, // 175% of bodyweight
				worldClass: 2.25 // 225% of bodyweight
			}
		},
		{
			name: 'Power Clean',
			coefficient: 1.0278,
			reps: 8,
			ratios: {
				beginner: 0.5, // 50% of bodyweight
				intermediate: 0.75, // 75% of bodyweight
				advanced: 1.0, // 100% of bodyweight
				elite: 1.25, // 125% of bodyweight
				worldClass: 1.5 // 150% of bodyweight
			}
		}
	];

	let selectedExercise = exercises[0];
	let weightKg: number | null = null;
	let weightPounds: number | null = null;
	let reps: number | null = null;
	let unit = 'metric';
	let bodyweightKg: number | null = null;
	let bodyweightPounds: number | null = null;

	$: showResult = Boolean(
		(weightKg !== null || weightPounds !== null) &&
			reps !== null &&
			(bodyweightKg !== null || bodyweightPounds !== null)
	);

	$: calculatedOneRepMax = showResult ? calculateOneRepMax() : 0;

	$: bodyweightInKg = unit === 'metric' ? bodyweightKg : toKg(Number(bodyweightPounds));

	$: oneRepMaxRatio = showResult && bodyweightInKg ? calculatedOneRepMax / bodyweightInKg : 0;

	function calculateOneRepMax(): number {
		const weightInKg = unit === 'metric' ? Number(weightKg) : toKg(Number(weightPounds));

		const repsNumber = Number(reps);
		return weightInKg * (36 / (37 - repsNumber));
	}

	/**
	 * @param {{ currentTarget: { value: string; }; }} event
	 */
	function onChangeUnit(event: { currentTarget: { value: string } }) {
		unit = event.currentTarget.value;

		if (unit === 'metric' && weightPounds !== null) {
			weightKg = toKg(weightPounds);
		} else if (unit === 'imperial' && weightKg !== null) {
			weightPounds = toPounds(weightKg);
		}
	}

	/**
	 * @param {number} pounds
	 */
	function toKg(pounds: number): number {
		const kg = pounds * 0.45359237;
		return parseFloat(kg.toFixed(1));
	}

	/**
	 * @param {number} kg
	 */
	function toPounds(kg: number): number {
		const pounds = kg * 2.20462262;
		return parseFloat(pounds.toFixed(1));
	}

	/**
	 * @param {number} oneRepMax
	 */
	function classifyStrength(oneRepMax: number): { category: string; color: string } {
		if (!bodyweightInKg) {
			return { category: 'Unknown', color: 'text-gray-400' };
		}

		const ratio = oneRepMax / bodyweightInKg;
		const { ratios } = selectedExercise;

		if (ratio < ratios.beginner) {
			return { category: 'Beginner', color: 'text-blue-400' };
		}

		if (ratio >= ratios.beginner && ratio < ratios.intermediate) {
			return { category: 'Intermediate', color: 'text-green-400' };
		}

		if (ratio >= ratios.intermediate && ratio < ratios.advanced) {
			return { category: 'Advanced', color: 'text-yellow-400' };
		}

		if (ratio >= ratios.advanced && ratio < ratios.elite) {
			return { category: 'Elite', color: 'text-orange-400' };
		}

		return { category: 'World Class', color: 'text-red-400' };
	}
</script>

<svelte:head>
	<title>One Rep Max Calculator | Jeppzone Lifestyle</title>
	<meta
		name="description"
		content="Calculate your one rep max (1RM) for various exercises using the Brzycki formula. This calculator helps you estimate your maximum strength potential based on your current lifting performance."
	/>
	<meta property="og:title" content="One Rep Max Calculator | Jeppzone Lifestyle" />
	<meta
		property="og:description"
		content="Calculate your one rep max (1RM) for various exercises using the Brzycki formula. This calculator helps you estimate your maximum strength potential based on your current lifting performance."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://jeppzonelifestyle.com/tools/one-rep-max-calculator" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="One Rep Max Calculator | Jeppzone Lifestyle" />
	<meta
		name="twitter:description"
		content="Calculate your one rep max (1RM) for various exercises using the Brzycki formula. This calculator helps you estimate your maximum strength potential based on your current lifting performance."
	/>
	<link rel="canonical" href="https://jeppzonelifestyle.com/tools/one-rep-max-calculator" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebApplication",
			"name": "One Rep Max Calculator",
			"description": "Calculate your one rep max (1RM) for various exercises using the Brzycki formula. This calculator helps you estimate your maximum strength potential based on your current lifting performance.",
			"url": "https://jeppzonelifestyle.com/tools/one-rep-max-calculator",
			"applicationCategory": "HealthApplication",
			"operatingSystem": "Web Browser",
			"offers": {
				"@type": "Offer",
				"price": "0",
				"priceCurrency": "USD"
			}
		}
	</script>
</svelte:head>

<main class="max-w-3xl mx-auto space-y-12">
	<!-- Header -->
	<article class="text-center space-y-6">
		<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-up">
			One Rep Max Calculator
		</h1>
		<div class="space-y-4 animate-slide-up">
			<p class="text-xl text-text-muted">
				Calculate your one rep max using the <a
					href="https://en.wikipedia.org/wiki/One-repetition_maximum#Brzycki_Formula"
					class="text-primary hover:text-primary-dark transition-colors"
					target="_blank"
					rel="noopener noreferrer">Brzycki Formula</a
				>, a scientifically validated method for estimating your maximum strength.
			</p>
			<p class="text-sm text-text-muted italic">
				Note: This calculator provides an estimate of your one rep max. Always use proper form and
				progressive overload when training.
			</p>
		</div>
	</article>

	<!-- Calculator Card -->
	<div class="card space-y-8">
		<!-- Exercise Selection -->
		<div class="space-y-4">
			<h2 class="text-xl font-semibold">Select Exercise</h2>
			<select bind:value={selectedExercise} class="input w-full">
				{#each exercises as exercise}
					<option value={exercise}>{exercise.name}</option>
				{/each}
			</select>
		</div>

		<!-- Unit Selection -->
		<div class="space-y-4">
			<h2 class="text-xl font-semibold">Select Unit System</h2>
			<div class="flex gap-4">
				<label class="flex items-center space-x-2 cursor-pointer">
					<input
						checked={unit === 'metric'}
						on:change={onChangeUnit}
						type="radio"
						name="unit"
						value="metric"
						class="w-4 h-4 text-primary focus:ring-primary border-slate-600 bg-slate-800"
					/>
					<span>Metric</span>
				</label>
				<label class="flex items-center space-x-2 cursor-pointer">
					<input
						checked={unit === 'imperial'}
						on:change={onChangeUnit}
						type="radio"
						name="unit"
						value="imperial"
						class="w-4 h-4 text-primary focus:ring-primary border-slate-600 bg-slate-800"
					/>
					<span>Imperial</span>
				</label>
			</div>
		</div>

		<!-- Bodyweight Input -->
		<div class="space-y-4">
			<h2 class="text-xl font-semibold">Your Bodyweight</h2>
			{#if unit === 'metric'}
				<div class="relative">
					<input
						bind:value={bodyweightKg}
						type="number"
						placeholder="Enter your bodyweight"
						class="input pr-12"
					/>
					<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">kg</span>
				</div>
			{:else}
				<div class="relative">
					<input
						bind:value={bodyweightPounds}
						type="number"
						placeholder="Enter your bodyweight"
						class="input pr-16"
					/>
					<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">lbs</span>
				</div>
			{/if}
		</div>

		<!-- Exercise Weight Input -->
		<div class="space-y-4">
			<h2 class="text-xl font-semibold">Exercise Weight</h2>
			{#if unit === 'metric'}
				<div class="relative">
					<input
						bind:value={weightKg}
						type="number"
						placeholder="Enter exercise weight"
						class="input pr-12"
					/>
					<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">kg</span>
				</div>
			{:else}
				<div class="relative">
					<input
						bind:value={weightPounds}
						type="number"
						placeholder="Enter exercise weight"
						class="input pr-16"
					/>
					<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">lbs</span>
				</div>
			{/if}
		</div>

		<!-- Reps Input -->
		<div class="space-y-4">
			<h2 class="text-xl font-semibold">Number of Reps</h2>
			<div class="relative">
				<input
					bind:value={reps}
					type="number"
					min="1"
					max="12"
					placeholder="Enter number of reps"
					class="input pr-12"
				/>
				<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">reps</span>
			</div>
		</div>

		<!-- Results -->
		<div class="pt-4 border-t border-slate-800">
			<div class="relative min-h-[180px]">
				{#if showResult}
					<div class="absolute inset-0 flex items-center justify-center">
						<div class="w-full max-w-[300px]">
							<div class="space-y-4 text-center" transition:fade|local={{ duration: 200 }}>
								<div class="space-y-2">
									<h3 class="text-4xl font-bold">
										{unit === 'metric'
											? calculatedOneRepMax.toFixed(1)
											: toPounds(calculatedOneRepMax).toFixed(1)}
									</h3>
									<p class="text-sm text-text-muted">
										{unit === 'metric' ? 'kg' : 'lbs'} One Rep Max
									</p>
								</div>
								<div class="space-y-2">
									<p class="text-2xl font-semibold {classifyStrength(calculatedOneRepMax).color}">
										{classifyStrength(calculatedOneRepMax).category}
									</p>
									<p class="text-sm text-text-muted">
										Based on your {selectedExercise.name} performance
										{#if oneRepMaxRatio > 0}
											({(oneRepMaxRatio * 100).toFixed(0)}% of bodyweight)
										{/if}
									</p>
								</div>
							</div>
						</div>
					</div>
				{:else}
					<div class="absolute inset-0 flex items-center justify-center">
						<div class="w-full max-w-[300px]">
							<p class="text-text-muted text-center" transition:fade|local={{ duration: 200 }}>
								Enter your weight and reps to see your estimated one rep max
							</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</main>
