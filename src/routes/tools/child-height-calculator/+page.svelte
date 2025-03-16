<script lang="ts">
	import { fade, crossfade } from 'svelte/transition';

	const [send, receive] = crossfade({
		duration: 300
	});

	let selected = '';
	let dadLengthCm: number | null = null;
	let dadLengthFt: number | null = null;
	let dadLengthIn: number | null = null;
	let momLengthCm: number | null = null;
	let momLengthFt: number | null = null;
	let momLengthIn: number | null = null;
	let unit = 'metric';

	$: showResult =
		((momLengthCm !== null && dadLengthCm !== null) ||
			(momLengthFt !== null &&
				momLengthIn !== null &&
				dadLengthFt !== null &&
				dadLengthIn !== null)) &&
		selected !== '';

	$: predictedLength = showResult
		? selected === 'male'
			? unit === 'metric'
				? (Number(momLengthCm) + 13 + Number(dadLengthCm)) / 2
				: (toCm(Number(momLengthFt), Number(momLengthIn)) +
						13 +
						toCm(Number(dadLengthFt), Number(dadLengthIn))) /
					2
			: unit === 'metric'
				? (Number(dadLengthCm) - 13 + Number(momLengthCm)) / 2
				: (toCm(Number(momLengthFt), Number(momLengthIn)) -
						13 +
						toCm(Number(dadLengthFt), Number(dadLengthIn))) /
					2
		: 0;

	function onChange(event: { currentTarget: { value: string } }) {
		selected = event.currentTarget.value;
	}

	function onChangeUnit(event: { currentTarget: { value: string } }) {
		unit = event.currentTarget.value;
		if (unit === 'metric') {
			if (dadLengthFt !== null && dadLengthIn !== null) {
				dadLengthCm = toCm(dadLengthFt, dadLengthIn);
			}
			if (momLengthFt !== null && momLengthIn !== null) {
				momLengthCm = toCm(momLengthFt, momLengthIn);
			}
		} else if (unit === 'imperial') {
			if (dadLengthCm !== null) {
				const feetAndInches = toFeet(dadLengthCm);
				dadLengthFt = feetAndInches.feet;
				dadLengthIn = feetAndInches.inches;
			}
			if (momLengthCm !== null) {
				const feetAndInches = toFeet(momLengthCm);
				momLengthFt = feetAndInches.feet;
				momLengthIn = feetAndInches.inches;
			}
		}
	}

	function toFeet(cm: number): { feet: number; inches: number } {
		var realFeet = (cm * 0.3937) / 12;
		var feet = Math.floor(realFeet);
		var inches = Math.round((realFeet - feet) * 12);
		return { feet, inches };
	}

	function toCm(feet: number, inches: number): number {
		const totalInches = feet * 12 + Number(inches);
		const centimeters = Math.round(totalInches * 2.54);
		return centimeters;
	}
</script>

<svelte:head>
	<title>Child Height Calculator | Jeppzone Lifestyle</title>
	<meta
		name="description"
		content="Predict your child's adult height using this scientifically-based calculator that takes into account both parents' heights."
	/>
</svelte:head>

