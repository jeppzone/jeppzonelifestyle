<svelte:head>
	<title>Tools | Jeppzone Lifestyle</title>
	<meta
		name="description"
		content="Free health and lifestyle calculators and tools to help you on your wellness journey."
	/>
</svelte:head>

<div class="container-xl py-24">
	<div class="flex flex-col items-center text-center mb-16">
		<h1 class="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
			Health & Lifestyle Tools
		</h1>
		<p class="text-xl md:text-2xl text-slate-400 max-w-2xl mt-4">
			Free calculators and tools to help you make informed decisions about your health and
			lifestyle.
		</p>
	</div>

	<div class="grid gap-6 md:grid-cols-2">
		<a href="/tools/child-height-calculator" class="card group">
			<h2 class="text-xl font-semibold mb-2 group-hover:text-violet-400 transition-colors">
				Child Height Calculator
			</h2>
			<p class="text-sm text-slate-400">
				Estimate your child's potential adult height based on parental heights using
				scientifically-backed formulas.
			</p>
		</a>
		<a href="/tools/bmi-calculator" class="card group">
			<h2 class="text-xl font-semibold mb-2 group-hover:text-violet-400 transition-colors">
				BMI Calculator
			</h2>
			<p class="text-sm text-slate-400">
				Calculate your Body Mass Index (BMI) and understand what it means for your overall health
				status.
			</p>
		</a>
	</div>

	<div class="mt-16 text-center">
		<p class="text-sm text-slate-400 max-w-2xl mx-auto">
			These tools are provided for informational purposes only and should not be considered medical
			advice. Always consult with healthcare professionals for personalized recommendations.
		</p>
	</div>
</div>
