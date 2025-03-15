<script>
	/**
	 * @type {number}
	 */
	let heightCm;
	/**
	 * @type {number}
	 */
	let heightFt;
	/**
	 * @type {number}
	 */
	let heightIn;
	/**
	 * @type {number}
	 */
	let weightKg;
	/**
	 * @type {number}
	 */
	let weightPounds;
	let unit = 'metric';
	$: showResult =
		(!isNaN(weightKg) && !isNaN(heightCm)) ||
		(!isNaN(weightPounds) && !isNaN(heightFt) && !isNaN(heightIn));
	$: calculatedBmi =
		unit === 'metric'
			? +weightKg / Math.pow(+heightCm / 100, 2)
			: toKg(weightPounds) / Math.pow(toCm(heightFt, heightIn) / 100, 2);

	/**
	 * @param {{ currentTarget: { value: string; }; }} event
	 */
	function onChangeUnit(event) {
		unit = event.currentTarget.value;
		if (unit === 'metric') {
			if (heightFt && heightIn) {
				heightCm = toCm(heightFt, heightIn);
			}
			if (weightPounds) {
				weightKg = toKg(weightPounds);
			}
		} else if (unit === 'imperial') {
			if (heightCm) {
				const feetAndInches = toFeet(heightCm);
				heightFt = feetAndInches.feet;
				heightIn = feetAndInches.inches;
			}
			if (weightKg) {
				weightPounds = toPounds(weightKg);
			}
		}
	}
	/**
	 * @param {number} cm
	 */
	function toFeet(cm) {
		var realFeet = (cm * 0.3937) / 12;
		var feet = Math.floor(realFeet);
		var inches = Math.round((realFeet - feet) * 12);
		return { feet: feet, inches: inches };
	}

	/**
	 * @param {number} feet
	 * @param {number} inches
	 */
	function toCm(feet, inches) {
		const totalInches = feet * 12 + +inches;
		const centimeters = Math.round(totalInches * 2.54);
		return centimeters;
	}

	/**
	 * @param {number} pounds
	 */
	function toKg(pounds) {
		// 1 pound is approximately equal to 0.45359237 kilograms
		return parseFloat((pounds * 0.45359237).toFixed(1));
	}

	/**
	 * @param {number} kg
	 */
	function toPounds(kg) {
		// 1 kilogram is approximately equal to 2.20462262 pounds
		return parseFloat((kg * 2.20462262).toFixed(1));
	}

	/**
	 * @param {number} bmi
	 */
	function classifyBMI(bmi) {
		if (bmi < 18.5) {
			return 'Underweight';
		} else if (bmi >= 18.5 && bmi < 25) {
			return 'Normal weight';
		} else if (bmi >= 25 && bmi < 30) {
			return 'Overweight';
		} else if (bmi >= 30 && bmi < 35) {
			return 'Obese (Class 1)';
		} else if (bmi >= 35 && bmi < 40) {
			return 'Obese (Class 2)';
		} else {
			return 'Obese (Class 3)';
		}
	}
</script>

<svelte:head>
	<title>Adult BMI Calculator: Calculating Body Mass Index for adults</title>
	<meta
		name="description"
		content="Calculate your Body Mass Index (BMI) with this simple calculator. BMI is certainly not the be-all and end-all of health classifications, but it could be an indicator that's something's up"
	/>
</svelte:head>