<div class="max-w-3xl mx-auto space-y-12">
	<!-- Header -->
	<section class="text-center space-y-6">
		<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-up">
			Child Height Calculator
		</h1>
		<div class="space-y-4 animate-slide-up">
			<p class="text-xl text-text-muted">
				Predict your child's adult height based on parental heights using a scientifically-backed
				formula.
			</p>
			<p class="text-sm text-text-muted italic">
				Note: This is an estimate based on averages. Individual results may vary due to genetics,
				nutrition, and other factors.
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

		<!-- Parent Heights -->
		<div class="space-y-6">
			<div class="space-y-4">
				<h2 class="text-xl font-semibold">Mother's Height</h2>
				<div class="min-h-[48px] relative">
					{#if unit === 'metric'}
						<div
							class="absolute inset-0"
							in:receive={{ key: 'mom-metric' }}
							out:send={{ key: 'mom-metric' }}
						>
							<input
								bind:value={momLengthCm}
								type="number"
								placeholder="Enter height"
								class="input pr-12 w-full"
							/>
							<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">cm</span>
						</div>
					{:else}
						<div
							class="absolute inset-0 grid grid-cols-2 gap-4"
							in:receive={{ key: 'mom-imperial' }}
							out:send={{ key: 'mom-imperial' }}
						>
							<div class="relative">
								<input
									bind:value={momLengthFt}
									type="number"
									placeholder="Feet"
									class="input pr-12 w-full"
								/>
								<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">ft</span>
							</div>
							<div class="relative">
								<input
									bind:value={momLengthIn}
									type="number"
									placeholder="Inches"
									class="input pr-12 w-full"
								/>
								<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">in</span>
							</div>
						</div>
					{/if}
				</div>
			</div>

			<div class="space-y-4">
				<h2 class="text-xl font-semibold">Father's Height</h2>
				<div class="min-h-[48px] relative">
					{#if unit === 'metric'}
						<div
							class="absolute inset-0"
							in:receive={{ key: 'dad-metric' }}
							out:send={{ key: 'dad-metric' }}
						>
							<input
								bind:value={dadLengthCm}
								type="number"
								placeholder="Enter height"
								class="input pr-12 w-full"
							/>
							<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">cm</span>
						</div>
					{:else}
						<div
							class="absolute inset-0 grid grid-cols-2 gap-4"
							in:receive={{ key: 'dad-imperial' }}
							out:send={{ key: 'dad-imperial' }}
						>
							<div class="relative">
								<input
									bind:value={dadLengthFt}
									type="number"
									placeholder="Feet"
									class="input pr-12 w-full"
								/>
								<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">ft</span>
							</div>
							<div class="relative">
								<input
									bind:value={dadLengthIn}
									type="number"
									placeholder="Inches"
									class="input pr-12 w-full"
								/>
								<span class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">in</span>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>

		<!-- Gender Selection -->
		<div class="space-y-4">
			<h2 class="text-xl font-semibold">Child's Gender</h2>
			<div class="flex gap-6">
				<label class="flex items-center space-x-2 cursor-pointer">
					<input
						checked={selected === 'male'}
						on:change={onChange}
						type="radio"
						name="gender"
						value="male"
						class="w-4 h-4 text-primary focus:ring-primary border-slate-600 bg-slate-800"
					/>
					<span>Male</span>
				</label>
				<label class="flex items-center space-x-2 cursor-pointer">
					<input
						checked={selected === 'female'}
						on:change={onChange}
						type="radio"
						name="gender"
						value="female"
						class="w-4 h-4 text-primary focus:ring-primary border-slate-600 bg-slate-800"
					/>
					<span>Female</span>
				</label>
			</div>
		</div>

		<!-- Results -->
		<div class="min-h-[120px]">
			{#if showResult && !isNaN(predictedLength)}
				<div class="pt-4 border-t border-slate-800" transition:fade|local>
					<div class="space-y-4 text-center">
						<div class="space-y-2">
							<h3 class="text-4xl font-bold">
								{#if unit === 'metric'}
									{Math.round(predictedLength)} cm
								{:else}
									{toFeet(predictedLength).feet} ft {toFeet(predictedLength).inches} in
								{/if}
							</h3>
							<p class="text-sm text-text-muted">Predicted Adult Height</p>
						</div>
						<p class="text-sm text-text-muted">
							This prediction has a margin of error of approximately ±4 cm (±1.6 inches)
						</p>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Disclaimer -->
	<div class="text-center text-sm text-text-muted space-y-2">
		<p>
			This calculator uses the mid-parental height method, which is based on statistical averages.
			The actual adult height can vary due to many factors including genetics, nutrition, and
			environment.
		</p>
		<p>
			For the most accurate predictions, consult with a pediatrician who can take into account
			additional factors such as the child's current growth curve.
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
