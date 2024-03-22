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
		content="A calucaltor that predicts the height of your child using a simple, scientifically backed equation"
	/>
</svelte:head>

<section>
	<h1 class="md:text-7xl sm:text-5xl xs:text-5xl text-center tracking-tight font-bold">
		Child Height Calculator
	</h1>
	<h2 class="text-3xl pt-10 text-center tracking-tight font-bold">
		Predict the future height of your child based on the height of the parents
	</h2>

	<div class="pt-5">
		<h3 class="text-3xl text-center tracking-tight font-bold">Unit</h3>
		<label class="text-3xl font-bold tracking-tight text-white xs:text-xl sm:text-2xl">
			<input
				checked={unit === 'metric'}
				on:change={onChangeUnit}
				type="radio"
				name="unit"
				value="metric"
				class="w-6 h-6 text-blue-600 focus:ring-blue-500"
			/>
			Metric
		</label>
		<label class="text-3xl font-bold tracking-tight text-white p-5 xs:text-xl sm:text-2xl">
			<input
				checked={unit === 'imperial'}
				on:change={onChangeUnit}
				type="radio"
				name="unit"
				value="imperial"
				class="w-6 h-6 text-blue-600 focus:ring-blue-500"
			/>
			Imperial
		</label>
	</div>
	<div class="text-center pt-10">
		{#if unit === 'metric'}
			<label class="font-extrabold tracking-tight text-white xs:text-2xl sm:text-3xl">
				Mom's Height
				<input
					bind:value={momLengthCm}
					placeholder="cm"
					class="w-80 text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
				/>
			</label>
		{:else if unit === 'imperial'}
			<label class="font-extrabold tracking-tight text-white xs:text-2xl sm:text-3xl text-center">
				Mom's Height
				<div class="grid grid-cols-2 gap-4">
					<div>
						<input
							bind:value={momLengthFt}
							placeholder="ft"
							class="w-32 text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
						/>
						<span class="w-8">ft</span>
					</div>
					<div>
						<input
							bind:value={momLengthIn}
							placeholder="in"
							class="w-32 text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
						/>
						<span class="w-8">in</span>
					</div>
				</div>
			</label>
		{/if}
	</div>
	<div class="text-center pt-10">
		{#if unit === 'metric'}
			<label class="font-extrabold tracking-tight text-white xs:text-2xl sm:text-3xl">
				Dad's Height
				<input
					bind:value={dadLengthCm}
					placeholder="cm"
					class="w-80 text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
				/>
			</label>
		{:else if unit === 'imperial'}
			<label class="font-extrabold tracking-tight text-white xs:text-2xl sm:text-3xl text-center">
				Dad's Height
				<div class="grid grid-cols-2 gap-4 pt-2">
					<div>
						<input
							bind:value={dadLengthFt}
							placeholder="ft"
							class="w-32 text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
						/>
						<span class="w-8">ft</span>
					</div>
					<div>
						<input
							bind:value={dadLengthIn}
							placeholder="in"
							class="w-32 text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
						/>
						<span class="w-8">in</span>
					</div>
				</div>
			</label>
		{/if}
	</div>
	<div class="pt-10">
		<h3 class="text-3xl text-center tracking-tight font-bold">Gender</h3>
		<div>
			<label class="text-3xl font-bold tracking-tight text-white p-5 xs:text-xl sm:text-2xl">
				<input
					checked={selected === 'male'}
					on:change={onChange}
					type="radio"
					name="gender"
					value="male"
					class="w-6 h-6 text-blue-600 focus:ring-blue-500"
				/>
				Male
			</label>
			<label class="text-3xl font-bold tracking-tight text-white xs:text-xl sm:text-2xl">
				<input
					checked={selected === 'female'}
					on:change={onChange}
					type="radio"
					name="gender"
					value="female"
					class="w-6 h-6 text-blue-600 focus:ring-blue-500"
				/>
				Female
			</label>
		</div>
	</div>
	<div class="p-5 text-white flex flex-col min-h-32">
		{#if showResult && !isNaN(predictedLength)}
			<div>
				{#if unit === 'metric'}
					<span class="font-extrabold xs:text-3xl md:text-7xl sm:text-5xl"
						>{predictedLength} cm</span
					>
				{:else}
					<span class="font-extrabold xs:text-3xl md:text-7xl sm:text-5xl"
						>{toFeet(predictedLength).feet} ft {toFeet(predictedLength).inches} in</span
					>
				{/if}
			</div>
		{/if}
	</div>
</section>

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