<section class="max-w-4xl mx-auto px-4 py-8">
	<div class="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10">
		<h1
			class="md:text-6xl sm:text-5xl text-4xl text-center font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
		>
			Adult BMI Calculator
		</h1>
		<h2 class="text-2xl mt-6 text-center font-medium text-gray-300">
			Calculate your Body Mass Index using your height and weight and get classified according to
			the
			<a
				href="https://www.cdc.gov/obesity/basics/adult-defining.html"
				class="text-blue-400 hover:text-blue-300 transition-colors">CDC</a
			>.
		</h2>
		<p class="text-lg mt-4 text-center text-gray-400">
			BMI is certainly not the be-all and end-all of health classifications, but it <i
				class="italic">could</i
			> be an indicator that's something's up
		</p>

		<div class="mt-12 space-y-8">
			<!-- Unit Selection -->
			<div class="bg-white/5 rounded-xl p-6">
				<h3 class="text-xl font-semibold mb-4 text-center">Measurement Unit</h3>
				<div class="flex justify-center gap-6">
					<label class="relative flex items-center gap-2 cursor-pointer group">
						<input
							checked={unit === 'metric'}
							on:change={onChangeUnit}
							type="radio"
							name="unit"
							value="metric"
							class="w-5 h-5 appearance-none rounded-full border-2 border-blue-400 checked:border-blue-500 checked:bg-blue-500 transition-all duration-200 ease-out cursor-pointer"
						/>
						<span
							class="text-lg font-medium text-gray-200 group-hover:text-blue-400 transition-colors"
							>Metric</span
						>
					</label>
					<label class="relative flex items-center gap-2 cursor-pointer group">
						<input
							checked={unit === 'imperial'}
							on:change={onChangeUnit}
							type="radio"
							name="unit"
							value="imperial"
							class="w-5 h-5 appearance-none rounded-full border-2 border-blue-400 checked:border-blue-500 checked:bg-blue-500 transition-all duration-200 ease-out cursor-pointer"
						/>
						<span
							class="text-lg font-medium text-gray-200 group-hover:text-blue-400 transition-colors"
							>Imperial</span
						>
					</label>
				</div>
			</div>

			<!-- Height Input -->
			<div class="bg-white/5 rounded-xl p-6 min-h-[160px]">
				<label class="block h-full">
					<span class="text-xl font-semibold block mb-4 text-center text-gray-200">Height</span>
					<div class="mt-4 relative">
						<div
							class="absolute inset-0 w-full transition-opacity duration-300 ease-out"
							style="opacity: {unit === 'metric' ? '1' : '0'}; pointer-events: {unit === 'metric'
								? 'auto'
								: 'none'}"
						>
							<input
								bind:value={heightCm}
								placeholder="Height in cm"
								class="w-full text-lg bg-white/10 border border-white/20 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
							/>
						</div>
						<div
							class="absolute inset-0 w-full transition-opacity duration-300 ease-out"
							style="opacity: {unit === 'imperial' ? '1' : '0'}; pointer-events: {unit ===
							'imperial'
								? 'auto'
								: 'none'}"
						>
							<div class="grid grid-cols-2 gap-4">
								<input
									bind:value={heightFt}
									placeholder="Feet"
									class="w-full text-lg bg-white/10 border border-white/20 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
								/>
								<input
									bind:value={heightIn}
									placeholder="Inches"
									class="w-full text-lg bg-white/10 border border-white/20 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
								/>
							</div>
						</div>
						<div class="w-full opacity-0 pointer-events-none">
							<div class="grid grid-cols-2 gap-4">
								<input disabled class="w-full text-lg p-3" />
								<input disabled class="w-full text-lg p-3" />
							</div>
						</div>
					</div>
				</label>
			</div>

			<!-- Weight Input -->
			<div class="bg-white/5 rounded-xl p-6 min-h-[160px]">
				<label class="block h-full">
					<span class="text-xl font-semibold block mb-4 text-center text-gray-200">Weight</span>
					<div class="mt-4 relative">
						<div
							class="absolute inset-0 w-full transition-opacity duration-300 ease-out"
							style="opacity: {unit === 'metric' ? '1' : '0'}; pointer-events: {unit === 'metric'
								? 'auto'
								: 'none'}"
						>
							<input
								bind:value={weightKg}
								placeholder="Weight in kg"
								class="w-full text-lg bg-white/10 border border-white/20 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
							/>
						</div>
						<div
							class="absolute inset-0 w-full transition-opacity duration-300 ease-out"
							style="opacity: {unit === 'imperial' ? '1' : '0'}; pointer-events: {unit ===
							'imperial'
								? 'auto'
								: 'none'}"
						>
							<input
								bind:value={weightPounds}
								placeholder="Weight in pounds"
								class="w-full text-lg bg-white/10 border border-white/20 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
							/>
						</div>
						<div class="w-full opacity-0 pointer-events-none">
							<input disabled class="w-full text-lg p-3" />
						</div>
					</div>
				</label>
			</div>

			<!-- Results -->
			<div class="min-h-[160px]">
				{#if showResult}
					<div
						class="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-8 text-center transform transition-all duration-300 ease-out"
					>
						<div class="space-y-4">
							<div class="text-5xl font-bold text-white">
								{calculatedBmi.toFixed(1)}
							</div>
							<div class="text-2xl font-semibold text-gray-200">
								{classifyBMI(calculatedBmi)}
							</div>
							<div class="text-sm text-gray-400">
								<a
									href="https://www.cdc.gov/obesity/basics/adult-defining.html"
									class="text-blue-400 hover:text-blue-300 transition-colors"
								>
									Classification source: The CDC
								</a>
							</div>
						</div>
					</div>
				{:else}
					<div
						class="bg-white/5 rounded-xl p-8 text-center h-full flex items-center justify-center"
					>
						<p class="text-gray-400 text-lg">Enter your height and weight to see your BMI</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	input[type='radio']::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		background-color: white;
		opacity: 0;
		transition: opacity 0.2s ease-out;
		pointer-events: none;
		z-index: 1;
	}

	input[type='radio'] {
		position: relative;
		z-index: 0;
	}

	input[type='radio']:checked::after {
		opacity: 1;
	}

	/* Remove spinners from number inputs */
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
