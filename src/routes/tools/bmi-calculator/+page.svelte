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
	let unit = 'imperial';
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
</script>

<svelte:head>
	<title>BMI Calculator: Calculating your Body Mass Index</title>
	<meta name="description" content="A calucaltor that calculates your Body Mass Index (BMI)" />
</svelte:head>

<section>
	<h1 class="md:text-7xl sm:text-5xl xs:text-5xl text-center tracking-tight font-bold">
		BMI Calculator
	</h1>
	<h2 class="text-3xl pt-10 text-center tracking-tight font-bold">
		Calculate your Body Mass Index using your height and weight.
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
				Your height
				<input
					bind:value={heightCm}
					placeholder="cm"
					class="w-80 text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
				/>
			</label>
		{:else if unit === 'imperial'}
			<label class="font-extrabold tracking-tight text-white xs:text-2xl sm:text-3xl text-center">
				Your Height
				<div class="grid grid-cols-2 gap-4">
					<div>
						<input
							bind:value={heightFt}
							placeholder="ft"
							class="w-32 text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
						/>
						<span class="w-8">ft</span>
					</div>
					<div>
						<input
							bind:value={heightIn}
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
				Your weight
				<input
					bind:value={weightKg}
					placeholder="kg"
					class="w-80 text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
				/>
			</label>
		{:else if unit === 'imperial'}
			<label class="font-extrabold tracking-tight text-white xs:text-2xl sm:text-3xl text-center">
				Your weight
				<div class="grid pt-2">
					<div>
						<input
							bind:value={weightPounds}
							placeholder="pounds"
							class="w-80 text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
						/>
					</div>
				</div></label
			>
		{/if}
	</div>

	<div class="p-5 text-white flex flex-col min-h-32">
		{#if showResult}
			<div>
				<span class="font-extrabold xs:text-3xl md:text-7xl sm:text-5xl"
					>{calculatedBmi.toFixed(1)}</span
				>
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
