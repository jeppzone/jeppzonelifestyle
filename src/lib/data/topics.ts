export interface Topic {
	title: string;
	slug: string;
	description: string;
	posts: string[];
	tools: string[];
}

export const topics: Topic[] = [
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
	},
	{
		title: 'Mental Health & Personal Growth',
		slug: 'mental-health',
		description: 'Explore mental wellness, personal development, and emotional health.',
		posts: ['my-relationship-with-alcohol', 'the-psychology-of-new-years-resolutions'],
		tools: []
	}
];
