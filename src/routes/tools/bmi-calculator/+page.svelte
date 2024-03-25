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

<section>
	<h1 class="md:text-7xl sm:text-5xl xs:text-5xl text-center tracking-tight font-bold">
		Adult BMI Calculator
	</h1>
	<h2 class="text-3xl pt-10 text-center tracking-tight font-bold">
		Calculate your Body Mass Index using your height and weight and get classified according to the <a
			href="https://www.cdc.gov/obesity/basics/adult-defining.html"
			class="text-white underline">CDC</a
		>.
	</h2>
	<h3 class="text-xl pt-5 text-center tracking-tight font-bold">
		BMI is certainly not the be-all and end-all of health classifications, but it <i class="italic"
			>could</i
		> be an indicator that's something's up
	</h3>

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
				Height
				<input
					bind:value={heightCm}
					placeholder="cm"
					class="w-80 text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
				/>
			</label>
		{:else if unit === 'imperial'}
			<label class="font-extrabold tracking-tight text-white xs:text-2xl sm:text-3xl text-center">
				Height
				<div class="grid grid-cols-2 gap-4">
					<div>
						<input
							bind:value={heightFt}
							placeholder="ft"
							class="w-40 text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
						/>
						<!-- <span class="w-8">ft</span> -->
					</div>
					<div>
						<input
							bind:value={heightIn}
							placeholder="in"
							class="w-40 text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
						/>
						<!-- <span class="w-8">in</span> -->
					</div>
				</div>
			</label>
		{/if}
	</div>
	<div class="text-center pt-10">
		{#if unit === 'metric'}
			<label class="font-extrabold tracking-tight text-white xs:text-2xl sm:text-3xl">
				Weight
				<input
					bind:value={weightKg}
					placeholder="kg"
					class="w-80 text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
				/>
			</label>
		{:else if unit === 'imperial'}
			<label class="font-extrabold tracking-tight text-white xs:text-2xl sm:text-3xl text-center">
				Weight
				<input
					bind:value={weightPounds}
					placeholder="pounds"
					class="w-80 text-3xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
				/>
			</label>
		{/if}
	</div>

	<div class="p-5 text-white flex flex-col min-h-32">
		{#if showResult}
			<div class="grid grid-cols-1 text-center">
				<span class="font-extrabold xs:text-3xl md:text-7xl sm:text-5xl"
					>{calculatedBmi.toFixed(1)}</span
				>
				<span class="font-extrabold xs:text-3xl md:text-5xl sm:text-3xl pt-2"
					>{classifyBMI(calculatedBmi)}</span
				>
				<span class="xs:text-xl pt-5"
					><a
						href="https://www.cdc.gov/obesity/basics/adult-defining.html"
						class="text-white underline">Classification source: The CDC</a
					></span
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
