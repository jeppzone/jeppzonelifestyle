<script>
	let selected = '';
	/**
	 * @type {number}
	 */
	let dadLengthCm;
	/**
	 * @type {number}
	 */
	let dadLengthFt;
	/**
	 * @type {number}
	 */
	let dadLengthIn;
	/**
	 * @type {number}
	 */
	let momLengthCm;
	/**
	 * @type {number}
	 */
	let momLengthFt;
	/**
	 * @type {number}
	 */
	let momLengthIn;
	let unit = 'metric';
	$: showResult =
		((momLengthCm && dadLengthCm) || (momLengthFt && momLengthIn && dadLengthFt && dadLengthIn)) &&
		selected !== '';
	$: predictedLength =
		selected == 'male'
			? unit === 'metric'
				? (+momLengthCm + 13 + +dadLengthCm) / 2
				: (+toCm(momLengthFt, momLengthIn) + 13 + +toCm(dadLengthFt, dadLengthIn)) / 2
			: unit === 'metric'
				? (+dadLengthCm - 13 + +momLengthCm) / 2
				: (+toCm(momLengthFt, momLengthIn) - 13 + +toCm(dadLengthFt, dadLengthIn)) / 2;

	/**
	 * @param {{ currentTarget: { value: string; }; }} event
	 */
	function onChange(event) {
		selected = event.currentTarget.value;
	}

	/**
	 * @param {{ currentTarget: { value: string; }; }} event
	 */
	function onChangeUnit(event) {
		unit = event.currentTarget.value;
		if (unit === 'metric') {
			if (dadLengthFt && dadLengthIn) {
				dadLengthCm = toCm(dadLengthFt, dadLengthIn);
			}
			if (momLengthFt && momLengthIn) {
				momLengthCm = toCm(momLengthFt, momLengthIn);
			}
		} else if (unit === 'imperial') {
			if (dadLengthCm) {
				const feetAndInches = toFeet(dadLengthCm);
				dadLengthFt = feetAndInches.feet;
				dadLengthIn = feetAndInches.inches;
			}
			if (momLengthCm) {
				const feetAndInches = toFeet(momLengthCm);
				momLengthFt = feetAndInches.feet;
				momLengthIn = feetAndInches.inches;
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
</script>

<svelte:head>
	<title>Child Height Predictor: A Calulator for predicting the height of your child</title>
	<meta
		name="description"
		content="How tall will my child be? A calculator that predicts the height of your child using a simple, scientifically backed equation"
	/>
</svelte:head>

<section class="max-w-4xl mx-auto px-4 py-8">
	<div class="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10">
		<h1
			class="md:text-6xl sm:text-5xl text-4xl text-center font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
		>
			Child Height Calculator
		</h1>
		<h2 class="text-2xl mt-6 text-center font-medium text-gray-300">
			Predict your child's future height based on parental heights
		</h2>

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

			<!-- Parent Heights -->
			<div class="grid md:grid-cols-2 gap-6">
				<!-- Mom's Height -->
				<div class="bg-white/5 rounded-xl p-6 min-h-[160px]">
					<label class="block h-full">
						<span class="text-xl font-semibold block mb-4 text-center text-gray-200"
							>Mother's Height</span
						>
						<div class="mt-4 relative">
							<div
								class="absolute inset-0 w-full transition-opacity duration-300 ease-out"
								style="opacity: {unit === 'metric' ? '1' : '0'}; pointer-events: {unit === 'metric'
									? 'auto'
									: 'none'}"
							>
								<input
									bind:value={momLengthCm}
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
										bind:value={momLengthFt}
										placeholder="Feet"
										class="w-full text-lg bg-white/10 border border-white/20 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
									/>
									<input
										bind:value={momLengthIn}
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

				<!-- Dad's Height -->
				<div class="bg-white/5 rounded-xl p-6 min-h-[160px]">
					<label class="block h-full">
						<span class="text-xl font-semibold block mb-4 text-center text-gray-200"
							>Father's Height</span
						>
						<div class="mt-4 relative">
							<div
								class="absolute inset-0 w-full transition-opacity duration-300 ease-out"
								style="opacity: {unit === 'metric' ? '1' : '0'}; pointer-events: {unit === 'metric'
									? 'auto'
									: 'none'}"
							>
								<input
									bind:value={dadLengthCm}
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
										bind:value={dadLengthFt}
										placeholder="Feet"
										class="w-full text-lg bg-white/10 border border-white/20 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
									/>
									<input
										bind:value={dadLengthIn}
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
			</div>

			<!-- Gender Selection -->
			<div class="bg-white/5 rounded-xl p-6">
				<h3 class="text-xl font-semibold mb-4 text-center text-gray-200">Child's Gender</h3>
				<div class="flex justify-center gap-6">
					<label class="relative flex items-center gap-2 cursor-pointer group">
						<input
							checked={selected === 'male'}
							on:change={onChange}
							type="radio"
							name="gender"
							value="male"
							class="w-5 h-5 appearance-none rounded-full border-2 border-blue-400 checked:border-blue-500 checked:bg-blue-500 transition-all duration-200 ease-out cursor-pointer"
						/>
						<span
							class="text-lg font-medium text-gray-200 group-hover:text-blue-400 transition-colors"
							>Male</span
						>
					</label>
					<label class="relative flex items-center gap-2 cursor-pointer group">
						<input
							checked={selected === 'female'}
							on:change={onChange}
							type="radio"
							name="gender"
							value="female"
							class="w-5 h-5 appearance-none rounded-full border-2 border-blue-400 checked:border-blue-500 checked:bg-blue-500 transition-all duration-200 ease-out cursor-pointer"
						/>
						<span
							class="text-lg font-medium text-gray-200 group-hover:text-blue-400 transition-colors"
							>Female</span
						>
					</label>
				</div>
			</div>

			<!-- Results -->
			<div class="min-h-[160px]">
				{#if showResult && !isNaN(predictedLength)}
					<div
						class="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-8 text-center transform transition-all duration-300 ease-out"
					>
						<h3 class="text-xl font-semibold mb-2 text-gray-200">Predicted Height</h3>
						{#if unit === 'metric'}
							<div class="text-5xl font-bold text-white">
								{Math.round(predictedLength)} <span class="text-3xl text-gray-300">cm</span>
							</div>
						{:else}
							<div class="text-5xl font-bold text-white">
								{toFeet(predictedLength).feet}<span class="text-3xl text-gray-300">ft</span>
								{toFeet(predictedLength).inches}<span class="text-3xl text-gray-300">in</span>
							</div>
						{/if}
					</div>
				{:else}
					<div
						class="bg-white/5 rounded-xl p-8 text-center h-full flex items-center justify-center"
					>
						<p class="text-gray-400 text-lg">
							Enter parent heights and select child's gender to see prediction
						</p>
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
