<script lang="ts">
	import { fade } from 'svelte/transition';
	import { supabase } from '$lib/supabase';

	export let postSlug: string;
	console.log('CommentForm received postSlug:', postSlug);

	let authorName = '';
	let authorEmail = '';
	let content = '';
	let isSubmitting = false;
	let submitStatus: 'success' | 'error' | null = null;
	let errorMessage = '';

	async function handleSubmit() {
		if (!authorName || !authorEmail || !content) {
			errorMessage = 'Please fill in all fields';
			submitStatus = 'error';
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(authorEmail)) {
			errorMessage = 'Please enter a valid email address';
			submitStatus = 'error';
			return;
		}

		try {
			errorMessage = '';
			isSubmitting = true;

			const { data, error: supabaseError } = await supabase
				.from('comments')
				.insert([
					{
						post_slug: postSlug,
						author_name: authorName,
						author_email: authorEmail,
						content: content,
						approved: false
					}
				])
				.select();

			if (supabaseError) {
				console.error('Supabase error:', supabaseError);
				throw supabaseError;
			}

			submitStatus = 'success';
			authorName = '';
			authorEmail = '';
			content = '';
			isSubmitting = false;
		} catch (e) {
			console.error('Error submitting comment:', e);
			errorMessage = e instanceof Error ? e.message : 'Failed to submit comment';
			isSubmitting = false;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
	<div class="space-y-4">
		<div>
			<label for="name" class="block text-sm font-medium text-text-muted">Name</label>
			<input
				type="text"
				id="name"
				bind:value={authorName}
				required
				class="mt-1 block w-full rounded-md border border-slate-700 bg-surface px-3 py-2 text-text shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				placeholder="Your name"
			/>
		</div>

		<div>
			<label for="email" class="block text-sm font-medium text-text-muted">Email</label>
			<input
				type="email"
				id="email"
				bind:value={authorEmail}
				required
				class="mt-1 block w-full rounded-md border border-slate-700 bg-surface px-3 py-2 text-text shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				placeholder="your@email.com"
			/>
		</div>

		<div>
			<label for="comment" class="block text-sm font-medium text-text-muted">Comment</label>
			<textarea
				id="comment"
				bind:value={content}
				required
				rows="4"
				class="mt-1 block w-full rounded-md border border-slate-700 bg-surface px-3 py-2 text-text shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				placeholder="Write your comment here..."
			></textarea>
		</div>
	</div>

	<button
		type="submit"
		disabled={isSubmitting}
		class="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
	>
		{#if isSubmitting}
			<span class="inline-flex items-center">
				<svg
					class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				Submitting...
			</span>
		{:else}
			Submit Comment
		{/if}
	</button>

	{#if submitStatus}
		<div
			transition:fade
			class="mt-4 rounded-md p-4 {submitStatus === 'success'
				? 'bg-green-900/50 text-green-200'
				: 'bg-red-900/50 text-red-200'}"
		>
			{#if submitStatus === 'success'}
				<p>Thank you for your comment! It will be reviewed and approved shortly.</p>
			{:else}
				<p>{errorMessage}</p>
			{/if}
		</div>
	{/if}
</form>
