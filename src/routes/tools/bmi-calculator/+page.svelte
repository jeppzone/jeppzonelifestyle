<script lang="ts">
	import { fade } from 'svelte/transition';

	let heightCm: number | null = null;
	let heightFt: number | null = null;
	let heightIn: number | null = null;
	let weightKg: number | null = null;
	let weightPounds: number | null = null;
	let unit = 'metric';

	$: showResult =
		(weightKg !== null && heightCm !== null) ||
		(weightPounds !== null && heightFt !== null && heightIn !== null);

	$: calculatedBmi = showResult
		? unit === 'metric'
			? Number(weightKg) / Math.pow(Number(heightCm) / 100, 2)
			: toKg(Number(weightPounds)) / Math.pow(toCm(Number(heightFt), Number(heightIn)) / 100, 2)
		: 0;

	/**
	 * @param {{ currentTarget: { value: string; }; }} event
	 */
	function onChangeUnit(event: { currentTarget: { value: string } }) {
		unit = event.currentTarget.value;
		if (unit === 'metric') {
			if (heightFt !== null && heightIn !== null) {
				heightCm = toCm(heightFt, heightIn);
			}
			if (weightPounds !== null) {
				weightKg = toKg(weightPounds);
			}
		} else if (unit === 'imperial') {
			if (heightCm !== null) {
				const feetAndInches = toFeet(heightCm);
				heightFt = feetAndInches.feet;
				heightIn = feetAndInches.inches;
			}
			if (weightKg !== null) {
				weightPounds = toPounds(weightKg);
			}
		}
	}
	/**
	 * @param {number} cm
	 */
	function toFeet(cm: number): { feet: number; inches: number } {
		var realFeet = (cm * 0.3937) / 12;
		var feet = Math.floor(realFeet);
		var inches = Math.round((realFeet - feet) * 12);
		return { feet, inches };
	}

	/**
	 * @param {number} feet
	 * @param {number} inches
	 */
	function toCm(feet: number, inches: number): number {
		const totalInches = feet * 12 + Number(inches);
		const centimeters = Math.round(totalInches * 2.54);
		return centimeters;
	}

	/**
	 * @param {number} pounds
	 */
	function toKg(pounds: number): number {
		// 1 pound is approximately equal to 0.45359237 kilograms
		return parseFloat((pounds * 0.45359237).toFixed(1));
	}

	/**
	 * @param {number} kg
	 */
	function toPounds(kg: number): number {
		// 1 kilogram is approximately equal to 2.20462262 pounds
		return parseFloat((kg * 2.20462262).toFixed(1));
	}

	/**
	 * @param {number} bmi
	 */
	function classifyBMI(bmi: number): { category: string; color: string } {
		if (bmi < 18.5) {
			return { category: 'Underweight', color: 'text-yellow-400' };
		} else if (bmi >= 18.5 && bmi < 25) {
			return { category: 'Normal weight', color: 'text-green-400' };
		} else if (bmi >= 25 && bmi < 30) {
			return { category: 'Overweight', color: 'text-yellow-400' };
		} else if (bmi >= 30 && bmi < 35) {
			return { category: 'Obese (Class 1)', color: 'text-orange-400' };
		} else if (bmi >= 35 && bmi < 40) {
			return { category: 'Obese (Class 2)', color: 'text-red-400' };
		} else {
			return { category: 'Obese (Class 3)', color: 'text-red-500' };
		}
	}
</script>

<svelte:head>
	<title>BMI Calculator | Jeppzone Lifestyle</title>
	<meta
		name="description"
		content="Calculate your Body Mass Index (BMI) with this simple calculator. While BMI is not a complete measure of health, it can be a useful screening tool."
	/>
</svelte:head>

<div class="max-w-3xl mx-auto space-y-12">
	<!-- Header -->
	<section class="text-center space-y-6">
		<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-up">
			BMI Calculator
		</h1>
		<div class="space-y-4 animate-slide-up">
			<p class="text-xl text-text-muted">
				Calculate your Body Mass Index using your height and weight according to the <a
					href="https://www.cdc.gov/obesity/basics/adult-defining.html"
					class="text-primary hover:text-primary-dark transition-colors"
					target="_blank"
					rel="noopener noreferrer">CDC</a
				> guidelines.
			</p>
			<p class="text-sm text-text-muted italic">
				Note: BMI is not a complete measure of body fat or overall health, but it can be a useful
				screening tool.
			</p>
		</div>
	</section>

	<!-- Calculator Card -->
	<div class="card space-y-8">
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

		<!-- Height Input -->
		<div class="space-y-4">
			<h2 class="text-xl font-semibold">Height</h2>
			{#if unit === 'metric'}
				<div class="relative">
					<input
						bind:value={heightCm}
						type="number"
						placeholder="Enter height"
						class="input pr-12"
					/>
					<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">cm</span>
				</div>
			{:else}
				<div class="grid grid-cols-2 gap-4">
					<div class="relative">
						<input bind:value={heightFt} type="number" placeholder="Feet" class="input pr-12" />
						<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">ft</span>
					</div>
					<div class="relative">
						<input bind:value={heightIn} type="number" placeholder="Inches" class="input pr-12" />
						<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">in</span>
					</div>
				</div>
			{/if}
		</div>

		<!-- Weight Input -->
		<div class="space-y-4">
			<h2 class="text-xl font-semibold">Weight</h2>
			{#if unit === 'metric'}
				<div class="relative">
					<input
						bind:value={weightKg}
						type="number"
						placeholder="Enter weight"
						class="input pr-12"
					/>
					<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">kg</span>
				</div>
			{:else}
				<div class="relative">
					<input
						bind:value={weightPounds}
						type="number"
						placeholder="Enter weight"
						class="input pr-16"
					/>
					<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">lbs</span>
				</div>
			{/if}
		</div>

		<!-- Results -->
		{#if showResult}
			<div class="pt-4 border-t border-slate-800" transition:fade>
				<div class="space-y-4 text-center">
					<div class="space-y-2">
						<h3 class="text-4xl font-bold">{calculatedBmi.toFixed(1)}</h3>
						<p class="text-sm text-text-muted">Your BMI</p>
					</div>
					<div class="space-y-2">
						<p class="text-2xl font-semibold {classifyBMI(calculatedBmi).color}">
							{classifyBMI(calculatedBmi).category}
						</p>
						<p class="text-sm text-text-muted">
							According to the <a
								href="https://www.cdc.gov/obesity/basics/adult-defining.html"
								class="text-primary hover:text-primary-dark transition-colors"
								target="_blank"
								rel="noopener noreferrer">CDC classification</a
							>
						</p>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Disclaimer -->
	<div class="text-center text-sm text-text-muted space-y-2">
		<p>
			BMI Categories: Underweight = &lt;18.5 | Normal weight = 18.5–24.9 | Overweight = 25–29.9 |
			Obesity = BMI of 30 or greater
		</p>
		<p>
			This calculator is for adults 20 years and older. For children and teens, please consult with
			a healthcare provider.
		</p>
	</div>
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.1;
	}

	input[type='radio'] {
		outline: none;
		box-shadow: none;
	}

	h1 {
		width: 100%;
	}
</style>
