<!-- FAQSchema.svelte -->
<script lang="ts">
	interface FAQItem {
		question: string;
		answer: string;
	}

	export let faqs: FAQItem[] = [];

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer
			}
		}))
	};

	const schemaString = JSON.stringify(faqSchema);
</script>

<div class="faq-section space-y-6">
	{#each faqs as faq}
		<div class="faq-item">
			<h3 class="text-lg font-semibold text-white mb-2">{faq.question}</h3>
			<p class="text-slate-400">{faq.answer}</p>
		</div>
	{/each}
</div>

{@html `<script type="application/ld+json">${schemaString}</script>`}
