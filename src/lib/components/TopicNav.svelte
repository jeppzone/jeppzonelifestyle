<script>
	const topics = [
		{
			title: 'Sleep Health',
			slug: 'sleep-health',
			description:
				'Learn about sleep science, sleep disorders, and how to improve your sleep quality.',
			posts: ['how-sleep-works', 'sleep-apnea', 'the-dangers-of-mouth-breathing'],
			tools: []
		},
		{
			title: 'Fitness & Recovery',
			slug: 'fitness-recovery',
			description: 'Explore fitness training, injury recovery, and physical rehabilitation.',
			posts: ['my-acl-surgery-recovery-3-month-mark', 'my-acl-tear-story'],
			tools: ['one-rep-max-calculator']
		},
		{
			title: 'Nutrition & Diet',
			slug: 'nutrition-diet',
			description: 'Discover different dietary approaches and their impact on health.',
			posts: ['the-carnivore-diet-pros-and-cons', 'time-restricted-eating', 'i-quit-caffeine'],
			tools: []
		},
		{
			title: 'Health Metrics & Monitoring',
			slug: 'health-metrics',
			description: 'Understand and track your health metrics for better wellness.',
			posts: [
				'bmi-more-than-just-a-number',
				'metabolic-syndrome',
				'the-perks-of-being-a-blood-donor'
			],
			tools: ['bmi-calculator', 'child-height-calculator']
		}
	];
</script>

<nav class="space-y-8">
	<h2 class="text-2xl font-bold">Topics</h2>
	<div class="grid gap-6 md:grid-cols-2">
		{#each topics as topic}
			<a
				href="/topics/{topic.slug}"
				class="card group hover:border-primary/50 border border-transparent"
			>
				<h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
					{topic.title}
				</h3>
				<p class="mt-2 text-text-muted">{topic.description}</p>
				<div class="mt-4 flex items-center text-sm text-text-muted">
					<span>Explore topic</span>
					<svg
						class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</div>
			</a>
		{/each}
	</div>
</nav>
